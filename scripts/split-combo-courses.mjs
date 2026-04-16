// Mark combo courses (name contains " + ") as is_combo = true
// Does NOT create individual courses — trusts GolfAPI to provide them separately
// Run with: node --env-file=.env.local scripts/split-combo-courses.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

console.log('═'.repeat(60))
console.log('Mark combo courses (is_combo = true)')
console.log('═'.repeat(60))

// Fetch all courses with " + " in the name
console.log('\nFetching combo courses...')
const combos = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, country')
    .ilike('name', '% + %')
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  combos.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

console.log(`  Found ${combos.length} combo courses`)

if (combos.length === 0) {
  console.log('\nNo combo courses found — nothing to do!')
  process.exit(0)
}

// Mark all as is_combo = true
console.log('\nMarking as is_combo = true...')
const ids = combos.map(c => c.id)
for (let i = 0; i < ids.length; i += 500) {
  const batch = ids.slice(i, i + 500)
  const { error } = await supabase
    .from('courses')
    .update({ is_combo: true })
    .in('id', batch)
  if (error) { console.error('  Error:', error); process.exit(1) }
}
console.log(`  Marked ${ids.length} courses`)

// Summary by country
const byCountry = {}
combos.forEach(c => { byCountry[c.country] = (byCountry[c.country] || 0) + 1 })
console.log('\nBy country:')
Object.entries(byCountry).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k}: ${v}`))

console.log(`\n${'═'.repeat(60)}`)
console.log(`Done. ${ids.length} combo courses marked.`)
console.log('═'.repeat(60))
