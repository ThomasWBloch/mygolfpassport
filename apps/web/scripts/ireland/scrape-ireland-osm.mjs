// Scrape OSM for Irish + Northern Irish golf clubs via Overpass API.
// Fix: previous version dropped ROI clubs without addr tags as "GB-mainland".
// New strategy: TWO separate queries (IE area, GB area). Tag each element
// with its source area. NI is identified within GB results via addr tags or
// NI bbox. ROI clubs from the IE query always stay as Ireland.
//
// Run: node scripts/ireland/scrape-ireland-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/ireland/ireland-clubs-osm.json'

const QUERY_FOR = (iso) => `[out:json][timeout:120];
area["ISO3166-1"="${iso}"]->.a;
(
  node[leisure=golf_course](area.a);
  way[leisure=golf_course](area.a);
  relation[leisure=golf_course](area.a);
);
out center tags;`

const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function queryServer(server, query) {
  const resp = await fetch(server, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'mygolfpassport/1.0 (ireland club scrape; thomasbloch74@gmail.com)',
      Accept: 'application/json',
    },
    body: `data=${encodeURIComponent(query)}`,
    signal: AbortSignal.timeout(180000),
  })
  if (!resp.ok) return { ok: false, msg: `${resp.status} ${resp.statusText}` }
  const text = await resp.text()
  if (!text.startsWith('{')) return { ok: false, msg: 'non-JSON response' }
  return { ok: true, json: JSON.parse(text) }
}

async function queryOverpass(query, label) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    for (const server of SERVERS) {
      try {
        console.log(`[${label}] [attempt ${attempt}] ${server}...`)
        const r = await queryServer(server, query)
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

// Within the GB result set, decide NI vs GB-mainland.
function isNorthernIreland(tags, lat, lon) {
  const addrCountry = (tags['addr:country'] || '').toUpperCase()
  if (addrCountry === 'GB-NIR') return true
  const state = (tags['addr:state'] || tags['is_in:state'] || '').toLowerCase()
  if (/northern ireland/.test(state)) return true
  const niCounties = ['antrim', 'armagh', 'down', 'fermanagh', 'londonderry', 'derry', 'tyrone']
  const county = (tags['addr:county'] || '').toLowerCase()
  if (niCounties.some((c) => county.includes(c))) return true
  // Geographic fallback (NI bbox)
  if (lat != null && lon != null && lat >= 54.0 && lat <= 55.4 && lon >= -8.2 && lon <= -5.4) return true
  return false
}

function normalize(el, sourceISO) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null
  if (lat == null || lon == null) return null

  const addrParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'] || tags['addr:town'] || tags['addr:village'],
    tags['addr:county'],
  ]
  const address = addrParts.filter(Boolean).join(', ') || null

  const website = tags.website || tags.url || tags['contact:website'] || null
  const phone = tags.phone || tags['contact:phone'] || null

  let country
  if (sourceISO === 'IE') {
    country = 'Ireland'
  } else {
    country = isNorthernIreland(tags, lat, lon) ? 'Northern Ireland' : 'GB-mainland'
  }

  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    lat,
    lon,
    website,
    address,
    phone,
    country,
    source: sourceISO,
  }
}

// ---- run ----
const ieJson = await queryOverpass(QUERY_FOR('IE'), 'IE')
if (!ieJson) {
  console.error('IE Overpass query failed.')
  process.exit(1)
}
const gbJson = await queryOverpass(QUERY_FOR('GB'), 'GB')
if (!gbJson) {
  console.error('GB Overpass query failed.')
  process.exit(1)
}

const ieElements = ieJson.elements || []
const gbElements = gbJson.elements || []
console.log(`Raw OSM elements — IE: ${ieElements.length}, GB: ${gbElements.length}`)

const all = []
const seen = new Set()
const dedupeAdd = (c) => {
  if (!c) return
  const key = `${c.osm_type}/${c.osm_id}`
  if (seen.has(key)) return
  seen.add(key)
  all.push(c)
}

for (const el of ieElements) dedupeAdd(normalize(el, 'IE'))
for (const el of gbElements) dedupeAdd(normalize(el, 'GB'))

// Drop GB-mainland — Ireland-campaign output only
const irelandScope = all.filter((c) => c.country !== 'GB-mainland')
irelandScope.sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name))

mkdirSync('scripts/ireland', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(irelandScope, null, 2))

const counts = irelandScope.reduce((acc, c) => {
  acc[c.country] = (acc[c.country] || 0) + 1
  return acc
}, {})
const withWebsite = irelandScope.filter((c) => c.website).length
const withAddress = irelandScope.filter((c) => c.address).length
const withPhone = irelandScope.filter((c) => c.phone).length
const websiteByCountry = (cn) => irelandScope.filter((c) => c.country === cn && c.website).length

console.log('')
console.log('--- Summary ---')
console.log(`Total OSM elements:     ${ieElements.length + gbElements.length}`)
console.log(`Unique (deduped):       ${all.length}`)
console.log(`Ireland-scope (IE+NI):  ${irelandScope.length}`)
console.log(`  by country:           ${JSON.stringify(counts)}`)
console.log(`Dropped GB-mainland:    ${all.length - irelandScope.length}`)
console.log(`With website:           ${withWebsite}`)
console.log(`  Ireland:              ${websiteByCountry('Ireland')}`)
console.log(`  Northern Ireland:     ${websiteByCountry('Northern Ireland')}`)
console.log(`With address:           ${withAddress}`)
console.log(`With phone:             ${withPhone}`)
console.log(`Wrote: ${OUT_PATH}`)
