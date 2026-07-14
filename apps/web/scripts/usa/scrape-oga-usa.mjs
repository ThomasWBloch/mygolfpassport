// Scrape USA via OpenGolfAPI bulk dataset (raw.githubusercontent.com).
// Public ODbL-licensed dataset, ~15.667 US courses, no auth.
// Updated weekly. Source attribution: OSM + GolfPass + community.
//
// Schema (CSV): id,name,latitude,longitude,country,state,city,type,holes,par,
//   phone,website,year_built,address,postal_code,architect,total_yardage,osm_id,
//   updated_at,hole_*_par,hole_*_hcp
//
// No email field (OGA doesn't have email per recon Session 35).
//
// Run: node scripts/usa/scrape-oga-usa.mjs

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const OUT_PATH = 'scripts/usa/usa-courses-oga.json'
const RAW_DIR = 'scripts/usa/raw-oga'
const SOURCE_URL = 'https://raw.githubusercontent.com/opengolfapi/data/main/opengolfapi-us.csv'
const REPARSE = process.argv.includes('--reparse')

function parseCsvLine(line) {
  // Handle quoted fields with commas/escaped quotes
  const out = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQ) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++ }
      else if (c === '"') { inQ = false }
      else cur += c
    } else {
      if (c === ',') { out.push(cur); cur = '' }
      else if (c === '"') inQ = true
      else cur += c
    }
  }
  out.push(cur)
  return out
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('+1')) s = s.slice(2)
  else if (s.startsWith('1') && s.length === 11) s = s.slice(1)
  if (s.length !== 10) return null
  // Filter obviously-fake placeholders (all same digit, all zeros, sequential)
  if (/^(\d)\1{9}$/.test(s)) return null // all same
  if (/^[18]00\d{7}$/.test(s) && /^.0{7}$/.test(s.slice(3))) return null // 8000000000-style
  if (/^7490\d{6}$/.test(s)) return null // Pinehurst placeholder seen in OGA
  // Filter impossible area codes
  const area = s.slice(0, 3)
  if (area === '000' || area === '111' || area === '999') return null
  // Format: +1 (XXX) XXX-XXXX → +1XXXXXXXXXX
  return '+1' + s
}

function normaliseWebsite(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  if (!s || s === '-') return null
  s = s.replace(/[.,;]+$/, '')
  if (!/^https?:\/\//i.test(s)) {
    if (!/^[\w.-]+\.[a-z]{2,}/i.test(s)) return null
    s = 'http://' + s
  }
  try {
    const u = new globalThis.URL(s)
    if (!u.hostname.includes('.')) return null
    return `${u.protocol}//${u.hostname}/`.toLowerCase()
  } catch { return null }
}

async function fetchCsv() {
  console.log('[fetch] OpenGolfAPI bulk CSV…')
  const r = await fetch(SOURCE_URL, {
    headers: { 'User-Agent': 'mygolfpassport-scraper/0.1 (open dataset, ODbL)' },
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

async function run() {
  let csv
  if (REPARSE) {
    csv = readFileSync(`${RAW_DIR}/opengolfapi-us.csv`, 'utf8')
    console.log('[reparse] cached')
  } else {
    csv = await fetchCsv()
    cacheRaw('opengolfapi-us.csv', csv)
  }

  const lines = csv.split(/\r?\n/).filter((l) => l.length > 0)
  const header = parseCsvLine(lines[0])
  const idx = (k) => header.indexOf(k)

  const nameIdx = idx('name')
  const latIdx = idx('latitude')
  const lngIdx = idx('longitude')
  const stateIdx = idx('state')
  const cityIdx = idx('city')
  const phoneIdx = idx('phone')
  const webIdx = idx('website')
  const holesIdx = idx('holes')
  const parIdx = idx('par')
  const yearIdx = idx('year_built')
  const addrIdx = idx('address')
  const postalIdx = idx('postal_code')
  const osmIdx = idx('osm_id')
  const idIdx = idx('id')

  const courses = []
  for (let i = 1; i < lines.length; i++) {
    const f = parseCsvLine(lines[i])
    if (f.length < header.length) continue
    const lat = parseFloat(f[latIdx])
    const lng = parseFloat(f[lngIdx])
    if (Number.isNaN(lat) || Number.isNaN(lng)) continue
    courses.push({
      oga_id: f[idIdx],
      osm_id: f[osmIdx] || null,
      name: f[nameIdx],
      state: f[stateIdx],
      city: f[cityIdx] || null,
      address: f[addrIdx] || null,
      postal_code: f[postalIdx] || null,
      latitude: lat,
      longitude: lng,
      phone: normalisePhone(f[phoneIdx]),
      website: normaliseWebsite(f[webIdx]),
      raw_phone: f[phoneIdx] || null,
      raw_website: f[webIdx] || null,
      holes: f[holesIdx] ? parseInt(f[holesIdx], 10) : null,
      par: f[parIdx] ? parseInt(f[parIdx], 10) : null,
      year_built: f[yearIdx] ? parseInt(f[yearIdx], 10) : null,
    })
  }

  writeFileSync(OUT_PATH, JSON.stringify({
    source: 'opengolfapi.org bulk CSV (ODbL)',
    fetched_at: new Date().toISOString(),
    total: courses.length,
    courses,
  }, null, 2))

  const w = courses.filter((c) => c.website).length
  const p = courses.filter((c) => c.phone).length
  console.log(`[done] ${OUT_PATH} (${courses.length} courses)`)
  console.log(`  website: ${w}/${courses.length} (${((100 * w) / courses.length).toFixed(1)}%)`)
  console.log(`  phone:   ${p}/${courses.length} (${((100 * p) / courses.length).toFixed(1)}%)`)
}

run().catch((e) => { console.error(e); process.exit(1) })
