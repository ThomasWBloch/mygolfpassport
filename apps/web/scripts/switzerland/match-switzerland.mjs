// Match Swiss Golf federation + OSM to DB courses (Switzerland).
// 2-source per-felt-confidence — simplified vs AT because email/phone
// droppet (federation har dem ikke; coverage-først-strategi).
//
// Trust-hierarki:
//   1. Swiss Golf (federation, 99% website + 100% coords)
//   2. OSM — verifikation + coord-fallback
//   3. DB (Golfapi) — lavest, kun fallback
//
// Federation HAR coords — modsat ÖGV — så vi kan bruge name + dist matchning.
// Match-strategy: name sim + coord dist (Swiss Golf data har coords for alle).
//   high:   dist ≤ 250m AND sim ≥ 0.7
//   medium: dist ≤ 500m AND sim ≥ 0.85 (or boostedSim ≥ 0.85 + boost > 0)
//   low:    dist ≤ 1000m OR sim ≥ 0.7
//
// Boost-logic genbrugt fra AT v4 (city/PLZ/Jaccard/typo). Stopword-set udvidet
// med fransk + italiensk fragmenter (CH har 4 sprogregioner).
//
// Scope per Thomas-decision (session 30, 2026-05-04): KUN website.
//   email + phone droppet (federation eksponerer dem ikke)
//   address kan tages fra LC senere hvis ønsket
//   coords fra federation kun ved coord-fix til de 2 NULL-coord outliers
//
// Run: node --env-file=.env.local scripts/switzerland/match-switzerland.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const SWISSGOLF_PATH = 'scripts/switzerland/ch-swissgolf-clubs.json'
const OSM_PATH = 'scripts/switzerland/switzerland-clubs-osm.json'
const REPORT_PATH = 'scripts/switzerland/switzerland-match-report.md'
const CANDIDATES_PATH = 'scripts/switzerland/switzerland-match-candidates.json'

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

// Multilingual name normalisation — strips German + French + Italian common
// golf words. CH klub-navne kan være på alle 4 sprog.
const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/\b(golf|club|the|de|du|des|le|la|les|gc|kgc|golfclub|golfanlage|golfresort|country|links|course|society|resort|hotel|verein|verband|parcours|de\sgolf|golfclub|circolo|sport)\b/g, '')
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

// Stop-word set for boost-matching. Includes German + French + Italian + English
// generic fragments that would cause cross-club false positives.
const TOKEN_STOPWORDS = new Set([
  'maria', 'sankt', 'st', 'saint', 'sainte', 'bad', 'neu', 'nuovo', 'nouvelle',
  'alt', 'unter', 'ober', 'sopra', 'sotto', 'haut', 'haute', 'bas', 'basse',
  'hotel', 'club', 'golfc', 'kgc', 'oegv', 'oester', 'parc',
])

function tokenStems(s) {
  return new Set(
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/ß/g, 'ss')
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 4)
      .map((t) => t.slice(0, 5))
      .filter((t) => !TOKEN_STOPWORDS.has(t)),
  )
}

function jaccard(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0
  let inter = 0
  for (const t of setA) if (setB.has(t)) inter++
  const union = setA.size + setB.size - inter
  return union === 0 ? 0 : inter / union
}

function oneEditDistance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false
  if (a === b) return false
  const [s, t] = a.length <= b.length ? [a, b] : [b, a]
  let i = 0, j = 0, found = 0
  while (i < s.length && j < t.length) {
    if (s[i] !== t[j]) {
      if (++found > 1) return false
      if (s.length === t.length) i++
      j++
    } else { i++; j++ }
  }
  return true
}

