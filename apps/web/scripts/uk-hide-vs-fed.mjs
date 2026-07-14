// Check 451 unique hidden rows vs UK+IE federation rosters
// If match → recommend un-hide

import fs from 'fs'

const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
const buckets = JSON.parse(fs.readFileSync(`${OUT_DIR}/hide-bucket-analysis.json`,'utf8'))
const unique = buckets.unique

const FEDS = {
  England: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/england/england-eg-clubs.json','utf8')),
  Scotland: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/scotland/scotland-sg-clubs.json','utf8')),
  Wales: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/wales/wales-wg-clubs.json','utf8')),
  Ireland: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/ireland/ireland-gi-clubs.json','utf8')),
}

const STOPWORDS = new Set(['golf','club','course','park','resort','centre','center','cc','gc','gk','&','and','the','country','hotel','spa','leisure','links','golfklub','golfklubb','co','of'])
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

const unhide = []
const stillHidden = []

for (const h of unique) {
  let best = null
  for (const [country, fed] of Object.entries(FEDS)) {
    for (const f of fed) {
      const sim = jaccard(h.club, f.name)
      const dist = distM(h.latitude, h.longitude, f.latitude, f.longitude)
      const isMatch = sim >= 0.6 || (sim >= 0.4 && dist <= 2000) || dist <= 500
      if (isMatch) {
        const score = sim + (dist <= 1000 ? 0.5 : 0)
        if (!best || score > best.score) best = { country, sim, dist, score, fed_name: f.name }
      }
    }
  }
  if (best) unhide.push({ ...h, fed_match: best })
  else stillHidden.push(h)
}

console.log('=== Unique hide-bucket: federation match ===')
console.log(`  un-hide candidates (matched fed): ${unhide.length}`)
console.log(`  still hidden (no fed match): ${stillHidden.length}`)

// Per-country breakdown
const perC = {}
for (const u of unhide) {
  perC[u.country] = (perC[u.country] || 0) + 1
}
console.log('\nUn-hide per country:')
Object.entries(perC).forEach(([c,n]) => console.log(`  ${c}: ${n}`))

// Cross-country flag
const crossCountry = unhide.filter(u => u.fed_match.country !== u.country)
console.log(`\nCross-country (DB country ≠ fed match country): ${crossCountry.length}`)

fs.writeFileSync(`${OUT_DIR}/hide-bucket-unhide-candidates.json`, JSON.stringify(unhide, null, 2))
fs.writeFileSync(`${OUT_DIR}/hide-bucket-still-hidden.json`, JSON.stringify(stillHidden, null, 2))

console.log('\n=== Sample un-hide (first 10) ===')
unhide.slice(0, 10).forEach(u => {
  console.log(`  ${u.country.slice(0,4).padEnd(4)} | "${u.club.slice(0,38).padEnd(38)}" | fed:"${u.fed_match.fed_name.slice(0,30)}" sim=${u.fed_match.sim.toFixed(2)} dist=${Math.round(u.fed_match.dist)}m`)
})

console.log('\n=== Sample still hidden (first 10) ===')
stillHidden.slice(0, 10).forEach(s => {
  console.log(`  ${s.country.slice(0,4).padEnd(4)} | "${s.club.slice(0,38).padEnd(38)}" | addr: ${(s.address||'').slice(0,40)}`)
})
