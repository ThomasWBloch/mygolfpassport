// Apply Italy coord fixes from audit. Pattern fra Holland's apply-netherlands-coords.mjs,
// med Italy-specifikke krav:
//   1. Backup obligatorisk: ALL 484 IT-rows skrives til disk FØR nogen UPDATE.
//   2. Default = dry-run; --apply for at skrive.
//   3. Per-klub UPDATE (ikke batch).
//   4. Sanity check: SELECT current lat/lon, verificér de matcher audit.db.lat/lon.
//      Skip + log warning hvis DB-driftet siden audit blev genereret.
//   5. Touch INGEN andre felter — kun latitude og longitude.
//
// Kun tier='high' fra italy-coords-audit.json (17 klubber, ~28 courses).
// Marco Simone forventes blandt dem.
//
// Run dry-run:
//   node --env-file=.env.local scripts/italy/apply-italy-coords.mjs
// Apply:
//   node --env-file=.env.local scripts/italy/apply-italy-coords.mjs --apply
// Skip specifikke klubber (komma-separeret):
//   node --env-file=.env.local scripts/italy/apply-italy-coords.mjs --apply --skip="Castellaro Golf Resort,Lanzo"

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const AUDIT_PATH = 'scripts/italy/italy-coords-audit.json'
const LOG_PATH = 'scripts/italy/apply-italy-coords-log.json'
const backupPathFor = (date) => `scripts/italy/courses-backup-italy-coords-${date}.json`

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const skipClubs = new Set(
  (args.find((a) => a.startsWith('--skip='))?.slice(7) || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)

console.log(apply ? 'APPLY mode' : 'DRY RUN (pass --apply to write)')
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}`)
console.log('')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// ── 0. Read audit, filter til high-tier ───────────────────────────────────
const audit = JSON.parse(readFileSync(AUDIT_PATH, 'utf8'))
const targets = (audit.audit || []).filter((e) => e.tier === 'high')
const totalTargetCourses = targets.reduce((s, e) => s + e.courseCount, 0)

console.log(`Audit source:        ${AUDIT_PATH}`)
console.log(`Targets (tier=high): ${targets.length} klubber`)
console.log(`Target courses:      ${totalTargetCourses}`)
console.log('')

if (targets.length === 0) {
  console.log('Ingen targets — afslutter.')
  process.exit(0)
}

// ── 1. Backup alle Italy-rows før vi rører noget ──────────────────────────
const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
const backupPath = backupPathFor(today)

console.log('=== Step 1/3: Backup alle Italy-rows ===')
const backupRows = []
const PAGE = 1000
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('country', 'Italy')
    .order('club')
    .order('id')
    .range(from, from + PAGE - 1)
  if (error) {
    console.error('Backup SELECT error:', error.message)
    process.exit(1)
  }
  if (!data || data.length === 0) break
  backupRows.push(...data)
  if (data.length < PAGE) break
}
console.log(`Fetched ${backupRows.length} Italy-rows fra DB`)

if (apply) {
  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        country: 'Italy',
        backedUpAt: new Date().toISOString(),
        rowCount: backupRows.length,
        purpose: 'Pre-apply snapshot before italy-coords-audit high-tier UPDATE',
        rows: backupRows,
      },
      null,
      2,
    ),
  )
  console.log(`Backup skrevet: ${backupPath}`)
} else {
  console.log(`Backup-fil i apply-mode: ${backupPath} (springet over i dry-run)`)
}
console.log('')

// ── 2. Per-klub apply ─────────────────────────────────────────────────────
console.log(`=== Step 2/3: Per-klub apply (${apply ? 'APPLY' : 'DRY RUN'}) ===`)

let processed = 0
let coursesAffected = 0
let coursesUpdated = 0
let skippedDrift = 0
let skippedAtTarget = 0
let skippedUser = 0
const log = []
const failures = []

for (const e of targets) {
  if (skipClubs.has(e.club)) {
    console.log(`SKIP ${e.club} (i --skip)`)
    skippedUser++
    log.push({ club: e.club, courseIds: e.courseIds, status: 'user_skip' })
    continue
  }

  // Sanity check: hent current rows
  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select('id, club, latitude, longitude')
    .in('id', e.courseIds)

  if (selErr) {
    console.log(`✗ ${e.club} — SELECT-fejl: ${selErr.message}`)
    failures.push({ club: e.club, stage: 'select', error: selErr.message })
    log.push({ club: e.club, courseIds: e.courseIds, status: 'select_error', error: selErr.message })
    continue
  }

  if (!rows || rows.length !== e.courseIds.length) {
    const msg = `forventede ${e.courseIds.length} rows, fik ${rows?.length || 0}`
    console.log(`✗ ${e.club} — ${msg}`)
    failures.push({ club: e.club, stage: 'select', error: msg })
    log.push({ club: e.club, courseIds: e.courseIds, status: 'row_count_mismatch', error: msg })
    continue
  }

  // Drift check: matcher current DB-coords stadig audit.db.lat/lon?
  const auditLat = e.db.lat
  const auditLon = e.db.lon
  const drifted = rows.filter((r) => r.latitude !== auditLat || r.longitude !== auditLon)

  if (drifted.length > 0) {
    console.log(`⚠ SKIP ${e.club} — DB-drift siden audit (${drifted.length}/${rows.length} rows ændret)`)
    for (const d of drifted) {
      console.log(`    id=${d.id}: audit (${auditLat}, ${auditLon}), nu (${d.latitude}, ${d.longitude})`)
    }
    skippedDrift++
    log.push({
      club: e.club,
      courseIds: e.courseIds,
      status: 'skipped_drift',
      driftedRows: drifted.map((d) => ({
        id: d.id,
        audit: { lat: auditLat, lon: auditLon },
        current: { lat: d.latitude, lon: d.longitude },
      })),
    })
    continue
  }

  // Allerede ved consensus?
  const targetLat = +e.consensus.lat.toFixed(7)
  const targetLon = +e.consensus.lon.toFixed(7)
  const allAtTarget = rows.every(
    (r) => r.latitude === targetLat && r.longitude === targetLon,
  )
  if (allAtTarget) {
    console.log(`SKIP ${e.club} (allerede ved consensus)`)
    skippedAtTarget++
    log.push({ club: e.club, courseIds: e.courseIds, status: 'already_at_target' })
    continue
  }

  processed++
  coursesAffected += rows.length

  console.log(`${e.club} (${rows.length} courses)`)
  console.log(`  DB nu:    ${auditLat}, ${auditLon}`)
  console.log(
    `  → Ny:     ${targetLat}, ${targetLon}  (db→consensus ${e.distFromDb_m}m, OSM↔LC ${e.osmLcAgreement_m ?? '?'}m)`,
  )

  if (apply) {
    const { error: updErr, count } = await supabase
      .from('courses')
      .update({ latitude: targetLat, longitude: targetLon }, { count: 'exact' })
      .in('id', e.courseIds)
    if (updErr) {
      console.log(`  ✗ UPDATE-fejl: ${updErr.message}`)
      failures.push({ club: e.club, stage: 'update', error: updErr.message })
      log.push({
        club: e.club,
        courseIds: e.courseIds,
        before: rows.map((r) => ({ id: r.id, lat: r.latitude, lon: r.longitude })),
        after: null,
        status: 'update_error',
        error: updErr.message,
      })
    } else {
      console.log(`  ✓ Opdaterede ${count} row(s)`)
      coursesUpdated += count
      log.push({
        club: e.club,
        courseIds: e.courseIds,
        before: rows.map((r) => ({ id: r.id, lat: r.latitude, lon: r.longitude })),
        after: { latitude: targetLat, longitude: targetLon },
        distFromDb_m: e.distFromDb_m,
        osmLcAgreement_m: e.osmLcAgreement_m,
        status: 'applied',
        appliedAt: new Date().toISOString(),
      })
    }
  } else {
    log.push({
      club: e.club,
      courseIds: e.courseIds,
      before: rows.map((r) => ({ id: r.id, lat: r.latitude, lon: r.longitude })),
      after: { latitude: targetLat, longitude: targetLon },
      distFromDb_m: e.distFromDb_m,
      osmLcAgreement_m: e.osmLcAgreement_m,
      status: 'dry_run_planned',
    })
  }
}

// ── 3. Write log ──────────────────────────────────────────────────────────
console.log('')
console.log('=== Step 3/3: Write log ===')

writeFileSync(
  LOG_PATH,
  JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      tier: 'high',
      dryRun: !apply,
      backupPath: apply ? backupPath : null,
      totalTargets: targets.length,
      processed,
      coursesAffected,
      coursesUpdated: apply ? coursesUpdated : 0,
      skipped: {
        drift: skippedDrift,
        alreadyAtTarget: skippedAtTarget,
        userSkip: skippedUser,
      },
      failures,
      results: log,
    },
    null,
    2,
  ),
)
console.log(`Wrote: ${LOG_PATH}`)
console.log('')

// ── Summary ───────────────────────────────────────────────────────────────
console.log('--- Summary ---')
console.log(`Mode:                  ${apply ? 'APPLY' : 'DRY RUN'}`)
console.log(`Targets (tier=high):   ${targets.length}`)
if (apply) console.log(`Backup:                ${backupPath}`)
console.log(`Klubber processeret:   ${processed}`)
console.log(`Courses berørt:        ${coursesAffected}`)
if (apply) console.log(`Rows opdateret:        ${coursesUpdated}`)
console.log(`Skipped:`)
console.log(`  DB-drift:            ${skippedDrift}`)
console.log(`  Allerede ved target: ${skippedAtTarget}`)
console.log(`  User-skip:           ${skippedUser}`)
console.log(`Failures:              ${failures.length}`)
if (!apply) {
  console.log('')
  console.log('(dry run — kør med --apply for at skrive)')
}
