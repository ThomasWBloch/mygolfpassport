// Reimport all UK courses from GolfAPI as one "UK" search,
// then classify into England/Scotland/Wales/Northern Ireland
// using coordinate bounding boxes + city name matching.
// Only inserts courses missing from each sub-country.
// Marks combo courses (name contains " + ") as is_combo = true.
// Run with: node --env-file=.env.local scripts/reimport-uk.mjs

import { createClient } from '@supabase/supabase-js'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const sleep = ms => new Promise(r => setTimeout(r, ms))

if (!GOLFAPI_KEY) { console.error('Missing GOLFAPI_KEY'); process.exit(1) }

const FLAGS = {
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Northern Ireland': '🇬🇧',
}

// ── Classification ──────────────────────────────────────────────────────────

function classifyUK(lat, lng) {
  if (lat == null || lng == null) return null // needs city-name fallback
  if (lat >= 54.0 && lat <= 55.3 && lng >= -8.2 && lng <= -5.4) return 'Northern Ireland'
  if (lat > 55.0 && lng >= -7.5 && lng <= -0.7) return 'Scotland'
  if (lat >= 51.3 && lat <= 53.5 && lng >= -5.4 && lng <= -2.65) return 'Wales'
  return 'England'
}

const SCOTTISH_CITIES = [
  'st andrews', 'edinburgh', 'glasgow', 'aberdeen', 'inverness',
  'dundee', 'perth', 'stirling', 'fife', 'ayrshire', 'argyll',
  'highlands', 'moray', 'angus', 'lothian', 'lanarkshire',
  'renfrewshire', 'dumfries', 'galloway', 'borders', 'carnoustie',
  'turnberry', 'muirfield', 'troon', 'prestwick',
]

const WELSH_CITIES = [
  'cardiff', 'swansea', 'newport', 'wrexham', 'aberystwyth',
  'pembroke', 'gwynedd', 'conwy', 'anglesey', 'powys',
  'glamorgan', 'monmouth', 'carmarthen', 'ceredigion', 'porthcawl',
  'llanelli', 'neath', 'bridgend', 'caerphilly', 'merthyr',
  'pontypridd', 'rhondda', 'flintshire', 'denbighshire', 'vale of glamorgan',
]

const NI_CITIES = [
  'belfast', 'derry', 'londonderry', 'lisburn', 'newry', 'armagh',
  'bangor', 'craigavon', 'ballymena', 'newtownabbey', 'coleraine',
  'omagh', 'enniskillen', 'portrush', 'royal county down', 'royal portrush',
]

function classifyByCityName(clubName, city, address) {
  const text = [clubName, city, address].filter(Boolean).join(' ').toLowerCase()
  for (const t of SCOTTISH_CITIES) { if (text.includes(t)) return 'Scotland' }
  for (const t of WELSH_CITIES) { if (text.includes(t)) return 'Wales' }
  for (const t of NI_CITIES) { if (text.includes(t)) return 'Northern Ireland' }
  return null
}

// ── Geocoding ───────────────────────────────────────────────────────────────

async function photonGeocode(query) {
  try {
    const resp = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`, { signal: AbortSignal.timeout(10000) })
    if (!resp.ok) return null
    const data = await resp.json()
    const f = data.features?.[0]
    if (!f) return null
    const [lng, lat] = f.geometry.coordinates
    return { lat, lng }
  } catch { return null }
}

// ── Main ────────────────────────────────────────────────────────────────────

console.log('═'.repeat(60))
console.log('UK Reimport — fetch "UK", classify, insert missing')
console.log('═'.repeat(60))

// Step 1: Load existing courses for all UK sub-countries (for dedup)
console.log('\nStep 1: Loading existing UK courses for dedup...')
const existingByCountry = {}
for (const c of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
  existingByCountry[c] = new Set()
  let offset = 0
  while (true) {
    const { data } = await supabase.from('courses').select('name, club').eq('country', c).range(offset, offset + 999)
    if (!data || data.length === 0) break
    for (const r of data) {
      existingByCountry[c].add((r.name ?? '').trim().toLowerCase() + '||' + (r.club ?? '').trim().toLowerCase())
    }
    offset += data.length
    if (data.length < 1000) break
  }
  console.log(`  ${c}: ${existingByCountry[c].size} existing`)
}

// Step 2: Fetch all UK clubs from GolfAPI
console.log('\nStep 2: Fetching UK clubs from GolfAPI...')
const clubs = []
let page = 1, total = 0, lastCredits = '?'

while (true) {
  const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=UK&page=${page}`, {
    headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
  })
  if (!resp.ok) { console.log(`  Page ${page}: HTTP ${resp.status}`); break }
  const data = await resp.json()
  const pageClubs = data.clubs ?? []
  total = data.numAllClubs ?? total
  clubs.push(...pageClubs)
  lastCredits = data.apiRequestsLeft
  process.stdout.write(`  Page ${page}: ${clubs.length}/${total} — credits: ${lastCredits}     \r`)
  if (clubs.length >= total || pageClubs.length === 0) break
  page++
  await sleep(200)
}
console.log(`  Fetched ${clubs.length} clubs in ${page} pages (credits: ${lastCredits})          `)
console.log(`  Credits used: ${(page * 0.1).toFixed(1)}`)

