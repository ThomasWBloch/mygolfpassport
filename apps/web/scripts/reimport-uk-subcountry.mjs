// Reimport a specific UK sub-country (Wales, Northern Ireland, Scotland)
// Fetches all UK clubs from GolfAPI, classifies by coordinates, inserts only target country
// Run with: node --env-file=.env.local scripts/reimport-uk-subcountry.mjs "Wales"

import { createClient } from '@supabase/supabase-js'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const sleep = ms => new Promise(r => setTimeout(r, ms))

if (!GOLFAPI_KEY) { console.error('Missing GOLFAPI_KEY'); process.exit(1) }

const target = process.argv[2]
if (!target || !['Wales', 'Northern Ireland', 'Scotland'].includes(target)) {
  console.error('Usage: ... "Wales" | "Northern Ireland" | "Scotland"')
  process.exit(1)
}

const FLAGS = {
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Northern Ireland': '🇬🇧', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
}

function classifyUK(lat, lng) {
  if (lat == null || lng == null) return 'England'
  if (lat >= 54.0 && lat <= 55.35 && lng >= -8.2 && lng <= -5.4) return 'Northern Ireland'
  if (lat > 55.0 && lng >= -7.5 && lng <= -0.7) return 'Scotland'
  if (lat >= 51.3 && lat <= 53.5 && lng >= -5.4 && lng <= -2.65) return 'Wales'
  return 'England'
}

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

console.log('═'.repeat(60))
console.log(`${FLAGS[target]} Reimport ${target} from GolfAPI (UK search)`)
console.log('═'.repeat(60))

// Fetch existing courses for dedup
const existing = new Set()
let offset = 0
while (true) {
  const { data } = await supabase.from('courses').select('name, club').eq('country', target).range(offset, offset + 999)
  if (!data || data.length === 0) break
  for (const c of data) existing.add((c.name ?? '').trim().toLowerCase() + '||' + (c.club ?? '').trim().toLowerCase())
  offset += data.length
  if (data.length < 1000) break
}
console.log(`Existing ${target} courses: ${existing.size}`)

// Fetch all UK clubs from GolfAPI
console.log('\nFetching UK clubs from GolfAPI...')
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

// Geocode and classify — only keep target country
console.log(`\nGeocoding and classifying (keeping only ${target})...`)
const courseRows = []
let processed = 0, geoOk = 0, geoFail = 0

for (let i = 0; i < clubs.length; i++) {
  const club = clubs[i]
  const courses = club.courses ?? []
  if (courses.length === 0) continue

  let coords = await photonGeocode([club.clubName, club.city, 'UK'].filter(Boolean).join(', '))
  await sleep(350)

  if (!coords && club.address) {
    coords = await photonGeocode([club.address, club.city, 'UK'].filter(Boolean).join(', '))
    await sleep(350)
  }

  if (coords) geoOk++; else { geoFail++; continue }

  const classified = classifyUK(coords.lat, coords.lng)
  if (classified !== target) continue

  for (const course of courses) {
    const name = (course.courseName ?? club.clubName ?? '').trim()
    const clubName = (club.clubName ?? '').trim()
    const dedupKey = name.toLowerCase() + '||' + clubName.toLowerCase()
    if (existing.has(dedupKey)) continue

    courseRows.push({
      name,
      club: clubName,
      country: target,
      flag: FLAGS[target],
      latitude: coords.lat,
      longitude: coords.lng,
      holes: course.numHoles ?? 18,
      golfapi_id: course.courseID ?? null,
      is_major: false,
      is_combo: name.includes(' + '),
      address: [club.address, club.city].filter(Boolean).join(', ') || null,
    })
  }

  processed++
  if ((i + 1) % 200 === 0) {
    process.stdout.write(`  ${i + 1}/${clubs.length} clubs, ${courseRows.length} ${target} courses found...     \r`)
  }
}

const comboCount = courseRows.filter(c => c.is_combo).length
console.log(`  Geocoded: ${geoOk} ok, ${geoFail} failed`)
console.log(`  ${target} courses to insert: ${courseRows.length} (${comboCount} combos)`)

// Insert
let inserted = 0
for (let i = 0; i < courseRows.length; i += 500) {
  const batch = courseRows.slice(i, i + 500)
  const { error } = await supabase.from('courses').insert(batch)
  if (error) { console.error('  Insert error:', error.message); process.exit(1) }
  inserted += batch.length
}

const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', target)
console.log(`\n${'═'.repeat(60)}`)
console.log(`${FLAGS[target]} ${target}: ${inserted} courses inserted (${comboCount} combos)`)
console.log(`Total ${target} courses now: ${count}`)
console.log(`Credits remaining: ${lastCredits}`)
console.log(`API pages used: ${page} (${(page * 0.1).toFixed(1)} credits)`)
console.log('═'.repeat(60))
