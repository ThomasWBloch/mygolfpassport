// Load championship venues (major / Ryder Cup / Solheim Cup / Olympics) into
// public.course_championships from supabase/seeds/championship_venues.json.
//
// The seed is generated from MGP_turneringsbaner_review.xlsx (sheet "Match"),
// which holds the reviewed match of 265 source rows against public.courses.
// Only rows with status "sikker" and a course_id are in the seed: 247 rows
// across 216 distinct courses. 16 source rows had no course in the database
// and are listed under "skipped" in the seed for reference.
//
// Idempotent: reads what is already there and inserts only the difference, so
// it is safe to re-run. Dry run by default; pass --apply to write.
//
// Requires 20261016_course_championships.sql to have been applied first.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const SEED = resolve(here, '../../../supabase/seeds/championship_venues.json')

// Load apps/web/.env.local without needing a --env-file flag or dotenv.
const ENV_FILE = resolve(here, '../.env.local')
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(ENV_FILE)
  } else {
    for (const line of readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
    }
  }
} catch (e) {
  console.error(`Could not read ${ENV_FILE}: ${e.message}`)
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (expected in apps/web/.env.local)')
  process.exit(1)
}
const supabase = createClient(url, key)

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')

const seed = JSON.parse(readFileSync(SEED, 'utf8'))
const rows = seed.rows
console.log(`Seed: ${rows.length} rows, ${new Set(rows.map(r => r.course_id)).size} distinct courses`)

// ── 1. Every course_id must still exist. A stale id means the seed is out of
//      date with the courses table and the load should not proceed. ──────────
const ids = [...new Set(rows.map(r => r.course_id))]
const found = new Set()
for (let i = 0; i < ids.length; i += 200) {
  const { data, error } = await supabase
    .from('courses').select('id').in('id', ids.slice(i, i + 200))
  if (error) { console.error('Course lookup failed:', error); process.exit(1) }
  data.forEach(c => found.add(c.id))
}
const missing = ids.filter(id => !found.has(id))
if (missing.length) {
  console.error(`\n${missing.length} course_id(s) in the seed no longer exist:`)
  missing.forEach(id => {
    const r = rows.find(x => x.course_id === id)
    console.error(`  ${id}  ${r.klub} / ${r.bane}  (${r.note})`)
  })
  console.error('\nRefusing to load. Regenerate the seed from the review file first.')
  process.exit(1)
}
console.log(`All ${ids.length} course ids verified against courses.`)

// ── 2. Diff against what is already loaded ──────────────────────────────────
const { data: existing, error: exErr } = await supabase
  .from('course_championships').select('course_id, category, year')
if (exErr) { console.error('Could not read course_championships:', exErr); process.exit(1) }

const seen = new Set(existing.map(e => `${e.course_id}|${e.category}|${e.year ?? ''}`))
const toInsert = rows
  .filter(r => !seen.has(`${r.course_id}|${r.category}|${r.year ?? ''}`))
  .map(r => ({ course_id: r.course_id, category: r.category, year: r.year, status: r.status, note: r.note }))

const byCat = toInsert.reduce((a, r) => ({ ...a, [r.category]: (a[r.category] || 0) + 1 }), {})
console.log(`Already loaded: ${existing.length}. To insert: ${toInsert.length}`, byCat)

if (!toInsert.length) { console.log('\nNothing to do.'); process.exit(0) }
if (!apply) { console.log('\nDry run — nothing written. Re-run with --apply.'); process.exit(0) }

// ── 3. Insert ───────────────────────────────────────────────────────────────
let inserted = 0
for (let i = 0; i < toInsert.length; i += 200) {
  const batch = toInsert.slice(i, i + 200)
  const { error } = await supabase.from('course_championships').insert(batch)
  if (error) { console.error(`Insert failed at row ${i}:`, error); process.exit(1) }
  inserted += batch.length
  console.log(`  inserted ${inserted}/${toInsert.length}`)
}

// ── 4. Verify, including the derived is_major flag ──────────────────────────
const { count: total } = await supabase
  .from('course_championships').select('*', { count: 'exact', head: true })
const { count: majors } = await supabase
  .from('courses').select('*', { count: 'exact', head: true }).eq('is_major', true)
const { count: majorRows } = await supabase
  .from('course_championships').select('*', { count: 'exact', head: true })
  .eq('category', 'major').eq('status', 'hosted')

console.log(`\ncourse_championships rows : ${total}`)
console.log(`courses with is_major=true : ${majors}  (expected ${majorRows} — trigger check)`)
if (majors !== majorRows) console.error('MISMATCH — the is_major trigger did not fire as expected.')
