// Match France ffgolf federation + OSM to DB courses.
// Session 32 (2026-05-05): genbrug af AT/BE federation-first 2-source pattern.
//
//   1. ffgolf.org (Fédération Française de Golf — rig: name+website+email+phone+address+lat/lon)
//   2. OSM — verifikation + fallback for ffgolf-orphans
//
// Forskelligt fra BE: ffgolf har lat/lon på de fleste klubber (fra google
// maps-href), så federation-match kan bruge BÅDE name-sim OG coord-distance.
// Boost-design fra AT v4 tilbageholdes for klubber uden ffgolf-coords.
//
// Scope (federation har det hele):
//   website (federation → OSM fallback)
//   email (federation → OSM fallback)
//   phone (federation → OSM fallback)
//
// Run: node --env-file=.env.local scripts/france/match-france.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/france/fr-ffgolf-clubs.json'
const OSM_PATH = 'scripts/france/france-clubs-osm.json'
const REPORT_PATH = 'scripts/france/france-match-report.md'
const CANDIDATES_PATH = 'scripts/france/france-match-candidates.json'

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

// French + golf-specific stopwords
const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/\b(golf|club|the|de|du|des|le|la|les|et|aux|au|gc|golfclub|country|links|course|society|resort|hotel|parcours|domaine|chateau|nouveau|nouvelle|saint|sainte|st|ste)\b/g, '')
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

