// My Golf Passport — OSM Golf Course Importer (Danmark)
// Kør med: node scripts/import-osm-courses.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Mangler SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Prøver flere servere i rækkefølge
const OVERPASS_SERVERS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass-api.de/api/interpreter',
]

// Bounding box for Danmark: S=54.5, N=57.8, W=8.0, E=15.2
const QUERY = `
[out:json][timeout:90];
(
  way["leisure"="golf_course"](54.5,8.0,57.8,15.2);
  relation["leisure"="golf_course"](54.5,8.0,57.8,15.2);
);
out center tags;
`

async function fetchFromOSM() {
  for (const url of OVERPASS_SERVERS) {
    console.log(`Forsøger: ${url}`)
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ data: QUERY }),
      })
      const text = await resp.text()
      if (!text.trim().startsWith('{')) {
        console.warn(`  → Status ${resp.status}, ikke JSON — prøver næste server`)
        continue
      }
      const data = JSON.parse(text)
      console.log(`  → OK`)
      return data.elements || []
    } catch (e) {
      console.warn(`  → Fejl: ${e.message} — prøver næste server`)
    }
  }
  console.error('Alle Overpass-servere fejlede.')
  process.exit(1)
}

function parseElement(el) {
  const tags = el.tags || {}
  const name = tags.name || tags['name:en'] || tags.short_name
  if (!name) return null

  const center = el.center || {}
  const club = tags.operator || tags.club || name

  const holes = tags.holes ? parseInt(tags.holes) : null
  const par = tags.par ? parseInt(tags.par) : null

  const addrParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:postcode'], tags['addr:city']]
  const address = addrParts.filter(Boolean).join(', ') || null

  return {
    name: name.trim(),
    club: club.trim(),
    country: 'Danmark',
    flag: '🇩🇰',
    latitude: center.lat || null,
    longitude: center.lon || null,
    holes: isNaN(holes) ? null : holes,
    par: isNaN(par) ? null : par,
    website: tags.website || tags.url || tags['contact:website'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    address,
    is_major: false,
  }
}

async function main() {
  // Hent eksisterende navne
  const { data: existing } = await supabase.from('courses').select('name')
  const existingNames = new Set((existing || []).map(r => r.name.toLowerCase().trim()))
  console.log(`${existingNames.size} baner findes allerede i databasen`)

  // Hent fra OSM
  const elements = await fetchFromOSM()
  console.log(`${elements.length} elementer modtaget fra OSM`)

  // Parse og filtrer
  const parsed = elements.map(parseElement).filter(Boolean)
  const deduped = [...new Map(parsed.map(c => [c.name.toLowerCase(), c])).values()]
  const newCourses = deduped.filter(c => !existingNames.has(c.name.toLowerCase().trim()))

  console.log(`${deduped.length} unikke baner fra OSM`)
  console.log(`${newCourses.length} nye baner klar til import`)
  console.log()
  console.log('Eksempel (første 5):')
  newCourses.slice(0, 5).forEach(c => {
    console.log(`  ${c.flag} ${c.name} | ${c.club} | ${c.holes ?? '?'} huller | ${c.latitude?.toFixed(4)}, ${c.longitude?.toFixed(4)}`)
  })

  if (newCourses.length === 0) {
    console.log('Ingen nye baner at tilføje.')
    return
  }

  // Indsæt i batches af 50
  let inserted = 0
  for (let i = 0; i < newCourses.length; i += 50) {
    const batch = newCourses.slice(i, i + 50)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) {
      console.error(`Fejl i batch ${Math.floor(i/50)+1}:`, error.message)
    } else {
      inserted += batch.length
      console.log(`Batch ${Math.floor(i/50)+1}: ${batch.length} baner indsat`)
    }
  }

  console.log(`\nFaerdig! ${inserted} baner tilfojet til databasen.`)
}

main()
