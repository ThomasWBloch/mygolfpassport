// Coverage diff for England + Ireland + Northern Ireland
// Adapts uk-coverage-diff.mjs but for the 3 remaining countries
// Important: Split Ireland fed → IE/NIR by BT-postcode in address

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'

const englandFed = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/england/england-eg-clubs.json','utf8'))
const irelandFed = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/ireland/ireland-gi-clubs.json','utf8'))

// Split Ireland fed
const ieFed  = irelandFed.filter(c => !/\bBT\d/i.test(c.address || ''))
const nirFed = irelandFed.filter(c =>  /\bBT\d/i.test(c.address || ''))

const TARGETS = [
  { iso: 'ENG', country_db: 'England', fed: englandFed },
  { iso: 'IE',  country_db: 'Ireland', fed: ieFed },
  { iso: 'NIR', country_db: 'Northern Ireland', fed: nirFed },
]

const STOPWORDS = new Set(['golf','club','course','park','resort','centre','center','cc','gc','gk','&','and','the'])
function normalize(s) { return (s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim() }
function tokens(s) { return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t)) }
function jaccard(a, b) {
  const A = new Set(tokens(a)); const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0; for (const t of A) if (B.has(t)) inter++
  const u = A.size + B.size - inter; return u ? inter / u : 0
}
function distM(la1, lo1, la2, lo2) {
  if (la1==null||la2==null||lo1==null||lo2==null) return Infinity
  const R = 6371000, toRad = d => d * Math.PI / 180
  const dLat = toRad(la2-la1), dLng = toRad(lo2-lo1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a))
}

async function fetchDb(country) {
  // Fetch ALL UK+IE rows so we can detect cross-country matches (Royal Co Down listed in Ireland but really NIR)
  const all = []
  for (const c of ['England','Scotland','Wales','Ireland','Northern Ireland']) {
    let from = 0
    while (true) {
      const { data } = await sb.from('courses').select('club,country,latitude,longitude,website,is_displayed').eq('country', c).range(from, from+999)
      all.push(...data); if (data.length < 1000) break; from += 1000
    }
  }
  const byClub = new Map()
  for (const r of all) {
    const k = r.country + '::' + r.club
    if (!byClub.has(k)) byClub.set(k, { club: r.club, country: r.country, lat: r.latitude, lng: r.longitude, website: r.website, hidden: !r.is_displayed })
    else {
      const x = byClub.get(k)
      if (x.lat == null && r.latitude != null) { x.lat = r.latitude; x.lng = r.longitude }
      if (!x.website && r.website) x.website = r.website
    }
  }
  return [...byClub.values()]
}

const summary = []
const crossCountryAll = []
for (const { iso, country_db, fed } of TARGETS) {
  const crossCountry = []
  console.log(`\n=== ${iso} (${country_db}) ===`)
  const db = await fetchDb(country_db)
  console.log(`  Federation: ${fed.length}, DB: ${db.length} (incl. hidden)`)

  const missing = []
  let matched = 0, matchedHidden = 0
  for (const f of fed) {
    let bestSim = 0, bestDist = Infinity, bestDb = null
    for (const d of db) {
      const sim = jaccard(f.name, d.club)
      const dist = distM(f.latitude, f.longitude, d.lat, d.lng)
      if (sim > bestSim || (sim === bestSim && dist < bestDist)) {
        bestSim = sim; bestDist = dist; bestDb = d
      }
    }
    // Looser thresholds:
    //   sim >= 0.6 → match (catches "Ampfield GC" vs "Ampfield Golf & CC")
    //   sim >= 0.4 AND dist <= 2km → match (catches name variants at same location)
    //   any club name + dist <= 500m → match (same physical location)
    const isMatch = bestSim >= 0.6 || (bestSim >= 0.4 && bestDist <= 2000) || bestDist <= 500
    if (isMatch) {
      matched++
      if (bestDb?.hidden) matchedHidden++
      // Track cross-country matches (e.g., NIR fed club in Ireland DB)
      if (bestDb?.country && bestDb.country !== country_db) {
        crossCountry.push({ fed_country: country_db, db_country: bestDb.country, fed_name: f.name, db_club: bestDb.club, sim: bestSim.toFixed(2), dist: Math.round(bestDist) })
      }
      continue
    }
    // Categorize: federation has address+phone+coords → real
    let signals = 0
    if (f.address) signals++
    if (f.phone) signals++
    if (f.latitude != null) signals++
    if (f.website) signals++
    const cat = signals >= 2 ? 'Real' : 'Verify'

    missing.push({
      fed_id: f.eg_id ?? f.gi_id ?? null,
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
      _cat: cat,
    })
  }

  const buckets = {}
  for (const m of missing) buckets[m._cat] = (buckets[m._cat] || 0) + 1
  console.log(`  Matched: ${matched} (incl ${matchedHidden} hidden), Missing: ${missing.length}`)
  console.log('  Categories:', JSON.stringify(buckets))

  fs.writeFileSync(`${OUT_DIR}/missing-${iso.toLowerCase()}.json`, JSON.stringify(missing, null, 2))
  summary.push({
    country: iso, federation: fed.length, db_total: db.length,
    matched, matched_hidden: matchedHidden, cross_country: crossCountry.length,
    missing: missing.length, real: buckets.Real || 0, verify: buckets.Verify || 0,
  })
  crossCountryAll.push(...crossCountry)
}
fs.writeFileSync(`${OUT_DIR}/cross-country-matches.json`, JSON.stringify(crossCountryAll, null, 2))
console.log('\n=== Cross-country matches (fed-country ≠ DB-country) ===')
console.log(`Count: ${crossCountryAll.length}`)
crossCountryAll.slice(0, 15).forEach(c => console.log(`  fed:${c.fed_country.padEnd(18)} db:${c.db_country.padEnd(18)} | "${c.fed_name}" → "${c.db_club}" (sim=${c.sim}, dist=${c.dist}m)`))

console.log('\n=== SUMMARY ===')
console.table(summary)
