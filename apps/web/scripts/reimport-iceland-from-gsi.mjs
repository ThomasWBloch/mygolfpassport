// Nuke and reimport the Iceland portion of `courses` from the GSÍ scrape.
// Pre-req: scripts/iceland-clubs-gsi.json + scripts/iceland-courses-gsi.json
// (produced by scripts/scrape-iceland-gsi.mjs) and a fresh courses-backup
// JSON on disk.
//
// Why nuke instead of batch-clean: Thomas verified no user data references
// Icelandic courses (rounds / bucket_list / top100_rankings / course_affiliations
// all zero). DB has 114 rows vs GSÍ's 63, with heavy junk (placeholders,
// duplicates, courses with coordinates in Toronto / Wales / Faroe Islands).
// Cleaner to rebuild from GSÍ than cherry-pick 65 deletions.
//
// Combo handling:
//   * 9-hole loops keep their GSÍ names ("Korpa - Áin" etc.).
//   * 3 synthetic combo rows are inserted for GR's Korpa:
//       "Korpa - Áin + Korpa - Landið"
//       "Korpa - Landið + Korpa - Sjórinn"
//       "Korpa - Sjórinn + Korpa - Áin"
//     Both halves include the "Korpa - " prefix so the name-split inside
//     `getComboComponentIds()` matches each 9-hole row exactly and hides them
//     from /courses and /log. This is the same mechanism DK's Parkvej+Hestkøb
//     uses — the function splits combo names on " + " and hides any 9-hole
//     row at the same club whose `name` matches a half.
//
// Run with: node --env-file=.env.local scripts/reimport-iceland-from-gsi.mjs

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Inputs ──────────────────────────────────────────────────────────────────
const gsiClubs   = JSON.parse(readFileSync('scripts/iceland-clubs-gsi.json',   'utf8'))
const gsiCourses = JSON.parse(readFileSync('scripts/iceland-courses-gsi.json', 'utf8'))
const clubById   = new Map(gsiClubs.map(c => [c.id, c]))

// ── Helpers ─────────────────────────────────────────────────────────────────
// GSÍ names are already clean, but strip any trailing " - GX" / " - GXX" just
// in case (belt-and-suspenders — our old DB convention used them, GSÍ doesn't).
function cleanClubName(name) {
  if (!name) return name
  return name.replace(/\s+-\s+G[A-ZÁÉÍÓÚÝÞÆÖ]{1,4}$/u, '').trim()
}

function pickAddress(course, club) {
  if (course?.raw_address && course.raw_address.trim()) return course.raw_address.trim()
  if (club?.raw_address && club.raw_address.trim()) return club.raw_address.trim()
  return null
}

