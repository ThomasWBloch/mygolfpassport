// Re-geocode a specific set of UK golf courses whose coordinates are wrong.
//
// This is a destructive script. Guardrails:
//   1. Target IDs are hardcoded below — no SQL WHERE-clause that could match
//      more rows than intended.
//   2. Physical upper bound: 40. Script aborts if COURSE_IDS grows past it.
//   3. Default mode is DRY-RUN. Pass `--live` to actually write.
//   4. Live mode writes a full-row JSON backup of every targeted row before
//      the first UPDATE; abort if the backup can't be written.
//   5. Only coordinates that fall inside the UK bounding box are accepted.
//
// Usage:
//   node --env-file=.env.local scripts/regeocode-uk-broken-coords.mjs          (dry run)
//   node --env-file=.env.local scripts/regeocode-uk-broken-coords.mjs --live   (writes)

import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'

// ── Hardcoded target IDs ────────────────────────────────────────────────────
const COURSE_IDS = [
  // '875d20c9-dc7f-405a-a306-e9f162d0d5e5' — Blyth: removed, regression under loose filter (matched social club)
  '316b600f-9cf4-4ab9-87dc-20659cb39d39',
  'ae57acab-0e02-4578-8565-c6681c81d24a', '477bc4ea-b89a-45a5-8b07-60962e878456',
  '2d02cfdb-47d1-41e4-8344-f504f9ba33f9', 'fac1e561-b0f3-499e-b9c9-239bb6958dcd',
  'fa5536de-9528-4328-80b6-a33242901c4b', 'a45227a7-c0f6-4a57-b8bd-da846acef892',
  'd5d9f7ca-8921-491e-80f6-f3ba43408e9e',
  // '59fcfa9d-19de-44bb-ba7b-0f70e95d25b6' — Kington: removed, wrong match (Coombe Hill / Broke Hill)
  '79fa6367-8cec-4069-85c0-578f36d67052', '3d7bf9d8-fc0c-4a09-8744-102df68fecac',
  '69d42527-ee1c-4884-84fa-dd93f7883221',
  // 'ce439ff7-ab16-4fe9-b973-a2fbea79f16f' — Stowe: removed, wrong match (Stoneleigh Deer Park)
  'd79c1784-e535-4c00-a3c7-81af407d9b48', '08eac7ae-8f77-46fe-8d24-6fec5f82ed2a',
  'dacffb43-0734-4d49-b92c-ca8d273a49d7', '63a60cde-ff48-4731-93b6-1c6d1810ac4c',
  '3200dbae-6557-481f-8504-6a5fab252def', '6034f1b0-350c-4db2-a8c4-b0a495f14652',
  'fe7c1fd3-388c-45df-acfc-f9cde523b7a6', '35331d58-ce17-475b-9199-d1cea9f21627',
  '93d512c4-32b9-4f63-bf3f-4e313e6b1e62', '98e170af-81e9-4e3c-ac0d-3486d423cf4f',
  '82bad776-9532-4204-ab63-25e4922a7689', '3f240537-721f-436c-b4f4-9f6c85c80b4d',
  'd020e3e6-b945-4ad4-8b1e-f2ce4bf9c983', '1024d06e-d3dc-42ed-b8f7-4f4fc5d2eb18',
  'c9f3bca1-08b2-4067-ba6e-4f257ba0d18d', '728841ce-6eb8-464b-afa2-43c949d3200c',
  'f0fd36d4-6976-4907-bb9c-62d78495a9c2', 'ea1d4102-6b4f-4c11-ae47-be779443a201',
  // 'd569df60-a201-47f4-951f-4b89982f96a0' — Flint: removed, wrong match (Northop Country Park)
  '9b2c47b1-f255-4286-936b-c212743fb391',
  '28016d85-d5e4-4bda-a0a1-3b973348c8e7', 'e55b608c-f91d-4138-b840-ec7a19bfd3f2',
  'a4915cb9-5140-4751-9ee3-7bc8589f0a3f', '099240b9-4d5d-4b82-a3a8-65dfb0f2fd39',
  '3e1d6452-2db7-4d96-a505-848a75e13283', 'b9f36294-a90c-4a7d-8d62-eddea901cd73',
]

