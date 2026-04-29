// Match Belgian OSM clubs against Supabase courses (country=Belgium).
// Read-only. Writes match-result-belgium.json + match-report-belgium.md.
// Run: node --env-file=.env.local scripts/belgium/match-belgium.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OSM_PATH = 'scripts/belgium/belgium-clubs-osm.json'
const RESULT_PATH = 'scripts/belgium/match-result-belgium.json'
const REPORT_PATH = 'scripts/belgium/match-report-belgium.md'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const STOPWORDS = new Set([
  'golf', 'club', 'golfclub', 'country', 'links', 'resort', 'course',
  'royal', 'koninklijke', 'asbl', 'vzw',
  'baan', 'banen', 'park', 'parc',
])

// Mirror Postgres immutable_unaccent: NFD-decompose then strip combining marks.
function unaccent(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function normName(s) {
  if (!s) return ''
  return unaccent(s).toLowerCase().replace(/\s+/g, ' ').trim()
}

function tokenize(s) {
  const folded = unaccent(String(s || '')).toLowerCase()
  const out = new Set()
  for (const w of folded.split(/[^a-z0-9]+/)) {
    if (w.length >= 4 && !STOPWORDS.has(w)) out.add(w)
  }
  return out
}

// 1. Read OSM
const osmClubs = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
console.log(`OSM clubs:        ${osmClubs.length}`)

// 2. Fetch Belgium DB rows
const SELECT = 'id, club, name, address, website, phone, holes, par, latitude, longitude, is_combo, golfapi_id'
const dbRows = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select(SELECT)
    .eq('country', 'Belgium')
    .order('id', { ascending: true })
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  dbRows.push(...data)
  offset += data.length
  if (data.length < 1000) break
}
console.log(`DB rows (BE):     ${dbRows.length}`)

// 3. Group DB rows by club
const dbByClub = new Map() // club → { rows, norm, tokens }
for (const r of dbRows) {
  const club = r.club || ''
  if (!dbByClub.has(club)) {
    dbByClub.set(club, { rows: [], norm: normName(club), tokens: tokenize(club) })
  }
  dbByClub.get(club).rows.push(r)
}
console.log(`DB unique clubs:  ${dbByClub.size}`)

// 4. Pre-compute OSM normalisations
const osmIndex = osmClubs.map((o) => ({
  ...o,
  norm: normName(o.name),
  tokens: tokenize(o.name),
}))

// 5. Match: for each OSM club, find best DB club
const exact = []        // { osm_name, db_club, row_ids }
const fuzzy = []        // { osm_name, db_club, shared_tokens, row_ids }
const osmOnly = []      // OSM entries with no DB match
const matchedDbClubs = new Set()

for (const o of osmIndex) {
  // Try exact normalised match first
  let exactHit = null
  for (const [club, info] of dbByClub) {
    if (info.norm && info.norm === o.norm) { exactHit = { club, info }; break }
  }
  if (exactHit) {
    exact.push({
      osm_name: o.name,
      db_club: exactHit.club,
      row_ids: exactHit.info.rows.map((r) => r.id),
    })
    matchedDbClubs.add(exactHit.club)
    continue
  }
  // Fuzzy: best token-overlap
  let best = null
  for (const [club, info] of dbByClub) {
    if (!info.tokens.size || !o.tokens.size) continue
    let shared = 0
    const sharedTokens = []
    for (const t of o.tokens) {
      if (info.tokens.has(t)) { shared++; sharedTokens.push(t) }
    }
    if (shared < 1) continue
    if (!best || shared > best.shared) {
      best = { club, info, shared, sharedTokens }
    } else if (shared === best.shared && club < best.club) {
      best = { club, info, shared, sharedTokens }
    }
  }
  if (best) {
    fuzzy.push({
      osm_name: o.name,
      db_club: best.club,
      shared_tokens: best.sharedTokens,
      row_ids: best.info.rows.map((r) => r.id),
    })
    matchedDbClubs.add(best.club)
  } else {
    osmOnly.push({
      name: o.name,
      lat: o.lat,
      lon: o.lon,
      website: o.website,
      address: o.address,
    })
  }
}

