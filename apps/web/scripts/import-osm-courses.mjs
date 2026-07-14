// My Golf Passport — OSM Golf Course Importer (Multi-country)
// Run with: node --env-file=.env.local scripts/import-osm-courses.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const OVERPASS_SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

// ── Countries to import ───────────────────────────────────────────────────
// admin_level: 2 = sovereign states, 4 = constituent countries (Scotland, Wales, England)
const COUNTRIES = [
  { name: 'Sweden',      flag: '🇸🇪', osmName: 'Sweden',      adminLevel: '2' },
  { name: 'Scotland',    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', osmName: 'Scotland',    adminLevel: '4' },
  { name: 'Ireland',     flag: '🇮🇪', osmName: 'Ireland',     adminLevel: '2' },
  { name: 'Wales',       flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', osmName: 'Wales',       adminLevel: '4' },
  { name: 'England',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', osmName: 'England',     adminLevel: '4' },
  { name: 'France',      flag: '🇫🇷', osmName: 'France',      adminLevel: '2' },
  { name: 'Germany',     flag: '🇩🇪', osmName: 'Germany',     adminLevel: '2' },
  { name: 'Netherlands', flag: '🇳🇱', osmName: 'Netherlands', adminLevel: '2' },
  { name: 'Norway',      flag: '🇳🇴', osmName: 'Norway',      adminLevel: '2' },
  { name: 'Finland',     flag: '🇫🇮', osmName: 'Finland',     adminLevel: '2' },
]

// ── Overpass fetch helpers ─────────────────────────────────────────────────

async function fetchFromOSM(osmName, adminLevel) {
  const query = `
[out:json][timeout:180];
area["name:en"="${osmName}"]["admin_level"="${adminLevel}"]->.a;
(
  way["leisure"="golf_course"](area.a);
  relation["leisure"="golf_course"](area.a);
);
out center tags;
`
  for (let attempt = 0; attempt < 2; attempt++) {
    if (attempt > 0) await sleep(15000)
    for (const url of OVERPASS_SERVERS) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `data=${encodeURIComponent(query)}`,
          signal: AbortSignal.timeout(180000),
        })
        const text = await resp.text()
        if (!text.trim().startsWith('{')) {
          await sleep(3000)
          continue
        }
        const data = JSON.parse(text)
        return data.elements || []
      } catch {
        await sleep(3000)
      }
    }
  }
  return null // all servers failed
}

async function fetchRelationMembers(relationIds) {
  if (relationIds.length === 0) return new Map()

  const idList = relationIds.join(',')
  const query = `
[out:json][timeout:60];
(relation(id:${idList}););
out body;
`
  for (const url of OVERPASS_SERVERS) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
        signal: AbortSignal.timeout(90000),
      })
      const text = await resp.text()
      if (!text.trim().startsWith('{')) continue
      const data = JSON.parse(text)

      const memberMap = new Map()
      for (const el of data.elements || []) {
        const wayMembers = (el.members || [])
          .filter(m => m.type === 'way')
          .map(m => m.ref)
        memberMap.set(el.id, wayMembers)
      }
      return memberMap
    } catch {
      await sleep(3000)
    }
  }
  return new Map()
}

// ── Parse a single OSM element into a course row ──────────────────────────

function parseCourse(el, clubName, country, flag) {
  const tags = el.tags || {}
  const name = tags.name || tags['name:en'] || tags.short_name
  if (!name) return null

  const center = el.center || {}
  const holes = tags.holes ? parseInt(tags.holes, 10) : null

  const addrParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'],
  ]
  const address = addrParts.filter(Boolean).join(', ') || null

  return {
    name: name.trim(),
    club: (clubName || tags.operator || name).trim(),
    country,
    flag,
    latitude: center.lat ?? null,
    longitude: center.lon ?? null,
    holes: isNaN(holes) || holes == null ? 18 : holes,
    par: tags.par ? (isNaN(parseInt(tags.par, 10)) ? null : parseInt(tags.par, 10)) : null,
    website: tags.website || tags.url || tags['contact:website'] || null,
    phone: tags.phone || tags['contact:phone'] || null,
    address,
    is_major: false,
  }
}

// ── Process one country ───────────────────────────────────────────────────

