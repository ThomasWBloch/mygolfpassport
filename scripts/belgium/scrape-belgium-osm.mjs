// Scrape OSM for Belgian golf clubs via Overpass API.
// Run: node scripts/belgium/scrape-belgium-osm.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/belgium/belgium-clubs-osm.json'

const QUERY = `[out:json][timeout:60];
area["ISO3166-1"="BE"]->.be;
(node[leisure=golf_course](area.be);
 way[leisure=golf_course](area.be);
 relation[leisure=golf_course](area.be););
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
      'User-Agent': 'mygolfpassport/1.0 (belgium club scrape; thomasbloch74@gmail.com)',
      'Accept': 'application/json',
    },
    body: `data=${encodeURIComponent(QUERY)}`,
    signal: AbortSignal.timeout(120000),
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

function normalize(el) {
  const tags = el.tags || {}
  const name = (tags.name || tags['name:en'] || tags.short_name || '').trim()
  if (!name) return null

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

  return { name, lat, lon, website, address }
}

const json = await queryOverpass()
if (!json) {
  console.error('All Overpass servers failed.')
  process.exit(1)
}

const elements = json.elements || []
console.log(`Raw OSM elements: ${elements.length}`)

const clubs = []
const seen = new Set()
for (const el of elements) {
  const c = normalize(el)
  if (!c) continue
  const key = `${c.name}|${c.lat}|${c.lon}`
  if (seen.has(key)) continue
  seen.add(key)
  clubs.push(c)
}
clubs.sort((a, b) => a.name.localeCompare(b.name))

mkdirSync('scripts/belgium', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))

const withWebsite = clubs.filter((c) => c.website).length
const withAddress = clubs.filter((c) => c.address).length

console.log('')
console.log('--- Summary ---')
console.log(`Clubs found:     ${clubs.length}`)
console.log(`With website:    ${withWebsite}`)
console.log(`With address:    ${withAddress}`)
console.log(`Wrote: ${OUT_PATH}`)