// SwissGolf-specific matcher: name+coord distance + boost signals.
// Federation HAS coords so we use full bestMatch logic (vs ÖGV's name-only).
function bestSwissGolfMatch(dbCourse, sgList) {
  let best = null
  const dbAddr = (dbCourse.address || '').toLowerCase()
  const dbAddrTokens = new Set(
    dbAddr.split(/[^a-z0-9äöüß]+/i).filter((t) => t.length >= 4),
  )
  const dbClubLower = (dbCourse.club || '').toLowerCase()
  const dbClubTokens = new Set(
    dbClubLower.split(/[^a-z0-9äöüß]+/i).filter((t) => t.length >= 4),
  )
  const dbStems = tokenStems(dbCourse.club)

  for (const c of sgList) {
    if (NAME_TWIN_BLOCKLIST.has(`${dbCourse.club}::${c.name}`)) continue

    const dist = haversine(dbCourse.latitude, dbCourse.longitude, c.lat, c.lon)
    const sim = similarity(dbCourse.club, c.name)
    let boost = 0
    let boostReasons = []

    // Boost: city verbatim
    if (c.city) {
      const cityTokens = c.city
        .toLowerCase()
        .split(/[^a-z0-9äöüß]+/i)
        .filter((t) => t.length >= 4)
      for (const tok of cityTokens) {
        if (dbAddrTokens.has(tok)) {
          boost += 0.4
          boostReasons.push(`city:${tok}`)
          break
        }
      }
    }
    // Boost: postcode (CH PLZ is 4-digit)
    if (c.postcode && dbAddr.includes(c.postcode)) {
      boost += 0.3
      boostReasons.push(`plz:${c.postcode}`)
    }
    // Boost: distinguishing federation-name token in DB.address (not in DB.club)
    const sgNameTokens = (c.name || '')
      .toLowerCase()
      .split(/[^a-z0-9äöüß]+/i)
      .filter((t) => t.length >= 5)
    for (const tok of sgNameTokens) {
      if (dbAddrTokens.has(tok) && !dbClubTokens.has(tok)) {
        boost += 0.25
        boostReasons.push(`name-token:${tok}`)
        break
      }
    }
    // Boost: DB-club is verbatim in federation name
    if (dbClubLower.length >= 5 && (c.name || '').toLowerCase().includes(dbClubLower)) {
      boost += 0.3
      boostReasons.push(`db-name-substring`)
    }
    // Boost: token-set Jaccard (word-order swap)
    const sgStems = tokenStems(c.name)
    const jacc = jaccard(dbStems, sgStems)
    if (jacc >= 0.5 && dbStems.size > 0 && sgStems.size > 0) {
      boost += jacc * 0.4
      boostReasons.push(`jaccard:${jacc.toFixed(2)}`)
    }
    // Boost: 1-edit typo on long tokens
    const dbLongTokens = [...dbClubTokens].filter((t) => t.length >= 7)
    const sgLongTokens = (c.name || '')
      .toLowerCase()
      .split(/[^a-z0-9äöüß]+/i)
      .filter((t) => t.length >= 7)
    for (const a of dbLongTokens) {
      let hit = false
      for (const b of sgLongTokens) {
        if (oneEditDistance(a, b)) {
          boost += 0.25
          boostReasons.push(`typo:${a}~${b}`)
          hit = true
          break
        }
      }
      if (hit) break
    }

    const boostedSim = Math.min(1, sim + boost)
    // Score combines coord distance + boostedSim (Swiss Golf has coords).
    const distScore = dist === Infinity ? 0 : Math.max(0, 1 - dist / 2000)
    const score = distScore * 0.5 + boostedSim * 0.5

    if (!best || score > best.score) {
      best = { record: c, dist, sim, boostedSim, boost, boostReasons, score }
    }
  }
  return best
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
  const { dist, sim, boostedSim = sim, boost = 0 } = match
  // Federation has coords so we use full classify with boost-aware promotion.
  if (dist <= 250 && sim >= 0.7) return 'high'
  if (dist <= 250 && boostedSim >= 0.85 && boost > 0) return 'high'
  if (dist <= 500 && sim >= 0.85) return 'medium'
  if (dist <= 500 && boostedSim >= 0.85 && boost > 0) return 'medium'
  if (dist <= 1000 || sim >= 0.7) return 'low'
  if (boostedSim >= 0.75 && boost >= 0.4) return 'low'
  return 'no-match'
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('*').eq('country', 'Switzerland')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const sgRaw = JSON.parse(readFileSync(SWISSGOLF_PATH, 'utf8'))
const sg = Array.isArray(sgRaw) ? sgRaw : (sgRaw.clubs || [])
const osmRaw = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const osm = Array.isArray(osmRaw) ? osmRaw : (osmRaw.clubs || [])

console.log(`Loaded: ${db.length} DB courses (live), ${sg.length} SwissGolf, ${osm.length} OSM`)

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

  const sgMatch = bestSwissGolfMatch(rep, sg)
  const osmMatch = bestMatch(rep, osm, rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)

  const sgConf = classify(sgMatch)
  const osmConf = classify(osmMatch)

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
      holes_db: rep.holes,
      holes_set: [...new Set(courses.map((c) => c.holes).filter((h) => h != null))],
    },
    swissgolf: sgMatch ? {
      swissgolf_id: sgMatch.record.swissgolf_id,
      name: sgMatch.record.name,
      website: sgMatch.record.website,
      category: sgMatch.record.category,
      lat: sgMatch.record.lat,
      lon: sgMatch.record.lon,
      city: sgMatch.record.city,
      postcode: sgMatch.record.postcode,
      holes: sgMatch.record.holes,
      dist: Math.round(sgMatch.dist),
      sim: +sgMatch.sim.toFixed(3),
      boostedSim: +sgMatch.boostedSim.toFixed(3),
      boost: +sgMatch.boost.toFixed(2),
      boostReasons: sgMatch.boostReasons,
      conf: sgConf,
    } : null,
    osm: osmMatch ? {
      name: osmMatch.record.name,
      lat: osmMatch.record.lat,
      lon: osmMatch.record.lon,
      website: osmMatch.record.website,
      address: osmMatch.record.address,
      dist: Math.round(osmMatch.dist),
      sim: +osmMatch.sim.toFixed(3),
      conf: osmConf,
    } : null,
  })
}

