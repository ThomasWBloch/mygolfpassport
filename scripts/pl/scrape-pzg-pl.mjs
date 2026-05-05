// Scrape Polish PZG (Polski Związek Golfa) klub-listing.
//
// Discovery (session 34, 2026-05-05):
//   pzgolf.pl/kluby er server-renderet HTML med klub-name + website inline:
//     <a href="https://klub.pl/">Klub Name</a>
//   ~74 klub-anchors. Ingen mailto/tel inline → scope = KUN website.
//
//   polski.golf/kluby-golfowe/ er WordPress-side uden klub-data.
//   polski.golf/obiekty/ returnerer HTTP 500.
//   wp-json/wp/v2 har kun standard post-types — ingen custom 'klub' type.
//
// Strategi:
//   Single GET af pzgolf.pl/kluby → parse alle <a href="external">name</a>
//   pairs + filter (Facebook, social, federation-self, sponsor noise).
//
// Run: node scripts/pl/scrape-pzg-pl.mjs           (full scrape)
//      node scripts/pl/scrape-pzg-pl.mjs --reparse (parse fra cached raw-pzg/)

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/pl/pl-clubs-pzg.json'
const RAW_DIR = 'scripts/pl/raw-pzg'
const LISTING_URL = 'https://pzgolf.pl/kluby'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const REPARSE = process.argv.includes('--reparse')

function decodeEntities(s) {
  if (!s) return s
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function normaliseWebsite(url) {
  if (!url) return null
  let s = String(url).trim().replace(/\s+$/, '')
  if (/^www\./i.test(s)) s = 'https://' + s
  if (s.startsWith('//')) s = 'https:' + s
  if (!/^https?:\/\//i.test(s)) return null
  // Reject social/federation/non-club hosts
  const REJECT = /(pzgolf\.pl|polski\.golf|pgapolska\.com|randa\.org|igfgolf\.org|olimpijski\.pl|facebook\.com|youtube\.com|instagram\.com|linkedin\.com|twitter\.com|wordpress\.|gravatar)/i
  if (REJECT.test(s)) return null
  return s
}

async function fetchHtml() {
  const cachePath = `${RAW_DIR}/listing-kluby.html`
  if (existsSync(cachePath) && !REPARSE) return readFileSync(cachePath, 'utf8')
  if (REPARSE && existsSync(cachePath)) return readFileSync(cachePath, 'utf8')
  console.log(`Fetching ${LISTING_URL}…`)
  const r = await fetch(LISTING_URL, { headers: { 'User-Agent': UA, Accept: 'text/html' } })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const html = await r.text()
  mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(cachePath, html, 'utf8')
  return html
}

function parseClubs(html) {
  // Match <a href="URL">NAME</a> patterns
  const out = []
  const seen = new Set()
  const re = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>([^<]{2,120})<\/a>/g
  for (const m of html.matchAll(re)) {
    const href = m[1]
    const name = decodeEntities(m[2]).trim()
    const website = normaliseWebsite(href)
    if (!website) continue
    // Filter ud naviation/menu-links: name skal indeholde 'golf'/'klub'/'club' eller være i club-format
    const lname = name.toLowerCase()
    if (!/(golf|klub|club|country)/i.test(lname)) continue
    // Skip noise
    if (/(kodeks|menu|aktualnos|patron|ranking|turniej|cookie|polityka|kontakt|copyright|reklama)/i.test(lname)) continue
    // Dedup på website-host
    let host
    try { host = new URL(website).hostname.replace(/^www\./, '') } catch { continue }
    if (seen.has(host)) continue
    seen.add(host)
    out.push({ name, website, host })
  }
  return out
}

async function main() {
  mkdirSync(RAW_DIR, { recursive: true })
  console.log(`PL PZG scrape — REPARSE=${REPARSE}`)
  const html = await fetchHtml()
  console.log(`  HTML ${html.length} bytes`)
  const clubs = parseClubs(html)
  console.log(`Parsed ${clubs.length} unique klubs`)
  writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2), 'utf8')
  console.log(`Wrote ${OUT_PATH}`)
  // Sample
  for (const c of clubs.slice(0, 8)) {
    console.log(`  - ${c.name} → ${c.website}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
