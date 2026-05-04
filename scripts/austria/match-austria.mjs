// Match OEGV + OSM + LC scraped data to DB courses (Austria).
// 3-source per-felt-confidence (Holland-pattern, jf. feedback_match_per_field_confidence.md):
//
//   website: OEGV (forbund, højest tillid) → OSM fallback
//   email:   OEGV only (forbund er den autoritative kilde for klub-kontakter)
//   holes:   OEGV → LC fallback (only update where DB.holes uncertain)
//   address: OEGV → LC → OSM (only where DB.address er svag)
//   (phone droppet fra scope per Thomas-decision 2026-05-04 session 29)
//
// Trust-hierarki (besluttet 2026-05-04 session 29):
//   1. ÖGV (Österreichischer Golf-Verband) — højest, klubber selv-rapporterer
//   2. Leading Courses (LC) — medium, kuraterede booking-data
//   3. OSM — medium-low, crowdsourced
//   4. Golfapi original (DB) — lavest, kun hvis nyere kilder mangler
//
// Confidence buckets pr source-match (coord-baserede kilder OSM/LC):
//   high:   dist ≤ 250m AND sim ≥ 0.7
//   medium: dist ≤ 500m AND sim ≥ 0.85
//   low:    dist ≤ 1000m OR sim ≥ 0.7
//
// OEGV har ingen coords → name-only classify (sim ≥ 0.9 high, ≥ 0.8 medium, ≥ 0.7 low).
// PLZ-matching giver et ekstra trust-boost når både DB og ÖGV har PLZ.
//
// DB source: refetches LIVE fra Supabase så distances afspejler aktuel state.
//
// Output:
//   scripts/austria/austria-match-report.md
//   scripts/austria/austria-match-candidates.json
//
// Run: node --env-file=.env.local scripts/austria/match-austria.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OEGV_PATH = 'scripts/austria/at-oegv-clubs.json'
const OSM_PATH  = 'scripts/austria/austria-clubs-osm.json'
const LC_PATH   = 'scripts/austria/austria-clubs-leadingcourses.json'
const REPORT_PATH = 'scripts/austria/austria-match-report.md'
const CANDIDATES_PATH = 'scripts/austria/austria-match-candidates.json'

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

// German-aware name normalisation. Strips club/golf words + umlaut-folding so
// "Kärntner Golfclub Dellach" and "KGC Dellach" normalise to roughly the same.
const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/\b(golf|club|the|de|gc|kgc|golfclub|golfanlage|golfresort|country|links|course|society|resort|hotel|verein|verband|österreichischer|oesterreichischer|golfschaukel|öko|oeko)\b/g, '')
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

// OEGV-specific matcher: incorporates city/PLZ from OEGV.record vs DB.address
// to disambiguate name-collisions (Salzburg-Klessheim vs Salzburg-Eugendorf)
// AND recover DB rows where the club-name is corrupted to just-the-city
// ("Bad Kleinkirchheim" matching "Golfclub Bad Kleinkirchheim - Kaiserburg").
//
// Algorithm:
//   1. Compute name sim against OEGV.name as before.
//   2. Boost sim if OEGV.city OR OEGV.postcode appears verbatim in DB.address.
//      "Klessheim 21, Wals, Salzburg" contains the city "Wals" of OEGV
//      "Golf & Country Club Salzburg-Klessheim" — city-boost lifts that match
//      above the same-named Eugendorf record.
//   3. Boost sim if DB.address contains a token also in OEGV.name beyond the
//      base club name (e.g. "Klessheim" appears in DB.address AND OEGV.name).
//   4. Final score uses boosted-sim — the best by score is the right club.
// Token-set similarity (Jaccard) on normalized tokens of DB-club vs OEGV-name.
// Catches word-order swaps and partial-overlap that raw edit-distance misses.
// "Tiroler Zugspitze" tokens {tiroler, zugspitze} vs "Zugspitze-Tirol" tokens
// {zugspitze, tirol} → intersection 1, union 3, but "tirol" stems "tiroler" if
// we strip suffixes — pragmatic stem: take first 4-5 chars of each token.
function tokenStems(s) {
  return new Set(
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/ß/g, 'ss')
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 4)
      .map((t) => t.slice(0, 5)) // crude stem: first 5 chars
      .filter((t) => !TOKEN_STOPWORDS.has(t)),
  )
}
// Common Austrian-name-fragments that are too generic to be meaningful boost
// evidence on their own. Maria Lankowitz vs Maria Taferl-Wachau bug came from
// "maria" matching across unrelated towns.
const TOKEN_STOPWORDS = new Set([
  'maria', 'sankt', 'st', 'bad', 'neu', 'alt', 'unter', 'ober', 'hotel', 'club',
  'golfc', 'kgc', 'oegv', 'oster', // stems of common golf/admin words
])
function jaccard(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0
  let inter = 0
  for (const t of setA) if (setB.has(t)) inter++
  const union = setA.size + setB.size - inter
  return union === 0 ? 0 : inter / union
}
// 1-edit-distance check for typo-tolerance ("Bregenzenwald" ≈ "Bregenzerwald")
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

