// Count golf courses (leisure=golf_course) per country via Overpass API

const countryNames = [
  'Denmark', 'Sweden', 'Scotland', 'Ireland', 'Wales',
  'England', 'France', 'Germany', 'Netherlands', 'Norway', 'Finland',
]

const servers = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function queryServer(queryStr) {
  for (const server of servers) {
    try {
      const resp = await fetch(server, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(queryStr)}`,
        signal: AbortSignal.timeout(90000),
      })
      if (!resp.ok) {
        await sleep(3000)
        continue
      }
      const text = await resp.text()
      if (!text.startsWith('{')) continue
      return JSON.parse(text)
    } catch {
      await sleep(3000)
      continue
    }
  }
  return null
}

async function queryCountry(country) {
  const query = `[out:json][timeout:60];
area["name:en"="${country}"]["admin_level"~"^[24]$"]->.a;
(way["leisure"="golf_course"](area.a);relation["leisure"="golf_course"](area.a););
out count;`

  // Try up to 2 times per country
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await sleep(10000)
    const json = await queryServer(query)
    if (json) {
      return parseInt(json.elements?.[0]?.tags?.total ?? '0', 10)
    }
  }
  return -1
}

const results = []

for (let i = 0; i < countryNames.length; i++) {
  const country = countryNames[i]
  process.stdout.write(`[${i + 1}/${countryNames.length}] ${country}...`)

  const total = await queryCountry(country)

  if (total >= 0) {
    console.log(` ${total}`)
    results.push({ country, total })
  } else {
    console.log(' FAILED')
    results.push({ country, total: -1 })
  }

  // Wait between countries to avoid rate limits
  if (i < countryNames.length - 1) await sleep(5000)
}

console.log('\n── Golf courses per country (OSM) ──')
results
  .sort((a, b) => b.total - a.total)
  .forEach((r, i) => {
    const count = r.total === -1 ? 'ERROR' : String(r.total).padStart(5)
    console.log(`  ${String(i + 1).padStart(2)}. ${r.country.padEnd(14)} ${count}`)
  })

const totalAll = results.filter(r => r.total >= 0).reduce((s, r) => s + r.total, 0)
const failCount = results.filter(r => r.total === -1).length
console.log(`\n  Total: ${totalAll}${failCount > 0 ? ` (${failCount} failed)` : ''}`)
