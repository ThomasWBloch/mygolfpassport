// Match OSM + Golf Ireland scraped data to DB courses (Ireland + NI).
// Produces:
//   - scripts/ireland/ireland-match-report.md  (human-readable diff per club)
//   - scripts/ireland/ireland-match-candidates.json  (machine-readable, grouped by confidence)
//
// Matching strategy:
//   1. Coord match: haversine ≤ 500m between DB course and OSM/GI club
//   2. Name fuzzy fallback: normalised Levenshtein ratio ≥ 0.85 within same country
//   3. Confidence buckets: high (coord ≤ 250m AND name ≥ 0.7), medium (coord ≤ 500m OR name ≥ 0.85), low (anything weaker)
//
// Run: node scripts/ireland/match-ireland.mjs

import { readFileSync, writeFileSync } from 'node:fs'

const BACKUP_PATH = 'scripts/ireland/courses-backup-ireland-2026-05-01.json'
const OSM_PATH = 'scripts/ireland/ireland-clubs-osm.json'
const GI_PATH = 'scripts/ireland/ireland-gi-clubs.json'
const REPORT_PATH = 'scripts/ireland/ireland-match-report.md'
const CANDIDATES_PATH = 'scripts/ireland/ireland-match-candidates.json'

// ---------- helpers ----------
const haversine = (la1, lo1, la2, lo2) => {
  if ([la1, lo1, la2, lo2].some((v) => v == null || Number.isNaN(v))) return Infinity
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

// Levenshtein-based similarity ratio 0..1
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
  const d = lev(a, b)
  return 1 - d / Math.max(a.length, b.length)
}

function bestMatch(dbCourse, candidates) {
  // candidates: [{name, lat/latitude, lon/longitude, ...}]
  let best = null
  for (const c of candidates) {
    const cLat = c.lat ?? c.latitude
    const cLon = c.lon ?? c.longitude
    const dist = haversine(dbCourse.latitude, dbCourse.longitude, cLat, cLon)
    const sim = similarity(dbCourse.club, c.name)
    // Composite score: closer + higher similarity wins
    const distScore = dist === Infinity ? 0 : Math.max(0, 1 - dist / 2000) // 0 at 2km
    const score = distScore * 0.6 + sim * 0.4
    if (!best || score > best.score) {
      best = { record: c, dist, sim, score }
    }
  }
  return best
}

function classify(match) {
  if (!match) return 'no-match'
  const { dist, sim } = match
  if (dist <= 250 && sim >= 0.7) return 'high'
  if (dist <= 500 || sim >= 0.85) return 'medium'
  if (dist <= 1000 || sim >= 0.7) return 'low'
  return 'no-match'
}

// ---------- load ----------
const db = JSON.parse(readFileSync(BACKUP_PATH, 'utf8'))
const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const gi = JSON.parse(readFileSync(GI_PATH, 'utf8'))

console.log(`Loaded: ${db.length} DB courses, ${osm.length} OSM clubs, ${gi.length} GI clubs`)

// Group DB rows by club (we update per-course but match per-club)
const dbByClub = new Map()
for (const c of db) {
  const key = `${c.country}::${c.club}`
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}

// ---------- match ----------
const results = []
for (const [key, courses] of dbByClub) {
  const rep = courses[0] // representative for the club (use first course's coords/name)
  const osmMatch = bestMatch(rep, osm)
  const giMatch = bestMatch(rep, gi)

  const osmConf = classify(osmMatch)
  const giConf = classify(giMatch)

  results.push({
    key,
    country: rep.country,
    club: rep.club,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: {
      lat: rep.latitude,
      lon: rep.longitude,
      address: rep.address,
      website: rep.website,
      phone: rep.phone,
    },
    osm: osmMatch
      ? {
          name: osmMatch.record.name,
          lat: osmMatch.record.lat,
          lon: osmMatch.record.lon,
          website: osmMatch.record.website,
          address: osmMatch.record.address,
          phone: osmMatch.record.phone,
          dist: Math.round(osmMatch.dist),
          sim: +osmMatch.sim.toFixed(3),
          conf: osmConf,
        }
      : null,
    gi: giMatch
      ? {
          name: giMatch.record.name,
          lat: giMatch.record.latitude,
          lon: giMatch.record.longitude,
          website: giMatch.record.website,
          address: giMatch.record.address,
          phone: giMatch.record.phone,
          dist: Math.round(giMatch.dist),
          sim: +giMatch.sim.toFixed(3),
          conf: giConf,
        }
      : null,
  })
}

