// Retry failed countries: Netherlands + Finland
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const SERVERS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]
const sleep = ms => new Promise(r => setTimeout(r, ms))

const COUNTRIES = [
  { name: 'Netherlands', flag: '🇳🇱', osmName: 'Netherlands', adminLevel: '2' },
  { name: 'Finland',     flag: '🇫🇮', osmName: 'Finland',     adminLevel: '2' },
]

async function fetchOSM(osmName, adminLevel) {
  const query = `[out:json][timeout:180];area["name:en"="${osmName}"]["admin_level"="${adminLevel}"]->.a;(way["leisure"="golf_course"](area.a);relation["leisure"="golf_course"](area.a););out center tags;`
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) { console.log(`    Retry ${attempt}...`); await sleep(20000) }
    for (const url of SERVERS) {
      try {
        const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `data=${encodeURIComponent(query)}`, signal: AbortSignal.timeout(180000) })
        const text = await resp.text()
        if (!text.trim().startsWith('{')) { await sleep(5000); continue }
        return JSON.parse(text).elements || []
      } catch { await sleep(5000) }
    }
  }
  return null
}

async function fetchMembers(ids) {
  if (!ids.length) return new Map()
  const query = `[out:json][timeout:60];(relation(id:${ids.join(',')}););out body;`
  for (const url of SERVERS) {
    try {
      const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: `data=${encodeURIComponent(query)}`, signal: AbortSignal.timeout(90000) })
      const text = await resp.text()
      if (!text.trim().startsWith('{')) continue
      const map = new Map()
      for (const el of JSON.parse(text).elements || []) map.set(el.id, (el.members || []).filter(m => m.type === 'way').map(m => m.ref))
      return map
    } catch { await sleep(3000) }
  }
  return new Map()
}

function parse(el, clubName, country, flag) {
  const tags = el.tags || {}
  const name = tags.name || tags['name:en'] || tags.short_name
  if (!name) return null
  const c = el.center || {}
  const holes = tags.holes ? parseInt(tags.holes, 10) : null
  const par = tags.par ? parseInt(tags.par, 10) : null
  const addr = [tags['addr:street'], tags['addr:housenumber'], tags['addr:postcode'], tags['addr:city']].filter(Boolean).join(', ') || null
  return { name: name.trim(), club: (clubName || tags.operator || name).trim(), country, flag, latitude: c.lat ?? null, longitude: c.lon ?? null, holes: isNaN(holes) || holes == null ? 18 : holes, par: isNaN(par) ? null : par, website: tags.website || tags.url || tags['contact:website'] || null, phone: tags.phone || tags['contact:phone'] || null, address: addr, is_major: false }
}

async function main() {
  const { data: existing } = await supabase.from('courses').select('name')
  const existingNames = new Set((existing || []).map(r => r.name.toLowerCase().trim()))
  console.log(`${existingNames.size} courses in DB\n`)

  for (let i = 0; i < COUNTRIES.length; i++) {
    const { name: country, flag, osmName, adminLevel } = COUNTRIES[i]
    console.log(`${flag}  ${country}`)

    const elements = await fetchOSM(osmName, adminLevel)
    if (!elements) { console.log(`  FAILED\n`); continue }

    const rels = elements.filter(e => e.type === 'relation')
    const ways = elements.filter(e => e.type === 'way')
    const wayById = new Map(ways.map(w => [w.id, w]))
    console.log(`  Fetched: ${elements.length} (${rels.length} rel, ${ways.length} way)`)

    await sleep(3000)
    const memberMap = await fetchMembers(rels.map(r => r.id))

    const processed = new Set()
    const courses = []
    for (const rel of rels) {
      const rn = rel.tags?.name || rel.tags?.['name:en']; if (!rn) continue
      const mids = memberMap.get(rel.id) || []
      const subs = mids.map(id => wayById.get(id)).filter(w => w?.tags?.name && w.tags.name !== rn)
      if (subs.length > 0) { for (const w of subs) { const c = parse(w, rn, country, flag); if (c) courses.push(c); processed.add(w.id) } }
      else { const c = parse(rel, null, country, flag); if (c) courses.push(c) }
      for (const id of mids) processed.add(id)
    }
    for (const w of ways) { if (processed.has(w.id)) continue; const c = parse(w, null, country, flag); if (c) courses.push(c) }

    const deduped = [...new Map(courses.map(c => [c.name.toLowerCase(), c])).values()]
    const newOnes = deduped.filter(c => !existingNames.has(c.name.toLowerCase().trim()))
    console.log(`  Parsed: ${deduped.length}, New: ${newOnes.length}`)

    let ins = 0
    for (let j = 0; j < newOnes.length; j += 50) {
      const batch = newOnes.slice(j, j + 50)
      const { error } = await supabase.from('courses').insert(batch)
      if (!error) ins += batch.length; else console.error(`  Batch error:`, error.message)
    }
    console.log(`  Inserted: ${ins}\n`)
    for (const c of newOnes) existingNames.add(c.name.toLowerCase().trim())
    if (i < COUNTRIES.length - 1) await sleep(15000)
  }
}
main()