const TOKEN_STOPWORDS = new Set([
  'saint', 'sainte', 'st', 'ste', 'nouveau', 'nouvelle',
  'haut', 'haute', 'bas', 'basse', 'grand', 'grande', 'petit', 'petite',
  'hotel', 'club', 'golfc', 'parc', 'chateau', 'domaine',
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

// Federation matcher — ffgolf har ofte lat/lon, bruges til at boost'e
// kombineret med name-sim + city/PLZ-fra-address (AT v4 boost design).
function bestFedMatch(dbCourse, fedList) {
  let best = null
  const dbAddr = (dbCourse.address || '').toLowerCase()
  const dbAddrTokens = new Set(
    dbAddr.split(/[^a-z0-9àâäéèêëîïôöûüç]+/i).filter((t) => t.length >= 4),
  )
  const dbClubLower = (dbCourse.club || '').toLowerCase()
  const dbClubTokens = new Set(
    dbClubLower.split(/[^a-z0-9àâäéèêëîïôöûüç]+/i).filter((t) => t.length >= 4),
  )
  const dbStems = tokenStems(dbCourse.club)

  for (const c of fedList) {
    if (NAME_TWIN_BLOCKLIST.has(`${dbCourse.club}::${c.name}`)) continue

    const sim = similarity(dbCourse.club, c.name)
    let boost = 0
    let boostReasons = []

    // Coord-boost: hvis ffgolf har lat/lon, brug det.
    let dist = Infinity
    if (c.lat != null && c.lon != null) {
      dist = haversine(dbCourse.latitude, dbCourse.longitude, c.lat, c.lon)
      if (dist <= 250) { boost += 0.4; boostReasons.push(`coord:${Math.round(dist)}m`) }
      else if (dist <= 1000) { boost += 0.25; boostReasons.push(`coord:${Math.round(dist)}m`) }
      else if (dist <= 3000) { boost += 0.1; boostReasons.push(`coord:${Math.round(dist)}m`) }
    }

    if (c.city) {
      const cityTokens = c.city
        .toLowerCase()
        .split(/[^a-z0-9àâäéèêëîïôöûüç]+/i)
        .filter((t) => t.length >= 4)
      for (const tok of cityTokens) {
        if (dbAddrTokens.has(tok)) {
          boost += 0.3
          boostReasons.push(`city:${tok}`)
          break
        }
      }
    }
    if (c.postcode && dbAddr.includes(c.postcode)) {
      boost += 0.25
      boostReasons.push(`plz:${c.postcode}`)
    }
    const fedNameTokens = (c.name || '')
      .toLowerCase()
      .split(/[^a-z0-9àâäéèêëîïôöûüç]+/i)
      .filter((t) => t.length >= 5)
    for (const tok of fedNameTokens) {
      if (dbAddrTokens.has(tok) && !dbClubTokens.has(tok)) {
        boost += 0.2
        boostReasons.push(`name-token:${tok}`)
        break
      }
    }
    if (dbClubLower.length >= 5 && (c.name || '').toLowerCase().includes(dbClubLower)) {
      boost += 0.25
      boostReasons.push(`db-name-substring`)
    }
    const fedStems = tokenStems(c.name)
    const jacc = jaccard(dbStems, fedStems)
    if (jacc >= 0.5 && dbStems.size > 0 && fedStems.size > 0) {
      boost += jacc * 0.3
      boostReasons.push(`jaccard:${jacc.toFixed(2)}`)
    }
    const dbLongTokens = [...dbClubTokens].filter((t) => t.length >= 7)
    const fedLongTokens = (c.name || '')
      .toLowerCase()
      .split(/[^a-z0-9àâäéèêëîïôöûüç]+/i)
      .filter((t) => t.length >= 7)
    for (const a of dbLongTokens) {
      let hit = false
      for (const b of fedLongTokens) {
        if (oneEditDistance(a, b)) {
          boost += 0.2
          boostReasons.push(`typo:${a}~${b}`)
          hit = true
          break
        }
      }
      if (hit) break
    }

    const boostedSim = Math.min(1, sim + boost)
    const score = boostedSim

    if (!best || score > best.score) {
      best = { record: c, sim, boostedSim, boost, boostReasons, score, dist }
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
  const { dist, sim } = match
  if (dist <= 250 && sim >= 0.7) return 'high'
  if (dist <= 500 && sim >= 0.85) return 'medium'
  if (dist <= 1000 || sim >= 0.7) return 'low'
  return 'no-match'
}

function classifyFed(match) {
  if (!match) return 'no-match'
  const { sim, boostedSim = sim, boost = 0, dist = Infinity } = match

  // Distance gate (Session 32 review): når ffgolf har coords OG dist > 5km,
  // er match'et som hovedregel et chain-twin eller region-overlap false-positive.
  // Bluegreen/UGOLF-kæder, Saint-X-byer, og région-navne overlap fooler boost-
  // designet når coords er på den anden side af landet. Vi har set 34 sådanne
  // false-positives sneake ind som high/medium ved første pass.
  // Undtagelse: ren navn-identitet uden boost kan stadig passere (op til 15km)
  // for at fange wrong-coord-i-DB-cases.
  const FAR = 5000
  if (Number.isFinite(dist) && dist > FAR) {
    if (dist <= 15000 && sim >= 0.95 && boost === 0) return 'low'
    return 'no-match'
  }

  // ffgolf med coords + close: high
  if (dist <= 250 && sim >= 0.7) return 'high'
  if (sim >= 0.9) return 'high'
  if (boostedSim >= 0.95 && boost > 0) return 'high'
  if (dist <= 500 && sim >= 0.6) return 'medium'
  if (sim >= 0.8) return 'medium'
  if (boostedSim >= 0.85 && boost > 0) return 'medium'
  if (dist <= 1500 && sim >= 0.5) return 'low'
  if (sim >= 0.7) return 'low'
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
    .from('courses').select('*').eq('country', 'France')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const fedRaw = JSON.parse(readFileSync(FED_PATH, 'utf8'))
const fed = Array.isArray(fedRaw) ? fedRaw : (fedRaw.clubs || [])
const osmRaw = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const osm = Array.isArray(osmRaw) ? osmRaw : (osmRaw.clubs || [])

console.log(`Loaded: ${db.length} DB courses, ${fed.length} ffgolf, ${osm.length} OSM`)

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
  const fedMatch = bestFedMatch(rep, fed)
  const osmMatch = bestMatch(rep, osm, rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)
  const fedConf = classifyFed(fedMatch)
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
      email: rep.email,
      phone: rep.phone,
    },
    fed: fedMatch ? {
      name: fedMatch.record.name,
      slug: fedMatch.record.slug,
      website: fedMatch.record.website,
      email: fedMatch.record.email,
      phone: fedMatch.record.phone,
      address: fedMatch.record.address,
      city: fedMatch.record.city,
      postcode: fedMatch.record.postcode,
      lat: fedMatch.record.lat,
      lon: fedMatch.record.lon,
      sim: +fedMatch.sim.toFixed(3),
      boostedSim: +fedMatch.boostedSim.toFixed(3),
      boost: +fedMatch.boost.toFixed(2),
      boostReasons: fedMatch.boostReasons,
      dist: fedMatch.dist === Infinity ? null : Math.round(fedMatch.dist),
      conf: fedConf,
    } : null,
    osm: osmMatch ? {
      name: osmMatch.record.name,
      lat: osmMatch.record.lat,
      lon: osmMatch.record.lon,
      website: osmMatch.record.website,
      email: osmMatch.record.email,
      phone: osmMatch.record.phone,
      address: osmMatch.record.address,
      dist: Math.round(osmMatch.dist),
      sim: +osmMatch.sim.toFixed(3),
      conf: osmConf,
    } : null,
  })
}

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

  // Website: federation → OSM fallback
  if (isWebsiteWeak(r.db.website)) {
    if (sourceTrusted(r.fed, 'medium', 0.7) && r.fed.website) {
      update.website = r.fed.website
      sources.website = `fed(${r.fed.conf}, sim=${r.fed.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
      update.website = r.osm.website
      sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // Email: federation → OSM fallback
  if (!r.db.email || String(r.db.email).trim() === '') {
    if (sourceTrusted(r.fed, 'medium', 0.7) && r.fed.email) {
      update.email = r.fed.email
      sources.email = `fed(${r.fed.conf}, sim=${r.fed.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.email) {
      update.email = r.osm.email
      sources.email = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // Phone: federation → OSM fallback
  if (!r.db.phone || String(r.db.phone).trim() === '') {
    if (sourceTrusted(r.fed, 'medium', 0.7) && r.fed.phone) {
      update.phone = r.fed.phone
      sources.phone = `fed(${r.fed.conf}, sim=${r.fed.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.phone) {
      update.phone = r.osm.phone
      sources.phone = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  return Object.keys(update).length ? { update, sources } : null
}

const candidates = { high: [], medium: [], low: [], noMatch: [], orphans: [] }
for (const r of results) {
  const isOrphan = !r.fed || r.fed.conf === 'no-match'
  const proposal = proposeUpdate(r)
  const update = proposal?.update || null
  const sources = proposal?.sources || {}

  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0]
  } else {
    const confs = [r.fed?.conf, r.osm?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall, isOrphan }
  // Fed-orphan + OSM-data: lad proposeUpdate's OSM-fallback få lov at komme
  // igennem til regular bucket. Kun "true orphan" (ingen update fra nogen
  // kilde) ryger i orphans-bucketten.
  if (isOrphan && !update) {
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
md.push('# France match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('2-source: ffgolf federation + OSM. Federation-first per-felt-confidence.')
md.push('Trust hierarki: ffgolf > OSM > DB (Golfapi).')
md.push('Scope: website + email + phone (ffgolf har alle tre).')
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
bucketRow('Orphans (no fed match)', candidates.orphans)
md.push('')

md.push('## Field-fill projection (excl. orphans)')
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
for (const f of ['website', 'email', 'phone']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: addr=${JSON.stringify(e.db.address)}, web=${JSON.stringify(e.db.website)}, email=${JSON.stringify(e.db.email)}, phone=${JSON.stringify(e.db.phone)}`)
  if (e.fed) {
    const boostStr = e.fed.boost > 0 ? `, boost=+${e.fed.boost}[${(e.fed.boostReasons||[]).join(',')}]` : ''
    const distStr = e.fed.dist != null ? `, ${e.fed.dist}m` : ''
    lines.push(`- ffgolf (${e.fed.conf}, sim=${e.fed.sim}${boostStr}${distStr}, ${e.fed.postcode||''} ${e.fed.city||''}): name=${JSON.stringify(e.fed.name)}, web=${JSON.stringify(e.fed.website)}, email=${JSON.stringify(e.fed.email)}, phone=${JSON.stringify(e.fed.phone)}`)
  } else lines.push(`- ffgolf: no match`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, web=${JSON.stringify(e.osm.website)}, email=${JSON.stringify(e.osm.email)}, phone=${JSON.stringify(e.osm.phone)}`)
  else lines.push(`- OSM: no match`)
  if (e.proposedUpdate) {
    lines.push('')
    lines.push(`**Proposed UPDATE** (alle ${e.courseCount} course rows for klub, overall=${e.overallConf}):`)
    for (const [field, src] of Object.entries(e.updateSources || {})) {
      lines.push(`  - ${field}: from ${src}`)
    }
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
md.push('## Orphans — DB klubber uden ffgolf-match')
md.push('')
candidates.orphans.forEach((e) => {
  const fedHint = e.fed ? ` (best fed sim=${e.fed.sim} → ${e.fed.name})` : ''
  const osmHint = e.osm ? `, OSM ${e.osm.conf} ${e.osm.dist}m` : ''
  md.push(`- **${e.club}** (${e.courseCount} courses)${fedHint}${osmHint}`)
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
