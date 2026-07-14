// Scrape Hungary via MGSZ (Magyar Golf Szövetség) — public hungolf.hu/en/clubs.
// Single-page WordPress med 14 klubber inline (name + address + email + phone).
// Pattern: hver klub adskilles af "Edzők Árlista" footer-link.
//
// Run: node scripts/hu/scrape-hungolf-hu.mjs
//      node scripts/hu/scrape-hungolf-hu.mjs --reparse

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/hu/hu-clubs-mgsz.json'
const RAW_DIR = 'scripts/hu/raw-mgsz'
const LIST_URL = 'https://hungolf.hu/en/clubs/'
const RATE_LIMIT_MS = 400
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36'

const REPARSE = process.argv.includes('--reparse')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decodeEntities(s) {
  if (!s) return s
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
}

function normaliseEmail(email) {
  if (!email) return null
  const s = String(email).trim().toLowerCase()
  if (/@hungolf\.hu$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim().replace(/^Tel\s*:?\s*/i, '')
  s = s.replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+36')) return s
  if (s.startsWith('36') && s.length >= 11) return '+' + s
  if (/^\d{8,9}$/.test(s)) return '+36' + s.replace(/^0/, '')
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+36' + s.replace(/^0/, '')
}

function normaliseWebsite(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  if (!s) return null
  s = s.replace(/[.,;]+$/, '')
  if (!/^https?:\/\//i.test(s)) {
    if (!/^[\w.-]+\.[a-z]{2,}/i.test(s)) return null
    s = 'https://' + s
  }
  try {
    const u = new globalThis.URL(s)
    if (!u.hostname.includes('.')) return null
    return `${u.protocol}//${u.hostname}/`.toLowerCase()
  } catch { return null }
}

async function fetchListing() {
  await sleep(RATE_LIMIT_MS)
  const r = await fetch(LIST_URL, {
    headers: { 'User-Agent': UA, Accept: 'text/html', 'Accept-Language': 'en-US,en;q=0.9' },
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

function parseListing(html) {
  // Find content section: between hero and footer
  // Strategy: grab all mailto + tel: + name patterns, walk the text
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')

  // Each club has: <h2 or h3>NAME</h2> followed by <p>ADDRESS<br/>email ǀ Tel: PHONE</p>
  // Or sometimes just <h2>NAME</h2><p>ADDRESS<br/>...</p>
  // Easier: find heading-tags that aren't navigation/site headers.
  const headingRe = /<h[1-6][^>]*>([^<]+(?:<a[^>]*>[^<]+<\/a>)?[^<]*)<\/h[1-6]>/gi
  const headings = []
  let m
  while ((m = headingRe.exec(stripped)) !== null) {
    const text = decodeEntities(m[1].replace(/<[^>]+>/g, '').trim())
    if (text && text.length > 2 && text.length < 100) {
      headings.push({ index: m.index, text })
    }
  }

  // Filter to club-name candidates: should contain "Golf" or "Club" or "Klub"
  const clubHeadings = headings.filter((h) =>
    /\b(golf|klub|club|country)\b/i.test(h.text) &&
    !/menu|main|footer|home|about|contact|news/i.test(h.text)
  )

  // For each heading, look at the section until next heading
  const clubs = []
  for (let i = 0; i < clubHeadings.length; i++) {
    const start = clubHeadings[i].index
    const end = i + 1 < clubHeadings.length ? clubHeadings[i + 1].index : Math.min(stripped.length, start + 800)
    const block = stripped.slice(start, end)

    const name = clubHeadings[i].text

    // Extract address: text after heading close tag, before email/phone
    const afterHeading = block.replace(/^<h[1-6][^>]*>[^<]+<\/h[1-6]>/i, '')
    // Pre-strip hungolf.hu internal anchors so they don't masquerade as club websites
    const cleaned = afterHeading.replace(
      /<a [^>]*href="https?:\/\/hungolf\.hu\/[^"]*"[^>]*>[^<]*<\/a>/gi,
      ''
    )
    const textBlock = cleaned
      .replace(/<a [^>]*href="mailto:([^"]+)"[^>]*>[^<]+<\/a>/gi, ' EMAIL[$1] ')
      .replace(/<a [^>]*href="(https?:\/\/[^"]+)"[^>]*>[^<]+<\/a>/gi, ' WEB[$1] ')
      .replace(/<br\s*\/?>/gi, ' | ')
      .replace(/<[^>]+>/g, ' ')
    const text = decodeEntities(textBlock).replace(/\s+/g, ' ').trim()

    // Pull email + phone + website
    const emailM = /EMAIL\[([^\]]+)\]/.exec(text)
    const webM = /WEB\[([^\]]+)\]/.exec(text)

    let phone = null
    const phoneM = /Tel\s*:?\s*([+0-9 \-/.()]{7,})/i.exec(text)
    if (phoneM) phone = phoneM[1].trim()

    // Address: portion before EMAIL/Tel marker
    let address = text
    if (emailM) address = text.slice(0, text.indexOf('EMAIL['))
    else if (phoneM) address = text.slice(0, text.indexOf(phoneM[0]))
    address = address.replace(/[|]+$/g, '').replace(/\s+/g, ' ').trim()
    // Strip trailing "Edzők" or "Árlista" leftovers
    address = address.replace(/\b(Edzők|Árlista)\b.*$/i, '').trim()
    if (!address || address.length > 200) address = null

    clubs.push({
      name,
      address,
      email: emailM ? emailM[1] : null,
      phone,
      website: webM ? webM[1] : null,
    })
  }

  // Dedupe by name
  const seen = new Set()
  const unique = []
  for (const c of clubs) {
    if (seen.has(c.name)) continue
    seen.add(c.name)
    unique.push(c)
  }
  return unique
}

async function run() {
  let html
  if (REPARSE) {
    html = readFileSync(`${RAW_DIR}/listing.html`, 'utf8')
    console.log('[reparse] cached')
  } else {
    console.log('[fetch] hungolf.hu/en/clubs…')
    html = await fetchListing()
    cacheRaw('listing.html', html)
  }

  const raw = parseListing(html)
  console.log(`[parse] ${raw.length} clubs`)

  const clubs = raw.map((c) => ({
    name: c.name,
    address: c.address,
    phone: normalisePhone(c.phone),
    raw_phone: c.phone,
    email: normaliseEmail(c.email),
    raw_email: c.email,
    website: normaliseWebsite(c.website),
    raw_website: c.website,
  }))

  writeFileSync(OUT_PATH, JSON.stringify({
    source: 'hungolf.hu/en/clubs',
    fetched_at: new Date().toISOString(),
    total: clubs.length,
    clubs,
  }, null, 2))
  console.log(`[done] ${OUT_PATH}`)

  const w = clubs.filter((c) => c.website).length
  const p = clubs.filter((c) => c.phone).length
  const e = clubs.filter((c) => c.email).length
  console.log(`  website: ${w}/${clubs.length}; phone: ${p}/${clubs.length}; email: ${e}/${clubs.length}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
