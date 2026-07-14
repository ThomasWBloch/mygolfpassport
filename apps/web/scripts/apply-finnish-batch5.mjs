// Batch 5: update address, website, phone on Finnish courses from SGL (golf.fi) data.
// Only writes a field when DB is empty (address, phone) or always (website, since 0/285 have one).
// Dry-run by default; pass --apply to write.

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const sgl = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))
const sglByName = new Map(sgl.map(c => [c.name, c]))

// For clubs where DB kept a shorter brand form than SGL's registered name
// (decisions from batch 1/2), map DB name → SGL name so we can still copy data.
const ALIASES = {
  'Eke Golf':                   'Eke Golf ry',
  'Kullo Golf':                 'Kullo Golf Club',
  'Master Golf':                'Master Golf Club',
  'Pickala Golf':               'Pickala Golf Club',
  'Virpiniemi Golf':            'Virpiniemi Golf Club',
  'Golf Virrat':                'Golf-Virrat',
  'Eckerö Golf':                'Eckerö Golf/Kyrkoby GK',
  'Bjärkas Golf':               'Bjärkas Golf & Country Club',
  'Holiday Club Golf Saimaa':   'Holiday Club Golf',
  'Oulujokilaakson Golfklubi':  'Oulujokilaakson Golfklubi ry',
  'Hirvensalon Golf':           'Smart Golf Turku',
  'Jyväs-golf':                 'Jyväs-Golf',
  'Käkigolf':                   'KäkiGolf',
}

function normalizeUrl(u) {
  if (!u) return null
  let s = String(u).trim()
  if (!s) return null
  // Fix weird double-prefix like "www.https://foo.fi"
  s = s.replace(/^www\.(https?:\/\/)/i, '$1')
  // Strip leading www. if no protocol
  if (!/^https?:\/\//i.test(s) && /^www\./i.test(s)) s = s.slice(4)
  // Add https://
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s
  // Upgrade http→https
  s = s.replace(/^http:\/\//i, 'https://')
  // Strip trailing slashes
  s = s.replace(/\/+$/, '')
  return s
}

function composeAddress(c) {
  // Street may already contain postcode in parens "Lehtimäentie 2 (02770)"
  // or trailing after comma "Talin puistotie 12 , 00380"
  let street = (c.streetAddress || '').trim()
  let embeddedPost = null
  // Strip "(12345)" at end
  let m = street.match(/\s*\(\s*(\d{5})\s*\)\s*$/)
  if (m) { embeddedPost = m[1]; street = street.slice(0, m.index).trim() }
  // Strip ", 12345" at end
  m = street.match(/\s*,\s*(\d{5})\s*$/)
  if (m) { embeddedPost = embeddedPost || m[1]; street = street.slice(0, m.index).trim() }
  // Strip trailing spaces/commas
  street = street.replace(/[\s,]+$/, '').trim()
  const postCode = (c.postCode || embeddedPost || '').trim()
  const city = (c.city || '').trim()
  const parts = []
  if (street) parts.push(street)
  if (postCode || city) parts.push([postCode, city].filter(Boolean).join(' '))
  return parts.join(', ') || null
}

function normalizePhone(p) {
  if (!p) return null
  const s = String(p).replace(/[\s\-]/g, '').trim()
  return s || null
}

const apply = process.argv.includes('--apply')
console.log(apply ? 'APPLY mode\n' : 'DRY RUN (pass --apply to write)\n')

const { data: dbRows } = await supabase
  .from('courses')
  .select('id, name, club, address, website, phone, latitude, longitude')
  .eq('country', 'Finland')

let touchedCourses = 0
let updatedAddr = 0, updatedWeb = 0, updatedPhone = 0
const noMatchClubs = new Set()

// Group by club
const byClub = new Map()
for (const r of dbRows) {
  if (!byClub.has(r.club)) byClub.set(r.club, [])
  byClub.get(r.club).push(r)
}

for (const [dbName, rows] of byClub) {
  const sglName = ALIASES[dbName] || dbName
  const sglData = sglByName.get(sglName)
  if (!sglData) { noMatchClubs.add(dbName); continue }

  const newAddr = composeAddress(sglData)
  const newWeb = normalizeUrl(sglData.url)
  const newPhone = normalizePhone(sglData.phoneNumber)

  for (const row of rows) {
    const patch = {}
    if (newAddr && (!row.address || !row.address.trim())) patch.address = newAddr
    if (newWeb && (!row.website || !row.website.trim())) patch.website = newWeb
    if (newPhone && (!row.phone || !row.phone.trim())) patch.phone = newPhone

    if (Object.keys(patch).length === 0) continue
    touchedCourses++
    if (patch.address) updatedAddr++
    if (patch.website) updatedWeb++
    if (patch.phone) updatedPhone++

    if (apply) {
      const { error } = await supabase.from('courses').update(patch).eq('id', row.id)
      if (error) { console.error(`Update failed for id ${row.id}:`, error); process.exit(1) }
    }
  }
}

console.log(`Clubs with no SGL data (skipped): ${noMatchClubs.size}`)
;[...noMatchClubs].sort().forEach(n => console.log(`  "${n}"`))

console.log(`\nCourses touched: ${touchedCourses}`)
console.log(`  Addresses filled: ${updatedAddr}`)
console.log(`  Websites filled: ${updatedWeb}`)
console.log(`  Phones filled: ${updatedPhone}`)
if (!apply) console.log('\n(dry run — no changes written)')