const MAX_COURSES = 40
if (COURSE_IDS.length > MAX_COURSES) {
  console.error(`ABORT: COURSE_IDS has ${COURSE_IDS.length} entries; physical max is ${MAX_COURSES}`)
  process.exit(1)
}

// ── UK bounding box (inclusive) ─────────────────────────────────────────────
const UK_BBOX = { minLat: 49.5, maxLat: 61.0, minLng: -8.7, maxLng: 2.1 }
function inUkBbox(lat, lng) {
  return lat >= UK_BBOX.minLat && lat <= UK_BBOX.maxLat
      && lng >= UK_BBOX.minLng && lng <= UK_BBOX.maxLng
}

// ── Mode ────────────────────────────────────────────────────────────────────
const LIVE = process.argv.includes('--live')
console.log(LIVE ? '*** LIVE MODE — writes enabled ***' : '=== DRY RUN — no writes. Pass --live to update. ===')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── Photon ──────────────────────────────────────────────────────────────────
async function photonGeocode(query) {
  const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&countrycode=GB&limit=5`
  const resp = await fetch(url, { signal: AbortSignal.timeout(15000) })
  if (!resp.ok) return []
  const data = await resp.json()
  return (data.features ?? []).map(f => {
    const [lng, lat] = f.geometry.coordinates
    const name = [f.properties.name, f.properties.city, f.properties.county].filter(Boolean).join(', ')
    return {
      lat, lng, name,
      osm_key: f.properties.osm_key,
      osm_value: f.properties.osm_value,
    }
  })
}

// Acceptance filter for a Photon feature. Reject ONLY when BOTH are true:
//   (a) osm_value is not "golf_course"
//   (b) the display name contains neither "golf" nor "club"
// i.e. accept if either the OSM tag or the display name signals this is a
// golf-related feature.
function passesFilter(feature) {
  const tagIsGolf = feature.osm_value === 'golf_course'
  const n = (feature.name || '').toLowerCase()
  const nameMentionsGolf = n.includes('golf') || n.includes('club')
  if (tagIsGolf || nameMentionsGolf) return { ok: true }
  return { ok: false, reason: `osm_value=${feature.osm_value} AND name lacks golf/club` }
}

// ── Fetch all targeted rows up front ────────────────────────────────────────
console.log(`Fetching ${COURSE_IDS.length} target rows from DB …`)
const { data: rows, error: fetchErr } = await supabase
  .from('courses')
  .select('*')
  .in('id', COURSE_IDS)
if (fetchErr) { console.error('Fetch failed:', fetchErr); process.exit(1) }

// Missing IDs that no longer exist in DB
const foundIds = new Set(rows.map(r => r.id))
const missingIds = COURSE_IDS.filter(id => !foundIds.has(id))
if (missingIds.length > 0) {
  console.warn(`WARN: ${missingIds.length} IDs from the target list no longer exist in DB:`)
  missingIds.forEach(id => console.warn(`  ${id}`))
}
console.log(`  ${rows.length} rows loaded\n`)

// ── Backup (live mode only, before any UPDATE) ──────────────────────────────
if (LIVE && rows.length > 0) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupPath = `scripts/regeocode-uk-backup-${ts}.json`
  try {
    writeFileSync(backupPath, JSON.stringify(rows, null, 2))
    console.log(`Backup written: ${backupPath}\n`)
  } catch (e) {
    console.error('ABORT: backup write failed —', e.message)
    process.exit(1)
  }
}

// ── Process ────────────────────────────────────────────────────────────────
const successRows = []   // { id, club, old_lat, old_lng, new_lat, new_lng, photon_name }
const failedRows = []    // { id, club, country, address, reason }

for (let i = 0; i < rows.length; i++) {
  const c = rows[i]
  const prefix = `  [${i + 1}/${rows.length}] ${(c.club ?? c.name ?? '?').slice(0, 50).padEnd(50)}`
  process.stdout.write(prefix)

  // Build the search query — "club, address" if both exist, else either one
  const parts = [c.club, c.address].filter(s => s && String(s).trim())
  if (parts.length === 0) {
    failedRows.push({ id: c.id, club: c.club ?? '', country: c.country ?? '', address: c.address ?? '', reason: 'no club or address to query' })
    console.log(' ✗ no query inputs')
    continue
  }
  const query = parts.join(', ')

  let features
  try {
    features = await photonGeocode(query)
  } catch (e) {
    failedRows.push({ id: c.id, club: c.club ?? '', country: c.country ?? '', address: c.address ?? '', reason: `photon error: ${e.message}` })
    console.log(' ✗ photon error')
    await sleep(1000)
    continue
  }

  // Walk the 5 Photon features; accept the first inside UK bbox that passes
  // the osm_value / name filter. Capture per-feature rejection reasons.
  const filterReasons = []
  let hit = null
  for (const f of features) {
    if (!inUkBbox(f.lat, f.lng)) { filterReasons.push(`${f.name} — outside UK bbox`); continue }
    const fc = passesFilter(f)
    if (!fc.ok) { filterReasons.push(`${f.name} — ${fc.reason}`); continue }
    hit = f
    break
  }
  if (!hit) {
    let reason
    if (features.length === 0) reason = 'photon returned no results'
    else reason = `${features.length} results, none accepted: ${filterReasons.join(' | ')}`
    failedRows.push({
      id: c.id,
      club: c.club ?? '',
      country: c.country ?? '',
      address: c.address ?? '',
      reason,
    })
    console.log(` ✗ ${features.length === 0 ? 'no results' : `rejected by filter (${features.length} tried)`}`)
    await sleep(1000)
    continue
  }

  // Prepare the change
  const oldLat = c.latitude, oldLng = c.longitude
  const newLat = hit.lat, newLng = hit.lng

  if (!LIVE) {
    const oldStr = oldLat != null ? `${oldLat.toFixed(5)},${oldLng.toFixed(5)}` : 'null,null'
    console.log(` WOULD UPDATE  ${oldStr}  →  ${newLat.toFixed(5)},${newLng.toFixed(5)}  (${hit.name})`)
  } else {
    const { error: updErr } = await supabase
      .from('courses').update({ latitude: newLat, longitude: newLng }).eq('id', c.id)
    if (updErr) {
      failedRows.push({ id: c.id, club: c.club ?? '', country: c.country ?? '', address: c.address ?? '', reason: `db update error: ${updErr.message}` })
      console.log(' ✗ db update error')
      await sleep(1000)
      continue
    }
    const oldStr = oldLat != null ? `${oldLat.toFixed(5)},${oldLng.toFixed(5)}` : 'null,null'
    console.log(` ✓ ${oldStr}  →  ${newLat.toFixed(5)},${newLng.toFixed(5)}  (${hit.name})`)
  }

  successRows.push({
    id: c.id,
    club: c.club ?? '',
    old_lat: oldLat,
    old_lng: oldLng,
    new_lat: newLat,
    new_lng: newLng,
    photon_name: hit.name,
  })

  await sleep(1000)
}

// Add missing IDs to failed.csv
for (const id of missingIds) {
  failedRows.push({ id, club: '', country: '', address: '', reason: 'id not found in DB' })
}

// ── Write CSVs ──────────────────────────────────────────────────────────────
function csvEscape(v) {
  if (v == null) return ''
  const s = String(v)
  if (s.includes('"') || s.includes(',') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`
  return s
}
function writeCsv(path, headers, rows) {
  const lines = [headers.join(',')]
  for (const r of rows) lines.push(headers.map(h => csvEscape(r[h])).join(','))
  writeFileSync(path, lines.join('\n') + '\n')
}

writeCsv('scripts/regeocode-uk-success.csv',
  ['id', 'club', 'old_lat', 'old_lng', 'new_lat', 'new_lng', 'photon_name'],
  successRows)
writeCsv('scripts/regeocode-uk-failed.csv',
  ['id', 'club', 'country', 'address', 'reason'],
  failedRows)

// ── Summary ────────────────────────────────────────────────────────────────
const label = LIVE ? 'Re-geocoded' : 'Would re-geocode'
console.log('\n═══════════════════════════════════════════════════')
console.log(` ${label} ${successRows.length} / ${COURSE_IDS.length} baner. ${failedRows.length} fejlede.`)
console.log('═══════════════════════════════════════════════════')
console.log(' Wrote scripts/regeocode-uk-success.csv')
console.log(' Wrote scripts/regeocode-uk-failed.csv')
if (!LIVE) console.log('\n (dry run — re-run with --live to apply)')
