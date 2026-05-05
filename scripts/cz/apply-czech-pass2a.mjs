// Apply CZ Pass 2a — federation-driven kontakt + coord-fix.
//
// Source: scripts/cz/czech-match-candidates.json
// Targets:
//   - bucket=high|medium|coord_bug → opdater website/email/phone (kun hvis DB.value er null/tom)
//   - bucket=coord_bug → også opdater latitude/longitude (CGF har tabel-GPS)
//   - bucket=low|no_match → SKIP (manuel review queue)
//
// Sikkerhed:
//   - DRY-run default. Brug --apply for at skrive til DB.
//   - --apply kræver eksplicit "ja" via env CONFIRM=ja for at fortsætte.
//   - Pre-apply backup: courses-backup-czech-pass2a-<date>.json
//   - Per-row log: apply-czech-pass2a-log.json (før/efter pr. felt)
//   - Federation-website overrides ikke DB.website når DB allerede har værdi.
//
// Run:
//   node --env-file=.env.local scripts/cz/apply-czech-pass2a.mjs            (dry)
//   CONFIRM=ja node --env-file=.env.local scripts/cz/apply-czech-pass2a.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CANDIDATES_PATH = 'scripts/cz/czech-match-candidates.json'
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/cz/courses-backup-czech-pass2a-${today}.json`
const LOG_PATH = `scripts/cz/apply-czech-pass2a-log.json`

const APPLY = process.argv.includes('--apply')
const CONFIRMED = process.env.CONFIRM === 'ja'

// Buckets vi opdaterer
const APPLY_BUCKETS = new Set(['high', 'medium', 'coord_bug'])

function pickBest(c) {
  const fed = c.best
  return {
    website: fed?.website || null,
    email: fed?.email || null,
    phone: fed?.phone || null,
    // For coord-fix: brug FØRSTE course's coords (klubs hovedhřiště)
    lat: fed?.courses?.[0]?.lat ?? null,
    lng: fed?.courses?.[0]?.lng ?? null,
  }
}

async function backup() {
  console.log('Pre-apply backup of CZ rows…')
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .or('country.eq.Czech Republic,country.eq.Czechia')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  writeFileSync(BACKUP_PATH, JSON.stringify(all, null, 2), 'utf8')
  console.log(`  wrote ${BACKUP_PATH} (${all.length} rows)`)
  return all
}

function planUpdate(dbRow, fed, isCoordBug) {
  const set = {}
  const log = { id: dbRow.id, club: dbRow.club, name: dbRow.name, before: {}, after: {} }
  // Only fill empty fields — aldrig overskriv eksisterende DB-værdi
  for (const k of ['website', 'email', 'phone']) {
    const cur = dbRow[k]
    const next = fed[k]
    if (next && (cur == null || cur === '')) {
      set[k] = next
      log.before[k] = cur
      log.after[k] = next
    }
  }
  // Coord-fix kun for coord_bug bucket
  if (isCoordBug && fed.lat != null && fed.lng != null) {
    log.before.latitude = dbRow.latitude
    log.before.longitude = dbRow.longitude
    log.after.latitude = fed.lat
    log.after.longitude = fed.lng
    set.latitude = fed.lat
    set.longitude = fed.lng
  }
  return Object.keys(set).length ? { set, log } : null
}

async function main() {
  const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
  const targets = candidates.filter((c) => APPLY_BUCKETS.has(c.bucket))
  console.log(`Total target klubber: ${targets.length} (high+medium+coord_bug)`)

  if (APPLY) {
    if (!CONFIRMED) {
      console.error('--apply kræver CONFIRM=ja env. Aborter.')
      process.exit(1)
    }
    await backup()
  } else {
    console.log('DRY-RUN — ingen DB skrivning. Tilføj --apply + CONFIRM=ja.')
  }

  // Plan updates per row (én klub kan have multiple rows)
  const plan = []
  let rowCt = 0
  for (const cand of targets) {
    const fed = pickBest(cand)
    if (!fed.website && !fed.email && !fed.phone && !(cand.bucket === 'coord_bug' && fed.lat)) continue
    for (const dbRow of cand.dbRows) {
      rowCt++
      const upd = planUpdate(dbRow, fed, cand.bucket === 'coord_bug')
      if (upd) plan.push({ klub: cand.dbClub, bucket: cand.bucket, ...upd })
    }
  }
  console.log(`Planned row-updates: ${plan.length} / ${rowCt} candidate-rows`)

  // Field-level summary
  const counts = { website: 0, email: 0, phone: 0, latitude: 0, longitude: 0 }
  for (const p of plan) {
    for (const k of Object.keys(p.set)) counts[k]++
  }
  console.log('  fields to update:', JSON.stringify(counts))

  if (!APPLY) {
    writeFileSync(LOG_PATH, JSON.stringify({ dryRun: true, plan }, null, 2), 'utf8')
    console.log(`Wrote dry-run plan to ${LOG_PATH}`)
    return
  }

  // Execute updates
  console.log(`\nApplying ${plan.length} updates…`)
  const results = []
  let ok = 0, fail = 0
  for (const p of plan) {
    const { error } = await sb.from('courses').update(p.set).eq('id', p.log.id)
    if (error) {
      results.push({ id: p.log.id, error: error.message, ...p.log })
      fail++
    } else {
      results.push({ ok: true, ...p.log })
      ok++
    }
    if ((ok + fail) % 50 === 0) console.log(`  ${ok + fail}/${plan.length}…`)
  }
  writeFileSync(LOG_PATH, JSON.stringify({ applied: true, ok, fail, results }, null, 2), 'utf8')
  console.log(`\nDone. ok=${ok} fail=${fail}. Log: ${LOG_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
