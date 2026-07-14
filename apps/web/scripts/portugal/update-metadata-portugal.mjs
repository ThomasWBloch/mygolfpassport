// Trin 7: backfill website/phone/address/founded_year på Portugal-courses
// fra FPG-scrapen, men KUN hvor DB-feltet er NULL eller tomt.
//
// Læser EXACT-matches fra match-result-portugal-v6.json (kan overrides via
// --result=PATH) og slår metadata op i portugal-clubs-fpg.json per ncourse_id.
//
// Dry-run by default (printer planned changes). Brug --apply for faktisk at
// skrive til DB.
//
// Run:
//   node --env-file=../../../.env.local scripts/portugal/update-metadata-portugal.mjs
//   node --env-file=../../../.env.local scripts/portugal/update-metadata-portugal.mjs --apply
//   node --env-file=../../../.env.local scripts/portugal/update-metadata-portugal.mjs --result=scripts/portugal/match-result-portugal-v7.json

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')
const resultArg = process.argv.find((a) => a.startsWith('--result='))
const RESULT_PATH = resultArg ? resultArg.slice('--result='.length) : 'scripts/portugal/match-result-portugal-v6.json'
const FPG_PATH = 'scripts/portugal/portugal-clubs-fpg.json'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ---- Helpers -----------------------------------------------------------------

function isEmpty(v) {
  return v == null || (typeof v === 'string' && v.trim() === '')
}