async function processCountry(countryDef, existingNames) {
  const { name: country, flag, osmName, adminLevel } = countryDef

  console.log(`\n${'═'.repeat(60)}`)
  console.log(`${flag}  ${country}`)
  console.log('═'.repeat(60))

  // 1. Fetch from OSM
  const elements = await fetchFromOSM(osmName, adminLevel)
  if (elements === null) {
    console.log(`  ✗ All Overpass servers failed — skipping ${country}`)
    return { country, flag, fetched: 0, parsed: 0, inserted: 0, skipped: 0, failed: true }
  }

  const relations = elements.filter(el => el.type === 'relation')
  const ways = elements.filter(el => el.type === 'way')
  const wayById = new Map(ways.map(w => [w.id, w]))

  console.log(`  Fetched: ${elements.length} elements (${relations.length} relations, ${ways.length} ways)`)

  // 2. Fetch relation members for club/course hierarchy
  await sleep(2000)
  const memberMap = await fetchRelationMembers(relations.map(r => r.id))

  // 3. Build courses list
  const processedWayIds = new Set()
  const courses = []

  for (const rel of relations) {
    const relName = rel.tags?.name || rel.tags?.['name:en']
    if (!relName) continue

    const memberWayIds = memberMap.get(rel.id) || []
    const namedSubCourses = memberWayIds
      .map(id => wayById.get(id))
      .filter(w => w && w.tags?.name && w.tags.name !== relName)

    if (namedSubCourses.length > 0) {
      for (const way of namedSubCourses) {
        const course = parseCourse(way, relName, country, flag)
        if (course) courses.push(course)
        processedWayIds.add(way.id)
      }
    } else {
      const course = parseCourse(rel, null, country, flag)
      if (course) courses.push(course)
    }

    for (const id of memberWayIds) processedWayIds.add(id)
  }

  for (const way of ways) {
    if (processedWayIds.has(way.id)) continue
    const course = parseCourse(way, null, country, flag)
    if (course) courses.push(course)
  }

  // 4. Dedup by name
  const deduped = [...new Map(courses.map(c => [c.name.toLowerCase(), c])).values()]

  // 5. Filter out existing
  const newCourses = deduped.filter(c => !existingNames.has(c.name.toLowerCase().trim()))
  const skippedCount = deduped.length - newCourses.length

  console.log(`  Parsed: ${deduped.length} unique courses, ${skippedCount} already in DB`)
  console.log(`  New: ${newCourses.length} to insert`)

  if (newCourses.length === 0) {
    return { country, flag, fetched: elements.length, parsed: deduped.length, inserted: 0, skipped: skippedCount, failed: false }
  }

  // 6. Insert in batches of 50
  let inserted = 0
  for (let i = 0; i < newCourses.length; i += 50) {
    const batch = newCourses.slice(i, i + 50)
    const { error } = await supabase.from('courses').insert(batch)
    if (error) {
      console.error(`  Batch ${Math.floor(i / 50) + 1} error:`, error.message)
    } else {
      inserted += batch.length
    }
  }
  console.log(`  Inserted: ${inserted} courses`)

  // Add newly inserted names to the set so subsequent countries don't re-insert
  for (const c of newCourses) existingNames.add(c.name.toLowerCase().trim())

  return { country, flag, fetched: elements.length, parsed: deduped.length, inserted, skipped: skippedCount, failed: false }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  // Load all existing course names (across all countries) for dedup
  const { data: existing } = await supabase.from('courses').select('name')
  const existingNames = new Set((existing || []).map(r => r.name.toLowerCase().trim()))
  console.log(`${existingNames.size} courses already in database`)

  const results = []

  for (let i = 0; i < COUNTRIES.length; i++) {
    const result = await processCountry(COUNTRIES[i], existingNames)
    results.push(result)

    // Wait between countries to avoid rate limits
    if (i < COUNTRIES.length - 1) {
      console.log(`\n  ⏳ Waiting 10s before next country...`)
      await sleep(10000)
    }
  }

  // ── Summary ─────────────────────────────────────────────────────────────
  console.log(`\n\n${'═'.repeat(60)}`)
  console.log('SUMMARY')
  console.log('═'.repeat(60))
  console.log(`${'Country'.padEnd(16)} ${'Fetched'.padStart(8)} ${'Parsed'.padStart(8)} ${'Inserted'.padStart(9)} ${'Skipped'.padStart(8)} ${'Status'.padStart(8)}`)
  console.log('─'.repeat(60))

  let totalInserted = 0
  let totalSkipped = 0

  for (const r of results) {
    const status = r.failed ? 'FAILED' : 'OK'
    console.log(
      `${r.flag} ${r.country.padEnd(14)} ${String(r.fetched).padStart(8)} ${String(r.parsed).padStart(8)} ${String(r.inserted).padStart(9)} ${String(r.skipped).padStart(8)} ${status.padStart(8)}`
    )
    totalInserted += r.inserted
    totalSkipped += r.skipped
  }

  console.log('─'.repeat(60))
  console.log(`${'TOTAL'.padEnd(16)} ${''.padStart(8)} ${''.padStart(8)} ${String(totalInserted).padStart(9)} ${String(totalSkipped).padStart(8)}`)
  console.log()
}

main()
