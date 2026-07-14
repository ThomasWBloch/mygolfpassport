// Scrape France klub-finder via ffgolf.org — Fédération Française de Golf.
//
// Discovery (session 32, 2026-05-05):
//   ffgolf.org's klub-detail-pages er den primære directory for fransk golf.
//   Phase 1 i Session 23 brugte browser-localStorage chunking pga. tab-frys
//   ved store JS-injektioner — det var en arkitektur-detalje, ikke en data-
//   detalje. Direkte curl til detail-page virker uden problemer.
//
//   Phase 1: GET sitemap.xml → 747 URLs af form
//            /parcours-detours/guide-des-golfs/<slug>
//
//   Phase 2: For hver klub: GET detail-page → struktureret HTML med
//            label-value-par i ensartet pattern:
//              <span class="font-weight-500 text-capitalize">LABEL :</span>
//              <span class="lh-20"><a href="VALUE" ...>DISPLAY</a></span>
//            Labels: "téléphone", "e-mail", "site web", "adresse"
//
// robots.txt fuldt åben (Allow:WebSurge user-agent special, * Disallow er tom).
// Polite rate-limit 1500ms mellem fetches.
//
// Run: node scripts/france/scrape-ffgolf-france.mjs
// Reparse uden refetch: node scripts/france/scrape-ffgolf-france.mjs --reparse

import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/france/fr-ffgolf-clubs.json'
const RAW_DIR = 'scripts/france/raw-ffgolf'
const SITEMAP_URL = 'https://www.ffgolf.org/sitemap.xml'
const RATE_LIMIT_MS = 1500
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
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
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&agrave;/g, 'à')
    .replace(/&acirc;/g, 'â')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&ucirc;/g, 'û')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&icirc;/g, 'î')
    .replace(/&ouml;/g, 'ö')
    .replace(/&nbsp;/g, ' ')
}

function normaliseEmail(email) {
  if (!email) return null
  const s = String(email).trim().toLowerCase()
  if (s === 'contact@ffgolf.org' || s === 'info@ffgolf.org') return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  s = s.replace(/[^\d+]/g, '')
  // French numbers: +33... or 0X... — normalize to +33 international
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+33')) {
    const rest = s.slice(3).replace(/^0+/, '')
    if (/^\d{9}$/.test(rest)) {
      return '+33 ' + rest.slice(0, 1) + ' ' + rest.slice(1, 3) + ' ' + rest.slice(3, 5) + ' ' + rest.slice(5, 7) + ' ' + rest.slice(7, 9)
    }
    return '+33 ' + rest
  }
  if (/^0\d{9}$/.test(s)) {
    return '+33 ' + s.slice(1, 2) + ' ' + s.slice(2, 4) + ' ' + s.slice(4, 6) + ' ' + s.slice(6, 8) + ' ' + s.slice(8, 10)
  }
  if (s.length >= 8 && s.length <= 13) return s
  return null
}

function normaliseWebsite(url) {
  if (!url) return null
  let s = String(url).trim().replace(/\s+$/, '')
  if (!/^https?:\/\//i.test(s)) {
    if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(s)) s = 'https://' + s
    else return null
  }
  // Reject ffgolf infrastructure / social-media / known-spam
  const SPAM_HOSTS = [
    'ffgolf.org', 'facebook.com', 'twitter.com', 'instagram.com',
    'youtube.com', 'tiktok.com', 'linkedin.com',
  ]
  const lower = s.toLowerCase()
  if (SPAM_HOSTS.some((h) => lower.includes(h))) return null
  return s
}

async function fetchSitemapClubs() {
  console.log(`Phase 1: Fetching ${SITEMAP_URL}`)
  const r = await fetch(SITEMAP_URL, {
    method: 'GET',
    headers: { 'User-Agent': UA, Accept: 'application/xml' },
    signal: AbortSignal.timeout(60_000),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status} ${r.statusText}`)
  const xml = await r.text()
  mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/sitemap.xml`, xml)

  const re = /https:\/\/www\.ffgolf\.org\/parcours-detours\/guide-des-golfs\/([a-z0-9\-]+)/g
  const seen = new Set()
  const slugs = []
  let m
  while ((m = re.exec(xml)) !== null) {
    if (!seen.has(m[1])) {
      seen.add(m[1])
      slugs.push(m[1])
    }
  }
  return slugs
}

async function fetchClubPage(slug, attempt = 1) {
  const url = `https://www.ffgolf.org/parcours-detours/guide-des-golfs/${slug}`
  try {
    const r = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': UA, Accept: 'text/html' },
      signal: AbortSignal.timeout(45_000),
      redirect: 'follow',
    })
    if (!r.ok) {
      if (r.status === 429 && attempt < 3) {
        console.log(`  429 — waiting 30s`)
        await sleep(30000)
        return fetchClubPage(slug, attempt + 1)
      }
      return { error: `HTTP ${r.status}` }
    }
    return { html: await r.text() }
  } catch (e) {
    if (attempt < 2) {
      await sleep(5000)
      return fetchClubPage(slug, attempt + 1)
    }
    return { error: e.message }
  }
}

// Generic label-value extractor for ffgolf's structured contact-block.
// Pattern (verified across multiple clubs):
//   <span class="font-weight-500 text-capitalize">LABEL :</span>
//   <span class="lh-20"><a href="HREF" ...>TEXT</a></span>
//
// Two-step approach: first capture the lh-20 inner content, then extract
// the optional <a href="..."> from the inner content. Combining alternation
// with non-greedy quantifiers in a single regex hits a JS pitfall where the
// empty-string branch silently wins.
function extractLabelValue(html, label) {
  const labelPattern = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(
    '<span[^>]*class="font-weight-500 text-capitalize"[^>]*>\\s*' +
      labelPattern +
      '\\s*:\\s*</span>\\s*<span[^>]*class="lh-20"[^>]*>([\\s\\S]*?)</span>',
    'i',
  )
  const m = html.match(re)
  if (!m) return null
  const inner = m[1]
  const linkM = inner.match(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i)
  let href = null
  let text
  if (linkM) {
    href = linkM[1]
    text = linkM[2]
  } else {
    text = inner
  }
  text = decodeEntities(text.replace(/<[^>]+>/g, ' ')).trim().replace(/\s+/g, ' ')
  return { href, text }
}

