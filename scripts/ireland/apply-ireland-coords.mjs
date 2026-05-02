// Apply coordinate corrections from the audit.
// By default takes only flagLevel='high' (OSM↔GI <200m + DB far).
// With --include-medium-consensus, also includes medium entries where
// both sources >500m from DB AND OSM↔GI <500m (looser consensus, still
// strong signal).
//
// In all cases the new coord is the OSM+GI midpoint.
//
// Run dry-run:
//   node --env-file=.env.local scripts/ireland/apply-ireland-coords.mjs
// Apply:
//   node --env-file=.env.local scripts/ireland/apply-ireland-coords.mjs --apply
// Include medium-consensus too:
//   node --env-file=.env.local scripts/ireland/apply-ireland-coords.mjs --apply --include-medium-consensus
// Skip clubs:
//   --skip="Foo,Bar"

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const AUDIT_PATH = 'scripts/ireland/ireland-coords-audit.json'
const LOG_PATH = 'scripts/ireland/apply-ireland-coords-log.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const includeMedium = args.includes('--include-medium-consensus')
const skipClubs = new Set(
  (args.find((a) => a.startsWith('--skip='))?.slice(7) || '')
    .split(',').map((s) => s.trim()).filter(Boolean),
)

console.log(apply ? 'APPLY mode — writes to DB\n' : 'DRY RUN (pass --apply to write)\n')
console.log(includeMedium ? 'Including medium-consensus entries\n' : 'High-flag only (default)\n')
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}\n`)

const audit = JSON.parse(readFileSync(AUDIT_PATH, 'utf8'))
const highFlag = audit.flagged.filter((e) => e.flagLevel === 'high')

// Medium-consensus = both sources >500m from DB AND OSM↔GI <500m apart.
// These are real DB errors with slightly weaker source agreement than high.
const mediumConsensus = audit.flagged.filter((e) => {
  if (e.flagLevel !== 'medium') return false
  const oDist = e.osm?.distFromDb
  const gDist = e.gi?.distFromDb
  return oDist != null && gDist != null && oDist > 500 && gDist > 500 && e.osmGiDist != null && e.osmGiDist < 500
})

const targets = includeMedium ? [...highFlag, ...mediumConsensus] : highFlag
console.log(`High-flag entries:        ${highFlag.length}`)
console.log(`Medium-consensus entries: ${mediumConsensus.length} ${includeMedium ? '(INCLUDED)' : '(skipped)'}`)
console.log(`Targets this run:         ${targets.length}\n`)

let totalCourses = 0
let totalUpdates = 0
const log = []
const failures = []

for (const e of targets) {
  if (skipClubs.has(e.club)) {
    console.log(`SKIP ${e.club} (--skip)`)
    continue
  }

  // Compute OSM+GI midpoint
  const lat = +((e.osm.lat + e.gi.lat) / 2).toFixed(7)
  const lon = +((e.osm.lon + e.gi.lon) / 2).toFixed(7)

  // Pre-check: get current DB rows
  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, address')
    .in('id', e.courseIds)
  if (selErr) {
    console.error(`SELECT failed for ${e.club}:`, selErr)
    failures.push({ club: e.club, stage: 'select', error: selErr.message })
    continue
  }

  // Idempotency check — skip if all rows already at this midpoint
  const allCurrent = rows.every((r) => r.latitude === lat && r.longitude === lon)
  if (allCurrent) {
    console.log(`SKIP ${e.club} (already at midpoint)`)
    continue
  }

  console.log(`[${e.country}] ${e.club} (${rows.length} courses)`)
  console.log(`  DB now: ${e.db.lat}, ${e.db.lon}`)
  console.log(`  → New:  ${lat}, ${lon}  (OSM=${e.osm.distFromDb}m, GI=${e.gi.distFromDb}m off DB; OSM↔GI=${e.osmGiDist}m)`)

  totalCourses += rows.length

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses')
      .update({ latitude: lat, longitude: lon }, { count: 'exact' })
      .in('id', e.courseIds)
    if (updErr) {
      console.error(`  UPDATE failed:`, updErr)
      failures.push({ club: e.club, stage: 'update', error: updErr.message })
    } else {
      totalUpdates += count
      console.log(`  ✓ Updated ${count} row(s)`)
    }
  }

  log.push({
    club: e.club,
    country: e.country,
    courseCount: rows.length,
    before: rows.map((r) => ({ id: r.id, lat: r.latitude, lon: r.longitude })),
    after: { latitude: lat, longitude: lon },
    osm: { lat: e.osm.lat, lon: e.osm.lon, distFromDb: e.osm.distFromDb },
    gi: { lat: e.gi.lat, lon: e.gi.lon, distFromDb: e.gi.distFromDb },
    osmGiDist: e.osmGiDist,
    appliedAt: apply ? new Date().toISOString() : null,
  })
}

writeFileSync(LOG_PATH, JSON.stringify({ apply, totalCourses, totalUpdates, failures, entries: log }, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Targets:                ${targets.length}`)
console.log(`Clubs processed:        ${log.length}`)
console.log(`Courses affected:       ${totalCourses}`)
if (apply) console.log(`Rows updated:           ${totalUpdates}`)
if (failures.length) console.log(`Failures: ${failures.length}`)
console.log(`Wrote: ${LOG_PATH}`)
if (!apply) console.log('\n(dry run — pass --apply to write)')
