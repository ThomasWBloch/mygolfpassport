// Generic apply script for Ireland match candidates.
// Replaces apply-ireland-batch1-high.mjs (kept around for audit) — this one
// is reusable across high/medium/low buckets and ignores already-applied
// rows so re-running is safe.
//
// Args:
//   --bucket=<high|medium|low>   which candidates bucket to process (required)
//   --apply                      write changes (default = dry run)
//   --skip="Club A,Club B"       skip specific clubs (comma-separated)
//   --label=<name>               log file suffix (default = bucket)
//
// Idempotency:
//   - Before each UPDATE we re-read DB state and compute a delta vs proposal
//   - Fields where DB already matches proposal are skipped silently
//   - Clubs where ALL fields are already current are dropped from the run
//
// Examples:
//   node --env-file=.env.local scripts/ireland/apply-ireland.mjs --bucket=high
//   node --env-file=.env.local scripts/ireland/apply-ireland.mjs --bucket=high --apply
//   node --env-file=.env.local scripts/ireland/apply-ireland.mjs --bucket=medium --apply --skip="Foo,Bar"

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const CANDIDATES_PATH = 'scripts/ireland/ireland-match-candidates.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const bucket = args.find((a) => a.startsWith('--bucket='))?.slice(9)
const label = args.find((a) => a.startsWith('--label='))?.slice(8) || bucket
const skipClubs = new Set(
  (args.find((a) => a.startsWith('--skip='))?.slice(7) || '')
    .split(',').map((s) => s.trim()).filter(Boolean),
)

if (!bucket || !['high', 'medium', 'low'].includes(bucket)) {
  console.error('Required: --bucket=high|medium|low')
  process.exit(1)
}

const LOG_PATH = `scripts/ireland/apply-ireland-${label}-log.json`

console.log(`Bucket: ${bucket}`)
console.log(apply ? 'APPLY mode — writes to DB\n' : 'DRY RUN (pass --apply to write)\n')
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}\n`)

const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
const entries = candidates[bucket]
console.log(`Candidate entries: ${entries.length} clubs`)

let totalCourses = 0
let totalUpdates = 0
let skippedAlreadyCurrent = 0
const fieldCounts = {}
const log = []
const failures = []

for (const e of entries) {
  if (skipClubs.has(e.club)) {
    console.log(`SKIP ${e.club} (--skip)`)
    continue
  }
  if (!e.proposedUpdate || !e.courseIds?.length) continue

  // Pre-check: read current DB state for these IDs
  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select('id, name, club, website, address, phone, latitude, longitude')
    .in('id', e.courseIds)
  if (selErr) {
    console.error(`SELECT failed for ${e.club}:`, selErr)
    failures.push({ club: e.club, stage: 'select', error: selErr.message })
    continue
  }

  // Compute idempotent delta: only include fields where ANY row differs from proposal
  const delta = {}
  for (const [k, v] of Object.entries(e.proposedUpdate)) {
    const anyDiffer = rows.some((r) => r[k] !== v)
    if (anyDiffer) delta[k] = v
  }

  if (Object.keys(delta).length === 0) {
    skippedAlreadyCurrent++
    continue // all proposed fields already match current DB — nothing to do
  }

  for (const f of Object.keys(delta)) fieldCounts[f] = (fieldCounts[f] || 0) + 1

  const deltaSummary = Object.entries(delta)
    .map(([k, v]) => `${k}=${typeof v === 'string' ? JSON.stringify(v) : v}`)
    .join(', ')
  console.log(`[${e.country}] ${e.club} (${rows.length} courses)`)
  if (Object.keys(delta).length < Object.keys(e.proposedUpdate).length) {
    const skippedFields = Object.keys(e.proposedUpdate).filter((k) => !(k in delta))
    console.log(`  already current: ${skippedFields.join(', ')}`)
  }
  console.log(`  source: ${JSON.stringify(e.updateSources)}`)
  console.log(`  set: ${deltaSummary}`)

  totalCourses += rows.length

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses')
      .update(delta, { count: 'exact' })
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
    delta,
    fullProposal: e.proposedUpdate,
    sources: e.updateSources,
    before: rows.map((r) => ({ id: r.id, website: r.website, address: r.address, phone: r.phone })),
    appliedAt: apply ? new Date().toISOString() : null,
  })
}

writeFileSync(LOG_PATH, JSON.stringify({
  bucket, apply, fieldCounts, totalCourses, totalUpdates, skippedAlreadyCurrent, failures, entries: log,
}, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Bucket processed:        ${bucket}`)
console.log(`Clubs with delta:        ${log.length}`)
console.log(`Clubs already current:   ${skippedAlreadyCurrent}`)
console.log(`Courses affected:        ${totalCourses}`)
console.log(`Field updates by column: ${JSON.stringify(fieldCounts)}`)
if (apply) console.log(`Rows actually updated:   ${totalUpdates}`)
if (failures.length) console.log(`Failures: ${failures.length} — see log`)
console.log(`Wrote: ${LOG_PATH}`)
if (!apply) console.log('\n(dry run — pass --apply to write to DB)')
