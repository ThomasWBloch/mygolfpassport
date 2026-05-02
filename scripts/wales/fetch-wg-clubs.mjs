// Fetch Welsh golf clubs from Wales Golf federation API.
// Tries known Terraces CMS endpoints. If these fail, manual recon needed
// via Chrome on https://www.walesgolf.org or https://wales.golf.
//
// Run: node scripts/wales/fetch-wg-clubs.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/wales/wales-wg-clubs.json'
const CANDIDATES = [
  { url: 'https://www.walesgolf.org/api/clubs/FindClubs', body: { Page: 1, PageSize: 1000 } },
  { url: 'https://wales.golf/api/clubs/FindClubs', body: { Page: 1, PageSize: 1000 } },
  { url: 'https://www.golfunionwales.org/api/clubs/FindClubs', body: { Page: 1, PageSize: 1000 } },
]

async function tryEndpoint({ url, body }) {
  console.log(`Trying: ${url}`)
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'mygolfpassport/1.0 (wales scrape; thomasbloch74@gmail.com)',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60000),
    })
    if (!r.ok) { console.log(`  HTTP ${r.status}`); return null }
    const j = await r.json()
    if (Array.isArray(j) && j.length > 0) { console.log(`  ✓ ${j.length} records`); return j }
    console.log(`  empty response`); return null
  } catch (e) { console.log(`  ${e.message}`); return null }
}

let raw = null
for (const cand of CANDIDATES) {
  raw = await tryEndpoint(cand)
  if (raw) break
}

if (!raw) {
  console.error('\nNo Wales Golf endpoint responded.')
  console.error('Manual recon: open https://www.walesgolf.org in Chrome,')
  console.error('look for "find a club" or similar, intercept network requests.')
  process.exit(1)
}

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
    wg_id: c.ClubId,
    name: (c.ClubName || '').trim(),
    address: addrParts.join(', ') || null,
    latitude: c.Latitude ?? null,
    longitude: c.Longitude ?? null,
    phone: normalisePhone(c.Phone),
    email: c.Email || null,
    website: c.Website || null,
    holes: c.NoOfHoles && c.NoOfHoles > 0 ? c.NoOfHoles : null,
    region: c.RegionName || null,
  }
}

const clubs = raw.map(normalise).filter((c) => c.name)
clubs.sort((a, b) => a.name.localeCompare(b.name))

mkdirSync('scripts/wales', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

console.log(`\nFetched ${clubs.length} clubs`)
console.log(`With website: ${clubs.filter((c) => c.website).length}`)
console.log(`With coords:  ${clubs.filter((c) => c.latitude && c.longitude).length}`)
console.log(`Wrote: ${OUT_PATH}`)
