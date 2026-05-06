// Match USA OpenGolfAPI federation data against DB courses.
// Skala: 12.487 DB-klubber × 15.667 OGA-courses.
// Bruger state-filter + grid-spatial index for fart.
//
// Confidence-buckets:
//   high   → sim ≥ 0.80 AND dist ≤ 300m
//   medium → sim ≥ 0.70 AND dist ≤ 800m
//   low    → svagere — manuel review queue
//   no_match → ingen kandidater
//
// Run: node --env-file=.env.local scripts/usa/match-usa.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/usa/usa-courses-oga.json'
const REPORT_PATH = 'scripts/usa/usa-match-report.md'
const CANDIDATES_PATH = 'scripts/usa/usa-match-candidates.json'

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

// US-specific stopwords
const STOPWORDS = [
  'golf', 'club', 'course', 'country', 'cc', 'gc', 'links',
  'the', 'at', 'of', 'and',
  'inc', 'llc', 'corp',
  'i', 'ii', 'iii', 'iv', 'v',
  'resort', 'park', 'national',
  'tm',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
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

// US state mapping — DB might have full names ("California") or codes ("CA")
const US_STATE_CODES = new Set([
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC','PR'
])

async function fetchUSA() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('id, club, name, latitude, longitude, website, phone, holes, is_combo, is_displayed, address, club_normalized')
      .eq('country', 'USA')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  return all
}

async function main() {
  console.log('Loading OpenGolfAPI bulk data…')
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  const ogaCourses = fed.courses
  console.log(`  ${ogaCourses.length} OGA courses`)

  console.log('Loading DB courses (USA)…')
  const db = await fetchUSA()
  console.log(`  ${db.length} DB course-rows`)

  // Group DB by club_normalized for klub-level matching
  const dbByClub = new Map()
  for (const r of db) {
    const key = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(key)) dbByClub.set(key, { key, club: r.club, rows: [] })
    dbByClub.get(key).rows.push(r)
  }
  console.log(`  ${dbByClub.size} unique DB clubs`)

  // Spatial index OGA by 0.5° grid + state
  // Key: "STATE|latGrid|lngGrid"
  const ogaIdx = new Map()
  for (const o of ogaCourses) {
    const latG = Math.floor(o.latitude * 2)
    const lngG = Math.floor(o.longitude * 2)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const k = `${o.state}|${latG + dx}|${lngG + dy}`
        if (!ogaIdx.has(k)) ogaIdx.set(k, [])
        ogaIdx.get(k).push(o)
      }
    }
  }

  // Match each DB-klub → best OGA-course
  const candidates = []
  let progress = 0
  for (const [key, group] of dbByClub) {
    progress++
    if (progress % 1000 === 0) console.log(`  match ${progress}/${dbByClub.size}…`)

    const rep = group.rows.find((r) => r.latitude != null) || group.rows[0]
    if (rep.latitude == null) {
      candidates.push({ dbClubKey: key, dbClub: group.club, dbRowCount: group.rows.length, dbRows: group.rows.map(toMinRow), bucket: 'no_match' })
      continue
    }

    // Search candidate OGA-courses in spatial neighborhood (any state)
    const latG = Math.floor(rep.latitude * 2)
    const lngG = Math.floor(rep.longitude * 2)
    const candPool = new Set()
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const stateCode of US_STATE_CODES) {
          const k = `${stateCode}|${latG + dx}|${lngG + dy}`
          if (ogaIdx.has(k)) {
            for (const c of ogaIdx.get(k)) candPool.add(c)
          }
        }
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
        const s1 = sim(r.club, o.name)
        if (s1 > s) s = s1
        const s2 = sim(r.name, o.name)
        if (s2 > s) s = s2
      }
      if (s < 0.45) continue
      const score = s - Math.min(dist / 50000, 0.2)
      const cand = { oga: o, sim: s, dist, score }
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
        oga_id: best.oga.oga_id, name: best.oga.name, state: best.oga.state,
        latitude: best.oga.latitude, longitude: best.oga.longitude,
        website: best.oga.website, phone: best.oga.phone,
        sim: best.sim, dist: Math.round(best.dist),
      } : null,
      runnerUp: runnerUp ? {
        name: runnerUp.oga.name, sim: runnerUp.sim, dist: Math.round(runnerUp.dist),
      } : null,
    })
  }

  // Chain-twin dedup: highest scorer claims OGA-record
  const usedOgaIds = new Set()
  candidates.sort((a, b) => (b.best?.sim || 0) - (a.best?.sim || 0))
  for (const c of candidates) {
    if (!c.best) continue
    if (usedOgaIds.has(c.best.oga_id)) {
      c.dedup_demoted_from = c.best
      c.best = null
      c.bucket = 'dedup_lost'
    } else {
      usedOgaIds.add(c.best.oga_id)
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

  writeFileSync(CANDIDATES_PATH, JSON.stringify({ candidates, counts }, null, 2), 'utf8')

  console.log('\n=== Match summary ===')
  console.log(`  High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  console.log(`Wrote ${CANDIDATES_PATH}`)

  // Markdown report (sample of high + counts)
  const lines = ['# USA match report', '', `Generated: ${new Date().toISOString()}`, '']
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- OGA courses: ${ogaCourses.length}`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  lines.push('')
  lines.push('## HIGH sample (first 25)')
  lines.push('| DB club | rows | OGA name | sim | dist (m) | web | phone |')
  lines.push('|---|---|---|---|---|---|---|')
  const highs = candidates.filter((c) => c.bucket === 'high').slice(0, 25)
  for (const c of highs) {
    lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || ''} | ${c.best?.sim?.toFixed(2)} | ${c.best?.dist} | ${c.best?.website ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} |`)
  }
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')
}

function toMinRow(r) {
  return {
    id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
    website: r.website, phone: r.phone, holes: r.holes,
    is_combo: r.is_combo, is_displayed: r.is_displayed, address: r.address,
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
