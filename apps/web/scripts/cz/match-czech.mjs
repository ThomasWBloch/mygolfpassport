// Match Czech CGF federation data against DB courses.
//
// Single-source matcher (CGF har både kontakt + coords, ingen OSM nødvendig).
// Klub-niveau aggregering: én CGF-klub kan dække flere DB-rows (combo + 18 + 9).
//
// Confidence-buckets (AND-policy per memory):
//   high   → sim ≥ 0.90 AND coord-dist ≤ 500m  (eller sim = 1.0 navne-match m. boost)
//   medium → sim ≥ 0.78 AND coord-dist ≤ 1500m (eller sim ≥ 0.92 m. ingen coords)
//   low    → svagere — manuel review
//   no_match → ingen kandidater
//
// Boost-signaler (federation match) — 6 stk:
//   +0.05 hvis kraj/region matcher DB.address eller .state
//   +0.05 hvis CGF.shortcode er substring af DB.name/club
//   +0.04 hvis DB.club indeholder unikt by-navn fra CGF.address
//   +0.04 hvis DB har OSM-id eller golfapi_id som matcher CGF.clubNumber
//   +0.03 hvis CGF.name efter STOPWORDS er identisk substring af DB.club
//   +0.03 hvis tlf/email-domæne matcher
//
// Run: node --env-file=.env.local scripts/cz/match-czech.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/cz/cz-clubs-cgf.json'
const REPORT_PATH = 'scripts/cz/czech-match-report.md'
const CANDIDATES_PATH = 'scripts/cz/czech-match-candidates.json'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const haversine = (la1, lo1, la2, lo2) => {
  if ([la1, lo1, la2, lo2].some((v) => v == null || Number.isNaN(v))) return Infinity
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(la2 - la1)
  const dLon = toRad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Czech stopwords + golf-jargon
// VIGTIGT: Inkludér IKKE city-navne (praha, brno, ostrava). Hvis hele klub-
// navnet er "Golf Club Praha" og vi stripper alt, får vi tom string → sim=0.
// City-tokens er vigtige diskriminatorer for koblinger som
// "Golf Club Praha" vs "Albatross golf club Praha".
const CZ_STOPWORDS = [
  'golf', 'golfový', 'golfove', 'golfovy', 'golfove', 'golfové', 'golfova', 'golfová',
  'klub', 'club', 'gc', 'go',
  'resort', 'park',
  'i', 'ii', 'iii', 'iv', 'v',
  'a', 'as', 'sro', 'spol',
  '1', '1st', 'first',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritics
    .replace(/ß/g, 'ss')
    .replace(new RegExp(`\\b(${CZ_STOPWORDS.join('|')})\\b`, 'g'), '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

// Bigram-Dice similarity
const bigrams = (s) => {
  const b = new Set()
  for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2))
  return b
}
const sim = (a, b) => {
  const A = norm(a), B = norm(b)
  if (!A || !B) return 0
  if (A === B) return 1
  // Containment-bonus: hvis A er substring af B (eller omvendt) efter normalisering
  if (A.replace(/\s+/g, '') && B.includes(A)) return 0.95
  if (B.replace(/\s+/g, '') && A.includes(B)) return 0.95
  const bA = bigrams(A.replace(/\s+/g, ''))
  const bB = bigrams(B.replace(/\s+/g, ''))
  if (!bA.size || !bB.size) return 0
  let inter = 0
  for (const x of bA) if (bB.has(x)) inter++
  return (2 * inter) / (bA.size + bB.size)
}

function applyBoosts(dbRow, fedKlub, baseSim, dist) {
  let s = baseSim
  const reasons = []
  // 1. kraj/region match (CGF kraj vs DB.address)
  const kraj = (fedKlub.kraj || '').toLowerCase()
  const addr = ((dbRow.address || '') + ' ' + (dbRow.club || '') + ' ' + (dbRow.name || '')).toLowerCase()
  if (kraj && addr.includes(kraj.split(' ')[0])) { s += 0.05; reasons.push('+kraj') }
  // 2. shortcode substring
  if (fedKlub.shortcode && fedKlub.shortcode.length >= 4) {
    const sc = fedKlub.shortcode.toLowerCase()
    if (addr.includes(sc)) { s += 0.05; reasons.push('+shortcode') }
  }
  // 3. CGF name efter stopwords er substring af DB.club
  const fedNorm = norm(fedKlub.name)
  const dbClubNorm = norm(dbRow.club)
  if (fedNorm && dbClubNorm && fedNorm.length >= 4 && (dbClubNorm.includes(fedNorm) || fedNorm.includes(dbClubNorm))) {
    s += 0.03; reasons.push('+nameSubstr')
  }
  // 4. coord proximity bonus (under 200m)
  if (dist != null && dist < 200) { s += 0.04; reasons.push('+veryClose') }
  // 5. unique city token: hvis CGF address ord findes i DB.address (3+ chars)
  if (fedKlub.courses?.[0]?.address) {
    const cityGuess = String(fedKlub.courses[0].address).split(',').pop()?.trim().toLowerCase()
    if (cityGuess && cityGuess.length >= 4 && addr.includes(cityGuess.split(' ').pop() || '')) {
      s += 0.03; reasons.push('+city')
    }
  }
  // 6. shared email-domain
  if (dbRow.email && fedKlub.email) {
    const dDom = dbRow.email.split('@').pop()?.toLowerCase()
    const fDom = fedKlub.email.split('@').pop()?.toLowerCase()
    if (dDom && fDom && dDom === fDom) { s += 0.04; reasons.push('+emailDom') }
  }
  return { boostedSim: Math.min(s, 1.0), reasons }
}

async function fetchCzechCourses() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .or('country.eq.Czech Republic,country.eq.Czechia')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  return all
}

