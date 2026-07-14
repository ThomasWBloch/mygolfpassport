// Quality audit on all rows created today
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/audit-2026-05-12'
fs.mkdirSync(OUT_DIR, { recursive: true })

// Get today's INSERTs
const todays = []
let from = 0
while (true) {
  const { data } = await sb.from('courses')
    .select('id,country,club,name,latitude,longitude,address,website,phone,email,is_displayed')
    .gte('created_at', '2026-05-12T00:00:00')
    .lt('created_at', '2026-05-13T00:00:00')
    .range(from, from+999)
  todays.push(...data)
  if (data.length < 1000) break; from += 1000
}
console.log(`Today's INSERTs: ${todays.length}`)

// Get all visible existing rows for dup-check
const visible = []
from = 0
while (true) {
  const { data } = await sb.from('courses').select('id,country,club,latitude,longitude,address,website')
    .lt('created_at', '2026-05-12T00:00:00').eq('is_displayed', true).range(from, from+999)
  visible.push(...data); if (data.length < 1000) break; from += 1000
}
console.log(`Pre-existing visible: ${visible.length}`)

function getDomain(url) {
  if (!url) return null
  let u = url.toLowerCase(); if (!u.startsWith('http')) u = 'http://' + u
  return (u.match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}

// Build domain index of pre-existing visible
const visByDomain = new Map()
for (const v of visible) {
  const d = getDomain(v.website)
  if (d && d !== 'facebook.com' && !visByDomain.has(d)) visByDomain.set(d, v)
}

// Affiliate/admin patterns (multilingual)
const AFFILIATE_PATTERNS = [
  /\bförderverein\b/i, /\bf[oö]rderverein\b/i,
  /\bspor kul[üu]b[üu]\b/i, /\b[ıi]htisas\b/i, /\bderne[ğg]i\b/i,  // Turkish
  /\bbusiness golf\b/i, /\bcorporate\b/i, /\bcompany day\b/i,
  /\bverband\b/i, /\bassociation\b/i, /\basocia[cç][iao][ón]\b/i,
  /\bsenior(s)? (golfer|golf)/i, /\b(ladies|veterans|juniors?) (golf )?(club|association)\b/i,
  /\b(test[- ]golf|test club|test cr )/i,
  /\bdriving range\b/i, /\bindoor\b/i, /\bsimulator\b/i, /\bacademy\b/i, /\btopgolf\b/i,
  /\bpitch ?& ?putt\b/i, /\bpitchputt\b/i,
  /\bclub champion\b/i,  // clubfitter
  /\bgolfens gr[oö]na kort\b/i,  // SE: golf membership card
  /\b(estl[äa]ndska|lett[äa]ndska|litauiska) klubbar\b/i,  // SE: Baltic clubs (umbrella)
  /\bidrottsh[oö]gskolan\b/i,  // sports school
  /\bgdf\b/i,  // golf district fed
  /\bgolfreviewr?\b/i,
  /\bf?[oö]derverein\b/i,
  /\bsm[- ]veckan\b/i,  // SE championship event
  /\bteam[- ]trophy\b/i,
  /\bfiber network\b/i,  // joke entry
  /\bplay for life\b/i,  // charity
]
const RANGE_PATTERNS = [
  /^golf range$/i, /^golf complex$/i, /^golf hub$/i,
  /\b(activity|leisure) (centre|center)\b/i,
  /\binstagolf\b/i,
]

function categorize(r) {
  const name = (r.club || '').toLowerCase()
  const reasons = []
  // Pattern checks
  for (const p of AFFILIATE_PATTERNS) {
    if (p.test(name)) { reasons.push('affiliate-pattern'); break }
  }
  for (const p of RANGE_PATTERNS) {
    if (p.test(name)) { reasons.push('range/sim'); break }
  }
  // Generic short city-only club name (e.g., "GK Maribor", "Almelo", "AMVJ") - hard to verify
  const tokens = name.replace(/[^a-zÀ-ſ0-9 ]/gi, ' ').split(/\s+/).filter(Boolean)
  if (tokens.length === 2 && /^(gk|gc|cc|gcc)$/i.test(tokens[0])) reasons.push('short-name')

  // Data completeness
  const hasWeb = !!r.website
  const hasCoord = r.latitude != null
  const hasAddr = !!r.address
  const hasPhone = !!r.phone
  const completeness = [hasWeb, hasCoord, hasAddr, hasPhone].filter(Boolean).length
  if (completeness === 0) reasons.push('no-data')
  if (completeness === 1) reasons.push('thin-data')

  // Domain collision with pre-existing visible
  const dom = getDomain(r.website)
  let dupClub = null
  if (dom && visByDomain.has(dom)) {
    const collide = visByDomain.get(dom)
    if (collide.country === r.country) { reasons.push('domain-dup'); dupClub = collide.club }
  }

  // Risk tier
  let risk = 'OK'
  if (reasons.includes('affiliate-pattern') || reasons.includes('domain-dup') || reasons.includes('no-data')) risk = 'HIGH'
  else if (reasons.includes('thin-data') || reasons.includes('range/sim') || reasons.includes('short-name')) risk = 'MEDIUM'

  return { risk, reasons, dupClub }
}

const audited = todays.map(r => {
  const { risk, reasons, dupClub } = categorize(r)
  return { ...r, _risk: risk, _reasons: reasons, _dupClub: dupClub }
})

// Per-country breakdown
const perC = {}
for (const r of audited) {
  if (!perC[r.country]) perC[r.country] = { OK:0, MEDIUM:0, HIGH:0, total:0 }
  perC[r.country][r._risk]++
  perC[r.country].total++
}
console.log('\n=== Per-country risk breakdown ===')
console.table(perC)

// Top reason counts
const reasonCount = {}
for (const r of audited) for (const reason of r._reasons) reasonCount[reason] = (reasonCount[reason]||0)+1
console.log('\n=== Top issue reasons ===')
Object.entries(reasonCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k.padEnd(22)} ${v}`))

// HIGH risk samples
console.log('\n=== HIGH risk samples (first 25) ===')
audited.filter(r => r._risk === 'HIGH').slice(0,25).forEach(r => {
  console.log(`  ${r.country.slice(0,4).padEnd(4)} | "${r.club.slice(0,40).padEnd(40)}" | reasons: ${r._reasons.join(',')}` + (r._dupClub ? ` | dup: "${r._dupClub}"` : ''))
})

fs.writeFileSync(`${OUT_DIR}/audit-results.json`, JSON.stringify(audited, null, 2))
fs.writeFileSync(`${OUT_DIR}/per-country.json`, JSON.stringify(perC, null, 2))
