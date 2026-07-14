// Scrape Leading Courses (leadingcourses.com) for Swiss klubber.
//
// Discovery (session 30, 2026-05-04):
//   Master sitemap https://www.leadingcourses.com/clubs-en.xml indeholder ~9.840
//   globale klub-URLs. Filter på /clubs/europe+switzerland+/ → Swiss klubber
//   fordelt over kantoner. Bruger samme browser-UA som AT/IT (LC blokerer
//   projektets default-UA siden 2026-05-04).
//
// Run: node scripts/switzerland/scrape-leadingcourses-ch.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/switzerland/switzerland-clubs-leadingcourses.json'
const SITEMAP_URL = 'https://www.leadingcourses.com/clubs-en.xml'
const CH_FILTER = /\/clubs\/europe\+switzerland\+/
const RATE_LIMIT_MS = 1500
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const COMMON_HEADERS = {
  'User-Agent': USER_AGENT,
  'Accept-Language': 'de-CH,de;q=0.9,fr;q=0.8,it;q=0.7,en;q=0.6',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchClubsList() {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`)
  const r = await fetch(SITEMAP_URL, {
    headers: { ...COMMON_HEADERS, Accept: 'application/xml' },
    signal: AbortSignal.timeout(60000),
  })
  if (!r.ok) throw new Error(`Sitemap HTTP ${r.status}`)
  const text = await r.text()
  const urls = (text.match(/<loc>([^<]+)<\/loc>/g) || []).map((s) =>
    s
      .replace(/<\/?loc>/g, '')
      .trim()
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  )
  return urls.filter((u) => CH_FILTER.test(u))
}

function extractLDJson(html) {
  const matches = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
  for (const m of matches) {
    try {
      const j = JSON.parse(m[1].trim())
      const candidates = Array.isArray(j) ? j : [j]
      for (const o of candidates) {
        if (o['@type'] === 'GolfCourse') {
          const { review, aggregateRating, ...rest } = o
          return {
            ...rest,
            aggregateRating: aggregateRating
              ? {
                  ratingValue: aggregateRating.ratingValue ?? null,
                  reviewCount: aggregateRating.reviewCount ?? null,
                }
              : null,
          }
        }
      }
    } catch {
      /* ignore parse errors */
    }
  }
  return null
}

function extractCoursesSection(html) {
  // English page section "Courses at X" (en-sitemap renders pages in English)
  const h2Match = html.match(
    /<h2[^>]*>\s*Courses?\s+at\s+([^<]+)<\/h2>([\s\S]*?)(?=<h2|$)/i,
  )
  if (!h2Match) return []
  const sectionHtml = h2Match[2]

  const text = sectionHtml
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n\s*\n/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

  const blocks = text
    .split(/More information|Read more/i)
    .map((b) => b.trim())
    .filter(Boolean)
  const courses = []
  for (const b of blocks) {
    if (b.length < 5) continue
    const lines = b.split('\n').map((l) => l.trim()).filter(Boolean)
    if (lines.length < 2) continue
    let name = lines[0]
    if (name === h2Match[1].trim()) name = lines[1] || lines[0]
    let rating = null
    let holes = null
    for (const l of lines) {
      const ratingM = l.match(/^(\d+(?:\.\d+)?)$/)
      if (ratingM && !rating) rating = parseFloat(ratingM[1])
      // English / German / French / Italian holes
      const holesM = l.match(/^(\d+)\s+(?:holes?|löcher?|loch|trous|buche)$/i)
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
      headers: { ...COMMON_HEADERS, Accept: 'text/html' },
      signal: AbortSignal.timeout(45000),
      redirect: 'follow',
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
    const courses = extractCoursesSection(html)
    if (!ld) return { error: 'no LD+JSON GolfCourse', courses }
    return {
      name: ld.name || null,
      address: ld.address?.streetAddress || null,
      addressRegion: ld.address?.addressRegion || null,
      addressCountry: ld.address?.addressCountry || null,
      lat: ld.geo?.latitude ? parseFloat(ld.geo.latitude) : null,
      lon: ld.geo?.longitude ? parseFloat(ld.geo.longitude) : null,
      phone: ld.telephone || null,
      url: ld.url || null,
      priceRange: ld.priceRange || null,
      rating: ld.aggregateRating?.ratingValue
        ? parseFloat(ld.aggregateRating.ratingValue)
        : null,
      reviewCount: ld.aggregateRating?.reviewCount ?? null,
      courses,
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

const urls = await fetchClubsList()
console.log(`Found ${urls.length} CH klubber i LC sitemap`)

mkdirSync('scripts/switzerland', { recursive: true })

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
    console.log(`✓ ${data.name} (${data.courses?.length || 0} courses)`)
    results.push(data)
  }
  if (n < urls.length) await sleep(RATE_LIMIT_MS)
  if (n % 25 === 0) {
    writeFileSync(
      OUT_PATH,
      JSON.stringify(
        {
          country: 'Switzerland',
          iso: 'CH',
          source: 'leadingcourses.com',
          scraped_at: new Date().toISOString(),
          partial: true,
          processed: n,
          total: urls.length,
          clubs: results,
          failures,
        },
        null,
        2,
      ),
    )
  }
}

results.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'de'))
writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Switzerland',
      iso: 'CH',
      source: 'leadingcourses.com',
      scraped_at: new Date().toISOString(),
      partial: false,
      total: urls.length,
      clubs: results,
      failures,
    },
    null,
    2,
  ),
)

const withCoords = results.filter((c) => c.lat && c.lon).length
const withAddress = results.filter((c) => c.address).length
const withCourses = results.filter((c) => c.courses && c.courses.length > 0).length
const totalCourses = results.reduce((s, c) => s + (c.courses?.length || 0), 0)

console.log('')
console.log('--- LC scrape summary ---')
console.log(`Sitemap CH klubber:    ${urls.length}`)
console.log(`Successfully parsed:   ${results.length}`)
console.log(`Failures:              ${failures.length}`)
console.log(`With coords:           ${withCoords}`)
console.log(`With address:          ${withAddress}`)
console.log(`With courses-list:     ${withCourses}`)
console.log(`Total courses rec.:    ${totalCourses}`)
console.log(`Wrote: ${OUT_PATH}`)
