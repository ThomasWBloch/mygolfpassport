// Scrape Belgium klub-finder via golf.be — comprehensive Belgian golf directory.
//
// Discovery (session 31, 2026-05-04):
//   golf.be ("internet referentie voor de golfsport in België") er den primære
//   directory for belgisk golf. Den linker både Vlaamse + Wallonske klubber.
//
//   Phase 1: GET /nl/clubs → server-renderet liste med 89 slug-URLs af form
//            /nl/club/<slug>. 1:1 mapping til DB's 88 distinct klubber.
//
//   Phase 2: For hver klub: GET /nl/club/<slug> → mailto:, tel:, første
//            external href (website), Google Maps href (q=<address>+<plz>+<city>+BE).
//
// Robots.txt fuldt åben (kun /admin/ og /blackhole blokeret). Polite rate-limit
// på 1500ms mellem fetches.
//
// Run: node scripts/belgium/scrape-golfbe-clubs.mjs

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/belgium/be-golfbe-clubs.json'
const RAW_DIR = 'scripts/belgium/raw-golfbe'
const LIST_URL = 'https://www.golf.be/nl/clubs'
const RATE_LIMIT_MS = 1500
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

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
  // Filter out generic/aggregate emails (info@golf.be appears on every page)
  if (s === 'info@golf.be' || s === 'webmaster@golf.be') return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  // Belgian numbers: +32... or 0... — normalize to +32 international
  s = s.replace(/[^\d+]/g, '')
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+32')) return '+32' + s.slice(3).replace(/^0+/, '')
  if (s.startsWith('0')) return '+32' + s.slice(1)
  if (s.length >= 8 && s.length <= 12) return s
  return null
}

