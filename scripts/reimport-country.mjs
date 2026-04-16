// Safe per-country reimport from GolfAPI
// Deletes only courses for the specified country, then reimports from GolfAPI.
// Marks combo courses (name contains " + ") as is_combo = true.
// Run with: node --env-file=.env.local scripts/reimport-country.mjs "Wales"
//      or:  node --env-file=.env.local scripts/reimport-country.mjs "Wales,Norway,Belgium"

import { createClient } from '@supabase/supabase-js'

const GOLFAPI_KEY = process.env.GOLFAPI_KEY
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOLFAPI_BASE = 'https://golfapi.io/api/v2.3'
const sleep = ms => new Promise(r => setTimeout(r, ms))

if (!GOLFAPI_KEY) { console.error('Missing GOLFAPI_KEY in .env.local'); process.exit(1) }

const COUNTRY_FLAGS = {
  Denmark: '🇩🇰', Sweden: '🇸🇪', Norway: '🇳🇴', Finland: '🇫🇮',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Ireland: '🇮🇪', Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  France: '🇫🇷', Germany: '🇩🇪', Netherlands: '🇳🇱', Belgium: '🇧🇪',
  Spain: '🇪🇸', Portugal: '🇵🇹', Italy: '🇮🇹', Austria: '🇦🇹',
  Switzerland: '🇨🇭', 'Northern Ireland': '🇬🇧',
  USA: '🇺🇸', Canada: '🇨🇦', Australia: '🇦🇺',
}

