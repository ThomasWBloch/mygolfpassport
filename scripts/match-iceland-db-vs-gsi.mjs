// Classify every Iceland DB course against the GSÍ scrape.
// Reports to scripts/iceland-match-report.md. Read-only against DB.
//
// Categories (processed in order of confidence):
//   1. EXACT       — raw DB.name == raw GSÍ.name
//   2. NORMALIZED  — normalize(DB.name) == normalize(GSÍ.name), raw differs
//   3. FUZZY       — trigram similarity on normalized names >= 0.5
//   4. COORD       — no name match, Haversine distance < 500 m
//   5. DB-ONLY     — no match found
//   6. GSÍ-ONLY    — GSÍ course nothing in DB mapped to
// Plus a duplicate-check pass: DB rows that collapse onto the same GSÍ course.

import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync } from 'node:fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// ── Load inputs ─────────────────────────────────────────────────────────────
const gsiCourses = JSON.parse(readFileSync('scripts/iceland-courses-gsi.json', 'utf8'))
const gsiClubs = JSON.parse(readFileSync('scripts/iceland-clubs-gsi.json', 'utf8'))
const gsiClubById = new Map(gsiClubs.map(c => [c.id, c]))

const { data: dbRows, error } = await supabase
  .from('courses').select('id, name, club, latitude, longitude, holes, par, name_normalized, club_normalized')
  .eq('country', 'Iceland').order('club').order('name')
if (error) { console.error(error); process.exit(1) }

console.log(`Loaded: ${dbRows.length} DB courses, ${gsiCourses.length} GSÍ courses`)

// ── Normalization (matches immutable_unaccent + lower used in the DB) ───────
function normalize(s) {
  return (s || '').trim().toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ø/g, 'o').replace(/æ/g, 'ae').replace(/ß/g, 'ss')
    .replace(/ð/g, 'd').replace(/þ/g, 'th').replace(/ł/g, 'l')
}

// pg_trgm-style similarity: Jaccard on trigram sets, space-padded
function trigrams(s) {
  const padded = '  ' + (s || '').toLowerCase().trim() + ' '
  const set = new Set()
  for (let i = 0; i <= padded.length - 3; i++) set.add(padded.slice(i, i + 3))
  return set
}
function similarity(a, b) {
  const A = trigrams(a), B = trigrams(b)
  if (A.size === 0 || B.size === 0) return 0
  let inter = 0
  for (const t of A) if (B.has(t)) inter++
  return inter / (A.size + B.size - inter)
}

