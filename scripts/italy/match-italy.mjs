// Match OSM + LC scraped data to DB courses (Italy).
// 2-source per-felt-confidence (jf. feedback_match_per_field_confidence.md).
// FIG (føderation) er dead end — confirmed Session 28 via 3 probes (no public API,
// /circoli/ er tag-archive uden strukturerede felter, members-data bag tesseramento).
//
// Trust-hierarki for IT:
//   1. LC (Leading Courses) — kuraterede booking-data, høj tillid
//   2. OSM — crowdsourced, medium tillid
//   3. Golfapi original (DB) — lavest, kun hvis nyere kilder mangler
//
// Scope (IT-specifikt — DB har 0% website/phone/email pre-Pass 2):
//   website: OSM only (LC har INGEN website-felt — kun lc_url profile-link)
//   phone:   LC preferred (98% coverage) → OSM fallback (36%)
//   email:   OSM only (LC har ingen email)
//   address: SKIP — DB har 95.7% allerede, ingen enrichment nødvendig
//   coords:  SKIP — DB har 99.4% allerede; kun de 2 outliers (Alpiaz, Rotoballe) håndteres separat
//
// Confidence buckets pr source-match (samme thresholds som Holland):
//   high:   dist ≤ 250m AND sim ≥ 0.7
//   medium: dist ≤ 500m AND sim ≥ 0.85
//   low:    dist ≤ 1000m OR  sim ≥ 0.7
//
// AND-thresholds per memory feedback_match_threshold_and_not_or.md:
// medium kræver BÅDE coord-nær OG navn-lig — ellers slipper navn-twins igennem.
//
// DB source: refetches LIVE fra Supabase så distances afspejler faktiske coords.
//
// Output:
//   scripts/italy/italy-match-report.md
//   scripts/italy/italy-match-candidates.json
//
// Run: node --env-file=.env.local scripts/italy/match-italy.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OSM_PATH = 'scripts/italy/italy-clubs-osm.json'
const LC_PATH  = 'scripts/italy/italy-clubs-leadingcourses.json'
const REPORT_PATH = 'scripts/italy/italy-match-report.md'
const CANDIDATES_PATH = 'scripts/italy/italy-match-candidates.json'

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

