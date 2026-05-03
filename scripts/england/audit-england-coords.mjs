// Coords audit for England: compare DB coords vs OSM (and EG if available).
// Same logic as Ireland's audit. Falls back to OSM-only if EG fetch failed.
//
// Output:
//   scripts/england/england-coords-audit.json
//   scripts/england/england-coords-audit.md
//
// Run: node scripts/england/audit-england-coords.mjs

import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/england/courses-backup-england-${today}.json`
const OSM_PATH = 'scripts/england/england-clubs-osm.json'
const EG_PATH = 'scripts/england/england-eg-clubs.json'
const JSON_OUT = 'scripts/england/england-coords-audit.json'
const MD_OUT = 'scripts/england/england-coords-audit.md'

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
    if (!best || sim > best.sim) best = { record: c, sim, lat: getLat(c), lon: getLon(c) }
  }
  return best
}

const db = JSON.parse(readFileSync(BACKUP_PATH, 'utf8'))
const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const hasEG = existsSync(EG_PATH)
const sg = hasEG ? JSON.parse(readFileSync(EG_PATH, 'utf8')) : []

console.log(`DB: ${db.length}, OSM: ${osm.length}, EG: ${hasEG ? sg.length : 'NOT AVAILABLE — single-source audit'}`)

const dbByClub = new Map()
for (const c of db) {
  const key = c.club
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}

const flagged = []
const okClubs = []
const noSourceMatch = []

for (const [club, courses] of dbByClub) {
  const rep = courses[0]
  const dbLat = rep.latitude, dbLon = rep.longitude

  const osmHit = bestNameMatch(rep.club, osm, (c) => c.lat, (c) => c.lon)
  const sgHit = hasEG ? bestNameMatch(rep.club, sg, (c) => c.latitude, (c) => c.longitude) : null

  if (!osmHit && !sgHit) {
    noSourceMatch.push({ club, dbCoords: [dbLat, dbLon], courseCount: courses.length })
    continue
  }

  const osmDist = osmHit ? haversine(dbLat, dbLon, osmHit.lat, osmHit.lon) : null
  const sgDist = sgHit ? haversine(dbLat, dbLon, sgHit.lat, sgHit.lon) : null
  const osmSgDist = osmHit && sgHit ? haversine(osmHit.lat, osmHit.lon, sgHit.lat, sgHit.lon) : null

  let level = 'ok'
  let reason = null
  if (osmDist != null && sgDist != null) {
    if (osmSgDist < 200 && (osmDist > 500 || sgDist > 500)) {
      level = 'high'
      reason = `OSM+EG consensus (${Math.round(osmSgDist)}m apart), DB diverges (osm=${Math.round(osmDist)}m, sg=${Math.round(sgDist)}m)`
    } else if (osmDist > 500 && sgDist > 500) {
      level = osmSgDist > 500 ? 'low' : 'medium'
      reason = osmSgDist > 500
        ? `Both off, sources disagree (${Math.round(osmSgDist)}m apart)`
        : `Both >500m off, OSM↔EG=${Math.round(osmSgDist)}m`
    } else if (osmDist > 1000 || sgDist > 1000) {
      level = 'medium'
      reason = `Single source >1km off (osm=${Math.round(osmDist)}m, sg=${Math.round(sgDist)}m)`
    }
  } else if (osmDist != null && osmDist > 1000) {
    level = 'medium-osm-only'
    reason = `OSM-only and >1km off (${Math.round(osmDist)}m). Needs second-source verification.`
  } else if (sgDist != null && sgDist > 1000) {
    level = 'medium-sg-only'
    reason = `EG-only and >1km off (${Math.round(sgDist)}m). Needs second-source verification.`
  }

  const entry = {
    club,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: { lat: dbLat, lon: dbLon, address: rep.address },
    osm: osmHit ? { name: osmHit.record.name, lat: osmHit.lat, lon: osmHit.lon, sim: +osmHit.sim.toFixed(3), distFromDb: osmDist != null ? Math.round(osmDist) : null } : null,
    sg: sgHit ? { name: sgHit.record.name, lat: sgHit.lat, lon: sgHit.lon, sim: +sgHit.sim.toFixed(3), distFromDb: sgDist != null ? Math.round(sgDist) : null } : null,
    osmSgDist: osmSgDist != null ? Math.round(osmSgDist) : null,
    flagLevel: level,
    flagReason: reason,
  }

  if (level === 'ok') okClubs.push(entry)
  else flagged.push(entry)
}

const order = { high: 0, medium: 1, 'medium-osm-only': 2, 'medium-sg-only': 2, low: 3 }
flagged.sort((a, b) => {
  const dl = (order[a.flagLevel] ?? 9) - (order[b.flagLevel] ?? 9)
  if (dl) return dl
  const aMax = Math.max(a.osm?.distFromDb || 0, a.sg?.distFromDb || 0)
  const bMax = Math.max(b.osm?.distFromDb || 0, b.sg?.distFromDb || 0)
  return bMax - aMax
})

writeFileSync(JSON_OUT, JSON.stringify({ flagged, okCount: okClubs.length, noSourceMatch, hasEG }, null, 2))

const md = []
md.push('# England coordinate audit')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push(hasEG ? '' : '(EG fetch unavailable — single-source audit. Auto-fix not safe.)')
md.push('')
md.push('## Summary')
md.push('')
md.push(`| Status | Clubs |`)
md.push(`|---|---:|`)
md.push(`| OK (DB matches source consensus) | ${okClubs.length} |`)
md.push(`| Flagged | ${flagged.length} |`)
const counts = flagged.reduce((a, e) => { a[e.flagLevel] = (a[e.flagLevel] || 0) + 1; return a }, {})
for (const [k, v] of Object.entries(counts)) md.push(`|   level=${k} | ${v} |`)
md.push(`| No source match | ${noSourceMatch.length} |`)
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### [${e.flagLevel}] ${e.club} (${e.courseCount} courses)`)
  lines.push(`- DB:  lat=${e.db.lat}, lon=${e.db.lon} — ${e.db.address}`)
  if (e.osm) lines.push(`- OSM: lat=${e.osm.lat}, lon=${e.osm.lon} (sim=${e.osm.sim}, ${e.osm.distFromDb}m from DB)`)
  if (e.sg)  lines.push(`- EG:  lat=${e.sg.lat}, lon=${e.sg.lon} (sim=${e.sg.sim}, ${e.sg.distFromDb}m from DB)`)
  if (e.osmSgDist != null) lines.push(`- OSM↔EG distance: ${e.osmSgDist}m`)
  lines.push(`- **Reason:** ${e.flagReason}`)
  if (e.flagLevel === 'high' && e.osm && e.sg) {
    const lat = (e.osm.lat + e.sg.lat) / 2
    const lon = (e.osm.lon + e.sg.lon) / 2
    lines.push(`- Suggested fix: lat=${lat.toFixed(7)}, lon=${lon.toFixed(7)} (OSM+EG midpoint)`)
  }
  lines.push('')
  return lines.join('\n')
}

for (const level of ['high', 'medium', 'medium-osm-only', 'medium-sg-only', 'low']) {
  const arr = flagged.filter((f) => f.flagLevel === level)
  if (!arr.length) continue
  md.push(`## ${level} flags (${arr.length})`)
  md.push('')
  arr.forEach((e) => md.push(renderEntry(e)))
}

writeFileSync(MD_OUT, md.join('\n'))

console.log('--- Coords audit summary ---')
console.log(`OK:                       ${okClubs.length}`)
console.log(`Flagged:                  ${flagged.length}`)
for (const [k, v] of Object.entries(counts)) console.log(`  ${k}: ${v}`)
console.log(`No source match:          ${noSourceMatch.length}`)
console.log(`Wrote: ${JSON_OUT}`)
console.log(`Wrote: ${MD_OUT}`)
