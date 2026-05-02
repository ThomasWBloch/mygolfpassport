// Scrape OSM for English golf clubs via Overpass API.
// England = GB minus Scotland, NI, Wales.
// Uses addr:country tags + exclude-bbox for the other UK nations.
//
// Run: node scripts/england/scrape-england-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/england/england-clubs-osm.json'

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
      'User-Agent': 'mygolfpassport/1.0 (england scrape; thomasbloch74@gmail.com)',
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

function isEngland(tags, lat, lon) {
  const addrCountry = (tags['addr:country'] || '').toUpperCase()
  if (addrCountry === 'GB-ENG') return true
  if (addrCountry === 'GB-NIR' || addrCountry === 'GB-SCT' || addrCountry === 'GB-WLS') return false
  const state = (tags['addr:state'] || tags['is_in:state'] || tags['is_in:country'] || '').toLowerCase()
  if (/england/.test(state)) return true
  if (/scotland|wales|cymru|northern ireland/.test(state)) return false

  if (lat == null || lon == null) return false
  // Exclude NI bbox
  if (lat >= 54.0 && lat <= 55.4 && lon >= -8.2 && lon <= -5.4) return false
  // Exclude Scotland (lat >= 54.65 typically; conservative cut at 55.0 to avoid losing Berwick area)
  if (lat >= 55.0) return false
  // Exclude Wales bbox
  if (lat >= 51.3 && lat <= 53.45 && lon >= -5.4 && lon <= -2.6) return false
  // Otherwise assume England (Britain mainland south of 55.0, east of Wales)
  return lat >= 49.9 && lat <= 55.0 && lon >= -6.5 && lon <= 1.8
}

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null
  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null
  if (lat == null || lon == null) return null
  if (!isEngland(tags, lat, lon)) return null

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
    country: 'England',
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

mkdirSync('scripts/england', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withWebsite = clubs.filter((c) => c.website).length
console.log('')
console.log('--- Summary ---')
console.log(`England-classified:  ${clubs.length}`)
console.log(`With website:        ${withWebsite}`)
console.log(`With address:        ${clubs.filter((c)=>c.address).length}`)
console.log(`Wrote: ${OUT_PATH}`)
