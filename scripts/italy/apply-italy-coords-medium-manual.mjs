// Apply medium-tier coord-fixes using Thomas-verified coords (Session 28).
//
// Audit identificerede 9 medium-tier coord-audit kandidater. Alle 9 manuelt
// verificeret af Thomas via Google Maps. Vigtig finding: For Is Arenas og Grado
// var BÅDE OSM og LC off — consensus-mean ville have gjort Grado værre.
// Bekræfter at manuel verifikation er nødvendig for medium-tier.
//
// Default = dry-run. --apply for at skrive.
// Backup obligatorisk: scripts/italy/courses-backup-italy-coords-medium-manual-YYYY-MM-DD.json
// Touch KUN latitude + longitude.
// Per-klub UPDATE for atomicity.
// Drift-detektion: sanity check current lat/lon mod audit's db-snapshot før hver UPDATE.
//
// Run: node --env-file=.env.local scripts/italy/apply-italy-coords-medium-manual.mjs
// Apply: node --env-file=.env.local scripts/italy/apply-italy-coords-medium-manual.mjs --apply

import { writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const APPLY = process.argv.includes('--apply')
const TODAY = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/italy/courses-backup-italy-coords-medium-manual-${TODAY}.json`
const LOG_PATH    = `scripts/italy/apply-italy-coords-medium-manual-log.json`

// 9 klubber, manuelt verificerede coords fra Thomas (2026-05-04)
// db.lat/db.lon er pre-apply state — bruges til drift-detektion
const FIXES = [
  {
    club: 'Ugolino Golf Club',
    courseIds: ['0c398b53-10b1-41ef-b78b-9e38d0952189'],
    db: { lat: 43.7287475, lon: 11.2955063 },
    new: { lat: 43.69755475261249, lon: 11.296582938936451 },
  },
  {
    club: 'Golf Continental Verbania',
    courseIds: [
      '0ba0067b-b792-40a6-9d3d-0382f1251192',
      '5a599c72-27be-4184-879c-d73402374790',
      'bc9fac7d-e342-456e-b4f8-50afe6eb1437',
    ],
    db: { lat: 45.9456753, lon: 8.4892373 },
    new: { lat: 45.94799980842132, lon: 8.475725854407814 },
  },
  {
    club: 'Golf Club Valdichiana',
    courseIds: ['83afa559-2e3f-449c-bdc4-dfd6d8eabf6d'],
    db: { lat: 43.2121236, lon: 11.7364829 },
    new: { lat: 43.21980248426188, lon: 11.819346904093328 },
  },
  {
    club: 'Golf Club Punta Ala',
    courseIds: ['eac1b559-a38d-4fb5-aa1c-f5f4b88c64cc'],
    db: { lat: 42.8012564, lon: 10.75113 },
    new: { lat: 42.800006149338905, lon: 10.770711342669735 },
  },
  {
    club: 'Is Arenas Golf & Country Club',
    courseIds: ['80e03896-b799-4dcb-8eb9-bca321a8f975'],
    db: { lat: 40.0570481, lon: 8.4707501 },
    new: { lat: 40.054052418774134, lon: 8.475878062466672 },
  },
  {
    club: 'I Girasoli Golf Club',
    courseIds: ['b30e0c07-c4fa-413f-a5ef-9d28763dcf5d'],
    db: { lat: 44.8532723, lon: 7.7737163 },
    new: { lat: 44.85781037599698, lon: 7.8177265813300645 },
  },
  {
    club: 'Golf Club Cervino',
    courseIds: ['cae6c915-306a-4ebf-b6ec-23e5e77560ea'],
    db: { lat: 45.8769793, lon: 7.622792 },
    new: { lat: 45.936112549259235, lon: 7.628837349314311 },
  },
  {
    club: 'Torre dei Ronchi',
    courseIds: ['c25fa691-b001-45c8-8dee-1597e881ddaf'],
    db: { lat: 44.4580704, lon: 7.5581367 },
    new: { lat: 44.44129381251756, lon: 7.5788541217838175 },
  },
  {
    club: 'Golf Club Grado',
    courseIds: ['cb485dc3-0500-427a-be87-43a421681d4e'],
    db: { lat: 45.7055341, lon: 13.4633207 },
    new: { lat: 45.705840849609864, lon: 13.462770267886244 },
  },
]

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// Float compare helper for drift-detektion
const COORD_EPSILON = 0.0000001
const sameCoord = (a, b) => Math.abs(a - b) < COORD_EPSILON

// ------ 1. Pre-flight: load all IT courses (for backup + drift check) ------

console.log(`\n=== apply-italy-coords-medium-manual ===`)
console.log(`Mode: ${APPLY ? 'APPLY (will write to DB)' : 'DRY-RUN (no writes)'}`)
console.log(`Targets: ${FIXES.length} klubber, ${FIXES.reduce((s, f) => s + f.courseIds.length, 0)} course-rows`)

const { data: allItRows, error: fetchErr } = await supabase
  .from('courses')
  .select('id, club, name, latitude, longitude')
  .eq('country', 'Italy')

if (fetchErr) {
  console.error('FETCH ERROR:', fetchErr)
  process.exit(1)
}

console.log(`\nLoaded ${allItRows.length} IT-rows from DB`)

// ------ 2. Drift-detektion ------

const byId = new Map(allItRows.map(r => [r.id, r]))
const driftWarnings = []
const skipFix = new Set()

for (const fix of FIXES) {
  for (const id of fix.courseIds) {
    const row = byId.get(id)
    if (!row) {
      driftWarnings.push({ club: fix.club, id, reason: 'row not found in DB' })
      skipFix.add(fix.club)
      continue
    }
    if (!sameCoord(row.latitude, fix.db.lat) || !sameCoord(row.longitude, fix.db.lon)) {
      driftWarnings.push({
        club: fix.club, id,
        reason: 'coords changed since audit',
        audit_db: fix.db,
        current: { lat: row.latitude, lon: row.longitude },
      })
      skipFix.add(fix.club)
    }
  }
}

if (driftWarnings.length > 0) {
  console.log(`\n⚠️  ${driftWarnings.length} drift warnings:`)
  for (const w of driftWarnings) console.log(' -', w)
} else {
  console.log(`\n✓ Drift check: 0 warnings — DB unchanged since audit`)
}

// ------ 3. Backup (only if --apply) ------

if (APPLY) {
  writeFileSync(BACKUP_PATH, JSON.stringify(allItRows, null, 2))
  console.log(`\n✓ Backup written: ${BACKUP_PATH} (${allItRows.length} rows)`)
}

// ------ 4. Apply per klub ------

const results = []
for (const fix of FIXES) {
  if (skipFix.has(fix.club)) {
    results.push({ club: fix.club, status: 'SKIPPED (drift)', courseIds: fix.courseIds, before: fix.db, after: null })
    continue
  }

  if (!APPLY) {
    // Dry-run: just record what would happen
    results.push({
      club: fix.club, status: 'DRY-RUN',
      courseIds: fix.courseIds, before: fix.db, after: fix.new,
    })
    continue
  }

  const { error } = await supabase
    .from('courses')
    .update({ latitude: fix.new.lat, longitude: fix.new.lon })
    .in('id', fix.courseIds)

  if (error) {
    results.push({ club: fix.club, status: 'ERROR', error: error.message, courseIds: fix.courseIds, before: fix.db, after: fix.new })
    console.error(`  ✗ ${fix.club}: ${error.message}`)
  } else {
    results.push({ club: fix.club, status: 'OK', courseIds: fix.courseIds, before: fix.db, after: fix.new })
    console.log(`  ✓ ${fix.club}: ${fix.courseIds.length} row(s) updated`)
  }
}

// ------ 5. Log ------

const log = {
  timestamp: new Date().toISOString(),
  mode: APPLY ? 'apply' : 'dry-run',
  totalClubs: FIXES.length,
  totalRows: FIXES.reduce((s, f) => s + f.courseIds.length, 0),
  driftWarnings,
  results,
}
writeFileSync(LOG_PATH, JSON.stringify(log, null, 2))

console.log(`\n--- Summary ---`)
console.log(`OK:        ${results.filter(r => r.status === 'OK').length}`)
console.log(`DRY-RUN:   ${results.filter(r => r.status === 'DRY-RUN').length}`)
console.log(`SKIPPED:   ${results.filter(r => r.status === 'SKIPPED (drift)').length}`)
console.log(`ERROR:     ${results.filter(r => r.status === 'ERROR').length}`)
console.log(`\nLog: ${LOG_PATH}`)
if (APPLY) console.log(`Backup: ${BACKUP_PATH}`)
if (!APPLY) console.log(`\n→ Run with --apply to write changes`)
