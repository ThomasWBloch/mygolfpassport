/**
 * seed-courses.ts
 *
 * Inserts all known courses from the mygolfpassport_v4 prototype
 * (Danish, Scandinavian, Scottish, Irish, Welsh, French, German)
 * into the Supabase `courses` table using the service role key.
 *
 * Run: npx tsx scripts/seed-courses.ts
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnv(): Record<string, string> {
  const lines = readFileSync(join(process.cwd(), '.env.local'), 'utf-8').split('\n')
  const env: Record<string, string> = {}
  for (const line of lines) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq === -1) continue
    env[t.slice(0, eq).trim()] = t.slice(eq + 1).trim()
  }
  return env
}

const env = loadEnv()
const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// ── Course data ──────────────────────────────────────────────────────────────
type Course = {
  name: string
  club: string | null
  country: string
  flag: string
  holes: number | null
  par: number | null
  is_major: boolean
  latitude: number | null
  longitude: number | null
  address: string | null
  website: string | null
  phone: string | null
  founded_year: number | null
}

const COURSES: Course[] = [
  // ── Danmark ────────────────────────────────────────────────────────────────
  { name: 'Aarhus Golfklub', club: 'Aarhus Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 71, is_major: false, latitude: 56.1629, longitude: 10.2039, address: 'Ny Moesgårdvej 50, 8270 Højbjerg', website: 'https://www.aarhusgolf.dk', phone: null, founded_year: 1931 },
  { name: 'Aalborg Golfklub', club: 'Aalborg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 57.0488, longitude: 9.9217, address: 'Jagtvejen 35, 9000 Aalborg', website: 'https://www.aalborggolf.dk', phone: null, founded_year: 1908 },
  { name: 'Barløseborg Golfklub', club: 'Barløseborg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.4167, longitude: 10.0833, address: 'Barløsevej 65, 5600 Faaborg', website: null, phone: null, founded_year: null },
  { name: 'Blokhus Golfklub', club: 'Blokhus Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 71, is_major: false, latitude: 57.2436, longitude: 9.5742, address: 'Himmerlandsvej 1, 9490 Pandrup', website: 'https://www.blokhus-golf.dk', phone: null, founded_year: 1992 },
  { name: 'Blåvandshuk Golfklub', club: 'Blåvandshuk Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.5578, longitude: 8.0788, address: 'Fyrvejen 2, 6857 Blåvand', website: 'https://www.bgk.dk', phone: null, founded_year: 1993 },
  { name: 'Bogense – HC Andersen Golfklub', club: 'Bogense Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.5681, longitude: 10.0889, address: 'Nørrevej 4, 5400 Bogense', website: null, phone: null, founded_year: null },
  { name: 'Dragsholm Golf Club', club: 'Dragsholm Golf Club', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.8667, longitude: 11.2833, address: 'Dragsholm Allé 1, 4540 Fårevejle', website: 'https://www.dragsholmgolf.dk', phone: null, founded_year: 1992 },
  { name: 'Elisefarm Golfklubb', club: 'Elisefarm Golfklubb', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.9833, longitude: 12.0167, address: null, website: null, phone: null, founded_year: null },
  { name: 'Esbjerg Golfklub – Marbæk', club: 'Esbjerg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 71, is_major: false, latitude: 55.5256, longitude: 8.3928, address: 'Marbækvej 10, 6710 Esbjerg V', website: 'https://www.esbjerg-golf.dk', phone: null, founded_year: 1921 },
  { name: 'Faaborg Golfklub', club: 'Faaborg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.0961, longitude: 10.2428, address: 'Svendborgvej 101, 5600 Faaborg', website: null, phone: null, founded_year: null },
  { name: 'Falster Golf', club: 'Falster Golf', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 54.7617, longitude: 11.8761, address: 'Grønsundvej 9, 4800 Nykøbing F', website: null, phone: null, founded_year: null },
  { name: 'Fredericia Golfklub', club: 'Fredericia Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.5658, longitude: 9.7392, address: 'Treldebakken 1, 7000 Fredericia', website: 'https://www.fredsgolf.dk', phone: null, founded_year: 1948 },
  { name: 'Gilleleje Golfklub', club: 'Gilleleje Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.1167, longitude: 12.2833, address: 'Bregnerødvej 28, 3250 Gilleleje', website: null, phone: null, founded_year: null },
  { name: 'Helsingør Golfklub', club: 'Helsingør Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.0369, longitude: 12.5903, address: 'Gl. Hellebækvej 72, 3000 Helsingør', website: 'https://www.helsingoergolfklub.dk', phone: null, founded_year: 1974 },
  { name: 'Himmelbjerg Golf Club', club: 'Himmelbjerg Golf Club', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.1000, longitude: 9.6833, address: 'Himmelbjerggårds Allé, 8680 Ry', website: 'https://www.himmelbjerggolf.dk', phone: null, founded_year: 1993 },
  { name: 'Himmerland Old Course', club: 'Himmerland Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.8833, longitude: 9.7500, address: 'Centervej 1, 9640 Farsø', website: 'https://www.himmerland.dk', phone: null, founded_year: 1994 },
  { name: 'Himmerland New Course', club: 'Himmerland Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.8833, longitude: 9.7500, address: 'Centervej 1, 9640 Farsø', website: 'https://www.himmerland.dk', phone: null, founded_year: 2003 },
  { name: 'Holstebro Golfklub', club: 'Holstebro Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.3592, longitude: 8.6253, address: 'Råsted Gårdvej 2, 7500 Holstebro', website: 'https://www.holstebroGolf.dk', phone: null, founded_year: 1969 },
  { name: 'Horsens Golfklub', club: 'Horsens Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.8606, longitude: 9.8486, address: 'Silkeborgvej 44, 8700 Horsens', website: null, phone: null, founded_year: null },
  { name: 'Kolding Golfklub', club: 'Kolding Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.5047, longitude: 9.4906, address: 'Øster Starup Landevej 4, 6000 Kolding', website: null, phone: null, founded_year: null },
  { name: 'Køge Golfklub', club: 'Køge Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.4589, longitude: 12.1731, address: 'Mølleskrænten 1, 4600 Køge', website: null, phone: null, founded_year: null },
  { name: 'Odense Eventyrsgolf', club: 'Odense Eventyrsgolf', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.3961, longitude: 10.3883, address: 'Falen 227, 5220 Odense SØ', website: null, phone: null, founded_year: null },
  { name: 'Roskilde Golfklub', club: 'Roskilde Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.6256, longitude: 12.0578, address: 'Kongemarken 35, 4000 Roskilde', website: 'https://www.roskildegolf.dk', phone: null, founded_year: 1935 },
  { name: 'Rungsted Golf Klub', club: 'Rungsted Golf Klub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.8831, longitude: 12.5228, address: 'Vestre Stationsvej 16, 2960 Rungsted Kyst', website: 'https://www.rungstedgolf.dk', phone: null, founded_year: 1937 },
  { name: 'Silkeborg Golfklub', club: 'Silkeborg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.1728, longitude: 9.5417, address: 'Sensommervej 2, 8600 Silkeborg', website: 'https://www.silkeborggolf.dk', phone: null, founded_year: 1948 },
  { name: 'Slagelse Golfklub', club: 'Slagelse Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.4006, longitude: 11.3444, address: null, website: null, phone: null, founded_year: null },
  { name: 'Sorø Golfklub', club: 'Sorø Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.4356, longitude: 11.5564, address: null, website: null, phone: null, founded_year: null },
  { name: 'Vejle Golfklub', club: 'Vejle Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 55.7106, longitude: 9.5361, address: 'Ibækvej 50, 7100 Vejle', website: 'https://www.vejlegolfklub.dk', phone: null, founded_year: 1963 },
  { name: 'Viborg Golfklub', club: 'Viborg Golfklub', country: 'Danmark', flag: '🇩🇰', holes: 18, par: 72, is_major: false, latitude: 56.4417, longitude: 9.3939, address: 'Spangsbjerg 4, 8800 Viborg', website: null, phone: null, founded_year: null },

  // ── Sverige ────────────────────────────────────────────────────────────────
  { name: 'Barsebäck Golf & Country Club', club: 'Barsebäck Golf & Country Club', country: 'Sverige', flag: '🇸🇪', holes: 36, par: 72, is_major: false, latitude: 55.7667, longitude: 12.9167, address: 'Barsebäcksvägen 55, 246 55 Löddeköpinge', website: 'https://www.barseback.com', phone: null, founded_year: 1969 },
  { name: 'Falsterbo Golf Club', club: 'Falsterbo Golf Club', country: 'Sverige', flag: '🇸🇪', holes: 18, par: 71, is_major: false, latitude: 55.3833, longitude: 12.8333, address: 'Fyrvägen 1, 239 45 Falsterbo', website: 'https://www.falsterbogk.se', phone: null, founded_year: 1909 },
  { name: 'Göteborg Golfklubb', club: 'Göteborg Golfklubb', country: 'Sverige', flag: '🇸🇪', holes: 18, par: 71, is_major: false, latitude: 57.7089, longitude: 11.9456, address: 'Hovåsvägen 100, 436 42 Askim', website: 'https://www.goteborg-gk.se', phone: null, founded_year: 1902 },
  { name: 'Ljunghusen Golf Club', club: 'Ljunghusen Golf Club', country: 'Sverige', flag: '🇸🇪', holes: 27, par: 72, is_major: false, latitude: 55.4167, longitude: 12.9333, address: 'Ljunghusen 142, 236 42 Höllviken', website: 'https://www.ljunghusen.se', phone: null, founded_year: 1932 },
  { name: 'Rya Golf Club', club: 'Rya Golf Club', country: 'Sverige', flag: '🇸🇪', holes: 18, par: 72, is_major: false, latitude: 56.0500, longitude: 12.7167, address: 'Ryavägen 1, 251 89 Helsingborg', website: 'https://www.ryagk.se', phone: null, founded_year: 1935 },
  { name: 'Vasatorp Golf Club', club: 'Vasatorp Golf Club', country: 'Sverige', flag: '🇸🇪', holes: 18, par: 72, is_major: false, latitude: 56.1000, longitude: 12.8000, address: 'Vasatorpsvägen 1, 254 73 Helsingborg', website: 'https://www.vasatorpsgk.se', phone: null, founded_year: 1963 },

  // ── Skotland ───────────────────────────────────────────────────────────────
  { name: 'Castle Course, St. Andrews', club: 'The Royal and Ancient Golf Club', country: 'Skotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', holes: 18, par: 71, is_major: true, latitude: 56.3398, longitude: -2.7967, address: 'St Andrews, Fife KY16 9SF', website: 'https://www.standrews.com', phone: null, founded_year: 2008 },
  { name: 'Prestwick Golf Club', club: 'Prestwick Golf Club', country: 'Skotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', holes: 18, par: 71, is_major: true, latitude: 55.5006, longitude: -4.6142, address: '2 Links Rd, Prestwick KA9 1QG', website: 'https://www.prestwickgc.co.uk', phone: null, founded_year: 1851 },
  { name: 'Western Gailes Golf Club', club: 'Western Gailes Golf Club', country: 'Skotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', holes: 18, par: 71, is_major: false, latitude: 55.6269, longitude: -4.7547, address: 'Gailes, Irvine KA11 5AE', website: 'https://www.westerngailes.com', phone: null, founded_year: 1897 },

  // ── Irland ─────────────────────────────────────────────────────────────────
  { name: 'Portmarnock Links', club: 'Portmarnock Golf Club', country: 'Irland', flag: '🇮🇪', holes: 18, par: 72, is_major: false, latitude: 53.4217, longitude: -6.1344, address: 'Strand Rd, Portmarnock, Co. Dublin', website: 'https://www.portmarnockgolfclub.ie', phone: null, founded_year: 1894 },
  { name: 'Kenmare Golf Club', club: 'Kenmare Golf Club', country: 'Irland', flag: '🇮🇪', holes: 18, par: 71, is_major: false, latitude: 51.8764, longitude: -9.5758, address: 'Killowen, Kenmare, Co. Kerry', website: null, phone: null, founded_year: 1903 },

  // ── Wales ──────────────────────────────────────────────────────────────────
  { name: 'Royal Porthcawl Golf Club', club: 'Royal Porthcawl Golf Club', country: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', holes: 18, par: 72, is_major: false, latitude: 51.4817, longitude: -3.7022, address: 'Rest Bay, Porthcawl CF36 3UW', website: 'https://www.royalporthcawl.com', phone: null, founded_year: 1891 },
  { name: 'Langland Bay Golf Club', club: 'Langland Bay Golf Club', country: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', holes: 18, par: 70, is_major: false, latitude: 51.5722, longitude: -3.9986, address: 'Langland Bay Rd, Swansea SA3 4QR', website: null, phone: null, founded_year: 1904 },

  // ── Frankrig ───────────────────────────────────────────────────────────────
  { name: 'Mandelieu Golf Club', club: 'Golf Club Cannes Mandelieu', country: 'Frankrig', flag: '🇫🇷', holes: 18, par: 71, is_major: false, latitude: 43.5453, longitude: 6.9342, address: 'Route du Golf, 06210 Mandelieu-la-Napoule', website: 'https://www.golfmandelieu.com', phone: null, founded_year: 1891 },
  { name: 'Golf de Valescure', club: 'Golf de Valescure', country: 'Frankrig', flag: '🇫🇷', holes: 18, par: 68, is_major: false, latitude: 43.4667, longitude: 6.7167, address: 'Ave Paul Hermite, 83700 Saint-Raphaël', website: null, phone: null, founded_year: 1895 },

  // ── Tyskland ───────────────────────────────────────────────────────────────
  { name: 'Winston Links', club: 'Winston Links', country: 'Tyskland', flag: '🇩🇪', holes: 18, par: 72, is_major: false, latitude: null, longitude: null, address: null, website: null, phone: null, founded_year: null },
]

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  console.log(`\n🏌️  Seeding ${COURSES.length} courses into Supabase...\n`)

  const byCountry: Record<string, number> = {}
  for (const c of COURSES) byCountry[c.country] = (byCountry[c.country] ?? 0) + 1
  for (const [country, count] of Object.entries(byCountry)) {
    console.log(`   ${count.toString().padStart(2)} × ${country}`)
  }
  console.log()

  // Insert in one batch — service role bypasses RLS
  const { data, error } = await supabase
    .from('courses')
    .insert(COURSES)
    .select('id, name, country')

  if (error) {
    console.error('❌  Insert failed:', error.message)
    if (error.details) console.error('   Details:', error.details)
    if (error.hint)    console.error('   Hint:   ', error.hint)
    process.exit(1)
  }

  console.log(`✅  Inserted ${data?.length ?? 0} courses\n`)
  const inserted = data ?? []
  for (const row of inserted) {
    console.log(`   ✓ [${row.id}] ${row.name} (${row.country})`)
  }
  console.log(`\n🎉  Done!`)
}

main().catch(err => {
  console.error('\n❌  Fatal:', err.message)
  process.exit(1)
})
