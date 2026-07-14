// Scrape OSM for French golf clubs via Overpass API.
// Run: node scripts/france/scrape-france-osm.mjs
//
// Session 32 (2026-05-05): genbrug af BE/AT/CH-mønsteret. Forventet ~1149
// rå elements; ~363 med website, ~169 phone, ~89 email (probe 2026-05-05).
// Frankrig har 100% coords i DB allerede, så OSM bruges primært som
// website-fallback for ffgolf-orphans.

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/france/france-clubs-osm.json'

const QUERY = `[out:json][timeout:90];
area["ISO3166-1"="FR"][admin_level=2]->.fr;
(node[leisure=golf_course](area.fr);
 way[leisure=golf_course](area.fr);
 relation[leisure=golf_course](area.fr);
 node[sport=golf](area.fr);
 way[sport=golf](area.fr);
 relation[sport=golf](area.fr););
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
  "centre d'entrainement",
  "centre d'entraînement",
  'practice',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function queryServer(server) {
  const resp = await fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'mygolfpassport/1.0 (france club scrape; thomasbloch74@gmail.com)',
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
  const name = (
    tags.name ||
    tags['name:fr'] ||
    tags['name:en'] ||
    tags.short_name ||
    ''
  ).trim()
  if (!name) return null
  if (isBlocklisted(name)) return { __blocked: name }

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null

  const addrParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:postcode'], tags['addr:city']]
  const address = addrParts.filter(Boolean).join(', ') || null

  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    name_fr: tags['name:fr'] || null,
    lat,
    lon,
    website: tags.website || tags.url || tags['contact:website'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    email: tags.email || tags['contact:email'] || null,
    address,
    city: tags['addr:city'] || null,
    postcode: tags['addr:postcode'] || null,
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

clubs.sort((a, b) => a.name.localeCompare(b.name, 'fr'))

mkdirSync('scripts/france', { recursive: true })
writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'France',
      iso: 'FR',
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
console.log(`  With website:      ${clubs.filter((c) => c.website).length}`)
console.log(`  With phone:        ${clubs.filter((c) => c.phone).length}`)
console.log(`  With email:        ${clubs.filter((c) => c.email).length}`)
console.log(`  With coords:       ${clubs.filter((c) => c.lat != null).length}`)
console.log(`Wrote: ${OUT_PATH}`)
