import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const { data, error } = await supabase
  .from('courses')
  .select('id, name, club, country')
  .ilike('name', '% + %')

if (error) { console.error(error); process.exit(1) }

console.log(`Total combo courses to delete: ${data.length}`)

// Show a sample
const sample = data.slice(0, 20)
sample.forEach(c => console.log(`  ${c.name} — ${c.club} (${c.country})`))

// Count by country
const byCountry = {}
data.forEach(c => { byCountry[c.country] = (byCountry[c.country] || 0) + 1 })
console.log('\nBy country:')
Object.entries(byCountry).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`))
