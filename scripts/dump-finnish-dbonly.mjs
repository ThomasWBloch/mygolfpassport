import { readFileSync } from 'node:fs'
const r = JSON.parse(readFileSync('scripts/finnish-match-report.json', 'utf8'))

console.log(`Total DB-only clubs: ${r.dbOnly.length}\n`)

// Sort by club name for readable output
const sorted = [...r.dbOnly].sort((a, b) => a.dbName.localeCompare(b.dbName))

for (const m of sorted) {
  const r0 = m.rows[0]
  const addr = (r0.address || '').slice(0, 70)
  const courses = m.rows.map(r => r.name).join(' | ').slice(0, 100)
  console.log(`"${m.dbName}" (${m.rows.length}c) addr="${addr}"`)
  if (courses) console.log(`    courses: ${courses}`)
  if (r0.latitude) console.log(`    coord: ${r0.latitude},${r0.longitude}`)
}
