// Match OSM + Wales Golf scraped data to DB courses (Wales).
// Modelled on match-england.mjs / match-scotland.mjs.
//
// Run: node --env-file=.env.local scripts/wales/match-wales.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OSM_PATH = 'scripts/wales/wales-clubs-osm.json'
const WG_PATH = 'scripts/wales/wales-wg-clubs.json'
const REPORT_PATH = 'scripts/wales/wales-match-report.md'
const CANDIDATES_PATH = 'scripts/wales/wales-match-candidates.json'

const NAME_TWIN_BLOCKLIST = new Set([])
const CROSS_COUNTRY_SKIP = new Set([])

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
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\b(golf|club|the|gc|& country|country|links|course|society|resort|hotel)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim()

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
    if (!best || score > best.score) best = { record: c, dist, sim, score }
  }
  return best
}

function classify(match) {
  if (!match) return 'no-match'
  const { dist, sim } = match
  if (dist <= 250 && sim >= 0.7) return 'high'
  if (dist <= 500 && sim >= 0.85) return 'medium'
  if (dist <= 1000 || sim >= 0.7) return 'low'
  return 'no-match'
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('*').eq('country', 'Wales')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const wg = JSON.parse(readFileSync(WG_PATH, 'utf8'))

console.log(`Loaded: ${db.length} DB courses (live), ${osm.length} OSM clubs, ${wg.length} WG clubs`)

const dbByClub = new Map()
let crossCountrySkipped = 0
for (const c of db) {
  if (CROSS_COUNTRY_SKIP.has(c.club)) { crossCountrySkipped++; continue }
  const key = `${c.country}::${c.club}`
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}
console.log(`Distinct clubs: ${dbByClub.size} (skipped ${crossCountrySkipped} cross-country)`)

const results = []
for (const [key, courses] of dbByClub) {
  const rep = courses[0]
  const osmMatch = bestMatch(rep, osm, rep.club)
  const wgMatch = bestMatch(rep, wg, rep.club)
  const osmConf = classify(osmMatch)
  const wgConf = classify(wgMatch)

  results.push({
    key, country: rep.country, club: rep.club,
    courseCount: courses.length, courseIds: courses.map((c) => c.id),
    db: { lat: rep.latitude, lon: rep.longitude, address: rep.address, website: rep.website, phone: rep.phone },
    osm: osmMatch ? { name: osmMatch.record.name, lat: osmMatch.record.lat, lon: osmMatch.record.lon, website: osmMatch.record.website, address: osmMatch.record.address, phone: osmMatch.record.phone, dist: Math.round(osmMatch.dist), sim: +osmMatch.sim.toFixed(3), conf: osmConf } : null,
    wg: wgMatch ? { name: wgMatch.record.name, lat: wgMatch.record.latitude, lon: wgMatch.record.longitude, website: wgMatch.record.website, address: wgMatch.record.address, phone: wgMatch.record.phone, dist: Math.round(wgMatch.dist), sim: +wgMatch.sim.toFixed(3), conf: wgConf } : null,
  })
}

const ORDER = ['high', 'medium', 'low', 'no-match']
const confRank = (c) => ORDER.indexOf(c)
const sourceTrusted = (src, minConf = 'medium', minSim = 0.5) => {
  if (!src) return false
  if (confRank(src.conf) > confRank(minConf)) return false
  if ((src.sim ?? 0) < minSim) return false
  return true
}

function proposeUpdate(r) {
  const update = {}, sources = {}
  if (!r.db.website && sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
    update.website = r.osm.website
    sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
  }
  const dbAddr = (r.db.address || '').trim()
  const dbAddrWeak = !dbAddr || dbAddr === '-' || /^-?,?\s*[a-z\s]*$/i.test(dbAddr)
  if (dbAddrWeak) {
    if (sourceTrusted(r.wg, 'medium', 0.5) && r.wg.address) {
      update.address = r.wg.address
      sources.address = `wg(${r.wg.conf}, ${r.wg.dist}m, sim=${r.wg.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.address) {
      update.address = r.osm.address
      sources.address = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }
  if (!r.db.lat || !r.db.lon) {
    if (sourceTrusted(r.wg, 'high', 0.7) && r.wg.lat && r.wg.lon) {
      update.latitude = r.wg.lat; update.longitude = r.wg.lon
      sources.latitude = sources.longitude = `wg(${r.wg.conf}, ${r.wg.dist}m, sim=${r.wg.sim})`
    } else if (sourceTrusted(r.osm, 'high', 0.7) && r.osm.lat && r.osm.lon) {
      update.latitude = r.osm.lat; update.longitude = r.osm.lon
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
    const confs = [r.osm?.conf, r.wg?.conf].filter(Boolean)
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

const md = ['# Wales match report', `Generated: ${new Date().toISOString().slice(0, 19)}`, '', '## Summary', '', `| Bucket | Clubs | Courses |`, `|---|---:|---:|`]
const bucketRow = (label, arr) => md.push(`| ${label} | ${arr.length} | ${arr.reduce((s, e) => s + e.courseCount, 0)} |`)
bucketRow('High', candidates.high)
bucketRow('Medium', candidates.medium)
bucketRow('Low', candidates.low)
bucketRow('No match', candidates.noMatch)
md.push('', '## Field-fill projection', '')
const projField = (field) => {
  let n = 0, c = 0
  for (const arr of [candidates.high, candidates.medium, candidates.low]) {
    for (const e of arr) if (e.proposedUpdate?.[field]) { n++; c += e.courseCount }
  }
  return { clubs: n, courses: c }
}
md.push(`| Field | Clubs | Courses |`, `|---|---:|---:|`)
for (const f of ['website', 'address', 'latitude']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = [`### ${e.club} (${e.courseCount} courses)`, '']
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, addr=${JSON.stringify(e.db.address)}, website=${JSON.stringify(e.db.website)}`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, website=${JSON.stringify(e.osm.website)}, addr=${JSON.stringify(e.osm.address)}`)
  if (e.wg) lines.push(`- WG  (${e.wg.conf}, ${e.wg.dist}m, sim=${e.wg.sim}): name=${JSON.stringify(e.wg.name)}, addr=${JSON.stringify(e.wg.address)}`)
  if (e.proposedUpdate) {
    lines.push('', `**Proposed UPDATE** (overall=${e.overallConf}):`)
    for (const [field, src] of Object.entries(e.updateSources || {})) lines.push(`  - ${field}: from ${src}`)
  }
  lines.push('')
  return lines.join('\n')
}
md.push('## High'); candidates.high.forEach(e => md.push(renderEntry(e)))
md.push('## Medium'); candidates.medium.forEach(e => md.push(renderEntry(e)))
md.push('## Low'); candidates.low.forEach(e => md.push(renderEntry(e)))
md.push('## No match'); candidates.noMatch.forEach(e => md.push(`- ${e.club} — DB lat=${e.db.lat}, lon=${e.db.lon}`))

writeFileSync(REPORT_PATH, md.join('\n'))

console.log('--- Summary ---')
console.log(`High: ${candidates.high.length}, Medium: ${candidates.medium.length}, Low: ${candidates.low.length}, NoMatch: ${candidates.noMatch.length}`)
console.log(`Wrote: ${REPORT_PATH}`)
console.log(`Wrote: ${CANDIDATES_PATH}`)
