// Scrape the full Finnish golf clubs list from golf.fi/pelaajalle/kenttaopas/
// robots.txt permits it. The page embeds the club list as a JSON array.
// Fields per entry: abbreviation, federationId, id, name, lat, lng, county,
// url, streetAddress, city, postCode, phoneNumber, email.
// Writes finnish-clubs-golffi.json.

import { writeFileSync } from 'node:fs'

const URL = 'https://golf.fi/pelaajalle/kenttaopas/'

const res = await fetch(URL, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; mygolfpassport-research/1.0)' },
})
if (!res.ok) { console.error('Fetch failed', res.status); process.exit(1) }
const html = await res.text()

// Clubs are embedded as an object keyed by club ID, e.g.
//   {"1":{"abbreviation":"..", ...},"2":{...}, ...}
// Find the opening brace of that object.
const startMatch = html.match(/\{"[0-9]+":\{"abbreviation"/)
if (!startMatch) {
  writeFileSync('scripts/finnish-debug.html', html.slice(0, 5000))
  console.error('Start pattern not found. First 5000 chars written to scripts/finnish-debug.html')
  console.error('HTML length:', html.length, 'Has Aavasaksa:', html.includes('Aavasaksa'))
  process.exit(1)
}
const start = startMatch.index

// Walk forward counting braces to find the matching closing }
let depth = 0
let inStr = false
let esc = false
let end = -1
for (let i = start; i < html.length; i++) {
  const ch = html[i]
  if (esc) { esc = false; continue }
  if (ch === '\\') { esc = true; continue }
  if (ch === '"') { inStr = !inStr; continue }
  if (inStr) continue
  if (ch === '{') depth++
  else if (ch === '}') { depth--; if (depth === 0) { end = i + 1; break } }
}
if (end === -1) { console.error('End of object not found'); process.exit(1) }

const unescaped = html.slice(start, end)

let clubsObj
try {
  clubsObj = JSON.parse(unescaped)
} catch (e) {
  console.error('Parse failed:', e.message)
  writeFileSync('scripts/finnish-clubs-raw.txt', unescaped.slice(0, 2000))
  process.exit(1)
}

const clubs = Object.values(clubsObj)
console.log(`Scraped ${clubs.length} clubs from golf.fi`)
if (clubs[0]) console.log('Sample:', JSON.stringify(clubs[0], null, 2))

writeFileSync('scripts/finnish-clubs-golffi.json', JSON.stringify(clubs, null, 2))
console.log('Wrote scripts/finnish-clubs-golffi.json')
