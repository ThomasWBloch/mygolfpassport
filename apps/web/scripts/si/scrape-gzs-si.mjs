// Scrape Slovenia via GZS (Golf zveza Slovenije) — public golfportal.si club directory.
//
// Discovery (session 35, 2026-05-05):
//   golfportal.si/clubs er paginated server-rendered HTML (qStom CMS).
//   `?limit=100` viser alle 43 klubber på én side — ingen pagination needed.
//   Hver klub er i <div class="course-data"> ... </div> med:
//     <h4>NAME</h4>
//     <span><i class="fa fa-map-marker"></i> ADDRESS</span>
//     <span><i class="fa fa-phone"></i> PHONE</span>      (optional, kan repeat)
//     <a href="mailto:EMAIL">EMAIL</a>
//     <i class="fa fa-globe"></i><a href="//URL">         (optional, ofte protokol-relativ)
//
// Run: node scripts/si/scrape-gzs-si.mjs           (full scrape)
//      node scripts/si/scrape-gzs-si.mjs --reparse (parse fra cached raw-gzs/)

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/si/si-clubs-gzs.json'
const RAW_DIR = 'scripts/si/raw-gzs'
const LIST_URL = 'https://www.golfportal.si/clubs?limit=100'
const RATE_LIMIT_MS = parseInt(process.env.RATE_MS || '400', 10)
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

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
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

function normaliseEmail(email) {
  if (!email) return null
  const s = String(email).trim().toLowerCase()
  if (/@golfzveza-slovenije\.si$/.test(s)) return null
  if (/@golfportal\.si$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  s = s.replace(/\([^)]*\)/g, '')
  s = s.replace(/^[Tt][.:]?\s*/, '')
  const m = /([+0-9 \-/.]{6,})/.exec(s)
  if (!m) return null
  s = m[1].replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+386')) return s
  if (s.startsWith('386') && s.length >= 11) return '+' + s
  if (/^\d{8,9}$/.test(s)) return '+386' + s.replace(/^0/, '')
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+386' + s.replace(/^0/, '')
}

function normaliseWebsite(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  if (!s || s === '-') return null
  s = s.replace(/[.,;]+$/, '')
  // Handle "//www.x.y" protocol-relative
  if (s.startsWith('//')) s = 'https:' + s
  // Handle "//http://www.x.y" double-prefix bug seen in source data
  s = s.replace(/^https:\/\/http:\/\//, 'http://')
  s = s.replace(/^https:\/\/https:\/\//, 'https://')
  if (!/^https?:\/\//i.test(s)) {
    if (!/^[\w.-]+\.[a-z]{2,}/i.test(s)) return null
    s = 'https://' + s
  }
  try {
    const u = new globalThis.URL(s)
    if (!u.hostname.includes('.')) return null
    return s.toLowerCase()
  } catch {
    return null
  }
}

async function fetchListing() {
  await sleep(RATE_LIMIT_MS)
  const r = await fetch(LIST_URL, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'sl,en;q=0.8',
    },
  })
  if (!r.ok) throw new Error(`Listing HTTP ${r.status}`)
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

function parseListing(html) {
  // Slice each "course-data" block by start-position.
  const courseStart = /<div class="course-data">/g
  const positions = []
  let m
  while ((m = courseStart.exec(html)) !== null) positions.push(m.index)
  if (!positions.length) return []
  positions.push(html.length)
  const blocks = []
  for (let i = 0; i < positions.length - 1; i++) {
    blocks.push(html.slice(positions[i], positions[i + 1]))
  }

  const clubs = []
  for (const blk of blocks) {
    const nameM = /<h4>([^<]+)<\/h4>/.exec(blk)
    if (!nameM) continue
    const name = decodeEntities(nameM[1].trim())
    if (!name || name.length < 2) continue

    const addrM = /<i class="fa fa-map-marker"><\/i>\s*([^<]+)/.exec(blk)
    const address = addrM ? decodeEntities(addrM[1].trim()) : null

    const phones = []
    const phoneRe = /<i class="fa fa-phone"><\/i>\s*([^<]+)/g
    let pm
    while ((pm = phoneRe.exec(blk)) !== null) {
      phones.push(decodeEntities(pm[1].trim()))
    }

    const emailM = /href="mailto:\s*([^"]+)"/.exec(blk)
    const email = emailM ? decodeEntities(emailM[1].trim()) : null

    let website = null
    const globeM = /<i class="fa fa-globe"><\/i>\s*<a[^>]*href="([^"]+)"/i.exec(blk)
    if (globeM) {
      let u = decodeEntities(globeM[1].trim())
      if (u && u !== '-') website = u
    }
    if (!website) {
      const externalRe = /href="((?:https?:)?\/\/[^"]+)"/g
      let em
      while ((em = externalRe.exec(blk)) !== null) {
        let u = em[1]
        if (u.startsWith('//')) u = 'https:' + u
        if (u.includes('mailto:')) continue
        if (u.includes('golfportal.si')) continue
        if (/facebook\.com|instagram\.com|twitter\.com|youtube\.com/.test(u)) continue
        website = u
        break
      }
    }

    clubs.push({ name, address, phones, email, website })
  }
  return clubs
}

async function run() {
  let html
  if (REPARSE) {
    const p = `${RAW_DIR}/listing.html`
    if (!existsSync(p)) throw new Error('No cached listing.html')
    html = readFileSync(p, 'utf8')
    console.log('[reparse] using cached listing')
  } else {
    console.log('[fetch] golfportal.si/clubs?limit=100…')
    html = await fetchListing()
    cacheRaw('listing.html', html)
  }

  const raw = parseListing(html)
  console.log(`[parse] found ${raw.length} club blocks`)

  const clubs = raw.map((c) => {
    let phone = null
    for (const p of c.phones || []) {
      const norm = normalisePhone(p)
      if (norm) {
        phone = norm
        break
      }
    }
    return {
      name: c.name,
      address: c.address,
      phone,
      phones_raw: c.phones,
      email: normaliseEmail(c.email),
      website: normaliseWebsite(c.website),
      raw_email: c.email || null,
      raw_website: c.website || null,
    }
  })

  const out = {
    source: 'golfportal.si (GZS)',
    fetched_at: new Date().toISOString(),
    total: clubs.length,
    clubs,
  }
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2))
  console.log(`[done] wrote ${OUT_PATH} (${clubs.length} clubs)`)

  const w = clubs.filter((c) => c.website).length
  const p = clubs.filter((c) => c.phone).length
  const e = clubs.filter((c) => c.email).length
  console.log(`  website: ${w}/${clubs.length} (${((100 * w) / clubs.length).toFixed(1)}%)`)
  console.log(`  phone:   ${p}/${clubs.length} (${((100 * p) / clubs.length).toFixed(1)}%)`)
  console.log(`  email:   ${e}/${clubs.length} (${((100 * e) / clubs.length).toFixed(1)}%)`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
