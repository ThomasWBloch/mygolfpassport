import { readFileSync } from 'node:fs'
const r = JSON.parse(readFileSync('scripts/finnish-match-report.json', 'utf8'))

console.log('=== NORMALIZED MATCHES (small spelling differences) ===')
r.normMatch.forEach(m => console.log(`  DB: "${m.dbName}"  →  SGL: "${m.sgl.name}"`))

console.log('\n=== COORDINATE MATCHES (same location, different name) ===')
r.fuzzy.forEach(m => console.log(`  [${m.distanceKm}km] DB: "${m.dbName}"  →  SGL: "${m.sgl.name}" (${m.sgl.city})`))

console.log('\n=== DB-ONLY CLUBS (not in SGL at all) — first 30 ===')
r.dbOnly.slice(0, 30).forEach(m => {
  const addr = m.rows[0]?.address || '(no address)'
  console.log(`  "${m.dbName}"  — ${m.rows.length} course(s), ${addr.slice(0, 60)}`)
})
console.log(`  ... and ${Math.max(0, r.dbOnly.length - 30)} more`)

console.log('\n=== SGL-ONLY CLUBS (missing from DB) ===')
r.sglOnly.forEach(c => console.log(`  "${c.name}" (${c.city}) — ${c.url}`))
