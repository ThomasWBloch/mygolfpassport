// Compare golf.fi clubs (authoritative) against our DB clubs for Finland.
// Outputs a classification: exact matches, near matches, DB-only, SGL-only.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'node:fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const sglClubs = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))

const { data: dbRows, error } = await supabase
  .from('courses').select('id, name, club, address, website, latitude, longitude, is_combo')
  .eq('country', 'Finland').order('club')
if (error) { console.error(error); process.exit(1) }

// Group DB rows by club name
const dbByClub = new Map()
for (const r of dbRows) {
  if (!dbByClub.has(r.club)) dbByClub.set(r.club, [])
  dbByClub.get(r.club).push(r)
}

const normalize = s => (s || '').toLowerCase()
  .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a')
  .replace(/[\.\,\-\/&']/g, ' ')
  .replace(/\bclub\b/g, '').replace(/\bgolf\b/g, 'golf')
  .replace(/\bry\b/g, '').replace(/\bgk\b/g, '').replace(/\bcc\b/g, '')
  .replace(/\s+/g, ' ').trim()

// Build index of normalized SGL names → SGL club
const sglByNorm = new Map()
for (const c of sglClubs) sglByNorm.set(normalize(c.name), c)

const exact = []       // DB club name == SGL name (case-insensitive)
const normMatch = []   // normalized match but spelling differs
const fuzzy = []       // coord proximity match only
const dbOnly = []      // DB club with no SGL match

const matchedSglIds = new Set()

for (const [dbName, rows] of dbByClub) {
  // 1. Exact (case-insensitive) name match
  const sglExact = sglClubs.find(c => c.name.toLowerCase() === dbName.toLowerCase())
  if (sglExact) {
    exact.push({ dbName, sgl: sglExact, rows })
    matchedSglIds.add(sglExact.id)
    continue
  }
  // 2. Normalized name match
  const sglNorm = sglByNorm.get(normalize(dbName))
  if (sglNorm) {
    normMatch.push({ dbName, sgl: sglNorm, rows })
    matchedSglIds.add(sglNorm.id)
    continue
  }
  // 3. Coordinate proximity (< ~2 km) using first row with coords
  const withCoord = rows.find(r => r.latitude && r.longitude)
  if (withCoord) {
    let best = null
    let bestD = Infinity
    for (const c of sglClubs) {
      if (matchedSglIds.has(c.id)) continue
      const dLat = (c.lat - withCoord.latitude) * 111
      const dLng = (c.lng - withCoord.longitude) * 111 * Math.cos(withCoord.latitude * Math.PI / 180)
      const d = Math.sqrt(dLat * dLat + dLng * dLng)
      if (d < bestD) { bestD = d; best = c }
    }
    if (best && bestD < 2) {
      fuzzy.push({ dbName, sgl: best, rows, distanceKm: bestD.toFixed(2) })
      matchedSglIds.add(best.id)
      continue
    }
  }
  dbOnly.push({ dbName, rows })
}

const sglOnly = sglClubs.filter(c => !matchedSglIds.has(c.id))

console.log(`DB clubs: ${dbByClub.size}  |  SGL clubs: ${sglClubs.length}`)
console.log(`Exact name match:       ${exact.length}`)
console.log(`Normalized name match:  ${normMatch.length}  (spelling differs)`)
console.log(`Coordinate-only match:  ${fuzzy.length}  (name differs notably)`)
console.log(`DB-only (not in SGL):   ${dbOnly.length}`)
console.log(`SGL-only (not in DB):   ${sglOnly.length}`)

writeFileSync('scripts/finnish-match-report.json', JSON.stringify({
  summary: {
    dbClubs: dbByClub.size, sglClubs: sglClubs.length,
    exact: exact.length, normMatch: normMatch.length,
    fuzzy: fuzzy.length, dbOnly: dbOnly.length, sglOnly: sglOnly.length,
  },
  exact, normMatch, fuzzy, dbOnly, sglOnly,
}, null, 2))
console.log('\nWrote scripts/finnish-match-report.json')
