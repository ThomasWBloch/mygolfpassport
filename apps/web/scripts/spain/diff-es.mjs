// ES coverage-diff: RFEG vs DB
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/spain-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

const FED_RAW = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/spain/rfeg-clubs-2026-05-12.json','utf8'))
// Normalize fed entries: parse coordinate "lat,lng"
const FED = FED_RAW.map(c => {
  const coord = (c.coordinate || '').split(',')
  return {
    fed_id: c.id,
    fed_name: c.name,
    address: c.address,
    place: c.place,
    province: c.province,
    federation: c.federation,
    web: c.web?.url || c.web?.val || null,
    email: c.mail?.val || null,
    phone: c.phone?.val || null,
    lat: coord[0] ? parseFloat(coord[0]) : null,
    lng: coord[1] ? parseFloat(coord[1]) : null,
    holes: c.holes || null,
    hasField: c.hasField,
  }
}).filter(c => c.fed_name)
console.log('Federation clubs:', FED.length)

const STOPWORDS = new Set([
  'golf','golfclub','club','de','del','la','las','los','el','y','&','and','centre','center',
  'resort','spa','country','hotel','leisure','park','cc','gc','sl','sa','sllc'
])
function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
    .replace(/[óòôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ñ]/g,'n').replace(/[ç]/g,'c')
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
function getDomain(url) {
  if (!url) return null
  let u = url.toLowerCase(); if (!u.startsWith('http')) u = 'http://' + u
  return (u.match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

const all = []; let from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,club,latitude,longitude,address,website,is_displayed').eq('country','Spain').range(from, from+999)
  all.push(...data); if (data.length < 1000) break; from += 1000
}
const byClub = new Map()
for (const r of all) {
  const k = r.club
  if (!byClub.has(k)) byClub.set(k, { club: k, lat: r.latitude, lng: r.longitude, address: r.address, website: r.website, hidden: !r.is_displayed })
  else {
    const x = byClub.get(k)
    if (x.lat == null && r.latitude != null) { x.lat = r.latitude; x.lng = r.longitude }
    if (!x.address && r.address) x.address = r.address
    if (!x.website && r.website) x.website = r.website
  }
}
const dbClubs = [...byClub.values()]
console.log('DB distinct clubs:', dbClubs.length)

const dbDomains = new Map()
for (const d of dbClubs) {
  const dom = getDomain(d.website)
  if (dom && dom !== 'facebook.com' && !dbDomains.has(dom)) dbDomains.set(dom, d.club)
}

const missing = []
let matched = 0, matchedHidden = 0
for (const f of FED) {
  let bestSim = 0, bestDist = Infinity, bestDb = null
  for (const d of dbClubs) {
    const sim = jaccard(f.fed_name, d.club)
    const dist = distM(f.lat, f.lng, d.lat, d.lng)
    if (sim > bestSim || (sim === bestSim && dist < bestDist)) {
      bestSim = sim; bestDist = dist; bestDb = d
    }
  }
  const isMatch = bestSim >= 0.6 || (bestSim >= 0.4 && bestDist <= 2000) || bestDist <= 500
  if (isMatch) { matched++; if (bestDb?.hidden) matchedHidden++; continue }
  missing.push({
    fed_id: f.fed_id, fed_name: f.fed_name,
    address: f.address, place: f.place,
    lat: f.lat, lng: f.lng,
    website: f.web, phone: f.phone, email: f.email,
    has_field: f.hasField, holes: f.holes,
    best_db_match: bestDb?.club || null,
    best_sim: bestSim.toFixed(2),
    best_dist_m: bestDist === Infinity ? null : Math.round(bestDist),
  })
}

console.log(`\nMatched: ${matched} (incl ${matchedHidden} hidden)`)
console.log(`Missing: ${missing.length}`)

function categorize(m) {
  // RFEG-specific: hasField=false → typically affiliate/sub-club without own course
  if (!m.has_field) return 'Skip (no own course)'
  const dom = getDomain(m.website)
  if (dom && dbDomains.has(dom)) return 'Dup (domain)'
  if (!m.address && !m.phone && !m.website && !m.email) return 'Skip (no contact)'
  return 'INSERT-kandidat'
}
const buckets = {}
for (const m of missing) {
  m._cat = categorize(m)
  buckets[m._cat] = (buckets[m._cat] || 0) + 1
}
console.log('\nFinal:', JSON.stringify(buckets, null, 2))
fs.writeFileSync(`${OUT_DIR}/missing-es.json`, JSON.stringify(missing, null, 2))

console.log('\n=== Sample INSERT-kandidat (first 12) ===')
missing.filter(m => m._cat === 'INSERT-kandidat').slice(0,12).forEach(r => {
  const flags = [r.website?'W':'-', r.phone?'P':'-', r.email?'E':'-'].join('')
  console.log('  ' + (r.fed_name||'').slice(0,42).padEnd(42) + ' | ' + flags + ' | ' + (r.place || ''))
})
