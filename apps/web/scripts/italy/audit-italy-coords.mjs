// Audit Italy DB coords vs OSM/LC triangulation.
//
// Source: 149 klubber i italy-match-candidates.json reviewCoordAudit-bucket.
// Disse er klubber hvor:
//   - DB mangler website ELLER phone (forventet enrichment scope)
//   - Match fundet i OSM eller LC (overall != 'no-match')
//   - MEN proposeUpdate gav null fordi conf='low' (ofte pga. coord-mismatch)
//
// Marco Simone-mønstret: navn matcher 1:1 i begge sources, men DB-coord er
// >1km fra konsensus mellem OSM og LC. Indikerer DB-coord-fejl, ikke ægte
// no-match.
//
// Tier-kriterier:
//   high:   sim≥0.9 i BÅDE OSM+LC, OSM-LC dist ≤500m, DB ≥1km fra consensus
//           → auto-fix kandidat
//   medium: sim≥0.9 i mindst én, OSM-LC dist ≤1000m, DB ≥1km fra consensus
//           → manuel review per klub
//   low:    sim≥0.7 i mindst én → flag til inspektion
//   none:   ingen klar coord-fejl → skip
//
// Consensus-strategi (kun 2 punkter, mean = median):
//   - Hvis BÅDE OSM og LC: mean(lat, lon)
//   - Hvis kun LC: lc.lat, lc.lon (LC er kuraterede booking-data)
//   - Hvis kun OSM: osm.lat, osm.lon
//
// Output:
//   scripts/italy/italy-coords-audit.json  — per-klub data + SQL UPDATE
//   scripts/italy/italy-coords-audit.md    — Holland-format review report
//
// Ingen Supabase-writes. Ingen Supabase-reads (candidates.courseIds er allerede
// populated af matcheren).
//
// Run: node scripts/italy/audit-italy-coords.mjs

import { readFileSync, writeFileSync } from 'node:fs'

const CANDIDATES_PATH = 'scripts/italy/italy-match-candidates.json'
const OUT_JSON = 'scripts/italy/italy-coords-audit.json'
const OUT_MD   = 'scripts/italy/italy-coords-audit.md'

