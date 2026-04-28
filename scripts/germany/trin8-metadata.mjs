// Trin 8: backfill website/address/phone på Germany-courses fra ark.
// Conservative: overskriver kun NULL/'' i DB.
// Dry-run by default. Brug --live for at skrive.
// Run: node --env-file=.env.local scripts/germany/trin8-metadata.mjs [--live]

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const ARK_PATH = 'scripts/germany/germany-clubs-thomas.json'
const MATCH_PATH = 'scripts/germany/match-result-session18.json'
const LIVE = process.argv.includes('--live')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function buildAddress(adresse, zip, city) {
  if (!adresse || !adresse.trim()) return ''
  const tail = [zip, city].filter((s) => s && s.trim()).join(' ').trim()
  return tail ? `${adresse.trim()}, ${tail}` : adresse.trim()
}

function normalizeWeb(web) {
  if (!web || !web.trim()) return ''
  const w = web.trim()
  if (/^https?:\/\//i.test(w)) return w
  return `https://${w}`
}

const arkRaw = readFileSync(ARK_PATH, 'utf8').replace(/:\s*NaN/g, ':null')
const arkClubs = JSON.parse(arkRaw)
const matchData = JSON.parse(readFileSync(MATCH_PATH, 'utf8'))
const entries = matchData.exact || []

// 1. ark_klubnavn → metadata
const arkByName = new Map()
for (const c of arkClubs) {
  arkByName.set(c.klubnavn, {
    web: normalizeWeb(c.web),
    address: buildAddress(c.adresse, c.zip, c.city),
    telefon: (c.telefon || '').trim(),
  })
}

// 2. row_id → chosen entry (prefer exact ark===db match, else first seen)
const rowOwner = new Map() // id → { ark_klubnavn, db_club, exact }
for (const e of entries) {
  const exactMatch = e.ark_klubnavn === e.db_club
  for (const id of e.row_ids) {
    const cur = rowOwner.get(id)
    if (!cur) {
      rowOwner.set(id, { ark_klubnavn: e.ark_klubnavn, db_club: e.db_club, exact: exactMatch })
    } else if (!cur.exact && exactMatch) {
      rowOwner.set(id, { ark_klubnavn: e.ark_klubnavn, db_club: e.db_club, exact: exactMatch })
    }
  }
}

// 3. Build planned updates per row_id
const planned = [] // { id, ark_klubnavn, web, address, telefon }
const missingArk = new Set()
for (const [id, owner] of rowOwner) {
  const meta = arkByName.get(owner.ark_klubnavn)
  if (!meta) {
    missingArk.add(owner.ark_klubnavn)
    continue
  }
  if (!meta.web && !meta.address && !meta.telefon) continue
  planned.push({ id, ark_klubnavn: owner.ark_klubnavn, ...meta })
}

console.log(`Ark clubs:        ${arkClubs.length}`)
console.log(`Match entries:    ${entries.length}`)
console.log(`Unique row_ids:   ${rowOwner.size}`)
console.log(`Planned rows:     ${planned.length}`)
console.log(`Missing in ark:   ${missingArk.size}`)
console.log(`Mode:             ${LIVE ? 'LIVE' : 'DRY-RUN'}`)
console.log('')

// 4. Fetch current DB state for these ids (paged, 200 per request)
const ids = planned.map((p) => p.id)
const dbById = new Map()
for (let i = 0; i < ids.length; i += 200) {
  const chunk = ids.slice(i, i + 200)
  const { data, error } = await supabase
    .from('courses')
    .select('id, club, website, address, phone')
    .in('id', chunk)
  if (error) { console.error('fetch error:', error); process.exit(1) }
  for (const r of data) dbById.set(r.id, r)
}

let updated = 0
let skipped = 0
let attempted = 0

for (const p of planned) {
  const cur = dbById.get(p.id)
  if (!cur) { skipped++; continue }
  const patch = {}
  if (p.web && (cur.website == null || cur.website === '')) patch.website = p.web
  if (p.address && (cur.address == null || cur.address === '')) patch.address = p.address
  if (p.telefon && (cur.phone == null || cur.phone === '')) patch.phone = p.telefon
  if (Object.keys(patch).length === 0) { skipped++; continue }

  attempted++
  const fields = Object.entries(patch).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(', ')
  console.log(`[${LIVE ? 'UPDATE' : 'PLAN'}] ${p.id}  (${cur.club})  ${fields}`)

  if (LIVE) {
    const { error } = await supabase.from('courses').update(patch).eq('id', p.id)
    if (error) { console.error(`  ! error: ${error.message}`); continue }
    updated++
  }
}

// 5. Special case: Bavarian / HVB → bavariangc.de
console.log('')
console.log('--- Special case: Bavarian / HVB ---')
const { data: bavRows, error: bavErr } = await supabase
  .from('courses')
  .select('id, club, website')
  .or('club.ilike.%bavarian%,club.ilike.%HVB%')
  .eq('country', 'Germany')
if (bavErr) { console.error('bavarian fetch error:', bavErr); process.exit(1) }

console.log(`Found ${bavRows.length} candidate rows`)
for (const r of bavRows) {
  const target = 'https://bavariangc.de'
  if (r.website === target) {
    console.log(`  [skip]   ${r.id}  (${r.club})  already set`)
    skipped++
    continue
  }
  console.log(`  [${LIVE ? 'UPDATE' : 'PLAN'}] ${r.id}  (${r.club})  website=${JSON.stringify(target)}  was=${JSON.stringify(r.website)}`)
  if (LIVE) {
    const { error } = await supabase.from('courses').update({ website: target }).eq('id', r.id)
    if (error) { console.error(`    ! error: ${error.message}`); continue }
    updated++
  } else {
    attempted++
  }
}

// 6. Summary
console.log('')
console.log('--- Summary ---')
if (LIVE) {
  console.log(`Rows updated:           ${updated}`)
} else {
  console.log(`Rows planned (dry-run): ${attempted}`)
}
console.log(`Rows skipped:           ${skipped}`)
console.log(`Ark names not found:    ${missingArk.size}`)
if (missingArk.size > 0) {
  for (const n of missingArk) console.log(`  - ${n}`)
}
if (!LIVE) console.log('\n(dry-run — re-run with --live to write)')
