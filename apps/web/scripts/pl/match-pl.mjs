// Match PZG (Polen) federation klubs against DB courses.
//
// PZG eksponerer KUN navn + website (ingen coords/email/phone). Match er
// derfor name-only fuzzy match med polske stopwords. Confidence-buckets:
//   high   → sim ≥ 0.92
//   medium → sim ≥ 0.75
//   low    → ellers
//
// Run: node --env-file=.env.local scripts/pl/match-pl.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const FED_PATH = 'scripts/pl/pl-clubs-pzg.json'
const REPORT_PATH = 'scripts/pl/pl-match-report.md'
const CANDIDATES_PATH = 'scripts/pl/pl-match-candidates.json'

const PL_STOPWORDS = [
  'golf', 'klub', 'klubu', 'klubowy', 'klubowa', 'club', 'gc',
  'country', 'resort', 'park',
  'i', 'ii', 'iii', '1', '1st',
  'sp', 'spzoo', 'sa',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(new RegExp(`\\b(${PL_STOPWORDS.join('|')})\\b`, 'g'), '')
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

async function fetchPolishCourses() {
  const { data, error } = await sb
    .from('courses')
    .select('*')
    .eq('country', 'Poland')
  if (error) throw error
  return data
}

function bucket(s) {
  if (s >= 0.92) return 'high'
  if (s >= 0.75) return 'medium'
  if (s >= 0.55) return 'low'
  return 'no_match'
}

async function main() {
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  console.log(`PZG klubs: ${fed.length}`)
  const db = await fetchPolishCourses()
  console.log(`DB rows: ${db.length}`)
  // Group DB by club_normalized
  const dbByClub = new Map()
  for (const r of db) {
    const k = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(k)) dbByClub.set(k, { key: k, club: r.club, rows: [] })
    dbByClub.get(k).rows.push(r)
  }
  console.log(`DB unique clubs: ${dbByClub.size}`)

  const candidates = []
  const counts = { high: 0, medium: 0, low: 0, no_match: 0 }
  for (const [, group] of dbByClub) {
    let best = null, runnerUp = null
    for (const f of fed) {
      const s = sim(group.club, f.name)
      if (s < 0.40) continue
      const c = { fed: f, sim: s }
      if (!best || s > best.sim) { runnerUp = best; best = c }
      else if (!runnerUp || s > runnerUp.sim) runnerUp = c
    }
    const b = bucket(best?.sim || 0)
    counts[b]++
    candidates.push({
      dbClub: group.club,
      dbRowCount: group.rows.length,
      dbRows: group.rows.map((r) => ({ id: r.id, name: r.name, website: r.website })),
      bucket: b,
      best: best ? { name: best.fed.name, website: best.fed.website, sim: best.sim } : null,
      runnerUp: runnerUp ? { name: runnerUp.fed.name, sim: runnerUp.sim } : null,
    })
  }
  candidates.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2, no_match: 3 }
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.sim || 0) - (a.best?.sim || 0)
  })
  writeFileSync(CANDIDATES_PATH, JSON.stringify(candidates, null, 2), 'utf8')

  // Report
  const lines = ['# Poland match report', '', `Generated: ${new Date().toISOString()}`, '']
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- PZG klubs: ${fed.length}`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | No-match: ${counts.no_match}`)
  lines.push('')
  for (const b of ['high', 'medium', 'low', 'no_match']) {
    const items = candidates.filter((c) => c.bucket === b)
    if (!items.length) continue
    lines.push(`## ${b.toUpperCase()} (${items.length})`)
    lines.push('')
    lines.push('| DB club | rows | PZG name | sim | website |')
    lines.push('|---|---|---|---|---|')
    for (const c of items) {
      lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || '—'} | ${c.best?.sim?.toFixed(2) || ''} | ${c.best?.website || ''} |`)
    }
    lines.push('')
  }
  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')

  console.log(`Match summary: ${JSON.stringify(counts)}`)
  console.log(`Wrote ${CANDIDATES_PATH}, ${REPORT_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
