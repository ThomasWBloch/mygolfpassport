// Scrape Nordic clubs (DK/IS/NO/SE) via golfbox.dk's GolfGuide JSONP API.
//
// Discovery (session 34, 2026-05-05):
//   GolfBox A/S driver booking-system for nordiske klubber. Public API findes på
//   golfguide.golfbox.dk:
//
//   Listing:
//     GET /WebServices/ScriptHandler.ashx?methodName=GetClubsByRegion
//         &callback=cb&countryISOCode={DK|IS|NO|SE}
//     → JSONP: cb([{GUID, Name}, ...])
//
//   Detail:
//     GET /WebServices/ScriptHandler.ashx?methodName=GetClub
//         &callback=cb&guid={GUID}
//     → JSONP: cb({GUID, Name, MapLat, MapLng, Data:{
//         Phones, Emails, Addresses, Courses, ClubAttributes, ...
//       }, ...})
//
//   Phones/Emails arrays er ofte null på DK; den rigtige kontaktdata ligger i
//   Data.ClubAttributes som key/value-array med keys:
//     CLUB_CLUB_PHONE, CLUB_CLUB_EMAIL, CLUB_CLUB_WEBSITE, CLUB_HOMEPAGE
//     CLUB_OFFICE_PHONE, CLUB_OFFICE_EMAIL (backup)
//     CLUB_PROSHOP_PHONE, CLUB_PROSHOP_EMAIL (anden backup)
//     CLUB_CHAIRMAN, CLUB_SECRETARY (kontakt-personer)
//
//   Coverage observed:
//     DK 192 klubs, IS 63, NO 175, SE 456 = 886 total.
//     FI tom (bruger andet system).
//     UK eksisterer på golfbox.co.uk men Cloudflare-protected (out of scope).
//
// Run: node scripts/nordic/scrape-golfbox.mjs           (full)
//      node scripts/nordic/scrape-golfbox.mjs --reparse (parse fra cache)
//      RATE_MS=200 node scripts/nordic/scrape-golfbox.mjs (faster)
//      COUNTRIES=DK,IS node scripts/nordic/scrape-golfbox.mjs (subset)

import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs'

const RAW_DIR = 'scripts/nordic/raw-golfbox'
const HOST = 'https://golfguide.golfbox.dk'
const RATE_LIMIT_MS = parseInt(process.env.RATE_MS || '300', 10)
const REPARSE = process.argv.includes('--reparse')
const COUNTRIES = (process.env.COUNTRIES || 'DK,IS,NO,SE').split(',')

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function unwrapJsonp(text) {
  if (!text) return null
  // cb(...)  — strip wrapper
  const m = text.match(/^[a-zA-Z_][a-zA-Z0-9_]*\((.*)\)\s*;?\s*$/s)
  if (!m) return null
  try { return JSON.parse(m[1]) } catch { return null }
}

function normaliseEmail(s) {
  if (!s) return null
  const v = String(s).trim().toLowerCase()
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(v)) return null
  // Skip generic noreply / federation-noise
  if (/(noreply|no-reply|info@golfbox\.dk|gbsupport|admin@golfbox)/i.test(v)) return null
  return v
}

function normalisePhone(s, cc) {
  if (!s) return null
  let v = String(s).trim().replace(/[^\d+]/g, '')
  if (!v) return null
  if (v.startsWith('00')) v = '+' + v.slice(2)
  // Country prefixes
  const PREFIX = { DK: '+45', SE: '+46', NO: '+47', IS: '+354' }
  const px = PREFIX[cc]
  if (v.startsWith('+')) return v
  if (px) {
    // Strip national 0-prefix
    if (v.startsWith('0')) v = v.slice(1)
    return px + v
  }
  return v.length >= 6 ? v : null
}

function normaliseWebsite(s) {
  if (!s) return null
  let v = String(s).trim()
  if (!v) return null
  if (/^www\./i.test(v)) v = 'https://' + v
  if (v.startsWith('//')) v = 'https:' + v
  if (!/^https?:\/\//i.test(v)) {
    if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(v)) v = 'https://' + v
    else return null
  }
  // Reject obvious noise / golfbox-internal hosts
  if (/golfbox\.(dk|com|com\.au|fi)/i.test(v)) return null
  try { new URL(v) } catch { return null }
  return v
}

function pickAttr(attrs, ...keys) {
  if (!attrs) return null
  for (const k of keys) {
    const hit = attrs.find((a) => a.Key === k)
    if (hit && hit.Value && String(hit.Value).trim() !== '') return String(hit.Value).trim()
  }
  return null
}

async function fetchJsonp(url, cacheKey) {
  const path = `${RAW_DIR}/${cacheKey}`
  if (existsSync(path)) {
    const t = readFileSync(path, 'utf8')
    if (REPARSE || true) return unwrapJsonp(t) // always reuse cache
  }
  const r = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Referer: 'https://www.golfbox.dk/',
      Accept: 'application/javascript, text/javascript',
    },
  })
  if (!r.ok) {
    console.warn(`  HTTP ${r.status} ${url}`)
    return null
  }
  const text = await r.text()
  mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(path, text, 'utf8')
  await sleep(RATE_LIMIT_MS)
  return unwrapJsonp(text)
}

