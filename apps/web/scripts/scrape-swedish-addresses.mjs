// Scrape street addresses + phone numbers from Swedish golf club websites.
//
// Strategy per club:
//   1. Fetch homepage HTML (follow redirects, UTF-8 decode)
//   2. Try JSON-LD schema.org PostalAddress first (cleanest source)
//   3. Fall back to stripped-text regex: find Swedish postal code, expand
//      to street line above + city after, phone nearby
//   4. If homepage yields nothing, try /kontakt, /kontakta-oss, /contact
//
// Output: scripts/swedish-club-addresses.json — keyed by DB club name:
//   {
//     "Club Name": {
//       "address": "Street 123, 12345 City",
//       "phone": "+46 123 456 78",
//       "source": "jsonld" | "footer" | "contact-page",
//       "raw": "... snippet that matched ..."
//     }
//   }
//
// Skipped clubs (no URL, fetch failed, nothing extractable) are reported
// with a reason; user can review and hand-fill later.
//
// Usage: node --env-file=.env.local scripts/scrape-swedish-addresses.mjs
//
// This is a read-only script — does not touch the DB. Apply via a separate
// script once the JSON is reviewed.

import { readFileSync, writeFileSync, existsSync } from 'fs'

const OUT_FILE = 'scripts/swedish-club-addresses.json'
const URLS = JSON.parse(readFileSync('scripts/swedish-club-websites.json', 'utf8'))
const CONCURRENCY = 5
const TIMEOUT_MS = 15_000
const KONTAKT_PATHS = ['/kontakt', '/kontakta-oss', '/kontakt/', '/contact', '/contact/', '/om-oss/kontakt']

// Resume support: if file exists, skip already-scraped clubs
const existing = existsSync(OUT_FILE)
  ? JSON.parse(readFileSync(OUT_FILE, 'utf8'))
  : {}

const results = { ...existing }
const failures = []

// ── Fetch with timeout ──────────────────────────────────────────────────────
async function fetchText(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (MGP address verification bot)' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

// ── Strip HTML → text (keeping line breaks between block elements) ──────────
function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(br|p|div|li|tr|h[1-6]|address|footer|section)\b[^>]*>/gi, '\n')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&aring;/gi, 'å').replace(/&auml;/gi, 'ä').replace(/&ouml;/gi, 'ö')
    .replace(/&Aring;/g, 'Å').replace(/&Auml;/g, 'Ä').replace(/&Ouml;/g, 'Ö')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim()
}

// ── JSON-LD extractor ───────────────────────────────────────────────────────
function extractJsonLd(html) {
  const out = { address: null, phone: null }
  const scripts = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
  for (const m of scripts) {
    let obj
    try { obj = JSON.parse(m[1]) } catch { continue }
    const arr = Array.isArray(obj) ? obj : [obj]
    const queue = [...arr]
    while (queue.length) {
      const o = queue.shift()
      if (!o || typeof o !== 'object') continue
      if (o['@graph']) queue.push(...o['@graph'])
      if (o.address && typeof o.address === 'object') {
        const a = o.address
        const parts = [a.streetAddress, [a.postalCode, a.addressLocality].filter(Boolean).join(' ')].filter(Boolean)
        if (parts.length && !out.address) out.address = parts.join(', ')
      }
      if (typeof o.telephone === 'string' && !out.phone) out.phone = o.telephone.trim()
    }
  }
  return out
}

// ── Regex extractor on plain text ───────────────────────────────────────────
const POSTAL_RE = /\b(\d{3})\s?(\d{2})\s+([A-ZÅÄÖ][a-zåäöA-ZÅÄÖ\-\.\s]{2,40})/
const PHONE_RE = /(?:\+46[\s\-]?|\b0)\d[\d\s\-()]{6,}/
const STREET_HINT_RE = /\b[A-ZÅÄÖ][a-zåäö][a-zåäöA-ZÅÄÖ\- ]{2,40}(?:vägen|gatan|stigen|gränd|plan|allén|vägen|väg|gata|g\.|torget|plats)\b[\s\w\-]*?\d+[A-Za-z]?/

