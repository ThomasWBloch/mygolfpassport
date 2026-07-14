// Scrape OSM for Welsh golf clubs via Overpass API.
// GB query, post-filter to Wales (addr:country=GB-WLS or Wales bbox).
// Wales bbox: roughly lat 51.3 to 53.4, lon -5.4 to -2.6
//
// Run: node scripts/wales/scrape-wales-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/wales/wales-clubs-osm.json'

const QUERY = `[out:json][timeout:120];
area["ISO3166-1"="GB"]->.gb;
(
  node[leisure=golf_course](area.gb);
  way[leisure=golf_course](area.gb);
  relation[leisure=golf_course](area.gb);
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
      'User-Agent': 'mygolfpassport/1.0 (wales scrape; thomasbloch74@gmail.com)',
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

function isWales(tags, lat, lon) {
  const addrCountry = (tags['addr:country'] || '').toUpperCase()
  if (addrCountry === 'GB-WLS') return true
  if (addrCountry === 'GB-NIR' || addrCountry === 'GB-ENG' || addrCountry === 'GB-SCT') return false
  const state = (tags['addr:state'] || tags['is_in:state'] || tags['is_in:country'] || '').toLowerCase()
  if (/wales|cymru/.test(state)) return true
  if (/scotland|england|northern ireland/.test(state)) return false
  // Wales bbox fallback
  if (lat == null || lon == null) return false
  return lat >= 51.3 && lat <= 53.45 && lon >= -5.4 && lon <= -2.6
}

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:en'] || tags['name:cy'] || tags.short_name || '').trim()
  if (!name) return null

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null
  if (lat == null || lon == null) return null
  if (!isWales(tags, lat, lon)) return null

  const addrParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'] || tags['addr:town'] || tags['addr:village'],
    tags['addr:county'],
  ]
  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    lat,
    lon,
    website: tags.website || tags.url || tags['contact:website'] || null,
    address: addrParts.filter(Boolean).join(', ') || null,
    phone: tags.phone || tags['contact:phone'] || null,
    country: 'Wales',
  }
}

const json = await queryOverpass()
if (!json) { console.error('All Overpass servers failed.'); process.exit(1) }

const elements = json.elements || []
console.log(`Raw GB OSM elements: ${elements.length}`)

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
clubs.sort((a, b) => a.name.localeCompare(b.name))

mkdirSync('scripts/wales', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withWebsite = clubs.filter((c) => c.website).length
const withAddress = clubs.filter((c) => c.address).length

console.log('')
console.log('--- Summary ---')
console.log(`Wales-classified:  ${clubs.length}`)
console.log(`With website:      ${withWebsite}`)
console.log(`With address:      ${withAddress}`)
console.log(`Wrote: ${OUT_PATH}`)
