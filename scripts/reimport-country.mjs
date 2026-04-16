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
  // Existing 21
  Denmark: '🇩🇰', Sweden: '🇸🇪', Norway: '🇳🇴', Finland: '🇫🇮',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Ireland: '🇮🇪', Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  France: '🇫🇷', Germany: '🇩🇪', Netherlands: '🇳🇱', Belgium: '🇧🇪',
  Spain: '🇪🇸', Portugal: '🇵🇹', Italy: '🇮🇹', Austria: '🇦🇹',
  Switzerland: '🇨🇭', 'Northern Ireland': '🇬🇧',
  USA: '🇺🇸', Canada: '🇨🇦', Australia: '🇦🇺',

  // Asia
  Japan: '🇯🇵', 'South Korea': '🇰🇷', China: '🇨🇳', Taiwan: '🇹🇼', 'Hong Kong': '🇭🇰', Macau: '🇲🇴',
  Thailand: '🇹🇭', Vietnam: '🇻🇳', Philippines: '🇵🇭', Malaysia: '🇲🇾', Singapore: '🇸🇬', Indonesia: '🇮🇩',
  India: '🇮🇳', Pakistan: '🇵🇰', Bangladesh: '🇧🇩', 'Sri Lanka': '🇱🇰', Nepal: '🇳🇵', Bhutan: '🇧🇹',
  Myanmar: '🇲🇲', Cambodia: '🇰🇭', Laos: '🇱🇦', Brunei: '🇧🇳', Maldives: '🇲🇻',
  Kazakhstan: '🇰🇿', Uzbekistan: '🇺🇿', Kyrgyzstan: '🇰🇬', Turkmenistan: '🇹🇲', Tajikistan: '🇹🇯',
  Mongolia: '🇲🇳', 'North Korea': '🇰🇵', Afghanistan: '🇦🇫', 'Timor-Leste': '🇹🇱',

  // Middle East
  'United Arab Emirates': '🇦🇪', 'Saudi Arabia': '🇸🇦', Qatar: '🇶🇦', Bahrain: '🇧🇭',
  Oman: '🇴🇲', Kuwait: '🇰🇼', Yemen: '🇾🇪', Israel: '🇮🇱', Turkey: '🇹🇷',
  Iran: '🇮🇷', Iraq: '🇮🇶', Syria: '🇸🇾', Jordan: '🇯🇴', Lebanon: '🇱🇧', Palestine: '🇵🇸',

  // Oceania
  'New Zealand': '🇳🇿', Fiji: '🇫🇯', 'Papua New Guinea': '🇵🇬', Samoa: '🇼🇸', Tonga: '🇹🇴',
  Vanuatu: '🇻🇺', 'Solomon Islands': '🇸🇧',

  // Africa
  'South Africa': '🇿🇦', Morocco: '🇲🇦', Egypt: '🇪🇬', Kenya: '🇰🇪', Mauritius: '🇲🇺',
  Tunisia: '🇹🇳', Algeria: '🇩🇿', Libya: '🇱🇾', Sudan: '🇸🇩', Ethiopia: '🇪🇹',
  Uganda: '🇺🇬', Tanzania: '🇹🇿', Rwanda: '🇷🇼', Burundi: '🇧🇮',
  Ghana: '🇬🇭', Nigeria: '🇳🇬', Cameroon: '🇨🇲', Senegal: '🇸🇳', 'Ivory Coast': '🇨🇮',
  Mali: '🇲🇱', 'Burkina Faso': '🇧🇫', Zimbabwe: '🇿🇼', Zambia: '🇿🇲', Botswana: '🇧🇼',
  Namibia: '🇳🇦', Mozambique: '🇲🇿', Malawi: '🇲🇼', Angola: '🇦🇴', Madagascar: '🇲🇬',
  Seychelles: '🇸🇨', Comoros: '🇰🇲', 'Cape Verde': '🇨🇻', 'Sao Tome and Principe': '🇸🇹',
  'DR Congo': '🇨🇩', 'Republic of the Congo': '🇨🇬', Gabon: '🇬🇦', 'Equatorial Guinea': '🇬🇶',
  Chad: '🇹🇩', Niger: '🇳🇪', Benin: '🇧🇯', Togo: '🇹🇬', Guinea: '🇬🇳', 'Guinea-Bissau': '🇬🇼',
  'Sierra Leone': '🇸🇱', Liberia: '🇱🇷', Mauritania: '🇲🇷', Gambia: '🇬🇲',
  'Central African Republic': '🇨🇫', 'South Sudan': '🇸🇸', Somalia: '🇸🇴',
  Djibouti: '🇩🇯', Eritrea: '🇪🇷', Lesotho: '🇱🇸', Eswatini: '🇸🇿',

  // Europe (rest)
  'Czech Republic': '🇨🇿', Poland: '🇵🇱', Hungary: '🇭🇺', Slovakia: '🇸🇰', Slovenia: '🇸🇮',
  Croatia: '🇭🇷', 'Bosnia and Herzegovina': '🇧🇦', Serbia: '🇷🇸', Montenegro: '🇲🇪',
  'North Macedonia': '🇲🇰', Albania: '🇦🇱', Kosovo: '🇽🇰',
  Romania: '🇷🇴', Bulgaria: '🇧🇬', Greece: '🇬🇷', Cyprus: '🇨🇾', Malta: '🇲🇹',
  Estonia: '🇪🇪', Latvia: '🇱🇻', Lithuania: '🇱🇹',
  Iceland: '🇮🇸', Luxembourg: '🇱🇺', Liechtenstein: '🇱🇮', Monaco: '🇲🇨',
  Andorra: '🇦🇩', 'San Marino': '🇸🇲',
  Russia: '🇷🇺', Ukraine: '🇺🇦', Belarus: '🇧🇾', Moldova: '🇲🇩',
  Georgia: '🇬🇪', Armenia: '🇦🇲', Azerbaijan: '🇦🇿',

  // North America / Caribbean
  Mexico: '🇲🇽', Guatemala: '🇬🇹', Honduras: '🇭🇳', 'El Salvador': '🇸🇻',
  Nicaragua: '🇳🇮', 'Costa Rica': '🇨🇷', Panama: '🇵🇦', Belize: '🇧🇿',
  Cuba: '🇨🇺', 'Dominican Republic': '🇩🇴', Haiti: '🇭🇹', Jamaica: '🇯🇲',
  Bahamas: '🇧🇸', Bermuda: '🇧🇲', 'Cayman Islands': '🇰🇾', 'Puerto Rico': '🇵🇷',
  'Trinidad and Tobago': '🇹🇹', Barbados: '🇧🇧', 'Saint Lucia': '🇱🇨',
  'Saint Vincent and the Grenadines': '🇻🇨', Grenada: '🇬🇩',
  'Saint Kitts and Nevis': '🇰🇳', 'Antigua and Barbuda': '🇦🇬', Dominica: '🇩🇲',

  // South America
  Brazil: '🇧🇷', Argentina: '🇦🇷', Chile: '🇨🇱', Colombia: '🇨🇴', Peru: '🇵🇪',
  Venezuela: '🇻🇪', Ecuador: '🇪🇨', Uruguay: '🇺🇾', Paraguay: '🇵🇾', Bolivia: '🇧🇴',
  Guyana: '🇬🇾', Suriname: '🇸🇷',
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

  // ── Step 1: Save existing coordinates before deleting ──────────────────
  const coordLookup = new Map() // "clubName|courseName" => { lat, lng }
  const existingIds = []
  let idOffset = 0
  while (true) {
    const { data } = await supabase
      .from('courses')
      .select('id, name, club, latitude, longitude')
      .eq('country', country)
      .range(idOffset, idOffset + 999)
    if (!data || data.length === 0) break
    for (const c of data) {
      existingIds.push(c.id)
      if (c.latitude != null && c.longitude != null) {
        const key = (c.club ?? '').trim().toLowerCase() + '|' + (c.name ?? '').trim().toLowerCase()
        coordLookup.set(key, { lat: c.latitude, lng: c.longitude })
      }
    }
    idOffset += data.length
    if (data.length < 1000) break
  }

  console.log(`  Existing courses: ${existingIds.length}`)
  console.log(`  Saved coordinates: ${coordLookup.size}`)

  // ── Step 2: Delete FK references then courses ─────────────────────────
  if (existingIds.length > 0) {
    // Delete FK references first (rounds, bucket_list, course_affiliations, top100_rankings)
    for (const table of ['rounds', 'bucket_list', 'course_affiliations', 'top100_rankings']) {
      for (let i = 0; i < existingIds.length; i += 500) {
        const batch = existingIds.slice(i, i + 500)
        await supabase.from(table).delete().in('course_id', batch)
      }
    }
    // Now delete courses
    for (let i = 0; i < existingIds.length; i += 500) {
      const batch = existingIds.slice(i, i + 500)
      const { error } = await supabase.from('courses').delete().in('id', batch)
      if (error) { console.error('  Delete error:', error); process.exit(1) }
    }
    console.log(`  Deleted ${existingIds.length} courses (and FK references)`)
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
  // Reuse saved coordinates where possible, only call Photon for new courses
  const courseRows = []
  let geoReused = 0, geoOk = 0, geoFail = 0

  for (let i = 0; i < clubs.length; i++) {
    const club = clubs[i]
    const courses = club.courses ?? []
    if (courses.length === 0) continue

    // Check if ANY course under this club has saved coordinates
    const clubName = (club.clubName ?? '').trim()
    let savedCoords = null
    for (const course of courses) {
      const name = (course.courseName ?? club.clubName ?? '').trim()
      const key = clubName.toLowerCase() + '|' + name.toLowerCase()
      if (coordLookup.has(key)) {
        savedCoords = coordLookup.get(key)
        break
      }
    }

    let coords = savedCoords
    if (coords) {
      geoReused++
    } else {
      // No saved coordinates — call Photon
      coords = await photonGeocode([club.clubName, club.city, country].filter(Boolean).join(', '))
      await sleep(400)

      if (!coords && club.address) {
        coords = await photonGeocode([club.address, club.city, country].filter(Boolean).join(', '))
        await sleep(400)
      }

      if (coords) geoOk++; else geoFail++
    }

    for (const course of courses) {
      const name = (course.courseName ?? club.clubName ?? '').trim()
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
      process.stdout.write(`    Processing ${i + 1}/${clubs.length}...     \r`)
    }
  }

  console.log(`  Coords: ${geoReused} reused, ${geoOk} geocoded, ${geoFail} failed          `)
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
