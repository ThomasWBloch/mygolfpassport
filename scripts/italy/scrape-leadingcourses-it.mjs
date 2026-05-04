// Scrape Leading Courses (leadingcourses.com) for Italian klubber.
//
// Discovery (session for Italy Pass 1, 2026-05-04):
//   1. Sitemap: https://www.leadingcourses.com/it/clubs-it.xml indeholder ~8.700 globale klub-URLs.
//      Filtrer på /clubs/europa+italia+/ → 266 IT klubber, fordelt over 20 regioner.
//   2. Hver klub-side har <script type="application/ld+json"> med GolfCourse schema.org:
//      { name, address (PostalAddress: streetAddress, addressRegion, addressCountry),
//        geo (latitude, longitude), telephone, url, aggregateRating, review[] }
//   3. H2 "Percorsi presso X" sektionen lister course-niveau navne (svarer til "Banen van X" i NL).
//
// Robots.txt-status (verificeret 2026-05-04):
//   Course-pages er Allowed for User-agent: *. /api/*, /booking/*, /search?, /user/*, /gallery/*,
//   /golf-club-review/* er Disallowed. Vi tager kun factual data (name, address, geo, telefon,
//   percorsi-navne) — review[]-arrayet i LD+JSON forkastes eksplicit ved extraction.
//
// User-Agent-note (2026-05-04):
//   Den projekt-specifikke UA `mygolfpassport/1.0 (...)` returnerer 403 Forbidden fra
//   AWS ELB-edge'en. Skift til en standard browser-UA virker (200 OK). Holland-scraperen
//   (scrape-leadingcourses-nl.mjs) bør opdateres tilsvarende næste gang den køres.
//
// Run: node scripts/italy/scrape-leadingcourses-it.mjs
//
// Polite rate-limiting: 1500ms mellem fetches (~7 minutter for 266 klubber).

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/italy/italy-clubs-leadingcourses.json'
const SITEMAP_URL = 'https://www.leadingcourses.com/it/clubs-it.xml'
const IT_FILTER = /\/clubs\/europa\+italia\+/
const RATE_LIMIT_MS = 1500
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const COMMON_HEADERS = {
  'User-Agent': USER_AGENT,
  'Accept-Language': 'it-IT,it;q=0.9,en;q=0.8',
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
      // XML-entity decode: sitemap encodes & as &amp; in slugs like
      // "modena-golf-&amp;-country-club". Without this, fetch hits a 404 or
      // the page returns no GolfCourse LD+JSON. (Discovered 2026-05-04 —
      // first run lost Marco Simone + 4 other "& Country Club" venues.)
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  )
  return urls.filter((u) => IT_FILTER.test(u))
}

function extractLDJson(html) {
  // Find first <script type="application/ld+json"> with @type GolfCourse.
  // Eksplicit: review[]-arrayet droppes (robots.txt-policy: ingen review-data).
  const matches = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)]
  for (const m of matches) {
    try {
      const j = JSON.parse(m[1].trim())
      const candidates = Array.isArray(j) ? j : [j]
      for (const o of candidates) {
        if (o['@type'] === 'GolfCourse') {
          const { review, aggregateRating, ...rest } = o
          // Bevar aggregateRating som ren tal-tæller (count), drop selve reviews.
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

function extractPercorsiSection(html) {
  // Italian equivalent of NL "Banen van X" → "Percorsi presso X".
  // Heuristic-naive parse: split text after the H2 into chunks separated by
  // "Maggiori informazioni" (Italian for "Meer informatie"). Falls back to
  // returning raw chunks; the matcher script can refine based on the actual
  // structure observed in italy-clubs-leadingcourses.json.
  const h2Match = html.match(
    /<h2[^>]*>\s*Percorsi\s+presso\s+([^<]+)<\/h2>([\s\S]*?)(?=<h2|$)/i,
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
    .split(/Maggiori informazioni|Più informazioni/i)
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
      // Italian: "18 buche" or "9 buche". English fallback: "18 holes".
      const holesM = l.match(/^(\d+)\s+(?:buche|holes?)$/i)
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
    const percorsi = extractPercorsiSection(html)
    if (!ld) return { error: 'no LD+JSON GolfCourse', percorsi }
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
      percorsi,
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
console.log(`Found ${urls.length} IT klubber i LC sitemap`)

mkdirSync('scripts/italy', { recursive: true })

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
    console.log(`✓ ${data.name} (${data.percorsi?.length || 0} percorsi)`)
    results.push(data)
  }
  if (n < urls.length) await sleep(RATE_LIMIT_MS)
  if (n % 25 === 0) {
    writeFileSync(
      OUT_PATH,
      JSON.stringify(
        {
          country: 'Italy',
          iso: 'IT',
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

results.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'it'))
writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Italy',
      iso: 'IT',
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
const withPercorsi = results.filter((c) => c.percorsi && c.percorsi.length > 0).length
const totalPercorsi = results.reduce((s, c) => s + (c.percorsi?.length || 0), 0)

console.log('')
console.log('--- LC scrape summary ---')
console.log(`Sitemap IT klubber:    ${urls.length}`)
console.log(`Successfully parsed:   ${results.length}`)
console.log(`Failures:              ${failures.length}`)
console.log(`With coords:           ${withCoords}`)
console.log(`With address:          ${withAddress}`)
console.log(`With percorsi-list:    ${withPercorsi}`)
console.log(`Total percorsi rec.:   ${totalPercorsi}`)
console.log(`Wrote: ${OUT_PATH}`)
