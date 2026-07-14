// UK + Ireland country-misclassification audit
// For each DB row: infer correct country from postcode (in address) + coords (fallback)
// Flag mismatch and suggest reclassify target

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
fs.mkdirSync(OUT_DIR, { recursive: true })

// UK postcode area → country
// Source: Royal Mail / standard UK postal geography
const POSTCODE_TO_COUNTRY = {
  // Scotland
  AB:'Scotland', DD:'Scotland', DG:'Scotland', EH:'Scotland', FK:'Scotland',
  G:'Scotland', HS:'Scotland', IV:'Scotland', KA:'Scotland', KW:'Scotland',
  KY:'Scotland', ML:'Scotland', PA:'Scotland', PH:'Scotland', TD:'Scotland',
  ZE:'Scotland',
  // Wales (CH ALSO touches Wales — use Wales for CH5/CH6/CH7/CH8 only)
  CF:'Wales', LD:'Wales', LL:'Wales', NP:'Wales', SA:'Wales',
  // Northern Ireland
  BT:'Northern Ireland',
  // SY = shared (Shropshire & mid-Wales) — defer to coords
  // CH = mostly England (Cheshire) but CH5-8 are Wales (Flintshire)
}

function getCountryFromAddress(address) {
  if (!address) return null
  // UK postcode regex: 1-2 letters + 1-2 digits + optional letter + space + digit + 2 letters
  const upper = address.toUpperCase()
  // Match "XX9 9XX" or "X9 9XX" patterns
  const m = upper.match(/\b([A-Z]{1,2})\d{1,2}[A-Z]?\s*\d[A-Z]{2}\b/)
  if (m) {
    const area = m[1]
    if (POSTCODE_TO_COUNTRY[area]) return POSTCODE_TO_COUNTRY[area]
    // CH special
    if (area === 'CH') {
      const m2 = upper.match(/\bCH(\d)/)
      if (m2 && ['5','6','7','8'].includes(m2[1])) return 'Wales'
    }
    // SY special: mid-Wales SY15-25 vs Shropshire SY1-14
    if (area === 'SY') {
      const m2 = upper.match(/\bSY(\d{1,2})/)
      if (m2 && parseInt(m2[1], 10) >= 15) return 'Wales'
    }
    // Default for any other UK postcode = England
    return 'England'
  }
  // Eircode pattern (Ireland) — letter+digit+digit + space + letter+digit+letter+letter
  if (/\b[A-Z]\d{2}\s*[A-Z][\dA-Z]{3}\b/.test(upper)) return 'Ireland'
  // Co. xxx Irish indicator
  if (/\bCO\.\s*(DUBLIN|CORK|GALWAY|KERRY|LIMERICK|MAYO|WATERFORD|WEXFORD|WICKLOW|MEATH|KILKENNY|TIPPERARY|LAOIS|OFFALY|SLIGO|DONEGAL|LEITRIM|LONGFORD|ROSCOMMON|MONAGHAN|CAVAN|CARLOW|WESTMEATH|CLARE|KILDARE|LOUTH)\b/.test(upper)) return 'Ireland'
  // NIR Co. names
  if (/\bCO\.\s*(ANTRIM|ARMAGH|DOWN|FERMANAGH|LONDONDERRY|TYRONE)\b/.test(upper)) return 'Northern Ireland'
  return null
}

// Coordinate-based fallback (rough bounding boxes)
function getCountryFromCoords(lat, lng) {
  if (lat == null || lng == null) return null
  // Northern Ireland: 54.0-55.4, -8.2 to -5.4
  if (lat >= 54.0 && lat <= 55.4 && lng >= -8.2 && lng <= -5.4) return 'Northern Ireland'
  // Ireland (RoI): 51.4-55.4, -10.6 to -5.4 (excluding NIR box above)
  if (lat >= 51.4 && lat <= 55.4 && lng >= -10.6 && lng <= -5.4) return 'Ireland'
  // Scotland: 54.6-60.9, -8.6 to -0.7
  if (lat >= 54.6 && lat <= 60.9 && lng >= -8.6 && lng <= -0.7) return 'Scotland'
  // Wales: 51.3-53.5, -5.5 to -2.65
  if (lat >= 51.3 && lat <= 53.5 && lng >= -5.5 && lng <= -2.65) return 'Wales'
  // England: 49.9-55.8, -6.5 to 1.8 (rough)
  if (lat >= 49.9 && lat <= 55.8 && lng >= -6.5 && lng <= 1.8) return 'England'
  return null
}

