// Fetch all Scottish golf clubs from Scottish Golf federation API.
// Hypothesis: scottishgolf.org uses the same Terraces CMS as golfireland.ie,
// so /api/clubs/FindClubs with {Page:1,PageSize:1000} should return all clubs.
// This script tests that endpoint and falls back to multiple alternatives.
//
// Run: node scripts/scotland/fetch-sg-clubs.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/scotland/scotland-sg-clubs.json'
const CANDIDATES = [
  { url: 'https://www.scottishgolf.org/api/clubs/FindClubs', body: { Page: 1, PageSize: 1000 } },
  { url: 'https://scottishgolf.org/api/clubs/FindClubs', body: { Page: 1, PageSize: 1000 } },
]

async function tryEndpoint({ url, body }) {
  console.log(`Trying: ${url}`)
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'mygolfpassport/1.0 (scotland scrape; thomasbloch74@gmail.com)',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000),
    })
    if (!r.ok) {
      console.log(`  HTTP ${r.status} ${r.statusText}`)
      return null
    }
    const j = await r.json()
    if (Array.isArray(j) && j.length > 0) {
      console.log(`  ✓ ${j.length} records`)
      return j
    }
    console.log(`  Empty/invalid response shape`)
    return null
  } catch (e) {
    console.log(`  ${e.message}`)
    return null
  }
}

let raw = null
for (const cand of CANDIDATES) {
  raw = await tryEndpoint(cand)
  if (raw) break
}

if (!raw) {
  console.error('\nNo Scottish Golf endpoint responded with club data.')
  console.error('Manual recon needed: open https://www.scottishgolf.org/find-a-club/')
  console.error('in Chrome, intercept network requests, find the actual API call.')
  process.exit(1)
}

console.log(`\nFetched ${raw.length} clubs (TotalCount=${raw[0]?.TotalCount})`)

// Same normalisation pattern as Ireland's GI fetcher
function normalisePhone(rawPhone) {
  if (!rawPhone) return null
  let s = String(rawPhone).trim()
  s = s.replace(/^(office|tel(?:ephone)?|phone|mobile|mob|fax)[:.\s]+/i, '')
  s = s.split(/\s+(?:\/|or|mob|mobile|alt|alternatively)\b/i)[0].trim()
  const digits = s.replace(/\D/g, '')
  if (digits.length < 8) return null
  if (/^00\d{2,3}\d{1,4}$/.test(digits) && digits.length <= 8) return null
  if (/^0044/.test(digits)) s = '0' + digits.slice(4)
  return s
}

function normalise(c) {
  const addrParts = [c.LocAddress1, c.LocAddress2, c.LocAddress3, c.LocAddress4]
    .map((s) => (s || '').trim())
    .filter(Boolean)
  return {
    sg_id: c.ClubId,
    name: (c.ClubName || '').trim(),
    address: addrParts.join(', ') || null,
    latitude: c.Latitude ?? null,
    longitude: c.Longitude ?? null,
    phone: normalisePhone(c.Phone),
    email: c.Email || null,
    website: c.Website || null,
    holes: c.NoOfHoles && c.NoOfHoles > 0 ? c.NoOfHoles : null,
    founded_year: c.FoundingYear || null,
    region: c.RegionName || null,
  }
}

const clubs = raw.map(normalise).filter((c) => c.name)
clubs.sort((a, b) => a.name.localeCompare(b.name))

mkdirSync('scripts/scotland', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withSite = clubs.filter((c) => c.website).length
const withAddr = clubs.filter((c) => c.address).length
const withCoord = clubs.filter((c) => c.latitude && c.longitude).length
const withPhone = clubs.filter((c) => c.phone).length

console.log('')
console.log('--- Summary ---')
console.log(`Total clubs:    ${clubs.length}`)
console.log(`With website:   ${withSite}`)
console.log(`With address:   ${withAddr}`)
console.log(`With coords:    ${withCoord}`)
console.log(`With phone:     ${withPhone}`)
console.log(`Wrote: ${OUT_PATH}`)
