// Apply cleaned addresses + phones to Swedish courses.
// Reads both the "clean" and "review" JSONs (postal-only entries are still
// useful since GolfAPI data is often worse — PO boxes, no postal code, etc.)
//
// Usage:
//   node --env-file=.env.local scripts/update-swedish-addresses.mjs           # dry run
//   node --env-file=.env.local scripts/update-swedish-addresses.mjs --apply   # write

import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const APPLY = process.argv.includes('--apply')

const clean = JSON.parse(readFileSync('scripts/swedish-club-addresses-cleaned.json', 'utf8'))
const review = JSON.parse(readFileSync('scripts/swedish-club-addresses-review.json', 'utf8'))
const mapping = { ...clean, ...review }
console.log(`Loaded ${Object.keys(clean).length} clean + ${Object.keys(review).length} review = ${Object.keys(mapping).length} clubs`)

// Safety net: reject addresses containing any of these junk tokens even if
// the cleanup pass missed them.
const JUNK_TOKENS = [
  'öppettider', 'telefontider', 'kansli', 'nödsamtal', 'sweden', 'logo',
  'välkommen', 'information', 'snabbl', 'reception', 'kontakta', 'medlem',
  'copyright', 'made by', 'powered by', 'telefon', 'e-post', 'kommunikationer',
  'facebook', 'instagram', 'öppnar', 'klubbstugan', 'integritetspolicy',
]
function hasJunk(addr) {
  const lower = addr.toLowerCase()
  return JUNK_TOKENS.some(t => lower.includes(t))
}

function addrIsSafe(addr) {
  if (!addr) return false
  if (hasJunk(addr)) return false
  return /\d{3}\s?\d{2}/.test(addr)
}

let all = [], from = 0
while (true) {
  const { data, error } = await s.from('courses')
    .select('id, club, address, phone')
    .eq('country', 'Sweden').range(from, from + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data.length) break
  all.push(...data)
  if (data.length < 1000) break
  from += 1000
}
console.log(`DB rows (Sweden): ${all.length}`)

let addrChange = 0, phoneChange = 0, bothSame = 0, noMapping = 0
const updates = []

for (const row of all) {
  const m = mapping[row.club]
  if (!m) { noMapping++; continue }

  const update = {}
  if (m.address && m.address !== row.address && addrIsSafe(m.address)) {
    update.address = m.address
    addrChange++
  }
  if (m.phone && m.phone !== row.phone) {
    update.phone = m.phone
    phoneChange++
  }
  if (!Object.keys(update).length) { bothSame++; continue }
  updates.push({ id: row.id, club: row.club, update, oldAddr: row.address })
}

console.log(`\nPlanned updates:`)
console.log(`  rows with address change: ${addrChange}`)
console.log(`  rows with phone change:   ${phoneChange}`)
console.log(`  rows already match:       ${bothSame}`)
console.log(`  rows with no mapping:     ${noMapping}`)
console.log(`  total update ops:         ${updates.length}`)

if (!APPLY) {
  console.log('\nSample 8 planned changes:')
  updates.slice(0, 8).forEach(u => {
    console.log(`  ${u.club}`)
    console.log(`    old: ${u.oldAddr}`)
    console.log(`    new: ${u.update.address || '(unchanged)'}`)
    if (u.update.phone) console.log(`    tel: ${u.update.phone}`)
  })
  console.log('\n(dry run — rerun with --apply to write)')
  process.exit(0)
}

let applied = 0
for (const u of updates) {
  const { error } = await s.from('courses').update(u.update).eq('id', u.id)
  if (error) { console.error(`update ${u.id}:`, error.message); process.exit(1) }
  applied++
  if (applied % 100 === 0 || applied === updates.length) console.log(`  updated ${applied}/${updates.length}`)
}
console.log(`\nDone. ${applied} rows updated.`)
