// Scrape Turkey via TGF (Türkiye Golf Federasyonu) — public tgf.org.tr/en/golf-clubs.
// 71 entries single-page med Address:/Phone:/Faks:/E-Mail:/HCP Com. pattern.
// Province headers (Ankara, Antalya, Istanbul) interleaver med klub-navne.
//
// Affinity-noise filtering: many "SPOR KULÜBÜ" entries er sport-foreninger uden
// eget anlæg (Karate, Atletik, Yumak Savunma). Vi inkluderer alle, men match-script
// vil filtrere ud lavere matches naturligt.
//
// Run: node scripts/tr/scrape-tgf-tr.mjs

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/tr/tr-clubs-tgf.json'
const RAW_DIR = 'scripts/tr/raw-tgf'
const LIST_URL = 'https://tgf.org.tr/en/golf-clubs'
const RATE_LIMIT_MS = 400
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0'
const REPARSE = process.argv.includes('--reparse')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decodeEntities(s) {
  if (!s) return s
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&nbsp;/g, ' ')
}

function normaliseEmail(e) {
  if (!e) return null
  const s = String(e).trim().toLowerCase()
  if (/@tgf\.org\.tr$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+90')) return s
  if (s.startsWith('90') && s.length >= 12) return '+' + s
  // TR phones: 10 digits (3 area + 7 local) or 11 with leading 0
  if (/^0\d{10}$/.test(s)) return '+90' + s.slice(1)
  if (/^\d{10}$/.test(s)) return '+90' + s
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+90' + s.replace(/^0/, '')
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
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

// Province codes in TR — used to strip them from name detection
const PROVINCES = new Set([
  'Adana', 'Ağrı', 'Ankara', 'Antalya', 'Aydın', 'Balıkesir', 'Bursa', 'Çanakkale',
  'Eskişehir', 'Gaziantep', 'İstanbul', 'İzmir', 'Kayseri', 'Kocaeli', 'Konya',
  'Mersin', 'Muğla', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Tekirdağ', 'Trabzon',
])

function parseListing(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
  const text = decodeEntities(stripped.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())

  // Find all "HCP Com. : (Yes|No)" boundaries — each marks end of one club
  const boundaryRe = /HCP Com\.\s*:\s*(Yes|No)/g
  const boundaries = []
  let bm
  while ((bm = boundaryRe.exec(text)) !== null) {
    boundaries.push({ start: bm.index, end: bm.index + bm[0].length })
  }
  if (!boundaries.length) return []

  // First club starts after "Clubs Clubs" or similar nav header
  // For each boundary i, segment is from (prev-boundary-end | content-start) to current-boundary-start
  // Find the content start: locate the first occurrence of a province name followed by " ALL CAPS WORDS Address :"
  const contentStartM = /(?:CLUBS|Clubs)\s+(?:Homepage\s+)?Clubs\s+Clubs/.exec(text)
  let contentStart = contentStartM ? contentStartM.index + contentStartM[0].length : 0

  const clubs = []
  let prevEnd = contentStart
  for (const b of boundaries) {
    const seg = text.slice(prevEnd, b.start).trim()
    prevEnd = b.end

    // Within seg: strip leading province (single word that matches our list)
    let s = seg
    // Strip optional leading province (max 2 tokens)
    const provTokens = s.split(/\s+/, 4)
    let provSkip = 0
    for (let i = 0; i < Math.min(2, provTokens.length); i++) {
      if (PROVINCES.has(provTokens[i])) provSkip = i + 1
    }
    if (provSkip > 0) {
      s = provTokens.slice(provSkip).concat(s.split(/\s+/).slice(provSkip + 4)).join(' ')
      // Cleaner: just strip prefix words manually
      const cleanRe = new RegExp(`^(?:${[...PROVINCES].join('|')})\\s+`, 'g')
      s = seg.replace(cleanRe, '')
    }

    // Extract: NAME Address : ADDR Phone : PHONE Faks : FAX E-Mail : EMAIL
    const m = /^(.+?)\s+Address\s*:\s*(.*?)\s+Phone\s*:\s*(.*?)\s+Faks\s*:\s*(.*?)\s+E-?Mail\s*:\s*(\S*)/i.exec(s)
    if (!m) continue
    const name = m[1].trim()
    const address = m[2].trim().replace(/\+$/, '').trim()
    const phone = m[3].trim()
    const fax = m[4].trim()
    const email = m[5].trim()

    // Skip clearly non-golf entries based on name (case-insensitive)
    // We keep these for now — match-script will dedupe naturally
    if (!name || name.length < 3) continue

    clubs.push({ name, address, phone, fax: fax || null, email: email || null, website: null })
  }
  return clubs
}

async function run() {
  let html
  if (REPARSE) {
    html = readFileSync(`${RAW_DIR}/listing.html`, 'utf8')
    console.log('[reparse] cached')
  } else {
    html = await fetchUrl(LIST_URL)
    cacheRaw('listing.html', html)
  }

  const raw = parseListing(html)
  console.log(`[parse] ${raw.length} clubs`)

  const clubs = raw.map((c) => ({
    name: c.name,
    address: c.address,
    phone: normalisePhone(c.phone),
    email: normaliseEmail(c.email),
    website: normaliseWebsite(c.website),
    raw_phone: c.phone, raw_email: c.email, raw_fax: c.fax,
  }))

  writeFileSync(OUT_PATH, JSON.stringify({
    source: 'tgf.org.tr/en/golf-clubs',
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
