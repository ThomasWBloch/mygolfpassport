// Scrape Estonia via EGL (Eesti Golfi Liit) — public golf.ee/en/golfer/golf-clubs.
// 10 klubber single-page med fuld kontakt-info per klub: founded year, members,
// fees, club president/captain/secretary med phone+email each.
//
// Run: node scripts/ee/scrape-egl-ee.mjs

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/ee/ee-clubs-egl.json'
const RAW_DIR = 'scripts/ee/raw-egl'
const LIST_URL = 'https://www.golf.ee/en/golfer/golf-clubs/'
const RATE_LIMIT_MS = 400
const UA = 'Mozilla/5.0 Chrome/124.0.0.0'
const REPARSE = process.argv.includes('--reparse')

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function decodeEntities(s) {
  if (!s) return s
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&#8211;/g, '-')
    .replace(/&nbsp;/g, ' ')
}

function normaliseEmail(e) {
  if (!e) return null
  const s = String(e).trim().toLowerCase()
  if (/@golf\.ee$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+372')) return s
  if (s.startsWith('372') && s.length >= 11) return '+' + s
  if (/^\d{7,8}$/.test(s)) return '+372' + s
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+372' + s.replace(/^0/, '')
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

function parseListing(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
  // Replace mailto+webhref with markers, then strip tags
  const text = stripped
    .replace(/<a [^>]*href="mailto:([^"]+)"[^>]*>[^<]+<\/a>/gi, ' EMAIL[$1] ')
    .replace(/<a [^>]*href="(https?:\/\/[^"]+)"[^>]*>[^<]*<\/a>/gi, ' WEB[$1] ')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
  const flat = decodeEntities(text).replace(/\s+/g, ' ').trim()

  // Find content section: "Ten golf clubs are members" header
  const startM = /Ten golf clubs are members/.exec(flat)
  if (!startM) return []
  const start = startM.index + startM[0].length
  // End at navigation footer
  const endM = /Other significant pages|Eesti Golfi Liit \(EGL\)|menu Menu/.exec(flat.slice(start))
  const end = endM ? start + endM.index : flat.length
  const slice = flat.slice(start, end)

  // Strategy: find all "Founded at:" anchors. For each, extract:
  //   - name: text immediately before (up to ~80 chars), stripped of WEB/EMAIL markers
  //   - website: bare domain in the pre-text or WEB[...] marker
  //   - phone/email: from the segment between this Founded-at and the next
  const foundedRe = /Founded at:/g
  const founded = []
  let fm
  while ((fm = foundedRe.exec(slice)) !== null) founded.push(fm.index)
  const clubs = []
  for (let i = 0; i < founded.length; i++) {
    const segStart = i === 0 ? 0 : founded[i - 1]
    const blockStart = segStart === 0 ? 0 : segStart + 'Founded at:'.length
    const nameWindow = slice.slice(Math.max(blockStart, founded[i] - 200), founded[i])
    const segEnd = i + 1 < founded.length ? founded[i + 1] : slice.length
    const detailBlock = slice.slice(founded[i], segEnd)

    // Strip markers/numbers/dates/keywords from name window
    let nameRaw = nameWindow
      .replace(/EMAIL\[[^\]]+\]/g, '')
      .replace(/WEB\[[^\]]+\]/g, '')
      .replace(/Number of members:[\s\S]*$/, '')
      .replace(/Membership fee:[\s\S]*$/, '')
      .replace(/Club (president|captain|secretary|women's camptain|women's captain):[\s\S]*$/, '')
      .replace(/\|[\s\S]*$/, '')
      .replace(/\bFacebook\b|\bInstagram\b/g, '')
      .replace(/\b(?:19|20)\d{2}\b/g, '')
      .trim()
    // Extract trailing club-like phrase
    const nameMatch = /([A-ZÕÄÖÜ][\w &'.\-]+(?:Golf [&\w]*|Golfclub|Golf Club|Country Club|Tour Players Club)[\w \-]*?)$/.exec(nameRaw)
    let name = nameMatch ? nameMatch[1].trim() : nameRaw.split(/\s{2,}/).pop()?.trim()
    // Strip "Members" or other trailing junk
    if (name) name = name.replace(/\s+(Members|Founded|Members\.|Number)\s*$/i, '').trim()

    // Find bare domain in name window (e.g. "egcc.ee")
    const domainM = /\b([a-z][\w-]*\.(?:ee|eu|com|org|net))\b/i.exec(nameWindow)
    const website = domainM ? domainM[1] : null

    // Extract phone + email from detail block
    const phoneRe = /\|\s*([0-9][\d ]{5,9}\d)\s*\|/g
    const phones = []
    let pm
    while ((pm = phoneRe.exec(detailBlock)) !== null) phones.push(pm[1].trim())
    // Also try "I 5620 0115 I" pattern (Estonian sometimes uses I instead of |)
    const phoneRe2 = /\bI\s+([0-9][\d ]{5,9}\d)\s+I\b/g
    let pm2
    while ((pm2 = phoneRe2.exec(detailBlock)) !== null) phones.push(pm2[1].trim())

    const emailRe = /EMAIL\[([^\]]+)\]/g
    const emails = []
    let em
    while ((em = emailRe.exec(detailBlock)) !== null) emails.push(em[1].trim())

    // Skip federation header
    if (!name || /Estonian Golf Association/i.test(name)) continue
    if (name.length < 3) continue

    clubs.push({
      name, website,
      phone: phones[0] || null,
      email: emails[0] || null,
      emails_all: emails, phones_all: phones,
    })
  }
  return clubs
}

async function run() {
  // TODO: incomplete EE scrape scaffold — pick up in a future small-EU pass.
  // Listing-fetch + parseClubs() are wired up; just need the fetch+write
  // glue to mirror the pattern used in scripts/si/, scripts/hu/, etc.
  let html
  if (REPARSE) {
    html = readFileSync(`${RAW_DIR}/listing.html`, 'utf8')
  } else {
    if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
    const res = await fetch(LIST_URL, { headers: { 'User-Agent': UA } })
    html = await res.text()
    writeFileSync(`${RAW_DIR}/listing.html`, html)
    await sleep(RATE_LIMIT_MS)
  }
  const clubs = parseClubs(html)
  writeFileSync(OUT_PATH, JSON.stringify(clubs, null, 2))
  console.log(`Wrote ${clubs.length} clubs → ${OUT_PATH}`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

