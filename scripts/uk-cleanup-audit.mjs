// UK + Ireland comprehensive cleanup audit
// Output: 4 buckets per country (reclassify / soft-delete / hide / manual)

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

// === Federation rosters ===
const FEDS = {
  England: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/england/england-eg-clubs.json','utf8')),
  Scotland: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/scotland/scotland-sg-clubs.json','utf8')),
  Wales: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/wales/wales-wg-clubs.json','utf8')),
  Ireland: JSON.parse(fs.readFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/ireland/ireland-gi-clubs.json','utf8')),
}
// Split Ireland → RoI vs NIR by BT-postcode
const irl = FEDS.Ireland
FEDS.Ireland = irl.filter(c => !/\bBT\d/i.test(c.address || ''))
FEDS['Northern Ireland'] = irl.filter(c => /\bBT\d/i.test(c.address || ''))

console.log('Federation sizes:')
for (const [k, v] of Object.entries(FEDS)) console.log(`  ${k}: ${v.length}`)

// === Helpers ===
const STOPWORDS = new Set(['golf','club','course','park','resort','centre','center','cc','gc','gk','&','and','the'])
function normalize(s) { return (s||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim() }
function tokens(s) { return normalize(s).split(' ').filter(t => t && !STOPWORDS.has(t)) }
function jaccard(a, b) {
  const A = new Set(tokens(a)); const B = new Set(tokens(b))
  if (!A.size && !B.size) return 0
  let inter = 0; for (const t of A) if (B.has(t)) inter++
  const u = A.size + B.size - inter; return u ? inter / u : 0
}
function distM(la1, lo1, la2, lo2) {
  if (la1==null||la2==null||lo1==null||lo2==null) return Infinity
  const R = 6371000, toRad = d => d * Math.PI / 180
  const dLat = toRad(la2-la1), dLng = toRad(lo2-lo1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const POSTCODE_TO_COUNTRY = {
  AB:'Scotland', DD:'Scotland', DG:'Scotland', EH:'Scotland', FK:'Scotland',
  G:'Scotland', HS:'Scotland', IV:'Scotland', KA:'Scotland', KW:'Scotland',
  KY:'Scotland', ML:'Scotland', PA:'Scotland', PH:'Scotland', TD:'Scotland', ZE:'Scotland',
  CF:'Wales', LD:'Wales', LL:'Wales', NP:'Wales', SA:'Wales',
  BT:'Northern Ireland',
}

function countryFromPostcode(address) {
  if (!address) return null
  const upper = address.toUpperCase()
  const m = upper.match(/\b([A-Z]{1,2})\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/)
  if (m) {
    const area = m[1]
    if (POSTCODE_TO_COUNTRY[area]) return POSTCODE_TO_COUNTRY[area]
    if (area === 'CH') {
      const m2 = upper.match(/\bCH(\d)/); if (m2 && '5678'.includes(m2[1])) return 'Wales'
    }
    if (area === 'SY') {
      const m2 = upper.match(/\bSY(\d{1,2})/); if (m2 && parseInt(m2[1],10) >= 15) return 'Wales'
    }
    return 'England'
  }
  if (/\b[A-Z]\d{2}\s*[A-Z][\dA-Z]{3}\b/.test(upper)) return 'Ireland'  // Eircode
  if (/\bCO\.\s*(DUBLIN|CORK|GALWAY|KERRY|LIMERICK|MAYO|WATERFORD|WEXFORD|WICKLOW|MEATH|KILKENNY|TIPPERARY|LAOIS|OFFALY|SLIGO|DONEGAL|LEITRIM|LONGFORD|ROSCOMMON|MONAGHAN|CAVAN|CARLOW|WESTMEATH|CLARE|KILDARE|LOUTH)\b/.test(upper)) return 'Ireland'
  if (/\bCO\.\s*(ANTRIM|ARMAGH|DOWN|FERMANAGH|LONDONDERRY|TYRONE)\b/.test(upper)) return 'Northern Ireland'
  return null
}

function findInFed(row) {
  // Returns { country, sim, dist } for best federation match across all UK+IE feds
  let best = null
  for (const [country, fed] of Object.entries(FEDS)) {
    for (const f of fed) {
      const sim = jaccard(row.club, f.name)
      const dist = distM(row.latitude, row.longitude, f.latitude, f.longitude)
      const isMatch = sim >= 0.7 || dist <= 1000
      if (isMatch) {
        const score = sim + (dist <= 1000 ? 0.5 : 0)
        if (!best || score > best.score) best = { country, sim, dist, score, fed_name: f.name }
      }
    }
  }
  return best
}

// === Pull all UK+IE rows ===
const COUNTRIES = ['England', 'Scotland', 'Wales', 'Ireland', 'Northern Ireland']
const rows = []
for (const c of COUNTRIES) {
  let from = 0
  while (true) {
    const { data } = await sb.from('courses').select('id,club,name,country,latitude,longitude,address,website,is_displayed').eq('country', c).range(from, from+999)
    rows.push(...data); if (data.length < 1000) break; from += 1000
  }
}
console.log(`\nLoaded ${rows.length} rows`)

// === Detect cross-country duplicates ===
// Same club name + similar coords appearing in multiple countries
const clubKey = r => normalize(r.club)
const byClubName = new Map()
for (const r of rows) {
  const k = clubKey(r)
  if (!k) continue
  if (!byClubName.has(k)) byClubName.set(k, [])
  byClubName.get(k).push(r)
}
const crossCountryDups = []
for (const [k, group] of byClubName) {
  const ctrySet = new Set(group.map(r => r.country))
  if (ctrySet.size > 1) crossCountryDups.push({ key: k, group })
}

// === Per-row decisions ===
const decisions = []
const dupGroupIds = new Set()
for (const dup of crossCountryDups) {
  for (const r of dup.group) dupGroupIds.add(r.id)
}

for (const r of rows) {
  const fromPostcode = countryFromPostcode(r.address)
  const fromFed = findInFed(r)

  let action, target_country, reason, confidence

  // Decision tree
  if (fromPostcode && fromPostcode === r.country && fromFed && fromFed.country === r.country) {
    action = 'keep'; target_country = r.country; reason = 'postcode + fed agree'; confidence = 'high'
  } else if (fromPostcode && fromPostcode !== r.country) {
    action = 'reclassify'; target_country = fromPostcode; reason = `postcode says ${fromPostcode}`; confidence = 'high'
  } else if (fromFed && fromFed.country !== r.country) {
    // Federation-match overrides current country if no contradicting postcode
    action = 'reclassify'; target_country = fromFed.country; reason = `federation match in ${fromFed.country} (sim=${fromFed.sim.toFixed(2)}, dist=${Math.round(fromFed.dist)}m)`; confidence = 'high'
  } else if (fromFed && fromFed.country === r.country) {
    action = 'keep'; target_country = r.country; reason = `federation match in ${r.country}`; confidence = 'high'
  } else if (!fromFed && !fromPostcode) {
    action = 'hide'; target_country = r.country; reason = 'no postcode, no federation match — likely defunct/private/non-fed'; confidence = 'medium'
  } else {
    action = 'manual'; target_country = r.country; reason = 'ambiguous'; confidence = 'low'
  }

  decisions.push({
    id: r.id, club: r.club, name: r.name, current_country: r.country,
    address: r.address, lat: r.latitude, lng: r.longitude,
    from_postcode: fromPostcode, from_fed: fromFed?.country || null,
    fed_sim: fromFed?.sim?.toFixed(2) || null, fed_dist_m: fromFed ? Math.round(fromFed.dist) : null,
    action, target_country, reason, confidence,
    is_cross_country_dup: dupGroupIds.has(r.id),
  })
}

// === Cross-country dup resolution ===
// Within each dup-group, mark the row whose country matches federation match as "keep",
// the others as "soft-delete" (provided keep-row has user-data parity)
for (const dup of crossCountryDups) {
  const enriched = dup.group.map(r => {
    const fed = findInFed(r)
    return { row: r, fedCountry: fed?.country || null, score: fed ? (fed.sim + (fed.dist <= 1000 ? 0.5 : 0)) : 0 }
  })
  // Best = highest fed-score AND fed.country === row.country
  const winners = enriched.filter(e => e.fedCountry && e.fedCountry === e.row.country)
  let winner = winners.length ? winners.sort((a,b) => b.score - a.score)[0] : enriched.sort((a,b) => b.score - a.score)[0]

  for (const e of enriched) {
    const dec = decisions.find(d => d.id === e.row.id)
    if (e === winner) {
      dec.action = 'keep'; dec.reason = 'cross-country dup: kept (best fed match)'
    } else {
      dec.action = 'soft-delete'; dec.target_country = winner.row.country
      dec.reason = `cross-country dup of "${winner.row.club}" in ${winner.row.country}`
    }
  }
}

// === Save ===
fs.writeFileSync(`${OUT_DIR}/cleanup-decisions.json`, JSON.stringify(decisions, null, 2))

// === Summary ===
const summary = {}
for (const d of decisions) {
  if (!summary[d.current_country]) summary[d.current_country] = { keep:0, reclassify:0, hide:0, 'soft-delete':0, manual:0, total:0 }
  summary[d.current_country][d.action]++
  summary[d.current_country].total++
}
console.log('\n=== Per-country decisions (per row) ===')
console.table(summary)

const flowMap = {}
for (const d of decisions.filter(x => x.action === 'reclassify')) {
  const k = `${d.current_country} → ${d.target_country}`
  flowMap[k] = (flowMap[k] || 0) + 1
}
console.log('\n=== Reclassify flow ===')
Object.entries(flowMap).sort((a,b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${k.padEnd(40)} ${v}`))

console.log(`\nCross-country duplicate groups: ${crossCountryDups.length}`)
