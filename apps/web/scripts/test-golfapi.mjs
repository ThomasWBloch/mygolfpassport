// Fetch ALL Swedish clubs from GolfAPI.io + geocode via Nominatim
// Run with: node --env-file=.env.local scripts/test-golfapi.mjs

import { writeFileSync } from 'fs'

const API_KEY = '9d1bc155-3d3f-4c63-bb65-a767f57ac7de'
const BASE_URL = 'https://golfapi.io/api/v2.3'
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── Fetch all pages from GolfAPI ─────────────────────────────────────────────

async function fetchAllClubs(country) {
  const allClubs = []
  let page = 1
  let total = 0

  while (true) {
    process.stdout.write(`  Fetching page ${page}...`)
    const resp = await fetch(`${BASE_URL}/clubs?country=${encodeURIComponent(country)}&page=${page}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    })
    if (!resp.ok) {
      console.error(` HTTP ${resp.status}`)
      break
    }
    const data = await resp.json()
    const clubs = data.clubs ?? []
    total = data.numAllClubs ?? total
    allClubs.push(...clubs)
    console.log(` ${clubs.length} clubs (${allClubs.length}/${total}) — credits left: ${data.apiRequestsLeft}`)

    if (allClubs.length >= total || clubs.length === 0) break
    page++
    await sleep(500)
  }

  return { clubs: allClubs, total }
}

// ── Geocode via Nominatim ────────────────────────────────────────────────────

async function nominatimSearch(query) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'MyGolfPassport/1.0 (thomas@mygolfpassport.golf)' },
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

async function geocode(clubName, address, city, country) {
  // Try 1: full address + city + country
  const addrQuery = [address, city, country].filter(Boolean).join(', ')
  if (addrQuery && addrQuery !== country) {
    const result = await nominatimSearch(addrQuery)
    if (result) return { ...result, method: 'address' }
    await sleep(1100)
  }

  // Try 2: clubName + city + country
  const nameQuery = [clubName, city, country].filter(Boolean).join(', ')
  if (nameQuery && nameQuery !== country) {
    const result = await nominatimSearch(nameQuery)
    if (result) return { ...result, method: 'name+city' }
    await sleep(1100)
  }

  // Try 3: clubName + country (no city)
  if (clubName) {
    const result = await nominatimSearch(`${clubName}, ${country}`)
    if (result) return { ...result, method: 'name+country' }
  }

  return null
}

// ── Main ─────────────────────────────────────────────────────────────────────

console.log('Fetching all Swedish clubs from GolfAPI.io...\n')
const { clubs, total } = await fetchAllClubs('Sweden')

console.log(`\nTotal clubs fetched: ${clubs.length} / ${total}\n`)

// Extract and flatten data
const results = []
let totalCourses = 0

for (const club of clubs) {
  const courses = (club.courses ?? []).map(c => ({
    courseId: c.courseID,
    courseName: c.courseName,
    numHoles: c.numHoles,
  }))
  totalCourses += courses.length

  results.push({
    clubId: club.clubID,
    clubName: club.clubName,
    city: club.city || null,
    address: club.address || null,
    country: club.country,
    courses,
    latitude: null,
    longitude: null,
  })
}

console.log(`Total courses across all clubs: ${totalCourses}`)
console.log(`\nGeocoding ${results.length} clubs via Nominatim (with fallback)...\n`)

let geocoded = 0
let failed = 0
const methodCounts = { address: 0, 'name+city': 0, 'name+country': 0 }

for (let i = 0; i < results.length; i++) {
  const r = results[i]
  process.stdout.write(`  [${i + 1}/${results.length}] ${r.clubName}...`)

  const coords = await geocode(r.clubName, r.address, r.city, 'Sweden')
  if (coords) {
    r.latitude = coords.lat
    r.longitude = coords.lng
    geocoded++
    methodCounts[coords.method]++
    console.log(` ✓ ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)} [${coords.method}]`)
  } else {
    failed++
    console.log(` ✗ no result`)
  }

  if (i < results.length - 1) await sleep(1100)
}

// ── Summary ──────────────────────────────────────────────────────────────────

console.log(`\n${'─'.repeat(50)}`)
console.log(`Summary:`)
console.log(`  Total clubs:      ${results.length}`)
console.log(`  Total courses:    ${totalCourses}`)
console.log(`  Geocoded:         ${geocoded} (${((geocoded / results.length) * 100).toFixed(1)}%)`)
console.log(`    via address:    ${methodCounts.address}`)
console.log(`    via name+city:  ${methodCounts['name+city']}`)
console.log(`    via name+country: ${methodCounts['name+country']}`)
console.log(`  Failed:           ${failed}`)

// Save to JSON
const outPath = 'scripts/sweden-test.json'
writeFileSync(outPath, JSON.stringify(results, null, 2))
console.log(`\nResults saved to ${outPath}`)
