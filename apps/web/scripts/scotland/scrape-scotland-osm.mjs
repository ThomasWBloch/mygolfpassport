// Scrape OSM for Scottish golf clubs via Overpass API.
// Strategy: query all GB area, then filter to Scotland by addr tags + bbox.
// Scotland approximate bbox: lat 54.6 to 60.9, lon -8.7 to -0.7
// (NI is ISO=GB-NIR, England is GB-ENG; Scotland is GB-SCT)
//
// Run: node scripts/scotland/scrape-scotland-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/scotland/scotland-clubs-osm.json'

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
      'User-Agent': 'mygolfpassport/1.0 (scotland scrape; thomasbloch74@gmail.com)',
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
    if (attempt < 3) {
      const wait = 15000 * attempt
      console.log(`  all servers failed — sleeping ${wait / 1000}s before next round`)
      await sleep(wait)
    }
  }
  return null
}

// Classify whether a GB result is Scotland (vs England/NI/Wales).
function isScotland(tags, lat, lon) {
  const addrCountry = (tags['addr:country'] || '').toUpperCase()
  if (addrCountry === 'GB-SCT') return true
  if (addrCountry === 'GB-NIR' || addrCountry === 'GB-ENG' || addrCountry === 'GB-WLS') return false

  const state = (tags['addr:state'] || tags['is_in:state'] || '').toLowerCase()
  if (/scotland/.test(state)) return true
  if (/england|wales|northern ireland/.test(state)) return false

  // Geographic fallback. Scotland mainland + isles ~ lat >= 54.6
  // (Berwick-upon-Tweed is ~55.77 in England; Carlisle is ~54.9 in England)
  // We use a conservative lat cutoff and exclude NI bbox.
  if (lat == null || lon == null) return false
  // NI bbox check first to avoid misclass
  const inNI = lat >= 54.0 && lat <= 55.4 && lon >= -8.2 && lon <= -5.4
  if (inNI) return false
  // Scotland mainland: roughly lat >= 54.65, lon -8.7 to -0.7
  return lat >= 54.65 && lat <= 60.9 && lon >= -8.7 && lon <= -0.7
}

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null

  const lat = el.type === 'node' ? el.lat : el.center?.lat ?? null
  const lon = el.type === 'node' ? el.lon : el.center?.lon ?? null
  if (lat == null || lon == null) return null
  if (!isScotland(tags, lat, lon)) return null

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

  return {
    osm_type: el.type,
    osm_id: el.id,
    name,
    lat,
    lon,
    website,
    address,
    phone,
    country: 'Scotland',
  }
}

const json = await queryOverpass()
if (!json) {
  console.error('All Overpass servers failed.')
  process.exit(1)
}

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

mkdirSync('scripts/scotland', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withWebsite = clubs.filter((c) => c.website).length
const withAddress = clubs.filter((c) => c.address).length
const withPhone = clubs.filter((c) => c.phone).length

console.log('')
console.log('--- Summary ---')
console.log(`Raw GB elements:      ${elements.length}`)
console.log(`Scotland-classified:  ${clubs.length}`)
console.log(`With website:         ${withWebsite}`)
console.log(`With address:         ${withAddress}`)
console.log(`With phone:           ${withPhone}`)
console.log(`Wrote: ${OUT_PATH}`)
