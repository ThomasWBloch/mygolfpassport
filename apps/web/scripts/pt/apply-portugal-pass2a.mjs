// Apply PT Pass 2a — federation-driven kontakt fra FPG.
//
// Source: scripts/pt/portugal-match-candidates.json
// Targets:
//   - bucket=high → opdater website/email/phone (kun fill-NULL via COALESCE)
//   - bucket=medium/low/dedup_lost/no_match → SKIP (manuel review queue)
//
// Manual swap-overrides (session 35 verification, post-match-rapport):
//   FPG har separate klubber for parent + sub-courses, og containment-bonus
//   gjorde to par til alfabetisk-sort-uafgjort. Override eksplicit.
//
//   1. Vidago: DB-klub "Vidago Palace Golf Course" ↔ "Clube de Golfe de Vidago"
//      Skift FPG-tildeling fra 008↔158 til 158↔008 (parent-name match).
//   2. Comporta: DB "Terras da Comporta" → FPG 192 (parent "Terras da Comporta"),
//      ikke FPG 044 (Dunas, sub-course). DB "Pinheirinho Comporta" beholder 192
//      (resort-parent dækker også Pinheirinho).
//
// Sikkerhed:
//   - DRY-run default. Brug --apply for at skrive.
//   - --apply kræver CONFIRM=ja env-var.
//   - Pre-apply backup: courses-backup-pt-pass2a-<date>.json
//   - Per-row log: apply-pt-pass2a-log.json
//   - Federation-website overrider ALDRIG DB.website når DB allerede har værdi.
//
// Run:
//   node --env-file=.env.local scripts/pt/apply-portugal-pass2a.mjs            (dry)
//   CONFIRM=ja node --env-file=.env.local scripts/pt/apply-portugal-pass2a.mjs --apply

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const CANDIDATES_PATH = 'scripts/pt/portugal-match-candidates.json'
const FED_PATH = 'scripts/pt/pt-clubs-fpg.json'
const today = new Date().toISOString().slice(0, 10)
const BACKUP_PATH = `scripts/pt/courses-backup-pt-pass2a-${today}.json`
const LOG_PATH = `scripts/pt/apply-pt-pass2a-log.json`

const APPLY = process.argv.includes('--apply')
const CONFIRMED = process.env.CONFIRM === 'ja'

const APPLY_BUCKETS = new Set(['high'])

// Manual overrides: dbClub → FPG code (forces this match instead of auto-detected)
const OVERRIDES = new Map([
  ['Vidago Palace Golf Course', '158'], // → "Clube de Golfe do Vidago Palace"
  ['Clube de Golfe de Vidago', '008'], // → "Clube de Golfe de Vidago"
  ['Terras da Comporta', '192'], // → "Clube de Golf das Terras da Comporta"
])

function pickFedFields(fed) {
  return {
    website: fed?.website || null,
    email: fed?.email || null,
    phone: fed?.phone || null,
  }
}

async function backup() {
  console.log('Pre-apply backup of PT rows…')
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('country', 'Portugal')
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
  const fedByCode = new Map(fedAll.map((f) => [f.code, f]))

  console.log(`Loaded ${candidates.length} candidates, ${fedAll.length} FPG klubs`)
  console.log(`Manual overrides: ${OVERRIDES.size}`)

  // Apply overrides: replace .best with the override-FPG entry
  let overrideHits = 0
  for (const c of candidates) {
    if (OVERRIDES.has(c.dbClub)) {
      const code = OVERRIDES.get(c.dbClub)
      const fed = fedByCode.get(code)
      if (!fed) {
        console.warn(`Override missing FPG code ${code} for ${c.dbClub}`)
        continue
      }
      const prevName = c.best?.name || '—'
      c.best = {
        code: fed.code, name: fed.name, acronym: fed.acronym,
        zona: fed.zona, district: fed.district, postal: fed.postal,
        website: fed.website, email: fed.email, phone: fed.phone,
        sim: 1.0, boostedSim: 1.0, reasons: ['MANUAL_OVERRIDE'],
      }
      c.bucket = 'high'
      console.log(`  OVERRIDE: ${c.dbClub || ''} : ${prevName} → ${fed.name}`)
      overrideHits++
    }
  }
  console.log(`Applied ${overrideHits} overrides`)

  const targets = candidates.filter((c) => APPLY_BUCKETS.has(c.bucket))
  console.log(`Total target klubber: ${targets.length} (high)`)

  if (APPLY) {
    if (!CONFIRMED) {
      console.error('--apply kræver CONFIRM=ja env. Aborter.')
      process.exit(1)
    }
    await backup()
  } else {
    console.log('DRY-RUN — ingen DB skrivning. Tilføj --apply + CONFIRM=ja.')
  }

  // Plan updates per row
  const plan = []
  let rowCt = 0
  for (const cand of targets) {
    const fed = pickFedFields(cand.best)
    if (!fed.website && !fed.email && !fed.phone) continue
    for (const dbRow of cand.dbRows) {
      rowCt++
      const upd = planUpdate(dbRow, fed)
      if (upd) plan.push({ klub: cand.dbClub, fed_code: cand.best.code, fed_name: cand.best.name, ...upd })
    }
  }
  console.log(`Planned row-updates: ${plan.length} / ${rowCt} candidate-rows`)

  const counts = { website: 0, email: 0, phone: 0 }
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
