// Apply the two manually-verified Photon corrections that survived review
// from the previous fallback dry-run. Everything else in that dry-run turned
// out to be Photon returning a plausibly-tagged but completely unrelated
// golf course, so the broader fallback approach was abandoned — the
// remaining rows are being fixed manually by Thomas.
//
// Coords were captured verbatim from scripts/regeocode-uk-fallback-success.csv
// after human review confirmed city / region matched the DB address.
//
// Dry-run by default; pass --live to write. Live mode writes a backup first
// and aborts if the backup cannot be written.
//
// Run:
//   node --env-file=.env.local scripts/regeocode-uk-fallback.mjs           (dry)
//   node --env-file=.env.local scripts/regeocode-uk-fallback.mjs --live

import { createClient } from '@supabase/supabase-js'
import { writeFileSync } from 'node:fs'

// ── The only two corrections going in ───────────────────────────────────────
const CORRECTIONS = [
  {
    id: '3f240537-721f-436c-b4f4-9f6c85c80b4d',
    label: 'Melville Golf Centre',
    new_lat: 55.8890281,
    new_lng: -3.0989998,
    source: 'Photon — Melville Golf Course, Lasswade, Midlothian (city match verified)',
  },
  {
    id: 'e55b608c-f91d-4138-b840-ec7a19bfd3f2',
    label: "St Mary's Hotel, Golf and Restaurant",
    new_lat: 51.5119016,
    new_lng: -3.4752192,
    source: "Photon — St Mary's Hotel Golf & Country Club, Pencoed, Rhondda Cynon Taf (city match verified)",
  },
]

const LIVE = process.argv.includes('--live')
console.log(LIVE ? '*** LIVE MODE — writes enabled ***' : '=== DRY RUN — no writes. Pass --live to update. ===')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Fetch pre-update snapshot ──────────────────────────────────────────────
const ids = CORRECTIONS.map(c => c.id)
const { data: rows, error } = await supabase.from('courses').select('*').in('id', ids)
if (error) { console.error('Fetch failed:', error); process.exit(1) }

const byId = new Map(rows.map(r => [r.id, r]))
for (const c of CORRECTIONS) {
  if (!byId.has(c.id)) { console.error(`ABORT: id ${c.id} (${c.label}) not in DB`); process.exit(1) }
}

// ── Backup before writes ────────────────────────────────────────────────────
if (LIVE) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const backupPath = `scripts/regeocode-uk-fallback-backup-${ts}.json`
  try {
    writeFileSync(backupPath, JSON.stringify(rows, null, 2))
    console.log(`Backup written: ${backupPath}\n`)
  } catch (e) {
    console.error('ABORT: backup write failed —', e.message)
    process.exit(1)
  }
}

// ── Apply ──────────────────────────────────────────────────────────────────
let applied = 0
for (const c of CORRECTIONS) {
  const r = byId.get(c.id)
  const oldStr = r.latitude != null ? `${r.latitude.toFixed(5)},${r.longitude.toFixed(5)}` : 'null,null'
  const newStr = `${c.new_lat.toFixed(5)},${c.new_lng.toFixed(5)}`

  if (!LIVE) {
    console.log(`  WOULD UPDATE  ${c.id}  ${c.label}`)
    console.log(`      ${oldStr}  →  ${newStr}`)
    console.log(`      source: ${c.source}`)
    continue
  }

  const { error: updErr } = await supabase
    .from('courses').update({ latitude: c.new_lat, longitude: c.new_lng }).eq('id', c.id)
  if (updErr) {
    console.error(`  ✗ ${c.id} ${c.label}: ${updErr.message}`)
    continue
  }
  console.log(`  ✓ ${c.id}  ${c.label}`)
  console.log(`      ${oldStr}  →  ${newStr}`)
  applied++
}

const label = LIVE ? `Applied ${applied}` : `Would apply ${CORRECTIONS.length}`
console.log(`\n═══════════════════════════════════════════════════`)
console.log(` ${label} / ${CORRECTIONS.length} corrections`)
console.log(`═══════════════════════════════════════════════════`)
if (!LIVE) console.log(' (dry run — re-run with --live to apply)')