function cleanWebsite(w) {
  if (!w) return ''
  const s = String(w).trim()
  if (!/^https?:\/\//i.test(s)) return ''
  if (/\s/.test(s)) return '' // junk like "http://Facebook - Paredes Golfe Clube"
  if (!/\.[a-z]{2,}/i.test(s)) return ''
  return s
}

function cleanPhone(p) {
  if (!p) return ''
  return String(p).replace(/\s+/g, ' ').trim()
}

function buildAddress(street, postal, city, district) {
  const parts = []
  const s = (street || '').trim()
  const p = (postal || '').trim()
  const c = (city || '').trim()
  const d = (district || '').trim()
  if (s) parts.push(s)
  const cityLine = [p, c].filter((x) => x).join(' ').trim()
  if (cityLine) parts.push(cityLine)
  if (d && d.toLowerCase() !== c.toLowerCase()) parts.push(d)
  return parts.join(', ')
}

function fmtPatch(patch) {
  return Object.entries(patch)
    .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
    .join(', ')
}

// ---- Load inputs ------------------------------------------------------------

console.log(`Mode: ${APPLY ? 'LIVE (will write)' : 'DRY-RUN'}`)
console.log(`Match-result: ${RESULT_PATH}`)
console.log(`FPG metadata: ${FPG_PATH}`)
console.log('')

const matchResult = JSON.parse(readFileSync(RESULT_PATH, 'utf8'))
const exact = matchResult.exact || []
console.log(`EXACT-matches loaded: ${exact.length}`)

const fpgAll = JSON.parse(readFileSync(FPG_PATH, 'utf8'))
const fpgById = new Map()
for (const f of fpgAll) {
  if (!fpgById.has(f.ncourse_id)) fpgById.set(f.ncourse_id, f)
}
console.log(`FPG entries (unique by ncourse_id): ${fpgById.size}`)
console.log('')

// ---- Build planned updates per club -----------------------------------------
//
// For each EXACT match: fetch all DB rows where club = db_club AND country='Portugal',
// compute per-row patch using only NULL/empty fields, log + (if --apply) write.

let totalRowsTouched = 0
let totalRowsUpdated = 0
let totalRowsSkipped = 0
let clubsWithNoFpg = 0
let fieldsFilled = { website: 0, phone: 0, address: 0, founded_year: 0 }

for (const e of exact) {
  const fpg = fpgById.get(e.ncourse_id)
  if (!fpg) {
    console.log(`[NO-FPG] ${e.db_club} (ncourse=${e.ncourse_id}) — kunne ikke finde FPG-entry`)
    clubsWithNoFpg++
    continue
  }

  const proposed = {
    website: cleanWebsite(fpg.website),
    phone: cleanPhone(fpg.phone),
    address: buildAddress(fpg.address, fpg.postal_code, fpg.city, fpg.district),
    founded_year: Number.isInteger(fpg.founded_year) ? fpg.founded_year : null,
  }

  // Fetch current DB state for this club
  const { data: rows, error } = await supabase
    .from('courses')
    .select('id, club, name, website, phone, address, founded_year')
    .eq('country', 'Portugal')
    .eq('club', e.db_club)
  if (error) {
    console.error(`[ERR ] ${e.db_club}: ${error.message}`)
    continue
  }
  if (!rows || rows.length === 0) {
    console.log(`[MISS] ${e.db_club} — ingen rækker fundet med dette club-navn`)
    continue
  }

  console.log(`\n=== ${e.db_club}  (ncourse=${e.ncourse_id}, ${rows.length} række${rows.length === 1 ? '' : 'r'}) ===`)
  console.log(`  FPG → website=${JSON.stringify(proposed.website || '')}, phone=${JSON.stringify(proposed.phone || '')}, founded=${proposed.founded_year ?? 'null'}`)
  console.log(`  FPG → address=${JSON.stringify(proposed.address || '')}`)

  for (const r of rows) {
    totalRowsTouched++
    const patch = {}
    if (proposed.website && isEmpty(r.website)) patch.website = proposed.website
    if (proposed.phone && isEmpty(r.phone)) patch.phone = proposed.phone
    if (proposed.address && isEmpty(r.address)) patch.address = proposed.address
    if (proposed.founded_year != null && r.founded_year == null) patch.founded_year = proposed.founded_year

    if (Object.keys(patch).length === 0) {
      console.log(`  [SKIP] ${r.id}  (${r.name || ''}) — alle felter allerede udfyldt`)
      totalRowsSkipped++
      continue
    }

    // Note hvilke felter der bevares (ikke-tomme i DB i forvejen)
    const kept = []
    if (proposed.website && !isEmpty(r.website) && r.website !== proposed.website) kept.push(`website (DB=${JSON.stringify(r.website)})`)
    if (proposed.phone && !isEmpty(r.phone) && r.phone !== proposed.phone) kept.push(`phone (DB=${JSON.stringify(r.phone)})`)
    if (proposed.address && !isEmpty(r.address) && r.address !== proposed.address) kept.push(`address (DB=${JSON.stringify(r.address)})`)
    if (proposed.founded_year != null && r.founded_year != null && r.founded_year !== proposed.founded_year) kept.push(`founded_year (DB=${r.founded_year})`)

    console.log(`  [${APPLY ? 'UPDATE' : 'PLAN'}] ${r.id}  (${r.name || ''})  ${fmtPatch(patch)}`)
    if (kept.length > 0) console.log(`    keep: ${kept.join('; ')}`)

    for (const k of Object.keys(patch)) fieldsFilled[k] = (fieldsFilled[k] || 0) + 1

    if (APPLY) {
      const { error: updErr } = await supabase
        .from('courses')
        .update(patch)
        .eq('id', r.id)
      if (updErr) {
        console.error(`    ! UPDATE-fejl: ${updErr.message}`)
      } else {
        totalRowsUpdated++
      }
    }
  }
}

// ---- Summary ----------------------------------------------------------------

console.log('')
console.log('================ Summary ================')
console.log(`Mode:                    ${APPLY ? 'LIVE' : 'DRY-RUN'}`)
console.log(`EXACT-matches behandlet: ${exact.length}`)
console.log(`Klubber u/ FPG-entry:    ${clubsWithNoFpg}`)
console.log(`DB-rækker rørt:          ${totalRowsTouched}`)
console.log(`DB-rækker u/ patch:      ${totalRowsSkipped}`)
if (APPLY) {
  console.log(`DB-rækker opdateret:     ${totalRowsUpdated}`)
} else {
  console.log(`DB-rækker planlagt:      ${totalRowsTouched - totalRowsSkipped}`)
}
console.log(`Felter der ville fylde:`)
for (const [k, n] of Object.entries(fieldsFilled)) console.log(`  ${k.padEnd(15)} ${n}`)
if (!APPLY) console.log('\n(dry-run — re-kør med --apply for faktisk at skrive)')