function bestOegvMatch(dbCourse, oegvList) {
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

  for (const c of oegvList) {
    const cName = c.name || ''
    if (NAME_TWIN_BLOCKLIST.has(`${dbCourse.club}::${cName}`)) continue

    const sim = similarity(dbCourse.club, cName)
    let boost = 0
    let boostReasons = []

    // Boost 1: OEGV.city as a complete word-token in DB.address
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

    // Boost 2: OEGV.postcode verbatim in DB.address (4-digit, no false positives)
    if (c.postcode && dbAddr.includes(c.postcode)) {
      boost += 0.3
      boostReasons.push(`plz:${c.postcode}`)
    }

    // Boost 3: distinguishing OEGV.name token (5+ chars) is a word in DB.address
    // but NOT in DB.club — i.e. genuinely new info from the address that confirms
    // the right OEGV record. Catches "Klessheim" (in Salzburg-Klessheim OEGV-name
    // and DB-address but not DB-club "Golf & Country Club Salzburg").
    const oegvNameTokens = cName
      .toLowerCase()
      .split(/[^a-z0-9äöüß]+/i)
      .filter((t) => t.length >= 5)
    for (const tok of oegvNameTokens) {
      if (dbAddrTokens.has(tok) && !dbClubTokens.has(tok)) {
        boost += 0.25
        boostReasons.push(`name-token:${tok}`)
        break
      }
    }

    // Boost 4: DB-club name is contained verbatim in OEGV.name (whole-string
    // substring check is fine here — DB names like "Bad Kleinkirchheim" are
    // unique enough that a substring hit is meaningful). Recovers DB rows where
    // Golfapi imported just-the-city as the club name.
    if (dbClubLower.length >= 5 && cName.toLowerCase().includes(dbClubLower)) {
      boost += 0.3
      boostReasons.push(`db-name-substring`)
    }

    // Boost 5: Token-set Jaccard ≥ 0.5 on stop-word-filtered stems. Catches
    // word-order swap ("Tiroler Zugspitze" / "Zugspitze-Tirol") and partial
    // overlap ("Pfarrkirchen" / "Pfarrkirchen im Mühlviertel") that raw
    // edit-distance misses. STOPWORDS prevent generic-name false positives.
    const oegvStems = tokenStems(cName)
    const jacc = jaccard(dbStems, oegvStems)
    if (jacc >= 0.5 && dbStems.size > 0 && oegvStems.size > 0) {
      boost += jacc * 0.4 // jacc=1.0 → +0.4, jacc=0.5 → +0.2
      boostReasons.push(`jaccard:${jacc.toFixed(2)}`)
    }

    // Boost 6: One-edit-distance typo tolerance on the longest content tokens.
    // Catches "Bregenzenwald" ≈ "Bregenzerwald" or "Tuttendörfl" / "Tuttendoerfl".
    // Only triggers when both candidate tokens are at least 7 chars (short tokens
    // are too noise-prone). Single trigger per match.
    const dbLongTokens = [...dbClubTokens].filter((t) => t.length >= 7)
    const oegvLongTokens = (cName || '')
      .toLowerCase()
      .split(/[^a-z0-9äöüß]+/i)
      .filter((t) => t.length >= 7)
    let typoHit = false
    for (const a of dbLongTokens) {
      if (typoHit) break
      for (const b of oegvLongTokens) {
        if (oneEditDistance(a, b)) {
          boost += 0.25
          boostReasons.push(`typo:${a}~${b}`)
          typoHit = true
          break
        }
      }
    }

    const boostedSim = Math.min(1, sim + boost)
    const score = boostedSim

    if (!best || score > best.score) {
      best = {
        record: c,
        sim,
        boostedSim,
        boost,
        boostReasons,
        score,
        dist: Infinity,
      }
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

// OEGV har ingen coords → classify based on boostedSim (raw sim + city/PLZ boost).
// boostedSim already reflects city/PLZ verification — no separate promotion needed.
// We require BOTH a reasonable raw sim AND boost evidence to land in 'high'.
function classifyNameOnly(match) {
  if (!match) return 'no-match'
  const { sim, boostedSim = sim, boost = 0 } = match

  // High requires high confidence: either raw sim ≥ 0.9 (near-identical names)
  // OR boostedSim ≥ 0.95 with at least one corroborating signal (boost > 0).
  if (sim >= 0.9) return 'high'
  if (boostedSim >= 0.95 && boost > 0) return 'high'

  // Medium: solid raw similarity, OR boosted sim ≥ 0.85 with corroboration.
  if (sim >= 0.8) return 'medium'
  if (boostedSim >= 0.85 && boost > 0) return 'medium'

  // Low: weaker but still corroborated, OR raw sim ≥ 0.7.
  if (sim >= 0.7) return 'low'
  if (boostedSim >= 0.75 && boost >= 0.4) return 'low'

  return 'no-match'
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// Refetch live (paginated for safety; AT has ~298 rows but pattern stays consistent)
const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('*').eq('country', 'Austria')
    .order('club').order('id').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const oegv = JSON.parse(readFileSync(OEGV_PATH, 'utf8'))
const osmRaw = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const lcRaw = JSON.parse(readFileSync(LC_PATH, 'utf8'))
const osm = Array.isArray(osmRaw) ? osmRaw : (osmRaw.clubs || [])
const lc = Array.isArray(lcRaw) ? lcRaw : (lcRaw.clubs || [])

console.log(`Loaded: ${db.length} DB courses (live), ${oegv.length} OEGV, ${osm.length} OSM, ${lc.length} LC`)

// Pitch & Putt klubber excluderes fra scope (samme decision som Holland)
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

  // OEGV: name+city/PLZ-aware match (no coords). bestOegvMatch handles
  // disambiguation when DB-name is ambiguous or corrupted to just-the-city.
  const oegvMatch = bestOegvMatch(rep, oegv)
  // OSM: full match (name + coords)
  const osmMatch = bestMatch(rep, osm, rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)
  // LC: full match
  const lcMatch  = bestMatch(rep, lc,  rep.club,
    (c) => c.lat, (c) => c.lon, (c) => c.name)

  const oegvConf = classifyNameOnly(oegvMatch)
  const osmConf  = classify(osmMatch)
  const lcConf   = classify(lcMatch)

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
      email: rep.email,
      // courses.holes is per-row (from Golfapi import). For klub-niveau holes
      // we expose the rep's value plus the full set so we can detect mismatches.
      holes_db: rep.holes,
      holes_set: [...new Set(courses.map((c) => c.holes).filter((h) => h != null))],
    },
    oegv: oegvMatch ? {
      name: oegvMatch.record.name,
      website: oegvMatch.record.website,
      email: oegvMatch.record.email,
      holes: oegvMatch.record.holes,
      postcode: oegvMatch.record.postcode,
      city: oegvMatch.record.city,
      address: oegvMatch.record.address,
      bundesland: oegvMatch.record.bundesland,
      clubnr: oegvMatch.record.clubnr,
      sim: +oegvMatch.sim.toFixed(3),
      boostedSim: +oegvMatch.boostedSim.toFixed(3),
      boost: +oegvMatch.boost.toFixed(2),
      boostReasons: oegvMatch.boostReasons,
      conf: oegvConf,
    } : null,
    osm: osmMatch ? {
      name: osmMatch.record.name,
      lat: osmMatch.record.lat,
      lon: osmMatch.record.lon,
      website: osmMatch.record.website,
      address: osmMatch.record.address,
      phone: osmMatch.record.phone,
      email: osmMatch.record.email,
      holes: osmMatch.record.holes,
      dist: Math.round(osmMatch.dist),
      sim: +osmMatch.sim.toFixed(3),
      conf: osmConf,
    } : null,
    lc: lcMatch ? {
      name: lcMatch.record.name,
      lat: lcMatch.record.lat,
      lon: lcMatch.record.lon,
      url: lcMatch.record.url,
      address: lcMatch.record.address,
      phone: lcMatch.record.phone,
      courses: lcMatch.record.courses,
      dist: Math.round(lcMatch.dist),
      sim: +lcMatch.sim.toFixed(3),
      conf: lcConf,
    } : null,
  })
}

