// Pre-campaign backup of England courses to JSON.
// Paginated because England has 2.671 rows (>Supabase's 1000-row default).
// Run: node --env-file=.env.local scripts/england/backup-england.mjs

import { writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const today = new Date().toISOString().slice(0, 10)
const out = `scripts/england/courses-backup-england-${today}.json`

const PAGE_SIZE = 1000
const all = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await sb
    .from('courses')
    .select('*')
    .eq('country', 'England')
    .order('club', { ascending: true })
    .order('id', { ascending: true })
    .range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  all.push(...data)
  if (data.length < PAGE_SIZE) break
}

writeFileSync(out, JSON.stringify(all, null, 2))
console.log(JSON.stringify({ saved: out, total: all.length }, null, 2))
