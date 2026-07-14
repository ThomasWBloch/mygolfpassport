// Fetch all Irish + Northern Irish golf clubs from Golf Ireland's federation API.
// Single POST call returns all 382 clubs with full detail when PageSize is set.
// (The /find-a-club page is now fully JS-rendered; no more HTML scraping needed.)
//
// API: POST https://www.golfireland.ie/api/clubs/FindClubs
// Body: {"Page":1,"PageSize":1000}
// Response: array of club records — name, address, lat/lon, phone, email, website (always null at fed level), founding/holes (also null).
//
// Run: node scripts/ireland/fetch-gi-clubs.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const URL = 'https://www.golfireland.ie/api/clubs/FindClubs'
const OUT_PATH = 'scripts/ireland/ireland-gi-clubs.json'

const r = await fetch(URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'mygolfpassport/1.0 (ireland scrape; thomasbloch74@gmail.com)',
    Accept: 'application/json',
  },
  body: JSON.stringify({ Page: 1, PageSize: 1000 }),
  signal: AbortSignal.timeout(60000),
})
if (!r.ok) {
  console.error(`HTTP ${r.status} ${r.statusText}`)
  process.exit(1)
}
const raw = await r.json()
if (!Array.isArray(raw)) {
  console.error('Unexpected response shape')
  process.exit(1)
}

console.log(`Fetched ${raw.length} clubs from Golf Ireland (TotalCount=${raw[0]?.TotalCount})`)

// Clean a phone string from GI source. Returns null if the value is too
// malformed to trust. Common issues observed in batch 1 dry-run:
//   - Literal text prefix: "Office 090 6492073"
//   - International prefix with truncated body: "00353789" (only 3 digits left)
//   - Missing area code: "2818488" (7 digits — should be "01 281 8488")
//   - Inconsistent NI format: "00442892619241" vs the canonical "028..."
function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()

  // 1. Strip leading text prefixes (Office, Tel, Phone, Telephone, Mobile, Fax)
  s = s.replace(/^(office|tel(?:ephone)?|phone|mobile|mob|fax)[:.\s]+/i, '')

  // 2. Reject if multiple distinct numbers separated (e.g. "061 396204 / Mobile 086...")
  // Take only first run before " / " or "Mob" or " or "
  s = s.split(/\s+(?:\/|or|mob|mobile|alt|alternatively)\b/i)[0].trim()

  // 3. Count digits — reject if too few to be a valid IE/UK phone.
  // Irish numbers are typically 8-9 digits including area code (e.g. "058 44055").
  // 7-digit local-only numbers are ambiguous (which area code?) and unsafe.
  const digits = s.replace(/\D/g, '')
  if (digits.length < 8) return null

  // 4. Reject international-prefix-only stubs: 00 + countryCode + ≤3 digits
  // (e.g. "00353789" = "00 353 7 8 9" only 3 body digits)
  if (/^00\d{2,3}\d{1,4}$/.test(digits) && digits.length <= 8) return null

  // 5. Normalise NI: convert "0044 28 ..." to "028 ..." for consistency with rest of NI
  if (/^0044/.test(digits)) {
    const rest = digits.slice(4)
    s = '0' + rest
  }

  return s
}

function normalise(c) {
  const addrParts = [c.LocAddress1, c.LocAddress2, c.LocAddress3, c.LocAddress4]
    .map((s) => (s || '').trim())
    .filter(Boolean)
  return {
    gi_id: c.ClubId,
    name: (c.ClubName || '').trim(),
    address: addrParts.join(', ') || null,
    latitude: c.Latitude ?? null,
    longitude: c.Longitude ?? null,
    phone: normalisePhone(c.Phone),
    phone_raw: c.Phone || null, // keep raw for audit
    email: c.Email || null,
    website: c.Website || null,
    holes: c.NoOfHoles && c.NoOfHoles > 0 ? c.NoOfHoles : null,
    founded_year: c.FoundingYear || null,
    region: c.RegionName || null,
    directions: c.GetDirectionsLink || null,
    locAddress3: (c.LocAddress3 || '').trim() || null, // useful for NI/ROI split
  }
}

const clubs = raw.map(normalise)

// Heuristic country split using LocAddress3 (typically "Co. <County>")
const NI_COUNTIES = ['antrim', 'armagh', 'down', 'fermanagh', 'londonderry', 'derry', 'tyrone']
function inferCountry(c) {
  const a3 = (c.locAddress3 || '').toLowerCase()
  if (NI_COUNTIES.some((cn) => a3.includes(cn))) return 'Northern Ireland'
  // Coordinate fallback
  if (c.latitude && c.longitude && c.latitude >= 54.0 && c.latitude <= 55.4 && c.longitude >= -8.2 && c.longitude <= -5.4) {
    return 'Northern Ireland'
  }
  return 'Ireland'
}

clubs.forEach((c) => {
  c.country_inferred = inferCountry(c)
  delete c.locAddress3
})
clubs.sort((a, b) => a.country_inferred.localeCompare(b.country_inferred) || a.name.localeCompare(b.name))

mkdirSync('scripts/ireland', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const counts = clubs.reduce((acc, c) => {
  acc[c.country_inferred] = (acc[c.country_inferred] || 0) + 1
  return acc
}, {})
const withSite = clubs.filter((c) => c.website).length
const withAddr = clubs.filter((c) => c.address).length
const withCoord = clubs.filter((c) => c.latitude && c.longitude).length
const withPhone = clubs.filter((c) => c.phone).length
const phoneCleaned = clubs.filter((c) => c.phone_raw && c.phone !== c.phone_raw).length
const phoneRejected = clubs.filter((c) => c.phone_raw && !c.phone).length

console.log('')
console.log('--- Summary ---')
console.log(`Total clubs:        ${clubs.length}`)
console.log(`  by country:       ${JSON.stringify(counts)}`)
console.log(`With website:       ${withSite}  (expected 0 — fed API doesn't expose)`)
console.log(`With address:       ${withAddr}`)
console.log(`With coords:        ${withCoord}`)
console.log(`With phone:         ${withPhone}`)
console.log(`  cleaned (different from raw): ${phoneCleaned}`)
console.log(`  rejected as malformed:        ${phoneRejected}`)
console.log(`Wrote: ${OUT_PATH}`)

if (phoneRejected > 0) {
  console.log('\nRejected phone samples:')
  clubs
    .filter((c) => c.phone_raw && !c.phone)
    .slice(0, 10)
    .forEach((c) => console.log(`  ${c.name}: raw=${JSON.stringify(c.phone_raw)}`))
}
if (phoneCleaned > 0) {
  console.log('\nCleaned phone samples (raw → clean):')
  clubs
    .filter((c) => c.phone_raw && c.phone !== c.phone_raw)
    .slice(0, 10)
    .forEach((c) => console.log(`  ${c.name}: ${JSON.stringify(c.phone_raw)} → ${JSON.stringify(c.phone)}`))
}
