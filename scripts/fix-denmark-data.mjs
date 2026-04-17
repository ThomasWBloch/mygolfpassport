// One-shot Danish data cleanup (2026-04-17):
// - Delete 7 rows across 5 clubs (Vestlollands, Blaavand, Ree Golf club,
//   Gudhjem Golfklub's Old course, Langesø Golf's Mesterskabsbanen, Fø
//   at Blåvandshuk).
// - Rename 4 clubs (Helsinge Golf → Pibe Mølle Golf; Rø Old Course →
//   Nordbornholms Golf Klub; Silkeborg/Ry → Ry Golfklub; Hoersholm →
//   Hørsholm).
// - Strip " - D###" suffix from 7 clubs.
//
// Run with: node --env-file=.env.local scripts/fix-denmark-data.mjs

import { createClient } from '@supabase/supabase-js'

const s = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const FK_TABLES = ['rounds', 'bucket_list', 'course_affiliations', 'top100_rankings']

async function findIds(description, filter) {
  let q = s.from('courses').select('id, name, club, holes').eq('country', 'Denmark')
  q = filter(q)
  const { data, error } = await q
  if (error) throw error
  console.log(`  ${description}: ${data.length} row(s)`)
  data.forEach(r => console.log(`    ${r.id}  ${r.club} | ${r.name} (${r.holes}h)`))
  return data.map(r => r.id)
}

async function deleteIds(label, ids) {
  if (!ids.length) { console.log(`  ${label}: nothing to delete`); return }
  for (const table of FK_TABLES) {
    const { error } = await s.from(table).delete().in('course_id', ids)
    if (error && !error.message.includes('does not exist')) console.log(`    ${table}: ${error.message}`)
  }
  const { error } = await s.from('courses').delete().in('id', ids)
  if (error) { console.error(`  ${label} delete error:`, error.message); process.exit(1) }
  console.log(`  ${label}: deleted ${ids.length} row(s)`)
}

// ── Deletions ──────────────────────────────────────────────────────────────
console.log('\n══ DELETIONS ══')

const delVestlolland = await findIds('Vestlollands Golfklub', q => q.ilike('club', 'Vestlollands Golfklub'))
const delBlaavand    = await findIds('Blaavand Golf Klub',    q => q.ilike('club', 'Blaavand Golf Klub'))
const delReeStandalone = await findIds('Ree Golf (standalone club)', q => q.eq('club', 'Ree Golf'))
const delGudhjemOld  = await findIds('Gudhjem Golfklub — Old course', q => q.eq('club', 'Gudhjem Golfklub').ilike('name', 'Old course'))
const delLangesoeMesterskab = await findIds('Langesø Golf — Mesterskabsbanen', q => q.eq('club', 'Langesø Golf').eq('name', 'Mesterskabsbanen'))
const delFoe         = await findIds('Blåvandshuk Golfcenter — Fø', q => q.eq('club', 'Blåvandshuk Golfcenter').eq('name', 'Fø'))

const allDeleteIds = [...new Set([...delVestlolland, ...delBlaavand, ...delReeStandalone, ...delGudhjemOld, ...delLangesoeMesterskab, ...delFoe])]
console.log(`\n  TOTAL to delete: ${allDeleteIds.length}`)
await deleteIds('Applying deletions', allDeleteIds)

// ── Renames ────────────────────────────────────────────────────────────────
console.log('\n══ RENAMES ══')

const RENAMES = [
  { from: 'Helsinge Golf',  to: 'Pibe Mølle Golf' },
  { from: 'Rø Old Course',  to: 'Nordbornholms Golf Klub' },
  { from: 'Silkeborg/Ry',   to: 'Ry Golfklub' },
  { from: 'Hoersholm',      to: 'Hørsholm' },
]

for (const r of RENAMES) {
  const { data: targetCheck } = await s.from('courses').select('id').eq('country', 'Denmark').eq('club', r.to).limit(1)
  if (targetCheck?.length) console.log(`  ⚠ ${r.to} already has ${targetCheck.length}+ row(s) — will merge by name`)
  const { data, error } = await s.from('courses').update({ club: r.to }).eq('country', 'Denmark').eq('club', r.from).select('id')
  if (error) { console.error(`  rename ${r.from} → ${r.to}:`, error.message); process.exit(1) }
  console.log(`  ${r.from} → ${r.to}: renamed ${data?.length ?? 0} row(s)`)
}

// ── Strip " - D###" suffix ────────────────────────────────────────────────
console.log('\n══ D-SUFFIX STRIP ══')

const { data: withSuffix, error: sErr } = await s
  .from('courses')
  .select('id, club')
  .eq('country', 'Denmark')
  .ilike('club', '% - D%')
if (sErr) { console.error(sErr); process.exit(1) }

const suffixRe = / - D\d+$/
const byNewClub = new Map() // newClub → [ids]
for (const r of withSuffix ?? []) {
  if (!suffixRe.test(r.club ?? '')) continue
  const newClub = (r.club ?? '').replace(suffixRe, '')
  if (!byNewClub.has(newClub)) byNewClub.set(newClub, { oldClub: r.club, ids: [] })
  byNewClub.get(newClub).ids.push(r.id)
}

for (const [newClub, { oldClub, ids }] of byNewClub) {
  const { error } = await s.from('courses').update({ club: newClub }).in('id', ids)
  if (error) { console.error(`  strip ${oldClub}:`, error.message); process.exit(1) }
  console.log(`  ${oldClub} → ${newClub}: ${ids.length} row(s)`)
}
if (!byNewClub.size) console.log('  no D-suffix clubs found')

// ── Summary ────────────────────────────────────────────────────────────────
console.log('\n══ VERIFY ══')
const { count } = await s.from('courses').select('*', { count: 'exact', head: true }).eq('country', 'Denmark')
console.log(`Denmark total after cleanup: ${count}`)
