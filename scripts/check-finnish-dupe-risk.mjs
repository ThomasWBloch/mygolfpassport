import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Target names that batch 2 will rename TO — check if any already exist as a separate club
const targets = [
  'Hirvensalon Golf', 'Kurk Golf', 'Espoon Golfseura', 'Helsingin Golf',
  'Linna Golf', 'Koto Golf', 'Pickala Golf', 'Pickala Golf Club',
  'Porin Golfkerho', 'Suur-Helsingin Golf', 'Härmä Golf & Academy',
  'HIFK Golf', 'Iitin Golfseura', 'Kajaanin Golf', 'Kanavagolf Vääksy',
  'Katinkulta Golf', 'Keimola Golf', 'Kemin Golf Klubi',
  'Kultaranta Golf Club Naantali', 'Messilän Golf', 'Muuramen Golfseura',
  'Nivalan Seudun Golf', 'Nokia River Golf', 'Nordcenter Golf & Country Club',
  'Oulun Golfkerho', 'Paltamon Golf', 'Peuramaa Golf Hjortlandet',
  'Jakobstads Golf - Pietarsaaren Golf', 'Porvoo Golf - Borgå Golf',
  'PuulaGolf', 'Vierumäen Golfseura', 'Vihti Golf Club', 'Viipurin Golf',
]

const { data } = await supabase
  .from('courses').select('club').eq('country', 'Finland')
const existing = new Set(data.map(r => r.club))

console.log('Target names that already exist as DB club (potential merge):')
for (const t of targets) {
  if (existing.has(t)) console.log(`  ⚠️  "${t}"`)
}
console.log('\nTarget names that are NEW (safe rename):')
for (const t of targets) {
  if (!existing.has(t)) console.log(`  ✓  "${t}"`)
}
