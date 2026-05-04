// Scrape OSM for Dutch golf clubs/courses via Overpass API.
// Netherlands is contiguous (no exclude-bbox needed). ISO3166-1=NL.
//
// Returnerer course-niveau features hvor tilgængelige (multi-course klubber
// vil have flere OSM-elementer hvor hvert er et separat name-tag). Det giver
// både coords (Pass 1) og banenavne-verifikation (Pass 4 — manuelt review).
//
// Run: node scripts/netherlands/scrape-netherlands-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/netherlands/holland-clubs-osm.json'

const QUERY = `[out:json][timeout:120];
area["ISO3166-1"="NL"]->.nl;
(
  node[leisure=golf_course](area.nl);
  way[leisure=golf_course](area.nl);
  relation[leisure=golf_course](area.nl);
);
out center tags;`

const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function queryServer(server) {
  const resp = await fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'mygolfpassport/1.0 (netherlands scrape; thomasbloch74@gmail.com)',
      Accept: 'application/json',
    },
    body: `data=${encodeURIComponent(QUERY)}`,
    signal: AbortSignal.timeout(180000),
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
    if (attempt < 3) await sleep(15000 * attempt)
  }
  return null
}

// NL bbox sanity-check (for at filtrere udenlandske enklaver/falske resultater)
// NL er ca. lat 50.7-53.6, lon 3.2-7.3 (inkl. de Caribiske kommuner ekskluderet)
function isInNetherlands(tags, lat, lon) {
  const addrCountry = (tags['addr:country'] || '').toUpperCase()
  if (addrCountry === 'NL') return true
  if (['BE', 'DE', 'FR', 'GB', 'LU'].includes(addrCountry)) return false

  if (lat == null || lon == null) return false
  // European NL bbox (drop Caribiske: BES-øer ligger lat <13)
  return lat >= 50.7 && lat <= 53.6 && lon >= 3.2 && lon <= 7.3
}

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:nl'] || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null
  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null
  if (lat == null || lon == null) return null
  if (!isInNetherlands(tags, lat, lon)) return null

  const addrParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'] || tags['addr:town'] || tags['addr:village'],
  ]
  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    lat,
    lon,
    website: tags.website || tags.url || tags['contact:website'] || null,
    address: addrParts.filter(Boolean).join(', ') || null,
    postcode: tags['addr:postcode'] || null,
    city: tags['addr:city'] || tags['addr:town'] || tags['addr:village'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    email: tags.email || tags['contact:email'] || null,
    holes: tags['golf:holes'] ? Number(tags['golf:holes']) : null,
    country: 'Netherlands',
  }
}

const json = await queryOverpass()
if (!json) { console.error('All Overpass servers failed.'); process.exit(1) }

const elements = json.elements || []
console.log(`Raw NL OSM elements: ${elements.length}`)

const clubs = []
const seen = new Set()
for (const el of elements) {
  const c = normalize(el)
  if (!c) continue
  const key = `${c.osm_type}/${c.osm_id}`
  if (seen.has(key)) continue
  seen.add(key)
  clubs.push(c)
}
clubs.sort((a, b) => a.name.localeCompare(b.name, 'nl'))

mkdirSync('scripts/netherlands', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withWebsite = clubs.filter((c) => c.website).length
const withAddress = clubs.filter((c) => c.address).length
const withHoles = clubs.filter((c) => c.holes).length
console.log('')
console.log('--- Summary ---')
console.log(`NL-classified:        ${clubs.length}`)
console.log(`With website:         ${withWebsite}`)
console.log(`With address:         ${withAddress}`)
console.log(`With golf:holes tag:  ${withHoles}`)
console.log(`Wrote: ${OUT_PATH}`)
