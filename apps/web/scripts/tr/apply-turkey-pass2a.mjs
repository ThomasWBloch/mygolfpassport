// Apply TR Pass 2a — federation-driven kontakt fra TGF.
//
// Source: scripts/tr/turkey-match-candidates.json
// Targets: bucket=high → fill-NULL website/email/phone (COALESCE-only).
//
// Run:
//   node --env-file=.env.local scripts/tr/apply-slovenia-pass2a.mjs            (dry)
//   CONFIRM=ja node --env-file=.env.local scripts/tr/apply-slovenia-pass2a.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CANDIDATES_PATH = 'scripts/tr/turkey-match-candidates.json'
const FED_PATH = 'scripts/tr/tr-clubs-tgf.json'

// Manual chain-twin overrides (session 35).
// Klassis Golf Clup blev fejlmatched til "GENÇLER GOLF AKADEMİSİ" via DB course-name "Akademi"
// substring-match. Korrekt match er "SİLİVRİ KLASSİS GOLF SPOR KULÜBÜ DERNEĞİ" (runnerUp).
const OVERRIDES = new Map([
  ['Klassis Golf Clup', 'SİLİVRİ KLASSİS GOLF SPOR KULÜBÜ DERNEĞİ'],
])
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/tr/courses-backup-tr-pass2a-${today}.json`
const LOG_PATH = `scripts/tr/apply-tr-pass2a-log.json`

const APPLY = process.argv.includes('--apply')
const CONFIRMED = process.env.CONFIRM === 'ja'
const APPLY_BUCKETS = new Set(['high'])

async function backup() {
  console.log('Pre-apply backup of TR rows…')
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('country', 'Turkey')
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
  for (const k of ['website', 'email', 'phone']) {
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
  const fedAll = JSON.parse(readFileSync(FED_PATH, 'utf8')).clubs
  const fedByName = new Map(fedAll.map((f) => [f.name, f]))

  // Apply manual overrides
  let overrideHits = 0
  for (const c of candidates) {
    if (OVERRIDES.has(c.dbClub)) {
      const targetName = OVERRIDES.get(c.dbClub)
      const fed = fedByName.get(targetName)
      if (!fed) {
        console.warn(`Override missing TGF entry ${targetName}`)
        continue
      }
      const prev = c.best?.name || '—'
      c.best = {
        name: fed.name,
        website: fed.website, email: fed.email, phone: fed.phone,
        sim: 1.0, boostedSim: 1.0, reasons: ['MANUAL_OVERRIDE'],
      }
      c.bucket = 'high'
      console.log(`  OVERRIDE: ${c.dbClub} : ${prev} → ${fed.name}`)
      overrideHits++
    }
  }
  console.log(`Applied ${overrideHits} overrides`)

  const targets = candidates.filter((c) => APPLY_BUCKETS.has(c.bucket))
  console.log(`Targets: ${targets.length} klubber (high)`)

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
      email: cand.best?.email || null,
      phone: cand.best?.phone || null,
    }
    if (!fed.website && !fed.email && !fed.phone) continue
    for (const dbRow of cand.dbRows) {
      rowCt++
      const upd = planUpdate(dbRow, fed)
      if (upd) plan.push({ klub: cand.dbClub, fed_name: cand.best.name, ...upd })
    }
  }
  console.log(`Planned row-updates: ${plan.length} / ${rowCt} candidate-rows`)

  const counts = { website: 0, email: 0, phone: 0 }
  for (const p of plan) for (const k of Object.keys(p.set)) counts[k]++
  console.log('  fields:', JSON.stringify(counts))

  if (!APPLY) {
    writeFileSync(LOG_PATH, JSON.stringify({ dryRun: true, plan }, null, 2), 'utf8')
    console.log(`Wrote dry-run plan to ${LOG_PATH}`)
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
    if ((ok + fail) % 50 === 0) console.log(`  ${ok + fail}/${plan.length}…`)
  }
  writeFileSync(LOG_PATH, JSON.stringify({ applied: true, ok, fail, results }, null, 2), 'utf8')
  console.log(`\nDone. ok=${ok} fail=${fail}. Log: ${LOG_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
