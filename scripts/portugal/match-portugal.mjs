// Trin 4: match Portugal DB-rækker mod FPG-scrapen.
// Read-only. Skriver match-result-portugal.json + match-report-portugal.md.
// Run: node --env-file=../../.env.local scripts/portugal/match-portugal.mjs
// (eller pegende på workspace-roden hvis kørt fra parent-repoet)

import { readFileSync, writeFileSync } from 'node:fs'

const FPG_PATH = 'scripts/portugal/portugal-clubs-fpg.json'
const RESULT_PATH = 'scripts/portugal/match-result-portugal.json'
const REPORT_PATH = 'scripts/portugal/match-report-portugal.md'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// ---- Helpers -----------------------------------------------------------------

function unaccent(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

// Lowercase + trim + collapse whitespace. Used for tier 1.
function lower(s) {
  return (s || '').toLowerCase().replace(/\s+/g, ' ').trim()
}

// Tier-2 normalisation: unaccent + lower + strip non-alphanumerics-with-spaces.
function norm(s) {
  if (!s) return ''
  return unaccent(s).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim()
}

async function fetchAllPortugalCourses() {
  const select = 'id,name,club,country,holes,par,website,phone,golfapi_id,is_combo'
  const rows = []
  let offset = 0
  const pageSize = 1000
  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/courses?country=eq.Portugal&select=${select}&order=club.asc,name.asc&limit=${pageSize}&offset=${offset}`
    const resp = await fetch(url, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: 'application/json',
      },
    })
    if (!resp.ok) {
      console.error(`Supabase fetch failed: ${resp.status} ${resp.statusText}`)
      console.error(await resp.text())
      process.exit(1)
    }
    const page = await resp.json()
    rows.push(...page)
    if (page.length < pageSize) break
    offset += pageSize
  }
  return rows
}

// ---- Step 1: read + dedup FPG -----------------------------------------------

const fpgAll = JSON.parse(readFileSync(FPG_PATH, 'utf8'))
const seenN = new Set()
const fpg = []
for (const f of fpgAll) {
  if (seenN.has(f.ncourse_id)) continue
  seenN.add(f.ncourse_id)
  fpg.push(f)
}
console.log(`FPG entries (raw):    ${fpgAll.length}`)
console.log(`FPG entries (unique): ${fpg.length}`)

// Pre-compute FPG normalisations for matching.
const fpgIndex = fpg.map((f) => ({
  ...f,
  _lower: lower(f.club_name),
  _norm: norm(f.club_name),
}))

// ---- Step 2: pull DB ---------------------------------------------------------

console.log('Fetching DB rows (country=Portugal)...')
const dbRows = await fetchAllPortugalCourses()
console.log(`DB rows (PT):         ${dbRows.length}`)

// Group DB rows by club name (the matching key).
const dbByClub = new Map() // clubKey → { club, rows, _lower, _norm }
for (const r of dbRows) {
  const club = r.club || ''
  if (!dbByClub.has(club)) {
    dbByClub.set(club, {
      club,
      rows: [],
      _lower: lower(club),
      _norm: norm(club),
    })
  }
  dbByClub.get(club).rows.push(r)
}
console.log(`DB unique clubs:      ${dbByClub.size}`)

// ---- Step 3: 3-tier matching ------------------------------------------------
//
// Priority (per spec):
//   1. Exact (case-insensitive, trimmed)        → EXACT
//   2. Normalized (unaccent + lowercase)        → EXACT
//   3. Partial: one name contains the other     → FUZZY
//   4. Otherwise                                → DB_ONLY / FPG_ONLY
//
// We match per DB-club (not per row) since all rows of a club share the name.
// Each FPG entry can only consume one DB-club; ties broken by tier then by
// shorter normalized-length difference.

const STOPWORDS_NORM = new Set(['golf', 'club', 'course', 'resort', 'campo', 'campo de golfe'])
const FUZZY_MIN_LEN = 6 // shorter string must be at least this long after norm

function isContainsMatch(a, b) {
  // a,b are already normalised strings.
  if (!a || !b) return false
  if (a === b) return false // handled by exact tier
  const [shortS, longS] = a.length <= b.length ? [a, b] : [b, a]
  if (shortS.length < FUZZY_MIN_LEN) return false
  if (STOPWORDS_NORM.has(shortS)) return false
  // Word-boundary containment: avoid matching "golf" inside "golfino" etc.
  const padded = ` ${longS} `
  return padded.includes(` ${shortS} `) || longS.startsWith(shortS + ' ') || longS.endsWith(' ' + shortS)
}

const exact = []     // { db_club, fpg_club, ncourse_id, region, tier, row_ids }
const fuzzy = []     // { db_club, fpg_club, ncourse_id, region, note, row_ids }
const matchedDbClubs = new Set()
const matchedFpgIds = new Set()

// Tier 1: case-insensitive trimmed equality.
for (const [dbClub, dbInfo] of dbByClub) {
  if (matchedDbClubs.has(dbClub)) continue
  if (!dbInfo._lower) continue
  for (const f of fpgIndex) {
    if (matchedFpgIds.has(f.ncourse_id)) continue
    if (dbInfo._lower === f._lower) {
      exact.push({
        db_club: dbClub,
        fpg_club: f.club_name,
        ncourse_id: f.ncourse_id,
        region: f.region,
        tier: 'tier1-lower',
        row_ids: dbInfo.rows.map((r) => r.id),
      })
      matchedDbClubs.add(dbClub)
      matchedFpgIds.add(f.ncourse_id)
      break
    }
  }
}

// Tier 2: unaccent + lowercase equality.
for (const [dbClub, dbInfo] of dbByClub) {
  if (matchedDbClubs.has(dbClub)) continue
  if (!dbInfo._norm) continue
  for (const f of fpgIndex) {
    if (matchedFpgIds.has(f.ncourse_id)) continue
    if (dbInfo._norm === f._norm) {
      exact.push({
        db_club: dbClub,
        fpg_club: f.club_name,
        ncourse_id: f.ncourse_id,
        region: f.region,
        tier: 'tier2-norm',
        row_ids: dbInfo.rows.map((r) => r.id),
      })
      matchedDbClubs.add(dbClub)
      matchedFpgIds.add(f.ncourse_id)
      break
    }
  }
}

// Tier 3: one normalised name contains the other (best/longest shared substring length).
for (const [dbClub, dbInfo] of dbByClub) {
  if (matchedDbClubs.has(dbClub)) continue
  if (!dbInfo._norm) continue
  let best = null
  for (const f of fpgIndex) {
    if (matchedFpgIds.has(f.ncourse_id)) continue
    if (!isContainsMatch(dbInfo._norm, f._norm)) continue
    const candLen = Math.min(dbInfo._norm.length, f._norm.length)
    if (!best || candLen > best.candLen) best = { f, candLen }
  }
  if (best) {
    const direction = dbInfo._norm.length <= best.f._norm.length ? 'DB ⊂ FPG' : 'FPG ⊂ DB'
    fuzzy.push({
      db_club: dbClub,
      fpg_club: best.f.club_name,
      ncourse_id: best.f.ncourse_id,
      region: best.f.region,
      note: `${direction}; matched ${best.candLen} chars`,
      row_ids: dbInfo.rows.map((r) => r.id),
    })
    matchedDbClubs.add(dbClub)
    matchedFpgIds.add(best.f.ncourse_id)
  }
}

// ---- Step 4: leftover buckets ------------------------------------------------

const dbOnly = [] // [{ club, rows: [{ id, name, holes, par, golfapi_id, is_combo, website, phone }] }]
for (const [dbClub, dbInfo] of dbByClub) {
  if (matchedDbClubs.has(dbClub)) continue
  dbOnly.push({
    club: dbClub,
    rows: dbInfo.rows.map((r) => ({
      id: r.id,
      name: r.name,
      holes: r.holes,
      par: r.par,
      golfapi_id: r.golfapi_id,
      is_combo: r.is_combo,
      website: r.website,
      phone: r.phone,
    })),
  })
}
dbOnly.sort((a, b) => (a.club || '').localeCompare(b.club || ''))

const fpgOnly = fpgIndex
  .filter((f) => !matchedFpgIds.has(f.ncourse_id))
  .map((f) => ({
    club_name: f.club_name,
    ncourse_id: f.ncourse_id,
    region: f.region,
    website: f.website,
    city: f.city,
    district: f.district,
  }))
fpgOnly.sort((a, b) => (a.region || '').localeCompare(b.region || '') || a.club_name.localeCompare(b.club_name))

// ---- Step 5: write JSON + Markdown ------------------------------------------

const summary = {
  fpg_unique: fpg.length,
  db_total_rows: dbRows.length,
  db_unique_clubs: dbByClub.size,
  exact: exact.length,
  fuzzy: fuzzy.length,
  db_only_clubs: dbOnly.length,
  db_only_rows: dbOnly.reduce((n, c) => n + c.rows.length, 0),
  fpg_only: fpgOnly.length,
}

const result = { summary, exact, fuzzy, db_only: dbOnly, fpg_only: fpgOnly }
writeFileSync(RESULT_PATH, JSON.stringify(result, null, 2))

const lines = []
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|')

lines.push('# Portugal match report')
lines.push('')
lines.push('Trin 4: kortlæg DB-rækker (country=Portugal) mod FPG-scrapen.')
lines.push('Database er **ikke ændret**.')
lines.push('')

lines.push('## Oversigt')
lines.push('')
lines.push('| Kategori | Antal |')
lines.push('|---|---:|')
lines.push(`| FPG-klubber (unikke ncourse_id) | ${summary.fpg_unique} |`)
lines.push(`| DB-rækker (Portugal) | ${summary.db_total_rows} |`)
lines.push(`| DB unikke klub-navne | ${summary.db_unique_clubs} |`)
lines.push(`| EXACT matches | ${summary.exact} |`)
lines.push(`| FUZZY matches (manuel review) | ${summary.fuzzy} |`)
lines.push(`| DB_ONLY klubber (ikke i FPG) | ${summary.db_only_clubs} (${summary.db_only_rows} rækker) |`)
lines.push(`| FPG_ONLY (mangler i DB) | ${summary.fpg_only} |`)
lines.push('')

lines.push('## EXACT matches')
lines.push('')
if (exact.length === 0) {
  lines.push('_Ingen._')
} else {
  lines.push('| DB club | FPG club_name | ncourse | Region | Tier | DB rows |')
  lines.push('|---|---|---|---|---|---:|')
  for (const e of exact) {
    lines.push(
      `| ${esc(e.db_club)} | ${esc(e.fpg_club)} | ${e.ncourse_id} | ${esc(e.region)} | ${e.tier} | ${e.row_ids.length} |`
    )
  }
}
lines.push('')

lines.push('## FUZZY matches (manuel review)')
lines.push('')
if (fuzzy.length === 0) {
  lines.push('_Ingen._')
} else {
  lines.push('| DB club | FPG club_name | ncourse | Region | Note | DB rows |')
  lines.push('|---|---|---|---|---|---:|')
  for (const f of fuzzy) {
    lines.push(
      `| ${esc(f.db_club)} | ${esc(f.fpg_club)} | ${f.ncourse_id} | ${esc(f.region)} | ${esc(f.note)} | ${f.row_ids.length} |`
    )
  }
}
lines.push('')

lines.push('## DB_ONLY — i DB men ingen FPG-match')
lines.push('')
lines.push('Sandsynligt: resorts/private/par-3-baner som ikke er listet på FPG.')
lines.push('Manuel inspektion af `holes`/`is_combo`/`golfapi_id` afslører junk-kandidater.')
lines.push('')
if (dbOnly.length === 0) {
  lines.push('_Ingen._')
} else {
  for (const c of dbOnly) {
    lines.push(`### ${c.club || '(empty)'}`)
    lines.push('')
    lines.push('| id | name | holes | par | is_combo | golfapi_id |')
    lines.push('|---|---|---:|---:|---|---|')
    for (const r of c.rows) {
      lines.push(
        `| ${r.id} | ${esc(r.name)} | ${r.holes ?? ''} | ${r.par ?? ''} | ${r.is_combo ? 'true' : 'false'} | ${esc(r.golfapi_id || '')} |`
      )
    }
    lines.push('')
  }
}

lines.push('## FPG_ONLY — i FPG men ikke i DB')
lines.push('')
lines.push('Sandsynligt manglende klubber. Kandidater til import.')
lines.push('')
if (fpgOnly.length === 0) {
  lines.push('_Ingen._')
} else {
  lines.push('| FPG club_name | Region | District | City | Website |')
  lines.push('|---|---|---|---|---|')
  for (const f of fpgOnly) {
    const w = f.website ? `[link](${f.website})` : ''
    lines.push(
      `| ${esc(f.club_name)} | ${esc(f.region)} | ${esc(f.district)} | ${esc(f.city)} | ${w} |`
    )
  }
}
lines.push('')

writeFileSync(REPORT_PATH, lines.join('\n'))

console.log('')
console.log('--- Summary ---')
console.log(`exact:           ${summary.exact}`)
console.log(`fuzzy:           ${summary.fuzzy}`)
console.log(`db_only:         ${summary.db_only_clubs} klubber (${summary.db_only_rows} rækker)`)
console.log(`fpg_only:        ${summary.fpg_only}`)
console.log(`Wrote: ${RESULT_PATH}`)
console.log(`Wrote: ${REPORT_PATH}`)
