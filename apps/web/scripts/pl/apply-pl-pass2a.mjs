// Apply PL Pass 2a — HIGH-only website fill (PZG har kun website-data).
// Per memory kræver UPDATE eksplicit "ja". DRY-RUN default.
//
// Run:
//   node --env-file=.env.local scripts/pl/apply-pl-pass2a.mjs            (dry)
//   CONFIRM=ja node --env-file=.env.local scripts/pl/apply-pl-pass2a.mjs --apply
//
// Manuel queue: 2 LOW (forkert region) + 14 NO_MATCH inkl. Sobienie Royal/Królewskie
// translation-pair og 12 klubber som muligvis ikke er PZG-medlemmer.

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CANDIDATES_PATH = 'scripts/pl/pl-match-candidates.json'
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/pl/courses-backup-pl-pass2a-${today}.json`
const LOG_PATH = 'scripts/pl/apply-pl-pass2a-log.json'

const APPLY = process.argv.includes('--apply')
const CONFIRMED = process.env.CONFIRM === 'ja'

async function backup() {
  const { data, error } = await sb.from('courses').select('*').eq('country', 'Poland')
  if (error) throw error
  writeFileSync(BACKUP_PATH, JSON.stringify(data, null, 2), 'utf8')
  console.log(`  wrote ${BACKUP_PATH} (${data.length} rows)`)
}

async function main() {
  const candidates = JSON.parse(readFileSync(CANDIDATES_PATH, 'utf8'))
  const high = candidates.filter((c) => c.bucket === 'high')
  console.log(`HIGH klubber: ${high.length}`)

  if (APPLY) {
    if (!CONFIRMED) { console.error('--apply kræver CONFIRM=ja'); process.exit(1) }
    await backup()
  } else {
    console.log('DRY-RUN — tilføj --apply + CONFIRM=ja for at skrive')
  }

  const plan = []
  for (const c of high) {
    if (!c.best?.website) continue
    for (const r of c.dbRows) {
      if (r.website && r.website !== '') continue // fill-NULL only
      plan.push({
        id: r.id,
        klub: c.dbClub,
        before: { website: r.website },
        after: { website: c.best.website },
        set: { website: c.best.website },
      })
    }
  }
  console.log(`Planned row-updates: ${plan.length}`)

  if (!APPLY) {
    writeFileSync(LOG_PATH, JSON.stringify({ dryRun: true, plan }, null, 2), 'utf8')
    console.log(`Wrote dry-run plan to ${LOG_PATH}`)
    return
  }

  let ok = 0, fail = 0
  const results = []
  for (const p of plan) {
    const { error } = await sb.from('courses').update(p.set).eq('id', p.id)
    if (error) { fail++; results.push({ ...p, error: error.message }) }
    else { ok++; results.push({ ...p, ok: true }) }
  }
  writeFileSync(LOG_PATH, JSON.stringify({ applied: true, ok, fail, results }, null, 2), 'utf8')
  console.log(`Done. ok=${ok} fail=${fail}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
