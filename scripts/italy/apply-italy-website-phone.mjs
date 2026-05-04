// Apply Italy website + phone enrichment fra match-candidates high-tier (85 klubber).
//
// Krav:
//   1. Læs italy-match-candidates.json, kun candidates.high (85 klubber, alle har proposedUpdate)
//   2. Backup obligatorisk: ALL 484 IT-rows til disk FØR nogen UPDATE.
//   3. Default = dry-run; --apply for at skrive.
//   4. Per-klub UPDATE (ikke batch) — atomicity per klub.
//   5. Per-felt drift-detektion: SELECT current website+phone, skip felt hvis et hvilket
//      som helst row har non-null værdi siden matcher kørte. Log warning. Apply de andre
//      felter alligevel.
//   6. Per-felt WHERE-clause som DB-niveau safety: UPDATE ... WHERE id IN (...) AND <field> IS NULL.
//      Garanterer at vi aldrig overskriver eksisterende værdier — selv hvis script-niveau
//      drift-check skulle race med en samtidig skrivning.
//   7. Touch KUN website + phone — ingen andre felter.
//
// Tiers: --tier=high (default), --tier=medium, --tier=both
//   high   = candidates.high (default — 85 klubber pr. session 28)
//   medium = candidates.medium (~51 klubber)
//   both   = high + medium union (~136 klubber)
//
// Run dry-run (default tier=high — bagudkompatibel):
//   node --env-file=.env.local scripts/italy/apply-italy-website-phone.mjs
// Medium-tier dry-run:
//   node --env-file=.env.local scripts/italy/apply-italy-website-phone.mjs --tier=medium
// Apply medium:
//   node --env-file=.env.local scripts/italy/apply-italy-website-phone.mjs --tier=medium --apply
// Skip specifikke klubber:
//   node --env-file=.env.local scripts/italy/apply-italy-website-phone.mjs --apply --skip="Foo,Bar"

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const CANDIDATES_PATH = 'scripts/italy/italy-match-candidates.json'
const logPathFor = (tier) => `scripts/italy/apply-italy-website-phone-${tier}-log.json`
const backupPathFor = (tier, date) => `scripts/italy/courses-backup-italy-pass2-${tier}-${date}.json`

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
const targets = bucketEntries.filter((e) => e.proposedUpdate)
const totalCourses = targets.reduce((s, e) => s + e.courseCount, 0)
const websiteTargets = targets.filter((e) => e.proposedUpdate?.website).length
const phoneTargets = targets.filter((e) => e.proposedUpdate?.phone).length

console.log(`Source:                 ${CANDIDATES_PATH}`)
console.log(`Targets (tier=${tierArg}):  ${targets.length} klubber, ${totalCourses} courses`)
console.log(`  Med website-foreslag: ${websiteTargets}`)
console.log(`  Med phone-foreslag:   ${phoneTargets}`)
console.log('')

if (targets.length === 0) {
  console.log('Ingen targets — afslutter.')
  process.exit(0)
}

// ── 1. Backup alle Italy-rows ────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10)
const backupPath = backupPathFor(tierArg, today)
const logPath = logPathFor(tierArg)

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
        purpose: 'Pre-apply snapshot before website+phone enrichment for high-tier clubs',
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
let websiteClubsApplied = 0
let websiteRowsApplied = 0
let phoneClubsApplied = 0
let phoneRowsApplied = 0
let driftWarnings = 0
let skippedUser = 0
const log = []
const failures = []

const isEmpty = (v) => v == null || String(v).trim() === ''

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
    .select('id, club, website, phone')
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

  const beforeRows = rows.map((r) => ({ id: r.id, website: r.website, phone: r.phone }))
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

      if (field === 'website') {
        websiteClubsApplied++
        websiteRowsApplied += count
      } else if (field === 'phone') {
        phoneClubsApplied++
        phoneRowsApplied += count
      }

      // Synthetic after
      for (const a of after) if (isEmpty(a[field])) a[field] = proposedValue
    } else {
      // Dry run
      console.log(
        `  Would set ${field} = ${JSON.stringify(proposedValue)} på ${rows.length} row(s)`,
      )
      fieldsApplied.push({ field, value: proposedValue, wouldUpdateRows: rows.length })

      if (field === 'website') {
        websiteClubsApplied++
        websiteRowsApplied += rows.length
      } else if (field === 'phone') {
        phoneClubsApplied++
        phoneRowsApplied += rows.length
      }

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
      websiteClubsApplied,
      websiteRowsApplied,
      phoneClubsApplied,
      phoneRowsApplied,
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
console.log(`Website ${verb}:    ${websiteClubsApplied} klubber, ${websiteRowsApplied} course-rows`)
console.log(`Phone ${verb}:      ${phoneClubsApplied} klubber, ${phoneRowsApplied} course-rows`)
console.log('')
console.log(`Drift warnings:       ${driftWarnings}`)
console.log(`User skips:           ${skippedUser}`)
console.log(`Failures:             ${failures.length}`)
if (!apply) console.log('\n(dry run — kør med --apply for at skrive)')
