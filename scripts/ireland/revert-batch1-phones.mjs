// Revert phone-column updates applied in Batch 1 high-conf.
// Reads apply-ireland-batch1-log.json, finds entries where 'phone' was in
// the update map, and sets phone=null for those exact course IDs.
//
// Pre-batch1 state was: Ireland 0 phones, NI 0 phones. So this revert
// should bring us back to that baseline for the affected rows. We do NOT
// blanket-null all Ireland+NI phones — only IDs we touched in the log.
//
// Run dry-run:
//   node --env-file=.env.local scripts/ireland/revert-batch1-phones.mjs
// Apply:
//   node --env-file=.env.local scripts/ireland/revert-batch1-phones.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const LOG_IN = 'scripts/ireland/apply-ireland-batch1-log.json'
const LOG_OUT = 'scripts/ireland/revert-batch1-phones-log.json'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode — sets phone=null for affected rows\n' : 'DRY RUN (pass --apply to write)\n')

const log = JSON.parse(readFileSync(LOG_IN, 'utf8'))
const phoneEntries = log.entries.filter((e) => e.update?.phone)
const courseIdsToRevert = phoneEntries.flatMap((e) => e.before.map((b) => b.id))

console.log(`Batch 1 entries with phone updates: ${phoneEntries.length} clubs`)
console.log(`Course rows to revert: ${courseIdsToRevert.length}`)
console.log('')

// Pre-revert state for audit
const { data: beforeRows, error: selErr } = await supabase
  .from('courses')
  .select('id, club, country, phone')
  .in('id', courseIdsToRevert)

if (selErr) {
  console.error('Pre-revert SELECT failed:', selErr)
  process.exit(1)
}

const phonesBefore = beforeRows.filter((r) => r.phone).length
const phonesAlreadyNull = beforeRows.filter((r) => !r.phone).length
console.log(`Pre-revert: ${phonesBefore} rows have a phone, ${phonesAlreadyNull} already null`)

if (apply) {
  const { error: updErr, count } = await supabase
    .from('courses')
    .update({ phone: null }, { count: 'exact' })
    .in('id', courseIdsToRevert)
  if (updErr) {
    console.error('UPDATE failed:', updErr)
    process.exit(1)
  }
  console.log(`✓ Reverted phone=null on ${count} rows`)

  // Post-revert verification
  const { data: afterCheck } = await supabase
    .from('courses')
    .select('id, phone')
    .in('id', courseIdsToRevert)
  const stillHasPhone = afterCheck.filter((r) => r.phone).length
  console.log(`Post-revert: ${stillHasPhone} rows still have a phone (expected 0)`)
}

// Wider sanity: how many phones remain in Ireland + NI overall?
const { data: allRows } = await supabase
  .from('courses')
  .select('country, phone')
  .in('country', ['Ireland', 'Northern Ireland'])
const totals = allRows.reduce((acc, r) => {
  if (!acc[r.country]) acc[r.country] = { total: 0, with_phone: 0 }
  acc[r.country].total++
  if (r.phone) acc[r.country].with_phone++
  return acc
}, {})
console.log('')
console.log('Overall Ireland+NI phone counts:')
console.log(JSON.stringify(totals, null, 2))

writeFileSync(LOG_OUT, JSON.stringify({
  apply,
  affectedClubs: phoneEntries.length,
  affectedRows: courseIdsToRevert.length,
  phonesBefore,
  totalsAfter: totals,
  beforeSnapshot: beforeRows,
}, null, 2))

console.log(`\nWrote: ${LOG_OUT}`)
if (!apply) console.log('(dry run — pass --apply to write)')
