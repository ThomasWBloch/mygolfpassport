// Diff GolfBox federation rosters vs MGP DB for DK/IS/NO/SE
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const sb = createClient(SB_URL, SB_KEY)

const NORDIC_PATH = '/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/nordic'
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/nordic-audit'

const COUNTRY_MAP = { DK: 'Denmark', IS: 'Iceland', NO: 'Norway', SE: 'Sweden' }

const STOPWORDS = new Set([
  'golf', 'golfklub', 'golfklubb', 'golfklubben', 'golfklubbur',
  'golfklúbbur', 'golfklúbburinn', 'klubb', 'klub', 'club', 'cc',
  'g&cc', 'gcc', 'golfcenter', 'golf-center', 'centre', 'center',
  'resort', 'spa', 'and', 'og', '&', 'the', 'gk', 'gc',
])

function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/[áàâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i')
    .replace(/[óòôö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ýÿ]/g, 'y')
    .replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/ø/g, 'o')
    .replace(/[æ]/g, 'ae').replace(/[å]/g, 'a')
    .replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
}

function tokens(s) {
  return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t))
}

function jaccard(a, b) {
  const A = new Set(tokens(a))
  const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0
  for (const t of A) if (B.has(t)) inter++
  const union = A.size + B.size - inter
  return union ? inter / union : 0
}

function distM(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lat2 == null || lng1 == null || lng2 == null) return Infinity
  const R = 6371000
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

async function fetchDbClubs(countryFull) {
  const all = []
  let from = 0
  const PAGE = 1000
  while (true) {
    const { data, error } = await sb
      .from('courses')
      .select('id, club, name, latitude, longitude, website')
      .eq('country', countryFull)
      .range(from, from + PAGE - 1)
    if (error) throw error
    all.push(...data)
    if (data.length < PAGE) break
    from += PAGE
  }
  const byClub = new Map()
  for (const r of all) {
    const k = r.club
    if (!byClub.has(k)) {
      byClub.set(k, { club: r.club, lat: r.latitude, lng: r.longitude, website: r.website, rows: 1 })
    } else {
      const existing = byClub.get(k)
      existing.rows++
      if (existing.lat == null && r.latitude != null) {
        existing.lat = r.latitude; existing.lng = r.longitude
      }
      if (!existing.website && r.website) existing.website = r.website
    }
  }
  return [...byClub.values()]
}

async function auditCountry(iso) {
  const fed = JSON.parse(fs.readFileSync(path.join(NORDIC_PATH, `golfbox-clubs-${iso.toLowerCase()}.json`), 'utf8'))
  const db = await fetchDbClubs(COUNTRY_MAP[iso])

  const missing = []
  const matched = []

  for (const f of fed) {
    let bestSim = 0
    let bestDist = Infinity
    let bestDbClub = null
    for (const d of db) {
      const sim = jaccard(f.name, d.club)
      const dist = distM(f.lat, f.lng, d.lat, d.lng)
      if (sim > bestSim || (sim === bestSim && dist < bestDist)) {
        bestSim = sim
        bestDist = dist
        bestDbClub = d
      }
    }
    const isMatch = bestSim >= 0.7 || bestDist <= 1000
    if (isMatch) {
      matched.push({ fed_name: f.name, db_club: bestDbClub?.club, sim: bestSim.toFixed(2), dist_m: Math.round(bestDist) })
    } else {
      missing.push({
        fed_id: f.id,
        fed_name: f.name,
        display_name: f.displayName,
        postal_address: f.postalAddress,
        postal_code: f.postalCode,
        address: f.address,
        lat: f.lat,
        lng: f.lng,
        website: f.website,
        phone: f.phone,
        email: f.email,
        courses: (f.courses || []).map(c => `${c.name} (${c.holes}h, par ${c.par})`).join(' / '),
        best_db_match: bestDbClub?.club || null,
        best_sim: bestSim.toFixed(2),
        best_dist_m: bestDist === Infinity ? null : Math.round(bestDist),
      })
    }
  }

  return {
    iso,
    fed_count: fed.length,
    db_count: db.length,
    matched_count: matched.length,
    missing_count: missing.length,
    missing, matched,
  }
}

const summary = []
for (const iso of ['DK', 'IS', 'NO', 'SE']) {
  console.log(`\n=== ${iso} ===`)
  const r = await auditCountry(iso)
  summary.push({
    country: iso,
    federation: r.fed_count,
    db: r.db_count,
    matched: r.matched_count,
    missing: r.missing_count,
    missing_pct: ((r.missing_count / r.fed_count) * 100).toFixed(1) + '%',
  })
  fs.writeFileSync(path.join(OUT_DIR, `missing-${iso.toLowerCase()}.json`), JSON.stringify(r.missing, null, 2))
  console.log(`  Federation: ${r.fed_count}, DB: ${r.db_count}, matched: ${r.matched_count}, MISSING: ${r.missing_count}`)
  if (r.missing.length) {
    console.log('  Top missing (first 15):')
    for (const m of r.missing.slice(0, 15)) {
      const best = m.best_db_match ? `best="${m.best_db_match}" sim=${m.best_sim} dist=${m.best_dist_m}m` : 'no candidates'
      console.log(`    ${(m.fed_name || '').slice(0,42).padEnd(42)} | ${(m.postal_address || '-').slice(0,15).padEnd(15)} | ${best}`)
    }
  }
}

console.log('\n=== SUMMARY ===')
console.table(summary)
fs.writeFileSync(path.join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2))
