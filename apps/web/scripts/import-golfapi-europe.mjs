// Import European golf courses from GolfAPI.io into Supabase
// Run with: node --env-file=.env.local scripts/import-golfapi-europe.mjs
//
// CRITICAL: Only uses /clubs search endpoint (0.1 credit/page).
// NEVER calls /clubs/{id}, /courses/{id}, /coordinates/{id} (1.0 credit each).
//
// Saves progress per country to scripts/import-progress.json.
// If restarted, skips completed countries and resumes from where it left off.

import { createClient } from '@supabase/supabase-js'
import { writeFileSync, readFileSync, existsSync } from 'fs'

// ── Config ───────────────────────────────────────────────────────────────────

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!GOLFAPI_KEY) { console.error('Missing GOLFAPI_KEY in .env.local'); process.exit(1) }
if (!SUPABASE_URL || !SUPABASE_KEY) { console.error('Missing Supabase env vars'); process.exit(1) }

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const PROGRESS_FILE = 'scripts/import-progress.json'
const sleep = ms => new Promise(r => setTimeout(r, ms))

const COUNTRIES = [
  { name: 'Denmark',          flag: '🇩🇰',  search: 'Denmark' },
  { name: 'Sweden',           flag: '🇸🇪',  search: 'Sweden' },
  { name: 'Norway',           flag: '🇳🇴',  search: 'Norway' },
  { name: 'Finland',          flag: '🇫🇮',  search: 'Finland' },
  { name: 'England',          flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', search: 'England' },
  { name: 'Scotland',         flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', search: 'Scotland' },
  { name: 'Ireland',          flag: '🇮🇪',  search: 'Ireland' },
  { name: 'Wales',            flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', search: 'Wales' },
  { name: 'France',           flag: '🇫🇷',  search: 'France' },
  { name: 'Germany',          flag: '🇩🇪',  search: 'Germany' },
  { name: 'Netherlands',      flag: '🇳🇱',  search: 'Netherlands' },
  { name: 'Belgium',          flag: '🇧🇪',  search: 'Belgium' },
  { name: 'Spain',            flag: '🇪🇸',  search: 'Spain' },
  { name: 'Portugal',         flag: '🇵🇹',  search: 'Portugal' },
  { name: 'Italy',            flag: '🇮🇹',  search: 'Italy' },
  { name: 'Austria',          flag: '🇦🇹',  search: 'Austria' },
  { name: 'Switzerland',      flag: '🇨🇭',  search: 'Switzerland' },
  { name: 'Northern Ireland', flag: '🇬🇧',  search: 'Northern Ireland' },
]

// ── Progress tracking ────────────────────────────────────────────────────────

function loadProgress() {
  if (!existsSync(PROGRESS_FILE)) return { completed: {}, courseRows: {} }
  try {
    return JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8'))
  } catch {
    return { completed: {}, courseRows: {} }
  }
}

function saveProgress(progress) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress))
  // Not pretty-printed — can be large with course rows
}

// ── Helper functions ─────────────────────────────────────────────────────────

function normalizeName(s) {
  return (s ?? '').toLowerCase()
    .replace(/golfklubb/g, '').replace(/golfklub/g, '').replace(/golf\s*club/g, '')
    .replace(/golf\s*center/g, '').replace(/golfcenter/g, '').replace(/golfbane/g, '')
    .replace(/golfbana/g, '').replace(/\bgolf\b/g, '').replace(/\bgk\b/g, '')
    .replace(/[^a-zåäöæøüß0-9\s]/g, '').replace(/\s+/g, ' ').trim()
}

async function nominatimSearch(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'MyGolfPassport/1.0 (contact@mygolfpassport.golf)' },
      signal: AbortSignal.timeout(10000),
    })
    if (!resp.ok) return null
    const results = await resp.json()
    if (results.length === 0) return null
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) }
  } catch {
    return null
  }
}

