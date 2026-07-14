// Apply Batch 1 — high-confidence updates for Ireland + Northern Ireland.
// Reads scripts/ireland/ireland-match-candidates.json and applies the
// proposedUpdate for every entry in the `high` bucket.
//
// Each entry's proposedUpdate is a {column: value} map (website, address,
// phone, latitude, longitude). The update is applied to all courseIds for
// that club.
//
// Run dry-run first:
//   node --env-file=.env.local scripts/ireland/apply-ireland-batch1-high.mjs
// Apply for real:
//   node --env-file=.env.local scripts/ireland/apply-ireland-batch1-high.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const CANDIDATES_PATH = 'scripts/ireland/ireland-match-candidates.json'
const LOG_PATH = 'scripts/ireland/apply-ireland-batch1-log.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const apply = process.argv.includes('--apply')
const skipClubs = new Set(
  (process.argv.find((a) => a.startsWith('--skip='))?.slice(7) || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)

console.log(apply ? 'APPLY mode — writes to DB\n' : 'DRY RUN (pass --apply to write)\n')
if (skipClubs.size) console.log(`Skipping clubs: ${[...skipClubs].join(', ')}\n`)

const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
const entries = candidates.high
console.log(`High-conf entries: ${entries.length} clubs`)

let totalCourses = 0
let totalUpdates = 0
const fieldCounts = {}
const log = []
const failures = []

for (const e of entries) {
  if (skipClubs.has(e.club)) {
    console.log(`SKIP ${e.club} (--skip)`)
    continue
  }

  const update = e.proposedUpdate
  const ids = e.courseIds
  if (!update || !ids?.length) continue

  // Field-count tally
  for (const f of Object.keys(update)) fieldCounts[f] = (fieldCounts[f] || 0) + 1

  // Pre-check: confirm DB rows exist + show current values for audit
  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select('id, name, club, website, address, phone, latitude, longitude')
    .in('id', ids)

  if (selErr) {
    console.error(`SELECT failed for ${e.club}:`, selErr)
    failures.push({ club: e.club, stage: 'select', error: selErr.message })
    continue
  }

  if (rows.length !== ids.length) {
    console.warn(`  ! ${e.club}: expected ${ids.length} rows, got ${rows.length}`)
  }

  const updateSummary = Object.entries(update)
    .map(([k, v]) => `${k}=${typeof v === 'string' ? JSON.stringify(v) : v}`)
    .join(', ')
  console.log(`[${e.country}] ${e.club} (${rows.length} courses)`)
  console.log(`  source: ${JSON.stringify(e.updateSources)}`)
  console.log(`  set: ${updateSummary}`)

  totalCourses += rows.length

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses')
      .update(update, { count: 'exact' })
      .in('id', ids)
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
    update,
    sources: e.updateSources,
    before: rows.map((r) => ({ id: r.id, website: r.website, address: r.address, phone: r.phone })),
    appliedAt: apply ? new Date().toISOString() : null,
  })
}

writeFileSync(LOG_PATH, JSON.stringify({ apply, fieldCounts, totalCourses, totalUpdates, failures, entries: log }, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Clubs processed:   ${log.length}`)
console.log(`Courses affected:  ${totalCourses}`)
console.log(`Field updates:     ${JSON.stringify(fieldCounts)}`)
if (apply) console.log(`Rows actually updated: ${totalUpdates}`)
if (failures.length) console.log(`Failures: ${failures.length} — see log`)
console.log(`Wrote: ${LOG_PATH}`)
if (!apply) console.log('\n(dry run — pass --apply to write to DB)')
