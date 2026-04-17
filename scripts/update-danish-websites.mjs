// Apply website URLs from scripts/danish-club-websites.json to the Danish
// courses in the DB. Runs in preview mode by default; pass --apply to write.
//
// Usage:
//   node --env-file=.env.local scripts/update-danish-websites.mjs           # dry run
//   node --env-file=.env.local scripts/update-danish-websites.mjs --apply   # write

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const APPLY = process.argv.includes('--apply')

const mapping = JSON.parse(readFileSync('scripts/danish-club-websites.json', 'utf8'))
const clubs = Object.keys(mapping)
console.log(`Loaded ${clubs.length} club→website mappings from JSON.`)

// Inspect current DB state
const all = []
let o = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, club, website')
    .eq('country', 'Denmark')
    .range(o, o + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data?.length) break
  all.push(...data)
  o += data.length
  if (data.length < 1000) break
}
console.log(`DB rows (Denmark): ${all.length}`)

// Per-club summary
const dbClubs = new Set(all.map(r => r.club))
const missingInDb = clubs.filter(c => !dbClubs.has(c))
const missingInJson = [...dbClubs].filter(c => !(c in mapping))

if (missingInDb.length) {
  console.log(`\n⚠ ${missingInDb.length} clubs in JSON not in DB:`)
  missingInDb.forEach(c => console.log(`    ${c}`))
}
if (missingInJson.length) {
  console.log(`\n⚠ ${missingInJson.length} DB clubs with no URL in JSON (will be left null):`)
  missingInJson.forEach(c => console.log(`    ${c}`))
}

// Plan updates
let toUpdate = 0, wouldOverwrite = 0, alreadyCorrect = 0
const planned = new Map() // id → website
for (const row of all) {
  const target = mapping[row.club]
  if (!target) continue
  if (row.website === target) { alreadyCorrect++; continue }
  if (row.website && row.website !== target) wouldOverwrite++
  planned.set(row.id, target)
  toUpdate++
}

console.log(`\nPlanned updates: ${toUpdate} rows`)
console.log(`  already correct:     ${alreadyCorrect}`)
console.log(`  would overwrite:     ${wouldOverwrite}`)

if (!APPLY) {
  console.log('\n(dry run — rerun with --apply to write)')
  process.exit(0)
}

// Apply in batches
const entries = [...planned.entries()]
const BATCH = 100
let applied = 0
for (let i = 0; i < entries.length; i += BATCH) {
  const batch = entries.slice(i, i + BATCH)
  // Supabase JS doesn't have bulk-update-different-values, so loop per-row
  for (const [id, website] of batch) {
    const { error } = await supabase.from('courses').update({ website }).eq('id', id)
    if (error) { console.error(`update ${id}:`, error.message); process.exit(1) }
  }
  applied += batch.length
  console.log(`  updated ${applied}/${entries.length}`)
}
console.log(`\nDone. ${applied} rows updated.`)
