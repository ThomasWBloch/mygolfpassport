// Scrape Czech Republic via cgf.cz (Česká golfová federace) — public klub + hřiště directory.
//
// Discovery (session 34, 2026-05-05):
//   cgf.cz har TO komplementære public-listings, begge server-renderet HTML uden auth:
//
//   1. Klub-listing: GET /cz/cgf/subjekty-cgf/kluby
//      → 170 klubs i tabel-form, hver række: <a klub?id=N> + ID-number + shortcode + region.
//      Inline-data har INGEN kontakt; man skal hente per-klub detail.
//
//   2. Hřiště-listing: GET /cz/hriste/hriste-vyhledavani[&holesCount=9|18|27...]
//      → 106 hřiště-IDs (union af 9/18/27 jamek filtre). Default-listing returnerer 98.
//      Indoor/Driving filters returnerer 0 via plain GET (kræver POST).
//
//   3. Per-hřiště detail: GET /cz/hriste/detail-hriste?id=N
//      → struktureret tabel <td class="label"> med felter:
//        Adresa, Charakter, GPS (DMS-format), Kraj, Nadmořská výška, Poznámka,
//        Recepce (telefon), Region, Rok otevření, Stát, Typ, WWW
//      → desuden mailto: + tel: + cross-link til klub via "kluby/klub&id=N"
//
//   4. Per-klub detail: GET /cz/cgf/subjekty-cgf/kluby/klub?id=N
//      → mailto: + tel: + adresse. Bruges som fallback for klubs UDEN hřiště-page
//        (indoor-only / driving-only). Også som tiebreaker når hriste-page mangler email.
//
// Strategi:
//   Phase 0: hent og union begge listings → hriste-IDs + klub-IDs
//   Phase 1: per-hřiště detail (106 fetches) → per-course data + klub cross-ref
//   Phase 2: per-klub detail (170 fetches) → fallback contact + grouping
//   Phase 3: assemble club-level JSON med nested courses
//
// GPS-parsing: DMS "49° 9' 21.00'' N, 16° 52' 19.00'' E" → decimal lat/lng
//
// Robots.txt: ikke probet, men polite rate-limit 1500ms.
//
// Run: node scripts/cz/scrape-cgf-cz.mjs           (full scrape)
//      node scripts/cz/scrape-cgf-cz.mjs --reparse (parse fra cached raw-cgf/)

import { writeFileSync, readFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'

const OUT_PATH = 'scripts/cz/cz-clubs-cgf.json'
const RAW_DIR = 'scripts/cz/raw-cgf'
const BASE = 'https://www.cgf.cz'
const RATE_LIMIT_MS = parseInt(process.env.RATE_MS || '400', 10)
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const REPARSE = process.argv.includes('--reparse')

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
}

function normaliseEmail(email) {
  if (!email) return null
  const s = String(email).trim().toLowerCase()
  // Filter generic/federation emails som skadelige (CGF info-bokse)
  if (/@cgf\.cz$/.test(s)) return null
  if (s.startsWith('info@cgf') || s.startsWith('webmaster@')) return null
  if (!/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/.test(s)) return null
  return s
}

function normalisePhone(raw) {
  if (!raw) return null
  let s = String(raw).trim()
  s = s.replace(/[^\d+]/g, '')
  if (s.startsWith('00')) s = '+' + s.slice(2)
  if (s.startsWith('+420')) return s
  if (s.startsWith('420') && s.length >= 12) return '+' + s
  if (s.startsWith('+')) return s // already international (foreign number?)
  if (s.length === 9) return '+420' + s // CZ local 9-digit
  if (s.length >= 8 && s.length <= 12) return s
  return null
}

function normaliseWebsite(url) {
  if (!url) return null
  let s = String(url).trim().replace(/\s+$/, '')
  // CGF skriver ofte "www.foo.cz" uden protokol → tilføj https
  if (/^www\./i.test(s)) s = 'https://' + s
  if (s.startsWith('//')) s = 'https:' + s
  if (!/^https?:\/\//i.test(s)) {
    // Er det bare et domæne? "klub.cz"
    if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/.test(s)) s = 'https://' + s
    else return null
  }
  // Reject CGF infrastructure
  const SELF_HOSTS = ['cgf.cz', 'is.cgf.cz', 'golfista.cgf.cz', 'fls.cgf.cz', 'testy.cgf.cz']
  try {
    const u = new URL(s)
    if (SELF_HOSTS.includes(u.hostname.replace(/^www\./, ''))) return null
  } catch { return null }
  return s
}