// 6. db_only = DB clubs with no match
const dbOnly = []
for (const [club, info] of dbByClub) {
  if (matchedDbClubs.has(club)) continue
  dbOnly.push({
    club,
    rows: info.rows.map((r) => ({
      id: r.id,
      club: r.club,
      name: r.name,
      holes: r.holes,
      is_combo: r.is_combo,
    })),
  })
}

const summary = {
  osm_clubs: osmClubs.length,
  db_total_rows: dbRows.length,
  db_unique_clubs: dbByClub.size,
  exact: exact.length,
  fuzzy: fuzzy.length,
  osm_only: osmOnly.length,
  db_only_clubs: dbOnly.length,
  db_only_rows: dbOnly.reduce((n, c) => n + c.rows.length, 0),
}

const result = { summary, exact, fuzzy, osm_only: osmOnly, db_only: dbOnly }
writeFileSync(RESULT_PATH, JSON.stringify(result, null, 2))

// 7. Report
const lines = []
lines.push('# Belgium match report')
lines.push('')
lines.push('## Oversigt')
lines.push('')
lines.push('| Kategori | Antal |')
lines.push('|---|---:|')
lines.push(`| OSM clubs | ${summary.osm_clubs} |`)
lines.push(`| DB rows (Belgium) | ${summary.db_total_rows} |`)
lines.push(`| DB unique clubs | ${summary.db_unique_clubs} |`)
lines.push(`| Exact matches | ${summary.exact} |`)
lines.push(`| Fuzzy matches | ${summary.fuzzy} |`)
lines.push(`| OSM-only (mangler i DB) | ${summary.osm_only} |`)
lines.push(`| DB-only clubs (junk-kandidater) | ${summary.db_only_clubs} |`)
lines.push(`| DB-only rows | ${summary.db_only_rows} |`)
lines.push('')

lines.push('## DB-only — junk-kandidater / ukendte klubber')
lines.push('')
if (dbOnly.length === 0) {
  lines.push('_Ingen._')
} else {
  for (const c of dbOnly) {
    lines.push(`### ${c.club || '(empty)'}`)
    lines.push('')
    lines.push('| id | club | name | holes | is_combo |')
    lines.push('|---|---|---|---:|---|')
    for (const r of c.rows) {
      const id = r.id
      const club = (r.club || '').replace(/\|/g, '\\|')
      const name = (r.name || '').replace(/\|/g, '\\|')
      lines.push(`| ${id} | ${club} | ${name} | ${r.holes ?? ''} | ${r.is_combo ? 'true' : 'false'} |`)
    }
    lines.push('')
  }
}

lines.push('## OSM-only — mulige manglende baner')
lines.push('')
if (osmOnly.length === 0) {
  lines.push('_Ingen._')
} else {
  lines.push('| OSM-navn | lat | lon | website |')
  lines.push('|---|---|---|---|')
  for (const o of osmOnly) {
    const w = o.website ? `[link](${o.website})` : ''
    lines.push(`| ${o.name.replace(/\|/g, '\\|')} | ${o.lat ?? ''} | ${o.lon ?? ''} | ${w} |`)
  }
}
lines.push('')

lines.push('## Fuzzy matches')
lines.push('')
if (fuzzy.length === 0) {
  lines.push('_Ingen._')
} else {
  lines.push('| OSM-navn | DB club | Delte tokens | DB rows |')
  lines.push('|---|---|---|---:|')
  for (const f of fuzzy) {
    const tokens = f.shared_tokens.join(', ')
    lines.push(`| ${f.osm_name.replace(/\|/g, '\\|')} | ${f.db_club.replace(/\|/g, '\\|')} | ${tokens} | ${f.row_ids.length} |`)
  }
}
lines.push('')

writeFileSync(REPORT_PATH, lines.join('\n'))

console.log('')
console.log('--- Summary ---')
console.log(`exact:         ${summary.exact}`)
console.log(`fuzzy:         ${summary.fuzzy}`)
console.log(`osm_only:      ${summary.osm_only}`)
console.log(`db_only clubs: ${summary.db_only_clubs}  (${summary.db_only_rows} rows)`)
console.log(`Wrote: ${RESULT_PATH}`)
console.log(`Wrote: ${REPORT_PATH}`)
