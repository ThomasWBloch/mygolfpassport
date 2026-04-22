import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// First peek at schema
const { data: sample } = await supabase.from('courses').select('*').eq('country', 'Finland').limit(1)
if (sample && sample[0]) {
  console.log('Columns:', Object.keys(sample[0]).join(', '))
}

const { data, error, count } = await supabase
  .from('courses')
  .select('*', { count: 'exact' })
  .eq('country', 'Finland')
  .order('name')

if (error) { console.error(error); process.exit(1) }

console.log(`\nTotal Finnish courses: ${count}`)
if (!data || data.length === 0) { console.log('No Finnish courses in DB'); process.exit(0) }

const cols = Object.keys(data[0])
const addrCol = cols.find(c => c === 'address' || c === 'address_line' || c === 'street')
const webCol = cols.find(c => c === 'website' || c === 'url')
const latCol = cols.find(c => c === 'latitude' || c === 'lat')
const lngCol = cols.find(c => c === 'longitude' || c === 'lng' || c === 'lon')
const clubCol = cols.find(c => c === 'club_name' || c === 'club')
const comboCol = cols.find(c => c === 'is_combo')
const holesCol = cols.find(c => c === 'num_holes' || c === 'holes')

const withAddr = addrCol ? data.filter(c => c[addrCol] && String(c[addrCol]).trim()).length : 'n/a'
const withWeb = webCol ? data.filter(c => c[webCol] && String(c[webCol]).trim()).length : 'n/a'
const withCoords = (latCol && lngCol) ? data.filter(c => c[latCol] && c[lngCol]).length : 'n/a'
const combo = comboCol ? data.filter(c => c[comboCol]).length : 'n/a'

console.log(`With address: ${withAddr}, website: ${withWeb}, coords: ${withCoords}, combo: ${combo}`)

const clubField = clubCol || 'name'
const uniqClubs = new Set(data.map(c => c[clubField]))
console.log(`Unique ${clubField}s: ${uniqClubs.size}`)

console.log('\nFirst 20 courses:')
data.slice(0, 20).forEach(c => {
  const cn = clubCol ? c[clubCol] : ''
  const nm = c.name
  const h = holesCol ? c[holesCol] : ''
  const isC = comboCol && c[comboCol] ? '(COMBO)' : ''
  console.log(`  ${cn ? cn + ' — ' : ''}${nm} [${h}h] ${isC}`)
})