// Haversine kopieret fra match-italy.mjs (genbrug uden import-afhængighed).
const haversine = (la1, lo1, la2, lo2) => {
  if ([la1, lo1, la2, lo2].some((v) => v == null || Number.isNaN(v))) return Infinity
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(la2 - la1)
  const dLon = toRad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function consensusOf(osm, lc) {
  if (osm && lc && osm.lat != null && lc.lat != null) {
    return {
      lat: (osm.lat + lc.lat) / 2,
      lon: (osm.lon + lc.lon) / 2,
      source: 'mean(osm,lc)',
    }
  }
  if (lc && lc.lat != null) return { lat: lc.lat, lon: lc.lon, source: 'lc' }
  if (osm && osm.lat != null) return { lat: osm.lat, lon: osm.lon, source: 'osm' }
  return null
}

function classifyTier(osmSim, lcSim, distOsmLc, distFromDb) {
  // high: sim≥0.9 i BÅDE OSM+LC, OSM-LC ≤500m, DB ≥1km fra consensus
  if (osmSim >= 0.9 && lcSim >= 0.9 && distOsmLc <= 500 && distFromDb >= 1000) {
    return 'high'
  }
  // medium: sim≥0.9 i mindst én, OSM-LC ≤1000m, DB ≥1km fra consensus
  if ((osmSim >= 0.9 || lcSim >= 0.9) && distOsmLc <= 1000 && distFromDb >= 1000) {
    return 'medium'
  }
  // low: sim≥0.7 i mindst én
  if (osmSim >= 0.7 || lcSim >= 0.7) {
    return 'low'
  }
  return 'none'
}

function buildSqlUpdate(courseIds, lat, lon) {
  const idList = courseIds.map((id) => `'${id}'`).join(',\n  ')
  return `UPDATE courses SET\n  latitude = ${lat.toFixed(7)},\n  longitude = ${lon.toFixed(7)}\nWHERE id IN (\n  ${idList}\n);`
}

// ---------- main ----------

const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
const reviewAudit = candidates.reviewCoordAudit || []

const audit = []
let skippedNullCoord = 0
let skippedNoConsensus = 0

for (const entry of reviewAudit) {
  // Skip klubber med NULL DB-coords (Alpiaz, Rotoballe — håndteres separat).
  if (entry.db.lat == null || entry.db.lon == null) {
    skippedNullCoord++
    continue
  }

  const cons = consensusOf(entry.osm, entry.lc)
  if (!cons) {
    // Burde ikke ske — reviewCoordAudit kræver mindst én match.
    skippedNoConsensus++
    continue
  }

  const distFromDb = haversine(entry.db.lat, entry.db.lon, cons.lat, cons.lon)
  const osmLcAgreement =
    entry.osm && entry.lc && entry.osm.lat != null && entry.lc.lat != null
      ? haversine(entry.osm.lat, entry.osm.lon, entry.lc.lat, entry.lc.lon)
      : null

  const osmSim = entry.osm?.sim ?? 0
  const lcSim = entry.lc?.sim ?? 0
  // For tier-classify: hvis kun én source, "OSM-LC dist" er Infinity →
  // single-source klubber kan max blive 'low'.
  const distForTier = osmLcAgreement ?? Infinity

  const tier = classifyTier(osmSim, lcSim, distForTier, distFromDb)

  audit.push({
    club: entry.club,
    courseCount: entry.courseCount,
    courseIds: entry.courseIds,
    db: { ids: entry.courseIds, lat: entry.db.lat, lon: entry.db.lon },
    osm: entry.osm
      ? { lat: entry.osm.lat, lon: entry.osm.lon, sim: entry.osm.sim, name: entry.osm.name }
      : null,
    lc: entry.lc
      ? { lat: entry.lc.lat, lon: entry.lc.lon, sim: entry.lc.sim, name: entry.lc.name }
      : null,
    consensus: { lat: cons.lat, lon: cons.lon, source: cons.source },
    distFromDb_m: Math.round(distFromDb),
    osmLcAgreement_m: osmLcAgreement != null ? Math.round(osmLcAgreement) : null,
    tier,
    sqlUpdate: buildSqlUpdate(entry.courseIds, cons.lat, cons.lon),
  })
}

// Group by tier
const byTier = { high: [], medium: [], low: [], none: [] }
for (const a of audit) byTier[a.tier].push(a)

// Sort within each tier by distFromDb_m descending (most-wrong first).
for (const tier of Object.keys(byTier)) {
  byTier[tier].sort((a, b) => b.distFromDb_m - a.distFromDb_m)
}

// Write JSON
const summary = {
  generated: new Date().toISOString(),
  source: 'italy-match-candidates.json/reviewCoordAudit',
  total_input: reviewAudit.length,
  skipped_null_coord: skippedNullCoord,
  skipped_no_consensus: skippedNoConsensus,
  total_audited: audit.length,
  tier_counts: {
    high: byTier.high.length,
    medium: byTier.medium.length,
    low: byTier.low.length,
    none: byTier.none.length,
  },
}

writeFileSync(
  OUT_JSON,
  JSON.stringify({ ...summary, audit }, null, 2),
)

// Write MD report
const md = []
md.push('# Italy coord-audit report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push(`Source: ${reviewAudit.length} klubber i \`italy-match-candidates.json\` reviewCoordAudit-bucket.`)
md.push('Marco Simone-mønstret: navn matcher 1:1 i OSM+LC men DB-coords er off med >1km.')
md.push('')
if (skippedNullCoord > 0) {
  md.push(`Skipped ${skippedNullCoord} klub(ber) med NULL DB-coords (Alpiaz, Rotoballe — håndteres separat).`)
}
if (skippedNoConsensus > 0) {
  md.push(`Skipped ${skippedNoConsensus} klub(ber) uden source-consensus (data-fejl).`)
}
md.push('')
md.push('## Tier-kriterier')
md.push('')
md.push('| Tier | Kriterier | Action |')
md.push('|---|---|---|')
md.push('| **high** | sim≥0.9 i BÅDE OSM+LC, OSM↔LC ≤500m, DB→consensus ≥1km | Auto-fix kandidat |')
md.push('| **medium** | sim≥0.9 i mindst én, OSM↔LC ≤1000m, DB→consensus ≥1km | Manuel review |')
md.push('| **low** | sim≥0.7 i mindst én | Manuel inspektion |')
md.push('| **none** | Ingen klar coord-fejl | Skip — vent på bedre data |')
md.push('')
md.push('Consensus = mean(OSM, LC) hvis begge findes; ellers den ene source.')
md.push('')
md.push('## Summary')
md.push('')
md.push('| Tier | Klubber | Courses |')
md.push('|---|---:|---:|')
for (const tier of ['high', 'medium', 'low', 'none']) {
  const arr = byTier[tier]
  const courses = arr.reduce((s, a) => s + a.courseCount, 0)
  md.push(`| ${tier} | ${arr.length} | ${courses} |`)
}
md.push('')

const renderEntry = (a) => {
  const lines = []
  lines.push(`### ${a.club} (${a.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB:        lat=${a.db.lat}, lon=${a.db.lon}`)
  lines.push(`- OSM:       ${a.osm ? `lat=${a.osm.lat}, lon=${a.osm.lon}, sim=${a.osm.sim}, name=${JSON.stringify(a.osm.name)}` : 'no match'}`)
  lines.push(`- LC:        ${a.lc ? `lat=${a.lc.lat}, lon=${a.lc.lon}, sim=${a.lc.sim}, name=${JSON.stringify(a.lc.name)}` : 'no match'}`)
  lines.push(`- Consensus: lat=${a.consensus.lat.toFixed(7)}, lon=${a.consensus.lon.toFixed(7)} (${a.consensus.source})`)
  lines.push(`- DB → consensus:   ${a.distFromDb_m}m`)
  if (a.osmLcAgreement_m != null) lines.push(`- OSM ↔ LC agreement: ${a.osmLcAgreement_m}m`)
  lines.push('')
  lines.push('```sql')
  lines.push(a.sqlUpdate)
  lines.push('```')
  lines.push('')
  return lines.join('\n')
}

md.push('## High confidence (recommended to apply)')
md.push('')
if (byTier.high.length === 0) md.push('_(none)_\n')
byTier.high.forEach((a) => md.push(renderEntry(a)))

md.push('## Medium confidence (review before applying)')
md.push('')
if (byTier.medium.length === 0) md.push('_(none)_\n')
byTier.medium.forEach((a) => md.push(renderEntry(a)))

md.push('## Low confidence (manual decision)')
md.push('')
if (byTier.low.length === 0) md.push('_(none)_\n')
byTier.low.forEach((a) => md.push(renderEntry(a)))

md.push('## None (no clear coord error)')
md.push('')
md.push('Disse klubber har ingen tydelig coord-fejl baseret på OSM+LC triangulering.')
md.push('Listet kun som klub-navn + dist for hurtig oversigt.')
md.push('')
if (byTier.none.length === 0) {
  md.push('_(none)_')
} else {
  byTier.none.forEach((a) => {
    md.push(`- ${a.club} (${a.courseCount} courses, db→consensus ${a.distFromDb_m}m)`)
  })
}
md.push('')

writeFileSync(OUT_MD, md.join('\n'))

console.log('--- Coord audit summary ---')
console.log(`Input (reviewCoordAudit):   ${reviewAudit.length}`)
console.log(`Skipped NULL-coord:         ${skippedNullCoord}`)
console.log(`Skipped no-consensus:       ${skippedNoConsensus}`)
console.log(`Audited:                    ${audit.length}`)
console.log(`  high (auto-fix):          ${byTier.high.length}`)
console.log(`  medium (review):          ${byTier.medium.length}`)
console.log(`  low (manual):             ${byTier.low.length}`)
console.log(`  none (skip):              ${byTier.none.length}`)
console.log(`Wrote: ${OUT_JSON}`)
console.log(`Wrote: ${OUT_MD}`)
