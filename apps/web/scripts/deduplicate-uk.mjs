// Deduplicate UK courses — remove Scotland/Wales entries that also exist in England
// Run with: node --env-file=.env.local scripts/deduplicate-uk.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Fetch all England courses as a lookup
console.log('Fetching England courses...')
const englandCourses = new Set()
let offset = 0
while (true) {
  const { data } = await supabase
    .from('courses')
    .select('name, club')
    .eq('country', 'England')
    .range(offset, offset + 999)
  if (!data || data.length === 0) break
  for (const c of data) {
    englandCourses.add((c.name + '||' + (c.club ?? '')).toLowerCase())
  }
  offset += data.length
  if (data.length < 1000) break
}
console.log(`  ${englandCourses.size} unique England course keys\n`)

// Process Scotland and Wales
let totalDeleted = 0

for (const country of ['Scotland', 'Wales']) {
  console.log(`Processing ${country}...`)

  // Fetch all courses for this country
  const allIds = []
  let off = 0
  while (true) {
    const { data } = await supabase
      .from('courses')
      .select('id, name, club')
      .eq('country', country)
      .range(off, off + 999)
    if (!data || data.length === 0) break
    allIds.push(...data)
    off += data.length
    if (data.length < 1000) break
  }

  console.log(`  ${allIds.length} total courses in ${country}`)

  // Find duplicates (exist in England with same name+club)
  const dupeIds = []
  for (const c of allIds) {
    const key = (c.name + '||' + (c.club ?? '')).toLowerCase()
    if (englandCourses.has(key)) {
      dupeIds.push(c.id)
    }
  }

  console.log(`  ${dupeIds.length} duplicates found (also in England)`)
  console.log(`  ${allIds.length - dupeIds.length} unique to ${country} (keeping)`)

  // Delete duplicates in batches of 500
  let deleted = 0
  for (let i = 0; i < dupeIds.length; i += 500) {
    const batch = dupeIds.slice(i, i + 500)
    const { error } = await supabase
      .from('courses')
      .delete()
      .in('id', batch)
    if (error) {
      console.error(`  Batch error:`, error.message)
    } else {
      deleted += batch.length
    }
  }

  console.log(`  ${deleted} deleted\n`)
  totalDeleted += deleted
}

console.log('─'.repeat(40))
console.log(`Total duplicates removed: ${totalDeleted}`)
