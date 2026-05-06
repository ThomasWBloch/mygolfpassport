// Scrape OSM for Australian golf clubs via Overpass API.
// Run: node scripts/australia/scrape-australia-osm.mjs
//
// Session 37 (2026-05-06): genbrug af FR-mønsteret. Probe 2026-05-06 viste:
//   2.035 raw elements, 1.568 named, 559 website (27%), 540 phone (26%), 107 email (5%).
// Australia har 99.9% coords i DB efter golf.com.au scrape, så OSM bruges
// som website-fallback for golf.com.au-orphans.

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/australia/australia-clubs-osm.json'

const QUERY = `[out:json][timeout:90];
area["ISO3166-1"="AU"][admin_level=2]->.au;
(node[leisure=golf_course](area.au);
 way[leisure=golf_course](area.au);
 relation[leisure=golf_course](area.au);
 node[sport=golf](area.au);
 way[sport=golf](area.au);
 relation[sport=golf](area.au););
out center tags;`

const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const NAME_BLOCKLIST = [
  'driving range',
  'pitch & putt',
  'pitch and putt',
  'practice',
  'mini golf',
  'minigolf',
  'disc golf',
  'foot golf',
  'footgolf',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function queryServer(server) {
  const resp = await fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'mygolfpassport/1.0 (australia club scrape; thomasbloch74@gmail.com)',
      Accept: 'application/json',
    },
    body: `data=${encodeURIComponent(QUERY)}`,
    signal: AbortSignal.timeout(150000),
  })
  if (!resp.ok) return { ok: false, msg: `${resp.status} ${resp.statusText}` }
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
  const name = (tags.name || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null
  if (isBlocklisted(name)) return { __blocked: name }

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null

  const addrParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:postcode'], tags['addr:city'], tags['addr:state']]
  const address = addrParts.filter(Boolean).join(', ') || null

  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    lat,
    lon,
    website: tags.website || tags.url || tags['contact:website'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    email: tags.email || tags['contact:email'] || null,
    address,
    city: tags['addr:city'] || null,
    postcode: tags['addr:postcode'] || null,
    state: tags['addr:state'] || null,
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

clubs.sort((a, b) => a.name.localeCompare(b.name, 'en'))

mkdirSync('scripts/australia', { recursive: true })
writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Australia',
      iso: 'AU',
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

console.log('')
console.log('--- Summary ---')
console.log(`Raw elements:        ${elements.length}`)
console.log(`Nameless (dropped):  ${nameless.length}`)
console.log(`Blocklist (dropped): ${blocked.length}`)
console.log(`After dedup:         ${clubs.length}`)
