// Clean scraped Norwegian addresses: strip footer junk, validate phones,
// reject year-like 4-digit numbers masquerading as postal codes.
// Reads: scripts/norwegian-club-addresses.json (raw)
// Writes: scripts/norwegian-club-addresses-cleaned.json + -review.json

import { readFileSync, writeFileSync } from 'fs'

const raw = JSON.parse(readFileSync('scripts/norwegian-club-addresses.json', 'utf8'))

// Norwegian footer stopwords — trim everything from here onward
const STOPWORDS = [
  'Tlf', 'Tel', 'Telefon', 'E-post', 'Epost', 'E-mail', 'Email', 'Phone', 'Fax', 'Mobil',
  'Org', 'Org\\.nr', 'Organisasjons', 'Copyright', 'info', 'Info',
  'Kontakt', 'Kontakta', 'Åpningstider', 'Åpent', 'Stengt',
  'Personvern', 'Personvernerklæring', 'Cookies', 'Informasjonskapsler',
  'Om oss', 'About', 'Velkommen', 'Velkomen', 'Velkommen til',
  'Shop', 'Nettbutikk', 'Norge', 'Noreg', 'Nytt', 'Nyheter',
  'Følg oss', 'Følg', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube',
  'Postadresse', 'Besøksadresse', 'Leveringsadresse', 'Fakturaadresse',
  'Bankkonto', 'Kontonr', 'Vipps',
  'Veibeskrivelse', 'Kart', 'Adresse',
  'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag',
  'Meny', 'Menu', 'Hjem', 'Start', 'Nyheter', 'News', 'Bestill', 'Book', 'Booking',
  'Greenfee', 'Medlem', 'Medlemskap', 'Turnering', 'Resepsjon', 'resepsjon',
  'HURTIGMENY', 'Hurtigmeny', 'SNARVEIER', 'Snarveier',
  'Made by', 'Powered by', 'Designed by', 'Laget av',
  'Kommunikasjon', 'T-bane', 'Buss', 'Parkering',
  'Del', 'Skriv ut', 'Login', 'Logg inn',
  'Telefontid', 'Kontoret', 'Nødnummer', 'Viktig',
  'Norway', 'Made', 'Logo', 'Nye', 'Siste',
  'Velkommen', 'Informasjon', 'Åpent', 'Påmelding', 'Fasiliteter',
  'Klubbhuset', 'Simulator', 'Simulatorer', 'Årsmøte', 'Årsmøter',
  'Klubbkontor', 'Sekretariat', 'Administrasjon', 'Administrasjonen',
  'Proshop', 'Pro-shop', 'Pro shop', 'Klubben', 'Generell', 'Daglig',
  'Banen', 'Bane', 'Kafe', 'Restaurant', 'Sponsor', 'Sponsorer',
]
const STOP_RE = new RegExp(`\\b(${STOPWORDS.join('|')})\\b.*$`, 'i')

// Norwegian postal codes are 4 digits (0001-9999). Reject recent years
// (2020-2029) as likely false positives from web content. Older years
// are less common in footers. Valid Norwegian postals include 2024
// (Gjerdrum), 2020 (Skedsmokorset) — unavoidable collision with recent
// years; we accept these are lost and recover manually if needed.
function isLikelyPostal(s) {
  const n = parseInt(s, 10)
  if (n < 1 || n > 9999) return false
  if (n >= 2020 && n <= 2029) return false  // recent years
  return true
}