// ── Per-felt UPDATE proposal ──
const ORDER = ['high', 'medium', 'low', 'no-match']
const confRank = (c) => ORDER.indexOf(c)
const sourceTrusted = (src, minConf = 'medium', minSim = 0.5) => {
  if (!src) return false
  if (confRank(src.conf) > confRank(minConf)) return false
  const effectiveSim = src.boostedSim ?? src.sim ?? 0
  if (effectiveSim < minSim) return false
  return true
}

function isWebsiteWeak(w) {
  if (!w) return true
  const s = String(w).trim()
  return s === '' || s === '-' || /^https?:\/\/-?$/.test(s)
}

function proposeUpdate(r) {
  const update = {}
  const sources = {}

  // Website: SwissGolf federation preferred, OSM fallback. Only if DB empty.
  if (isWebsiteWeak(r.db.website)) {
    if (sourceTrusted(r.swissgolf, 'medium', 0.7) && r.swissgolf.website) {
      update.website = r.swissgolf.website
      sources.website = `swissgolf(${r.swissgolf.conf}, ${r.swissgolf.dist}m, sim=${r.swissgolf.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
      update.website = r.osm.website
      sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  return Object.keys(update).length ? { update, sources } : null
}

const candidates = { high: [], medium: [], low: [], noMatch: [], orphans: [] }
for (const r of results) {
  // Orphan: no SwissGolf match (federation says: not a Swiss Golf club).
  // Could be commercial resorts or non-federation clubs.
  const isOrphan = !r.swissgolf || r.swissgolf.conf === 'no-match'

  const proposal = proposeUpdate(r)
  const update = proposal?.update || null
  const sources = proposal?.sources || {}

  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0]
  } else {
    const confs = [r.swissgolf?.conf, r.osm?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall, isOrphan }
  if (isOrphan) {
    candidates.orphans.push(entry)
    continue
  }
  if (!update && overall === 'no-match') {
    candidates.noMatch.push(entry)
    continue
  }
  const bucket =
    overall === 'high' ? candidates.high
    : overall === 'medium' ? candidates.medium
    : candidates.low
  bucket.push(entry)
}

writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2))

const md = []
md.push('# Switzerland match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('2-source: SwissGolf federation + OSM. Federation-first per-felt-confidence.')
md.push('Trust hierarki: SwissGolf > OSM > DB (Golfapi).')
md.push('Scope: website ONLY (email/phone droppet — federation eksponerer dem ikke).')
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
bucketRow('Orphans (no SwissGolf match)', candidates.orphans)
md.push('')

md.push('## Field-fill projection (excl. orphans)')
md.push('')
let websiteClubs = 0, websiteCourses = 0
for (const arr of [candidates.high, candidates.medium, candidates.low]) {
  for (const e of arr) if (e.proposedUpdate?.website) {
    websiteClubs++
    websiteCourses += e.courseCount
  }
}
md.push(`| Field | Clubs | Courses |`)
md.push(`|---|---:|---:|`)
md.push(`| website | ${websiteClubs} | ${websiteCourses} |`)
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, web=${JSON.stringify(e.db.website)}`)
  if (e.swissgolf) {
    const boostStr = e.swissgolf.boost > 0 ? `, boost=+${e.swissgolf.boost}[${(e.swissgolf.boostReasons||[]).join(',')}]` : ''
    lines.push(`- SwissGolf (${e.swissgolf.conf}, ${e.swissgolf.dist}m, sim=${e.swissgolf.sim}${boostStr}, ${e.swissgolf.category}, id=${e.swissgolf.swissgolf_id}): name=${JSON.stringify(e.swissgolf.name)}, web=${JSON.stringify(e.swissgolf.website)}, plz/ort=${JSON.stringify(e.swissgolf.postcode + ' ' + (e.swissgolf.city||''))}`)
  } else lines.push(`- SwissGolf: no match`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, web=${JSON.stringify(e.osm.website)}`)
  else lines.push(`- OSM: no match`)
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

md.push('## Orphans — DB klubber uden SwissGolf-match (manual review queue)')
md.push('')
md.push('Disse klubber er sandsynligvis ikke Swiss Golf-medlemmer (kommercielle resorts, militær, lukkede). Auto-opdateres IKKE.')
md.push('')
candidates.orphans.forEach((e) => {
  const sgHint = e.swissgolf ? ` (best SG sim=${e.swissgolf.sim}, ${e.swissgolf.dist}m → ${e.swissgolf.name})` : ''
  const osmHint = e.osm ? `, OSM ${e.osm.conf} ${e.osm.dist}m` : ''
  md.push(`- **${e.club}** (${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}${sgHint}${osmHint}`)
})
md.push('')

writeFileSync(REPORT_PATH, md.join('\n'))

console.log('')
console.log('--- Summary ---')
console.log(`High conf:    ${candidates.high.length}`)
console.log(`Medium conf:  ${candidates.medium.length}`)
console.log(`Low conf:     ${candidates.low.length}`)
console.log(`No match:     ${candidates.noMatch.length}`)
console.log(`Orphans:      ${candidates.orphans.length}`)
console.log(`Wrote: ${REPORT_PATH}`)
console.log(`Wrote: ${CANDIDATES_PATH}`)
