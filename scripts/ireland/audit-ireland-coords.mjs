// Coords audit for Ireland + NI: compare DB coords to OSM/GI coords for
// name-matched clubs (sim>=0.9). Flag where DB and source(s) diverge >500m.
//
// Runs read-only. Outputs:
//   - scripts/ireland/ireland-coords-audit.json
//   - scripts/ireland/ireland-coords-audit.md
//
// Run: node scripts/ireland/audit-ireland-coords.mjs

import { readFileSync, writeFileSync } from 'node:fs'

const BACKUP_PATH = 'scripts/ireland/courses-backup-ireland-2026-05-01.json'
const OSM_PATH = 'scripts/ireland/ireland-clubs-osm.json'
const GI_PATH = 'scripts/ireland/ireland-gi-clubs.json'
const JSON_OUT = 'scripts/ireland/ireland-coords-audit.json'
const MD_OUT = 'scripts/ireland/ireland-coords-audit.md'

const haversine = (la1, lo1, la2, lo2) => {
  if ([la1, lo1, la2, lo2].some((v) => v == null || Number.isNaN(v))) return null
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(la2 - la1)
  const dLon = toRad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\b(golf|club|the|gc|& country|country|links|course|society|resort|hotel)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

function similarity(a, b) {
  a = norm(a); b = norm(b)
  if (!a || !b) return 0
  if (a === b) return 1
  const lev = (s, t) => {
    const m = s.length, n = t.length
    const dp = Array(n + 1).fill(0).map((_, i) => i)
    for (let i = 1; i <= m; i++) {
      let prev = dp[0]
      dp[0] = i
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j]
        dp[j] = s[i - 1] === t[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1])
        prev = tmp
      }
    }
    return dp[n]
  }
  return 1 - lev(a, b) / Math.max(a.length, b.length)
}

function bestNameMatch(dbClub, candidates, getLat, getLon) {
  let best = null
  for (const c of candidates) {
    const sim = similarity(dbClub, c.name)
    if (sim < 0.9) continue
    const dist = haversine(0, 0, 0, 0) // unused — we just need name-best, then compute dist later
    if (!best || sim > best.sim) best = { record: c, sim, lat: getLat(c), lon: getLon(c) }
  }
  return best
}

const db = JSON.parse(readFileSync(BACKUP_PATH, 'utf8'))
const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const gi = JSON.parse(readFileSync(GI_PATH, 'utf8'))

// Group DB rows by club
const dbByClub = new Map()
for (const c of db) {
  const key = `${c.country}::${c.club}`
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}

const flagged = []
const okClubs = []
const noSourceMatch = []

for (const [key, courses] of dbByClub) {
  const rep = courses[0]
  const dbLat = rep.latitude, dbLon = rep.longitude

  const osmHit = bestNameMatch(rep.club, osm, (c) => c.lat, (c) => c.lon)
  const giHit = bestNameMatch(rep.club, gi, (c) => c.latitude, (c) => c.longitude)

  if (!osmHit && !giHit) {
    noSourceMatch.push({ club: rep.club, country: rep.country, dbCoords: [dbLat, dbLon], courseCount: courses.length })
    continue
  }

  const osmDist = osmHit ? haversine(dbLat, dbLon, osmHit.lat, osmHit.lon) : null
  const giDist = giHit ? haversine(dbLat, dbLon, giHit.lat, giHit.lon) : null

  // OSM-vs-GI sanity: if both sources agree closely (<200m apart), they form a consensus
  let osmGiDist = null
  if (osmHit && giHit) {
    osmGiDist = haversine(osmHit.lat, osmHit.lon, giHit.lat, giHit.lon)
  }

  // Flag classification
  let level = 'ok'
  let reason = null
  if (osmDist !== null && giDist !== null) {
    if (osmGiDist < 200 && (osmDist > 500 || giDist > 500)) {
      level = 'high'
      reason = `OSM+GI consensus (apart ${Math.round(osmGiDist)}m), but DB diverges (osm=${Math.round(osmDist)}m, gi=${Math.round(giDist)}m)`
    } else if (osmDist > 500 && giDist > 500) {
      if (osmGiDist > 500) {
        level = 'low'
        reason = `Both sources off but they disagree (${Math.round(osmGiDist)}m apart) — source quality issue`
      } else {
        level = 'medium'
        reason = `Both sources >500m off (osm=${Math.round(osmDist)}m, gi=${Math.round(giDist)}m), partial consensus`
      }
    } else if (osmDist > 1000 || giDist > 1000) {
      level = 'medium'
      reason = `Single source >1km off (osm=${Math.round(osmDist)}m, gi=${Math.round(giDist)}m)`
    }
  } else if (osmDist !== null && osmDist > 1000) {
    level = 'medium'
    reason = `OSM-only and >1km off (${Math.round(osmDist)}m)`
  } else if (giDist !== null && giDist > 1000) {
    level = 'medium'
    reason = `GI-only and >1km off (${Math.round(giDist)}m)`
  }

  const entry = {
    club: rep.club,
    country: rep.country,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: { lat: dbLat, lon: dbLon, address: rep.address },
    osm: osmHit ? { name: osmHit.record.name, lat: osmHit.lat, lon: osmHit.lon, sim: +osmHit.sim.toFixed(3), distFromDb: Math.round(osmDist) } : null,
    gi: giHit ? { name: giHit.record.name, lat: giHit.lat, lon: giHit.lon, sim: +giHit.sim.toFixed(3), distFromDb: Math.round(giDist) } : null,
    osmGiDist: osmGiDist !== null ? Math.round(osmGiDist) : null,
    flagLevel: level,
    flagReason: reason,
  }

  if (level === 'ok') okClubs.push(entry)
  else flagged.push(entry)
}

