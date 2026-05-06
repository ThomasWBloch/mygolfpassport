// Apply Canada Pass 2a — federation-driven kontakt fra Golf Canada.
// Source: scripts/canada/canada-match-candidates.json
// Targets: bucket=high (+ medium hvis --include-medium) → fill-NULL website + phone + email
//
// Per-felt fill-NULL strategi: kun overskriv hvis DB-feltet er null/empty.
// Eksisterende værdier i DB rør vi IKKE.
//
// Run:
//   node --env-file=.env.local scripts/canada/apply-canada-pass2a.mjs                              (dry, high only)
//   node --env-file=.env.local scripts/canada/apply-canada-pass2a.mjs --include-medium             (dry, high+medium)
//   CONFIRM=ja node --env-file=.env.local scripts/canada/apply-canada-pass2a.mjs --apply           (live, high only)
//   CONFIRM=ja node --env-file=.env.local scripts/canada/apply-canada-pass2a.mjs --apply --include-medium  (live, high+medium)

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CANDIDATES_PATH = 'scripts/canada/canada-match-candidates.json'
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/canada/courses-backup-canada-pass2a-${today}.json`
const LOG_PATH = `scripts/canada/apply-canada-pass2a-log.json`

const APPLY = process.argv.includes('--apply')
const INCLUDE_MEDIUM = process.argv.includes('--include-medium')
const CONFIRMED = process.env.CONFIRM === 'ja'
const APPLY_BUCKETS = INCLUDE_MEDIUM ? new Set(['high', 'medium']) : new Set(['high'])

async function backup() {
  console.log('Pre-apply backup of Canada rows…')
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('id, club, name, latitude, longitude, website, phone, email, holes, is_combo, is_displayed')
      .eq('country', 'Canada')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  writeFileSync(BACKUP_PATH, JSON.stringify(all, null, 2), 'utf8')
  console.log(`  wrote ${BACKUP_PATH} (${all.length} rows)`)
}

function planUpdate(dbRow, fed) {
  const set = {}
  const log = { id: dbRow.id, club: dbRow.club, name: dbRow.name, before: {}, after: {} }
  // Canada feed has all three fields — fill-NULL only
  for (const k of ['website', 'phone', 'email']) {
    const cur = dbRow[k]
    const next = fed[k]
    if (next && (cur == null || cur === '')) {
      set[k] = next
      log.before[k] = cur
      log.after[k] = next
    }
  }
  return Object.keys(set).length ? { set, log } : null
}

async function main() {
  const data = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
  const candidates = data.candidates
  const targets = candidates.filter((c) => APPLY_BUCKETS.has(c.bucket))
  console.log(`Targets: ${targets.length} klubber (${[...APPLY_BUCKETS].join('+')})`)

  if (APPLY) {
    if (!CONFIRMED) {
      console.error('--apply kræver CONFIRM=ja')
      process.exit(1)
    }
    await backup()
  } else {
    console.log('DRY-RUN — ingen DB skrivning. Tilføj --apply + CONFIRM=ja.')
  }

  const plan = []
  let rowCt = 0
  for (const cand of targets) {
    const fed = {
      website: cand.best?.website || null,
      phone: cand.best?.phone || null,
      email: cand.best?.email || null,
    }
    if (!fed.website && !fed.phone && !fed.email) continue
    for (const dbRow of cand.dbRows) {
      rowCt++
      const upd = planUpdate(dbRow, fed)
      if (upd) plan.push({ klub: cand.dbClub, facility: cand.best.facilityName, ...upd })
    }
  }
  console.log(`Planned row-updates: ${plan.length} / ${rowCt} candidate-rows`)

  const counts = { website: 0, phone: 0, email: 0 }
  for (const p of plan) for (const k of Object.keys(p.set)) counts[k]++
  console.log('  fields:', JSON.stringify(counts))

  // klub-level coverage uplift estimate
  const klubsWithWebUpdate = new Set()
  const klubsWithPhoneUpdate = new Set()
  const klubsWithEmailUpdate = new Set()
  for (const p of plan) {
    if (p.set.website) klubsWithWebUpdate.add(p.klub)
    if (p.set.phone) klubsWithPhoneUpdate.add(p.klub)
    if (p.set.email) klubsWithEmailUpdate.add(p.klub)
  }
  console.log(`  klub-level: web=${klubsWithWebUpdate.size} phone=${klubsWithPhoneUpdate.size} email=${klubsWithEmailUpdate.size}`)

  if (!APPLY) {
    writeFileSync(LOG_PATH, JSON.stringify({ dryRun: true, buckets: [...APPLY_BUCKETS], plan: plan.slice(0, 100), planSize: plan.length, fieldCounts: counts }, null, 2), 'utf8')
    console.log(`Wrote dry-run plan-summary to ${LOG_PATH} (first 100 rows shown)`)
    return
  }

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
    if ((ok + fail) % 500 === 0) console.log(`  ${ok + fail}/${plan.length}…`)
  }
  writeFileSync(LOG_PATH, JSON.stringify({ applied: true, buckets: [...APPLY_BUCKETS], ok, fail, fieldCounts: counts, results: results.slice(-200) }, null, 2), 'utf8')
  console.log(`\nDone. ok=${ok} fail=${fail}. Log: ${LOG_PATH} (last 200 results shown)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
