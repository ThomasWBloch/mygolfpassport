// Apply batch 1 renames for Finnish clubs. Updates the `club` column on all
// courses where country=Finland AND club=<old name>. Runs with --dry-run by
// default; pass --apply to actually write.

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const RENAMES = [
  { from: 'Hiisi Golf',        to: 'Hiisi-Golf',              confidence: 'high'   },
  { from: 'vola Golf',         to: 'Vola-Golf',               confidence: 'high'   },
  { from: 'Santa Claus Golf',  to: 'Santa Claus Golf Club',   confidence: 'medium' },
]

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')

let totalCourses = 0
const results = []

for (const r of RENAMES) {
  const { data: rows, error } = await supabase
    .from('courses').select('id, name, club')
    .eq('country', 'Finland').eq('club', r.from)
  if (error) { console.error(`Query failed for "${r.from}":`, error); process.exit(1) }

  console.log(`[${r.confidence}] "${r.from}" → "${r.to}"  — ${rows.length} course(s)`)
  rows.forEach(c => console.log(`    • ${c.name}`))

  if (apply && rows.length > 0) {
    const { error: updateErr, count } = await supabase
      .from('courses').update({ club: r.to }, { count: 'exact' })
      .eq('country', 'Finland').eq('club', r.from)
    if (updateErr) { console.error('Update failed:', updateErr); process.exit(1) }
    console.log(`    ✓ Updated ${count} row(s)`)
  }
  totalCourses += rows.length
  results.push({ ...r, matched: rows.length })
}

console.log(`\nTotal courses affected: ${totalCourses} across ${RENAMES.length} club renames`)
if (!apply) console.log('(dry run — no changes written)')
