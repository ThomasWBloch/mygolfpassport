// Match Canada Golf Canada federation data against DB courses.
// Skala: 2.110 unique DB-klubber × 1.559 Golf Canada facilities.
// Bruger province-filter + grid-spatial index for fart.
//
// Confidence-buckets:
//   high     → sim ≥ 0.80 AND dist ≤ 300m, OR sim ≥ 0.92 AND dist ≤ 1000m
//   medium   → sim ≥ 0.70 AND dist ≤ 800m
//   low      → sim ≥ 0.55 — manuel review queue
//   dedup_lost → en stærkere kandidat har allerede claimed denne facility
//   no_match → ingen kandidat
//
// Run: node --env-file=.env.local scripts/canada/match-canada.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/canada/canada-clubs.json'
const REPORT_PATH = 'scripts/canada/canada-match-report.md'
const CANDIDATES_PATH = 'scripts/canada/canada-match-candidates.json'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const haversine = (la1, lo1, la2, lo2) => {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(la2 - la1)
  const dLon = toRad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Canada-specific stopwords (English + French — Quebec has many francophone clubs)
const STOPWORDS = [
  // English
  'golf', 'club', 'course', 'country', 'cc', 'gc', 'links',
  'the', 'at', 'of', 'and',
  'inc', 'llc', 'ltd', 'corp',
  'i', 'ii', 'iii', 'iv', 'v',
  'resort', 'park', 'national', 'international', 'public',
  'tm',
  // French (Quebec)
  'le', 'la', 'les', 'de', 'du', 'des', 'd',
  'parcours', 'terrain', 'champêtre',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')   // strip accents (é → e, à → a, etc)
    .replace(new RegExp(`\\b(${STOPWORDS.join('|')})\\b`, 'g'), '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const bigrams = (s) => {
  const b = new Set()
  for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2))
  return b
}

const sim = (a, b) => {
  const A = norm(a), B = norm(b)
  if (!A || !B) return 0
  if (A === B) return 1
  const bA = bigrams(A.replace(/\s+/g, ''))
  const bB = bigrams(B.replace(/\s+/g, ''))
  if (!bA.size || !bB.size) return 0
  let inter = 0
  for (const x of bA) if (bB.has(x)) inter++
  let s = (2 * inter) / (bA.size + bB.size)
  // Containment-bonus, but only with length-ratio penalty to avoid wide-match issues
  if (A.length >= 4 && B.includes(A)) s = Math.max(s, 0.7 + 0.25 * (A.length / B.length))
  if (B.length >= 4 && A.includes(B)) s = Math.max(s, 0.7 + 0.25 * (B.length / A.length))
  return s
}

// Canadian provinces — feed uses 2-char codes (with one "qC" typo we normalise)
const CA_PROVINCES = new Set([
  'ON','QC','BC','AB','SK','MB','NS','NB','PE','NL','YT','NT','NU',
])

function provinceOf(s) {
  if (!s) return null
  const u = String(s).trim().toUpperCase()
  return CA_PROVINCES.has(u) ? u : null
}

async function fetchCanada() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('id, club, name, latitude, longitude, website, phone, email, holes, is_combo, is_displayed, address, club_normalized, country')
      .eq('country', 'Canada')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  return all
}

