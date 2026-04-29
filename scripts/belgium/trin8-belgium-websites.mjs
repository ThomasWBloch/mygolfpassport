// Trin 8 (BE): backfill website på Belgium courses fra OSM-data via match-result.
// Conservative: kun NULL/'' rækker overskrives.
// Dry-run by default. --live for at skrive.
// Run: node --env-file=.env.local scripts/belgium/trin8-belgium-websites.mjs [--live]

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OSM_PATH = 'scripts/belgium/belgium-clubs-osm.json'
const MATCH_PATH = 'scripts/belgium/match-result-belgium.json'
const LIVE = process.argv.includes('--live')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function normalizeWeb(web) {
  if (!web || !String(web).trim()) return ''
  const w = String(web).trim()
  if (/^https?:\/\//i.test(w)) return w
  return `https://${w}`
}

const osmClubs = JSON.parse(readFileSync(OSM_PATH, 'utf8'))
const matchData = JSON.parse(readFileSync(MATCH_PATH, 'utf8'))
const exactEntries = matchData.exact || []
const fuzzyEntries = matchData.fuzzy || []

// 1. OSM name → website. If multiple entries share a name, prefer one with a website.
const osmByName = new Map()
for (const o of osmClubs) {
  const web = normalizeWeb(o.website)
  const cur = osmByName.get(o.name)
  if (!cur || (!cur.web && web)) osmByName.set(o.name, { web })
}

// 2. row_id → { web, source, osm_name, db_club }. Exact beats fuzzy.
const planByRow = new Map()
function consider(entry, source) {
  const meta = osmByName.get(entry.osm_name)
  if (!meta || !meta.web) return
  for (const id of entry.row_ids) {
    const cur = planByRow.get(id)
    if (!cur) {
      planByRow.set(id, { web: meta.web, source, osm_name: entry.osm_name, db_club: entry.db_club })
    } else if (cur.source === 'fuzzy' && source === 'exact') {
      planByRow.set(id, { web: meta.web, source, osm_name: entry.osm_name, db_club: entry.db_club })
    }
  }
}
for (const e of exactEntries) consider(e, 'exact')
for (const e of fuzzyEntries) consider(e, 'fuzzy')

console.log(`OSM clubs:           ${osmClubs.length}`)
console.log(`OSM with website:    ${[...osmByName.values()].filter((v) => v.web).length}`)
console.log(`Exact entries:       ${exactEntries.length}`)
console.log(`Fuzzy entries:       ${fuzzyEntries.length}`)
console.log(`Candidate row_ids:   ${planByRow.size}`)
console.log(`Mode:                ${LIVE ? 'LIVE' : 'DRY-RUN'}`)
console.log('')

// 3. Fetch current DB state for candidate ids (chunked)
const ids = [...planByRow.keys()]
const dbById = new Map()
for (let i = 0; i < ids.length; i += 200) {
  const chunk = ids.slice(i, i + 200)
  const { data, error } = await supabase
    .from('courses')
    .select('id, club, name, website')
    .in('id', chunk)
  if (error) { console.error('fetch error:', error); process.exit(1) }
  for (const r of data) dbById.set(r.id, r)
}

let updated = 0
let skipped = 0
let attempted = 0

for (const [id, p] of planByRow) {
  const cur = dbById.get(id)
  if (!cur) { skipped++; continue }
  if (cur.website != null && cur.website !== '') { skipped++; continue }

  attempted++
  const tag = p.source === 'fuzzy' ? '[fuzzy]' : '[exact]'
  console.log(`${LIVE ? '[UPDATE]' : '[PLAN]  '} ${id}  ${tag}  (${cur.club} / ${cur.name})  website=${JSON.stringify(p.web)}  src="${p.osm_name}"`)

  if (LIVE) {
    const { error } = await supabase.from('courses').update({ website: p.web }).eq('id', id)
    if (error) { console.error(`  ! error: ${error.message}`); continue }
    updated++
  }
}

console.log('')
console.log('--- Summary ---')
if (LIVE) {
  console.log(`Rows updated:        ${updated}`)
} else {
  console.log(`Rows planned:        ${attempted}`)
}
console.log(`Rows skipped:        ${skipped}  (already had website / not fetched)`)
const exactCount = [...planByRow.values()].filter((v) => v.source === 'exact').length
const fuzzyCount = planByRow.size - exactCount
console.log(`Source breakdown:    ${exactCount} exact, ${fuzzyCount} fuzzy`)
if (!LIVE) console.log('\n(dry-run — re-run with --live to write)')