function haversineMeters(lat1, lng1, lat2, lng2) {
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Infinity
  const R = 6371000
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// ── Annotate GSÍ courses with normalized names ──────────────────────────────
for (const g of gsiCourses) {
  g._norm = normalize(g.name)
}

// ── Classify DB rows ────────────────────────────────────────────────────────
const matches = []      // { db, gsi, category, meta }
const dbOnly = []
const usedGsiIds = new Set()

function tryExact(db) {
  return gsiCourses.find(g => !usedGsiIds.has(g.id) && g.name === db.name)
}
function tryNormalized(db) {
  const n = normalize(db.name)
  return gsiCourses.find(g => !usedGsiIds.has(g.id) && g._norm === n)
}
function tryFuzzy(db) {
  const n = normalize(db.name)
  if (!n) return null
  let best = null, bestScore = 0
  for (const g of gsiCourses) {
    if (usedGsiIds.has(g.id)) continue
    const s = similarity(n, g._norm)
    if (s > bestScore) { bestScore = s; best = g }
  }
  return bestScore >= 0.5 ? { g: best, score: bestScore } : null
}
function tryCoord(db) {
  if (db.latitude == null || db.longitude == null) return null
  let best = null, bestDist = Infinity
  for (const g of gsiCourses) {
    if (usedGsiIds.has(g.id)) continue
    const d = haversineMeters(db.latitude, db.longitude, g.latitude, g.longitude)
    if (d < bestDist) { bestDist = d; best = g }
  }
  return bestDist < 500 ? { g: best, distance: bestDist } : null
}

// Pass 1 — EXACT (most confident)
for (const db of dbRows) {
  const g = tryExact(db)
  if (g) { matches.push({ db, gsi: g, category: 'EXACT' }); usedGsiIds.add(g.id) }
}
// Pass 2 — NORMALIZED
for (const db of dbRows) {
  if (matches.some(m => m.db.id === db.id)) continue
  const g = tryNormalized(db)
  if (g) { matches.push({ db, gsi: g, category: 'NORMALIZED' }); usedGsiIds.add(g.id) }
}
// Pass 3 — FUZZY
for (const db of dbRows) {
  if (matches.some(m => m.db.id === db.id)) continue
  const hit = tryFuzzy(db)
  if (hit) {
    matches.push({ db, gsi: hit.g, category: 'FUZZY', meta: { score: hit.score } })
    usedGsiIds.add(hit.g.id)
  }
}
// Pass 4 — COORD
for (const db of dbRows) {
  if (matches.some(m => m.db.id === db.id)) continue
  const hit = tryCoord(db)
  if (hit) {
    matches.push({ db, gsi: hit.g, category: 'COORD', meta: { distance: hit.distance } })
    usedGsiIds.add(hit.g.id)
  }
}
// Remainder → DB-ONLY
for (const db of dbRows) {
  if (!matches.some(m => m.db.id === db.id)) dbOnly.push(db)
}

const gsiOnly = gsiCourses.filter(g => !usedGsiIds.has(g.id))

// ── Duplicate check: multiple DB rows that would collapse onto the same GSÍ ─
// This uses a RE-RUN of matching without the greedy lock so every DB row gets
// the best possible GSÍ candidate — revealing collisions.
function bestGsiForRow(db) {
  // Exact
  let g = gsiCourses.find(x => x.name === db.name)
  if (g) return { g, category: 'EXACT' }
  // Normalized
  const n = normalize(db.name)
  g = gsiCourses.find(x => x._norm === n)
  if (g) return { g, category: 'NORMALIZED' }
  // Fuzzy
  let best = null, bestScore = 0
  for (const x of gsiCourses) {
    const s = similarity(n, x._norm)
    if (s > bestScore) { bestScore = s; best = x }
  }
  if (bestScore >= 0.5) return { g: best, category: 'FUZZY', score: bestScore }
  // Coord
  if (db.latitude != null && db.longitude != null) {
    let bd = Infinity; let bestC = null
    for (const x of gsiCourses) {
      const d = haversineMeters(db.latitude, db.longitude, x.latitude, x.longitude)
      if (d < bd) { bd = d; bestC = x }
    }
    if (bd < 500) return { g: bestC, category: 'COORD', distance: bd }
  }
  return null
}

const gsiToDbRows = new Map()
for (const db of dbRows) {
  const hit = bestGsiForRow(db)
  if (!hit) continue
  const arr = gsiToDbRows.get(hit.g.id) ?? []
  arr.push({ db, category: hit.category, score: hit.score, distance: hit.distance })
  gsiToDbRows.set(hit.g.id, arr)
}
const duplicates = [...gsiToDbRows.entries()]
  .filter(([, rows]) => rows.length > 1)
  .map(([gsiId, rows]) => ({ gsi: gsiCourses.find(g => g.id === gsiId), rows }))

// ── Heuristic guess for DB-only junk reasons ────────────────────────────────
function guessJunkReason(db) {
  const reasons = []
  const name = (db.name || '').trim()
  if (!name) reasons.push('empty name')
  if (name.length <= 3) reasons.push(`short name (${name.length} chars)`)
  if (/^[A-Z]{2,5}(\/\d+)?$/.test(name)) reasons.push('looks like club abbreviation')
  if (/^\d/.test(name)) reasons.push('starts with a digit')
  if (/^\d+[-+]\d+$/.test(name)) reasons.push('numeric pattern (e.g. "12+6", "12-holes")')
  if (/^\d+[-\s]?holes?$/i.test(name)) reasons.push('generic "N-hole course" placeholder')
  if (/\/\d+$/.test(name)) reasons.push('slashed-number suffix (e.g. "Foo/9")')
  if (/^18-hole course$/i.test(name)) reasons.push('generic placeholder "18-hole course"')
  if (/vetrar|winter|talvi|snow|ice|simulator/i.test(name)) reasons.push('winter/simulator variant')
  if (db.latitude == null || db.longitude == null) reasons.push('no coordinates')
  // Check if db.club is actually the course name (swap case)
  if (db.club) {
    const clubNorm = normalize(db.club)
    const gsiMatch = gsiCourses.find(g => g._norm === clubNorm)
    if (gsiMatch) reasons.push(`club field may be the real course name → GSÍ "${gsiMatch.name}"`)
  }
  return reasons.length > 0 ? reasons.join('; ') : 'unknown — needs manual review'
}

// ── Generate Markdown report ────────────────────────────────────────────────
function esc(s) {
  if (s == null) return ''
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}
function fmtCoords(lat, lng) {
  if (lat == null || lng == null) return '—'
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}
function diff(a, b) {
  if (a === b) return ''
  const parts = []
  if (a.toLowerCase() !== b.toLowerCase()) parts.push('case')
  if (normalize(a) === normalize(b) && a.toLowerCase() !== b.toLowerCase()) {
    // already captured as case — also check accents
  }
  const strippedA = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g,'o').replace(/æ/g,'ae').replace(/ð/g,'d').replace(/þ/g,'th')
  const strippedB = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g,'o').replace(/æ/g,'ae').replace(/ð/g,'d').replace(/þ/g,'th')
  if (strippedA.toLowerCase() !== a.toLowerCase() || strippedB.toLowerCase() !== b.toLowerCase()) parts.push('diacritics')
  if (a.trim() !== a || b.trim() !== b) parts.push('whitespace')
  return parts.join(', ') || 'other'
}

