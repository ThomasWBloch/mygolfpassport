// Diagnose — do NOT mutate DB.
// Compare SGL (golf.fi) club list against our Finland courses.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const sgl = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))

const { data: rows } = await supabase
  .from('courses').select('club').eq('country', 'Finland')
const dbClubs = [...new Set(rows.map(r => r.club))]

// Aliases kept from Finland session — shorter brand form in DB maps to SGL's registered form.
const ALIASES = {
  'Eke Golf':                   'Eke Golf ry',
  'Kullo Golf':                 'Kullo Golf Club',
  'Master Golf':                'Master Golf Club',
  'Pickala Golf':               'Pickala Golf Club',
  'Virpiniemi Golf':            'Virpiniemi Golf Club',
  'Golf Virrat':                'Golf-Virrat',
  'Eckerö Golf':                'Eckerö Golf/Kyrkoby GK',
  'Bjärkas Golf':               'Bjärkas Golf & Country Club',
  'Holiday Club Golf Saimaa':   'Holiday Club Golf',
  'Oulujokilaakson Golfklubi':  'Oulujokilaakson Golfklubi ry',
  'Hirvensalon Golf':           'Smart Golf Turku',
  'Jyväs-golf':                 'Jyväs-Golf',
  'Käkigolf':                   'KäkiGolf',
}

const normalize = s => (s || '').toLowerCase()
  .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a')
  .replace(/[\.\,\-\/&']/g, ' ')
  .replace(/\bclub\b/g, '').replace(/\bry\b/g, '').replace(/\boy\b/g, '')
  .replace(/\bgk\b/g, '').replace(/\bcc\b/g, '')
  .replace(/\s+/g, ' ').trim()

// Build the set of "SGL names covered by DB" — direct, alias, or normalized.
const dbSglCoverage = new Set()
const dbNormMap = new Map()
for (const dbName of dbClubs) {
  const aliasTarget = ALIASES[dbName]
  if (aliasTarget) dbSglCoverage.add(aliasTarget)
  dbSglCoverage.add(dbName)
  dbNormMap.set(normalize(dbName), dbName)
}

const sglOnly = []
const covered = []
for (const c of sgl) {
  const directHit = dbSglCoverage.has(c.name)
  const normHit = !directHit && dbNormMap.has(normalize(c.name))
  if (directHit || normHit) {
    covered.push({ sgl: c.name, via: directHit ? 'direct/alias' : `norm → ${dbNormMap.get(normalize(c.name))}` })
  } else {
    sglOnly.push(c)
  }
}

const sglNamesCovered = new Set(covered.map(x => x.sgl))
const sglNameSet = new Set(sgl.map(c => c.name))
const dbOnly = dbClubs.filter(db => {
  if (sglNameSet.has(db)) return false
  const alias = ALIASES[db]
  if (alias && sglNameSet.has(alias)) return false
  const normTarget = normalize(db)
  return !sgl.some(c => normalize(c.name) === normTarget)
})

console.log(`=== SGL coverage report ===`)
console.log(`SGL clubs (golf.fi):         ${sgl.length}`)
console.log(`Unique DB clubs (Finland):   ${dbClubs.length}`)
console.log(`DB covers SGL clubs:         ${covered.length}`)
console.log(`SGL-only (NOT in our DB):    ${sglOnly.length}`)
console.log(`DB-only (not SGL members):   ${dbOnly.length}`)

console.log(`\n=== SGL-ONLY CLUBS — missing from our DB ===`)
for (const c of sglOnly) {
  const addr = [c.streetAddress, c.postCode, c.city].filter(Boolean).join(', ')
  const url = c.url || '(no website)'
  console.log(`\n• ${c.name}`)
  console.log(`    city:    ${c.city} (${c.county})`)
  console.log(`    address: ${addr}`)
  console.log(`    website: ${url}`)
  console.log(`    email:   ${c.email || '(none)'}`)
}

if (dbOnly.length > 0) {
  console.log(`\n=== DB-ONLY CLUBS (count only) ===`)
  console.log(`${dbOnly.length} clubs exist in DB but not on SGL. Sample:`)
  dbOnly.slice(0, 10).forEach(n => console.log(`  • ${n}`))
  if (dbOnly.length > 10) console.log(`  ... and ${dbOnly.length - 10} more`)
}