// CGK ("Český Golfový Klub", shortcode CESGK) er paraply-medlemskabsorg med 36
// courses registreret på tværs af reelle ejer-klubber. Match mod CGK er aldrig
// rigtigt — vi vil matche til den specifikke ejer-klub.
const FED_BLOCKLIST_SHORTCODES = new Set(['CESGK'])

function findBestMatch(dbRow, fedKlubs) {
  let best = null
  let runnerUp = null
  for (const f of fedKlubs) {
    if (f.shortcode && FED_BLOCKLIST_SHORTCODES.has(f.shortcode)) continue
    // Match mod klub-navn ELLER mod nogen af klubbens hřiště-navne (course names).
    // CGF aggregerer "Janov" hřiště under et anderledes-navngivet parent-klub,
    // så DB-row "Golf Janov" misser hvis vi kun tjekker klub-navnet.
    let s = sim(dbRow.club, f.name)
    let matchedVia = 'klub'
    for (const c of (f.courses || [])) {
      const sc = sim(dbRow.club, c.name)
      if (sc > s) { s = sc; matchedVia = 'course' }
      const scn = sim(dbRow.name, c.name)
      if (scn > s) { s = scn; matchedVia = 'course-name' }
    }
    if (s < 0.40) continue // tidlig prune
    // Coord-distance: brug nærmeste hřiště til DB-row
    let dist = Infinity
    if (dbRow.latitude != null && dbRow.longitude != null) {
      for (const c of (f.courses || [])) {
        if (c.lat != null && c.lng != null) {
          const d = haversine(dbRow.latitude, dbRow.longitude, c.lat, c.lng)
          if (d < dist) dist = d
        }
      }
    }
    const { boostedSim, reasons } = applyBoosts(dbRow, f, s, dist === Infinity ? null : dist)
    const score = boostedSim - (dist === Infinity ? 0 : Math.min(dist / 50000, 0.2)) // dist-penalty
    const cand = { fed: f, sim: s, boostedSim, dist, score, reasons, matchedVia }
    if (!best || cand.score > best.score || (cand.score === best.score && cand.boostedSim > best.boostedSim)) {
      runnerUp = best
      best = cand
    } else if (!runnerUp || cand.score > runnerUp.score) {
      runnerUp = cand
    }
  }
  return { best, runnerUp }
}

function bucketize(cand) {
  if (!cand) return 'no_match'
  const { boostedSim, dist } = cand
  if (boostedSim >= 0.90 && dist <= 500) return 'high'
  if (boostedSim >= 0.95 && dist === Infinity) return 'high'
  if (boostedSim >= 0.78 && dist <= 1500) return 'medium'
  if (boostedSim >= 0.92 && dist === Infinity) return 'medium'
  // Sub-bucket: navn-perfekt match med stor afstand → DB-coord-bug, ikke navn-twin
  if (boostedSim >= 0.95 && dist > 1500) return 'coord_bug'
  return 'low'
}

