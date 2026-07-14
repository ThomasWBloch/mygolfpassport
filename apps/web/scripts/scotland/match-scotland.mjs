// Match OSM + Scottish Golf scraped data to DB courses (Scotland).
// Modelled on match-england.mjs with all fixes (AND-classify, live DB refetch,
// twin blocklist, cross-country skip).
//
// Produces:
//   - scripts/scotland/scotland-match-report.md
//   - scripts/scotland/scotland-match-candidates.json
//
// Run: node --env-file=.env.local scripts/scotland/match-scotland.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OSM_PATH = 'scripts/scotland/scotland-clubs-osm.json'
const SG_PATH = 'scripts/scotland/scotland-sg-clubs.json'
const REPORT_PATH = 'scripts/scotland/scotland-match-report.md'
const CANDIDATES_PATH = 'scripts/scotland/scotland-match-candidates.json'

// Known name-twins (empty initially — populate after first dry-run if found)
const NAME_TWIN_BLOCKLIST = new Set([])

// DB-tagged "Scotland" but actually elsewhere (empty initially)
const CROSS_COUNTRY_SKIP = new Set([])

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

function bestMatch(dbCourse, candidates, dbClubName) {
  let best = null
  for (const c of candidates) {
    if (NAME_TWIN_BLOCKLIST.has(`${dbClubName}::${c.name}`)) continue
    const cLat = c.lat ?? c.latitude
    const cLon = c.lon ?? c.longitude
    const dist = haversine(dbCourse.latitude, dbCourse.longitude, cLat, cLon)
    const sim = similarity(dbCourse.club, c.name)
    const distScore = dist === Infinity ? 0 : Math.max(0, 1 - dist / 2000)
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
  if (dist <= 500 && sim >= 0.85) return 'medium' // AND not OR — prevents twins
  if (dist <= 1000 || sim >= 0.7) return 'low'
  return 'no-match'
}

// ---------- load ----------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// Refetch live (paginated)
const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('*').eq('country', 'Scotland')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const sg = JSON.parse(readFileSync(SG_PATH, 'utf8'))

console.log(`Loaded: ${db.length} DB courses (live), ${osm.length} OSM clubs, ${sg.length} SG clubs`)

const dbByClub = new Map()
let crossCountrySkipped = 0
for (const c of db) {
  if (CROSS_COUNTRY_SKIP.has(c.club)) { crossCountrySkipped++; continue }
  const key = `${c.country}::${c.club}`
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}
console.log(`Distinct clubs: ${dbByClub.size} (skipped ${crossCountrySkipped} cross-country)`)

// ---------- match ----------
const results = []
for (const [key, courses] of dbByClub) {
  const rep = courses[0]
  const osmMatch = bestMatch(rep, osm, rep.club)
  const sgMatch = bestMatch(rep, sg, rep.club)

  const osmConf = classify(osmMatch)
  const sgConf = classify(sgMatch)

  results.push({
    key,
    country: rep.country,
    club: rep.club,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: { lat: rep.latitude, lon: rep.longitude, address: rep.address, website: rep.website, phone: rep.phone },
    osm: osmMatch ? { name: osmMatch.record.name, lat: osmMatch.record.lat, lon: osmMatch.record.lon, website: osmMatch.record.website, address: osmMatch.record.address, phone: osmMatch.record.phone, dist: Math.round(osmMatch.dist), sim: +osmMatch.sim.toFixed(3), conf: osmConf } : null,
    sg: sgMatch ? { name: sgMatch.record.name, lat: sgMatch.record.latitude, lon: sgMatch.record.longitude, website: sgMatch.record.website, address: sgMatch.record.address, phone: sgMatch.record.phone, dist: Math.round(sgMatch.dist), sim: +sgMatch.sim.toFixed(3), conf: sgConf } : null,
  })
}

// ---------- per-felt confidence proposal ----------
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
  const sources = {}

  if (!r.db.website && sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
    update.website = r.osm.website
    sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
  }

  const dbAddr = (r.db.address || '').trim()
  const dbAddrWeak = !dbAddr || dbAddr === '-' || /^-?,?\s*[a-z\s]*$/i.test(dbAddr)
  if (dbAddrWeak) {
    if (sourceTrusted(r.sg, 'medium', 0.5) && r.sg.address) {
      update.address = r.sg.address
      sources.address = `sg(${r.sg.conf}, ${r.sg.dist}m, sim=${r.sg.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.address) {
      update.address = r.osm.address
      sources.address = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  if (!r.db.lat || !r.db.lon) {
    if (sourceTrusted(r.sg, 'high', 0.7) && r.sg.lat && r.sg.lon) {
      update.latitude = r.sg.lat
      update.longitude = r.sg.lon
      sources.latitude = sources.longitude = `sg(${r.sg.conf}, ${r.sg.dist}m, sim=${r.sg.sim})`
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

  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0]
  } else {
    const confs = [r.osm?.conf, r.sg?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall }
  if (!update) {
    if (overall === 'no-match') candidates.noMatch.push(entry)
    else continue
  } else {
    if (overall === 'high') candidates.high.push(entry)
    else if (overall === 'medium') candidates.medium.push(entry)
    else candidates.low.push(entry)
  }
}

writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2))

// ---------- report ----------
const md = []
md.push('# Scotland match report')
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
bucketRow('No match in OSM or SG', candidates.noMatch)
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
for (const f of ['website', 'address', 'latitude']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, addr=${JSON.stringify(e.db.address)}, website=${JSON.stringify(e.db.website)}`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, website=${JSON.stringify(e.osm.website)}, addr=${JSON.stringify(e.osm.address)}`)
  else lines.push(`- OSM: no match`)
  if (e.sg) lines.push(`- SG  (${e.sg.conf}, ${e.sg.dist}m, sim=${e.sg.sim}): name=${JSON.stringify(e.sg.name)}, addr=${JSON.stringify(e.sg.address)}`)
  else lines.push(`- SG:  no match`)
  if (e.proposedUpdate) {
    lines.push('')
    lines.push(`**Proposed UPDATE** (overall=${e.overallConf}):`)
    for (const [field, src] of Object.entries(e.updateSources || {})) {
      lines.push(`  - ${field}: from ${src}`)
    }
  }
  lines.push('')
  return lines.join('\n')
}

md.push('## High confidence')
md.push('')
candidates.high.forEach((e) => md.push(renderEntry(e)))

md.push('## Medium confidence')
md.push('')
candidates.medium.forEach((e) => md.push(renderEntry(e)))

md.push('## Low confidence')
md.push('')
candidates.low.forEach((e) => md.push(renderEntry(e)))

md.push('## No match')
md.push('')
candidates.noMatch.forEach((e) => {
  md.push(`- ${e.club} (${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}`)
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