function normaliseWebsite(url) {
  if (!url) return null
  let s = String(url).trim().replace(/\s+$/, '')
  if (!/^https?:\/\//i.test(s)) return null
  // Reject golf.be infrastructure / gambling spam (we saw casino-spam in test scrape)
  const SPAM_HOSTS = [
    'casino', 'kaszino', 'krijgen', 'belgischgeluk', 'lalabet', 'dasmedia',
    'artesmotus', 'herbelin', '1000strokes',
  ]
  if (SPAM_HOSTS.some((h) => s.toLowerCase().includes(h))) return null
  return s
}

async function fetchClubList() {
  console.log(`Phase 1: Fetching ${LIST_URL}`)
  const r = await fetch(LIST_URL, {
    method: 'GET',
    headers: { 'User-Agent': UA, Accept: 'text/html' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`)
  const html = await r.text()

  mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/list.html`, html)

  // Match all /nl/club/<slug> hrefs
  const re = /href="(\/nl\/club\/[a-z0-9\-]+)"/g
  const seen = new Set()
  const slugs = []
  let m
  while ((m = re.exec(html)) !== null) {
    const path = m[1]
    if (!seen.has(path)) {
      seen.add(path)
      slugs.push(path)
    }
  }
  return slugs
}

async function fetchClubPage(path, attempt = 1) {
  const url = `https://www.golf.be${path}`
  try {
    const r = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      signal: AbortSignal.timeout(30_000),
      redirect: 'follow',
    })
    if (!r.ok) {
      if (r.status === 429 && attempt < 3) {
        console.log(`  429 — waiting 30s`)
        await sleep(30000)
        return fetchClubPage(path, attempt + 1)
      }
      return { error: `HTTP ${r.status}` }
    }
    return { html: await r.text() }
  } catch (e) {
    if (attempt < 2) {
      await sleep(5000)
      return fetchClubPage(path, attempt + 1)
    }
    return { error: e.message }
  }
}

function parseClubPage(html, path) {
  // Name from <title>...- Clubs</title> (golf.be has no <h1> in club pages).
  // Confirmed structure: every page title ends with " - Clubs".
  const titleM = html.match(/<title[^>]*>([^<]+)<\/title>/)
  let name = null
  if (titleM) {
    const t = decodeEntities(titleM[1]).trim()
    name = t.replace(/\s*[-–]\s*Clubs?\s*$/i, '').trim() || null
  }

  // Use class-targeted selectors so we don't pick up sponsor/social/spam links:
  //   <a class="email_link" href="mailto:...">
  //   <a class="telephone_link" href="tel:...">
  //   <a class="link" href="http..."> (in same <li> as email)
  // The "Routebeschrijving"/"Itinéraire" maps link also has class="link" but
  // its href starts with maps.google — the regex below explicitly excludes that.
  const emailM = html.match(/<a[^>]*class="email_link"[^>]*href="mailto:([^"]+)"/)
  const telM = html.match(/<a[^>]*class="telephone_link"[^>]*href="tel:([^"]+)"/)
  const webM = html.match(
    /<a[^>]*class="link"[^>]*href="(https?:\/\/(?!maps\.google|maps\.app\.goo|(?:www\.)?golf\.be)[^"]+)"/,
  )

  // Address: <li class="address">multi-line text + maps link</li>.
  let address = null
  let postcode = null
  let city = null
  const addrLiM = html.match(/<li class="address">([\s\S]*?)<\/li>/)
  if (addrLiM) {
    let txt = addrLiM[1]
      .replace(/<a[^>]*>[\s\S]*?<\/a>/g, ' ') // drop the embedded maps anchor
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
    txt = decodeEntities(txt)
      .replace(/[ \t]+/g, ' ')
      .replace(/\s*\n\s*/g, '\n')
      .trim()
    address = txt.replace(/\s*\n\s*/g, ', ') || null
    // Belgian PLZ is 4-digit. Extract from any line.
    const plzM = txt.match(/\b(\d{4})\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\-' ]+?)(?:\n|$)/)
    if (plzM) {
      postcode = plzM[1]
      city = plzM[2].trim()
    }
  }

  // If the structured selectors fail, fall back to the Maps q-param for address.
  if (!address) {
    const mapsM = html.match(/href="https?:\/\/maps\.google\.com\/\?q=([^"&]+)/i)
    if (mapsM) {
      const q = decodeURIComponent(mapsM[1].replace(/\+/g, ' '))
      address = q.replace(/,?\s*BE\s*$/, '').trim() || null
      const plzM = q.match(/\b(\d{4})\s+([A-Za-zÀ-ÿ\-' ]+?)(?:\s+BE\b|$)/)
      if (plzM) {
        postcode = plzM[1]
        city = plzM[2].trim()
      }
    }
  }

  const website = webM ? normaliseWebsite(webM[1]) : null
  const email = emailM ? normaliseEmail(emailM[1]) : null
  const phone = telM ? normalisePhone(telM[1]) : null

  return {
    slug: path.split('/').pop(),
    path,
    name,
    address,
    postcode,
    city,
    website,
    email,
    phone,
  }
}

// ── Main ───────────────────────────────────────────────────────────────────
// --reparse: re-parse already-saved raw HTML without refetching. Used to apply
// parser fixes without burning 2-3 min on the polite rate-limited refetch.
const args = process.argv.slice(2)
const REPARSE = args.includes('--reparse')

const clubs = []
const failures = []
let n = 0

if (REPARSE) {
  const { readdirSync } = await import('node:fs')
  let files = []
  try {
    files = readdirSync(RAW_DIR).filter((f) => f.endsWith('.html') && f !== 'list.html')
  } catch (e) {
    console.error(`Cannot read ${RAW_DIR}: ${e.message}`)
    process.exit(1)
  }
  console.log(`Reparse mode: ${files.length} raw HTML files in ${RAW_DIR}`)
  mkdirSync('scripts/belgium', { recursive: true })
  for (const f of files) {
    n++
    const slug = f.replace(/\.html$/, '')
    const path = `/nl/club/${slug}`
    const html = readFileSync(`${RAW_DIR}/${f}`, 'utf8')
    const parsed = parseClubPage(html, path)
    console.log(`[${n}/${files.length}] ${slug}: ${parsed.name || '(no name)'}  ${parsed.website ? 'web' : '   '} ${parsed.email ? 'email' : '     '} ${parsed.phone ? 'tel' : '   '}`)
    clubs.push(parsed)
  }
} else {
  const slugs = await fetchClubList()
  console.log(`  ✓ ${slugs.length} klub-paths fundet`)
  mkdirSync('scripts/belgium', { recursive: true })
  for (const path of slugs) {
    n++
    const slug = path.split('/').pop()
    process.stdout.write(`[${n}/${slugs.length}] ${slug}... `)
    const r = await fetchClubPage(path)
    if (r.error) {
      console.log(`✗ ${r.error}`)
      failures.push({ path, error: r.error })
      if (n < slugs.length) await sleep(RATE_LIMIT_MS)
      continue
    }
    writeFileSync(`${RAW_DIR}/${slug}.html`, r.html)
    const parsed = parseClubPage(r.html, path)
    console.log(`✓ ${parsed.name || '(no name)'}  ${parsed.website ? 'web' : '   '} ${parsed.email ? 'email' : '     '} ${parsed.phone ? 'tel' : '   '}`)
    clubs.push(parsed)
    if (n < slugs.length) await sleep(RATE_LIMIT_MS)
    if (n % 20 === 0) {
      writeFileSync(
        OUT_PATH,
        JSON.stringify(
          { country: 'Belgium', iso: 'BE', source: 'golf.be', partial: true, processed: n, clubs, failures },
          null,
          2,
        ),
      )
    }
  }
}

clubs.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'nl'))

writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'Belgium',
      iso: 'BE',
      source: 'golf.be',
      scraped_at: new Date().toISOString(),
      partial: false,
      total: clubs.length,
      clubs,
      failures,
    },
    null,
    2,
  ),
)

console.log('')
console.log('--- Summary ---')
console.log(`Total klubber:        ${clubs.length}`)
console.log(`With website:         ${clubs.filter((c) => c.website).length}`)
console.log(`With email:           ${clubs.filter((c) => c.email).length}`)
console.log(`With phone:           ${clubs.filter((c) => c.phone).length}`)
console.log(`With address:         ${clubs.filter((c) => c.address).length}`)
console.log(`Failures:             ${failures.length}`)
console.log(`Wrote: ${OUT_PATH}`)
console.log(`Raw HTML in: ${RAW_DIR}/`)
