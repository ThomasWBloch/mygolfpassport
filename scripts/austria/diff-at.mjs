// AT coverage-diff: ÖGV (primary) + LC + OSM
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/austria-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

const OEGV = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/austria/at-oegv-clubs.json','utf8'))
const LC = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/austria/austria-clubs-leadingcourses.json','utf8')).clubs || []
const OSM = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/austria/austria-clubs-osm.json','utf8')).clubs || []
console.log(`ÖGV: ${OEGV.length}, LC: ${LC.length}, OSM: ${OSM.length}`)

const STOPWORDS = new Set([
  'golf','golfclub','club','der','die','das','von','am','im','und','und','&','the','of','de','en',
  'cc','gc','country','hotel','leisure','park','asd','centre','center','resort','spa',
  'bei','am','vor','zum','zur','an'
])
function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[äÄ]/g,'ae').replace(/[öÖ]/g,'oe').replace(/[üÜ]/g,'ue').replace(/[ß]/g,'ss')
    .replace(/[áàâ]/g,'a').replace(/[éèê]/g,'e').replace(/[íìî]/g,'i').replace(/[óòô]/g,'o').replace(/[úùû]/g,'u')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()
}
function tokens(s) { return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t) && t.length > 1) }
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

const all = []; let from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,club,latitude,longitude,address,website,is_displayed').eq('country','Austria').range(from, from+999)
  all.push(...data); if (data.length < 1000) break; from += 1000
}
const byClub = new Map()
for (const r of all) {
  if (!byClub.has(r.club)) byClub.set(r.club, { club: r.club, lat: r.latitude, lng: r.longitude, address: r.address, website: r.website, hidden: !r.is_displayed })
  else {
    const x = byClub.get(r.club)
    if (x.lat == null && r.latitude != null) { x.lat = r.latitude; x.lng = r.longitude }
    if (!x.address && r.address) x.address = r.address
    if (!x.website && r.website) x.website = r.website
  }
}
const dbClubs = [...byClub.values()]
console.log('DB distinct clubs:', dbClubs.length)

// Combine: ÖGV first (authoritative), then LC fallback for non-ÖGV-members, OSM last
const FED_MAP = new Map()
for (const f of OEGV) FED_MAP.set(normalize(f.name), { source: 'OGV', name: f.name, address: f.address, lat: null, lng: null, website: f.website, email: f.email, phone: null, holes: f.holes })
for (const f of LC) {
  const k = normalize(f.name)
  if (!FED_MAP.has(k)) FED_MAP.set(k, { source: 'LC', name: f.name.trim(), address: f.address, lat: f.lat, lng: f.lon, website: f.url, phone: f.phone })
}
for (const f of OSM) {
  const k = normalize(f.name)
  if (!FED_MAP.has(k)) FED_MAP.set(k, { source: 'OSM', name: f.name, address: f.address, lat: f.lat, lng: f.lon, website: f.website || null, phone: f.phone || null })
}
const FED = [...FED_MAP.values()]
console.log('Combined fed:', FED.length)

const missing = []
let matched = 0, matchedHidden = 0
for (const f of FED) {
  let bestSim = 0, bestDist = Infinity, bestDb = null
  for (const d of dbClubs) {
    const sim = jaccard(f.name, d.club)
    const dist = distM(f.lat, f.lng, d.lat, d.lng)
    if (sim > bestSim || (sim === bestSim && dist < bestDist)) {
      bestSim = sim; bestDist = dist; bestDb = d
    }
  }
  const isMatch = bestSim >= 0.6 || (bestSim >= 0.4 && bestDist <= 2000) || bestDist <= 500
  if (isMatch) { matched++; if (bestDb?.hidden) matchedHidden++; continue }
  missing.push({
    fed_name: f.name, source: f.source,
    address: f.address, lat: f.lat, lng: f.lng,
    website: f.website, phone: f.phone, email: f.email,
    holes: f.holes,
    best_db_match: bestDb?.club || null, best_sim: bestSim.toFixed(2),
    best_dist_m: bestDist === Infinity ? null : Math.round(bestDist),
  })
}

console.log(`\nMatched: ${matched} (incl ${matchedHidden} hidden)`)
console.log(`Missing: ${missing.length}`)

function categorize(m) {
  if (!m.address && !m.phone && !m.website && !m.email) return 'Skip (no contact)'
  if (m.source === 'OSM' && !m.website && !m.phone) return 'Skip (OSM stub)'
  return 'INSERT-kandidat'
}
const buckets = {}
for (const m of missing) { m._cat = categorize(m); buckets[m._cat] = (buckets[m._cat]||0)+1 }
console.log('\nFinal:', JSON.stringify(buckets, null, 2))
fs.writeFileSync(`${OUT_DIR}/missing-at.json`, JSON.stringify(missing, null, 2))

console.log('\n=== Sample (first 12) ===')
missing.filter(m => m._cat === 'INSERT-kandidat').slice(0,12).forEach(r => {
  console.log('  ' + (r.fed_name||'').slice(0,42).padEnd(42) + ' | ' + r.source + ' | ' + (r.address||'').slice(0,38))
})
