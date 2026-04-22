// Import Canada + Australia golf courses from GolfAPI.io + Photon geocoding
// Run with: node --env-file=.env.local scripts/import-golfapi-canada-australia.mjs

import { createClient } from '@supabase/supabase-js'
import { writeFileSync, readFileSync, existsSync } from 'fs'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const PROGRESS_FILE = 'scripts/canada-australia-progress.json'
const sleep = ms => new Promise(r => setTimeout(r, ms))

const COUNTRIES = [
  { name: 'Canada',    flag: '🇨🇦', search: 'Canada' },
  { name: 'Australia', flag: '🇦🇺', search: 'Australia' },
]

function loadProgress() {
  if (!existsSync(PROGRESS_FILE)) return { completed: {}, courseRows: {} }
  try { return JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8')) } catch { return { completed: {}, courseRows: {} } }
}
function saveProgress(p) { writeFileSync(PROGRESS_FILE, JSON.stringify(p)) }

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
console.log('GolfAPI.io — Canada + Australia Import')
console.log('═'.repeat(60))

const progress = loadProgress()
const completedSet = new Set(Object.keys(progress.completed))
if (completedSet.size > 0) {
  console.log(`Resuming — already done: ${[...completedSet].join(', ')}`)
}

for (const country of COUNTRIES) {
  if (completedSet.has(country.name)) {
    console.log(`\n${country.flag} ${country.name} — SKIPPED (already done)`)
    continue
  }

  console.log(`\n${country.flag} ${country.name}`)

  // Fetch all pages
  const clubs = []
  let page = 1, total = 0, lastCredits = '?'

  while (true) {
    const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=${encodeURIComponent(country.search)}&page=${page}`, {
      headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
    })
    if (!resp.ok) { console.log(`  Page ${page}: HTTP ${resp.status} — stopping`); break }
    const data = await resp.json()
    const pageClubs = data.clubs ?? []
    total = data.numAllClubs ?? total
    clubs.push(...pageClubs)
    lastCredits = data.apiRequestsLeft
    process.stdout.write(`  Fetch page ${page}: ${clubs.length}/${total} — credits: ${lastCredits}     \r`)
    if (clubs.length >= total || pageClubs.length === 0) break
    page++
    await sleep(200)
  }
  console.log(`  Fetched ${clubs.length} clubs in ${page} pages (credits: ${lastCredits})          `)

  // Geocode + build course rows
  const courseRows = []
  let geoOk = 0, geoFail = 0

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i]
    const courses = club.courses ?? []
    if (courses.length === 0) continue

    const searchParts = [club.clubName, club.city, club.state, country.name].filter(Boolean)
    let coords = await photonGeocode(searchParts.join(', '))
    await sleep(400)

    if (!coords && club.address) {
      coords = await photonGeocode([club.address, club.city, club.state, country.name].filter(Boolean).join(', '))
      await sleep(400)
    }

    if (coords) geoOk++; else geoFail++

    for (const course of courses) {
      courseRows.push({
        name: course.courseName ?? club.clubName,
        club: club.clubName,
        country: country.name,
        flag: country.flag,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        holes: course.numHoles ?? 18,
        golfapi_id: course.courseID ?? null,
        is_major: false,
        address: [club.address, club.city, club.state].filter(Boolean).join(', ') || null,
      })
    }

    if ((i + 1) % 100 === 0) {
      process.stdout.write(`  Geocoding ${i + 1}/${clubs.length} — geo: ${geoOk}ok/${geoFail}fail — ${courseRows.length} courses     \r`)
    }
  }

  console.log(`  ${clubs.length} clubs — geo: ${geoOk}ok/${geoFail}fail — ${courseRows.length} courses          `)

  // Save progress
  progress.completed[country.name] = { clubs: clubs.length, courses: courseRows.length, geoOk, geoFail }
  progress.courseRows[country.name] = courseRows
  saveProgress(progress)
  console.log('  ✓ Progress saved')
}

// ── Insert all into Supabase ─────────────────────────────────────────────────

const allRows = []
for (const country of COUNTRIES) {
  allRows.push(...(progress.courseRows[country.name] ?? []))
}

console.log(`\nInserting ${allRows.length} courses into Supabase...`)
let inserted = 0, errors = 0
for (let i = 0; i < allRows.length; i += 500) {
  const batch = allRows.slice(i, i + 500)
  const { error } = await supabase.from('courses').insert(batch)
  if (error) { console.error(`  Batch error:`, error.message); errors++ }
  else inserted += batch.length
  process.stdout.write(`  ${inserted} / ${allRows.length}...     \r`)
}
console.log(`  ${inserted} inserted, ${errors} errors                    `)

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${'═'.repeat(60)}`)
for (const country of COUNTRIES) {
  const s = progress.completed[country.name]
  if (!s) continue
  const rate = s.clubs > 0 ? ((s.geoOk / s.clubs) * 100).toFixed(0) : '0'
  console.log(`${country.flag} ${country.name.padEnd(12)} ${s.clubs} clubs, ${s.courses} courses, ${s.geoOk}/${s.clubs} geocoded (${rate}%)`)
}
console.log(`Total inserted: ${inserted}`)
console.log('═'.repeat(60))