const cats = {
  EXACT: matches.filter(m => m.category === 'EXACT'),
  NORMALIZED: matches.filter(m => m.category === 'NORMALIZED'),
  FUZZY: matches.filter(m => m.category === 'FUZZY'),
  COORD: matches.filter(m => m.category === 'COORD'),
}

const lines = []
lines.push('# Iceland — DB vs GSÍ match report')
lines.push('')
lines.push(`Generated ${new Date().toISOString().slice(0, 10)}. Read-only — no DB changes.`)
lines.push('')
lines.push('## Summary')
lines.push('')
lines.push(`- DB courses (country = \`Iceland\`): **${dbRows.length}**`)
lines.push(`- GSÍ courses (\`rastimar.golf.is/vellir\`): **${gsiCourses.length}**`)
lines.push(`- **EXACT**: ${cats.EXACT.length} | **NORMALIZED**: ${cats.NORMALIZED.length} | **FUZZY**: ${cats.FUZZY.length} | **COORD**: ${cats.COORD.length} | **DB-ONLY**: ${dbOnly.length} | **GSÍ-ONLY**: ${gsiOnly.length}`)
lines.push(`- Duplicate-candidate GSÍ courses (>1 DB row mapping to same GSÍ): **${duplicates.length}**`)
lines.push('')

// Category 1
lines.push(`## Category 1: EXACT MATCH (${cats.EXACT.length})`)
lines.push('')
lines.push('Raw `name` strings are identical between DB and GSÍ.')
lines.push('')
if (cats.EXACT.length > 0) {
  lines.push('| DB name | DB club | GSÍ name | GSÍ club |')
  lines.push('|---|---|---|---|')
  for (const m of cats.EXACT) {
    lines.push(`| ${esc(m.db.name)} | ${esc(m.db.club)} | ${esc(m.gsi.name)} | ${esc(m.gsi.club_name)} |`)
  }
}
lines.push('')

// Category 2
lines.push(`## Category 2: NORMALIZED MATCH (${cats.NORMALIZED.length})`)
lines.push('')
lines.push('Names match after `immutable_unaccent + lower + trim`. Raw names differ in case, diacritics, or whitespace.')
lines.push('')
if (cats.NORMALIZED.length > 0) {
  lines.push('| DB name | DB club | GSÍ name | GSÍ club | Diff |')
  lines.push('|---|---|---|---|---|')
  for (const m of cats.NORMALIZED) {
    lines.push(`| ${esc(m.db.name)} | ${esc(m.db.club)} | ${esc(m.gsi.name)} | ${esc(m.gsi.club_name)} | ${diff(m.db.name, m.gsi.name)} |`)
  }
}
lines.push('')

// Category 3
lines.push(`## Category 3: FUZZY MATCH (${cats.FUZZY.length})`)
lines.push('')
lines.push('Trigram similarity ≥ 0.5 on normalized names (pg_trgm-style Jaccard).')
lines.push('')
if (cats.FUZZY.length > 0) {
  lines.push('| DB name | GSÍ name | similarity | comment |')
  lines.push('|---|---|---:|---|')
  for (const m of cats.FUZZY) {
    const s = m.meta.score.toFixed(3)
    const comment = m.db.club === m.gsi.club_name ? 'same club — likely legit' :
      (normalize(m.db.club || '') === normalize(m.gsi.club_name || '')) ? 'clubs normalize to same' : 'check — clubs differ'
    lines.push(`| ${esc(m.db.name)} | ${esc(m.gsi.name)} | ${s} | ${comment} |`)
  }
}
lines.push('')

