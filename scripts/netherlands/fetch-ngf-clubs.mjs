// Fetch Dutch golf clubs from NGF (Nederlandse Golf Federatie) public API.
//
// Discovery (session 26, 2026-05-03):
//   GOLF.NL har en public widget-endpoint som klub-finderen bruger:
//     GET https://www.golf.nl/api/playgolfapi/GetGolfCourses
//     Header: X-Requested-With: XMLHttpRequest
//   Returnerer 241 NGF-klubber med 100% website, 100% email, 98.7% phone.
//   robots.txt er permissiv (kun /sitecore/ blokeret), endpoint kræver ikke auth/cookies.
//
// Felter pr klub: title (klub-navn), description (marketing-prose), distance, distanceValue,
//                 emailAddress, phoneNumber, phoneNumberDisplay, websiteUrl
//
// IKKE i response: lat/lon, struktureret address, banenavne, hulantal.
// → Coords + address kommer fra OSM (scrape-netherlands-osm.mjs)
// → Banenavne kræver per-klub-side scrape af golf.nl (separat script: fetch-ngf-courses.mjs)
//
// Run: node scripts/netherlands/fetch-ngf-clubs.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/netherlands/holland-ngf-clubs.json'
const ENDPOINT = 'https://www.golf.nl/api/playgolfapi/GetGolfCourses'

console.log(`Fetching: ${ENDPOINT}`)

const r = await fetch(ENDPOINT, {
  method: 'GET',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'User-Agent': 'mygolfpassport/1.0 (netherlands scrape; thomasbloch74@gmail.com)',
  },
  signal: AbortSignal.timeout(60000),
})

if (!r.ok) {
  console.error(`HTTP ${r.status} ${r.statusText}`)
  process.exit(1)
}

const json = await r.json()
const raw = json.golfClubs
if (!Array.isArray(raw)) {
  console.error('Unexpected response shape:', Object.keys(json))
  process.exit(1)
}

console.log(`  ✓ ${raw.length} klubber modtaget`)

function normalisePhone(rawPhone) {
  if (!rawPhone) return null
  let s = String(rawPhone).trim()
  s = s.replace(/^(tel(?:efoon)?|phone)[:.\s]+/i, '')
  const digits = s.replace(/\D/g, '')
  if (digits.length < 8) return null
  if (/^0031/.test(digits)) s = '0' + digits.slice(4)
  return s
}

function normaliseWebsite(url) {
  if (!url) return null
  let s = String(url).trim()
  if (!s) return null
  // Keep as-is per scope decision (no http→https upgrade) — NGF returner alle som http://
  if (!/^https?:\/\//i.test(s)) s = 'http://' + s
  return s
}

function normalise(c) {
  return {
    ngf_title: (c.title || '').trim(),
    name: (c.title || '').trim(), // alias for match-script compatibility
    description: (c.description || '').trim() || null,
    website: normaliseWebsite(c.websiteUrl),
    email: c.emailAddress || null,
    phone: normalisePhone(c.phoneNumber),
    phone_display: c.phoneNumberDisplay || null,
    // NGF har ikke coords/address — sættes null så match-script ikke crasher
    latitude: null,
    longitude: null,
    address: null,
  }
}

const clubs = raw.map(normalise).filter((c) => c.name)
clubs.sort((a, b) => a.name.localeCompare(b.name, 'nl'))

mkdirSync('scripts/netherlands', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Total clubs:        ${clubs.length}`)
console.log(`With website:       ${clubs.filter((c) => c.website).length}`)
console.log(`With email:         ${clubs.filter((c) => c.email).length}`)
console.log(`With phone:         ${clubs.filter((c) => c.phone).length}`)
console.log(`With description:   ${clubs.filter((c) => c.description).length}`)
console.log(`Wrote: ${OUT_PATH}`)
