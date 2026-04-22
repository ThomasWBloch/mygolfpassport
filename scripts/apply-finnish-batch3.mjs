// Apply batch 3: 9 renames/merges + 28 deletions for Finnish DB-only clubs.
// Dry-run by default; pass --apply to write.

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const RENAMES = [
  // Rescued SGL matches (7)
  { from: 'Hirvihaaran Golf',              to: 'Hirvihaara Golf Mäntsälä' },
  { from: 'Oulujokilaakson golf',          to: 'Oulujokilaakson Golfklubi' },
  { from: 'Vuosaari Golf',                 to: 'Vuosaari Golf Helsinki' },
  { from: 'SHG Luukki',                    to: 'Suur-Helsingin Golf' },
  { from: 'Vanajanlinna',                  to: 'Linna Golf' },
  { from: 'Nokia River Golf - NRG',        to: 'Nokia River Golf' },
  { from: 'Viipurin Golf - Kahilanniemi',  to: 'Viipurin Golf' },

  // Consolidations (2)
  { from: 'Härmä Golf 12',                 to: 'Härmä Golf & Academy' },
  { from: 'Parkkivuoren golfseura ry',     to: 'Parkkivuoren Golf' },
]

const DELETIONS = [
  // Non-golf: frisbee/disc/ice/snow/winter/simulator (20)
  'Keskusliikuntapuiston frisbeegolfrata',
  'Köykkyri DiscGolfPark',
  'Lahden Frisbee Golf',
  'Mellilä FGR',
  'Mäntän frisbeegolfrata',
  'Märynummen kyläyhdistys',
  'Naissaari',
  'Nummijärvi Frisbeegolf',
  'Pikkarala monirata-alue',
  'Prodigy',
  'Prodigy Disc',
  'Ranuan Kristillisen kansanopiston frisbeegolfrata',
  'Rauma DGP',
  'Tuomiojärvi DGP',
  'Vimpelinvaara DGP 18',
  'Vuorilammen frisbeegolfrata',
  'IceGolf Oulu',
  'Jämi Snow Golf',
  'Outokummun talvigolf',
  'Meri-Toppila 2014 par56',
  'Linna Golf simulator Sports Coach / Golf Coat',
  // Junk / placeholder (8)
  'Lxhtxkxngxs',
  'omn',
  'Pete',
  'Talviharjoittelu',
  'Valley',
  'VG range',
  'RTG',
  'Oma',
]

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')

// === RENAMES ===
console.log('--- RENAMES ---')
let renameTotal = 0
for (const r of RENAMES) {
  const { data: rows, error } = await supabase
    .from('courses').select('id, name').eq('country', 'Finland').eq('club', r.from)
  if (error) { console.error(`Query failed for "${r.from}":`, error); process.exit(1) }
  console.log(`"${r.from}" → "${r.to}"  — ${rows.length} course(s)`)
  rows.forEach(c => console.log(`    • ${c.name}`))
  if (apply && rows.length > 0) {
    const { error: updateErr, count } = await supabase
      .from('courses').update({ club: r.to }, { count: 'exact' })
      .eq('country', 'Finland').eq('club', r.from)
    if (updateErr) { console.error('Update failed:', updateErr); process.exit(1) }
    console.log(`    ✓ Updated ${count} row(s)`)
  }
  renameTotal += rows.length
}

// === DELETIONS ===
console.log('\n--- DELETIONS ---')
let deleteTotal = 0
for (const name of DELETIONS) {
  const { data: rows, error } = await supabase
    .from('courses').select('id, name, address').eq('country', 'Finland').eq('club', name)
  if (error) { console.error(`Query failed for "${name}":`, error); process.exit(1) }
  if (rows.length === 0) {
    console.log(`"${name}" — 0 rows (skipping)`)
    continue
  }
  console.log(`"${name}" — ${rows.length} row(s) to delete`)
  rows.forEach(c => console.log(`    • id=${c.id}  name="${c.name}"  addr="${(c.address || '').slice(0, 50)}"`))
  if (apply) {
    const { error: delErr, count } = await supabase
      .from('courses').delete({ count: 'exact' })
      .eq('country', 'Finland').eq('club', name)
    if (delErr) { console.error('Delete failed:', delErr); process.exit(1) }
    console.log(`    ✓ Deleted ${count} row(s)`)
  }
  deleteTotal += rows.length
}

console.log(`\nRenames: ${renameTotal} course rows across ${RENAMES.length} clubs`)
console.log(`Deletions: ${deleteTotal} course rows across ${DELETIONS.length} clubs`)
if (!apply) console.log('(dry run — no changes written)')
