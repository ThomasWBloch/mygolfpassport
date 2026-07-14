// Apply Austria Pass 2a website + email + address enrichment fra match-candidates.
// Federation-first per-felt-confidence (jf. session 29 design).
//
// Krav:
//   1. Læs austria-match-candidates.json, kun candidates.high (+ optionally medium).
//   2. Backup obligatorisk: ALL Austria-rows til disk FØR nogen UPDATE.
//   3. Default = dry-run; --apply for at skrive.
//   4. Per-klub UPDATE — atomicity per klub.
//   5. Per-felt drift-detektion: SELECT current values, skip felt hvis et hvilket
//      som helst row har non-null værdi siden matcher kørte. Log warning.
//   6. Per-felt WHERE-clause som DB-niveau safety: UPDATE ... AND <field> IS NULL.
//   7. Touch KUN felter der er listet i ALLOWED_FIELDS — ingen andre.
//
// Felter (federation-first scope):
//   website  — OEGV → OSM
//   email    — OEGV only
//   address  — OEGV → LC → OSM
//   holes    — kun hvis dB tom (i AT er holes 100% udfyldt fra Golfapi, så typisk ingen apply)
//
// Tiers: --tier=high (default), --tier=medium, --tier=both
//
// Run dry-run (default tier=high):
//   node --env-file=.env.local scripts/austria/apply-austria-pass2a.mjs
// Apply high+medium:
//   node --env-file=.env.local scripts/austria/apply-austria-pass2a.mjs --tier=both --apply
// Skip specifikke klubber (verbatim klub-navn):
//   node --env-file=.env.local scripts/austria/apply-austria-pass2a.mjs --apply --skip="Foo,Bar"

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const CANDIDATES_PATH = 'scripts/austria/austria-match-candidates.json'
const ALLOWED_FIELDS = new Set(['website', 'email', 'address', 'holes'])
const logPathFor = (tier) => `scripts/austria/apply-austria-pass2a-${tier}-log.json`
const backupPathFor = (tier, date) =>
  `scripts/austria/courses-backup-austria-pass2a-${tier}-${date}.json`

