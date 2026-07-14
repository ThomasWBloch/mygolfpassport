// Backup Ireland + Northern Ireland courses to JSON before scraping/updating.
// Run with: node --env-file=.env.local scripts/ireland/backup-ireland.mjs

import { writeFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const today = new Date().toISOString().slice(0, 10)
const out = `scripts/ireland/courses-backup-ireland-${today}.json`

const { data, error } = await sb
  .from('courses')
  .select('*')
  .in('country', ['Ireland', 'Northern Ireland'])
  .order('country', { ascending: true })
  .order('name', { ascending: true })

if (error) { console.error(error); process.exit(1) }

writeFileSync(out, JSON.stringify(data, null, 2))

const counts = data.reduce((a, r) => { a[r.country] = (a[r.country]||0) + 1; return a }, {})
console.log(JSON.stringify({ saved: out, total: data.length, counts }, null, 2))