function cleanAddress(addr) {
  if (!addr) return null
  let out = addr.replace(STOP_RE, '').replace(/[,\s]+$/, '').trim()
  out = out.replace(/\s+(Se|Vis|Les|Gå)\s+\w.*$/i, '').trim()
  out = out.replace(/\s{2,}/g, ' ').replace(/[,\s]+$/, '').trim()

  // Scan for the first valid (non-year) 4-digit postal code followed by a city word
  const matches = [...out.matchAll(/\b(\d{4})\s+([A-ZÆØÅ][a-zæøåA-ZÆØÅ]{1,})/g)]
  const valid = matches.find(m => isLikelyPostal(m[1]))
  if (!valid) return null

  const idx = valid.index + valid[1].length + 1  // after postal + space
  const head = out.slice(0, valid.index + valid[1].length)
  const rest = out.slice(idx)
  const cityTokens = rest.split(/\s+/)
  const kept = []
  for (const tok of cityTokens) {
    if (kept.length >= 3) break
    if (/^[A-ZÆØÅ]/.test(tok) || /^(i|på|ved|og)$/.test(tok)) kept.push(tok)
    else break
  }
  out = kept.length ? `${head} ${kept.join(' ')}` : head
  return out.trim() || null
}

function cleanPhone(phone) {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  // Norwegian phones are 8 digits (optionally +47 prefix = 10 digits)
  if (digits.length !== 8 && digits.length !== 10) return null
  // Reject date patterns (YYYY-MM-DD etc.)
  if (/^(19|20)\d{2}[-\s\/]/.test(phone.trim())) return null
  // Reject opening-hours pattern (0900-1500, 08.00-16.00 etc.)
  if (/^\d{4}\s*-\s*\d{4}$/.test(phone.trim())) return null
  if (/^\d{1,2}[\.:]\d{2}\s*-\s*\d{1,2}[\.:]\d{2}$/.test(phone.trim())) return null
  return phone.replace(/\s{2,}/g, ' ').trim()
}

function classify(addr) {
  if (!addr) return 'none'
  if (!/[a-zA-ZæøåÆØÅ]$/.test(addr)) return 'suspect'
  const hasStreet = /^[A-ZÆØÅ].{2,}\s\d+[A-Z]?\s*,/.test(addr) || /^[A-ZÆØÅ].{2,}\s\d+[A-Z]?\s+\d{4}/.test(addr)
  const hasPostalCity = /\d{4}\s+[A-Za-zÆØÅæøå]{2,}/.test(addr)
  if (hasStreet && hasPostalCity) return 'clean'
  if (hasPostalCity) return 'postal-only'
  return 'suspect'
}

const clean = {}
const review = {}
const dropped = []

for (const [club, r] of Object.entries(raw)) {
  const addr = cleanAddress(r.address)
  const phone = cleanPhone(r.phone)
  if (!addr) { dropped.push(club); continue }
  const quality = classify(addr)
  const entry = { address: addr, phone, source: r.source, quality }
  if (quality === 'clean') clean[club] = entry
  else review[club] = entry
}

writeFileSync('scripts/norwegian-club-addresses-cleaned.json', JSON.stringify(clean, null, 2))
writeFileSync('scripts/norwegian-club-addresses-review.json', JSON.stringify(review, null, 2))

console.log('══ CLEANUP STATS ══')
console.log(`  raw entries:            ${Object.keys(raw).length}`)
console.log(`  clean (apply-ready):    ${Object.keys(clean).length}`)
console.log(`  review (manual check):  ${Object.keys(review).length}`)
console.log(`  dropped (unusable):     ${dropped.length}`)
const phoneCount = [...Object.values(clean), ...Object.values(review)].filter(r => r.phone).length
console.log(`  with phone:             ${phoneCount}`)

console.log('\nSample clean (10):')
Object.entries(clean).sort(() => 0.5 - Math.random()).slice(0, 10).forEach(([club, r]) => {
  console.log(`  ${club}`)
  console.log(`    addr: ${r.address}`)
  console.log(`    tel:  ${r.phone || '-'}`)
})

console.log('\nSample review (5):')
Object.entries(review).slice(0, 5).forEach(([club, r]) => {
  console.log(`  [${r.quality}] ${club}`)
  console.log(`    addr: ${r.address}`)
  console.log(`    tel:  ${r.phone || '-'}`)
})
