// Match NGF + OSM + LC scraped data to DB courses (Netherlands).
// 3-source per-felt-confidence (jf. feedback_match_per_field_confidence.md):
//
//   website: NGF (forbund, højest tillid) → OSM fallback
//   address: LC (struktureret) → OSM fallback
//   (phone/email droppet fra scope; coords håndteres af coords-audit/apply)
//
// Trust-hierarki (besluttet 2026-05-03 session 26):
//   1. Lokalt forbund (NGF) — højest
//   2. Leading Courses (LC) — medium
//   3. OSM — medium-low (god dækning, men crowdsourced)
//   4. Golfapi original (DB) — lavest, kun hvis nyere kilder mangler
//
// Confidence buckets pr source-match:
//   high:   dist ≤ 250m AND sim ≥ 0.7
//   medium: dist ≤ 500m AND sim ≥ 0.85
//   low:    dist ≤ 1000m OR sim ≥ 0.7
//
// DB source: refetches LIVE fra Supabase så distances afspejler post-Pass-1 coords.
//
// Output:
//   scripts/netherlands/holland-match-report.md
//   scripts/netherlands/holland-match-candidates.json
//
// Run: node --env-file=.env.local scripts/netherlands/match-netherlands.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const NGF_PATH = 'scripts/netherlands/holland-ngf-clubs.json'
const OSM_PATH = 'scripts/netherlands/holland-clubs-osm.json'
const LC_PATH  = 'scripts/netherlands/holland-lc-clubs.json'
const REPORT_PATH = 'scripts/netherlands/holland-match-report.md'
const CANDIDATES_PATH = 'scripts/netherlands/holland-match-candidates.json'

// Known name-twins (tilføj efter første match-run hvis nødvendigt)
const NAME_TWIN_BLOCKLIST = new Set([])

// Cross-country misclassification (tilføj efter audit hvis nødvendigt)
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
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\b(golf|club|the|de|gc|golfbaan|golfclub|country|links|course|baan|society|resort|hotel|vereniging)\b/g, '')
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

