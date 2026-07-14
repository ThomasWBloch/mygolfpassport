// For the 201 French DB courses with no OSM golf course within 500 m of their
// stored coordinates, search OSM by NAME across all of France and measure the
// distance from our coords to the best name match. If a name match exists far
// away, our coordinates are wrong; if no name matches, the course may be
// genuinely missing from OSM.
//
// Run with: node --env-file=.env.local scripts/test-coordinate-hypothesis-france.mjs

import { readFileSync } from 'fs'

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]
const sleep = ms => new Promise(r => setTimeout(r, ms))

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
        if (!resp.ok) { await sleep(5000); continue }
        const text = await resp.text()
        if (!text.startsWith('{')) { await sleep(5000); continue }
        return JSON.parse(text)
      } catch (e) {
        console.log(`    error: ${e.message}`)
        await sleep(5000)
      }
    }
  }
  throw new Error('All Overpass servers failed')
}

function haversineKm(a, b) {
  const R = 6371
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const la1 = toRad(a.lat), la2 = toRad(b.lat)
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(la1) * Math.cos(la2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

const STOPWORDS = new Set([
  'golf', 'club', 'course', 'country', 'resort', 'international', 'national',
  'de', 'du', 'des', 'la', 'le', 'les', 'd', 'l', 'et', 'the', 'sur', 'saint',
  'st', 'ste',
])

function tokenize(s) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
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
  return inter / (setA.size + setB.size - inter)
}

function bestNameMatch(db, osmList) {
  const dbCandidates = [db.dbClub, db.dbName].filter(Boolean)
  let best = { score: 0, osm: null, dbUsed: null, osmUsed: null }
  for (const o of osmList) {
    const osmCandidates = [o.name, o.nameEn, o.altName].filter(Boolean)
    for (const d of dbCandidates) {
      for (const os of osmCandidates) {
        const s = jaccard(d, os)
        if (s > best.score) best = { score: s, osm: o, dbUsed: d, osmUsed: os }
      }
    }
  }
  return best
}

// ── Load prior report ──────────────────────────────────────────────────────
const prior = JSON.parse(readFileSync('scripts/verify-france-names-report.json', 'utf8'))
const unmatched = prior.results.filter(r => r.osmId == null)
console.log(`Unmatched DB courses (no OSM within 500 m): ${unmatched.length}`)

// Need stored coords — re-fetch from DB (prior report doesn't include them)
console.log('\nFetching DB coordinates for unmatched courses...')
const { createClient } = await import('@supabase/supabase-js')
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const ids = unmatched.map(r => r.id)
const coordsById = new Map()
for (let i = 0; i < ids.length; i += 500) {
  const batch = ids.slice(i, i + 500)
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, address')
    .in('id', batch)
  if (error) { console.error(error); process.exit(1) }
  for (const c of data ?? []) coordsById.set(c.id, c)
}
console.log(`  got ${coordsById.size}/${ids.length} coordinates`)

// ── Re-fetch all French OSM golf courses ──────────────────────────────────
console.log('\nFetching all OSM golf courses in France...')
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
  .filter(c => c.lat != null && c.lon != null && (c.name || c.nameEn || c.altName))
console.log(`  ${osm.length} OSM golf courses with a name tag`)

// ── Name-based search for each unmatched DB course ────────────────────────
const MIN_SIM = 0.5
console.log(`\nName-searching ${unmatched.length} unmatched courses (min Jaccard ${MIN_SIM})...`)

const rows = []
for (const r of unmatched) {
  const db = coordsById.get(r.id)
  if (!db) continue
  const m = bestNameMatch({ dbClub: db.club, dbName: db.name }, osm)
  const distKm = m.osm ? haversineKm({ lat: db.latitude, lon: db.longitude }, m.osm) : null
  rows.push({
    id: r.id,
    dbClub: db.club,
    dbName: db.name,
    dbLat: db.latitude,
    dbLon: db.longitude,
    simScore: m.score,
    bestOsmId: m.osm?.id ?? null,
    bestOsmName: m.osm?.name ?? null,
    dbUsed: m.dbUsed,
    osmUsed: m.osmUsed,
    distKm,
  })
}

// ── Categorize ────────────────────────────────────────────────────────────
const matched    = rows.filter(r => r.simScore >= MIN_SIM)
const noMatch    = rows.filter(r => r.simScore < MIN_SIM)

const buckets = {
  close:    matched.filter(r => r.distKm <= 0.5),                       // within prior radius (shouldn't happen)
  nearby:   matched.filter(r => r.distKm > 0.5 && r.distKm <= 2),       // 0.5–2 km off
  offByKm:  matched.filter(r => r.distKm > 2 && r.distKm <= 10),        // 2–10 km off
  wayOff:   matched.filter(r => r.distKm > 10 && r.distKm <= 100),      // 10–100 km (probably wrong)
  farOff:   matched.filter(r => r.distKm > 100),                        // >100 km (definitely wrong, maybe duplicate name)
}

console.log(`\n${'═'.repeat(70)}`)
console.log(`COORDINATE HYPOTHESIS TEST — ${rows.length} DB courses with no OSM match in 500 m`)
console.log('═'.repeat(70))
console.log(`  Name match found (sim ≥ ${MIN_SIM}):           ${matched.length.toString().padStart(4)}  (${((matched.length / rows.length) * 100).toFixed(1)}%)`)
console.log(`    ├─ inside 500 m (should not occur):        ${buckets.close.length.toString().padStart(4)}`)
console.log(`    ├─ 0.5–2 km from DB coords:                ${buckets.nearby.length.toString().padStart(4)}  ← likely geocode imprecision`)
console.log(`    ├─ 2–10 km from DB coords:                 ${buckets.offByKm.length.toString().padStart(4)}  ← coord error, same region`)
console.log(`    ├─ 10–100 km from DB coords:               ${buckets.wayOff.length.toString().padStart(4)}  ← coord error, different area`)
console.log(`    └─ >100 km from DB coords:                 ${buckets.farOff.length.toString().padStart(4)}  ← likely different course with same name`)
console.log(`  No name match in OSM (sim < ${MIN_SIM}):           ${noMatch.length.toString().padStart(4)}  (${((noMatch.length / rows.length) * 100).toFixed(1)}%)  ← genuinely missing from OSM`)

function show(label, arr, n = 15, sortKey = 'distKm') {
  if (!arr.length) return
  console.log(`\n── ${label} (showing up to ${n}) ──`)
  const sorted = arr.slice().sort((a, b) => (a[sortKey] ?? Infinity) - (b[sortKey] ?? Infinity))
  for (const r of sorted.slice(0, n)) {
    const db = (r.dbClub ?? r.dbName ?? '').slice(0, 40).padEnd(40)
    const om = (r.bestOsmName ?? '').slice(0, 40).padEnd(40)
    const dist = r.distKm != null ? `${r.distKm.toFixed(1)} km` : '  —  '
    console.log(`  sim=${r.simScore.toFixed(2)} dist=${dist.padStart(9)}  DB: ${db}  OSM: ${om}`)
  }
}

show('Nearby name matches (0.5–2 km) — likely geocode imprecision', buckets.nearby, 15)
show('2–10 km away — coordinate errors', buckets.offByKm, 15)
show('10–100 km away — large coordinate errors', buckets.wayOff, 15)
show('>100 km away — probably unrelated course w/ similar name', buckets.farOff, 10, 'distKm')
show('No name match — likely missing from OSM entirely', noMatch, 20, 'simScore')

import { writeFileSync } from 'fs'
writeFileSync('scripts/coordinate-hypothesis-france-report.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  minSimilarity: MIN_SIM,
  counts: {
    tested: rows.length,
    nameMatched: matched.length,
    noMatch: noMatch.length,
    buckets: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, v.length])),
  },
  rows,
}, null, 2))
console.log(`\nFull report saved to scripts/coordinate-hypothesis-france-report.json`)
