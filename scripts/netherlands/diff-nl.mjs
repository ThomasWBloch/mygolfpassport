// NL coverage-diff: NGF vs DB (no coords in NGF)
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/netherlands-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

const FED = JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/netherlands/ngf-clubs-2026-05-12.json','utf8'))
console.log('NGF clubs:', FED.length)

const STOPWORDS = new Set([
  'golf','golfclub','golfbaan','club','centre','center','resort','spa','en','&','the','of','de','het','van','der','een',
  'cc','gc','country','hotel','leisure','park','b.v.','bv'
])
function normalize(s) {
  return (s||'').toLowerCase()
    .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
    .replace(/[óòôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ñ]/g,'n')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()
}
function tokens(s) { return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t) && t.length > 1) }
function jaccard(a, b) {
  const A = new Set(tokens(a)); const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0; for (const t of A) if (B.has(t)) inter++
  const u = A.size + B.size - inter; return u ? inter / u : 0
}
function getDomain(url) {
  if (!url) return null
  let u = url.toLowerCase(); if (!u.startsWith('http')) u = 'http://' + u
  return (u.match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

const all = []; let from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,club,latitude,longitude,address,website,phone,email,is_displayed').eq('country','Netherlands').range(from, from+999)
  all.push(...data); if (data.length < 1000) break; from += 1000
}
const byClub = new Map()
for (const r of all) {
  const k = r.club
  if (!byClub.has(k)) byClub.set(k, { club: k, lat: r.latitude, lng: r.longitude, address: r.address, website: r.website, phone: r.phone, email: r.email, hidden: !r.is_displayed })
  else {
    const x = byClub.get(k)
    if (x.lat == null && r.latitude != null) { x.lat = r.latitude; x.lng = r.longitude }
    if (!x.address && r.address) x.address = r.address
    if (!x.website && r.website) x.website = r.website
  }
}
const dbClubs = [...byClub.values()]
console.log('DB distinct clubs:', dbClubs.length)

// NL match: name-only (no coords in NGF). Also check email+phone for confirmation.
const dbEmails = new Map()
const dbPhones = new Map()
for (const d of dbClubs) {
  if (d.email) dbEmails.set(d.email.toLowerCase(), d.club)
  if (d.phone) dbPhones.set(d.phone.replace(/\D/g,''), d.club)
}

const missing = []
let matched = 0
for (const f of FED) {
  let bestSim = 0, bestDb = null
  const fNorm = normalize(f.title)
  for (const d of dbClubs) {
    const sim = jaccard(f.title, d.club)
    let s = sim
    // Substring: NGF "AMVJ" → DB "Golfclub AMVJ" should match
    const dNorm = normalize(d.club)
    if (fNorm && dNorm.includes(fNorm) && fNorm.length >= 4) s = Math.max(s, 0.7)
    if (s > bestSim) { bestSim = s; bestDb = d }
  }
  // Also confirm via email/phone match
  const emailMatch = f.emailAddress ? dbEmails.get(f.emailAddress.toLowerCase()) : null
  const phoneMatch = f.phoneNumber ? dbPhones.get(f.phoneNumber.replace(/\D/g,'')) : null

  const isMatch = bestSim >= 0.5 || emailMatch || phoneMatch
  if (isMatch) { matched++; continue }
  missing.push({
    fed_name: f.title,
    website: f.websiteUrl,
    phone: f.phoneNumber,
    email: f.emailAddress,
    description: (f.description || '').slice(0, 200),
    best_db_match: bestDb?.club || null,
    best_sim: bestSim.toFixed(2),
  })
}

console.log(`\nMatched: ${matched}`)
console.log(`Missing: ${missing.length}`)

fs.writeFileSync(`${OUT_DIR}/missing-nl.json`, JSON.stringify(missing, null, 2))

console.log('\n=== All missing (limit 20) ===')
missing.slice(0, 20).forEach(r => console.log('  "' + r.fed_name.padEnd(38) + '" | best:"' + (r.best_db_match||'-') + '" sim=' + r.best_sim))