const COUNTRIES = ['England', 'Scotland', 'Wales', 'Ireland', 'Northern Ireland']

async function fetchAll() {
  const all = []
  for (const c of COUNTRIES) {
    let from = 0
    while (true) {
      const { data } = await sb.from('courses')
        .select('id,club,name,country,latitude,longitude,address,website')
        .eq('country', c)
        .range(from, from + 999)
      all.push(...data)
      if (data.length < 1000) break
      from += 1000
    }
  }
  return all
}

const rows = await fetchAll()
console.log(`Loaded ${rows.length} rows from 5 UK/IE countries`)

const audit = []
for (const r of rows) {
  const fromAddr = getCountryFromAddress(r.address)
  const fromCoords = getCountryFromCoords(r.latitude, r.longitude)
  // Trust postcode first, coords second
  const inferred = fromAddr || fromCoords
  const status = !inferred ? 'unknown' : (inferred === r.country ? 'ok' : 'mismatch')
  audit.push({
    id: r.id, club: r.club, name: r.name,
    current_country: r.country,
    inferred_country: inferred,
    status,
    inferred_via: fromAddr ? 'postcode' : (fromCoords ? 'coords' : null),
    address: r.address, lat: r.latitude, lng: r.longitude,
  })
}

// Summary
const byCurrent = {}
for (const a of audit) {
  if (!byCurrent[a.current_country]) byCurrent[a.current_country] = { ok: 0, mismatch: 0, unknown: 0, total: 0 }
  byCurrent[a.current_country][a.status]++
  byCurrent[a.current_country].total++
}

console.log('\n=== Per-country misclassification status (per row, not per club) ===')
console.table(byCurrent)

// Distinct-club summary (clubs may have multiple rows that all share country)
const clubMap = new Map()
for (const a of audit) {
  const k = `${a.current_country}::${a.club}`
  if (!clubMap.has(k)) {
    clubMap.set(k, { current: a.current_country, club: a.club, statuses: new Set(), inferred: new Set() })
  }
  const x = clubMap.get(k)
  x.statuses.add(a.status)
  if (a.inferred_country) x.inferred.add(a.inferred_country)
}
const clubAudit = [...clubMap.values()].map(x => ({
  current: x.current,
  club: x.club,
  status: x.statuses.has('mismatch') ? 'mismatch' : (x.statuses.has('ok') ? 'ok' : 'unknown'),
  inferred: [...x.inferred].join('/') || null,
}))

const clubByCurrent = {}
for (const c of clubAudit) {
  if (!clubByCurrent[c.current]) clubByCurrent[c.current] = { ok: 0, mismatch: 0, unknown: 0, total: 0 }
  clubByCurrent[c.current][c.status]++
  clubByCurrent[c.current].total++
}
console.log('\n=== Per-country (distinct clubs) ===')
console.table(clubByCurrent)

// Mismatch breakdown: where do mismatched clubs really belong?
const mismatched = clubAudit.filter(c => c.status === 'mismatch')
console.log(`\nMismatched clubs: ${mismatched.length}`)
const flow = {}
for (const m of mismatched) {
  const key = `${m.current} → ${m.inferred}`
  flow[key] = (flow[key] || 0) + 1
}
console.log('\n=== Reclassify flow (current → inferred) ===')
const flowSorted = Object.entries(flow).sort((a,b) => b[1] - a[1])
flowSorted.forEach(([k, v]) => console.log(`  ${k.padEnd(45)} ${v}`))

fs.writeFileSync(`${OUT_DIR}/misclassification-audit.json`, JSON.stringify(audit, null, 2))
fs.writeFileSync(`${OUT_DIR}/misclassification-clubs.json`, JSON.stringify(clubAudit, null, 2))
fs.writeFileSync(`${OUT_DIR}/misclassification-summary.json`, JSON.stringify({ byCurrent, clubByCurrent, flow }, null, 2))

console.log(`\nSaved: ${OUT_DIR}/misclassification-{audit,clubs,summary}.json`)
