// DE coverage-diff: DGV federation vs DB
// No coords in DGV → match via name + postcode/city
// Includes shared-domain dup-check + cross-country sanity

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/germany-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

const FED = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/germany/dgv-clubs-2026-05-12.json','utf8'))

const STOPWORDS = new Set([
  'golf','golfclub','golfklub','klub','club','cc','gcc','centre','center',
  'resort','spa','and','und','&','the','der','die','das','von','am','im',
  'gc','gk','ev','e.v.','country','hotel','leisure','park'
])

function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[äÄ]/g,'ae').replace(/[öÖ]/g,'oe').replace(/[üÜ]/g,'ue').replace(/[ß]/g,'ss')
    .replace(/[áàâ]/g,'a').replace(/[éèê]/g,'e').replace(/[íìî]/g,'i').replace(/[óòô]/g,'o').replace(/[úùû]/g,'u')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()
}
function tokens(s) { return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t)) }
function jaccard(a, b) {
  const A = new Set(tokens(a)); const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0; for (const t of A) if (B.has(t)) inter++
  const u = A.size + B.size - inter; return u ? inter / u : 0
}
function getDomain(url) {
  if (!url) return null
  let u = url.toLowerCase()
  if (!u.startsWith('http')) u = 'http://' + u
  return (u.match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

// Pull DB Germany
const all = []; let from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,club,name,latitude,longitude,address,website,phone,email,is_displayed').eq('country','Germany').range(from, from+999)
  all.push(...data)
  if (data.length < 1000) break; from += 1000
}
console.log(`DB Germany rows: ${all.length}`)

// Group by club (one entry per distinct club)
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
console.log(`DB distinct clubs: ${dbClubs.length}`)
console.log(`Fed clubs: ${FED.length}`)

// For each fed club, find best DB match
const missing = []
let matched = 0, matchedHidden = 0
for (const f of FED) {
  let bestSim = 0, bestDb = null, bestZipMatch = false
  const fZip = (f.houseAddressZipCode || '').slice(0, 3)  // German postcode area (first 3 digits)
  for (const d of dbClubs) {
    const sim = jaccard(f.longName, d.club)
    let zipMatch = false
    if (fZip && d.address) {
      const m = d.address.match(/\b(\d{5})\b/)
      if (m && m[1].slice(0, 3) === fZip) zipMatch = true
    }
    // Score boost for zip match
    const score = sim + (zipMatch ? 0.3 : 0)
    if (score > bestSim || (score === bestSim && zipMatch && !bestZipMatch)) {
      bestSim = score; bestDb = d; bestZipMatch = zipMatch
    }
  }
  // Also try shortName
  for (const d of dbClubs) {
    const sim = jaccard(f.shortName, d.club)
    if (sim > bestSim) { bestSim = sim; bestDb = d }
  }
  // Match thresholds: high sim, OR sim+zip combo
  const isMatch = bestSim >= 0.65
  if (isMatch) { matched++; if (bestDb?.hidden) matchedHidden++; continue }

  missing.push({
    fed_id: f.id,
    fed_name: f.longName,
    short_name: f.shortName,
    address: [f.houseAddressStreet, f.houseAddressZipCode, f.houseAddressCity].filter(Boolean).join(', '),
    zip: f.houseAddressZipCode,
    city: f.houseAddressCity,
    website: f.website,
    phone: f.phone1,
    email: f.email1,
    best_db_match: bestDb?.club || null,
    best_sim: bestSim.toFixed(2),
  })
}

console.log(`\nMatched: ${matched} (incl ${matchedHidden} hidden)`)
console.log(`Missing: ${missing.length}`)

// Categorize missing
function categorize(m) {
  const name = (m.fed_name || '').toLowerCase()
  if (/(driving range|pitch.?putt|indoor|simulator|academy)/.test(name)) return 'Skip (range/sim)'
  if (!m.address && !m.phone && !m.website) return 'Skip (no contact)'
  return 'INSERT-kandidat'
}
const buckets = {}
for (const m of missing) {
  m._cat = categorize(m)
  buckets[m._cat] = (buckets[m._cat] || 0) + 1
}
console.log('\nCategories:', JSON.stringify(buckets))

// Shared-domain dup-check vs DB
const dbDomains = new Map()
for (const d of dbClubs) {
  const dom = getDomain(d.website)
  if (dom && dom !== 'facebook.com') {
    if (!dbDomains.has(dom)) dbDomains.set(dom, d.club)
  }
}
let domainDups = 0
for (const m of missing) {
  if (m._cat !== 'INSERT-kandidat') continue
  const dom = getDomain(m.website)
  if (dom && dbDomains.has(dom)) {
    m._cat = 'Dup-kandidat (domain)'
    m._dup_match = dbDomains.get(dom)
    domainDups++
  }
}
console.log(`Domain dups detected: ${domainDups}`)
console.log('\nFinal categories:')
const finalBuckets = {}
for (const m of missing) finalBuckets[m._cat] = (finalBuckets[m._cat] || 0) + 1
console.log(JSON.stringify(finalBuckets, null, 2))

fs.writeFileSync(`${OUT_DIR}/missing-de.json`, JSON.stringify(missing, null, 2))

// Sample top 15 INSERT-kandidater
console.log('\n=== Sample INSERT-kandidater (first 15) ===')
missing.filter(m => m._cat === 'INSERT-kandidat').slice(0, 15).forEach(m => {
  const flags = [m.website?'W':'-', m.phone?'P':'-', m.email?'E':'-'].join('')
  console.log(`  ${(m.fed_name||'').slice(0,42).padEnd(42)} | ${flags} | ${(m.address||'').slice(0,40)}`)
})

console.log('\n=== Sample Dup-kandidater (first 10) ===')
missing.filter(m => m._cat === 'Dup-kandidat (domain)').slice(0, 10).forEach(m => {
  console.log(`  ${(m.fed_name||'').slice(0,38).padEnd(38)} → DB:"${m._dup_match}"`)
})
