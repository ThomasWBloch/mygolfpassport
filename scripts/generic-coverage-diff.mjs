// Generic coverage-diff: fed JSON + country → missing list + INSERT
// Usage: node generic-coverage-diff.mjs <country> <fed_path> <fed_format>
// fed_format: 'array' | 'clubs_key' | 'cgf' | 'pzg' | 'fpg' | 'swissgolf' | 'golfbe'

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const [, , COUNTRY, FED_PATH, FED_FMT, OUT_NAME] = process.argv
if (!COUNTRY || !FED_PATH) { console.error('Usage: node generic-coverage-diff.mjs <country> <fed_path> <fed_format> <out_name>'); process.exit(1) }

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = `/sessions/vibrant-busy-mendel/mnt/outputs/${OUT_NAME}-audit`
fs.mkdirSync(OUT_DIR, { recursive: true })

// Load fed data
const raw = JSON.parse(fs.readFileSync(FED_PATH, 'utf8'))
const arr = Array.isArray(raw) ? raw : (raw.clubs || raw.golfClubs || raw.courses || [])

// Normalize per format
const FED = arr.map(f => {
  switch (FED_FMT) {
    case 'swissgolf': return { name: f.name, lat: f.lat, lng: f.lon, website: f.website, phone: null, email: null, address: null, holes: f.holes }
    case 'golfbe': return { name: f.name, lat: null, lng: null, website: f.website, phone: f.phone, email: f.email, address: f.address, holes: null }
    case 'fpg': return { name: f.name, lat: null, lng: null, website: f.website, phone: f.phone, email: f.email, address: [f.address, f.postal, f.city, f.district].filter(Boolean).join(', '), holes: null }
    case 'cgf': return { name: f.name, lat: null, lng: null, website: f.website || f.web, phone: f.phone, email: f.email, address: f.kraj || null, holes: null }
    case 'pzg': return { name: f.name, lat: null, lng: null, website: f.website, phone: null, email: null, address: null, holes: null }
    case 'gzs': case 'mgsz': case 'hgs': case 'hgf': case 'tgf': case 'egl': return { name: f.name, lat: null, lng: null, website: f.website, phone: f.phone, email: f.email, address: f.address || null, holes: null }
    case 'golffi': return { name: f.name, lat: f.lat, lng: f.lng, website: f.url || null, phone: f.phoneNumber, email: null, address: [f.streetAddress, f.postCode, f.city].filter(Boolean).join(', '), holes: null }
    case 'golfca': return { name: f.facilityName, lat: f.latitude, lng: f.longitude, website: f.website, phone: f.phone, email: f.email, address: [f.address1, f.city, f.region, f.postalCode].filter(Boolean).join(', '), holes: null }
    case 'oga': return { name: f.name, lat: f.latitude || f.lat, lng: f.longitude || f.lng || f.lon, website: f.website, phone: f.phone, email: null, address: [f.address, f.city, f.state, f.zip].filter(Boolean).join(', '), holes: f.holes }
    case 'golfau': return { name: f.name, lat: f.latitude, lng: f.longitude, website: f.website, phone: f.phone, email: f.email, address: [f.address, f.city, f.state, f.postcode].filter(Boolean).join(', '), holes: null }
    case 'osm': return { name: f.name, lat: f.lat, lng: f.lon, website: f.website, phone: f.phone, email: f.email, address: [f.address, f.city, f.state, f.postcode].filter(Boolean).join(', '), holes: null }
    default: return f
  }
}).filter(f => f.name)

console.log(`Fed: ${FED.length}`)

const STOPWORDS = new Set([
  'golf','golfclub','golfklub','klub','klubb','club','centre','center','resort','spa',
  'and','&','the','of','de','la','le','les','el','en','et','der','die','das','von','am','der',
  'gc','gk','cc','country','hotel','park','asd','ev','e.v.','sa','sl','sllc'
])
function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
    .replace(/[óòôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ñ]/g,'n').replace(/[ç]/g,'c')
    .replace(/[äÄ]/g,'ae').replace(/[öÖ]/g,'oe').replace(/[üÜ]/g,'ue').replace(/[ß]/g,'ss')
    .replace(/[łŁ]/g,'l').replace(/[śŚ]/g,'s').replace(/[żŻźŹ]/g,'z').replace(/[ćĆ]/g,'c').replace(/[ńŃ]/g,'n').replace(/[ąĄ]/g,'a').replace(/[ęĘ]/g,'e')
    .replace(/[čĆ]/g,'c').replace(/[šŠ]/g,'s').replace(/[žŽ]/g,'z').replace(/[řŘ]/g,'r').replace(/[ďĎ]/g,'d').replace(/[ťŤ]/g,'t').replace(/[ňŇ]/g,'n')
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
  const { data } = await sb.from('courses').select('id,club,latitude,longitude,address,website,phone,email,is_displayed').eq('country', COUNTRY).range(from, from+999)
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
console.log(`DB ${COUNTRY}: ${dbClubs.length}`)

const dbDomains = new Map()
for (const d of dbClubs) {
  const dom = getDomain(d.website)
  if (dom && dom !== 'facebook.com' && !dbDomains.has(dom)) dbDomains.set(dom, d.club)
}

const missing = []
let matched = 0
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
  if (isMatch) { matched++; continue }
  missing.push({
    fed_name: f.name, address: f.address, lat: f.lat, lng: f.lng,
    website: f.website, phone: f.phone, email: f.email, holes: f.holes,
    best_db_match: bestDb?.club || null, best_sim: bestSim.toFixed(2),
  })
}

console.log(`Matched: ${matched}, Missing: ${missing.length}`)

function categorize(m) {
  if (!m.address && !m.phone && !m.website && !m.email) return 'Skip (no contact)'
  const dom = getDomain(m.website)
  if (dom && dbDomains.has(dom)) return 'Dup (domain)'
  return 'INSERT-kandidat'
}
const buckets = {}
for (const m of missing) { m._cat = categorize(m); buckets[m._cat] = (buckets[m._cat]||0)+1 }
console.log('Final:', JSON.stringify(buckets))
fs.writeFileSync(`${OUT_DIR}/missing.json`, JSON.stringify(missing, null, 2))