// GolfAPI search terms (some differ from DB country names)
const SEARCH_TERMS = {
  'Northern Ireland': 'Northern Ireland',
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

async function reimportCountry(country) {
  const flag = COUNTRY_FLAGS[country] ?? '🌍'
  const searchTerm = SEARCH_TERMS[country] ?? country

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`${flag} ${country}`)
  console.log('─'.repeat(50))

  // ── Step 1: Check for user rounds in this country ─────────────────────
  const { data: courseIdsInCountry } = await supabase
    .from('courses')
    .select('id')
    .eq('country', country)

  const existingIds = (courseIdsInCountry ?? []).map(c => c.id)

  let protectedIds = new Set()
  if (existingIds.length > 0) {
    // Check which courses have rounds logged
    const { data: roundCourses } = await supabase
      .from('rounds')
      .select('course_id')
      .in('course_id', existingIds)

    protectedIds = new Set((roundCourses ?? []).map(r => r.course_id))

    // Also check bucket_list, course_affiliations
    const { data: blCourses } = await supabase.from('bucket_list').select('course_id').in('course_id', existingIds)
    const { data: caCourses } = await supabase.from('course_affiliations').select('course_id').in('course_id', existingIds)
    for (const r of (blCourses ?? [])) protectedIds.add(r.course_id)
    for (const r of (caCourses ?? [])) protectedIds.add(r.course_id)
  }

  const deletableIds = existingIds.filter(id => !protectedIds.has(id))
  console.log(`  Existing courses: ${existingIds.length}`)
  console.log(`  Protected (have rounds/data): ${protectedIds.size}`)
  console.log(`  Will delete: ${deletableIds.length}`)

  // ── Step 2: Delete unprotected courses ────────────────────────────────
  if (deletableIds.length > 0) {
    for (let i = 0; i < deletableIds.length; i += 500) {
      const batch = deletableIds.slice(i, i + 500)
      const { error } = await supabase.from('courses').delete().in('id', batch)
      if (error) { console.error('  Delete error:', error); process.exit(1) }
    }
    console.log(`  Deleted ${deletableIds.length} courses`)
  }

  // ── Step 3: Fetch from GolfAPI ────────────────────────────────────────
  console.log(`  Fetching from GolfAPI (country="${searchTerm}")...`)
  const clubs = []
  let page = 1, total = 0, lastCredits = '?'

  while (true) {
    const resp = await fetch(`${GOLFAPI_BASE}/clubs?country=${encodeURIComponent(searchTerm)}&page=${page}`, {
      headers: { Authorization: `Bearer ${GOLFAPI_KEY}` },
    })
    if (!resp.ok) { console.log(`    Page ${page}: HTTP ${resp.status} — stopping`); break }
    const data = await resp.json()
    const pageClubs = data.clubs ?? []
    total = data.numAllClubs ?? total
    clubs.push(...pageClubs)
    lastCredits = data.apiRequestsLeft
    process.stdout.write(`    Page ${page}: ${clubs.length}/${total} clubs — credits left: ${lastCredits}     \r`)
    if (clubs.length >= total || pageClubs.length === 0) break
    page++
    await sleep(200)
  }
  console.log(`  Fetched ${clubs.length} clubs in ${page} pages (credits left: ${lastCredits})          `)

  // ── Step 4: Geocode + build course rows ───────────────────────────────
  // Fetch existing courses (protected ones) keyed by name+club for dedup
  const existingKeys = new Set()
  if (protectedIds.size > 0) {
    const { data: protectedCourses } = await supabase
      .from('courses')
      .select('name, club')
      .eq('country', country)
    for (const c of protectedCourses ?? []) {
      existingKeys.add((c.name ?? '').trim().toLowerCase() + '||' + (c.club ?? '').trim().toLowerCase())
    }
  }

  const courseRows = []
  let geoOk = 0, geoFail = 0

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i]
    const courses = club.courses ?? []
    if (courses.length === 0) continue

    let coords = await photonGeocode([club.clubName, club.city, country].filter(Boolean).join(', '))
    await sleep(400)

    if (!coords && club.address) {
      coords = await photonGeocode([club.address, club.city, country].filter(Boolean).join(', '))
      await sleep(400)
    }

    if (coords) geoOk++; else geoFail++

    for (const course of courses) {
      const name = (course.courseName ?? club.clubName ?? '').trim()
      const clubName = (club.clubName ?? '').trim()
      const dedupKey = name.toLowerCase() + '||' + clubName.toLowerCase()

      // Skip if already exists (protected course)
      if (existingKeys.has(dedupKey)) continue

      const isCombo = name.includes(' + ')

      courseRows.push({
        name,
        club: clubName,
        country,
        flag,
        latitude: coords?.lat ?? null,
        longitude: coords?.lng ?? null,
        holes: course.numHoles ?? 18,
        golfapi_id: course.courseID ?? null,
        is_major: false,
        is_combo: isCombo,
        address: [club.address, club.city].filter(Boolean).join(', ') || null,
      })
    }

    if ((i + 1) % 50 === 0) {
      process.stdout.write(`    Geocoding ${i + 1}/${clubs.length}...     \r`)
    }
  }

  console.log(`  Geocoded ${clubs.length} clubs: ${geoOk} ok, ${geoFail} failed`)
  console.log(`  Course rows to insert: ${courseRows.length} (${courseRows.filter(c => c.is_combo).length} combos)`)

  // ── Step 5: Insert ────────────────────────────────────────────────────
  let inserted = 0
  for (let i = 0; i < courseRows.length; i += 500) {
    const batch = courseRows.slice(i, i + 500)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) { console.error('  Insert error:', error.message); process.exit(1) }
    inserted += batch.length
  }

  // Final count
  const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country)
  const comboCount = courseRows.filter(c => c.is_combo).length

  console.log(`  Inserted: ${inserted} courses (${comboCount} marked is_combo)`)
  console.log(`  Total ${country} courses now: ${count}`)
  console.log(`  Credits remaining: ${lastCredits}`)

  return { country, clubs: clubs.length, inserted, comboCount, total: count, pages: page, creditsLeft: lastCredits }
}

// ── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2).join(' ')
if (!args) {
  console.error('Usage: node --env-file=.env.local scripts/reimport-country.mjs "Wales,Norway"')
  process.exit(1)
}

const countries = args.split(',').map(c => c.trim()).filter(Boolean)

console.log('═'.repeat(60))
console.log(`Safe per-country reimport from GolfAPI`)
console.log(`Countries: ${countries.join(', ')}`)
console.log('═'.repeat(60))

const results = []
for (const country of countries) {
  const r = await reimportCountry(country)
  results.push(r)
}

console.log(`\n${'═'.repeat(60)}`)
console.log('SUMMARY')
console.log('═'.repeat(60))
for (const r of results) {
  const flag = COUNTRY_FLAGS[r.country] ?? '🌍'
  console.log(`${flag} ${r.country.padEnd(20)} ${r.pages} pages, ${r.inserted} inserted (${r.comboCount} combos), total: ${r.total}`)
}
console.log(`\nCredits remaining: ${results[results.length - 1]?.creditsLeft ?? '?'}`)
console.log('═'.repeat(60))
