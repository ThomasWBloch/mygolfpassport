// Reimport missing courses for specific countries from local backup data
// Uses import-progress.json (European import) — no GolfAPI credits needed
// Marks combo courses (name contains " + ") as is_combo = true
// Run with: node --env-file=.env.local scripts/reimport-from-backup-country.mjs "Norway,Belgium"

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const args = process.argv.slice(2).join(' ')
if (!args) {
  console.error('Usage: node --env-file=.env.local scripts/reimport-from-backup-country.mjs "Norway,Belgium"')
  process.exit(1)
}

const countries = args.split(',').map(c => c.trim()).filter(Boolean)

// Load backup data
const progress = JSON.parse(readFileSync('scripts/import-progress.json', 'utf8'))
const availableCountries = Object.keys(progress.courseRows || {})

console.log('═'.repeat(60))
console.log('Reimport from local backup data')
console.log(`Countries: ${countries.join(', ')}`)
console.log('═'.repeat(60))
console.log(`\nAvailable in backup: ${availableCountries.join(', ')}`)

const results = []

for (const country of countries) {
  console.log(`\n${'─'.repeat(50)}`)
  console.log(`${country}`)
  console.log('─'.repeat(50))

  const backupRows = progress.courseRows[country]
  if (!backupRows || backupRows.length === 0) {
    console.log(`  No backup data for ${country} — skipping`)
    results.push({ country, backup: 0, existing: 0, inserted: 0, combos: 0 })
    continue
  }
  console.log(`  Backup has: ${backupRows.length} courses`)

  // Fetch existing courses for this country
  const existing = new Set()
  let offset = 0
  while (true) {
    const { data, error } = await supabase
      .from('courses')
      .select('name, club')
      .eq('country', country)
      .range(offset, offset + 999)
    if (error) { console.error(error); process.exit(1) }
    if (!data || data.length === 0) break
    for (const c of data) {
      existing.add((c.name ?? '').trim().toLowerCase() + '||' + (c.club ?? '').trim().toLowerCase())
    }
    offset += data.length
    if (data.length < 1000) break
  }
  console.log(`  Already in DB: ${existing.size} courses`)

  // Find missing courses
  const toInsert = []
  for (const row of backupRows) {
    const key = (row.name ?? '').trim().toLowerCase() + '||' + (row.club ?? '').trim().toLowerCase()
    if (existing.has(key)) continue

    toInsert.push({
      ...row,
      is_combo: row.name.includes(' + '),
    })
  }

  const comboCount = toInsert.filter(c => c.is_combo).length
  console.log(`  Missing (to insert): ${toInsert.length} (${comboCount} combos)`)

  if (toInsert.length === 0) {
    console.log('  Nothing to insert')
    const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country)
    results.push({ country, backup: backupRows.length, existing: existing.size, inserted: 0, combos: 0, total: count })
    continue
  }

  // Insert in batches
  let inserted = 0
  for (let i = 0; i < toInsert.length; i += 500) {
    const batch = toInsert.slice(i, i + 500)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) { console.error('  Insert error:', error.message); process.exit(1) }
    inserted += batch.length
  }

  // Also mark any existing combo courses that might not be flagged yet
  const { data: unmarkedCombos } = await supabase
    .from('courses')
    .select('id')
    .eq('country', country)
    .ilike('name', '% + %')
    .eq('is_combo', false)

  if (unmarkedCombos && unmarkedCombos.length > 0) {
    const ids = unmarkedCombos.map(c => c.id)
    await supabase.from('courses').update({ is_combo: true }).in('id', ids)
    console.log(`  Marked ${ids.length} existing combos as is_combo = true`)
  }

  const { count } = await supabase.from('courses').select('*', { count: 'exact', head: true }).eq('country', country)
  console.log(`  Inserted: ${inserted} (${comboCount} combos)`)
  console.log(`  Total ${country} courses now: ${count}`)
  results.push({ country, backup: backupRows.length, existing: existing.size, inserted, combos: comboCount, total: count })
}

console.log(`\n${'═'.repeat(60)}`)
console.log('SUMMARY')
console.log('═'.repeat(60))
for (const r of results) {
  console.log(`${r.country.padEnd(22)} backup: ${r.backup}, existed: ${r.existing}, inserted: ${r.inserted} (${r.combos} combos), total: ${r.total ?? '?'}`)
}
console.log('═'.repeat(60))
console.log('\nNo GolfAPI credits used — all from local backup.')