async function geocodeClub(clubName, address, city, country, stats, existingCoords) {
  // Try 1: address + city + country
  const addrQuery = [address, city, country].filter(Boolean).join(', ')
  if (addrQuery && addrQuery !== country) {
    const result = await nominatimSearch(addrQuery)
    if (result) { stats.geo.address++; await sleep(1100); return result }
    await sleep(1100)
  }

  // Try 2: clubName + city + country
  const nameQuery = [clubName, city, country].filter(Boolean).join(', ')
  if (nameQuery && nameQuery !== country) {
    const result = await nominatimSearch(nameQuery)
    if (result) { stats.geo.namecity++; await sleep(1100); return result }
    await sleep(1100)
  }

  // Try 3: clubName + country
  if (clubName) {
    const result = await nominatimSearch(`${clubName}, ${country}`)
    if (result) { stats.geo.namecountry++; await sleep(1100); return result }
    await sleep(1100)
  }

  // Try 4: OSM fallback from saved Supabase data
  const key = normalizeName(clubName) + '|' + country.toLowerCase()
  const osmMatch = existingCoords.get(key)
  if (osmMatch) {
    stats.geo.osmFallback++
    return osmMatch
  }

  stats.geo.failed++
  return null
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('═'.repeat(60))
console.log('GolfAPI.io → Supabase European Course Importer')
console.log('═'.repeat(60))
console.log(`GOLFAPI_KEY: ${GOLFAPI_KEY.slice(0, 8)}...`)
console.log(`Countries: ${COUNTRIES.length}`)

const progress = loadProgress()
const completedCountries = new Set(Object.keys(progress.completed))
if (completedCountries.size > 0) {
  console.log(`\nResuming — ${completedCountries.size} countries already completed:`)
  for (const c of completedCountries) console.log(`  ✓ ${c}`)
}
console.log()

// ── Step 1: Save existing coordinates from Supabase ──────────────────────────

console.log('Step 1: Saving existing course coordinates from Supabase...')

const existingCoords = new Map()
let offset = 0
const batchSize = 1000
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('name, club, country, latitude, longitude')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .range(offset, offset + batchSize - 1)

  if (error) { console.error('  Error fetching:', error.message); break }
  if (!data || data.length === 0) break

  for (const c of data) {
    const key = normalizeName(c.name) + '|' + (c.country ?? '').toLowerCase()
    existingCoords.set(key, { lat: c.latitude, lng: c.longitude })
    if (c.club) {
      const clubKey = normalizeName(c.club) + '|' + (c.country ?? '').toLowerCase()
      if (!existingCoords.has(clubKey)) existingCoords.set(clubKey, { lat: c.latitude, lng: c.longitude })
    }
  }

  offset += data.length
  if (data.length < batchSize) break
}

console.log(`  Saved ${existingCoords.size} coordinate entries from existing DB\n`)

// ── Steps 2+3: Fetch + geocode per country (with resume) ────────────────────

console.log('Steps 2+3: Fetching and geocoding per country...\n')

let totalCreditsUsed = 0
const log = {}

