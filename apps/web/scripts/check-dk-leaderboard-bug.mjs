import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Show schema of profiles
const { data: sample } = await supabase.from('profiles').select('*').limit(1)
console.log('profiles columns:', sample?.[0] ? Object.keys(sample[0]).join(', ') : '(empty)')

// Fetch the 4 users by name
const names = ['Thomas Bloch', 'Thomas Vennekilde', 'Casper Hjorth', 'Ole Mørk']
const { data: profiles } = await supabase
  .from('profiles').select('*').in('full_name', names)

console.log('\n--- Profiles ---')
for (const p of profiles ?? []) {
  const keys = ['full_name', 'home_club', 'home_country', 'country']
  const out = keys.filter(k => k in p).map(k => `${k}=${JSON.stringify(p[k])}`).join(' | ')
  console.log(`  ${out}`)
}

// For each profile's home_club, see if it exists in courses.club
console.log('\n--- Club → country lookup for each ---')
for (const p of profiles ?? []) {
  if (!p.home_club) { console.log(`  ${p.full_name}: home_club is NULL`); continue }
  const { data: match } = await supabase
    .from('courses').select('club, country').eq('club', p.home_club).limit(1)
  if (!match || match.length === 0) {
    console.log(`  ${p.full_name}: home_club="${p.home_club}" → no match in courses.club`)
  } else {
    console.log(`  ${p.full_name}: home_club="${p.home_club}" → country=${match[0].country}`)
  }
}