// DMS "49° 9' 21.00'' N" → decimal
function dmsToDecimal(dms) {
  if (!dms) return null
  // Eks: "49° 9' 21.00'' N, 16° 52' 19.00'' E"
  const norm = dms
    .replace(/&deg;/g, '°')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/′/g, "'")
    .replace(/″/g, '"')
    .replace(/''/g, '"')
  const re = /(\d+(?:\.\d+)?)°\s*(\d+(?:\.\d+)?)?'?\s*(\d+(?:\.\d+)?)?\s*"?\s*([NSEW])/g
  const matches = [...norm.matchAll(re)]
  if (matches.length < 2) return null
  const out = {}
  for (const m of matches) {
    const deg = parseFloat(m[1] || 0)
    const min = parseFloat(m[2] || 0)
    const sec = parseFloat(m[3] || 0)
    const dir = m[4]
    let dec = deg + min / 60 + sec / 3600
    if (dir === 'S' || dir === 'W') dec = -dec
    if (dir === 'N' || dir === 'S') out.lat = dec
    else out.lng = dec
  }
  return (out.lat != null && out.lng != null) ? out : null
}

function parseHolesFromText(s) {
  if (!s) return null
  // Eks: "18ti jamkové hřiště", "9 jamek", "27 jamkové"
  const m = String(s).match(/(\d+)\s*(?:ti)?\s*(?:jamk|jamek)/i)
  if (m) {
    const h = parseInt(m[1], 10)
    if ([6, 9, 12, 18, 27, 36].includes(h)) return h
  }
  return null
}

async function fetchUrl(url, cacheKey) {
  const path = `${RAW_DIR}/${cacheKey}`
  if (REPARSE && existsSync(path)) {
    return readFileSync(path, 'utf8')
  }
  if (existsSync(path) && !REPARSE) {
    // Cache hit even uden --reparse → genbrug
    return readFileSync(path, 'utf8')
  }
  const r = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
  })
  if (!r.ok) {
    console.warn(`  HTTP ${r.status} ${url}`)
    return null
  }
  const html = await r.text()
  mkdirSync(RAW_DIR, { recursive: true })
  writeFileSync(path, html, 'utf8')
  await sleep(RATE_LIMIT_MS)
  return html
}

