// Re-match DB state against SGL data after batches 1-4.
// Now most DB club names should match SGL exactly.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const sglClubs = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))

const { data } = await supabase.from('courses').select('club').eq('country', 'Finland')
const dbClubs = [...new Set(data.map(r => r.club))]

const sglByName = new Map(sglClubs.map(c => [c.name, c]))

const matched = []
const unmatched = []
for (const dbName of dbClubs) {
  if (sglByName.has(dbName)) matched.push(dbName)
  else unmatched.push(dbName)
}

console.log(`DB clubs: ${dbClubs.length}  SGL clubs: ${sglClubs.length}`)
console.log(`Matched: ${matched.length}  Unmatched: ${unmatched.length}`)
console.log('\nUnmatched DB clubs (no SGL data to copy):')
unmatched.sort().forEach(n => console.log(`  "${n}"`))

const sglMatchedIds = new Set(matched.map(n => sglByName.get(n).id))
const sglUnused = sglClubs.filter(c => !sglMatchedIds.has(c.id))
console.log(`\nSGL clubs with no DB match: ${sglUnused.length}`)
sglUnused.forEach(c => console.log(`  "${c.name}" (${c.city})`))
