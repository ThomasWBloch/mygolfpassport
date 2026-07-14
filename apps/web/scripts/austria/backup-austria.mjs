// Pre-campaign backup of Austria courses to JSON.
// AT has ~298 rows so a single page is plenty, but we keep pagination for
// consistency with the Italy/Holland pipelines and the Supabase 1000-row cap.
// Run: node --env-file=.env.local scripts/austria/backup-austria.mjs

import { writeFileSync, mkdirSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const today = new Date().toISOString().slice(0, 10)
const out = `scripts/austria/courses-backup-austria-${today}.json`

const PAGE_SIZE = 1000
const all = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await sb
    .from('courses')
    .select('*')
    .eq('country', 'Austria')
    .order('club', { ascending: true })
    .order('id', { ascending: true })
    .range(from, from + PAGE_SIZE - 1)
  if (error) {
    console.error(error)
    process.exit(1)
  }
  if (!data || data.length === 0) break
  all.push(...data)
  if (data.length < PAGE_SIZE) break
}

mkdirSync('scripts/austria', { recursive: true })
writeFileSync(out, JSON.stringify(all, null, 2))
console.log(JSON.stringify({ saved: out, total: all.length }, null, 2))
