// Pass 2b row builder v2: 1 row per club + tighter dup-check
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const AUDIT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/nordic-audit'
const COUNTRIES = [['DK','Denmark'], ['IS','Iceland'], ['NO','Norway'], ['SE','Sweden']]

const STOPWORDS = new Set(['golf','golfklub','golfklubb','golfklubben','golfklubbur','golfklúbbur','golfklúbburinn','klubb','klub','club','cc','golfcenter','centre','center','resort','spa','and','og','&','the','gk','gc'])

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
    .replace(/[óòôö]/g,'o').replace(/[úùûü]/g,'u').replace(/[ýÿ]/g,'y')
    .replace(/ð/g,'d').replace(/þ/g,'th').replace(/ø/g,'o')
    .replace(/[æ]/g,'ae').replace(/[å]/g,'a')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim()
}

function stripS(s) { return s.endsWith('s') ? s.slice(0,-1) : s }

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

function lev(a, b) {
  const m = a.length, n = b.length
  if (m === 0) return n; if (n === 0) return m
  const dp = Array(n+1).fill(0).map((_,i)=>i)
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]; dp[0] = i
    for (let j = 1; j <= n; j++) {
      const cur = dp[j]
      dp[j] = a[i-1] === b[j-1] ? prev : Math.min(prev, dp[j], dp[j-1]) + 1
      prev = cur
    }
  }
  return dp[n]
}

function categorize(row) {
  const name = (row.fed_name || '').toLowerCase()
  const postal = (row.postal_address || '').trim()
  const courses = (row.courses || '').trim()
  const website = (row.website || '').trim()
  const sim = parseFloat(row.best_sim || 0)
  const dist = row.best_dist_m
  if (/nuuk|greenland|longyearbyen|svalbard/.test(name)) return 'Edge'
  if ((!postal || postal === '-') && (!courses || courses.startsWith('undefined') || /klubbar|gdf|kort/.test(name))) return 'Admin'
  if (/\(70/.test(name) || /loyaltee/.test(website.toLowerCase())) return 'DupLoyalty'
  if (sim >= 0.5 && dist != null && dist <= 5000) return 'DupRename'
  if (website && courses && !courses.startsWith('undefined')) return 'Real'
  if (website) return 'Verify'
  return 'Verify'
}

function parseCourses(s) {
  if (!s) return []
  return s.split(' / ').map(part => {
    const m = part.match(/^(.+?)\s*\((\d+|null)h,\s*par\s*(\d+|null)\)$/)
    if (!m) return null
    return {
      name: m[1].trim() === 'undefined' ? null : m[1].trim(),
      holes: m[2] === 'null' ? null : parseInt(m[2], 10),
      par: m[3] === 'null' ? null : parseInt(m[3], 10),
    }
  }).filter(Boolean)
}

// Manual exclusion list — chain umbrellas + obvious dup-renames
const MANUAL_EXCLUDE = new Set([
  'GolfStar Golf Club',           // 19-course chain umbrella
  'Karlstads Golfklubb',          // DB has "Karlstad Golfklubb" (s-genitive)
  'Strömstads Golfklubb',         // DB has "Strömstad Golfklubb"
  'Norrköping Söderköping Golfklubb', // sim=0.67 in DB already — matcher missed
  'Lannalodge Golfresort',        // DB has "Lannalodge Golf Resort"
  'Huvudstadens Golfklubb',       // DB has "Huvudstadens Golfklubb Riksten"
  'Lycke Golf & Country Club Marstrand', // DB has "Lycke Golf & Country Club"
  'Lunna Golf & Country Club',    // DB has "Lunna Golf"
  'Hässelby Golfklubb',           // DB has "GolfStar Hässelby"
  'Stjernfors Nya GK',            // DB has "Stjernfors Golfklubb"
  'Skepptuna Golfklubb Valla',    // DB has "Skepptuna Golfklubb"
])

async function fetchDbClubs(countryFull) {
  const all = []
  let from = 0
  while (true) {
    const { data } = await sb.from('courses').select('club,latitude,longitude').eq('country', countryFull).range(from, from+999)
    all.push(...data)
    if (data.length < 1000) break
    from += 1000
  }
  return [...new Set(all.map(r => r.club))].map(c => ({ club: c }))
}

const allRows = []
const perCountry = {}
const excluded = []

for (const [iso, full] of COUNTRIES) {
  const missing = JSON.parse(fs.readFileSync(path.join(AUDIT_DIR, `missing-${iso.toLowerCase()}.json`), 'utf8'))
  const real = missing.filter(m => categorize(m) === 'Real')
  const dbClubs = await fetchDbClubs(full)

  perCountry[iso] = { input_real: real.length, excluded: 0, inserted: 0 }

  for (const m of real) {
    if (MANUAL_EXCLUDE.has(m.fed_name)) {
      excluded.push({ iso, name: m.fed_name, reason: 'Manual exclude (chain or rename-dup)' })
      perCountry[iso].excluded++
      continue
    }

    // Stricter fuzzy check vs DB clubs: high jaccard sim after s-suffix strip
    let bestSim = 0, bestMatch = null
    for (const d of dbClubs) {
      const sim = jaccard(m.fed_name, d.club)
      if (sim > bestSim) { bestSim = sim; bestMatch = d.club }
    }
    if (bestSim >= 0.66) {
      excluded.push({ iso, name: m.fed_name, reason: `Fuzzy dup: sim=${bestSim.toFixed(2)} → "${bestMatch}"` })
      perCountry[iso].excluded++
      continue
    }

    // 1 row per club using primary course
    const courses = parseCourses(m.courses).filter(c => c.name && c.holes >= 9)
    const primary = courses[0] || { name: '18-hole course', holes: 18, par: null }

    allRows.push({
      country: full,
      club: m.fed_name,
      name: primary.name,
      latitude: m.lat,
      longitude: m.lng,
      website: m.website,
      phone: m.phone || null,
      email: m.email || null,
      holes: primary.holes,
      par: primary.par,
      is_displayed: true,
      is_combo: false,
    })
    perCountry[iso].inserted++
  }
}

fs.writeFileSync(path.join(AUDIT_DIR, 'pass2b-rows-v2.json'), JSON.stringify(allRows, null, 2))
fs.writeFileSync(path.join(AUDIT_DIR, 'pass2b-excluded.json'), JSON.stringify(excluded, null, 2))

console.log('=== Pass 2b INSERT preview (v2: 1 row/club, fuzzy dup-filter) ===\n')
console.log('Per country:')
for (const [iso, info] of Object.entries(perCountry)) {
  console.log(`  ${iso}: ${info.input_real} real → ${info.excluded} excluded → ${info.inserted} to INSERT`)
}
console.log(`\nTOTAL ROWS: ${allRows.length}`)
console.log(`TOTAL EXCLUDED: ${excluded.length}`)

console.log('\n=== Excluded (auto-filtered) ===')
excluded.forEach(e => console.log(`  ${e.iso} | ${e.name.padEnd(40)} | ${e.reason}`))

console.log('\n=== Sample INSERT-rows (first 8) ===')
for (const r of allRows.slice(0, 8)) {
  console.log(`  [${r.country.slice(0,2).toUpperCase()}] ${r.club.padEnd(36)} | ${(r.name || '').slice(0,20).padEnd(20)} | ${r.holes}h | ${r.website || ''}`)
}