async function fetchClubList(cc) {
  const url = `${HOST}/WebServices/ScriptHandler.ashx?methodName=GetClubsByRegion&callback=cb&countryISOCode=${cc}`
  return await fetchJsonp(url, `list-${cc}.txt`)
}

async function fetchClubDetail(guid) {
  const url = `${HOST}/WebServices/ScriptHandler.ashx?methodName=GetClub&callback=cb&guid=${guid}`
  return await fetchJsonp(url, `club-${guid}.txt`)
}

function flatten(detail, cc) {
  if (!detail) return null
  const attrs = detail.Data?.ClubAttributes || []
  const out = {
    countryISOCode: detail.CountryISOCode || cc,
    guid: detail.GUID,
    id: detail.ID,
    name: detail.Name,
    displayName: detail.DisplayName,
    shortName: detail.ShortName,
    lat: detail.MapLat ? parseFloat(detail.MapLat) : null,
    lng: detail.MapLng ? parseFloat(detail.MapLng) : null,
    regionGuid: detail.RegionGUID,
  }
  // Address
  const addr = detail.Data?.Addresses?.[0]
  if (addr) {
    out.address = [addr.Addr, addr.AddrInfo1, addr.AddrInfo2].filter(Boolean).join(', ')
    out.postalCode = addr.PostalCode
    out.postalAddress = addr.PostalAddress
  }
  // Contact: DK bruger CLUB_-prefix; SE bruger uden prefix.
  // Probe begge varianter for hvert felt.
  out.website = normaliseWebsite(
    pickAttr(attrs,
      'CLUB_CLUB_WEBSITE', 'CLUB_HOMEPAGE',
      'CLUB_OFFICE_HOMEPAGE', 'CLUB_PROSHOP_HOMEPAGE',
      // SE-prefix variants
      'OFFICE_HOMEPAGE', 'PROSHOP_HOMEPAGE', 'HOMEPAGE',
    ),
  )
  out.phone = normalisePhone(
    pickAttr(attrs,
      'CLUB_CLUB_PHONE', 'CLUB_OFFICE_PHONE', 'CLUB_PROSHOP_PHONE',
      'OFFICE_PHONE', 'PROSHOP_PHONE',
    ),
    cc,
  )
  out.email = normaliseEmail(
    pickAttr(attrs,
      'CLUB_CLUB_EMAIL', 'CLUB_OFFICE_EMAIL', 'CLUB_PROSHOP_EMAIL',
      'OFFICE_EMAIL', 'PROSHOP_EMAIL',
    ),
  )
  // Bonus metadata
  out.chairman = pickAttr(attrs, 'CLUB_CHAIRMAN')
  out.secretary = pickAttr(attrs, 'CLUB_SECRETARY')
  out.policy = pickAttr(attrs, 'CLUB_POLICY')
  // Phones-array fallback
  if (!out.phone && Array.isArray(detail.Data?.Phones)) {
    for (const p of detail.Data.Phones) {
      const v = normalisePhone(p?.Number || p, cc)
      if (v) { out.phone = v; break }
    }
  }
  // Emails-array fallback (SE bruger primært denne — Email-keys i ClubAttributes
  // er ofte tomme på SE-klubber). Felt-navnet er EmailAddress, ikke Address.
  if (!out.email && Array.isArray(detail.Data?.Emails)) {
    for (const e of detail.Data.Emails) {
      const v = normaliseEmail(e?.EmailAddress || e?.Address || e)
      if (v) { out.email = v; break }
    }
  }
  // Courses summary
  out.courses = (detail.Data?.Courses || []).map((c) => ({
    name: c.Name?.trim(),
    holes: c.Loop?.Holes?.length || null,
    par: c.Loop?.Holes?.reduce((s, h) => s + (h.Par || 0), 0) || null,
  }))
  return out
}

async function main() {
  console.log(`GolfBox scrape — countries=${COUNTRIES.join(',')} rate=${RATE_LIMIT_MS}ms`)
  mkdirSync(RAW_DIR, { recursive: true })

  for (const cc of COUNTRIES) {
    console.log(`\n=== ${cc} ===`)
    const list = await fetchClubList(cc)
    if (!list || !Array.isArray(list)) {
      console.warn(`  no list for ${cc}`)
      continue
    }
    console.log(`  ${list.length} klubber listed`)
    const out = []
    let i = 0
    for (const summary of list) {
      i++
      const detail = await fetchClubDetail(summary.GUID)
      const flat = flatten(detail, cc)
      if (flat) out.push(flat)
      if (i % 25 === 0) console.log(`  ${i}/${list.length} (${flat?.name})`)
    }
    const outPath = `scripts/nordic/golfbox-clubs-${cc.toLowerCase()}.json`
    writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8')
    const ws = out.filter((x) => x.website).length
    const ph = out.filter((x) => x.phone).length
    const em = out.filter((x) => x.email).length
    const co = out.filter((x) => x.lat && x.lng).length
    console.log(`  ${cc}: ws=${ws} ph=${ph} em=${em} coords=${co}`)
    console.log(`  wrote ${outPath}`)
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
