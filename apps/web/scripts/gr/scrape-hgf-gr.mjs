// Scrape Greece via HGF (Hellenic Golf Federation) — public hgf.gr/hgf-member-clubs.
// 9 klubber single-page med E:/T:/W: format.
//
// Run: node scripts/gr/scrape-hgf-gr.mjs

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/gr/gr-clubs-hgf.json'
const RAW_DIR = 'scripts/gr/raw-hgf'
const LIST_URL = 'https://hgf.gr/hgf-member-clubs/'
const RATE_LIMIT_MS = 400
const UA = 'Mozilla/5.0 Chrome/124.0.0.0'
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
  if (/@hgf\.gr$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+30')) return s
  if (s.startsWith('30') && s.length >= 11) return '+' + s
  if (/^\d{10}$/.test(s)) return '+30' + s
  if (s.length < 6) return null
  return s.startsWith('+') ? s : '+30' + s
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
  const text = stripped
    .replace(/<a [^>]*href="mailto:([^"]+)"[^>]*>[^<]+<\/a>/gi, ' EMAIL[$1] ')
    .replace(/<a [^>]*href="(https?:\/\/[^"]+)"[^>]*>[^<]*<\/a>/gi, ' WEB[$1] ')
    .replace(/<[^>]+>/g, ' ')
  const flat = decodeEntities(text).replace(/\s+/g, ' ').trim()

  // Find content section starting at first club
  const startIdx = flat.search(/Athletic Golf Club|Attikos|Corfu Golf|Glyfada Golf/)
  const endIdx = flat.search(/Hellenic Golf Federation\s+Address|©\d{4}/)
  const slice = startIdx >= 0 ? flat.slice(startIdx, endIdx > 0 ? endIdx : flat.length) : flat

  // GR has plain-text emails in "E: " or "Ε: " (Greek epsilon) format, not mailto.
  // Each email-position is a club anchor. Extract: name (before E:), email, phone, website.
  const emailRe = /(?:^|\s)(?:E:|Ε:)\s*([\w.+-]+@[\w.-]+\.[a-z]{2,})/g
  const emailHits = []
  let em
  while ((em = emailRe.exec(slice)) !== null) {
    emailHits.push({ start: em.index, email: em[1], end: em.index + em[0].length })
  }
  const clubs = []
  for (let i = 0; i < emailHits.length; i++) {
    const segStart = i === 0 ? 0 : emailHits[i - 1].end
    const before = slice.slice(segStart, emailHits[i].start).replace(/\s+/g, ' ').trim()
    // Strip leftover phone/website tokens from prior club's tail
    let nameCandidate = before
      .replace(/(?:T\.?:?|Τ:|Tel\.?:?)\s*[+0-9 \-/.()]+/gi, '')
      .replace(/(?:W:|Web:)\s*\S+/gi, '')
      .replace(/[​-‏﻿]/g, '')
      .trim()
    // Take last "Club|Association|Country|Crete" phrase
    const nameMatch = /([A-Z][A-Za-z0-9 "&'.\-]+(?:Club|Association|Country|Glub|Crete|Federation))/g
    let lastName = null
    let nm
    while ((nm = nameMatch.exec(nameCandidate)) !== null) {
      lastName = nm[1].trim()
    }
    const name = lastName || nameCandidate.slice(-80).trim()

    // Phone + website in window from email-end to next email-start
    const after = slice.slice(emailHits[i].end, i + 1 < emailHits.length ? emailHits[i + 1].start : slice.length)
    const phoneM = /(?:T\.?:?|Τ:|Tel\.?:?)\s*([+0-9 \-/.()]{7,})/i.exec(after)
    const webM = /(?:W:|Web:|WEB\[)\s*([^\s\]]+)/i.exec(after)

    if (name && name.length >= 5 && /Club|Association|Country|Crete|Federation/i.test(name)) {
      clubs.push({
        name,
        email: emailHits[i].email,
        phone: phoneM ? phoneM[1].trim() : null,
        website: webM ? webM[1].replace(/\]$/, '') : null,
      })
    }
  }

  // Dedupe by name
  const seen = new Set()
  const out = []
  for (const c of clubs) {
    if (!seen.has(c.name)) { seen.add(c.name); out.push(c) }
  }
  return out
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
    email: normaliseEmail(c.email),
    phone: normalisePhone(c.phone),
    website: normaliseWebsite(c.website),
    raw_email: c.email, raw_phone: c.phone, raw_website: c.website,
  }))

  writeFileSync(OUT_PATH, JSON.stringify({
    source: 'hgf.gr/hgf-member-clubs',
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
