// Apply batch 2 renames for Finnish clubs (coord-match corrections).
// Dry-run by default; pass --apply to write.

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const RENAMES = [
  // Same-address formal/canonical (22)
  { from: 'Härmä Golf',                      to: 'Härmä Golf & Academy' },
  { from: 'HIFK Golf - Paloheinä',           to: 'HIFK Golf' },
  { from: 'Iitti Golf',                      to: 'Iitin Golfseura' },
  { from: 'Kajaani Golf',                    to: 'Kajaanin Golf' },
  { from: 'Kanava Golf',                     to: 'Kanavagolf Vääksy' },
  { from: 'Katin Golf Oy',                   to: 'Katinkulta Golf' },
  { from: 'Keimola Golf - KGV',              to: 'Keimola Golf' },
  { from: 'Kemin Golfklubi',                 to: 'Kemin Golf Klubi' },
  { from: 'Kultaranta Golf',                 to: 'Kultaranta Golf Club Naantali' },
  { from: 'Messilä Golf',                    to: 'Messilän Golf' },
  { from: 'Muurame Golf',                    to: 'Muuramen Golfseura' },
  { from: 'Nivalan Seudun Golf - NSG',       to: 'Nivalan Seudun Golf' },
  { from: 'Nordcenter',                      to: 'Nordcenter Golf & Country Club' },
  { from: 'Oulun Golfkerho - OGK',           to: 'Oulun Golfkerho' },
  { from: 'Paltamo Golf',                    to: 'Paltamon Golf' },
  { from: 'Peuramaa Golf',                   to: 'Peuramaa Golf Hjortlandet' },
  { from: 'Pietarsaaren Golf Jakobstad',     to: 'Jakobstads Golf - Pietarsaaren Golf' },
  { from: 'Porvoo Golf',                     to: 'Porvoo Golf - Borgå Golf' },
  { from: 'Vierumäki Golf',                  to: 'Vierumäen Golfseura' },
  { from: 'Viipurin Golf - Etelä-Saimaa',    to: 'Viipurin Golf' },
  { from: 'Kalafornia, Porin Golfkerho',     to: 'Porin Golfkerho' },
  { from: 'Puula Golf',                      to: 'PuulaGolf' },

  // Site-verified (6)
  { from: 'Kotojärvi Golf',                  to: 'Koto Golf' },
  { from: 'Nokia DG',                        to: 'Nokia River Golf' },
  { from: 'Vihti Golf Center',               to: 'Vihti Golf Club' },
  { from: 'GolfStar Hirvensalon Golf',       to: 'Hirvensalon Golf' },
  { from: 'Laajasalon golfkenttä',           to: 'Helsingin Golf' },
  { from: 'Laukanlampi golf club',           to: 'Linna Golf' },

  // False positive corrections + abbreviation expansions (4)
  { from: 'Espoon Golf Seura - EGS',         to: 'Espoon Golfseura' },
  { from: 'GolfStar Kurk Golf',              to: 'Kurk Golf' },
  { from: 'SHG Lakisto',                     to: 'Suur-Helsingin Golf' },
  { from: 'PGC - Park',                      to: 'Pickala Golf' },  // merges into existing club
]

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')

let total = 0
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
  total += rows.length
}

console.log(`\nTotal courses affected: ${total} across ${RENAMES.length} club renames`)
if (!apply) console.log('(dry run — no changes written)')