function bestMatch(dbCourse, candidates, dbClubName, getLat, getLon, getName) {
  let best = null
  for (const c of candidates) {
    const cName = getName(c)
    if (NAME_TWIN_BLOCKLIST.has(`${dbClubName}::${cName}`)) continue

    const cLat = getLat(c)
    const cLon = getLon(c)
    const dist = haversine(dbCourse.latitude, dbCourse.longitude, cLat, cLon)
    const sim = similarity(dbCourse.club, cName)
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
  if (dist <= 500 && sim >= 0.85) return 'medium'
  if (dist <= 1000 || sim >= 0.7) return 'low'
  return 'no-match'
}

// NGF har ingen coords → coord-distance er Infinity. Bruge name-only classify:
function classifyNameOnly(match) {
  if (!match) return 'no-match'
  const { sim } = match
  if (sim >= 0.9) return 'high'
  if (sim >= 0.8) return 'medium'
  if (sim >= 0.7) return 'low'
  return 'no-match'
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// Refetch live (paginated)
const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('*').eq('country', 'Netherlands')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const ngf = JSON.parse(readFileSync(NGF_PATH, 'utf8'))
const osm = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const lcRaw = JSON.parse(readFileSync(LC_PATH, 'utf8'))
const lc = Array.isArray(lcRaw) ? lcRaw : (lcRaw.clubs || [])

console.log(`Loaded: ${db.length} DB courses (live), ${ngf.length} NGF, ${osm.length} OSM, ${lc.length} LC`)

// Pitch & Putt klubber excluderes fra scope (Thomas decision 2026-05-03)
const isPitchAndPutt = (club) => /pitch\s*[&\s]\s*putt/i.test(club || '')

const dbByClub = new Map()
let crossCountrySkipped = 0
let ppSkipped = 0
for (const c of db) {
  if (isPitchAndPutt(c.club)) { ppSkipped++; continue }
  if (CROSS_COUNTRY_SKIP.has(c.club)) { crossCountrySkipped++; continue }
  const key = `${c.country}::${c.club}`
  if (!dbByClub.has(key)) dbByClub.set(key, [])
  dbByClub.get(key).push(c)
}

console.log(`Distinct clubs: ${dbByClub.size} (skipped ${ppSkipped} P&P, ${crossCountrySkipped} cross-country)`)

const results = []
for (const [key, courses] of dbByClub) {
  const rep = courses[0]

  // NGF: name-based match (no coords)
  const ngfMatch = bestMatch(rep, ngf, rep.club,
    () => null, () => null, (c) => c.name)
  // OSM: full match
  const osmMatch = bestMatch(rep, osm, rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)
  // LC: full match
  const lcMatch  = bestMatch(rep, lc,  rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)

  const ngfConf = classifyNameOnly(ngfMatch)
  const osmConf = classify(osmMatch)
  const lcConf  = classify(lcMatch)

  results.push({
    key,
    country: rep.country,
    club: rep.club,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: { lat: rep.latitude, lon: rep.longitude, address: rep.address, website: rep.website, phone: rep.phone },
    ngf: ngfMatch ? { name: ngfMatch.record.name, website: ngfMatch.record.website, email: ngfMatch.record.email, phone: ngfMatch.record.phone, sim: +ngfMatch.sim.toFixed(3), conf: ngfConf } : null,
    osm: osmMatch ? { name: osmMatch.record.name, lat: osmMatch.record.lat, lon: osmMatch.record.lon, website: osmMatch.record.website, address: osmMatch.record.address, phone: osmMatch.record.phone, dist: Math.round(osmMatch.dist), sim: +osmMatch.sim.toFixed(3), conf: osmConf } : null,
    lc:  lcMatch  ? { name: lcMatch.record.name,  lat: lcMatch.record.lat,  lon: lcMatch.record.lon,  url: lcMatch.record.url, address: lcMatch.record.address, phone: lcMatch.record.phone, banen: lcMatch.record.banen, dist: Math.round(lcMatch.dist), sim: +lcMatch.sim.toFixed(3), conf: lcConf } : null,
  })
}

// ---------- per-felt UPDATE proposal ----------
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

  // Website: NGF (forbund) preferred, OSM fallback. Strict — kun hvis DB tom eller forskellig.
  if (!r.db.website || r.db.website.trim() === '') {
    if (sourceTrusted(r.ngf, 'medium', 0.85) && r.ngf.website) {
      update.website = r.ngf.website
      sources.website = `ngf(${r.ngf.conf}, sim=${r.ngf.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
      update.website = r.osm.website
      sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // Address: LC (struktureret) preferred, OSM fallback. Kun hvis DB-address svag.
  const dbAddr = (r.db.address || '').trim()
  const dbAddrWeak = !dbAddr || dbAddr === '-' || /^-?,?\s*[a-z\s]*$/i.test(dbAddr)
  if (dbAddrWeak) {
    if (sourceTrusted(r.lc, 'medium', 0.5) && r.lc.address) {
      update.address = r.lc.address
      sources.address = `lc(${r.lc.conf}, ${r.lc.dist}m, sim=${r.lc.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.address) {
      update.address = r.osm.address
      sources.address = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
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
    const confs = [r.ngf?.conf, r.osm?.conf, r.lc?.conf].filter(Boolean)
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

const md = []
md.push('# Netherlands match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('3-source: NGF (forbund) + OSM + LC. Per-felt-confidence per kilde.')
md.push('Scope: website (NGF→OSM), address (LC→OSM). Phone/email droppet.')
md.push('')
md.push('## Summary')
md.push('')
md.push(`| Bucket | Clubs | Courses |`)
md.push(`|---|---:|---:|`)
const bucketRow = (label, arr) => {
  const n = arr.reduce((s, e) => s + e.courseCount, 0)
  md.push(`| ${label} | ${arr.length} | ${n} |`)
}
bucketRow('High conf', candidates.high)
bucketRow('Medium conf', candidates.medium)
bucketRow('Low conf', candidates.low)
bucketRow('No match', candidates.noMatch)
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
for (const f of ['website', 'address']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, addr=${JSON.stringify(e.db.address)}, website=${JSON.stringify(e.db.website)}`)
  if (e.ngf) lines.push(`- NGF (${e.ngf.conf}, sim=${e.ngf.sim}): name=${JSON.stringify(e.ngf.name)}, website=${JSON.stringify(e.ngf.website)}, email=${JSON.stringify(e.ngf.email)}`)
  else lines.push(`- NGF: no match`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, website=${JSON.stringify(e.osm.website)}, addr=${JSON.stringify(e.osm.address)}`)
  else lines.push(`- OSM: no match`)
  if (e.lc) lines.push(`- LC  (${e.lc.conf}, ${e.lc.dist}m, sim=${e.lc.sim}): name=${JSON.stringify(e.lc.name)}, addr=${JSON.stringify(e.lc.address)}, banen=${(e.lc.banen||[]).map(b=>`${b.name}(${b.holes||'?'})`).join('; ')}`)
  else lines.push(`- LC:  no match`)
  if (e.proposedUpdate) {
    lines.push('')
    lines.push(`**Proposed UPDATE** (alle ${e.courseCount} course rows for klub, overall=${e.overallConf}):`)
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

md.push('## No match in NGF/OSM/LC')
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
