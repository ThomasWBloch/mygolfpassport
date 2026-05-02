// Pre-campaign backup of England courses to JSON.
// Run: node --env-file=.env.local scripts/england/backup-england.mjs

import { writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const today = new Date().toISOString().slice(0, 10)
const out = `scripts/england/courses-backup-england-${today}.json`

const { data, error } = await sb
  .from('courses')
  .select('*')
  .eq('country', 'England')
  .order('club', { ascending: true })

if (error) { console.error(error); process.exit(1) }

writeFileSync(out, JSON.stringify(data, null, 2))
console.log(JSON.stringify({ saved: out, total: data.length }, null, 2))