// Sort flagged by severity then dist
const order = { high: 0, medium: 1, low: 2 }
flagged.sort((a, b) => {
  const dl = order[a.flagLevel] - order[b.flagLevel]
  if (dl) return dl
  const aMax = Math.max(a.osm?.distFromDb || 0, a.gi?.distFromDb || 0)
  const bMax = Math.max(b.osm?.distFromDb || 0, b.gi?.distFromDb || 0)
  return bMax - aMax
})

writeFileSync(JSON_OUT, JSON.stringify({ flagged, okClubs: okClubs.length, noSourceMatch }, null, 2))

// Markdown report
const md = []
md.push('# Ireland coordinate audit')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('## Summary')
md.push('')
md.push(`| Status | Clubs |`)
md.push(`|---|---:|`)
md.push(`| OK (DB coords match source consensus) | ${okClubs.length} |`)
md.push(`| Flagged — DB diverges from sources | ${flagged.length} |`)
md.push(`|   level=high (OSM+GI agree, DB wrong) | ${flagged.filter(f=>f.flagLevel==='high').length} |`)
md.push(`|   level=medium (one source >1km off) | ${flagged.filter(f=>f.flagLevel==='medium').length} |`)
md.push(`|   level=low (sources disagree) | ${flagged.filter(f=>f.flagLevel==='low').length} |`)
md.push(`| No source match (cant audit) | ${noSourceMatch.length} |`)
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### [${e.flagLevel}] ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB:  lat=${e.db.lat}, lon=${e.db.lon} — ${e.db.address}`)
  if (e.osm) lines.push(`- OSM: lat=${e.osm.lat}, lon=${e.osm.lon} (sim=${e.osm.sim}, ${e.osm.distFromDb}m from DB)`)
  if (e.gi)  lines.push(`- GI:  lat=${e.gi.lat}, lon=${e.gi.lon} (sim=${e.gi.sim}, ${e.gi.distFromDb}m from DB)`)
  if (e.osmGiDist !== null) lines.push(`- OSM↔GI distance: ${e.osmGiDist}m`)
  lines.push(`- **Reason:** ${e.flagReason}`)
  if (e.flagLevel === 'high' && e.osm && e.gi) {
    // Suggest fix: average of OSM+GI
    const lat = (e.osm.lat + e.gi.lat) / 2
    const lon = (e.osm.lon + e.gi.lon) / 2
    lines.push(`- Suggested fix: lat=${lat.toFixed(7)}, lon=${lon.toFixed(7)} (OSM+GI midpoint)`)
  }
  lines.push('')
  return lines.join('\n')
}

for (const level of ['high', 'medium', 'low']) {
  const arr = flagged.filter((f) => f.flagLevel === level)
  if (!arr.length) continue
  md.push(`## ${level.toUpperCase()} confidence flags`)
  md.push('')
  arr.forEach((e) => md.push(renderEntry(e)))
}

writeFileSync(MD_OUT, md.join('\n'))

console.log('--- Coords audit summary ---')
console.log(`OK:                       ${okClubs.length}`)
console.log(`Flagged:                  ${flagged.length}`)
console.log(`  high (DB likely wrong): ${flagged.filter(f=>f.flagLevel==='high').length}`)
console.log(`  medium:                 ${flagged.filter(f=>f.flagLevel==='medium').length}`)
console.log(`  low (sources disagree): ${flagged.filter(f=>f.flagLevel==='low').length}`)
console.log(`No source match:          ${noSourceMatch.length}`)
console.log(`Wrote: ${JSON_OUT}`)
console.log(`Wrote: ${MD_OUT}`)
