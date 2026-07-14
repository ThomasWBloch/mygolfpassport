// Scrape Portugal via FPG (Federação Portuguesa de Golfe) — public scoring system.
//
// Discovery (session 35, 2026-05-05):
//   FPG eksponerer komplet klub-data via `scoring-pt.datagolf.pt` (legacy ASP-system):
//
//   1. Listing: GET /scripts/all_clubs.asp?club=ALL&ack=8428ACK987
//      → 112 klubber i tabel: kode (3-digit / 912/945/991 admin) + akronym + navn + zona.
//
//   2. Per-klub detail: GET /scripts/club.asp?club_code=XXX&club=ALL&ack=8428ACK987
//      → struktureret HTML med felter: Morada, Cód.Postal, Distrito, Telef.1, Telef.2,
//        Fax, E-Mail, WebSite. Pure server-rendered HTML, intet JS.
//
// Admin-entries (filtreres ud, ikke rigtige klubber):
//   912 PGA - Portugal, 945 A.N.Treinadores, 991 RIO Registo Individual Online
//
// Strategi:
//   Phase 0: hent listing → 112 codes
//   Phase 1: per-klub detail (112 fetches) → contact-data
//   Phase 2: assemble JSON, filter admin, normalisér
//
// Run: node scripts/pt/scrape-fpg-pt.mjs           (full scrape)
//      node scripts/pt/scrape-fpg-pt.mjs --reparse (parse fra cached raw-fpg/)

import { writeFileSync, readFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'

const OUT_PATH = 'scripts/pt/pt-clubs-fpg.json'
const RAW_DIR = 'scripts/pt/raw-fpg'
const BASE = 'https://scoring-pt.datagolf.pt/scripts'
const ACK = '8428ACK987'
const RATE_LIMIT_MS = parseInt(process.env.RATE_MS || '400', 10)
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const REPARSE = process.argv.includes('--reparse')

// Codes considered admin/non-club, excluded from output
const ADMIN_CODES = new Set(['912', '945', '991'])

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
    .replace(/&deg;/g, '°')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&atilde;/g, 'ã')
    .replace(/&otilde;/g, 'õ')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&agrave;/g, 'à')
    .replace(/&acirc;/g, 'â')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Acirc;/g, 'Â')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&Ocirc;/g, 'Ô')
}

function normaliseEmail(email) {
  if (!email) return null
  const s = String(email).trim().toLowerCase()
  // Filter federation generic addresses
  if (/@fpg\.pt$/.test(s)) return null
  if (/@datagolf\.pt$/.test(s)) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  s = s.replace(/[^\d+]/g, '')
  if (!s) return null
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+351')) return s
  if (s.startsWith('351') && s.length >= 12) return '+' + s
  // PT phones are 9 digits → prepend +351
  if (/^\d{9}$/.test(s)) return '+351' + s
  // 11/12 digits with leading something else — skip suspicious
  if (s.length < 7) return null
  return s.startsWith('+') ? s : '+351' + s
}

function normaliseWebsite(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  if (!s) return null
  // Strip trailing punctuation
  s = s.replace(/[.,;]+$/, '')
  // Add https:// if missing scheme
  if (!/^https?:\/\//i.test(s)) {
    if (!/^[\w.-]+\.[a-z]{2,}/i.test(s)) return null
    s = 'https://' + s
  }
  // Validate
  try {
    const u = new globalThis.URL(s)
    if (!u.hostname.includes('.')) return null
    return s.toLowerCase()
  } catch {
    return null
  }
}

async function fetchUrl(url, label) {
  await sleep(RATE_LIMIT_MS)
  const r = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'pt-PT,pt;q=0.9,en;q=0.8',
      Referer: `${BASE}/all_clubs.asp?club=ALL`,
    },
  })
  if (!r.ok) {
    throw new Error(`${label}: HTTP ${r.status} for ${url}`)
  }
  return await r.text()
}

function cacheRaw(name, content) {
  if (!existsSync(RAW_DIR)) mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(`${RAW_DIR}/${name}`, content)
}

function readCachedRaw(name) {
  const p = `${RAW_DIR}/${name}`
  if (!existsSync(p)) return null
  return readFileSync(p, 'utf8')
}

// Parse the listing page
function parseListing(html) {
  // Pattern: club_code=XXX>...akronym...&nbsp;</a>...300>name...zona</td>
  const re =
    /club_code=(\d+)[^>]*>\s*([^&<]+?)\s*&nbsp;\s*<\/a>\s*&nbsp;\s*<\/td>\s*<td[^>]*>\s*([^<]+?)\s*<\/td>\s*\s*<td[^>]*>\s*([^<]+?)\s*<\/td>/gi
  const out = []
  let m
  while ((m = re.exec(html)) !== null) {
    out.push({
      code: m[1],
      acronym: decodeEntities(m[2].trim()),
      name: decodeEntities(m[3].trim()),
      zona: decodeEntities(m[4].trim()),
    })
  }
  return out
}

