import { readFileSync } from 'node:fs'
const r = JSON.parse(readFileSync('scripts/finnish-match-report.json', 'utf8'))

for (const m of r.fuzzy) {
  const db = m.rows[0]
  console.log(`\n--- [${m.distanceKm}km] ${m.dbName}  →  ${m.sgl.name}`)
  console.log(`    DB: ${m.rows.length} course(s), addr="${db.address || ''}", coord=${db.latitude},${db.longitude}`)
  console.log(`    SGL: city=${m.sgl.city}, addr="${m.sgl.streetAddress}", url=${m.sgl.url}`)
  if (m.rows.length > 1) {
    console.log(`    DB course names: ${m.rows.map(r => r.name).join(' | ')}`)
  }
}

// Also dump the SGL-only clubs so we can check for false positives
console.log('\n\n=== SGL-ONLY CLUBS (possible missed matches) ===')
r.sglOnly.forEach(c => console.log(`  "${c.name}" (${c.city}) — ${c.url}`))