async function fetchListings() {
  const ids = { hriste: new Set(), klub: new Set() }
  const hristeQueries = [
    '',
    '&holesCount=9',
    '&holesCount=18',
    '&holesCount=27&holesCountMax=-1',
  ]
  for (const q of hristeQueries) {
    const cacheKey = `listing-hriste${q.replace(/[^a-z0-9]/gi, '_')}.html`
    const html = await fetchUrl(`${BASE}/cz/hriste/hriste-vyhledavani${q}`, cacheKey)
    if (!html) continue
    const matches = [...html.matchAll(/detail-hriste[^"]*id=(\d+)/g)]
    for (const m of matches) ids.hriste.add(parseInt(m[1], 10))
  }
  const klubHtml = await fetchUrl(`${BASE}/cz/cgf/subjekty-cgf/kluby`, 'listing-kluby.html')
  if (klubHtml) {
    const matches = [...klubHtml.matchAll(/kluby\/klub\?id=(\d+)/g)]
    for (const m of matches) ids.klub.add(parseInt(m[1], 10))
    // Også klub metadata fra listing: shortcode + region + kraj
    const klubMeta = {}
    // <td><a klub?id=N title="Name">Name</a></td><td class="number">194</td><td>BENAG</td><td>C</td><td>Středočeský kraj</td>
    const rowRe = /<a href="\/cz\/cgf\/subjekty-cgf\/kluby\/klub\?id=(\d+)" title="([^"]+)"[^>]*>[^<]+<\/a>\s*<\/td>\s*<td[^>]*>(\d+)<\/td>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>/g
    for (const m of klubHtml.matchAll(rowRe)) {
      klubMeta[parseInt(m[1], 10)] = {
        klubId: parseInt(m[1], 10),
        name: decodeEntities(m[2]).trim(),
        clubNumber: parseInt(m[3], 10),
        shortcode: decodeEntities(m[4]).trim(),
        regionLetter: decodeEntities(m[5]).trim(),
        kraj: decodeEntities(m[6]).trim(),
      }
    }
    ids._klubMeta = klubMeta
  }
  return ids
}

function parseHristeDetail(html, hristeId) {
  if (!html) return null
  const out = { hristeId, source: 'cgf-hriste' }
  // Title
  const t = html.match(/<h1 class="contentpage-headline1">([^<]+)<\/h1>/)
  if (t) out.name = decodeEntities(t[1]).trim()
  // Tabel-felter
  const trRe = /<tr><td class="label">([^<]+)<\/td><td>([\s\S]*?)<\/td><\/tr>/g
  for (const m of html.matchAll(trRe)) {
    const label = decodeEntities(m[1]).trim()
    const rawVal = m[2]
    const text = decodeEntities(rawVal.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')).trim()
    switch (label) {
      case 'WWW': {
        const a = rawVal.match(/href="([^"]+)"/)
        out.website = normaliseWebsite(a ? a[1] : text)
        break
      }
      case 'GPS': {
        out.gpsRaw = text
        const c = dmsToDecimal(text)
        if (c) { out.lat = c.lat; out.lng = c.lng }
        break
      }
      case 'Adresa': out.address = text; break
      case 'Recepce': {
        // ofte href="tel:..."
        const a = rawVal.match(/href="tel:([^"]+)"/)
        out.phone = normalisePhone(a ? a[1] : text)
        break
      }
      case 'Typ': out.typ = text; break
      case 'Kraj': out.kraj = text; break
      case 'Region': out.region = text; break
      case 'Rok otevření': out.yearOpened = text; break
      case 'Nadmořská výška': out.altitude = text; break
      case 'Charakter': {
        out.character = text
        const h = parseHolesFromText(text)
        if (h) out.holes = h
        break
      }
      case 'Stát': out.country = text; break
      case 'Poznámka': out.note = text; break
    }
  }
  // Klub cross-ref
  const xref = html.match(/kluby\/klub[?&]id=(\d+)/)
  if (xref) out.klubIdRef = parseInt(xref[1], 10)
  // Email (mailto:) — kun den FØRSTE non-CGF mailto
  const mailtos = [...html.matchAll(/mailto:([^"]+)/g)]
  for (const m of mailtos) {
    const e = normaliseEmail(m[1])
    if (e) { out.email = e; break }
  }
  // Phone fallback: scan tel: links hvis Recepce mangler
  if (!out.phone) {
    const tels = [...html.matchAll(/href="tel:([^"]+)"/g)]
    for (const m of tels) {
      const p = normalisePhone(m[1])
      if (p) { out.phone = p; break }
    }
  }
  return out
}

function parseKlubDetail(html, klubId) {
  if (!html) return null
  const out = { klubId, source: 'cgf-klub' }
  const t = html.match(/<h1 class="contentpage-headline1">([^<]+)<\/h1>/)
  if (t) out.name = decodeEntities(t[1]).trim()
  // STRUKTURERET extraction via class="contactItem" blocks.
  // Klub-pages eksponerer KUN E-mail og Telefon i deres contact-blocks (tjekket
  // mod 170 raw klub-files — ingen Web/WWW/Stránka label findes). Website-feltet
  // findes IKKE på klub-pages → vi hopper det helt over og lader hřiště-pagen
  // være eneste website-kilde. Ellers kommer Skoda-sponsor / EGA-calendar /
  // bank-links snigende ind som false-positive.
  const itemRe = /<div class="contactItem">[\s\S]*?<span class="contactLabel">([^<]+)<\/span>[\s\S]*?<span class="contactValue">([\s\S]*?)<\/span>[\s\S]*?<\/div>/g
  for (const m of html.matchAll(itemRe)) {
    const label = decodeEntities(m[1]).trim()
    const valueHtml = m[2]
    if (/E-?mail/i.test(label)) {
      const a = valueHtml.match(/mailto:([^"]+)/)
      const e = normaliseEmail(a ? a[1] : decodeEntities(valueHtml.replace(/<[^>]+>/g, '').trim()))
      if (e && !out.email) out.email = e
    } else if (/Telefon|Tel\./i.test(label)) {
      const a = valueHtml.match(/href="tel:([^"]+)"/)
      const p = normalisePhone(a ? a[1] : decodeEntities(valueHtml.replace(/<[^>]+>/g, '').trim()))
      if (p && !out.phone) out.phone = p
    }
  }
  return out
}

async function main() {
  console.log(`CZ CGF scrape — REPARSE=${REPARSE}`)
  mkdirSync(RAW_DIR, { recursive: true })

  console.log('Phase 0: listings…')
  const ids = await fetchListings()
  const hristeIds = [...ids.hriste].sort((a, b) => a - b)
  const klubIds = [...ids.klub].sort((a, b) => a - b)
  console.log(`  hřiště: ${hristeIds.length}, klub: ${klubIds.length}`)

  console.log('Phase 1: per-hřiště detail…')
  const hristeData = []
  let i = 0
  for (const hid of hristeIds) {
    i++
    const html = await fetchUrl(`${BASE}/cz/hriste/detail-hriste?id=${hid}`, `hriste-${hid}.html`)
    const parsed = parseHristeDetail(html, hid)
    if (parsed && parsed.name) hristeData.push(parsed)
    if (i % 20 === 0) console.log(`  ${i}/${hristeIds.length} (latest: ${parsed?.name})`)
  }
  console.log(`  ${hristeData.length} hřiště parsed`)

  console.log('Phase 2: per-klub detail…')
  const klubData = []
  i = 0
  for (const kid of klubIds) {
    i++
    const html = await fetchUrl(`${BASE}/cz/cgf/subjekty-cgf/kluby/klub?id=${kid}`, `klub-${kid}.html`)
    const parsed = parseKlubDetail(html, kid)
    if (parsed && parsed.name) {
      // Merge listing-meta
      const meta = ids._klubMeta?.[kid]
      if (meta) Object.assign(parsed, meta)
      klubData.push(parsed)
    }
    if (i % 30 === 0) console.log(`  ${i}/${klubIds.length} (latest: ${parsed?.name})`)
  }
  console.log(`  ${klubData.length} klubs parsed`)

  // Phase 3: assemble club-grouped output
  // Group hřiště by klubIdRef; for klubs uden hřiště → klub-only entry
  const byKlub = new Map()
  for (const k of klubData) byKlub.set(k.klubId, { ...k, courses: [] })
  for (const h of hristeData) {
    const kid = h.klubIdRef
    if (kid && byKlub.has(kid)) {
      byKlub.get(kid).courses.push(h)
    } else {
      // Standalone hřiště (intet klub-cross-ref eller klub ikke i listing)
      const synthKey = `h${h.hristeId}`
      byKlub.set(synthKey, {
        klubId: null,
        synthKey,
        name: h.name,
        source: 'cgf-hriste-only',
        courses: [h],
      })
    }
  }

  // Hejs klub-level kontakt op fra første course
  // PREFER hriste-website over klub-website (hriste har struktureret WWW-felt;
  // klub-page er fri HTML hvor noise sniger sig ind, fx ega-golf.ch calendar link).
  for (const k of byKlub.values()) {
    if (k.courses.length === 0) continue
    const c0 = k.courses[0]
    if (c0.website) {
      // Hriste-website altid primær når den findes
      if (k.website && k.website !== c0.website) k.websiteKlubAlt = k.website
      k.website = c0.website
      k.websiteFrom = 'hriste'
    }
    if (!k.email && c0.email) { k.email = c0.email; k.emailFrom = 'hriste' }
    if (!k.phone && c0.phone) { k.phone = c0.phone; k.phoneFrom = 'hriste' }
  }

  const out = [...byKlub.values()]
  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8')
  // Coverage stats
  const total = out.length
  const wsAtKlub = out.filter((k) => k.website).length
  const emAtKlub = out.filter((k) => k.email).length
  const phAtKlub = out.filter((k) => k.phone).length
  const totalCourses = out.reduce((s, k) => s + k.courses.length, 0)
  const coursesWithCoords = out.flatMap((k) => k.courses).filter((c) => c.lat && c.lng).length
  const coursesWithHoles = out.flatMap((k) => k.courses).filter((c) => c.holes).length
  console.log(`\n=== Coverage ===`)
  console.log(`  Klubs: ${total} | website ${wsAtKlub} (${((wsAtKlub/total)*100).toFixed(1)}%) | email ${emAtKlub} (${((emAtKlub/total)*100).toFixed(1)}%) | phone ${phAtKlub} (${((phAtKlub/total)*100).toFixed(1)}%)`)
  console.log(`  Courses: ${totalCourses} | coords ${coursesWithCoords} (${((coursesWithCoords/totalCourses)*100).toFixed(1)}%) | holes ${coursesWithHoles} (${((coursesWithHoles/totalCourses)*100).toFixed(1)}%)`)
  console.log(`Wrote ${OUT_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
