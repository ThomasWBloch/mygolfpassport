// Geocode remaining UK courses without coordinates using Photon (komoot)
// Then re-classify Scotland/Wales/Northern Ireland based on results
// Run with: node --env-file=.env.local scripts/geocode-geoapify.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const sleep = ms => new Promise(r => setTimeout(r, ms))

const UK_STATE_MAP = {
  'Alba / Scotland': 'Scotland',
  'Scotland': 'Scotland',
  'Cymru / Wales': 'Wales',
  'Wales': 'Wales',
  'Northern Ireland': 'Northern Ireland',
}

const FLAGS = {
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'Northern Ireland': '🇬🇧',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
}

async function photonGeocode(query) {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!resp.ok) return null
    const data = await resp.json()
    const f = data.features?.[0]
    if (!f) return null
    const [lng, lat] = f.geometry.coordinates
    const state = f.properties?.state ?? null
    const country = f.properties?.country ?? null
    return { lat, lng, state, country }
  } catch {
    return null
  }
}

// Fetch all England courses without coordinates
console.log('Fetching England courses without coordinates...')
const courses = []
let offset = 0
while (true) {
  const { data } = await supabase
    .from('courses')
    .select('id, name, club, address')
    .eq('country', 'England')
    .is('latitude', null)
    .range(offset, offset + 999)
  if (!data || data.length === 0) break
  courses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

console.log(`  ${courses.length} courses to geocode\n`)

let geocoded = 0
let failed = 0
const reassign = { Scotland: [], Wales: [], 'Northern Ireland': [] }
const updates = [] // { id, lat, lng, country, flag }

for (let i = 0; i < courses.length; i++) {
  const c = courses[i]
  process.stdout.write(`  [${i + 1}/${courses.length}] ${c.club ?? c.name}...`)

  // Try club name + "golf" + "United Kingdom"
  let result = await photonGeocode(`${c.club ?? c.name} golf United Kingdom`)
  await sleep(500)

  // Fallback: address if available
  if (!result && c.address) {
    result = await photonGeocode(`${c.address} United Kingdom`)
    await sleep(500)
  }

  if (result && result.country === 'United Kingdom') {
    geocoded++

    // Determine correct UK country from state
    let newCountry = 'England'
    for (const [statePattern, countryName] of Object.entries(UK_STATE_MAP)) {
      if (result.state && result.state.includes(statePattern)) {
        newCountry = countryName
        break
      }
    }

    const flag = FLAGS[newCountry] ?? FLAGS.England

    if (newCountry !== 'England') {
      reassign[newCountry].push(c.id)
      console.log(` ✓ ${result.lat.toFixed(4)}, ${result.lng.toFixed(4)} → ${newCountry}`)
    } else {
      console.log(` ✓ ${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}`)
    }

    updates.push({ id: c.id, lat: result.lat, lng: result.lng, country: newCountry, flag })
  } else {
    failed++
    console.log(` ✗`)
  }
}

// Apply updates in batches
console.log(`\nApplying ${updates.length} coordinate updates...`)
let applied = 0
for (const u of updates) {
  const { error } = await supabase
    .from('courses')
    .update({
      latitude: u.lat,
      longitude: u.lng,
      country: u.country,
      flag: u.flag,
    })
    .eq('id', u.id)
  if (!error) applied++
}

console.log(`  ${applied} updated\n`)

console.log('─'.repeat(50))
console.log('Summary:')
console.log(`  Total processed:     ${courses.length}`)
console.log(`  Geocoded:            ${geocoded}`)
console.log(`  Failed:              ${failed}`)
console.log(`  Reassigned:`)
console.log(`    → Scotland:        ${reassign.Scotland.length}`)
console.log(`    → Wales:           ${reassign.Wales.length}`)
console.log(`    → N. Ireland:      ${reassign['Northern Ireland'].length}`)
console.log(`    → England:         ${geocoded - reassign.Scotland.length - reassign.Wales.length - reassign['Northern Ireland'].length}`)