for (const country of COUNTRIES) {
  // Skip if already completed
  if (completedCountries.has(country.name)) {
    const prev = progress.completed[country.name]
    log[country.name] = prev.stats
    totalCreditsUsed += prev.stats.pages * 0.1
    console.log(`  ${country.flag} ${country.name} — SKIPPED (already done: ${prev.stats.coursesInserted} courses)`)
    continue
  }

  console.log(`  ${country.flag} ${country.name}...`)

  // Fetch all pages
  const clubs = []
  let page = 1
  let totalClubs = 0
  let lastCreditsLeft = '?'

  while (true) {
    const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=${encodeURIComponent(country.search)}&page=${page}`, {
      headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
    })

    if (!resp.ok) {
      console.log(`    Page ${page}: HTTP ${resp.status} — stopping`)
      break
    }

    const data = await resp.json()
    const pageClubs = data.clubs ?? []
    totalClubs = data.numAllClubs ?? totalClubs
    clubs.push(...pageClubs)
    totalCreditsUsed += 0.1
    lastCreditsLeft = data.apiRequestsLeft

    process.stdout.write(`    Fetch page ${page}: ${clubs.length}/${totalClubs} clubs — credits left: ${lastCreditsLeft}     \r`)

    if (clubs.length >= totalClubs || pageClubs.length === 0) break
    page++
    await sleep(300)
  }

  console.log(`    Fetched ${clubs.length} clubs in ${page} pages (credits left: ${lastCreditsLeft})          `)

  // Geocode and build course rows
  const stats = {
    pages: page,
    clubs: clubs.length,
    coursesInserted: 0,
    geo: { address: 0, namecity: 0, namecountry: 0, osmFallback: 0, failed: 0 },
  }

  const courseRows = []

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i]
    const courses = club.courses ?? []
    if (courses.length === 0) continue

    const coords = await geocodeClub(club.clubName, club.address, club.city, country.name, stats, existingCoords)

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
        address: [club.address, club.city].filter(Boolean).join(', ') || null,
      })
      stats.coursesInserted++
    }

    if ((i + 1) % 25 === 0) {
      process.stdout.write(`    Geocoding ${i + 1}/${clubs.length}...     \r`)
    }
  }

  console.log(`    ${stats.coursesInserted} courses — geo: ${stats.geo.address}addr/${stats.geo.namecity}name+city/${stats.geo.namecountry}name+country/${stats.geo.osmFallback}osm/${stats.geo.failed}fail`)

  log[country.name] = stats

  // Save progress
  progress.completed[country.name] = { stats }
  progress.courseRows[country.name] = courseRows
  saveProgress(progress)
  console.log(`    ✓ Progress saved\n`)
}

// Collect all course rows (from progress file for completed + current run)
const allCourseRows = []
for (const country of COUNTRIES) {
  const rows = progress.courseRows[country.name] ?? []
  allCourseRows.push(...rows)
}

console.log(`Total course rows to insert: ${allCourseRows.length}\n`)

// ── Step 4: Delete and reimport ──────────────────────────────────────────────

console.log('Step 4: Deleting existing data and importing...\n')

// Delete in FK-safe order
for (const [table, label] of [
  ['rounds', 'rounds'],
  ['bucket_list', 'bucket_list'],
  ['course_affiliations', 'course_affiliations'],
  ['top100_rankings', 'top100_rankings'],
  ['courses', 'courses'],
]) {
  console.log(`  Deleting all ${label}...`)
  const { error } = await supabase.from(table).delete().gte('id', '00000000-0000-0000-0000-000000000000')
  if (error) console.error(`    Error: ${error.message}`)
  else console.log(`    ✓ Deleted`)
}

// Insert in batches of 500
console.log(`\n  Inserting ${allCourseRows.length} courses in batches of 500...`)
let inserted = 0
let insertErrors = 0

for (let i = 0; i < allCourseRows.length; i += 500) {
  const batch = allCourseRows.slice(i, i + 500)
  const { error } = await supabase.from('courses').insert(batch)
  if (error) {
    console.error(`    Batch ${Math.floor(i / 500) + 1} error:`, error.message)
    insertErrors++
  } else {
    inserted += batch.length
  }
  process.stdout.write(`    ${inserted} / ${allCourseRows.length} inserted...     \r`)
}

console.log(`    ${inserted} courses inserted, ${insertErrors} batch errors                 \n`)

// ── Step 5: Save log ─────────────────────────────────────────────────────────

const summary = {
  timestamp: new Date().toISOString(),
  totalCoursesInserted: inserted,
  totalCreditsUsed: totalCreditsUsed.toFixed(1),
  countries: log,
}

writeFileSync('scripts/import-log.json', JSON.stringify(summary, null, 2))
console.log('Step 5: Log saved to scripts/import-log.json')

console.log(`\n${'═'.repeat(60)}`)
console.log(`Done! ${inserted} courses imported across ${COUNTRIES.length} countries.`)
console.log('═'.repeat(60))
