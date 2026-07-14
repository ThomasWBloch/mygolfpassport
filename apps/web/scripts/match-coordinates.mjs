// Match GolfAPI clubs missing coordinates with OSM data from Supabase
// Run with: node --env-file=.env.local scripts/match-coordinates.mjs

import { readFileSync, writeFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ── Normalize name for fuzzy matching ────────────────────────────────────────

function normalize(s) {
  return s.toLowerCase()
    .replace(/golfklubb/g, '')
    .replace(/golfklub/g, '')
    .replace(/golf\s*club/g, '')
    .replace(/golf\s*centrum/g, '')
    .replace(/golf\s*center/g, '')
    .replace(/golfcenter/g, '')
    .replace(/golfbana/g, '')
    .replace(/golfresort/g, '')
    .replace(/golf\s*&\s*country\s*club/g, '')
    .replace(/golf\s*&\s*resort/g, '')
    .replace(/\bgolf\b/g, '')
    .replace(/\bgk\b/g, '')
    .replace(/\bab\b/g, '')
    .replace(/[^a-zåäö0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchScore(apiName, dbName, dbClub) {
  const a = normalize(apiName)
  const n = normalize(dbName)
  const c = normalize(dbClub || '')

  // Exact match
  if (a === n || a === c) return 100

  // One contains the other
  if (a.length > 2 && n.length > 2 && (n.includes(a) || a.includes(n))) return 80
  if (a.length > 2 && c.length > 2 && (c.includes(a) || a.includes(c))) return 80

  // Key word overlap
  const aWords = a.split(' ').filter(w => w.length > 2)
  const nWords = n.split(' ').filter(w => w.length > 2)
  const cWords = c.split(' ').filter(w => w.length > 2)

  if (aWords.length === 0) return 0

  const nOverlap = aWords.filter(w => nWords.some(nw => nw.includes(w) || w.includes(nw))).length
  const cOverlap = aWords.filter(w => cWords.some(cw => cw.includes(w) || w.includes(cw))).length
  const best = Math.max(nOverlap, cOverlap)

  if (best >= aWords.length * 0.6 && best >= 1) return 60

  return 0
}

// ── Main ─────────────────────────────────────────────────────────────────────

// Load GolfAPI data
const clubs = JSON.parse(readFileSync('scripts/sweden-test.json', 'utf-8'))

// Fetch Swedish courses from Supabase
console.log('Fetching Swedish courses from Supabase...')
const { data: dbCourses } = await supabase
  .from('courses')
  .select('id, name, club, latitude, longitude')
  .eq('country', 'Sweden')
  .not('latitude', 'is', null)
  .not('longitude', 'is', null)

console.log(`  ${dbCourses.length} Swedish courses with coordinates in DB\n`)

// Find clubs that need coordinates
const needCoords = clubs.filter(c => !c.latitude)
const hadCoords = clubs.filter(c => c.latitude)

console.log(`GolfAPI clubs: ${clubs.length} total, ${hadCoords.length} already geocoded, ${needCoords.length} need matching\n`)

let matched = 0
let unmatched = 0

for (const club of needCoords) {
  // Find best match in DB
  let bestMatch = null
  let bestScore = 0

  for (const db of dbCourses) {
    const score = matchScore(club.clubName, db.name, db.club)
    if (score > bestScore) {
      bestScore = score
      bestMatch = db
    }
  }

  if (bestMatch && bestScore >= 60) {
    club.latitude = bestMatch.latitude
    club.longitude = bestMatch.longitude
    matched++
    console.log(`  ✓ "${club.clubName}" → "${bestMatch.name}" (score: ${bestScore}) → ${bestMatch.latitude.toFixed(4)}, ${bestMatch.longitude.toFixed(4)}`)
  } else {
    unmatched++
    console.log(`  ✗ "${club.clubName}" — no match (best: ${bestScore})`)
  }
}

// ── Summary ──────────────────────────────────────────────────────────────────

const totalWithCoords = clubs.filter(c => c.latitude).length

console.log(`\n${'─'.repeat(55)}`)
console.log(`Final results:`)
console.log(`  Total clubs:           ${clubs.length}`)
console.log(`  From Nominatim:        ${hadCoords.length}`)
console.log(`  From OSM/DB match:     ${matched}`)
console.log(`  Still missing:         ${unmatched}`)
console.log(`  Total with coords:     ${totalWithCoords} (${((totalWithCoords / clubs.length) * 100).toFixed(1)}%)`)

// Save updated data
writeFileSync('scripts/sweden-test.json', JSON.stringify(clubs, null, 2))
console.log(`\nUpdated scripts/sweden-test.json`)
