// Scrape Leading Courses (leadingcourses.com) for NL klubber.
//
// Discovery (session 26, 2026-05-03):
//   1. Sitemap: https://www.leadingcourses.com/nl/clubs-nl.xml indeholder 8.720 URLs.
//      Filtrer på /europa+nederland+ → 294 NL klubber, fordelt over 12 provinser.
//   2. Hver klub-side har <script type="application/ld+json"> med GolfCourse schema.org:
//      { name, address (PostalAddress), geo, telephone, url, amenityFeature, ... }
//   3. H2 "Banen van X" sektionen lister course-niveau navne + rating + holes.
//
// Robots.txt-status (verificeret 2026-05-03):
//   Course-pages er Allowed for User-agent: *. Reviews + /api/* + /search? er Disallowed.
//   Vi tager kun factual data (name, address, geo, telefon, banenavne) — ingen reviews.
//
// Run: node scripts/netherlands/scrape-leadingcourses-nl.mjs
//
// Polite rate-limiting: 1500ms mellem fetches (~7-8 minutter for 294 klubber).

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/netherlands/holland-lc-clubs.json'
const SITEMAP_URL = 'https://www.leadingcourses.com/nl/clubs-nl.xml'
const NL_FILTER = /\/clubs\/europa\+nederland\+/
const RATE_LIMIT_MS = 1500
const USER_AGENT = 'mygolfpassport/1.0 (netherlands course-name verification; thomasbloch74@gmail.com)'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchClubsList() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`)
  const r = await fetch(SITEMAP_URL, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/xml' },
    signal: AbortSignal.timeout(60000),
  })
  if (!r.ok) throw new Error(`Sitemap HTTP ${r.status}`)
  const text = await r.text()
  const urls = (text.match(/<loc>([^<]+)<\/loc>/g) || []).map((s) =>
    s.replace(/<\/?loc>/g, '').trim(),
  )
  return urls.filter((u) => NL_FILTER.test(u))
}

function extractLDJson(html) {
  // Find first <script type="application/ld+json"> with @type GolfCourse
  const matches = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
  for (const m of matches) {
    try {
      const j = JSON.parse(m[1].trim())
      if (j['@type'] === 'GolfCourse') return j
      if (Array.isArray(j)) {
        const gc = j.find((o) => o['@type'] === 'GolfCourse')
        if (gc) return gc
      }
    } catch (e) { /* ignore parse errors */ }
  }
  return null
}

function extractBanenSection(html) {
  // Find the H2 that starts with "Banen van" and the section that follows.
  // Look for course-block patterns: each course entry has name + rating + holes.
  // Naive parse: split text after <h2>Banen van X</h2> into chunks separated by "Meer informatie".
  const h2Match = html.match(/<h2[^>]*>\s*Banen\s+van\s+([^<]+)<\/h2>([\s\S]*?)(?=<h2|$)/i)
  if (!h2Match) return []
  const sectionHtml = h2Match[2]

  // Strip tags but keep structure markers
  const text = sectionHtml
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n\s*\n/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

  // Each course block typically: name + rating (e.g. 7.9) + "18 holes" + description + "Meer informatie"
  const blocks = text.split(/Meer informatie/i).map((b) => b.trim()).filter(Boolean)
  const courses = []
  for (const b of blocks) {
    if (b.length < 5) continue
    const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length < 2) continue
    // Heuristic: first non-empty line is course name
    // Look for "X holes" pattern
    let name = lines[0]
    if (name === h2Match[1].trim()) name = lines[1] || lines[0] // skip if it's the club name repeated
    let rating = null, holes = null
    for (const l of lines) {
      const ratingM = l.match(/^(\d+(?:\.\d+)?)$/)
      if (ratingM && !rating) rating = parseFloat(ratingM[1])
      const holesM = l.match(/^(\d+)\s+holes?$/i)
      if (holesM && !holes) holes = parseInt(holesM[1], 10)
    }
    if (name && name.length > 2 && name.length < 100) {
      courses.push({ name, rating, holes })
    }
  }
  return courses
}

async function fetchClubPage(url, attempt = 1) {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
      signal: AbortSignal.timeout(45000),
    })
    if (!r.ok) {
      if (r.status === 429 && attempt < 3) {
        console.log(`  429 — waiting 30s`)
        await sleep(30000)
        return fetchClubPage(url, attempt + 1)
      }
      return { error: `HTTP ${r.status}` }
    }
    const html = await r.text()
    const ld = extractLDJson(html)
    const banen = extractBanenSection(html)
    if (!ld) return { error: 'no LD+JSON GolfCourse', banen }
    return {
      name: ld.name || null,
      address: ld.address?.streetAddress || null,
      addressRegion: ld.address?.addressRegion || null,
      addressCountry: ld.address?.addressCountry || null,
      lat: ld.geo?.latitude ? parseFloat(ld.geo.latitude) : null,
      lon: ld.geo?.longitude ? parseFloat(ld.geo.longitude) : null,
      phone: ld.telephone || null,
      url: ld.url || null,
      banen,
      lc_url: url,
    }
  } catch (e) {
    if (attempt < 2) {
      console.log(`  ${e.message} — retry`)
      await sleep(5000)
      return fetchClubPage(url, attempt + 1)
    }
    return { error: e.message }
  }
}

// ---------- main ----------
const urls = await fetchClubsList()
console.log(`Found ${urls.length} NL klubber i LC sitemap`)

mkdirSync('scripts/netherlands', { recursive: true })

const results = []
const failures = []
let n = 0
for (const url of urls) {
  n++
  const slug = url.split('/').pop()
  process.stdout.write(`[${n}/${urls.length}] ${slug}... `)
  const data = await fetchClubPage(url)
  if (data.error) {
    console.log(`✗ ${data.error}`)
    failures.push({ url, error: data.error })
  } else {
    console.log(`✓ ${data.name} (${data.banen?.length || 0} banen)`)
    results.push(data)
  }
  // Polite rate-limit
  if (n < urls.length) await sleep(RATE_LIMIT_MS)
  // Save checkpoint every 25 to be safe
  if (n % 25 === 0) {
    writeFileSync(OUT_PATH, JSON.stringify({ clubs: results, failures, partial: true, processed: n, total: urls.length }, null, 2))
  }
}

results.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'nl'))
writeFileSync(OUT_PATH, JSON.stringify({ clubs: results, failures, partial: false, total: urls.length }, null, 2))

const withCoords = results.filter((c) => c.lat && c.lon).length
const withAddress = results.filter((c) => c.address).length
const withBanen = results.filter((c) => c.banen && c.banen.length > 0).length
const totalBanen = results.reduce((s, c) => s + (c.banen?.length || 0), 0)

console.log('')
console.log('--- LC scrape summary ---')
console.log(`Sitemap NL klubber:    ${urls.length}`)
console.log(`Successfully parsed:   ${results.length}`)
console.log(`Failures:              ${failures.length}`)
console.log(`With coords:           ${withCoords}`)
console.log(`With address:          ${withAddress}`)
console.log(`With banen-list:       ${withBanen}`)
console.log(`Total banen records:   ${totalBanen}`)
console.log(`Wrote: ${OUT_PATH}`)
