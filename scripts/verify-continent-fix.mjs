// Simulate the fixed leaderboard logic against real DB, from Thomas Bloch's
// perspective. Asserts all 4 Danish users land in sameContinent/sameCountry.

import { createClient } from '@supabase/supabase-js'
import { getContinent } from '../src/lib/continents.ts'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const names = ['Thomas Bloch', 'Thomas Vennekilde', 'Casper Hjorth', 'Ole Mørk']
const { data: profiles } = await supabase
  .from('profiles').select('id, full_name, home_club, home_country').in('full_name', names)

const me = profiles.find(p => p.full_name === 'Thomas Bloch')
const myCountry = me?.home_country ?? null
const myContinent = myCountry ? getContinent(myCountry) : null
console.log(`me = Thomas Bloch | myCountry=${myCountry} | myContinent=${myContinent}\n`)

console.log('Per user (fixed logic):')
for (const p of profiles) {
  const userCountry = p.home_country ?? null
  const userContinent = userCountry ? getContinent(userCountry) : null
  const sameCountry = myCountry != null && userCountry === myCountry
  const sameContinent = myContinent != null && userContinent === myContinent
  console.log(`  ${p.full_name.padEnd(22)} country=${String(userCountry).padEnd(8)} continent=${String(userContinent).padEnd(8)} sameCountry=${sameCountry} sameContinent=${sameContinent}`)
}
