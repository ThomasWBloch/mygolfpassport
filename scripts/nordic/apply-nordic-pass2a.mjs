// Apply Nordic GolfBox Pass 2a per land. Fill-NULL only på website/email/phone.
// Coord-fix kun for coord_bug bucket. Per memory kræver UPDATE eksplicit "ja".
//
// Run:
//   CC=DK node --env-file=.env.local scripts/nordic/apply-nordic-pass2a.mjs            (dry)
//   CC=DK CONFIRM=ja node --env-file=.env.local scripts/nordic/apply-nordic-pass2a.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CC = process.env.CC
const COUNTRY_NAME = { DK: 'Denmark', IS: 'Iceland', NO: 'Norway', SE: 'Sweden' }[CC]
if (!COUNTRY_NAME) throw new Error(`Set CC=DK|IS|NO|SE`)

const CANDIDATES_PATH = `scripts/nordic/${CC.toLowerCase()}-match-candidates.json`
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/nordic/courses-backup-${CC.toLowerCase()}-pass2a-${today}.json`
const LOG_PATH = `scripts/nordic/apply-${CC.toLowerCase()}-pass2a-log.json`

const APPLY = process.argv.includes('--apply')
const CONFIRMED = process.env.CONFIRM === 'ja'

const APPLY_BUCKETS = new Set(['high', 'medium', 'coord_bug'])

async function backup() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb.from('courses').select('*').eq('country', COUNTRY_NAME)
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  writeFileSync(BACKUP_PATH, JSON.stringify(all, null, 2), 'utf8')
  console.log(`  backup wrote ${BACKUP_PATH} (${all.length} rows)`)
}

function planUpdate(dbRow, fed, isCoordBug) {
  const set = {}
  const log = { id: dbRow.id, club: dbRow.club, name: dbRow.name, before: {}, after: {} }
  for (const k of ['website', 'email', 'phone']) {
    const cur = dbRow[k]
    const next = fed[k]
    if (next && (cur == null || cur === '')) {
      set[k] = next
      log.before[k] = cur
      log.after[k] = next
    }
  }
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
  console.log(`${CC}: target klubber=${targets.length}`)

  if (APPLY) {
    if (!CONFIRMED) { console.error('--apply kræver CONFIRM=ja'); process.exit(1) }
    await backup()
  } else {
    console.log('DRY-RUN — tilføj --apply + CONFIRM=ja')
  }

  const plan = []
  for (const c of targets) {
    if (!c.best) continue
    for (const r of c.dbRows) {
      const upd = planUpdate(r, c.best, c.bucket === 'coord_bug')
      if (upd) plan.push({ klub: c.dbClub, bucket: c.bucket, ...upd })
    }
  }
  console.log(`Planned row-updates: ${plan.length}`)

  const counts = { website: 0, email: 0, phone: 0, latitude: 0, longitude: 0 }
  for (const p of plan) for (const k of Object.keys(p.set)) counts[k]++
  console.log('  fields:', JSON.stringify(counts))

  if (!APPLY) {
    writeFileSync(LOG_PATH, JSON.stringify({ dryRun: true, plan }, null, 2), 'utf8')
    console.log(`Wrote dry-run plan to ${LOG_PATH}`)
    return
  }

  let ok = 0, fail = 0
  const results = []
  for (const p of plan) {
    const { error } = await sb.from('courses').update(p.set).eq('id', p.log.id)
    if (error) { fail++; results.push({ ...p, error: error.message }) }
    else { ok++; results.push({ ...p, ok: true }) }
    if ((ok + fail) % 50 === 0) console.log(`  ${ok + fail}/${plan.length}…`)
  }
  writeFileSync(LOG_PATH, JSON.stringify({ applied: true, ok, fail, results }, null, 2), 'utf8')
  console.log(`Done. ok=${ok} fail=${fail}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