// Step 3: Geocode, classify, build course rows
console.log('\nStep 3: Geocoding and classifying...')
const coursesByCountry = { England: [], Scotland: [], Wales: [], 'Northern Ireland': [] }
let geoOk = 0, geoFail = 0, cityFallback = 0

for (let i = 0; i < clubs.length; i++) {
  const club = clubs[i]
  const courses = club.courses ?? []
  if (courses.length === 0) continue

  // Geocode
  let coords = await photonGeocode([club.clubName, club.city, 'UK'].filter(Boolean).join(', '))
  await sleep(350)

  if (!coords && club.address) {
    coords = await photonGeocode([club.address, club.city, 'UK'].filter(Boolean).join(', '))
    await sleep(350)
  }

  // Classify
  let country = null
  if (coords) {
    geoOk++
    country = classifyUK(coords.lat, coords.lng)
  } else {
    geoFail++
  }

  // Fallback to city name matching if no coords or classified as England
  if (!country || country === 'England') {
    const cityMatch = classifyByCityName(club.clubName, club.city, club.address)
    if (cityMatch) {
      country = cityMatch
      cityFallback++
    }
  }

  // Default to England if still unclassified
  if (!country) country = 'England'

  const existingSet = existingByCountry[country]

  for (const course of courses) {
    const name = (course.courseName ?? club.clubName ?? '').trim()
    const clubName = (club.clubName ?? '').trim()
    const dedupKey = name.toLowerCase() + '||' + clubName.toLowerCase()

    if (existingSet.has(dedupKey)) continue

    coursesByCountry[country].push({
      name,
      club: clubName,
      country,
      flag: FLAGS[country],
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      holes: course.numHoles ?? 18,
      golfapi_id: course.courseID ?? null,
      is_major: false,
      is_combo: name.includes(' + '),
      address: [club.address, club.city].filter(Boolean).join(', ') || null,
    })
  }

  if ((i + 1) % 200 === 0) {
    const totalNew = Object.values(coursesByCountry).reduce((s, a) => s + a.length, 0)
    process.stdout.write(`  ${i + 1}/${clubs.length} clubs — ${totalNew} new courses found...     \r`)
  }
}

console.log(`  Geocoded: ${geoOk} ok, ${geoFail} failed, ${cityFallback} city-name fallbacks          `)

// Step 4: Insert per country
console.log('\nStep 4: Inserting new courses...')
for (const country of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
  const rows = coursesByCountry[country]
  const comboCount = rows.filter(c => c.is_combo).length

  if (rows.length === 0) {
    console.log(`  ${FLAGS[country]} ${country}: 0 new courses — skipping`)
    continue
  }

  let inserted = 0
  for (let i = 0; i < rows.length; i += 500) {
    const batch = rows.slice(i, i + 500)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) { console.error(`  ${country} insert error:`, error.message); process.exit(1) }
    inserted += batch.length
  }

  // Also mark any previously existing unmarked combos
  const { data: unmarked } = await supabase
    .from('courses')
    .select('id')
    .eq('country', country)
    .ilike('name', '% + %')
    .eq('is_combo', false)
  if (unmarked && unmarked.length > 0) {
    await supabase.from('courses').update({ is_combo: true }).in('id', unmarked.map(c => c.id))
    console.log(`  ${FLAGS[country]} ${country}: marked ${unmarked.length} existing combos`)
  }

  const { count: total } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country)
  console.log(`  ${FLAGS[country]} ${country}: +${inserted} (${comboCount} combos) → total: ${total}`)
}

// Summary
console.log(`\n${'═'.repeat(60)}`)
console.log('SUMMARY')
console.log('═'.repeat(60))
for (const country of ['England', 'Scotland', 'Wales', 'Northern Ireland']) {
  const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country)
  const { count: combos } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country).eq('is_combo', true)
  console.log(`  ${FLAGS[country]} ${country.padEnd(20)} total: ${count} (${combos} combos)`)
}
console.log(`\nGolfAPI pages: ${page} (${(page * 0.1).toFixed(1)} credits)`)
console.log(`Credits remaining: ${lastCredits}`)
console.log('═'.repeat(60))
