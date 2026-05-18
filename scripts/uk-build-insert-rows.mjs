// Build INSERT-ready rows for Wales + Scotland coverage-pass
// Source: missing-{wal,sco}.json with category 'Real'
// 1 row per club (default), shared-domain dup-check vs DB

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const AUDIT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
const COUNTRIES = [['WAL','Wales'], ['SCO','Scotland']]

function getDomain(url) {
  if (!url) return null
  return (url.toLowerCase().match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

async function fetchDbDomains(country) {
  const all = []; let from = 0
  while (true) {
    const { data } = await sb.from('courses').select('club,website').eq('country', country).range(from, from+999)
    all.push(...data); if (data.length < 1000) break; from += 1000
  }
  return new Map(all.filter(r => r.website).map(r => [getDomain(r.website), r.club]))
}

const allRows = []
const skipped = []

for (const [iso, country] of COUNTRIES) {
  const missing = JSON.parse(fs.readFileSync(`${AUDIT_DIR}/missing-${iso.toLowerCase()}.json`,'utf8'))
  const real = missing.filter(m => m._cat === 'Real')
  const dbDomains = await fetchDbDomains(country)
  console.log(`\n${iso}: ${real.length} real, DB has ${dbDomains.size} unique domains`)

  for (const m of real) {
    // Shared-domain dup-check
    const dom = getDomain(m.website)
    if (dom && dom !== 'facebook.com' && dbDomains.has(dom)) {
      skipped.push({ iso, club: m.fed_name, reason: `domain ${dom} already in DB (${dbDomains.get(dom)})` })
      continue
    }
    allRows.push({
      country,
      club: m.fed_name,
      name: m.fed_name,  // Default name = club name (no separate course name from federation)
      latitude: m.lat,
      longitude: m.lng,
      website: m.website || null,
      phone: m.phone || null,
      email: m.email || null,
      address: m.address || null,
      holes: 18,  // Default; UK federations don't expose holes
      par: null,
      is_displayed: true,
      is_combo: false,
    })
  }
}

fs.writeFileSync(`${AUDIT_DIR}/uk-pass2b-rows.json`, JSON.stringify(allRows, null, 2))
fs.writeFileSync(`${AUDIT_DIR}/uk-pass2b-skipped.json`, JSON.stringify(skipped, null, 2))

const byC = {}
allRows.forEach(r => byC[r.country] = (byC[r.country]||0)+1)
console.log('\n=== Final INSERT batch ===')
Object.entries(byC).forEach(([c,n]) => console.log('  ' + c + ': ' + n))
console.log('TOTAL ROWS:', allRows.length)
console.log('Skipped (domain dup):', skipped.length)
if (skipped.length) {
  console.log('\nSkipped:')
  skipped.forEach(s => console.log('  ' + s.iso + ' | ' + s.club + ' | ' + s.reason))
}

console.log('\n=== Sample (first 8) ===')
allRows.slice(0, 8).forEach((r,i) => {
  const flags = [r.website?'W':'-', r.phone?'P':'-', r.email?'E':'-', r.address?'A':'-'].join('')
  console.log('  ' + String(i+1).padStart(2) + '. [' + r.country.slice(0,3) + '] ' + r.club.padEnd(40) + ' | ' + flags + ' | ' + (r.address||'').slice(0,40))
})