// Category 4
lines.push(`## Category 4: COORD MATCH (${cats.COORD.length})`)
lines.push('')
lines.push('No name match found, but DB coordinates are within 500 m of a GSÍ course.')
lines.push('')
if (cats.COORD.length > 0) {
  lines.push('| DB name | DB club | DB coords | GSÍ name | GSÍ club | GSÍ coords | distance (m) |')
  lines.push('|---|---|---|---|---|---|---:|')
  for (const m of cats.COORD) {
    lines.push(`| ${esc(m.db.name)} | ${esc(m.db.club)} | ${fmtCoords(m.db.latitude, m.db.longitude)} | ${esc(m.gsi.name)} | ${esc(m.gsi.club_name)} | ${fmtCoords(m.gsi.latitude, m.gsi.longitude)} | ${m.meta.distance.toFixed(0)} |`)
  }
}
lines.push('')

// Category 5
lines.push(`## Category 5: DB-ONLY (${dbOnly.length})`)
lines.push('')
lines.push('DB rows with no plausible GSÍ match. Candidates for deletion, merge, or manual review.')
lines.push('')
if (dbOnly.length > 0) {
  lines.push('| DB name | DB club | Coords | Probable reason |')
  lines.push('|---|---|---|---|')
  for (const db of dbOnly) {
    lines.push(`| ${esc(db.name)} | ${esc(db.club)} | ${fmtCoords(db.latitude, db.longitude)} | ${esc(guessJunkReason(db))} |`)
  }
}
lines.push('')

// Category 6
lines.push(`## Category 6: GSÍ-ONLY (${gsiOnly.length})`)
lines.push('')
lines.push('GSÍ courses nothing in the DB maps to. Import candidates.')
lines.push('')
if (gsiOnly.length > 0) {
  lines.push('| GSÍ name | GSÍ club | holes | par | import? |')
  lines.push('|---|---|---:|---:|---|')
  for (const g of gsiOnly) {
    const rec = g.is_practice_course ? 'maybe — practice course' : (g.is_open ? 'yes — active course' : 'yes — listed on GSÍ')
    lines.push(`| ${esc(g.name)} | ${esc(g.club_name)} | ${g.holes ?? '—'} | ${g.par ?? '—'} | ${rec} |`)
  }
}
lines.push('')

// Duplicates
lines.push(`## Duplicate candidates in DB (${duplicates.length})`)
lines.push('')
lines.push('GSÍ courses that more than one DB row maps to. Candidates for merging or deletion.')
lines.push('')
if (duplicates.length > 0) {
  for (const d of duplicates) {
    lines.push(`### GSÍ: **${d.gsi.name}** (club: ${d.gsi.club_name})`)
    lines.push('')
    lines.push(`${d.rows.length} DB rows map here:`)
    lines.push('')
    lines.push('| DB name | DB club | Coords | match via |')
    lines.push('|---|---|---|---|')
    for (const r of d.rows) {
      const via = r.category === 'FUZZY' ? `FUZZY (${r.score.toFixed(2)})` :
                  r.category === 'COORD' ? `COORD (${r.distance.toFixed(0)} m)` :
                  r.category
      lines.push(`| ${esc(r.db.name)} | ${esc(r.db.club)} | ${fmtCoords(r.db.latitude, r.db.longitude)} | ${via} |`)
    }
    lines.push('')
  }
}

writeFileSync('scripts/iceland-match-report.md', lines.join('\n'))

// ── Console summary ────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════')
console.log(' Iceland DB vs GSÍ match report')
console.log('═══════════════════════════════════════════════════')
console.log(` DB courses:    ${dbRows.length}`)
console.log(` GSÍ courses:   ${gsiCourses.length}`)
console.log(` EXACT:         ${cats.EXACT.length}`)
console.log(` NORMALIZED:    ${cats.NORMALIZED.length}`)
console.log(` FUZZY:         ${cats.FUZZY.length}`)
console.log(` COORD:         ${cats.COORD.length}`)
console.log(` DB-ONLY:       ${dbOnly.length}`)
console.log(` GSÍ-ONLY:      ${gsiOnly.length}`)
console.log(` Dup candidates: ${duplicates.length}`)
console.log('\n Wrote: scripts/iceland-match-report.md')
