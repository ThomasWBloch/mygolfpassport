import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const raw = JSON.parse(readFileSync('scripts/usa-progress.json', 'utf8'))
const allCourses = raw.courseRows

const courses = allCourses.map(c => ({
  ...c,
  is_combo: c.name?.includes(' + ') ?? false,
}))

const comboCount = courses.filter(c => c.is_combo).length
console.log(`Total courses in file: ${courses.length}`)
console.log(`Combo courses (is_combo=true): ${comboCount}`)
console.log(`Non-combo courses: ${courses.length - comboCount}`)

console.log('\nFetching existing USA courses...')
const existing = new Set()
let offset = 0
while (true) {
  const { data, error } = await supabase
    .from('courses')
    .select('golfapi_id')
    .eq('country', 'USA')
    .not('golfapi_id', 'is', null)
    .range(offset, offset + 999)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  data.forEach(c => existing.add(c.golfapi_id))
  offset += data.length
  if (data.length < 1000) break
}
console.log(`Existing USA courses with golfapi_id: ${existing.size}`)

const toInsert = courses.filter(c => !existing.has(c.golfapi_id))
console.log(`Will insert (not already in DB): ${toInsert.length}`)
console.log(`Duplicates to skip: ${courses.length - toInsert.length}`)

const BATCH = 500
let inserted = 0

for (let i = 0; i < toInsert.length; i += BATCH) {
  const batch = toInsert.slice(i, i + BATCH)

  let attempt = 0
  while (true) {
    const { error } = await supabase.from('courses').insert(batch)
    if (!error) break
    attempt++
    if (attempt >= 5) {
      console.error(`Error at batch ${i} after ${attempt} retries:`, error)
      process.exit(1)
    }
    const wait = 2000 * attempt
    console.warn(`Batch ${i} failed (attempt ${attempt}): ${error.message}. Retrying in ${wait}ms...`)
    await new Promise(r => setTimeout(r, wait))
  }

  inserted += batch.length
  console.log(`Inserted ${inserted}/${toInsert.length}`)
}

console.log(`\nDone. Total inserted: ${inserted}`)
