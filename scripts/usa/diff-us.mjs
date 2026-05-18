import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/usa-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

const FED = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/usa/usa-courses-oga.json','utf8')).courses
console.log('OGA courses:', FED.length)

function normalize(s) { return (s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim() }
const STOPWORDS = new Set(['golf','course','club','cc','gc','country','golf-course','the','of','at'])
function keyTokens(s) { return new Set(normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t) && t.length > 2)) }

function distM(la1, lo1, la2, lo2) {
  if (la1==null||la2==null||lo1==null||lo2==null) return Infinity
  const R = 6371000, toRad = d => d * Math.PI / 180
  const dLat = toRad(la2-la1), dLng = toRad(lo2-lo1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const all = []; let from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,club,latitude,longitude,address,website').eq('country','USA').range(from, from+999)
  all.push(...data); if (data.length < 1000) break; from += 1000
}
console.log('DB rows:', all.length)

// Index DB by city/state for fast lookup
const byClub = new Map()
for (const r of all) {
  if (!byClub.has(r.club)) byClub.set(r.club, { club: r.club, lat: r.latitude, lng: r.longitude, address: r.address, website: r.website, tokens: keyTokens(r.club) })
}
const dbClubs = [...byClub.values()]
console.log('DB distinct clubs:', dbClubs.length)

// Build city index
const dbByCity = new Map()
for (const d of dbClubs) {
  const cityM = (d.address||'').match(/,\s*([^,]+),/) // crude
  if (cityM) {
    const k = normalize(cityM[1])
    if (!dbByCity.has(k)) dbByCity.set(k, [])
    dbByCity.get(k).push(d)
  }
}

const missing = []
let matched = 0
for (const f of FED) {
  const fName = f.name
  const fCity = normalize(f.city || '')
  const fTokens = keyTokens(fName)
  let bestSim = 0, bestDb = null, bestDist = Infinity
  // Search DB clubs in same city first
  const candidates = (dbByCity.get(fCity) || []).concat(dbClubs.length < 5000 ? dbClubs : [])
  for (const d of (candidates.length < 100 ? candidates : (dbByCity.get(fCity) || []))) {
    let inter = 0; for (const t of fTokens) if (d.tokens.has(t)) inter++
    const u = fTokens.size + d.tokens.size - inter
    const sim = u ? inter/u : 0
    const dist = distM(f.latitude, f.longitude, d.lat, d.lng)
    if (sim > bestSim || (sim === bestSim && dist < bestDist)) { bestSim = sim; bestDist = dist; bestDb = d }
  }
  // Also coord-only match if no candidate
  if (!bestDb || bestSim < 0.3) {
    for (const d of dbClubs) {
      const dist = distM(f.latitude, f.longitude, d.lat, d.lng)
      if (dist < bestDist) { bestDist = dist; bestDb = d }
    }
  }
  const isMatch = bestSim >= 0.6 || (bestSim >= 0.4 && bestDist <= 1000) || bestDist <= 300
  if (isMatch) { matched++; continue }
  missing.push({
    fed_name: fName, address: [f.address, f.city, f.state, f.postal_code].filter(Boolean).join(', '),
    lat: f.latitude, lng: f.longitude, website: f.website, phone: f.phone, holes: f.holes,
    state: f.state, city: f.city,
    best_db_match: bestDb?.club, best_sim: bestSim.toFixed(2), best_dist_m: bestDist === Infinity ? null : Math.round(bestDist),
  })
}
console.log('Matched:', matched, 'Missing:', missing.length)
fs.writeFileSync(`${OUT_DIR}/missing.json`, JSON.stringify(missing, null, 2))

// Categorize - USA is big, be cautious
const AFFILIATE = /\b(ladies|seniors?|junior|veterans|women|men|youth)\b.*(golf|club)|driving range|simulator|academy|topgolf|virtual|indoor|teaching|practice/i
let aff = 0, noContact = 0, real = 0;
for (const m of missing) {
  if (!m.lat && !m.website && !m.phone && !m.address) { m._cat = 'Skip (no contact)'; noContact++; }
  else if (AFFILIATE.test(m.fed_name)) { m._cat = 'Skip (affiliate)'; aff++; }
  else { m._cat = 'INSERT-kandidat'; real++; }
}
console.log('Categorized: real=' + real + ' affiliate=' + aff + ' nocontact=' + noContact)
fs.writeFileSync(`${OUT_DIR}/missing.json`, JSON.stringify(missing, null, 2))