const args = process.argv.slice(2)
const apply = args.includes('--apply')
const tierArg = args.find((a) => a.startsWith('--tier='))?.slice(7) || 'high'
const VALID_TIERS = ['high', 'medium', 'both']
if (!VALID_TIERS.includes(tierArg)) {
  console.error(`Invalid --tier=${tierArg}. Valid: ${VALID_TIERS.join(', ')}`)
  process.exit(1)
}
const skipClubs = new Set(
  (args.find((a) => a.startsWith('--skip='))?.slice(7) || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)

console.log(apply ? 'APPLY mode' : 'DRY RUN (pass --apply to write)')
console.log(`Tier:               ${tierArg}`)
if (skipClubs.size) console.log(`Skip list: ${[...skipClubs].join(', ')}`)
console.log('')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// ── 0. Read candidates, filter til ønsket tier ───────────────────────────
const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
const bucketEntries = []
if (tierArg === 'high' || tierArg === 'both') bucketEntries.push(...(candidates.high || []))
if (tierArg === 'medium' || tierArg === 'both') bucketEntries.push(...(candidates.medium || []))

// Sanity: drop entries without proposedUpdate AND drop any unknown fields
// proactively (so a stray match-script change can't widen the blast radius).
const targets = bucketEntries
  .filter((e) => e.proposedUpdate)
  .map((e) => {
    const filtered = {}
    for (const [k, v] of Object.entries(e.proposedUpdate)) {
      if (ALLOWED_FIELDS.has(k)) filtered[k] = v
    }
    return { ...e, proposedUpdate: filtered }
  })
  .filter((e) => Object.keys(e.proposedUpdate).length > 0)

const totalCourses = targets.reduce((s, e) => s + e.courseCount, 0)

// Per-field counts
const fieldCounts = {}
for (const f of ALLOWED_FIELDS) fieldCounts[f] = { clubs: 0, rows: 0 }
for (const e of targets) {
  for (const f of Object.keys(e.proposedUpdate)) {
    fieldCounts[f].clubs++
    fieldCounts[f].rows += e.courseCount
  }
}

console.log(`Source:                 ${CANDIDATES_PATH}`)
console.log(`Targets (tier=${tierArg}):  ${targets.length} klubber, ${totalCourses} courses`)
for (const f of ALLOWED_FIELDS) {
  if (fieldCounts[f].clubs === 0) continue
  console.log(`  ${f}: ${fieldCounts[f].clubs} klubber, ${fieldCounts[f].rows} courses`)
}
console.log('')

if (targets.length === 0) {
  console.log('Ingen targets — afslutter.')
  process.exit(0)
}

// ── 1. Backup alle Austria-rows ──────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const backupPath = backupPathFor(tierArg, today)
const logPath = logPathFor(tierArg)

console.log('=== Step 1/3: Backup alle Austria-rows ===')
const backupRows = []
const PAGE = 1000
for (let from = 0; ; from += PAGE) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('country', 'Austria')
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
console.log(`Fetched ${backupRows.length} Austria-rows fra DB`)

if (apply) {
  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        country: 'Austria',
        backedUpAt: new Date().toISOString(),
        rowCount: backupRows.length,
        purpose: `Pre-apply snapshot before Pass 2a (${tierArg}) website/email/address enrichment`,
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

// ── 2. Per-klub apply ────────────────────────────────────────────────────
console.log(`=== Step 2/3: Per-klub apply (${apply ? 'APPLY' : 'DRY RUN'}) ===`)

let processedClubs = 0
const fieldsAppliedTotals = {}
for (const f of ALLOWED_FIELDS) fieldsAppliedTotals[f] = { clubs: 0, rows: 0 }
let driftWarnings = 0
let skippedUser = 0
const log = []
const failures = []

const isEmpty = (v) => v == null || String(v).trim() === ''

// Build the SELECT field list dynamically — only fields we'll touch + id/club for context
const selectFields = ['id', 'club', ...ALLOWED_FIELDS].join(', ')

for (const entry of targets) {
  if (skipClubs.has(entry.club)) {
    console.log(`SKIP ${entry.club} (i --skip)`)
    skippedUser++
    log.push({
      club: entry.club,
      courseIds: entry.courseIds,
      fieldsAttempted: [],
      fieldsApplied: [],
      fieldsSkipped: [],
      status: 'user_skip',
    })
    continue
  }

  const proposed = entry.proposedUpdate
  const fieldsAttempted = Object.keys(proposed)

  // Hent current rows (drift-detection grundlag)
  const { data: rows, error: selErr } = await supabase
    .from('courses')
    .select(selectFields)
    .in('id', entry.courseIds)

  if (selErr) {
    console.log(`✗ ${entry.club} — SELECT-fejl: ${selErr.message}`)
    failures.push({ club: entry.club, stage: 'select', error: selErr.message })
    log.push({
      club: entry.club,
      courseIds: entry.courseIds,
      fieldsAttempted,
      fieldsApplied: [],
      fieldsSkipped: [],
      status: 'select_error',
      error: selErr.message,
    })
    continue
  }

  if (!rows || rows.length !== entry.courseIds.length) {
    const msg = `forventede ${entry.courseIds.length} rows, fik ${rows?.length || 0}`
    console.log(`✗ ${entry.club} — ${msg}`)
    failures.push({ club: entry.club, stage: 'select', error: msg })
    log.push({
      club: entry.club,
      courseIds: entry.courseIds,
      fieldsAttempted,
      fieldsApplied: [],
      fieldsSkipped: [],
      status: 'row_count_mismatch',
      error: msg,
    })
    continue
  }

  processedClubs++

  // Snapshot before/after for log
  const beforeRows = rows.map((r) => {
    const o = { id: r.id }
    for (const f of fieldsAttempted) o[f] = r[f]
    return o
  })
  const after = beforeRows.map((r) => ({ ...r }))
  const fieldsApplied = []
  const fieldsSkipped = []

  console.log(`${entry.club} (${rows.length} courses, fields: ${fieldsAttempted.join(', ')})`)

  for (const field of fieldsAttempted) {
    const proposedValue = proposed[field]

    // Drift check: any row har non-null værdi for dette felt?
    const driftedRows = rows.filter((r) => !isEmpty(r[field]))
    if (driftedRows.length > 0) {
      console.log(
        `  ⚠ SKIP ${field}: drift detected (${driftedRows.length}/${rows.length} rows har allerede værdi)`,
      )
      for (const d of driftedRows) {
        console.log(`      id=${d.id}: nu=${JSON.stringify(d[field])}`)
      }
      fieldsSkipped.push({
        field,
        reason: 'drift',
        driftedRows: driftedRows.map((r) => ({ id: r.id, currentValue: r[field] })),
      })
      driftWarnings++
      continue
    }

    if (apply) {
      const { error: updErr, count } = await supabase
        .from('courses')
        .update({ [field]: proposedValue }, { count: 'exact' })
        .in('id', entry.courseIds)
        .is(field, null) // DB-niveau safety belt-and-suspenders

      if (updErr) {
        console.log(`  ✗ ${field}: UPDATE-fejl: ${updErr.message}`)
        fieldsSkipped.push({ field, reason: 'update_error', error: updErr.message })
        failures.push({ club: entry.club, field, stage: 'update', error: updErr.message })
        continue
      }

      console.log(`  ✓ ${field}: opdaterede ${count} row(s)  (value: ${JSON.stringify(proposedValue)})`)
      fieldsApplied.push({ field, value: proposedValue, rowsUpdated: count })
      fieldsAppliedTotals[field].clubs++
      fieldsAppliedTotals[field].rows += count

      for (const a of after) if (isEmpty(a[field])) a[field] = proposedValue
    } else {
      // Dry run
      console.log(
        `  Would set ${field} = ${JSON.stringify(proposedValue)} på ${rows.length} row(s)`,
      )
      fieldsApplied.push({ field, value: proposedValue, wouldUpdateRows: rows.length })
      fieldsAppliedTotals[field].clubs++
      fieldsAppliedTotals[field].rows += rows.length

      for (const a of after) if (isEmpty(a[field])) a[field] = proposedValue
    }
  }

  log.push({
    club: entry.club,
    courseIds: entry.courseIds,
    fieldsAttempted,
    fieldsApplied,
    fieldsSkipped,
    before: beforeRows,
    after,
    status: apply ? 'applied' : 'dry_run_planned',
  })
}

// ── 3. Write log ─────────────────────────────────────────────────────────
console.log('')
console.log('=== Step 3/3: Write log ===')

writeFileSync(
  logPath,
  JSON.stringify(
    {
      timestamp: new Date().toISOString(),
      tier: tierArg,
      dryRun: !apply,
      backupPath: apply ? backupPath : null,
      totalTargets: targets.length,
      processedClubs,
      fieldsAppliedTotals,
      driftWarnings,
      skippedUser,
      failures,
      results: log,
    },
    null,
    2,
  ),
)
console.log(`Wrote: ${logPath}`)
console.log('')

// ── Summary ──────────────────────────────────────────────────────────────
const verb = apply ? 'fyldt' : 'ville fylde'
console.log('--- Summary ---')
console.log(`Mode:                 ${apply ? 'APPLY' : 'DRY RUN'}`)
console.log(`Tier:                 ${tierArg}`)
console.log(`Targets:              ${targets.length}`)
if (apply) console.log(`Backup:               ${backupPath}`)
console.log(`Klubber processeret:  ${processedClubs}`)
console.log('')
for (const f of ALLOWED_FIELDS) {
  if (fieldsAppliedTotals[f].clubs === 0) continue
  console.log(`${f.padEnd(8)} ${verb}:  ${fieldsAppliedTotals[f].clubs} klubber, ${fieldsAppliedTotals[f].rows} course-rows`)
}
console.log('')
console.log(`Drift warnings:       ${driftWarnings}`)
console.log(`User skips:           ${skippedUser}`)
console.log(`Failures:             ${failures.length}`)
if (!apply) console.log('\n(dry run — kør med --apply for at skrive)')