// Parse a club detail page
function parseClubDetail(html) {
  // Strip scripts/styles
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')

  // Pattern: each field is in a table-cell as label + value
  // Easier: convert to text-stream and grep field markers
  const text = cleaned
    .replace(/<[^>]+>/g, '\n')
    .replace(/&nbsp;/g, ' ')
  const lines = text.split(/\n+/).map((l) => decodeEntities(l).trim()).filter(Boolean)

  const data = {
    name: null,
    morada: null,
    postal: null,
    cidade: null,
    distrito: null,
    phone1: null,
    phone2: null,
    email: null,
    website: null,
  }

  // Name appears on a line after "Clube"; pattern is: ClubeName (CODE)
  for (let i = 0; i < lines.length; i++) {
    const m = /^(.+?)\s*\((\d+)\)$/.exec(lines[i])
    if (m && lines[i - 1] === 'Clube') {
      data.name = m[1].trim()
      break
    }
  }

  // Find label-value pairs across consecutive lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const next = lines[i + 1] || ''
    if (line === 'Morada:') data.morada = next
    else if (line === 'Cidade:') data.cidade = next
    else if (line === 'Cód.Postal:') data.postal = next
    else if (line === 'Distrito:') data.distrito = next
    else if (line === 'Telef.1:') data.phone1 = next
    else if (line === 'Telef.2:') data.phone2 = next
    else if (line === 'E-Mail:') data.email = next
    else if (line === 'WebSite:') data.website = next
  }

  // Some pages have label and value on same line e.g. "Morada: Penina Hotel..."
  // Re-scan for inline form
  const fieldMap = {
    Morada: 'morada',
    Cidade: 'cidade',
    'Cód.Postal': 'postal',
    Distrito: 'distrito',
    'Telef.1': 'phone1',
    'Telef.2': 'phone2',
    'E-Mail': 'email',
    WebSite: 'website',
  }
  for (const line of lines) {
    for (const [label, key] of Object.entries(fieldMap)) {
      const re = new RegExp(`^${label.replace(/\./g, '\\.')}:\\s*(.+)$`)
      const m = re.exec(line)
      if (m && !data[key]) data[key] = m[1].trim()
    }
  }

  // Sanitize: postal/phone fields sometimes have label-text leaks
  for (const k of Object.keys(data)) {
    if (typeof data[k] === 'string') {
      data[k] = data[k].trim()
      if (!data[k]) data[k] = null
      // Strip "label:" suffix that sometimes leaks (next-line was empty)
      if (data[k] && /^(Morada|Cidade|Cód|Distrito|Telef|E-Mail|WebSite|Fax)/i.test(data[k])) {
        data[k] = null
      }
    }
  }

  return data
}

async function run() {
  // PHASE 0: listing
  let listingHtml
  if (REPARSE) {
    listingHtml = readCachedRaw('listing.html')
    if (!listingHtml) throw new Error('No cached listing.html — run without --reparse first')
    console.log('[reparse] using cached listing.html')
  } else {
    console.log('[phase0] fetching listing…')
    const url = `${BASE}/all_clubs.asp?club=ALL&ack=${ACK}`
    listingHtml = await fetchUrl(url, 'listing')
    cacheRaw('listing.html', listingHtml)
  }
  const listing = parseListing(listingHtml)
  console.log(`[phase0] parsed ${listing.length} clubs from listing`)

  // PHASE 1: per-club detail
  const clubs = []
  for (let i = 0; i < listing.length; i++) {
    const entry = listing[i]
    if (ADMIN_CODES.has(entry.code)) {
      console.log(`[phase1] skip admin ${entry.code} ${entry.name}`)
      continue
    }
    const cacheName = `club-${entry.code}.html`
    let html
    if (REPARSE) {
      html = readCachedRaw(cacheName)
      if (!html) {
        console.log(`[reparse] miss ${cacheName}`)
        continue
      }
    } else {
      const url = `${BASE}/club.asp?club_code=${entry.code}&club=ALL&ack=${ACK}`
      try {
        html = await fetchUrl(url, `club ${entry.code}`)
        cacheRaw(cacheName, html)
      } catch (e) {
        console.log(`[phase1] error ${entry.code}: ${e.message}`)
        continue
      }
    }
    const detail = parseClubDetail(html)
    if (!detail.name) detail.name = entry.name

    clubs.push({
      code: entry.code,
      acronym: entry.acronym,
      name_short: entry.name, // listing-form
      name: detail.name, // detail-form (preferred)
      zona: entry.zona,
      address: detail.morada,
      postal: detail.postal,
      city: detail.cidade,
      district: detail.distrito,
      phone: normalisePhone(detail.phone1) || normalisePhone(detail.phone2),
      phone_alt: detail.phone1 && detail.phone2
        ? normalisePhone(detail.phone2)
        : null,
      email: normaliseEmail(detail.email),
      website: normaliseWebsite(detail.website),
      raw_phone1: detail.phone1 || null,
      raw_phone2: detail.phone2 || null,
      raw_email: detail.email || null,
      raw_website: detail.website || null,
    })

    if ((i + 1) % 20 === 0) console.log(`[phase1] ${i + 1}/${listing.length}`)
  }

  // PHASE 2: write
  const out = {
    source: 'fpg.pt (scoring-pt.datagolf.pt)',
    fetched_at: new Date().toISOString(),
    total: clubs.length,
    clubs,
  }
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2))
  console.log(`[done] wrote ${OUT_PATH} (${clubs.length} clubs)`)

  // Quick stats
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
