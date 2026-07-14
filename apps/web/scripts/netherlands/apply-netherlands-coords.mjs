// Apply Netherlands coord fixes from audit. Pattern fra England's apply-coords.
// Default: kun flagLevel='high' (OSM+LC <200m apart, DB diverger).
// Med --include-medium-consensus: tilføjer medium hvor begge sources >500m off
// AND OSM↔LC <500m apart.
//
// Run dry-run:
//   node --env-file=.env.local scripts/netherlands/apply-netherlands-coords.mjs
// Apply with medium-consensus:
//   node --env-file=.env.local scripts/netherlands/apply-netherlands-coords.mjs --apply --include-medium-consensus

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const AUDIT_PATH = 'scripts/netherlands/holland-coords-audit.json'
const LOG_PATH = 'scripts/netherlands/apply-netherlands-coords-log.json'

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

console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')
console.log(includeMedium ? 'Including medium-consensus\n' : 'High-flag only\n')
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}\n`)

const audit = JSON.parse(readFileSync(AUDIT_PATH, 'utf8'))
const highFlag = audit.flagged.filter((e) => e.flagLevel === 'high')
const mediumConsensus = audit.flagged.filter((e) => {
  if (e.flagLevel !== 'medium') return false
  const oDist = e.osm?.distFromDb
  const lDist = e.lc?.distFromDb
  return oDist != null && lDist != null && oDist > 500 && lDist > 500 && e.osmLcDist != null && e.osmLcDist < 500
})
const targets = includeMedium ? [...highFlag, ...mediumConsensus] : highFlag
console.log(`High-flag:        ${highFlag.length}`)
console.log(`Medium-consensus: ${mediumConsensus.length} ${includeMedium ? '(INCLUDED)' : '(skipped)'}`)
console.log(`Targets:          ${targets.length}\n`)

let totalCourses = 0
let totalUpdates = 0
const log = []
const failures = []

for (const e of targets) {
  if (skipClubs.has(e.club)) {
    console.log(`SKIP ${e.club}`)
    continue
  }
  if (!e.osm || !e.lc) continue // require both sources for midpoint

  const lat = +((e.osm.lat + e.lc.lat) / 2).toFixed(7)
  const lon = +((e.osm.lon + e.lc.lon) / 2).toFixed(7)

  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, address')
    .in('id', e.courseIds)
  if (selErr) {
    failures.push({ club: e.club, stage: 'select', error: selErr.message })
    continue
  }

  const allCurrent = rows.every((r) => r.latitude === lat && r.longitude === lon)
  if (allCurrent) {
    console.log(`SKIP ${e.club} (already at midpoint)`)
    continue
  }

  console.log(`${e.club} (${rows.length} courses)`)
  console.log(`  DB now: ${e.db.lat}, ${e.db.lon}`)
  console.log(`  → New:  ${lat}, ${lon}  (OSM=${e.osm.distFromDb}m, LC=${e.lc.distFromDb}m off; OSM↔LC=${e.osmLcDist}m)`)

  totalCourses += rows.length

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses')
      .update({ latitude: lat, longitude: lon }, { count: 'exact' })
      .in('id', e.courseIds)
    if (updErr) {
      failures.push({ club: e.club, stage: 'update', error: updErr.message })
    } else {
      totalUpdates += count
      console.log(`  ✓ Updated ${count} row(s)`)
    }
  }

  log.push({
    club: e.club, courseCount: rows.length,
    before: rows.map((r) => ({ id: r.id, lat: r.latitude, lon: r.longitude })),
    after: { latitude: lat, longitude: lon },
    osm: { lat: e.osm.lat, lon: e.osm.lon, distFromDb: e.osm.distFromDb },
    lc:  { lat: e.lc.lat,  lon: e.lc.lon,  distFromDb: e.lc.distFromDb },
    osmLcDist: e.osmLcDist,
    appliedAt: apply ? new Date().toISOString() : null,
  })
}

writeFileSync(LOG_PATH, JSON.stringify({ apply, totalCourses, totalUpdates, failures, entries: log }, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Targets:           ${targets.length}`)
console.log(`Clubs processed:   ${log.length}`)
console.log(`Courses affected:  ${totalCourses}`)
if (apply) console.log(`Rows updated:      ${totalUpdates}`)
if (failures.length) console.log(`Failures: ${failures.length}`)
console.log(`Wrote: ${LOG_PATH}`)
if (!apply) console.log('\n(dry run)')