async function main() {
  console.log('Loading Golf Canada federation data…')
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  console.log(`  ${fed.length} facilities`)

  console.log('Loading DB courses (Canada)…')
  const db = await fetchCanada()
  console.log(`  ${db.length} DB course-rows`)

  // Group DB by club_normalized for klub-level matching
  const dbByClub = new Map()
  for (const r of db) {
    const key = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(key)) dbByClub.set(key, { key, club: r.club, rows: [] })
    dbByClub.get(key).rows.push(r)
  }
  console.log(`  ${dbByClub.size} unique DB clubs`)

  // Spatial index facilities by 0.5° grid + province
  // Key: "PROV|latGrid|lngGrid"
  const fedIdx = new Map()
  let fedWithCoords = 0
  for (const o of fed) {
    if (o.latitude == null || o.longitude == null) continue
    fedWithCoords++
    const prov = provinceOf(o.region) || 'XX'
    const latG = Math.floor(o.latitude * 2)
    const lngG = Math.floor(o.longitude * 2)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const k = `${prov}|${latG + dx}|${lngG + dy}`
        if (!fedIdx.has(k)) fedIdx.set(k, [])
        fedIdx.get(k).push(o)
      }
    }
  }
  console.log(`  ${fedWithCoords} facilities with coords indexed`)

  // Match each DB-klub → best facility
  const candidates = []
  let progress = 0
  for (const [key, group] of dbByClub) {
    progress++
    if (progress % 500 === 0) console.log(`  match ${progress}/${dbByClub.size}…`)

    const rep = group.rows.find((r) => r.latitude != null) || group.rows[0]
    if (rep.latitude == null) {
      candidates.push({ dbClubKey: key, dbClub: group.club, dbRowCount: group.rows.length, dbRows: group.rows.map(toMinRow), bucket: 'no_match', reason: 'db_no_coords' })
      continue
    }

    // Search candidate facilities in spatial neighborhood (any province — we don't trust DB province)
    const latG = Math.floor(rep.latitude * 2)
    const lngG = Math.floor(rep.longitude * 2)
    const candPool = new Set()
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const prov of CA_PROVINCES) {
          const k = `${prov}|${latG + dx}|${lngG + dy}`
          if (fedIdx.has(k)) {
            for (const c of fedIdx.get(k)) candPool.add(c)
          }
        }
        const k2 = `XX|${latG + dx}|${lngG + dy}`
        if (fedIdx.has(k2)) for (const c of fedIdx.get(k2)) candPool.add(c)
      }
    }

    let best = null
    let runnerUp = null
    for (const o of candPool) {
      const dist = haversine(rep.latitude, rep.longitude, o.latitude, o.longitude)
      if (dist > 5000) continue
      // Score by best name-sim across all DB rows in this klub
      let s = 0
      for (const r of group.rows) {
        const s1 = sim(r.club, o.facilityName)
        if (s1 > s) s = s1
        const s2 = sim(r.name, o.facilityName)
        if (s2 > s) s = s2
      }
      if (s < 0.45) continue
      const score = s - Math.min(dist / 50000, 0.2)
      const cand = { fac: o, sim: s, dist, score }
      if (!best || cand.score > best.score || (cand.score === best.score && cand.sim > best.sim)) {
        runnerUp = best
        best = cand
      } else if (!runnerUp || cand.score > runnerUp.score) {
        runnerUp = cand
      }
    }

    let bucket
    if (!best) bucket = 'no_match'
    else if (best.sim >= 0.80 && best.dist <= 300) bucket = 'high'
    else if (best.sim >= 0.92 && best.dist <= 1000) bucket = 'high'
    else if (best.sim >= 0.70 && best.dist <= 800) bucket = 'medium'
    else if (best.sim >= 0.55) bucket = 'low'
    else bucket = 'no_match'

    candidates.push({
      dbClubKey: key,
      dbClub: group.club,
      dbRowCount: group.rows.length,
      dbRows: group.rows.map(toMinRow),
      bucket,
      best: best ? {
        facilityId: best.fac.facilityId,
        facilityName: best.fac.facilityName,
        region: best.fac.region,
        regionalAssociation: best.fac.regionalAssociation,
        latitude: best.fac.latitude,
        longitude: best.fac.longitude,
        website: best.fac.website,
        phone: best.fac.phone,
        email: best.fac.email,
        type: best.fac.type,
        facilityClass: best.fac.facilityClass,
        sourceUrl: best.fac.sourceUrl,
        sim: best.sim,
        dist: Math.round(best.dist),
      } : null,
      runnerUp: runnerUp ? {
        facilityName: runnerUp.fac.facilityName,
        sim: runnerUp.sim,
        dist: Math.round(runnerUp.dist),
      } : null,
    })
  }

  // Chain-twin dedup: highest scorer claims facility-record
  // (memory: bestFedMatch tiebreaker — sim > best.sim secondary check baked in above)
  const usedFacIds = new Set()
  candidates.sort((a, b) => {
    const aScore = a.best ? (a.best.sim - Math.min(a.best.dist / 50000, 0.2)) : -1
    const bScore = b.best ? (b.best.sim - Math.min(b.best.dist / 50000, 0.2)) : -1
    return bScore - aScore
  })
  for (const c of candidates) {
    if (!c.best) continue
    if (usedFacIds.has(c.best.facilityId)) {
      c.dedup_demoted_from = c.best
      c.best = null
      c.bucket = 'dedup_lost'
    } else {
      usedFacIds.add(c.best.facilityId)
    }
  }

  // Resort + counts
  const order = { high: 0, medium: 1, low: 2, dedup_lost: 3, no_match: 4 }
  candidates.sort((a, b) => {
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.sim || 0) - (a.best?.sim || 0)
  })

  const counts = { high: 0, medium: 0, low: 0, dedup_lost: 0, no_match: 0 }
  for (const c of candidates) counts[c.bucket]++

  // Field-availability among matches
  const fieldAvail = { high: { web: 0, phone: 0, email: 0 }, medium: { web: 0, phone: 0, email: 0 } }
  for (const c of candidates) {
    if (c.bucket !== 'high' && c.bucket !== 'medium') continue
    if (c.best?.website) fieldAvail[c.bucket].web++
    if (c.best?.phone) fieldAvail[c.bucket].phone++
    if (c.best?.email) fieldAvail[c.bucket].email++
  }

  writeFileSync(CANDIDATES_PATH, JSON.stringify({ candidates, counts, fieldAvail }, null, 2), 'utf8')

  console.log('\n=== Match summary ===')
  console.log(`  High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  console.log(`\n  Field availability among matches (high+medium):`)
  console.log(`    high   web=${fieldAvail.high.web} phone=${fieldAvail.high.phone} email=${fieldAvail.high.email}`)
  console.log(`    medium web=${fieldAvail.medium.web} phone=${fieldAvail.medium.phone} email=${fieldAvail.medium.email}`)
  console.log(`Wrote ${CANDIDATES_PATH}`)

  // Markdown report
  const lines = ['# Canada match report', '', `Generated: ${new Date().toISOString()}`, '']
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- Golf Canada facilities: ${fed.length} (${fedWithCoords} with coords)`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  lines.push('')
  lines.push(`## Field availability`)
  lines.push(`| Bucket | website | phone | email |`)
  lines.push(`|---|---|---|---|`)
  lines.push(`| high (${counts.high}) | ${fieldAvail.high.web} | ${fieldAvail.high.phone} | ${fieldAvail.high.email} |`)
  lines.push(`| medium (${counts.medium}) | ${fieldAvail.medium.web} | ${fieldAvail.medium.phone} | ${fieldAvail.medium.email} |`)
  lines.push('')
  lines.push('## HIGH sample (first 25)')
  lines.push('| DB club | rows | Facility | sim | dist (m) | web | phone | email |')
  lines.push('|---|---|---|---|---|---|---|---|')
  const highs = candidates.filter((c) => c.bucket === 'high').slice(0, 25)
  for (const c of highs) {
    lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.facilityName || ''} | ${c.best?.sim?.toFixed(2)} | ${c.best?.dist} | ${c.best?.website ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} | ${c.best?.email ? 'Y' : ''} |`)
  }
  lines.push('')
  lines.push('## MEDIUM sample (first 15) — manuel sanity check anbefales')
  lines.push('| DB club | Facility | sim | dist (m) | runnerUp |')
  lines.push('|---|---|---|---|---|')
  const meds = candidates.filter((c) => c.bucket === 'medium').slice(0, 15)
  for (const c of meds) {
    lines.push(`| ${c.dbClub || ''} | ${c.best?.facilityName || ''} | ${c.best?.sim?.toFixed(2)} | ${c.best?.dist} | ${c.runnerUp ? c.runnerUp.facilityName + ' (' + c.runnerUp.sim.toFixed(2) + ')' : ''} |`)
  }
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')
}

function toMinRow(r) {
  return {
    id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
    website: r.website, phone: r.phone, email: r.email, holes: r.holes,
    is_combo: r.is_combo, is_displayed: r.is_displayed, address: r.address,
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