// IT-specifik normalisering. Stripper:
//  - quotes (OSM har "Il Cerreto di Miglianico")
//  - leading/trailing whitespace (LC har " Golf Club Saluzzo")
//  - diakritiske tegn (à→a, è→e osv.)
//  - generiske italienske golf-tokens (4 reordering-mønstre observeret i DB:
//    "Circolo Golf X", "Golf Club X", "X Golf Club", "Golf X")
//  - articles (il, la, del, della, dei, degli, de, di)
//  - resort/spa/country/asd-tokens
const norm = (s) =>
  (s || '')
    .replace(/^["'\s]+|["'\s]+$/g, '')                // quotes + leading/trailing ws
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')                  // strip diacritics
    .replace(/\b(and|golf|club|circolo|country|resort|spa|course|asd|the|il|la|le|del|della|dei|degli|de|di|country|sportiva|dilettantistica|associazione|nuovo|nuova|vecchio)\b/g, '')
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
  if (dist <= 500 && sim >= 0.85) return 'medium'   // AND, ikke OR
  if (dist <= 1000 || sim >= 0.7) return 'low'
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
    .from('courses').select('*').eq('country', 'Italy')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const osmRaw = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const lcRaw  = JSON.parse(readFileSync(LC_PATH,  'utf8'))
const osm = Array.isArray(osmRaw) ? osmRaw : (osmRaw.clubs || [])
const lc  = Array.isArray(lcRaw)  ? lcRaw  : (lcRaw.clubs  || [])

console.log(`Loaded: ${db.length} DB courses (live), ${osm.length} OSM, ${lc.length} LC`)

// IT har ingen P&P i scope (allerede filtreret af OSM-scraper's blocklist;
// LC sitemap returnerer ikke driving-ranges)

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

  // OSM: full match (coords + name)
  const osmMatch = bestMatch(rep, osm, rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)
  // LC: full match (coords + name)
  const lcMatch  = bestMatch(rep, lc,  rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)

  const osmConf = classify(osmMatch)
  const lcConf  = classify(lcMatch)

  results.push({
    key,
    country: rep.country,
    club: rep.club,
    courseCount: courses.length,
    courseIds: courses.map((c) => c.id),
    db: { lat: rep.latitude, lon: rep.longitude, address: rep.address, website: rep.website, phone: rep.phone },
    osm: osmMatch ? { name: osmMatch.record.name, lat: osmMatch.record.lat, lon: osmMatch.record.lon, website: osmMatch.record.website, email: osmMatch.record.email, phone: osmMatch.record.phone, address: osmMatch.record.address, dist: Math.round(osmMatch.dist), sim: +osmMatch.sim.toFixed(3), conf: osmConf } : null,
    lc:  lcMatch  ? { name: lcMatch.record.name,  lat: lcMatch.record.lat,  lon: lcMatch.record.lon,  url: lcMatch.record.lc_url, phone: lcMatch.record.phone, address: lcMatch.record.address, region: lcMatch.record.addressRegion, percorsi: lcMatch.record.percorsi, dist: Math.round(lcMatch.dist), sim: +lcMatch.sim.toFixed(3), conf: lcConf } : null,
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

  // WEBSITE: kun OSM (LC har ikke website-felt). Fyld kun hvis DB tom.
  if (!r.db.website || r.db.website.trim() === '') {
    if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
      update.website = r.osm.website
      sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // PHONE: LC preferred (98% coverage på IT) → OSM fallback. Fyld kun hvis DB tom.
  if (!r.db.phone || r.db.phone.trim() === '') {
    if (sourceTrusted(r.lc, 'medium', 0.5) && r.lc.phone) {
      update.phone = r.lc.phone
      sources.phone = `lc(${r.lc.conf}, ${r.lc.dist}m, sim=${r.lc.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.phone) {
      update.phone = r.osm.phone
      sources.phone = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // EMAIL: kun OSM. Fyld kun hvis DB ingen email-kolonne... wait, DB HAR ikke email-kolonne.
  // (Bekræftet via information_schema: courses-tabellen har ikke email-felt)
  // → email droppes fra Pass 2 scope. Gemmes i match-output for manuel review hvis ønsket.

  return Object.keys(update).length ? { update, sources } : null
}

// Review-bucket splittes i to:
//   reviewCoordAudit: DB mangler website ELLER phone, OG der er match i OSM/LC
//                     men kun ved low conf (typisk pga. coord-mismatch — Marco Simone-mønster).
//                     Disse er kandidater til coord-audit-fix.
//   reviewDbFull:     DB har allerede både website OG phone, ingen enrichment nødvendig.
//                     Surface for fuldstændighed; ingen action.
const candidates = { high: [], medium: [], low: [], reviewCoordAudit: [], reviewDbFull: [], noMatch: [] }
for (const r of results) {
  const proposal = proposeUpdate(r)
  const update = proposal?.update || null
  const sources = proposal?.sources || {}

  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0]
  } else {
    const confs = [r.osm?.conf, r.lc?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall }
  if (!update) {
    if (overall === 'no-match') {
      candidates.noMatch.push(entry)
    } else {
      const dbWebsite = (r.db.website || '').trim()
      const dbPhone = (r.db.phone || '').trim()
      if (dbWebsite && dbPhone) {
        candidates.reviewDbFull.push(entry)
      } else {
        candidates.reviewCoordAudit.push(entry)
      }
    }
  } else {
    if (overall === 'high') candidates.high.push(entry)
    else if (overall === 'medium') candidates.medium.push(entry)
    else candidates.low.push(entry)
  }
}

writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2))

const md = []
md.push('# Italy match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('2-source: OSM + LC. Per-felt-confidence per kilde. (FIG dead end — confirmed via 3 probes.)')
md.push('Scope: website (OSM), phone (LC→OSM). Address/coords/email skippet (DB allerede god / kolonne mangler).')
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
bucketRow('Review (coord-audit kandidat)', candidates.reviewCoordAudit)
bucketRow('Review (DB allerede fuld)', candidates.reviewDbFull)
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
for (const f of ['website', 'phone']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, website=${JSON.stringify(e.db.website)}, phone=${JSON.stringify(e.db.phone)}`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, website=${JSON.stringify(e.osm.website)}, phone=${JSON.stringify(e.osm.phone)}, email=${JSON.stringify(e.osm.email)}`)
  else lines.push(`- OSM: no match`)
  if (e.lc)  lines.push(`- LC  (${e.lc.conf}, ${e.lc.dist}m, sim=${e.lc.sim}): name=${JSON.stringify(e.lc.name)}, phone=${JSON.stringify(e.lc.phone)}, region=${JSON.stringify(e.lc.region)}, percorsi=${(e.lc.percorsi||[]).map(p=>`${p.name}(${p.holes||'?'})`).join('; ')}`)
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

md.push('## Review — coord-audit kandidater')
md.push('')
md.push('Match fundet i OSM/LC, men kun ved low conf — typisk fordi DB-coords er off med >1km.')
md.push('Marco Simone-mønstret: navn matcher 1:1, gadeadresse identisk, men DB-coord er forkert.')
md.push('Disse skal cross-checkes af audit-italy-coords.mjs (næste tur).')
md.push('')
candidates.reviewCoordAudit.forEach((e) => md.push(renderEntry(e)))

md.push('## Review — DB allerede fuld (ingen action)')
md.push('')
md.push('DB har både website og phone; ingen enrichment nødvendig. Inkluderet for fuldstændighed.')
md.push('')
candidates.reviewDbFull.forEach((e) => md.push(renderEntry(e)))

md.push('## No match in OSM/LC')
md.push('')
candidates.noMatch.forEach((e) => {
  md.push(`- ${e.club} (${e.country}, ${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}`)
})

writeFileSync(REPORT_PATH, md.join('\n'))

console.log('')
console.log('--- Summary ---')
console.log(`High conf:           ${candidates.high.length}`)
console.log(`Medium conf:         ${candidates.medium.length}`)
console.log(`Low conf:            ${candidates.low.length}`)
console.log(`Review (coord-audit):${candidates.reviewCoordAudit.length}`)
console.log(`Review (DB fuld):    ${candidates.reviewDbFull.length}`)
console.log(`No match:            ${candidates.noMatch.length}`)
console.log(`Wrote: ${REPORT_PATH}`)
console.log(`Wrote: ${CANDIDATES_PATH}`)
