// Read-only token-match between ark Germany clubs and Supabase courses (Germany).
// Run with: node --env-file=.env.local scripts/germany/refresh-match.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const ARK_PATH = 'scripts/germany/germany-clubs-thomas.json'
const OUT_PATH = 'scripts/germany/match-result-session18.json'

const STOPWORDS = new Set([
  'golf', 'club', 'golfclub', 'golfanlage', 'golfresort', 'golfpark',
  'gcc', 'ev', 'der', 'die', 'das', 'am', 'im', 'auf', 'zu', 'von',
])

function fold(s) {
  if (!s) return ''
  return s
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

function tokenize(name) {
  const folded = fold(name)
  const out = new Set()
  for (const w of folded.split(/[^a-z0-9]+/)) {
    if (w.length >= 4 && !STOPWORDS.has(w)) out.add(w)
  }
  return out
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// 1. Read ark JSON (file contains bare NaN literals — sanitize before parse).
const arkRaw = readFileSync(ARK_PATH, 'utf8').replace(/:\s*NaN/g, ':null')
const arkClubs = JSON.parse(arkRaw)
console.log(`Ark clubs: ${arkClubs.length}`)

// Note: arkClubs[].klubnavn_ascii uses simple ascii folding (ö→o, ü→u),
// which conflicts with the German folding (ö→oe, ü→ue) we apply DB-side.
// Always tokenize from c.klubnavn so both sides use identical folding.
const arkIndex = arkClubs.map((c) => ({
  klubnavn: c.klubnavn,
  tokens: tokenize(c.klubnavn),
}))

// 2. Fetch all Germany rows (paginated).
const SELECT = 'id, club, name, address, website, phone, holes, par, latitude, longitude, is_combo, golfapi_id'
const dbRows = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select(SELECT)
    .eq('country', 'Germany')
    .order('id', { ascending: true })
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  dbRows.push(...data)
  offset += data.length
  if (data.length < 1000) break
}
console.log(`DB rows (Germany): ${dbRows.length}`)

// 3. Group DB rows by club name.
const dbByClub = new Map()
for (const r of dbRows) {
  if (!dbByClub.has(r.club)) dbByClub.set(r.club, [])
  dbByClub.get(r.club).push(r)
}

// 4. Token-match: for each DB club, find ark clubs sharing ≥1 token.
const exact = []
const dbNoMatchClubs = []
const arkMatched = new Set()

for (const [club, rows] of dbByClub) {
  const dbTokens = tokenize(club)
  const matchedArk = []
  for (const a of arkIndex) {
    let shared = false
    for (const t of dbTokens) {
      if (a.tokens.has(t)) { shared = true; break }
    }
    if (shared) matchedArk.push(a.klubnavn)
  }
  if (matchedArk.length === 0) {
    dbNoMatchClubs.push({ club, rows })
  } else {
    const rowIds = rows.map((r) => r.id)
    for (const ark of matchedArk) {
      arkMatched.add(ark)
      exact.push({ ark_klubnavn: ark, db_club: club, row_ids: rowIds })
    }
  }
}

const arkNoMatch = arkClubs
  .map((c) => c.klubnavn)
  .filter((name) => !arkMatched.has(name))

const dbNoMatch = []
for (const { rows } of dbNoMatchClubs) {
  for (const r of rows) {
    dbNoMatch.push({
      id: r.id,
      club: r.club,
      name: r.name,
      address: r.address,
      website: r.website,
      phone: r.phone,
      holes: r.holes,
      par: r.par,
      latitude: r.latitude,
      longitude: r.longitude,
      is_combo: r.is_combo,
      golfapi_id: r.golfapi_id,
    })
  }
}

const summary = {
  db_total_rows: dbRows.length,
  db_unique_clubs: dbByClub.size,
  exact_clubs: exact.length,
  ark_no_match: arkNoMatch.length,
  db_no_match_clubs: dbNoMatchClubs.length,
  db_no_match_rows: dbNoMatch.length,
}

const result = { summary, exact, ark_no_match: arkNoMatch, db_no_match: dbNoMatch }

writeFileSync(OUT_PATH, JSON.stringify(result, null, 2))

console.log('--- Summary ---')
console.log(`db_total_rows:     ${summary.db_total_rows}`)
console.log(`db_unique_clubs:   ${summary.db_unique_clubs}`)
console.log(`exact_clubs:       ${summary.exact_clubs}`)
console.log(`ark_no_match:      ${summary.ark_no_match}`)
console.log(`db_no_match_clubs: ${summary.db_no_match_clubs}`)
console.log(`db_no_match_rows:  ${summary.db_no_match_rows}`)
console.log(`Wrote: ${OUT_PATH}`)
