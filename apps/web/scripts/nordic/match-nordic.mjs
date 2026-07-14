// Match GolfBox Nordic data against DB rows.
//
// Klub-niveau aggregering. Per-land kørsel via env CC=DK|IS|NO|SE.
// AND-policy: sim ≥0.85 AND coord-dist ≤500m for HIGH; ≥0.78 + ≤1500m for MEDIUM.
//
// Run: CC=DK node --env-file=.env.local scripts/nordic/match-nordic.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CC = process.env.CC || 'DK'
const COUNTRY_NAME = { DK: 'Denmark', IS: 'Iceland', NO: 'Norway', SE: 'Sweden' }[CC]
if (!COUNTRY_NAME) throw new Error(`Unknown CC=${CC}`)

const FED_PATH = `scripts/nordic/golfbox-clubs-${CC.toLowerCase()}.json`
const REPORT_PATH = `scripts/nordic/${CC.toLowerCase()}-match-report.md`
const CANDIDATES_PATH = `scripts/nordic/${CC.toLowerCase()}-match-candidates.json`

const haversine = (la1, lo1, la2, lo2) => {
  if ([la1, lo1, la2, lo2].some((v) => v == null || Number.isNaN(v))) return Infinity
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(la2 - la1)
  const dLon = toRad(lo2 - lo1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(la1)) * Math.cos(toRad(la2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

// Nordic stopwords. Inkluderer ikke by-navne.
const STOPWORDS = [
  'golf', 'golfklubb', 'golfklub', 'golfklubben', 'golfklúbbur', 'golfklúbburinn',
  'klub', 'klubb', 'klúbbur', 'club', 'gc', 'gk',
  'country', 'resort', 'park', 'links',
  'i', 'ii', 'iii',
  'a', 'aps', 'as', 'ab',
  'the', 'den', 'det', 'de', 'och',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[æø]/g, (c) => c === 'æ' ? 'ae' : 'oe')
    .replace(/å/g, 'aa')
    .replace(/ß/g, 'ss')
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
  if (A.length >= 3 && B.includes(A)) return 0.95
  if (B.length >= 3 && A.includes(B)) return 0.95
  const bA = bigrams(A.replace(/\s+/g, ''))
  const bB = bigrams(B.replace(/\s+/g, ''))
  if (!bA.size || !bB.size) return 0
  let inter = 0
  for (const x of bA) if (bB.has(x)) inter++
  return (2 * inter) / (bA.size + bB.size)
}

async function fetchCourses() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('country', COUNTRY_NAME)
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  return all
}

function findBestMatch(dbRow, fedClubs) {
  let best = null, runnerUp = null
  for (const f of fedClubs) {
    const s = sim(dbRow.club, f.name)
    if (s < 0.40) continue
    let dist = Infinity
    if (dbRow.latitude != null && dbRow.longitude != null && f.lat && f.lng) {
      dist = haversine(dbRow.latitude, dbRow.longitude, f.lat, f.lng)
    }
    const score = s - (dist === Infinity ? 0 : Math.min(dist / 50000, 0.2))
    const cand = { fed: f, sim: s, dist, score }
    if (!best || cand.score > best.score || (cand.score === best.score && cand.sim > best.sim)) {
      runnerUp = best
      best = cand
    } else if (!runnerUp || cand.score > runnerUp.score) {
      runnerUp = cand
    }
  }
  return { best, runnerUp }
}

function bucket(cand) {
  if (!cand) return 'no_match'
  const { sim: s, dist } = cand
  if (s >= 0.90 && dist <= 500) return 'high'
  if (s >= 0.95 && dist === Infinity) return 'high'
  if (s >= 0.78 && dist <= 1500) return 'medium'
  if (s >= 0.92 && dist === Infinity) return 'medium'
  if (s >= 0.85 && dist > 1500) return 'coord_bug'
  return 'low'
}

async function main() {
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  const db = await fetchCourses()
  console.log(`${CC}: fed=${fed.length} dbRows=${db.length}`)

  const dbByClub = new Map()
  for (const r of db) {
    const k = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(k)) dbByClub.set(k, { key: k, club: r.club, rows: [] })
    dbByClub.get(k).rows.push(r)
  }

  const candidates = []
  const counts = { high: 0, medium: 0, coord_bug: 0, low: 0, no_match: 0 }
  for (const [, group] of dbByClub) {
    const rep = group.rows.find((r) => r.latitude != null) || group.rows[0]
    const { best, runnerUp } = findBestMatch(rep, fed)
    const b = bucket(best)
    counts[b]++
    candidates.push({
      dbClub: group.club,
      dbRowCount: group.rows.length,
      dbRows: group.rows.map((r) => ({
        id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
        website: r.website, email: r.email, phone: r.phone, holes: r.holes, address: r.address,
      })),
      bucket: b,
      best: best ? {
        guid: best.fed.guid, name: best.fed.name,
        website: best.fed.website, email: best.fed.email, phone: best.fed.phone,
        lat: best.fed.lat, lng: best.fed.lng,
        sim: best.sim, dist: best.dist === Infinity ? null : Math.round(best.dist),
      } : null,
      runnerUp: runnerUp ? { name: runnerUp.fed.name, sim: runnerUp.sim, dist: runnerUp.dist === Infinity ? null : Math.round(runnerUp.dist) } : null,
    })
  }
  candidates.sort((a, b) => {
    const order = { high: 0, medium: 1, coord_bug: 2, low: 3, no_match: 4 }
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.sim || 0) - (a.best?.sim || 0)
  })
  writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2), 'utf8')
  // Report
  const lines = [`# ${COUNTRY_NAME} GolfBox match report`, '', `Generated: ${new Date().toISOString()}`, '']
  lines.push(`- DB clubs: ${dbByClub.size} | Federation: ${fed.length}`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Coord-bug: ${counts.coord_bug} | Low: ${counts.low} | No-match: ${counts.no_match}`)
  lines.push('')
  for (const b of ['high', 'medium', 'coord_bug', 'low', 'no_match']) {
    const items = candidates.filter((c) => c.bucket === b)
    if (!items.length) continue
    lines.push(`## ${b.toUpperCase()} (${items.length})`)
    lines.push('')
    lines.push('| DB club | rows | GolfBox name | sim | dist | ws | em | ph |')
    lines.push('|---|---|---|---|---|---|---|---|')
    for (const c of items) {
      lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || '—'} | ${c.best?.sim?.toFixed(2) || ''} | ${c.best?.dist ?? ''} | ${c.best?.website ? 'Y' : ''} | ${c.best?.email ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} |`)
    }
    lines.push('')
  }
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')
  console.log(`${CC} match: ${JSON.stringify(counts)}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