function extractFromText(text) {
  const out = { address: null, phone: null, raw: null }

  const postalMatch = text.match(POSTAL_RE)
  if (postalMatch) {
    const postal = `${postalMatch[1]} ${postalMatch[2]} ${postalMatch[3].split(/\s+/).slice(0, 3).join(' ').replace(/[,\.].*$/, '').trim()}`
    // Look for street address on the line before the postal code
    const idx = postalMatch.index
    const before = text.slice(Math.max(0, idx - 200), idx)
    const lines = before.split('\n').map(l => l.trim()).filter(Boolean)
    const streetLine = lines.reverse().find(l => STREET_HINT_RE.test(l) || /\b\d+[A-Z]?\b/.test(l))
    if (streetLine) {
      const streetMatch = streetLine.match(STREET_HINT_RE) || streetLine.match(/[A-ZÅÄÖ][a-zåäöA-ZÅÄÖ\- ]{3,40}\s\d+[A-Z]?/)
      if (streetMatch) {
        out.address = `${streetMatch[0].trim()}, ${postal}`
        out.raw = streetLine + ' | ' + postalMatch[0]
      }
    }
    if (!out.address) out.address = postal  // postal-only fallback
  }

  const phoneMatch = text.match(PHONE_RE)
  if (phoneMatch) out.phone = phoneMatch[0].replace(/\s+/g, ' ').trim()

  return out
}

// ── Scrape one club ─────────────────────────────────────────────────────────
async function scrapeClub(club, url) {
  try {
    const html = await fetchText(url)
    const jsonld = extractJsonLd(html)
    if (jsonld.address) {
      return { address: jsonld.address, phone: jsonld.phone, source: 'jsonld', raw: null }
    }
    const text = stripHtml(html)
    const reg = extractFromText(text)
    if (reg.address) return { ...reg, source: 'footer' }

    // Try kontakt page
    const base = new URL(url)
    for (const path of KONTAKT_PATHS) {
      try {
        const kHtml = await fetchText(new URL(path, base).toString())
        const kJsonld = extractJsonLd(kHtml)
        if (kJsonld.address) return { ...kJsonld, source: 'contact-page-jsonld', raw: null }
        const kText = stripHtml(kHtml)
        const kReg = extractFromText(kText)
        if (kReg.address) return { ...kReg, source: 'contact-page' }
      } catch { /* try next path */ }
    }
    return null
  } catch (e) {
    throw e
  }
}

// ── Main loop with concurrency limit ────────────────────────────────────────
const entries = Object.entries(URLS).filter(([club]) => !(club in results))
console.log(`Scraping ${entries.length} new clubs (${Object.keys(results).length} already cached).`)

let done = 0
const queue = [...entries]
const workers = Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) {
    const [club, url] = queue.shift()
    try {
      const result = await scrapeClub(club, url)
      if (result) {
        results[club] = result
      } else {
        failures.push({ club, url, reason: 'no address found' })
      }
    } catch (e) {
      failures.push({ club, url, reason: e.message?.slice(0, 100) || 'unknown' })
    }
    done++
    if (done % 20 === 0 || done === entries.length) {
      console.log(`  ${done}/${entries.length}  ok=${Object.keys(results).length}  fail=${failures.length}`)
      writeFileSync(OUT_FILE, JSON.stringify(results, null, 2))
    }
  }
})
await Promise.all(workers)

writeFileSync(OUT_FILE, JSON.stringify(results, null, 2))

console.log(`\n══ SUMMARY ══`)
console.log(`  Scraped successfully: ${Object.keys(results).length}`)
console.log(`  Failed / no address:  ${failures.length}`)
console.log(`  Output:               ${OUT_FILE}`)

const bySource = {}
for (const r of Object.values(results)) bySource[r.source] = (bySource[r.source] || 0) + 1
console.log(`\nBy source:`)
Object.entries(bySource).forEach(([k, v]) => console.log(`  ${k}: ${v}`))

console.log(`\nSample successes:`)
Object.entries(results).slice(0, 5).forEach(([club, r]) =>
  console.log(`  ${club} [${r.source}]`)
  || console.log(`    addr: ${r.address}`)
  || console.log(`    tel:  ${r.phone || '-'}`)
)

if (failures.length) {
  console.log(`\nSample failures:`)
  failures.slice(0, 10).forEach(f => console.log(`  ${f.club}: ${f.reason}`))
  writeFileSync('scripts/swedish-address-failures.json', JSON.stringify(failures, null, 2))
  console.log(`  (full list → scripts/swedish-address-failures.json)`)
}
