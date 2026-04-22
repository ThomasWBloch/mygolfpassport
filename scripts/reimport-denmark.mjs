// Re-import missing Danish courses from GolfAPI + Photon geocoding
// Run with: node --env-file=.env.local scripts/reimport-denmark.mjs

import { createClient } from '@supabase/supabase-js'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const sleep = ms => new Promise(r => setTimeout(r, ms))

if (!GOLFAPI_KEY) { console.error('Missing GOLFAPI_KEY in .env.local'); process.exit(1) }

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
console.log('🇩🇰 Denmark — Re-import missing courses')
console.log('═'.repeat(60))

// ── Step 1: Fetch existing Danish courses from DB ───────────────────────────

console.log('\nStep 1: Fetching existing Danish courses from Supabase...')
const existing = new Set()
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('name, club')
    .eq('country', 'Denmark')
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  for (const c of data) {
    // Key on lowercase name + club to match reliably
    const key = (c.name ?? '').trim().toLowerCase() + '||' + (c.club ?? '').trim().toLowerCase()
    existing.add(key)
  }
  offset += data.length
  if (data.length < 1000) break
}
console.log(`  ${existing.size} courses already in DB`)

// ── Step 2: Fetch Danish clubs from GolfAPI ─────────────────────────────────

console.log('\nStep 2: Fetching Danish clubs from GolfAPI...')
const clubs = []
let page = 1, total = 0, lastCredits = '?'

while (true) {
  const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=Denmark&page=${page}`, {
    headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
  })
  if (!resp.ok) { console.log(`  Page ${page}: HTTP ${resp.status} — stopping`); break }
  const data = await resp.json()
  const pageClubs = data.clubs ?? []
  total = data.numAllClubs ?? total
  clubs.push(...pageClubs)
  lastCredits = data.apiRequestsLeft
  process.stdout.write(`  Page ${page}: ${clubs.length}/${total} clubs — credits left: ${lastCredits}     \r`)
  if (clubs.length >= total || pageClubs.length === 0) break
  page++
  await sleep(200)
}
console.log(`  Fetched ${clubs.length} clubs in ${page} pages (credits left: ${lastCredits})          `)

// ── Step 3: Find missing courses ────────────────────────────────────────────

console.log('\nStep 3: Checking for missing courses...')
const missing = [] // { name, club, clubObj }

let totalFromApi = 0
for (const club of clubs) {
  const courses = club.courses ?? []
  for (const course of courses) {
    totalFromApi++
    const name = (course.courseName ?? club.clubName ?? '').trim()
    const clubName = (club.clubName ?? '').trim()
    const key = name.toLowerCase() + '||' + clubName.toLowerCase()
    if (!existing.has(key)) {
      missing.push({ name, clubName, course, club })
    }
  }
}

console.log(`  Total courses from GolfAPI: ${totalFromApi}`)
console.log(`  Already in DB: ${totalFromApi - missing.length}`)
console.log(`  Missing (to insert): ${missing.length}`)

if (missing.length === 0) {
  console.log('\nNo missing courses — nothing to do!')
  process.exit(0)
}

// Show what's missing
console.log('\n  Missing courses:')
for (const m of missing) {
  console.log(`    ${m.name} — ${m.clubName} (${m.course.numHoles ?? '?'}H)`)
}

// ── Step 4: Geocode + insert missing courses ────────────────────────────────

console.log('\nStep 4: Geocoding and inserting missing courses...')
const rows = []
let geoOk = 0, geoFail = 0

// Group missing by club to avoid duplicate geocoding
const byClub = new Map()
for (const m of missing) {
  if (!byClub.has(m.clubName)) byClub.set(m.clubName, { club: m.club, courses: [] })
  byClub.get(m.clubName).courses.push(m)
}

for (const [clubName, group] of byClub) {
  const club = group.club

  // Try geocoding
  let coords = await photonGeocode([club.clubName, club.city, 'Denmark'].filter(Boolean).join(', '))
  await sleep(400)

  if (!coords && club.address) {
    coords = await photonGeocode([club.address, club.city, 'Denmark'].filter(Boolean).join(', '))
    await sleep(400)
  }

  if (coords) geoOk++; else geoFail++

  for (const m of group.courses) {
    rows.push({
      name: m.name,
      club: clubName,
      country: 'Denmark',
      flag: '🇩🇰',
      latitude: coords?.lat ?? null,
      longitude: coords?.lng ?? null,
      holes: m.course.numHoles ?? 18,
      golfapi_id: m.course.courseID ?? null,
      is_major: false,
      address: [club.address, club.city].filter(Boolean).join(', ') || null,
    })
  }
}

console.log(`  Geocoded ${byClub.size} clubs: ${geoOk} ok, ${geoFail} failed`)

// Insert
let inserted = 0
for (let i = 0; i < rows.length; i += 500) {
  const batch = rows.slice(i, i + 500)
  const { error } = await supabase.from('courses').insert(batch)
  if (error) { console.error('  Insert error:', error.message); process.exit(1) }
  inserted += batch.length
}

console.log(`  Inserted: ${inserted} courses`)

// ── Step 5: Geocode any remaining courses without coordinates ───────────────

console.log('\nStep 5: Checking for Danish courses without coordinates...')
const { data: noCoords, error: ncErr } = await supabase
  .from('courses')
  .select('id, name, club, address')
  .eq('country', 'Denmark')
  .is('latitude', null)

if (ncErr) { console.error(ncErr); process.exit(1) }

if (noCoords && noCoords.length > 0) {
  console.log(`  ${noCoords.length} courses without coordinates — geocoding...`)
  let fixed = 0
  for (const c of noCoords) {
    let coords = null
    if (c.address) {
      coords = await photonGeocode(c.address + ', Denmark')
      await sleep(400)
    }
    if (!coords && c.club) {
      coords = await photonGeocode(c.club + ', Denmark')
      await sleep(400)
    }
    if (!coords && c.name) {
      coords = await photonGeocode(c.name + ', Denmark')
      await sleep(400)
    }
    if (coords) {
      await supabase.from('courses').update({ latitude: coords.lat, longitude: coords.lng }).eq('id', c.id)
      fixed++
    }
  }
  console.log(`  Fixed coordinates for ${fixed}/${noCoords.length} courses`)
} else {
  console.log('  All Danish courses have coordinates')
}

// ── Summary ─────────────────────────────────────────────────────────────────

const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', 'Denmark')

console.log(`\n${'═'.repeat(60)}`)
console.log(`Done! Re-inserted ${inserted} missing Danish courses.`)
console.log(`Total Danish courses now: ${count}`)
console.log('═'.repeat(60))