function safeWebsite(url) {
  if (!url) return null
  const s = String(url).trim()
  if (!s) return null
  if (!/^https?:\/\//i.test(s)) return 'https://' + s.replace(/^\/+/, '')
  return s
}

// ── Build base rows (63 courses) ────────────────────────────────────────────
const baseRows = gsiCourses.map(c => {
  const club = clubById.get(c.club_id) ?? null
  return {
    name: c.name,
    club: cleanClubName(c.club_name ?? club?.name ?? null),
    country: 'Iceland',
    flag: '🇮🇸',
    latitude: c.latitude ?? null,
    longitude: c.longitude ?? null,
    holes: c.holes ?? null,
    par: c.par ?? null,
    address: pickAddress(c, club),
    website: safeWebsite(club?.website),
    phone: club?.phone || null,
    is_combo: false,
    golfapi_id: null,
    is_major: false,
  }
})

// ── Build 3 Korpa combos ────────────────────────────────────────────────────
// GR (Golfklúbbur Reykjavíkur) has 3 nine-hole Korpa loops: Áin / Landið / Sjórinn.
const KORPA_CLUB = 'Golfklúbbur Reykjavíkur'
const korpaLoops = {
  ain:     gsiCourses.find(c => c.name === 'Korpa - Áin'),
  landid:  gsiCourses.find(c => c.name === 'Korpa - Landið'),
  sjorinn: gsiCourses.find(c => c.name === 'Korpa - Sjórinn'),
}
for (const [k, v] of Object.entries(korpaLoops)) {
  if (!v) { console.error(`ABORT: could not locate Korpa loop "${k}" in GSÍ data`); process.exit(1) }
}

// Find a GR club record so combos inherit website/phone/address
const grClub = gsiClubs.find(c => c.name === KORPA_CLUB) ?? null
if (!grClub) console.warn(`WARN: no GR club found in iceland-clubs-gsi.json — combo rows will have null contact fields`)

const avg = (a, b) => (a != null && b != null) ? (a + b) / 2 : null
const sumPar = (a, b) => (a.par != null && b.par != null) ? a.par + b.par : null

function buildCombo(leftKey, rightKey) {
  const L = korpaLoops[leftKey]
  const R = korpaLoops[rightKey]
  return {
    name: `${L.name} + ${R.name}`,  // e.g. "Korpa - Áin + Korpa - Landið"
    club: KORPA_CLUB,
    country: 'Iceland',
    flag: '🇮🇸',
    latitude: avg(L.latitude, R.latitude),
    longitude: avg(L.longitude, R.longitude),
    holes: 18,
    par: sumPar(L, R),
    address: grClub?.raw_address ?? L.raw_address ?? null,
    website: safeWebsite(grClub?.website),
    phone: grClub?.phone || null,
    is_combo: true,
    golfapi_id: null,
    is_major: false,
  }
}

const comboRows = [
  buildCombo('ain',     'landid'),   // Áin + Landið
  buildCombo('landid',  'sjorinn'),  // Landið + Sjórinn
  buildCombo('sjorinn', 'ain'),      // Sjórinn + Áin
]

// ── Delete existing Iceland rows ────────────────────────────────────────────
console.log('Deleting existing Iceland courses …')
const { count: beforeCount } = await supabase
  .from('courses').select('*', { count: 'exact', head: true }).eq('country', 'Iceland')
console.log(`  DB had ${beforeCount} Iceland courses before delete`)

const { error: delErr } = await supabase.from('courses').delete().eq('country', 'Iceland')
if (delErr) { console.error('Delete failed:', delErr); process.exit(1) }

const { count: afterDelete } = await supabase
  .from('courses').select('*', { count: 'exact', head: true }).eq('country', 'Iceland')
console.log(`  DB has ${afterDelete} Iceland courses after delete`)
if (afterDelete !== 0) { console.error('ABORT: delete left rows behind'); process.exit(1) }

// ── Insert ──────────────────────────────────────────────────────────────────
const allRows = [...baseRows, ...comboRows]
console.log(`Inserting ${allRows.length} rows (${baseRows.length} base + ${comboRows.length} combos) …`)

// Batch in 100s to stay well under PostgREST limits
const BATCH = 100
for (let i = 0; i < allRows.length; i += BATCH) {
  const slice = allRows.slice(i, i + BATCH)
  const { error } = await supabase.from('courses').insert(slice)
  if (error) { console.error('Insert failed at batch', i, ':', error); process.exit(1) }
}
console.log('  Insert complete')

// ── Verification ────────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════')
console.log(' Verification')
console.log('═══════════════════════════════════════════════════')

const { data: all } = await supabase
  .from('courses').select('*').eq('country', 'Iceland').order('club').order('name')
const total = all.length
const combos = all.filter(r => r.is_combo)
const clubs = new Set(all.map(r => r.club))
const withWebsite = all.filter(r => r.website).length
const withPhone = all.filter(r => r.phone).length
const withAddress = all.filter(r => r.address).length
const withCoords = all.filter(r => r.latitude != null && r.longitude != null).length

// Simulate UI filter: which rows would getComboComponentIds() hide?
const hiddenComponentIds = new Set()
const collator = new Intl.Collator('sv')
const componentsByClub = new Map()
const canonicalKeeper = new Map()
for (const c of combos) {
  const parts = String(c.name ?? '').split(' + ').map(x => x.trim()).filter(Boolean)
  if (parts.length !== 2) continue
  const [a, b] = parts
  if (a === b) { hiddenComponentIds.add(c.id); continue }
  const key = `${c.club}||${c.country}`
  const set = componentsByClub.get(key) ?? new Set()
  set.add(a); set.add(b)
  componentsByClub.set(key, set)
  const canonicalName = [a, b].slice().sort((x, y) => collator.compare(x, y)).join(' + ')
  const canonKey = `${c.club}||${c.country}||${canonicalName}`
  if (!canonicalKeeper.has(canonKey)) canonicalKeeper.set(canonKey, c.id)
  else hiddenComponentIds.add(c.id)
}
for (const r of all) {
  if (r.holes !== 9 || r.is_combo) continue
  const key = `${r.club}||${r.country}`
  if (componentsByClub.get(key)?.has(r.name)) hiddenComponentIds.add(r.id)
}
const visible = total - hiddenComponentIds.size

console.log(` Total Iceland courses:       ${total}  (expected 66 = 63 + 3 combos)`)
console.log(` Combos (is_combo=true):      ${combos.length}`)
console.log(` Visible in UI (not hidden):  ${visible}`)
console.log(` Hidden by combo mechanism:   ${hiddenComponentIds.size}  (expected 3: Korpa's 9-hole loops)`)
console.log(` Distinct clubs:              ${clubs.size}`)
console.log(` With website:                ${withWebsite}`)
console.log(` With phone:                  ${withPhone}`)
console.log(` With address:                ${withAddress}`)
console.log(` With coordinates:            ${withCoords}`)

// ── Sample: all GR rows so we can eyeball Korpa combo structure ────────────
console.log('\n─── GR (Golfklúbbur Reykjavíkur) — all rows ───')
const gr = all.filter(r => r.club === KORPA_CLUB)
for (const r of gr) {
  const hidden = hiddenComponentIds.has(r.id) ? ' [HIDDEN]' : ''
  const combo = r.is_combo ? ' [COMBO]' : ''
  const coords = r.latitude != null ? `${r.latitude.toFixed(5)},${r.longitude.toFixed(5)}` : '—'
  console.log(`  ${(r.holes + 'h').padStart(3)}  par ${String(r.par ?? '-').padStart(3)}  ${r.name.padEnd(40)}  coords=${coords}${combo}${hidden}`)
}
