// Scrape Swiss Golf federation klub-finder.
//
// Discovery (session 30, 2026-05-04):
//   swissgolf.ch eksponerer hele klub-listen offentligt på finder-siden:
//     https://www.swissgolf.ch/de/golf-spielen/wo-golfen/golfclubs-und-anlagen-finden/
//   Server-rendered JS-array `locations.push([id, name, logo, lat, lon, category, website])`
//   med 117 klubber. Single fetch, ingen pagination, ingen XHR. robots.txt fuldt åben.
//
// Categories i finder: 'primary', 'secondary' (rigtige golfbaner),
// 'driving-range', 'pitch-putt', 'indoor' (non-course facilities).
//
// Hvad er ELLERS i HTML: CardGolfclub-blokke med holes ("9 Loch") + by/PLZ
// ("6363 Obbürgen") + description. KUN ~20 cards er server-rendered (resten
// loades JS-side), så CardGolfclub-data er pt. ikke pålidelig som kilde.
//
// IKKE i federation: email + phone (vs ÖGV som havde 99% af hver). For CH
// må email/phone hentes fra OSM eller LC fallback.
//
// Run: node scripts/switzerland/scrape-swissgolf-ch.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/switzerland/ch-swissgolf-clubs.json'
const RAW_PATH = 'scripts/switzerland/raw-swissgolf-finder.html'
const URL =
  'https://www.swissgolf.ch/de/golf-spielen/wo-golfen/golfclubs-und-anlagen-finden/'

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

console.log(`Fetching: ${URL}`)
const r = await fetch(URL, {
  method: 'GET',
  headers: { 'User-Agent': UA, Accept: 'text/html' },
  redirect: 'follow',
  signal: AbortSignal.timeout(60_000),
})
if (!r.ok) {
  console.error(`HTTP ${r.status} ${r.statusText}`)
  process.exit(1)
}
const html = await r.text()
console.log(`  ✓ ${html.length} bytes`)

mkdirSync('scripts/switzerland', { recursive: true })
writeFileSync(RAW_PATH, html)

// Extract all locations.push([...]) entries. Format:
//   locations.push([57, 'Bürgenstock', '', 46.9957402, 8.3927657, 'primary',
//                   'https://www.golfclub-buergenstock.ch/']);
const re =
  /locations\.push\(\[(\d+),\s*'([^']*)',\s*'([^']*)',\s*([\d.\-]+),\s*([\d.\-]+),\s*'([^']*)',\s*'([^']*)'\]\)/g

const clubs = []
let m
while ((m = re.exec(html)) !== null) {
  const [, idStr, name, logo, latStr, lonStr, category, website] = m
  clubs.push({
    swissgolf_id: Number(idStr),
    name: name.trim(),
    logo: logo.trim() || null,
    lat: Number(latStr),
    lon: Number(lonStr),
    category, // primary | secondary | driving-range | pitch-putt | indoor
    website: website.trim() || null,
  })
}

// Try to extract per-club holes + city/PLZ from CardGolfclub blocks (server-rendered subset).
// data-id couples each card to a swissgolf_id. Only ~20 of 117 are present.
const cardRe =
  /<div class="etx-card Card CardGolfclub[^"]*"\s+data-id="(\d+)">([\s\S]*?)(?=<div class="etx-card Card CardGolfclub|<\/div>\s*<\/div>\s*<\/div>\s*$)/g
const cardData = new Map()
let cm
while ((cm = cardRe.exec(html)) !== null) {
  const id = Number(cm[1])
  const block = cm[2]
  // "9 Loch" or "18 Loch" → holes
  const holesM = block.match(/(\d+)\s*Loch/)
  // PLZ + Ort: "6363 Obbürgen" or "1234 Town" — Swiss PLZ is 4 digits
  const plzM = block.match(/Item__text">\s*<span[^>]*>([0-9]{4})\s+([^<]+)</)
  cardData.set(id, {
    holes: holesM ? Number(holesM[1]) : null,
    postcode: plzM ? plzM[1] : null,
    city: plzM ? plzM[2].trim() : null,
  })
}

// Merge card-data into clubs
for (const c of clubs) {
  const card = cardData.get(c.swissgolf_id)
  if (card) {
    c.holes = card.holes
    c.postcode = card.postcode
    c.city = card.city
  } else {
    c.holes = null
    c.postcode = null
    c.city = null
  }
}

clubs.sort((a, b) => a.name.localeCompare(b.name, 'de'))

// Sanity counts
const byCat = clubs.reduce((acc, c) => ((acc[c.category] = (acc[c.category] || 0) + 1), acc), {})
const realCourses = clubs.filter((c) => c.category === 'primary' || c.category === 'secondary')

writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Switzerland',
      iso: 'CH',
      source: 'swissgolf.ch finder',
      scraped_at: new Date().toISOString(),
      total: clubs.length,
      categories: byCat,
      real_courses: realCourses.length,
      clubs,
    },
    null,
    2,
  ),
)

console.log('')
console.log('--- Summary ---')
console.log(`Total locations:        ${clubs.length}`)
console.log(`  By category:          ${JSON.stringify(byCat)}`)
console.log(`  Real golf courses:    ${realCourses.length} (primary + secondary)`)
console.log(`With website:           ${clubs.filter((c) => c.website).length}`)
console.log(`With coords:            ${clubs.filter((c) => c.lat != null && c.lon != null).length}`)
console.log(`With city/PLZ:          ${clubs.filter((c) => c.postcode != null).length}  (~20 server-rendered)`)
console.log(`With holes:             ${clubs.filter((c) => c.holes != null).length}  (~20 server-rendered)`)
console.log(`Wrote: ${OUT_PATH}`)
console.log(`Wrote: ${RAW_PATH}`)