// ---------- per-felt UPDATE proposal ----------
const ORDER = ['high', 'medium', 'low', 'no-match']
const confRank = (c) => ORDER.indexOf(c)
const sourceTrusted = (src, minConf = 'medium', minSim = 0.5) => {
  if (!src) return false
  if (confRank(src.conf) > confRank(minConf)) return false
  // Use boostedSim when present (OEGV records have it from city/PLZ disambig);
  // fall back to raw sim otherwise. This is critical for OEGV matches where
  // raw sim can be ~0.65 (DB-name corruption) but boostedSim hits 1.0 via
  // city/PLZ verification — without boostedSim, those clubs got silently
  // dropped from proposals despite being correctly identified as 'high'.
  const effectiveSim = src.boostedSim ?? src.sim ?? 0
  if (effectiveSim < minSim) return false
  return true
}

function isWebsiteWeak(w) {
  if (!w) return true
  const s = String(w).trim()
  return s === '' || s === '-' || /^https?:\/\/-?$/.test(s)
}
function isAddressWeak(a) {
  const s = (a || '').trim()
  return !s || s === '-' || /^-?,?\s*[a-z\s]*$/i.test(s)
}

function proposeUpdate(r) {
  const update = {}
  const sources = {}

  // Website: OEGV (forbund) preferred, OSM fallback. Only if DB empty/weak.
  if (isWebsiteWeak(r.db.website)) {
    if (sourceTrusted(r.oegv, 'medium', 0.8) && r.oegv.website) {
      update.website = r.oegv.website
      sources.website = `oegv(${r.oegv.conf}, sim=${r.oegv.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.website) {
      update.website = r.osm.website
      sources.website = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  // Email: OEGV only — forbund-data er den eneste autoritative kilde til klub-emails.
  // OSM-emails er ofte forældede webmaster-adresser; LC har ingen email-felt.
  if (!r.db.email || String(r.db.email).trim() === '') {
    if (sourceTrusted(r.oegv, 'medium', 0.8) && r.oegv.email) {
      update.email = r.oegv.email
      sources.email = `oegv(${r.oegv.conf}, sim=${r.oegv.sim})`
    }
  }

  // Holes: OEGV (klub-niveau totalt for hele anlæg) → LC fallback. OBS: courses.holes
  // er per-row (per bane), så vi opdaterer KUN hvis hele klubbens row(s) er null/0.
  // Multi-bane klubber håndteres ikke her — banenavne+holes ligger i LC.courses og
  // skal mappes 1:1 i en separat Pass-rename-step.
  const allHolesEmpty = r.db.holes_set.length === 0 || r.db.holes_set.every((h) => !h)
  if (allHolesEmpty) {
    if (sourceTrusted(r.oegv, 'medium', 0.8) && r.oegv.holes) {
      update.holes = r.oegv.holes
      sources.holes = `oegv(${r.oegv.conf}, sim=${r.oegv.sim})`
    } else if (sourceTrusted(r.lc, 'medium', 0.5)) {
      // LC.courses is an array of {name, holes, rating}; sum all course holes for klub-niveau
      const lcSum = (r.lc.courses || []).reduce((s, c) => s + (c.holes || 0), 0)
      if (lcSum > 0) {
        update.holes = lcSum
        sources.holes = `lc(${r.lc.conf}, ${r.lc.dist}m, sim=${r.lc.sim}, sum-of-${(r.lc.courses || []).length})`
      }
    }
  }

  // Address: OEGV (PLZ + Ort, struktureret) → LC → OSM. Only if DB-address weak.
  if (isAddressWeak(r.db.address)) {
    if (sourceTrusted(r.oegv, 'medium', 0.8) && r.oegv.address) {
      update.address = r.oegv.address
      sources.address = `oegv(${r.oegv.conf}, sim=${r.oegv.sim})`
    } else if (sourceTrusted(r.lc, 'medium', 0.5) && r.lc.address) {
      update.address = r.lc.address
      sources.address = `lc(${r.lc.conf}, ${r.lc.dist}m, sim=${r.lc.sim})`
    } else if (sourceTrusted(r.osm, 'medium', 0.5) && r.osm.address) {
      update.address = r.osm.address
      sources.address = `osm(${r.osm.conf}, ${r.osm.dist}m, sim=${r.osm.sim})`
    }
  }

  return Object.keys(update).length ? { update, sources } : null
}

const candidates = { high: [], medium: [], low: [], noMatch: [], orphans: [] }
for (const r of results) {
  // Orphan = no OEGV match at all (federation says: not a member club).
  // These are NOT auto-updated — they go to manual review queue per session 29 plan.
  const isOrphan = !r.oegv || r.oegv.conf === 'no-match'

  const proposal = proposeUpdate(r)
  const update = proposal?.update || null
  const sources = proposal?.sources || {}

  let overall
  if (update) {
    const usedConfs = Object.values(sources).map((s) => s.match(/^[a-z]+\((\w+),/)?.[1] ?? 'low')
    overall = usedConfs.sort((a, b) => confRank(b) - confRank(a))[0]
  } else {
    const confs = [r.oegv?.conf, r.osm?.conf, r.lc?.conf].filter(Boolean)
    overall = confs.sort((a, b) => confRank(a) - confRank(b))[0] || 'no-match'
  }

  const entry = { ...r, proposedUpdate: update, updateSources: sources, overallConf: overall, isOrphan }
  if (isOrphan) {
    candidates.orphans.push(entry)
    continue
  }
  // No-match in any source → noMatch bucket
  if (!update && overall === 'no-match') {
    candidates.noMatch.push(entry)
    continue
  }
  // Surface match in its conf-bucket regardless of whether a proposal was generated.
  // Apply scripts already filter on `proposedUpdate` truthiness, so empty-proposal
  // entries are no-ops there — but they're visible in the report instead of silently
  // dropped (which masked the v2 sim/boostedSim mismatch bug).
  const bucket =
    overall === 'high' ? candidates.high
    : overall === 'medium' ? candidates.medium
    : candidates.low
  bucket.push(entry)
}

writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2))

const md = []
md.push('# Austria match report')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('3-source: OEGV (forbund) + OSM + LC. Federation-first per-felt-confidence.')
md.push('Trust hierarki: OEGV > LC > OSM > DB (Golfapi).')
md.push('Scope: website (OEGV→OSM), email (OEGV), holes (OEGV→LC), address (OEGV→LC→OSM). Phone droppet.')
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
bucketRow('Orphans (no OEGV match)', candidates.orphans)
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
for (const f of ['website', 'email', 'holes', 'address']) {
  const p = projField(f)
  md.push(`| ${f} | ${p.clubs} | ${p.courses} |`)
}
md.push('')

const renderEntry = (e) => {
  const lines = []
  lines.push(`### ${e.club} (${e.country}, ${e.courseCount} courses)`)
  lines.push('')
  lines.push(`- DB: lat=${e.db.lat}, lon=${e.db.lon}, addr=${JSON.stringify(e.db.address)}, web=${JSON.stringify(e.db.website)}, email=${JSON.stringify(e.db.email)}, holes=${JSON.stringify(e.db.holes_set)}`)
  if (e.oegv) {
    const boostStr = e.oegv.boost > 0 ? `, boost=+${e.oegv.boost}[${(e.oegv.boostReasons||[]).join(',')}]` : ''
    lines.push(`- OEGV (${e.oegv.conf}, sim=${e.oegv.sim}${boostStr}, ${e.oegv.bundesland} ${e.oegv.postcode}): name=${JSON.stringify(e.oegv.name)}, web=${JSON.stringify(e.oegv.website)}, email=${JSON.stringify(e.oegv.email)}, holes=${e.oegv.holes}, addr=${JSON.stringify(e.oegv.address)}`)
  }
  else lines.push(`- OEGV: no match`)
  if (e.osm) lines.push(`- OSM (${e.osm.conf}, ${e.osm.dist}m, sim=${e.osm.sim}): name=${JSON.stringify(e.osm.name)}, web=${JSON.stringify(e.osm.website)}, addr=${JSON.stringify(e.osm.address)}`)
  else lines.push(`- OSM: no match`)
  if (e.lc) lines.push(`- LC  (${e.lc.conf}, ${e.lc.dist}m, sim=${e.lc.sim}): name=${JSON.stringify(e.lc.name)}, addr=${JSON.stringify(e.lc.address)}, courses=${(e.lc.courses||[]).map(b=>`${b.name}(${b.holes||'?'})`).join('; ')}`)
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

md.push('## No match in OEGV/OSM/LC (review)')
md.push('')
candidates.noMatch.forEach((e) => {
  md.push(`- ${e.club} (${e.country}, ${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}`)
})
md.push('')

md.push('## Orphans — DB klubber uden OEGV-match (manual review queue)')
md.push('')
md.push('Disse klubber er ikke ÖGV-medlemmer. De auto-opdateres IKKE.')
md.push('Beslutning per klub: keep / merge / hide (is_displayed=false) / delete.')
md.push('')
candidates.orphans.forEach((e) => {
  const oegvHint = e.oegv ? ` (best OEGV sim=${e.oegv.sim} → ${e.oegv.name})` : ''
  const osmHint = e.osm ? `, OSM ${e.osm.conf} ${e.osm.dist}m` : ''
  const lcHint = e.lc ? `, LC ${e.lc.conf} ${e.lc.dist}m` : ''
  md.push(`- **${e.club}** (${e.courseCount} courses) — DB lat=${e.db.lat}, lon=${e.db.lon}${oegvHint}${osmHint}${lcHint}`)
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
