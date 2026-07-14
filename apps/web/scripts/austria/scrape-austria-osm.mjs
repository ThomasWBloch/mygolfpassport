// Scrape OSM for Austrian golf clubs via Overpass API.
// Run: node scripts/austria/scrape-austria-osm.mjs
//
// Mirrors scripts/italy/scrape-italy-osm.mjs — only ISO code, output path,
// and locale-specific blocklist substrings differ.
//
// Austria-specific notes:
//   - Some Austrian "Übungsplatz" / "Driving Range" facilities carry
//     leisure=golf_course in OSM but aren't real clubs.
//   - "Pitch & Putt"-only facilities are also dropped — same logic as Italy.
//   - Border overlap with DE/CH/IT/SI/HU/SK/CZ is handled at the match step;
//     here we filter strictly by ISO3166-1=AT to keep the source clean.

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/austria/austria-clubs-osm.json'

const QUERY = `[out:json][timeout:90];
area["ISO3166-1"="AT"]->.at;
(node[leisure=golf_course](area.at);
 way[leisure=golf_course](area.at);
 relation[leisure=golf_course](area.at););
out center tags;`

const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

// Drop these (case-insensitive substring match on name) — practice / non-club.
const NAME_BLOCKLIST = [
  'driving range',
  'pitch & putt',
  'pitch and putt',
  'übungsplatz',
  'uebungsplatz',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function queryServer(server) {
  const resp = await fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'mygolfpassport/1.0 (austria club scrape; thomasbloch74@gmail.com)',
      'Accept': 'application/json',
    },
    body: `data=${encodeURIComponent(QUERY)}`,
    signal: AbortSignal.timeout(150000),
  })
  if (!resp.ok) {
    return { ok: false, msg: `${resp.status} ${resp.statusText}` }
  }
  const text = await resp.text()
  if (!text.startsWith('{')) return { ok: false, msg: 'non-JSON response' }
  return { ok: true, json: JSON.parse(text) }
}

async function queryOverpass() {
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const server of SERVERS) {
      try {
        console.log(`[attempt ${attempt}] ${server}...`)
        const r = await queryServer(server)
        if (r.ok) return r.json
        console.log(`  ${r.msg} — trying next`)
      } catch (err) {
        console.log(`  ${err.message} — trying next`)
      }
      await sleep(3000)
    }
    if (attempt < 3) {
      const wait = 15000 * attempt
      console.log(`  all servers failed — sleeping ${wait / 1000}s before next round`)
      await sleep(wait)
    }
  }
  return null
}

function isBlocklisted(name) {
  const lower = name.toLowerCase()
  return NAME_BLOCKLIST.some((needle) => lower.includes(needle))
}

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:de'] || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null
  if (isBlocklisted(name)) return { __blocked: name }

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null

  const addrParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'],
  ]
  const address = addrParts.filter(Boolean).join(', ') || null

  const website = tags.website || tags.url || tags['contact:website'] || null
  const phone = tags.phone || tags['contact:phone'] || null
  const email = tags.email || tags['contact:email'] || null

  // Holes (verification only — courses.holes is already 100% from Golfapi import)
  let holes = null
  const golfHoles = tags['golf:holes'] || tags['holes']
  if (golfHoles && /^\d+$/.test(String(golfHoles))) holes = Number(golfHoles)

  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    name_de: tags['name:de'] || null,
    lat,
    lon,
    website,
    phone,
    email,
    address,
    city: tags['addr:city'] || null,
    postcode: tags['addr:postcode'] || null,
    region: tags['addr:state'] || tags['addr:region'] || null,
    holes,
  }
}

const json = await queryOverpass()
if (!json) {
  console.error('All Overpass servers failed.')
  process.exit(1)
}

const elements = json.elements || []
console.log(`Raw OSM elements: ${elements.length}`)

const clubs = []
const blocked = []
const nameless = []
const seen = new Set()

for (const el of elements) {
  const c = normalize(el)
  if (!c) {
    nameless.push({ type: el.type, id: el.id })
    continue
  }
  if (c.__blocked) {
    blocked.push({ type: el.type, id: el.id, name: c.__blocked })
    continue
  }
  const latKey = c.lat != null ? c.lat.toFixed(4) : 'x'
  const lonKey = c.lon != null ? c.lon.toFixed(4) : 'x'
  const key = `${c.name.toLowerCase()}|${latKey}|${lonKey}`
  if (seen.has(key)) continue
  seen.add(key)
  clubs.push(c)
}

clubs.sort((a, b) => a.name.localeCompare(b.name, 'de'))

mkdirSync('scripts/austria', { recursive: true })
writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Austria',
      iso: 'AT',
      source: 'OpenStreetMap Overpass',
      scraped_at: new Date().toISOString(),
      raw_elements: elements.length,
      blocklist_dropped: blocked.length,
      nameless_dropped: nameless.length,
      after_dedup: clubs.length,
      clubs,
      blocked,
      nameless,
    },
    null,
    2,
  ),
)

const withWebsite = clubs.filter((c) => c.website).length
const withPhone = clubs.filter((c) => c.phone).length
const withEmail = clubs.filter((c) => c.email).length
const withAddress = clubs.filter((c) => c.address).length
const withCoords = clubs.filter((c) => c.lat != null && c.lon != null).length
const withHoles = clubs.filter((c) => c.holes != null).length

console.log('')
console.log('--- Summary ---')
console.log(`Raw elements:        ${elements.length}`)
console.log(`Nameless (dropped):  ${nameless.length}`)
console.log(`Blocklist (dropped): ${blocked.length}`)
console.log(`After dedup:         ${clubs.length}`)
console.log(`  With website:      ${withWebsite}`)
console.log(`  With phone:        ${withPhone}`)
console.log(`  With email:        ${withEmail}`)
console.log(`  With address:      ${withAddress}`)
console.log(`  With coords:       ${withCoords}`)
console.log(`  With holes:        ${withHoles}`)
console.log(`Wrote: ${OUT_PATH}`)
if (blocked.length > 0) {
  console.log('')
  console.log('Blocklisted names:')
  for (const b of blocked) console.log(`  ${b.type}/${b.id}: ${b.name}`)
}
