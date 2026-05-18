// UK coverage-diff for Wales + Scotland (Pass A)
// Identifies federation clubs missing from DB with:
// - Strict match: jaccard sim ≥ 0.7 OR coords ≤ 1km
// - Shared-domain dup-check (Pass 2b learning from Nordic)
// - Categorisation: Real / Verify / DupRename / DupDomain / Admin / Edge

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

// Wales federation = wales-wg-clubs.json, Scotland = scotland-sg-clubs.json
const TARGETS = [
  { iso: 'WAL', country_db: 'Wales', fed_path: '/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/wales/wales-wg-clubs.json' },
  { iso: 'SCO', country_db: 'Scotland', fed_path: '/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/scotland/scotland-sg-clubs.json' },
]

const STOPWORDS = new Set([
  'golf','golfclub','club','cc','g&cc','gcc','golfcenter','centre','center',
  'resort','spa','and','&','the','gk','gc','course','links','park',
])

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
    .replace(/[óòôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ýÿ]/g,'y')
    .replace(/ð/g,'d').replace(/þ/g,'th').replace(/ø/g,'o')
    .replace(/[æ]/g,'ae').replace(/[å]/g,'a')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()
}
function stripS(s) { return s.endsWith('s') ? s.slice(0, -1) : s }
function tokens(s) {
  return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t)).map(stripS)
}
function jaccard(a, b) {
  const A = new Set(tokens(a)); const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0
  for (const t of A) if (B.has(t)) inter++
  const u = A.size + B.size - inter
  return u ? inter / u : 0
}
function distM(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lat2 == null || lng1 == null || lng2 == null) return Infinity
  const R = 6371000, toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a))
}
function getDomain(url) {
  if (!url) return null
  return (url.toLowerCase().match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

async function fetchDbClubs(country) {
  const all = []
  let from = 0
  while (true) {
    const { data } = await sb.from('courses').select('club,latitude,longitude,website').eq('country', country).range(from, from+999)
    all.push(...data)
    if (data.length < 1000) break
    from += 1000
  }
  // Group by club, keep first non-null coord/website
  const byClub = new Map()
  for (const r of all) {
    const k = r.club
    if (!byClub.has(k)) byClub.set(k, { club: k, lat: r.latitude, lng: r.longitude, website: r.website, rows: 1 })
    else {
      const x = byClub.get(k); x.rows++
      if (x.lat == null && r.latitude != null) { x.lat = r.latitude; x.lng = r.longitude }
      if (!x.website && r.website) x.website = r.website
    }
  }
  return [...byClub.values()]
}

function categorize(row, dbClubs) {
  const fedDomain = getDomain(row.website)
  const sim = parseFloat(row.best_sim || 0)
  const dist = row.best_dist_m
  const name = (row.fed_name || '').toLowerCase()
  const address = (row.address || '').trim()

  // Domain collision = duplicate in DB
  if (fedDomain && fedDomain !== 'facebook.com') {
    const collide = dbClubs.find(d => d.website && getDomain(d.website) === fedDomain)
    if (collide) return 'DupDomain'
  }
  // Tight fuzzy = rename
  if (sim >= 0.66) return 'DupRename'
  // Tight coord = same site, different name
  if (dist != null && dist <= 500) return 'DupCoord'

  // Empty/admin signals (no address AND no phone AND no website)
  if (!address && !row.phone && !row.website) return 'Admin'
  if (/closed|defunct|umbrella/i.test(name)) return 'Admin'

  // Has any 2 of: address, phone, coords → real club (UK federations rarely expose website)
  let signals = 0
  if (row.address) signals++
  if (row.phone) signals++
  if (row.lat != null) signals++
  if (row.website) signals++
  if (signals >= 2) return 'Real'
  return 'Verify'
}

const allMissing = {}
const summary = []

for (const { iso, country_db, fed_path } of TARGETS) {
  console.log(`\n=== ${iso} (${country_db}) ===`)
  const fed = JSON.parse(fs.readFileSync(fed_path, 'utf8'))
  const db = await fetchDbClubs(country_db)
  console.log(`  Federation: ${fed.length}, DB: ${db.length}`)

  const missing = []
  let matched = 0

  for (const f of fed) {
    let bestSim = 0, bestDist = Infinity, bestDb = null
    for (const d of db) {
      const sim = jaccard(f.name, d.club)
      const dist = distM(f.latitude, f.longitude, d.lat, d.lng)
      if (sim > bestSim || (sim === bestSim && dist < bestDist)) {
        bestSim = sim; bestDist = dist; bestDb = d
      }
    }
    const isMatch = bestSim >= 0.7 || bestDist <= 1000
    if (isMatch) { matched++; continue }
    missing.push({
      fed_id: f.eg_id ?? f.sg_id ?? f.wg_id ?? f.gi_id ?? null,
      fed_name: f.name,
      address: f.address,
      lat: f.latitude,
      lng: f.longitude,
      website: f.website,
      phone: f.phone,
      email: f.email,
      best_db_match: bestDb?.club || null,
      best_sim: bestSim.toFixed(2),
      best_dist_m: bestDist === Infinity ? null : Math.round(bestDist),
    })
  }

  // Categorize
  for (const m of missing) m._cat = categorize(m, db)

  const buckets = {}
  for (const m of missing) buckets[m._cat] = (buckets[m._cat] || 0) + 1

  console.log(`  Matched: ${matched}, Missing: ${missing.length}`)
  console.log('  Categories:', JSON.stringify(buckets))

  fs.writeFileSync(path.join(OUT_DIR, `missing-${iso.toLowerCase()}.json`), JSON.stringify(missing, null, 2))
  allMissing[iso] = { fed_count: fed.length, db_count: db.length, matched, missing_count: missing.length, buckets }
  summary.push({
    country: iso, federation: fed.length, db: db.length, matched, missing: missing.length,
    real: buckets.Real || 0, verify: buckets.Verify || 0,
    dup_rename: buckets.DupRename || 0, dup_coord: buckets.DupCoord || 0,
    dup_domain: buckets.DupDomain || 0, admin: buckets.Admin || 0,
  })
}

fs.writeFileSync(path.join(OUT_DIR, 'summary.json'), JSON.stringify(allMissing, null, 2))
console.log('\n=== SUMMARY ===')
console.table(summary)