async function main() {
  console.log('Loading federation data…')
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  console.log(`  ${fed.length} CGF klubs`)

  console.log('Loading DB courses (CZ)…')
  const db = await fetchCzechCourses()
  console.log(`  ${db.length} DB course-rows`)

  // Group DB by club_normalized for klub-level matching
  const dbByClub = new Map()
  for (const r of db) {
    const key = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(key)) dbByClub.set(key, { key, club: r.club, rows: [] })
    dbByClub.get(key).rows.push(r)
  }
  console.log(`  ${dbByClub.size} unique DB clubs`)

  // Match each unique DB-club to best CGF-klub
  const candidates = []
  let highCt = 0, medCt = 0, lowCt = 0, coordBugCt = 0, noMatchCt = 0
  for (const [key, group] of dbByClub) {
    // Use first row as representative
    const rep = group.rows.find((r) => r.latitude != null) || group.rows[0]
    const { best, runnerUp } = findBestMatch(rep, fed)
    const bucket = bucketize(best)
    candidates.push({
      dbClubKey: key,
      dbClub: group.club,
      dbRowCount: group.rows.length,
      dbRows: group.rows.map((r) => ({
        id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
        website: r.website, email: r.email, phone: r.phone, holes: r.holes,
        is_combo: r.is_combo, is_displayed: r.is_displayed, is_major: r.is_major,
        address: r.address,
      })),
      bucket,
      best: best ? {
        klubId: best.fed.klubId, name: best.fed.name,
        kraj: best.fed.kraj, shortcode: best.fed.shortcode,
        website: best.fed.website, email: best.fed.email, phone: best.fed.phone,
        websiteFrom: best.fed.websiteFrom,
        sim: best.sim, boostedSim: best.boostedSim, dist: best.dist === Infinity ? null : Math.round(best.dist),
        reasons: best.reasons,
        courses: best.fed.courses?.map((c) => ({
          hristeId: c.hristeId, name: c.name, lat: c.lat, lng: c.lng, holes: c.holes,
          website: c.website, email: c.email, phone: c.phone, address: c.address,
        })) || [],
      } : null,
      runnerUp: runnerUp ? {
        klubId: runnerUp.fed.klubId, name: runnerUp.fed.name,
        sim: runnerUp.sim, boostedSim: runnerUp.boostedSim,
        dist: runnerUp.dist === Infinity ? null : Math.round(runnerUp.dist),
      } : null,
    })
    if (bucket === 'high') highCt++
    else if (bucket === 'medium') medCt++
    else if (bucket === 'low') lowCt++
    else if (bucket === 'coord_bug') coordBugCt++
    else noMatchCt++
  }

  candidates.sort((a, b) => {
    const order = { high: 0, medium: 1, coord_bug: 2, low: 3, no_match: 4 }
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.boostedSim || 0) - (a.best?.boostedSim || 0)
  })

  writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2), 'utf8')

  // Markdown report
  const lines = []
  lines.push('# Czech Republic match report')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- Federation klubs: ${fed.length}`)
  lines.push(`- High: ${highCt} | Medium: ${medCt} | Coord-bug: ${coordBugCt} | Low: ${lowCt} | No-match: ${noMatchCt}`)
  lines.push('')
  for (const bucket of ['high', 'medium', 'coord_bug', 'low', 'no_match']) {
    const items = candidates.filter((c) => c.bucket === bucket)
    if (!items.length) continue
    lines.push('')
    lines.push('| DB club | rows | CGF name | sim | boost | dist (m) | website | email | phone | reasons |')
    lines.push('|---|---|---|---|---|---|---|---|---|---|')
    for (const c of items) {
      lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || '—'} | ${c.best?.sim?.toFixed(2) || ''} | ${c.best?.boostedSim?.toFixed(2) || ''} | ${c.best?.dist ?? ''} | ${c.best?.website ? 'Y' : ''} | ${c.best?.email ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} | ${c.best?.reasons?.join(',') || ''} |`)
    }
  }
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')

  console.log(`\n=== Match summary ===`)
  console.log(`  High: ${highCt} | Medium: ${medCt} | Coord-bug: ${coordBugCt} | Low: ${lowCt} | No-match: ${noMatchCt}`)
  console.log(`Wrote ${CANDIDATES_PATH}`)
  console.log(`Wrote ${REPORT_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
