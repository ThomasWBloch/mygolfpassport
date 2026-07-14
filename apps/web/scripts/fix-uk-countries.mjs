// Re-assign UK courses to correct country based on coordinates
// Run with: node --env-file=.env.local scripts/fix-uk-countries.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function classifyUK(lat, lng) {
  // Northern Ireland: lat 54.0–55.3, lng -8.2 to -5.4
  if (lat >= 54.0 && lat <= 55.3 && lng >= -8.2 && lng <= -5.4) return 'Northern Ireland'
  // Scotland: lat > 55.0, lng -6.5 to -0.7
  if (lat > 55.0 && lng >= -6.5 && lng <= -0.7) return 'Scotland'
  // Wales: lat 51.3–53.5, lng -5.4 to -2.8
  if (lat >= 51.3 && lat <= 53.5 && lng >= -5.4 && lng <= -2.8) return 'Wales'
  // England: everything else
  return 'England'
}

const FLAGS = {
  'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Northern Ireland': '🇬🇧',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
}

// Fetch all England courses with coordinates
console.log('Fetching England courses with coordinates...')
const allCourses = []
let offset = 0
while (true) {
  const { data } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude')
    .eq('country', 'England')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .range(offset, offset + 999)
  if (!data || data.length === 0) break
  allCourses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

// Count courses without coordinates
const { count: noCoordCount } = await supabase
  .from('courses')
  .select('id', { count: 'exact', head: true })
  .eq('country', 'England')
  .is('latitude', null)

console.log(`  ${allCourses.length} with coordinates, ${noCoordCount} without (left as England)\n`)

// Classify each course
const moves = { Scotland: [], Wales: [], 'Northern Ireland': [], England: [] }

for (const c of allCourses) {
  const newCountry = classifyUK(c.latitude, c.longitude)
  moves[newCountry].push(c.id)
}

console.log('Classification results:')
for (const [country, ids] of Object.entries(moves)) {
  console.log(`  ${FLAGS[country]} ${country}: ${ids.length}`)
}
console.log()

// Update Scotland, Wales, Northern Ireland (skip England — already correct)
for (const country of ['Scotland', 'Wales', 'Northern Ireland']) {
  const ids = moves[country]
  if (ids.length === 0) {
    console.log(`${FLAGS[country]} ${country}: 0 to update — skipping`)
    continue
  }

  console.log(`${FLAGS[country]} ${country}: updating ${ids.length} courses...`)
  let updated = 0

  for (let i = 0; i < ids.length; i += 500) {
    const batch = ids.slice(i, i + 500)
    const { error } = await supabase
      .from('courses')
      .update({ country, flag: FLAGS[country] })
      .in('id', batch)
    if (error) {
      console.error(`  Batch error:`, error.message)
    } else {
      updated += batch.length
    }
  }

  console.log(`  ${updated} updated`)
}

console.log(`\n${'─'.repeat(45)}`)
console.log(`Summary:`)
console.log(`  Scotland:         ${moves.Scotland.length} courses reassigned`)
console.log(`  Wales:            ${moves.Wales.length} courses reassigned`)
console.log(`  Northern Ireland: ${moves['Northern Ireland'].length} courses reassigned`)
console.log(`  England:          ${moves.England.length} remain`)
console.log(`  No coordinates:   ${noCoordCount} left as England`)
