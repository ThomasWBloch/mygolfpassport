// Full backup of the courses table to JSON
// Run with: node --env-file=.env.local scripts/backup-courses.mjs [output-path]

import { writeFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const output = process.argv[2] ?? `scripts/courses-backup-${new Date().toISOString().slice(0, 10)}.json`

console.log(`Fetching all courses → ${output}`)

const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true })
console.log(`Total rows: ${count}`)

const all = []
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('id', { ascending: true })
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  all.push(...data)
  offset += data.length
  process.stdout.write(`\r  Fetched ${all.length}/${count}`)
  if (data.length < 1000) break
}
console.log()

if (all.length !== count) {
  console.warn(`Warning: fetched ${all.length} but expected ${count}`)
}

writeFileSync(output, JSON.stringify(all, null, 2))
console.log(`Wrote ${all.length} courses to ${output}`)
