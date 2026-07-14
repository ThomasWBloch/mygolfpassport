// Import USA golf courses from GolfAPI.io into Supabase
// Run with: node --env-file=.env.local scripts/import-golfapi-usa.mjs
//
// CRITICAL: Only uses /clubs search endpoint (0.1 credit/page).
// Geocodes via Photon (komoot) — no API key needed.

import { createClient } from '@supabase/supabase-js'
import { writeFileSync, readFileSync, existsSync } from 'fs'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const PROGRESS_FILE = 'scripts/usa-progress.json'
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── Progress tracking ────────────────────────────────────────────────────────

function loadProgress() {
  if (!existsSync(PROGRESS_FILE)) return { fetchedClubs: null, courseRows: [], geocodeOffset: 0, inserted: false }
  try { return JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8')) } catch { return { fetchedClubs: null, courseRows: [], geocodeOffset: 0, inserted: false } }
}

function saveProgress(p) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(p))
}

// ── Photon geocoder ──────────────────────────────────────────────────────────

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

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('═'.repeat(60))
console.log('GolfAPI.io USA Import')
console.log('═'.repeat(60))

const progress = loadProgress()

// ── Step 1: Fetch all USA clubs ──────────────────────────────────────────────

let clubs
if (progress.fetchedClubs) {
  clubs = progress.fetchedClubs
  console.log(`\nStep 1: SKIPPED — ${clubs.length} clubs loaded from progress file`)
} else {
  console.log('\nStep 1: Fetching USA clubs from GolfAPI.io...')
  clubs = []
  let page = 1
  let total = 0

  while (true) {
    const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=USA&page=${page}`, {
      headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
    })
    if (!resp.ok) { console.log(`  Page ${page}: HTTP ${resp.status} — stopping`); break }

    const data = await resp.json()
    const pageClubs = data.clubs ?? []
    total = data.numAllClubs ?? total
    clubs.push(...pageClubs)

    process.stdout.write(`  Page ${page}: ${clubs.length}/${total} — credits left: ${data.apiRequestsLeft}     \r`)

    if (clubs.length >= total || pageClubs.length === 0) break
    page++
    await sleep(200)
  }

  console.log(`  Fetched ${clubs.length} clubs in ${page} pages                          `)

  progress.fetchedClubs = clubs
  saveProgress(progress)
  console.log('  Progress saved')
}

// ── Step 2: Build course rows + geocode ──────────────────────────────────────

if (progress.courseRows.length > 0 && progress.geocodeOffset >= clubs.length) {
  console.log(`\nStep 2: SKIPPED — ${progress.courseRows.length} courses already geocoded`)
} else {
  console.log(`\nStep 2: Building course rows + geocoding ${clubs.length} clubs...`)

  const startAt = progress.geocodeOffset
  if (startAt > 0) console.log(`  Resuming from club ${startAt}`)

  let geoOk = 0, geoFail = 0

  for (let i = startAt; i < clubs.length; i++) {
    const club = clubs[i]
    const courses = club.courses ?? []
    if (courses.length === 0) continue

    // Geocode
    let coords = null
    const searchName = club.clubName ?? ''
    const searchCity = club.city ?? ''
    const searchState = club.state ?? ''

    // Try: club name + city + state + USA
    const query = [searchName, searchCity, searchState, 'USA'].filter(Boolean).join(', ')
    coords = await photonGeocode(query)
    await sleep(400)

    // Fallback: address + city + state
    if (!coords && club.address) {
      coords = await photonGeocode([club.address, searchCity, searchState, 'USA'].filter(Boolean).join(', '))
      await sleep(400)
    }

    if (coords) geoOk++; else geoFail++

    for (const course of courses) {
      progress.courseRows.push({
        name: course.courseName ?? club.clubName,
        club: club.clubName,
        country: 'USA',
        flag: '🇺🇸',
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        holes: course.numHoles ?? 18,
        golfapi_id: course.courseID ?? null,
        is_major: false,
        address: [club.address, club.city, club.state].filter(Boolean).join(', ') || null,
      })
    }

    if ((i + 1) % 100 === 0) {
      progress.geocodeOffset = i + 1
      saveProgress(progress)
      process.stdout.write(`  ${i + 1}/${clubs.length} clubs — geo: ${geoOk}ok/${geoFail}fail — ${progress.courseRows.length} courses     \r`)
    }
  }

  progress.geocodeOffset = clubs.length
  saveProgress(progress)
  console.log(`  ${clubs.length} clubs done — geo: ${geoOk}ok/${geoFail}fail — ${progress.courseRows.length} courses          `)
}

// ── Step 3: Insert into Supabase ─────────────────────────────────────────────

if (progress.inserted) {
  console.log(`\nStep 3: SKIPPED — already inserted`)
} else {
  console.log(`\nStep 3: Inserting ${progress.courseRows.length} USA courses...`)

  let inserted = 0, errors = 0
  for (let i = 0; i < progress.courseRows.length; i += 500) {
    const batch = progress.courseRows.slice(i, i + 500)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) { console.error(`  Batch error:`, error.message); errors++ }
    else inserted += batch.length
    process.stdout.write(`  ${inserted} / ${progress.courseRows.length}...     \r`)
  }

  console.log(`  ${inserted} inserted, ${errors} errors                    `)
  progress.inserted = true
  saveProgress(progress)
}

// ── Summary ──────────────────────────────────────────────────────────────────

const withCoords = progress.courseRows.filter(r => r.latitude).length
const noCoords = progress.courseRows.length - withCoords

console.log(`\n${'═'.repeat(60)}`)
console.log(`Done!`)
console.log(`  Clubs:        ${clubs.length}`)
console.log(`  Courses:      ${progress.courseRows.length}`)
console.log(`  With coords:  ${withCoords} (${((withCoords / progress.courseRows.length) * 100).toFixed(1)}%)`)
console.log(`  No coords:    ${noCoords}`)
console.log('═'.repeat(60))
