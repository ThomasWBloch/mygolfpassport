// Validate Danish golf course / club names against OpenStreetMap.
// One Overpass call fetches every leisure=golf_course in Denmark, then we
// find the nearest OSM facility within 1 km of each of our course rows and
// compare names (Jaccard on tokenized, accent-stripped, stopword-filtered
// words). Output: danish-club-validation.xlsx at project root.
//
// Run with: node --env-file=.env.local scripts/validate-danish-clubs-vs-osm.mjs

import { writeFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]
const RADIUS_M = 1000
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
          signal: AbortSignal.timeout(180000),
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

// ── Name normalization / similarity ───────────────────────────────────────
const STOPWORDS = new Set([
  'golf', 'club', 'klub', 'course', 'bane', 'country', 'resort',
  'de', 'den', 'det', 'og', 'i', 'på', 'af', 'the', 'a', 'an',
])

function tokenize(s) {
  return (s ?? '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents; å/æ/ø become a/ae/o-ish
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

function matchQuality(sim) {
  if (sim == null) return 'No Match'
  if (sim >= 0.9) return 'Exact'
  if (sim >= 0.6) return 'Very Similar'
  if (sim >= 0.3) return 'Partial'
  return 'No Match'
}

// ── Main ───────────────────────────────────────────────────────────────────
console.log('Fetching Danish courses...')
const courses = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, latitude, longitude, holes, is_combo')
    .eq('country', 'Denmark')
    .eq('is_combo', false)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data?.length) break
  courses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}
console.log(`  ${courses.length} non-combo Danish courses with coordinates`)

console.log(`\nFetching OSM golf courses in Denmark (single Overpass query)...`)
const query = `[out:json][timeout:180];
area["ISO3166-1"="DK"][admin_level=2]->.dk;
(
  way[leisure=golf_course](area.dk);
  relation[leisure=golf_course](area.dk);
  node[leisure=golf_course](area.dk);
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
console.log(`  ${osm.length} OSM golf courses in Denmark (${osm.filter(o => o.name).length} named)`)

// ── Match each DB course to nearest OSM course within RADIUS_M ────────────
console.log(`\nMatching (radius: ${RADIUS_M} m)...`)
const rows = []
for (const c of courses) {
  const me = { lat: c.latitude, lon: c.longitude }
  let best = null, bestDist = Infinity
  for (const o of osm) {
    const d = haversineKm(me, o)
    if (d < bestDist) { best = o; bestDist = d }
  }
  const distM = best ? bestDist * 1000 : null
  const withinRadius = distM != null && distM <= RADIUS_M

  let sim = null
  let osmName = null
  if (withinRadius) {
    osmName = best.name ?? best.nameEn ?? best.altName ?? null
    // Compare our club name against each OSM name candidate; pick highest
    const dbCandidate = c.club ?? c.name ?? ''
    const osmCandidates = [best.name, best.nameEn, best.altName].filter(Boolean)
    sim = 0
    for (const oc of osmCandidates) {
      const s = jaccard(dbCandidate, oc)
      if (s > sim) sim = s
    }
    if (osmCandidates.length === 0) sim = null
  }

  rows.push({
    'Our Club Name': c.club ?? '',
    'Our Course Name': c.name ?? '',
    'Our Coordinates': `${c.latitude.toFixed(5)}, ${c.longitude.toFixed(5)}`,
    'OSM Club Name': osmName ?? '—',
    'OSM Coordinates': withinRadius ? `${best.lat.toFixed(5)}, ${best.lon.toFixed(5)}` : '—',
    'Distance (m)': distM != null ? Math.round(distM) : '—',
    'Similarity': sim != null ? Number(sim.toFixed(3)) : '—',
    'Match Quality': matchQuality(sim),
  })
}

// Sort: worst matches first (No Match → Partial → Very Similar → Exact), then by club
const qualityOrder = { 'No Match': 0, 'Partial': 1, 'Very Similar': 2, 'Exact': 3 }
rows.sort((a, b) => {
  const qa = qualityOrder[a['Match Quality']] ?? 99
  const qb = qualityOrder[b['Match Quality']] ?? 99
  if (qa !== qb) return qa - qb
  return String(a['Our Club Name']).localeCompare(String(b['Our Club Name']), 'da')
})

// ── Summary console output ────────────────────────────────────────────────
const summary = { Exact: 0, 'Very Similar': 0, Partial: 0, 'No Match': 0 }
rows.forEach(r => { summary[r['Match Quality']] = (summary[r['Match Quality']] || 0) + 1 })
console.log(`\n${'═'.repeat(70)}`)
console.log('SUMMARY')
console.log('═'.repeat(70))
for (const k of ['Exact', 'Very Similar', 'Partial', 'No Match']) {
  const n = summary[k] ?? 0
  const pct = ((n / rows.length) * 100).toFixed(1)
  console.log(`  ${k.padEnd(14)} ${String(n).padStart(4)}  (${pct}%)`)
}

// ── Write xlsx ────────────────────────────────────────────────────────────
const wb = XLSX.utils.book_new()
const ws = XLSX.utils.json_to_sheet(rows)

// Set column widths
ws['!cols'] = [
  { wch: 34 }, // Our Club Name
  { wch: 30 }, // Our Course Name
  { wch: 22 }, // Our Coordinates
  { wch: 34 }, // OSM Club Name
  { wch: 22 }, // OSM Coordinates
  { wch: 12 }, // Distance
  { wch: 11 }, // Similarity
  { wch: 14 }, // Match Quality
]

XLSX.utils.book_append_sheet(wb, ws, 'Danish Clubs vs OSM')
const out = 'danish-club-validation.xlsx'
XLSX.writeFile(wb, out)
console.log(`\nWrote ${rows.length} rows to ${out}`)
