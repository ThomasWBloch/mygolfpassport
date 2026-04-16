// Geocode ALL courses with missing coordinates using Photon (komoot)
// Run with: node --env-file=.env.local scripts/geocode-all-missing.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function photonGeocode(query) {
  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1`
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!resp.ok) return null
    const data = await resp.json()
    const f = data.features?.[0]
    if (!f) return null
    const [lng, lat] = f.geometry.coordinates
    return { lat, lng }
  } catch {
    return null
  }
}

// Fetch all courses without coordinates
console.log('Fetching courses without coordinates...')
const courses = []
let offset = 0
while (true) {
  const { data } = await supabase
    .from('courses')
    .select('id, name, club, address, country')
    .is('latitude', null)
    .range(offset, offset + 999)
  if (!data || data.length === 0) break
  courses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

// Group by country for reporting
const byCountry = {}
for (const c of courses) {
  const co = c.country ?? 'Unknown'
  byCountry[co] = (byCountry[co] ?? 0) + 1
}

console.log(`  ${courses.length} courses missing coordinates:`)
for (const [co, count] of Object.entries(byCountry).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${co}: ${count}`)
}
console.log()

// Geocode
let geocoded = 0
let failed = 0
const stats = {} // country → { geocoded, failed }

for (let i = 0; i < courses.length; i++) {
  const c = courses[i]
  const co = c.country ?? 'Unknown'
  if (!stats[co]) stats[co] = { geocoded: 0, failed: 0 }

  process.stdout.write(`  [${i + 1}/${courses.length}] ${(c.club ?? c.name).slice(0, 40)}...`)

  const searchName = c.club ?? c.name
  let result = await photonGeocode(`${searchName} golf ${c.country}`)
  await sleep(500)

  // Fallback: address + country
  if (!result && c.address) {
    result = await photonGeocode(`${c.address} ${c.country}`)
    await sleep(500)
  }

  if (result) {
    const { error } = await supabase
      .from('courses')
      .update({ latitude: result.lat, longitude: result.lng })
      .eq('id', c.id)

    if (!error) {
      geocoded++
      stats[co].geocoded++
      console.log(` ✓ ${result.lat.toFixed(4)}, ${result.lng.toFixed(4)}`)
    } else {
      failed++
      stats[co].failed++
      console.log(` ✗ db error`)
    }
  } else {
    failed++
    stats[co].failed++
    console.log(` ✗`)
  }
}

console.log(`\n${'─'.repeat(55)}`)
console.log('Results per country:')
console.log(`${'Country'.padEnd(22)} ${'Geocoded'.padStart(9)} ${'Failed'.padStart(8)} ${'Rate'.padStart(7)}`)
console.log('─'.repeat(55))
for (const [co, s] of Object.entries(stats).sort((a, b) => (b[1].geocoded + b[1].failed) - (a[1].geocoded + a[1].failed))) {
  const total = s.geocoded + s.failed
  const rate = total > 0 ? ((s.geocoded / total) * 100).toFixed(0) + '%' : '-'
  console.log(`${co.padEnd(22)} ${String(s.geocoded).padStart(9)} ${String(s.failed).padStart(8)} ${rate.padStart(7)}`)
}
console.log('─'.repeat(55))
console.log(`${'TOTAL'.padEnd(22)} ${String(geocoded).padStart(9)} ${String(failed).padStart(8)} ${((geocoded / (geocoded + failed)) * 100).toFixed(0) + '%'.padStart(7)}`)
