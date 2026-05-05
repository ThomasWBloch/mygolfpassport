// Scrape Croatia via GSH (Golf Savez Hrvatske) — public golfsavez.hr facility detail pages.
// Federation har ~30 klubber listed, men kun 5 facilities (igrališta) har detail-pages
// med kontakt+website. Klub-listen er primært organizations uden anlæg (mailto-only entries).
// Vi scraper de 5 facility-detail-pages.
//
// Run: node scripts/hr/scrape-hgs-hr.mjs

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/hr/hr-clubs-hgs.json'
const RAW_DIR = 'scripts/hr/raw-hgs'
const RATE_LIMIT_MS = 400
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36'
const REPARSE = process.argv.includes('--reparse')

// 5 known facilities with detail pages. Add to this if HGS publishes more.
const FACILITY_SLUGS = [
  'adriatic',
  'brijuni',
  'novi-dvori',
  'riverside',
  'sv-martin',
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decodeEntities(s) {
  if (!s) return s
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'").replace(/&nbsp;/g, ' ')
}

function normaliseEmail(e) {
  if (!e) return null
  const s = String(e).trim().toLowerCase()
  if (/@golfsavez\.hr$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+385')) return s
  if (s.startsWith('385') && s.length >= 11) return '+' + s
  if (/^\d{8,9}$/.test(s)) return '+385' + s.replace(/^0/, '')
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+385' + s.replace(/^0/, '')
}

function normaliseWebsite(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  if (!s) return null
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

async function fetchUrl(url) {
  await sleep(RATE_LIMIT_MS)
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' } })
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${url}`)
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

function parseFacilityPage(html, slug) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')

  // Extract main content section (after the page heading, before footer "O nama")
  const sectionStart = stripped.indexOf('class="team-single-item')
  const sectionEnd = stripped.indexOf('Karakteristike igrali')
  const slice = sectionStart > 0 && sectionEnd > sectionStart
    ? stripped.slice(sectionStart, sectionEnd)
    : stripped

  // Extract email + website + phone via regex on slice
  const emailM = /href="mailto:([^"]+)"/.exec(slice)
  const phoneM = /Telefon:\s*([+0-9 \-/.()]{6,})/i.exec(slice)
  let websiteM = null
  // Find external non-facebook/instagram href that is NOT golfsavez.hr
  const externalRe = /href="(https?:\/\/[^"]+)"/g
  let m
  while ((m = externalRe.exec(slice)) !== null) {
    const u = m[1]
    if (u.includes('golfsavez.hr')) continue
    if (/facebook\.com|instagram\.com|twitter\.com|youtube\.com/.test(u)) continue
    websiteM = u
    break
  }

  // Extract name from <h1> or "team-single-item" data-name
  const nameM = /<h\d[^>]*>([^<]+(?:Golf|GOLF|Igral|Course)[^<]+)<\/h\d>/.exec(slice)
    || /<title>([^<|]+)/.exec(html)
  const name = nameM ? decodeEntities(nameM[1].trim()) : slug

  // Address: look for text after name with comma + city
  const addrM = /([A-ZČŠŽ][\wČŠŽčšžáéíóú ]+ \d+[\w\- ,]+\d{4,5} \w+(?:, Croatia)?)/.exec(
    slice.replace(/<[^>]+>/g, ' ')
  )
  const address = addrM ? decodeEntities(addrM[1].trim()) : null

  return {
    slug,
    name,
    address,
    phone: phoneM ? phoneM[1].trim() : null,
    email: emailM ? emailM[1].trim() : null,
    website: websiteM,
  }
}

async function run() {
  const clubs = []
  for (const slug of FACILITY_SLUGS) {
    const cacheName = `igraliste-${slug}.html`
    let html
    if (REPARSE) {
      const p = `${RAW_DIR}/${cacheName}`
      if (!existsSync(p)) { console.log(`miss ${cacheName}`); continue }
      html = readFileSync(p, 'utf8')
    } else {
      html = await fetchUrl(`https://www.golfsavez.hr/team/igraliste-${slug}/`)
      cacheRaw(cacheName, html)
    }
    const raw = parseFacilityPage(html, slug)
    clubs.push({
      ...raw,
      phone: normalisePhone(raw.phone),
      email: normaliseEmail(raw.email),
      website: normaliseWebsite(raw.website),
      raw_phone: raw.phone, raw_email: raw.email, raw_website: raw.website,
    })
  }

  writeFileSync(OUT_PATH, JSON.stringify({
    source: 'golfsavez.hr/team/igraliste-*',
    fetched_at: new Date().toISOString(),
    total: clubs.length,
    clubs,
  }, null, 2))
  const w = clubs.filter((c) => c.website).length
  const p = clubs.filter((c) => c.phone).length
  const e = clubs.filter((c) => c.email).length
  console.log(`[done] ${OUT_PATH} (${clubs.length} clubs)`)
  console.log(`  website: ${w}/${clubs.length}; phone: ${p}/${clubs.length}; email: ${e}/${clubs.length}`)
}

run().catch((e) => { console.error(e); process.exit(1) })
