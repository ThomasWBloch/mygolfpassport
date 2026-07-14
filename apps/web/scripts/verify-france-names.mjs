// Compare our French golf course names against OpenStreetMap (Overpass).
// One Overpass call fetches all OSM golf courses in France; for each DB row
// we find the nearest OSM course within 500 m and compare normalized names.
// Run with: node --env-file=.env.local scripts/verify-france-names.mjs

import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]
const RADIUS_M = 500
const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── Overpass ───────────────────────────────────────────────────────────────
async function overpass(query) {
  for (const server of OVERPASS_SERVERS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        console.log(`  Querying ${server} (attempt ${attempt + 1})...`)
        const resp = await fetch(server, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(query)}`,
          signal: AbortSignal.timeout(240000),
        })
        if (!resp.ok) {
          console.log(`    HTTP ${resp.status}`)
          await sleep(5000)
          continue
        }
        const text = await resp.text()
        if (!text.startsWith('{')) {
          console.log(`    non-JSON response (${text.slice(0, 80)}...)`)
          await sleep(5000)
          continue
        }
        return JSON.parse(text)
      } catch (e) {
        console.log(`    error: ${e.message}`)
        await sleep(5000)
      }
    }
  }
  throw new Error('All Overpass servers failed')
}

// ── Distance ──────────────────────────────────────────────────────────────
function haversineKm(a, b) {
  const R = 6371
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const la1 = toRad(a.lat), la2 = toRad(b.lat)
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(la1) * Math.cos(la2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

// ── Name normalization / similarity ───────────────────────────────────────
const STOPWORDS = new Set([
  'golf', 'club', 'course', 'country', 'resort', 'international', 'national',
  'de', 'du', 'des', 'la', 'le', 'les', 'd', 'l', 'et', 'the', 'sur', 'saint',
  'st', 'ste',
])

function tokenize(s) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(w => w && !STOPWORDS.has(w))
}

function jaccard(a, b) {
  const setA = new Set(tokenize(a))
  const setB = new Set(tokenize(b))
  if (setA.size === 0 && setB.size === 0) return 1
  if (setA.size === 0 || setB.size === 0) return 0
  let inter = 0
  for (const t of setA) if (setB.has(t)) inter++
  const union = setA.size + setB.size - inter
  return inter / union
}

// Best similarity across our (name, club) vs OSM (name, name:en, alt_name)
function bestSimilarity(db, osm) {
  const dbCandidates = [db.club, db.name].filter(Boolean)
  const osmCandidates = [osm.name, osm.nameEn, osm.altName].filter(Boolean)
  let best = 0, bestPair = null
  for (const d of dbCandidates) {
    for (const o of osmCandidates) {
      const s = jaccard(d, o)
      if (s > best) { best = s; bestPair = { db: d, osm: o } }
    }
  }
  return { score: best, pair: bestPair }
}

// ── Main ───────────────────────────────────────────────────────────────────
console.log('Fetching French courses from DB...')
const courses = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, address')
    .eq('country', 'France')
    .eq('is_combo', false)
    .not('latitude', 'is', null)
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data?.length) break
  courses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}
console.log(`  ${courses.length} French courses with coordinates`)

console.log('\nFetching OSM golf courses in France (single Overpass query)...')
const query = `[out:json][timeout:180];
area["ISO3166-1"="FR"][admin_level=2]->.fr;
(
  way[leisure=golf_course](area.fr);
  relation[leisure=golf_course](area.fr);
  node[leisure=golf_course](area.fr);
);
out tags center;`
const json = await overpass(query)
const osm = (json.elements ?? [])
  .map(e => ({
    id: `${e.type}/${e.id}`,
    name: e.tags?.name ?? null,
    nameEn: e.tags?.['name:en'] ?? null,
    altName: e.tags?.alt_name ?? null,
    lat: e.lat ?? e.center?.lat ?? null,
    lon: e.lon ?? e.center?.lon ?? null,
  }))
  .filter(c => c.lat != null && c.lon != null)
console.log(`  ${osm.length} OSM golf courses in France (${osm.filter(o => o.name).length} with a name tag)`)

// ── Match each DB course to nearest OSM course within RADIUS_M ────────────
console.log(`\nMatching (radius: ${RADIUS_M} m)...`)
const results = []
for (const c of courses) {
  const me = { lat: c.latitude, lon: c.longitude }
  let best = null, bestDist = Infinity
  for (const o of osm) {
    const d = haversineKm(me, o)
    if (d < bestDist) { best = o; bestDist = d }
  }
  const distM = best ? bestDist * 1000 : null
  const withinRadius = distM != null && distM <= RADIUS_M
  const sim = withinRadius ? bestSimilarity(c, best) : { score: null, pair: null }
  results.push({
    id: c.id,
    dbClub: c.club,
    dbName: c.name,
    osmId: withinRadius ? best.id : null,
    osmName: withinRadius ? best.name : null,
    osmNameEn: withinRadius ? best.nameEn : null,
    distM: withinRadius ? Math.round(distM) : null,
    similarity: sim.score,
    comparedPair: sim.pair,
  })
}

// ── Categorize ────────────────────────────────────────────────────────────
const noOsm      = results.filter(r => r.osmId == null)
const exact      = results.filter(r => r.similarity != null && r.similarity >= 0.85)
const similar    = results.filter(r => r.similarity != null && r.similarity >= 0.5 && r.similarity < 0.85)
const mismatch   = results.filter(r => r.similarity != null && r.similarity >= 0.2 && r.similarity < 0.5)
const veryOff    = results.filter(r => r.similarity != null && r.similarity < 0.2)

console.log(`\n${'═'.repeat(70)}`)
console.log(`SUMMARY — ${courses.length} French DB courses vs ${osm.length} OSM golf courses`)
console.log('═'.repeat(70))
console.log(`  No OSM golf course within ${RADIUS_M} m:  ${noOsm.length.toString().padStart(4)}  (${((noOsm.length/courses.length)*100).toFixed(1)}%)`)
console.log(`  Matched, names very similar (≥0.85):     ${exact.length.toString().padStart(4)}  (${((exact.length/courses.length)*100).toFixed(1)}%)`)
console.log(`  Matched, names mostly overlap (0.5–0.85): ${similar.length.toString().padStart(4)}  (${((similar.length/courses.length)*100).toFixed(1)}%)`)
console.log(`  Matched, names partially differ (0.2–0.5): ${mismatch.length.toString().padStart(4)}  (${((mismatch.length/courses.length)*100).toFixed(1)}%)`)
console.log(`  Matched, names very different (<0.2):    ${veryOff.length.toString().padStart(4)}  (${((veryOff.length/courses.length)*100).toFixed(1)}%)`)

function show(label, rows, n = 15) {
  if (rows.length === 0) return
  console.log(`\n── ${label} (showing up to ${n}) ──`)
  rows
    .slice()
    .sort((a, b) => (a.similarity ?? -1) - (b.similarity ?? -1))
    .slice(0, n)
    .forEach(r => {
      const db = (r.dbClub ?? r.dbName ?? '').slice(0, 45).padEnd(45)
      const om = (r.osmName ?? '(no name)').slice(0, 45).padEnd(45)
      const sim = r.similarity != null ? r.similarity.toFixed(2) : ' -- '
      const dist = r.distM != null ? `${r.distM}m` : '  —  '
      console.log(`  sim=${sim} dist=${dist.padStart(6)}  DB: ${db}  OSM: ${om}`)
    })
}

show('Potential mismatches (0.2–0.5)', mismatch, 20)
show('Very different names (<0.2)', veryOff, 20)
show('No OSM match within radius', noOsm, 15)

const out = 'scripts/verify-france-names-report.json'
writeFileSync(out, JSON.stringify({
  generatedAt: new Date().toISOString(),
  counts: {
    dbCourses: courses.length,
    osmCourses: osm.length,
    noOsm: noOsm.length,
    exact: exact.length,
    similar: similar.length,
    mismatch: mismatch.length,
    veryOff: veryOff.length,
  },
  results,
}, null, 2))
console.log(`\nFull report saved to ${out}`)