// ---------- merge proposed updates ----------
// Per-field source acceptance: a field is taken from a source only if THAT
// source's match for this club is reliable. We require both:
//   - source confidence >= medium (proximity-based)
//   - source name similarity >= 0.5 (the source row is plausibly THIS club)
// This prevents the Water Rock / Harbour Point bug where a perfect OSM
// match boosted overall confidence and let unrelated GI data ride along.
const ORDER = ['high', 'medium', 'low', 'no-match']
const confRank = (c) => ORDER.indexOf(c)
const sourceTrusted = (src, minConf = 'medium', minSim = 0.5) => {
  if (!src) return false
  if (confRank(src.conf) > confRank(minConf)) return false
  if ((src.sim ?? 0) < minSim) return false
  return true
}

function proposeUpdate(r) {
  const update = {}
  const sources = {} // field -> source label (for reporting + conf calc)

  // Website: OSM only (GI doesn't have it). Strict — websites stick around so wrong is bad.
  if (!r.db.website && sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
    update.website = r.osm.website
    sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
  }

  // Address: prefer GI (structured "Co. X" format), OSM fallback. Only if DB weak.
  const dbAddr = (r.db.address || '').trim()
  const dbAddrWeak = !dbAddr || dbAddr === '-' || /^-?,?\s*[a-z\s]*$/i.test(dbAddr)
  if (dbAddrWeak) {
    if (sourceTrusted(r.gi, 'medium', 0.5) && r.gi.address) {
      update.address = r.gi.address
      sources.address = `gi(${r.gi.conf}, ${r.gi.dist}m, sim=${r.gi.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.address) {
      update.address = r.osm.address
      sources.address = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // Phone: intentionally NOT updated — Thomas dropped phone-fill from this campaign.
  // Source data is kept in OSM/GI JSONs for audit but never written to DB.

  // Coords: only update if DB has none. Strict — high conf only.
  if (!r.db.lat || !r.db.lon) {
    if (sourceTrusted(r.gi, 'high', 0.7) && r.gi.lat && r.gi.lon) {
      update.latitude = r.gi.lat
      update.longitude = r.gi.lon
      sources.latitude = sources.longitude = `gi(${r.gi.conf}, ${r.gi.dist}m, sim=${r.gi.sim})`
    } else if (sourceTrusted(r.osm, 'high', 0.7) && r.osm.lat && r.osm.lon) {
      update.latitude = r.osm.lat
      update.longitude = r.osm.lon
      sources.latitude = sources.longitude = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  return Object.keys(update).length ? { update, sources } : null
}

const candidates = { high: [], medium: [], low: [], noMatch: [] }
for (const r of results) {
  const proposal = proposeUpdate(r)
  const update = proposal?.update || null
  const sources = proposal?.sources || {}

  // Overall confidence = WORST of the per-field sources actually used
  // (an entry is only as confident as its weakest accepted field).
  // If no fields accepted, fall back to best-of-OSM-or-GI for bucketing into noMatch.
  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0] // worst
  } else {
    const confs = [r.osm?.conf, r.gi?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall }
  if (!update) {
    if (overall === 'no-match') candidates.noMatch.push(entry)
    else continue // matched but nothing to update — skip from report
  } else {
    if (overall === 'high') candidates.high.push(entry)
    else if (overall === 'medium') candidates.medium.push(entry)
    else candidates.low.push(entry)
  }
}

writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2))

// ---------- report ----------
const md = []
md.push('# Ireland match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('## Summary')
md.push('')
md.push(`| Bucket | Clubs | Courses |`)
md.push(`|---|---:|---:|`)
const bucketRow = (label, arr) => {
  const courses = arr.reduce((s, e) => s + e.courseCount, 0)
  md.push(`| ${label} | ${arr.length} | ${courses} |`)
}
bucketRow('High conf — auto-apply candidate', candidates.high)
bucketRow('Medium conf — review', candidates.medium)
bucketRow('Low conf — manual', candidates.low)
bucketRow('No match in OSM or GI', candidates.noMatch)
md.push('')

md.push('## Field-fill projection')
md.push('')
const projField = (field) => {
  let n = 0, c = 0
  for (const arr of [candidates.high, candidates.medium, candidates.low]) {
    for (const e of arr) if (e.proposedUpdate?.[field]) { n++; c += e.courseCount }
  }
  return { clubs: n, courses: c }
}
md.push(`| Field | Clubs | Courses |`)
md.push(`|---|---:|---:|`)
for (const f of ['website', 'address', 'phone', 'latitude']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, addr=${JSON.stringify(e.db.address)}, website=${JSON.stringify(e.db.website)}, phone=${JSON.stringify(e.db.phone)}`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, website=${JSON.stringify(e.osm.website)}, addr=${JSON.stringify(e.osm.address)}`)
  else lines.push(`- OSM: no match`)
  if (e.gi) lines.push(`- GI  (${e.gi.conf}, ${e.gi.dist}m, sim=${e.gi.sim}): name=${JSON.stringify(e.gi.name)}, addr=${JSON.stringify(e.gi.address)}, phone=${JSON.stringify(e.gi.phone)}`)
  else lines.push(`- GI:  no match`)
  if (e.proposedUpdate) {
    lines.push('')
    lines.push(`**Proposed UPDATE** (applied to all ${e.courseCount} course rows for this club, overall=${e.overallConf}):`)
    for (const [field, src] of Object.entries(e.updateSources || {})) {
      lines.push(`  - ${field}: from ${src}`)
    }
    lines.push('```sql')
    const setParts = Object.entries(e.proposedUpdate).map(([k, v]) => {
      if (typeof v === 'number') return `  ${k} = ${v}`
      return `  ${k} = ${JSON.stringify(v).replace(/'/g, "''").replace(/"/g, "'")}`
    })
    lines.push(`UPDATE courses SET\n${setParts.join(',\n')}\nWHERE id IN (\n  ${e.courseIds.map((id) => `'${id}'`).join(',\n  ')}\n);`)
    lines.push('```')
  }
  lines.push('')
  return lines.join('\n')
}

md.push('## High confidence (recommended to apply)')
md.push('')
candidates.high.forEach((e) => md.push(renderEntry(e)))

md.push('## Medium confidence (review before applying)')
md.push('')
candidates.medium.forEach((e) => md.push(renderEntry(e)))

md.push('## Low confidence (manual decision)')
md.push('')
candidates.low.forEach((e) => md.push(renderEntry(e)))

md.push('## No match found in OSM or GI')
md.push('')
candidates.noMatch.forEach((e) => {
  md.push(`- ${e.club} (${e.country}, ${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}`)
})

writeFileSync(REPORT_PATH, md.join('\n'))

console.log('')
console.log('--- Summary ---')
console.log(`High conf:   ${candidates.high.length}`)
console.log(`Medium conf: ${candidates.medium.length}`)
console.log(`Low conf:    ${candidates.low.length}`)
console.log(`No match:    ${candidates.noMatch.length}`)
console.log(`Wrote: ${REPORT_PATH}`)
console.log(`Wrote: ${CANDIDATES_PATH}`)