function parseClubPage(html, slug) {
  // Name from <h1>
  const h1M = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)
  let name = null
  if (h1M) {
    name = decodeEntities(h1M[1].replace(/<[^>]+>/g, ' ').trim().replace(/\s+/g, ' '))
  }

  const phoneRow = extractLabelValue(html, 'téléphone')
  const emailRow = extractLabelValue(html, 'e-mail')
  const webRow = extractLabelValue(html, 'site web')
  const addrRow = extractLabelValue(html, 'adresse')

  const phone = phoneRow
    ? normalisePhone((phoneRow.href || '').replace(/^tel:/i, '') || phoneRow.text)
    : null
  const email = emailRow
    ? normaliseEmail((emailRow.href || '').replace(/^mailto:/i, '') || emailRow.text)
    : null
  const website = webRow ? normaliseWebsite(webRow.href || webRow.text) : null

  // Address parse: ffgolf uses "Street\nPLZ CITY" format inside the <a>.
  let address = null
  let postcode = null
  let city = null
  let lat = null
  let lon = null
  if (addrRow) {
    const t = (addrRow.text || '').trim()
    // PLZ in France is 5 digits
    const plzM = t.match(/(\d{5})\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\-' ]+?)\s*$/)
    if (plzM) {
      postcode = plzM[1]
      city = plzM[2].trim()
    }
    address = t.replace(/\s+/g, ' ').trim() || null
    // Lat/lon from maps URL: https://www.google.com/maps/dir//LAT,LON
    if (addrRow.href) {
      const ll = addrRow.href.match(/\/(-?\d+\.\d+),(-?\d+\.\d+)/)
      if (ll) {
        const la = parseFloat(ll[1])
        const lo = parseFloat(ll[2])
        // Skip the 0,0 sentinel that ffgolf uses for unverified locations
        if (!(la === 0 && lo === 0) && Math.abs(la) <= 90 && Math.abs(lo) <= 180) {
          lat = la
          lon = lo
        }
      }
    }
  }

  return {
    slug,
    name,
    address,
    postcode,
    city,
    lat,
    lon,
    website,
    email,
    phone,
  }
}

// ── Main ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const REPARSE = args.includes('--reparse')

const clubs = []
const failures = []
let n = 0

if (REPARSE) {
  const { readdirSync } = await import('node:fs')
  let files = []
  try {
    files = readdirSync(RAW_DIR).filter((f) => f.endsWith('.html') && f !== 'sitemap.html')
  } catch (e) {
    console.error(`Cannot read ${RAW_DIR}: ${e.message}`)
    process.exit(1)
  }
  console.log(`Reparse mode: ${files.length} raw HTML files in ${RAW_DIR}`)
  mkdirSync('scripts/france', { recursive: true })
  for (const f of files) {
    n++
    const slug = f.replace(/\.html$/, '')
    const html = readFileSync(`${RAW_DIR}/${f}`, 'utf8')
    const parsed = parseClubPage(html, slug)
    console.log(
      `[${n}/${files.length}] ${slug}: ${parsed.name || '(no name)'} ${parsed.website ? 'web' : '   '} ${parsed.email ? 'email' : '     '} ${parsed.phone ? 'tel' : '   '}${parsed.lat != null ? ' geo' : '    '}`,
    )
    clubs.push(parsed)
  }
} else {
  const slugs = await fetchSitemapClubs()
  console.log(`  ✓ ${slugs.length} klub-slugs fundet i sitemap`)
  mkdirSync('scripts/france', { recursive: true })
  for (const slug of slugs) {
    n++
    process.stdout.write(`[${n}/${slugs.length}] ${slug}... `)
    const r = await fetchClubPage(slug)
    if (r.error) {
      console.log(`✗ ${r.error}`)
      failures.push({ slug, error: r.error })
      if (n < slugs.length) await sleep(RATE_LIMIT_MS)
      continue
    }
    writeFileSync(`${RAW_DIR}/${slug}.html`, r.html)
    const parsed = parseClubPage(r.html, slug)
    console.log(
      `✓ ${parsed.name || '(no name)'}  ${parsed.website ? 'web' : '   '} ${parsed.email ? 'email' : '     '} ${parsed.phone ? 'tel' : '   '}${parsed.lat != null ? ' geo' : '    '}`,
    )
    clubs.push(parsed)
    if (n < slugs.length) await sleep(RATE_LIMIT_MS)
    if (n % 25 === 0) {
      writeFileSync(
        OUT_PATH,
        JSON.stringify(
          { country: 'France', iso: 'FR', source: 'ffgolf.org', partial: true, processed: n, clubs, failures },
          null,
          2,
        ),
      )
    }
  }
}

clubs.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'fr'))

writeFileSync(
  OUT_PATH,
  JSON.stringify(
    {
      country: 'France',
      iso: 'FR',
      source: 'ffgolf.org',
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
console.log(`With lat/lon:         ${clubs.filter((c) => c.lat != null).length}`)
console.log(`Failures:             ${failures.length}`)
console.log(`Wrote: ${OUT_PATH}`)
console.log(`Raw HTML in: ${RAW_DIR}/`)
