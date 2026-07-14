// Apply Wales match candidates (Pass 2). Modeled on apply-scotland/england.mjs.
// Run: node --env-file=.env.local scripts/wales/apply-wales.mjs --bucket=high

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const CANDIDATES_PATH = 'scripts/wales/wales-match-candidates.json'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const bucket = args.find((a) => a.startsWith('--bucket='))?.slice(9)
const label = args.find((a) => a.startsWith('--label='))?.slice(8) || bucket
const skipClubs = new Set(
  (args.find((a) => a.startsWith('--skip='))?.slice(7) || '').split(',').map((s) => s.trim()).filter(Boolean),
)

if (!bucket || !['high', 'medium', 'low'].includes(bucket)) {
  console.error('Required: --bucket=high|medium|low'); process.exit(1)
}

const LOG_PATH = `scripts/wales/apply-wales-${label}-log.json`
console.log(`Bucket: ${bucket}`)
console.log(apply ? 'APPLY mode\n' : 'DRY RUN\n')
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}\n`)

const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
const entries = candidates[bucket]
console.log(`Candidate entries: ${entries.length} clubs`)

let totalCourses = 0, totalUpdates = 0, skippedAlreadyCurrent = 0
const fieldCounts = {}, log = [], failures = []

for (const e of entries) {
  if (skipClubs.has(e.club)) { console.log(`SKIP ${e.club}`); continue }
  if (!e.proposedUpdate || !e.courseIds?.length) continue

  const { data: rows, error: selErr } = await supabase
    .from('courses').select('id, name, club, website, address, phone, latitude, longitude').in('id', e.courseIds)
  if (selErr) { failures.push({ club: e.club, stage: 'select', error: selErr.message }); continue }

  const delta = {}
  for (const [k, v] of Object.entries(e.proposedUpdate)) {
    const anyDiffer = rows.some((r) => r[k] !== v)
    if (anyDiffer) delta[k] = v
  }
  if (Object.keys(delta).length === 0) { skippedAlreadyCurrent++; continue }

  for (const f of Object.keys(delta)) fieldCounts[f] = (fieldCounts[f] || 0) + 1

  console.log(`${e.club} (${rows.length} courses): ${Object.entries(delta).map(([k, v]) => `${k}=${typeof v === 'string' ? JSON.stringify(v) : v}`).join(', ')}`)
  totalCourses += rows.length

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses').update(delta, { count: 'exact' }).in('id', e.courseIds)
    if (updErr) failures.push({ club: e.club, stage: 'update', error: updErr.message })
    else totalUpdates += count
  }

  log.push({
    club: e.club, country: e.country, courseCount: rows.length, delta,
    fullProposal: e.proposedUpdate, sources: e.updateSources,
    before: rows.map((r) => ({ id: r.id, website: r.website, address: r.address })),
    appliedAt: apply ? new Date().toISOString() : null,
  })
}

writeFileSync(LOG_PATH, JSON.stringify({ bucket, apply, fieldCounts, totalCourses, totalUpdates, skippedAlreadyCurrent, failures, entries: log }, null, 2))

console.log('\n--- Summary ---')
console.log(`Clubs with delta: ${log.length}, Already current: ${skippedAlreadyCurrent}, Courses affected: ${totalCourses}`)
console.log(`Field counts: ${JSON.stringify(fieldCounts)}`)
if (apply) console.log(`Rows updated: ${totalUpdates}`)
if (failures.length) console.log(`Failures: ${failures.length}`)
console.log(`Wrote: ${LOG_PATH}`)
