// Clean scraped Swedish addresses: strip footer junk tokens, validate phones.
// Reads: scripts/swedish-club-addresses.json (raw)
// Writes: scripts/swedish-club-addresses-cleaned.json
// No DB writes.

import { readFileSync, writeFileSync } from 'fs'

const raw = JSON.parse(readFileSync('scripts/swedish-club-addresses.json', 'utf8'))

// Tokens that leak from footer into address — trim everything from these onward
const STOPWORDS = [
  'Tel', 'Telefon', 'Telefonnr', 'E-post', 'E-mail', 'Email', 'Phone', 'Fax', 'Mobil',
  'Org', 'Org\\.', 'Organisations', 'Copyright', 'info', 'Info',
  'Kontakta oss', 'Kontakt', 'Öppettider', 'Öppnar', 'Klubbstugan',
  'Integritetspolicy', 'Privacy', 'Cookies', 'Om oss', 'About',
  'Vi öppnar', 'Öppet', 'Stängt', 'Shop', 'Webbshop', 'Sverige', 'Lantlig',
  'Följ oss', 'Facebook', 'Instagram', 'LinkedIn', 'Youtube',
  'Postadress', 'Besöksadress', 'Leveransadress', 'Fakturaadress',
  'Bankgiro', 'Plusgiro', 'Swish', 'Org\\.nr', 'Momsreg',
  'Hitta hit', 'Vägbeskrivning', 'Karta',
  'Se öppettider', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag',
  'Meny', 'Menu', 'Hem', 'Start', 'Nyheter', 'News', 'Boka', 'Book',
  'Greenfee', 'Medlem', 'Medlemsskap', 'Tävling', 'reception', 'Reception',
  'SNABBLÄNKAR', 'SNABBKONTAKT', 'Snabbkontakt', 'Snabblänkar',
  'Made by', 'Powered by', 'Designed by', 'Skapad av',
  'Kommunikationer', 'T-bana', 'Buss', 'Parkering',
  'Följ', 'Dela', 'Skriv ut', 'Login', 'Logga in',
  'Telefontider', 'Kansli', 'Nödsamtal', 'Nödnummer',
  'Sweden', 'Made', 'Logo', 'Höga', 'Nya', 'Senaste',
  'Välkommen', 'Välkomna', 'Information', 'Arbetstider',
]
const STOP_RE = new RegExp(`\\b(${STOPWORDS.join('|')})\\b.*$`, 'i')

function cleanAddress(addr) {
  if (!addr) return null
  let out = addr.replace(STOP_RE, '').replace(/[,\s]+$/, '').trim()
  out = out.replace(/\s+[A-ZÅÄÖ]{3,}\b.*$/, '').trim()
  out = out.replace(/\s+(Se|Visa|Läs|Gå)\s+\w.*$/i, '').trim()
  out = out.replace(/\s{2,}/g, ' ').replace(/[,\s]+$/, '').trim()
  if (!/\d{3}\s?\d{2}/.test(out)) return null

  // Final pass: truncate after postal code + up to 3 city words (Swedish
  // cities are 1–3 words). Stop at any lowercase word that looks non-geographic.
  const m = out.match(/^(.*?\d{3}\s?\d{2})\s+(.+)$/)
  if (m) {
    const head = m[1]
    const cityTokens = m[2].split(/\s+/)
    const kept = []
    for (const tok of cityTokens) {
      if (kept.length >= 3) break
      // Accept if: starts with capital, or is all-caps, or is a common small connector
      if (/^[A-ZÅÄÖ]/.test(tok) || /^(i|på|vid|och)$/.test(tok)) {
        kept.push(tok)
      } else break
    }
    if (kept.length) out = `${head} ${kept.join(' ')}`
    else out = head
  }
  return out || null
}

// Classify quality: 'clean' (street + postal + city), 'postal-only', 'suspect'
function classify(addr) {
  if (!addr) return 'none'
  // Must end in a word character (city) or proper char
  if (!/[a-zA-ZåäöÅÄÖ]$/.test(addr)) return 'suspect'
  const hasStreet = /^[A-ZÅÄÖ].{2,}\s\d+[A-Z]?\s*,/.test(addr) || /^[A-ZÅÄÖ].{2,}\s\d+[A-Z]?\s+\d{3}/.test(addr)
  const hasPostalCity = /\d{3}\s?\d{2}\s+[A-Za-zÅÄÖåäö]{2,}/.test(addr)
  if (hasStreet && hasPostalCity) return 'clean'
  if (hasPostalCity) return 'postal-only'
  return 'suspect'
}

function cleanPhone(phone) {
  if (!phone) return null
  const digits = phone.replace(/\D/g, '')
  // Too short to be a real Swedish phone number
  if (digits.length < 7) return null
  // Looks like a date (YYYY-MM-DD or similar)
  if (/^(19|20)\d{2}[-\s]?\d{2}[-\s]?\d{2}/.test(phone.trim())) return null
  // Year-like starts ("2026-...") — suspect
  if (/^(19|20)\d{2}/.test(phone.trim())) return null
  return phone.replace(/\s{2,}/g, ' ').trim()
}

const clean = {}    // address good, safe to apply
const review = {}   // address suspect or postal-only, needs eyeballs
const dropped = []  // couldn't clean at all

for (const [club, r] of Object.entries(raw)) {
  const addr = cleanAddress(r.address)
  const phone = cleanPhone(r.phone)
  if (!addr) { dropped.push(club); continue }

  const quality = classify(addr)
  const entry = { address: addr, phone, source: r.source, quality }
  if (quality === 'clean') clean[club] = entry
  else review[club] = entry
}

writeFileSync('scripts/swedish-club-addresses-cleaned.json', JSON.stringify(clean, null, 2))
writeFileSync('scripts/swedish-club-addresses-review.json', JSON.stringify(review, null, 2))

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

console.log('\nSample review (10):')
Object.entries(review).slice(0, 10).forEach(([club, r]) => {
  console.log(`  [${r.quality}] ${club}`)
  console.log(`    addr: ${r.address}`)
  console.log(`    tel:  ${r.phone || '-'}`)
})
