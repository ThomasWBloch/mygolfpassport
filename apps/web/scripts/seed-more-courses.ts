/**
 * seed-more-courses.ts
 *
 * Adds Scotland, Ireland, England, Spain, Portugal, and more Danish courses
 * to the Supabase `courses` table. Uses upsert on name to avoid duplicates.
 *
 * Run: npx tsx scripts/seed-more-courses.ts
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
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ── Course data ──────────────────────────────────────────────────────────────
const courses = [
  // ── Scotland ──────────────────────────────────────────────────────────────
  {
    name: 'Old Course',
    club: 'The R&A Golf Club',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Bruce Embankment, St Andrews KY16 9JA',
    latitude: 56.3407,
    longitude: -2.8027,
    holes: 18,
    par: 72,
    website: 'https://www.standrews.com',
    founded_year: 1552,
    is_major: true,
  },
  {
    name: 'Carnoustie Championship',
    club: 'Carnoustie Golf Links',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Links Parade, Carnoustie DD7 7JE',
    latitude: 56.5022,
    longitude: -2.7115,
    holes: 18,
    par: 72,
    website: 'https://www.carnoustiegolflinks.co.uk',
    founded_year: 1842,
    is_major: true,
  },
  {
    name: 'Royal Troon Old Course',
    club: 'Royal Troon Golf Club',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Craigend Rd, Troon KA10 6EP',
    latitude: 55.5333,
    longitude: -4.6667,
    holes: 18,
    par: 71,
    website: 'https://www.royaltroon.co.uk',
    founded_year: 1878,
    is_major: true,
  },
  {
    name: 'Muirfield',
    club: 'The Honourable Company of Edinburgh Golfers',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Duncur Rd, Gullane EH31 2EG',
    latitude: 56.0333,
    longitude: -2.8167,
    holes: 18,
    par: 71,
    website: 'https://www.muirfield.org.uk',
    founded_year: 1744,
    is_major: true,
  },
  {
    name: 'Turnberry Ailsa',
    club: 'Trump Turnberry Resort',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Turnberry KA26 9LT',
    latitude: 55.3167,
    longitude: -4.8333,
    holes: 18,
    par: 70,
    website: 'https://www.trumpturnberry.com',
    founded_year: 1906,
    is_major: true,
  },
  {
    name: 'Kingsbarns Golf Links',
    club: 'Kingsbarns Golf Links',
    country: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    address: 'Kingsbarns, St Andrews KY16 8QD',
    latitude: 56.2833,
    longitude: -2.6667,
    holes: 18,
    par: 72,
    website: 'https://www.kingsbarns.com',
    founded_year: 2000,
    is_major: false,
  },

  // ── Ireland / Northern Ireland ────────────────────────────────────────────
  {
    name: 'Ballybunion Old',
    club: 'Ballybunion Golf Club',
    country: 'Ireland',
    flag: '🇮🇪',
    address: 'Sandhill Rd, Ballybunion, Co. Kerry',
    latitude: 52.5167,
    longitude: -9.6833,
    holes: 18,
    par: 71,
    website: 'https://www.ballybuniongolfclub.ie',
    founded_year: 1893,
    is_major: false,
  },
  {
    name: 'Lahinch Old',
    club: 'Lahinch Golf Club',
    country: 'Ireland',
    flag: '🇮🇪',
    address: 'Lahinch, Co. Clare',
    latitude: 52.9333,
    longitude: -9.3500,
    holes: 18,
    par: 72,
    website: 'https://www.lahinchgolf.com',
    founded_year: 1892,
    is_major: false,
  },
  {
    name: 'Royal Portrush Dunluce',
    club: 'Royal Portrush Golf Club',
    country: 'Northern Ireland',
    flag: '🇬🇧',
    address: 'Dunluce Rd, Portrush BT56 8JQ',
    latitude: 55.2000,
    longitude: -6.6500,
    holes: 18,
    par: 72,
    website: 'https://www.royalportrushgolfclub.com',
    founded_year: 1888,
    is_major: true,
  },
  {
    name: 'Waterville Golf Links',
    club: 'Waterville Golf Links',
    country: 'Ireland',
    flag: '🇮🇪',
    address: 'Waterville, Co. Kerry',
    latitude: 51.8167,
    longitude: -10.1667,
    holes: 18,
    par: 72,
    website: 'https://www.watervillegolflinks.ie',
    founded_year: 1889,
    is_major: false,
  },

  // ── England ────────────────────────────────────────────────────────────────
  {
    name: 'Royal Birkdale',
    club: 'Royal Birkdale Golf Club',
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    address: 'Waterloo Rd, Southport PR8 2LX',
    latitude: 53.6333,
    longitude: -3.0333,
    holes: 18,
    par: 70,
    website: 'https://www.royalbirkdale.com',
    founded_year: 1889,
    is_major: true,
  },
  {
    name: "Royal St George's",
    club: "Royal St George's Golf Club",
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    address: 'Sandwich, Kent CT13 9PB',
    latitude: 51.3000,
    longitude: 1.3833,
    holes: 18,
    par: 70,
    website: 'https://www.royalstgeorges.com',
    founded_year: 1887,
    is_major: true,
  },
  {
    name: 'Sunningdale Old',
    club: 'Sunningdale Golf Club',
    country: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    address: 'Ridgemount Rd, Sunningdale SL5 9RR',
    latitude: 51.3833,
    longitude: -0.6167,
    holes: 18,
    par: 70,
    website: 'https://www.sunningdale-golfclub.co.uk',
    founded_year: 1900,
    is_major: false,
  },

  // ── Spain ─────────────────────────────────────────────────────────────────
  {
    name: 'Valderrama',
    club: 'Club de Golf Valderrama',
    country: 'Spain',
    flag: '🇪🇸',
    address: 'Av. de los Cortijos, Sotogrande, Cádiz',
    latitude: 36.3167,
    longitude: -5.3333,
    holes: 18,
    par: 71,
    website: 'https://www.valderrama.com',
    founded_year: 1985,
    is_major: false,
  },
  {
    name: 'PGA Catalunya Stadium',
    club: 'PGA Catalunya Resort',
    country: 'Spain',
    flag: '🇪🇸',
    address: 'Caldes de Malavella, Girona',
    latitude: 41.8500,
    longitude: 2.8333,
    holes: 18,
    par: 72,
    website: 'https://www.pgacatalunya.com',
    founded_year: 1999,
    is_major: false,
  },

  // ── Portugal ──────────────────────────────────────────────────────────────
  {
    name: 'Quinta do Lago South',
    club: 'Quinta do Lago',
    country: 'Portugal',
    flag: '🇵🇹',
    address: 'Quinta do Lago, Almancil, Algarve',
    latitude: 37.0333,
    longitude: -8.0000,
    holes: 18,
    par: 72,
    website: 'https://www.quintadolago.com',
    founded_year: 1974,
    is_major: false,
  },
  {
    name: 'Monte Rei Golf',
    club: 'Monte Rei Golf & Country Club',
    country: 'Portugal',
    flag: '🇵🇹',
    address: 'Sítio do Pocinho, Vila Nova de Cacela',
    latitude: 37.2000,
    longitude: -7.6500,
    holes: 18,
    par: 72,
    website: 'https://www.montereiresort.com',
    founded_year: 2007,
    is_major: false,
  },

  // ── Denmark (additions) ───────────────────────────────────────────────────
  {
    name: 'Scandinavian Golf Club',
    club: 'Scandinavian Golf Club',
    country: 'Denmark',
    flag: '🇩🇰',
    address: 'Greens Alle 1, 2860 Søborg',
    latitude: 55.7367,
    longitude: 12.4867,
    holes: 18,
    par: 71,
    website: 'https://www.sgc.dk',
    founded_year: 1972,
    is_major: false,
  },
  {
    name: 'Lübker Golf Resort',
    club: 'Lübker Golf Resort',
    country: 'Denmark',
    flag: '🇩🇰',
    address: 'Lübkervej 40, 8500 Grenaa',
    latitude: 56.4833,
    longitude: 10.8333,
    holes: 18,
    par: 72,
    website: 'https://www.lubker.com',
    founded_year: 2005,
    is_major: false,
  },
  {
    name: 'Helsingør Golfklub',
    club: 'Helsingør Golfklub',
    country: 'Denmark',
    flag: '🇩🇰',
    address: 'Gl. Hellebækvej 72, 3000 Helsingør',
    latitude: 56.0333,
    longitude: 12.6000,
    holes: 18,
    par: 71,
    website: 'https://www.helsingoergolf.dk',
    founded_year: 1936,
    is_major: false,
  },
]

// ── Run ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🏌️  Seeding ${courses.length} courses…\n`)

  // Get existing names before upsert so we can report what was added vs skipped
  const { data: existing } = await supabase
    .from('courses')
    .select('name')

  const existingNames = new Set((existing ?? []).map(r => r.name as string))

  const newCourses = courses.filter(c => !existingNames.has(c.name))
  const skipped    = courses.filter(c =>  existingNames.has(c.name))

  if (skipped.length > 0) {
    console.log(`⏭️  Skipping ${skipped.length} already-existing courses:`)
    skipped.forEach(c => console.log(`   · ${c.name}`))
    console.log()
  }

  if (newCourses.length === 0) {
    console.log('✅ All courses already in database — nothing to insert.\n')
    return
  }

  const { data, error } = await supabase
    .from('courses')
    .insert(newCourses)
    .select('name')

  if (error) {
    console.error('❌ Upsert failed:', error.message)
    if (error.details) console.error('   Details:', error.details)
    process.exit(1)
  }

  console.log(`✅ Inserted ${data?.length ?? newCourses.length} new courses:`)
  ;(data ?? newCourses).forEach(c => console.log(`   + ${c.name}`))
  console.log()
  console.log(`📊 Summary: ${data?.length ?? newCourses.length} added, ${skipped.length} already existed, ${courses.length} total processed.\n`)
}

main()
