// Scrape Portuguese golf clubs from FPG (Federação Portuguesa de Golfe).
// Two-step pipeline:
//   1. Roster:   https://jogargolfe.fpg.pt/listagem-de-campos/  →  (region, ncourse_id, list_name)
//   2. Metadata: https://scoring-pt.datagolf.pt/scripts/course.asp?ncourse={id}&ack=...&club=ALL
// Run: node scripts/portugal/scrape-fpg.mjs

import { writeFileSync, mkdirSync } from 'node:fs'

const OUT_PATH = 'scripts/portugal/portugal-clubs-fpg.json'
const LISTAGEM_URL = 'https://jogargolfe.fpg.pt/listagem-de-campos/'
const COURSE_URL = (id) =>
  `https://scoring-pt.datagolf.pt/scripts/course.asp?ncourse=${id}&ack=8428ACK987&club=ALL`
const UA = 'mygolfpassport/1.0 (portugal scrape; thomasbloch74@gmail.com)'
const DELAY_MS = 1000

const REGIONS = ['Zona Norte', 'Zona Centro', 'Lisboa', 'Algarve', 'Ilhas']

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchText(url, attempt = 1) {
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
      signal: AbortSignal.timeout(30000),
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    return await resp.text()
  } catch (err) {
    if (attempt < 3) {
      console.log(`  retry ${attempt + 1}/3 (${err.message})`)
      await sleep(2000 * attempt)
      return fetchText(url, attempt + 1)
    }
    throw err
  }
}

function decodeEntities(s) {
  return s
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

// ---- Step 1: Roster ----------------------------------------------------------

function parseRoster(html) {
  // Find positions of region headings (only the section headers, h2/h3 with the
  // exact region text) and of each <tr class="el-item"> so we can attribute
  // each row to its preceding region.
  // Each region is a <div id="norte|centro|lisboa|algarve|ilhas" class="uk-section-default uk-section">
  // wrapping that region's table. Anchor on those — the FPG markup reuses
  // id="centro" on inner table wrappers for several regions, so we must
  // require the section class too.
  const SECTION_ID_TO_REGION = {
    norte: 'Zona Norte',
    centro: 'Zona Centro',
    lisboa: 'Lisboa',
    algarve: 'Algarve',
    ilhas: 'Ilhas',
  }
  const regionPositions = []
  const sectionRe = /<div\s+id="(norte|centro|lisboa|algarve|ilhas)"\s+class="uk-section-default[^"]*"/gi
  let mm
  while ((mm = sectionRe.exec(html)) !== null) {
    regionPositions.push({ pos: mm.index, region: SECTION_ID_TO_REGION[mm[1].toLowerCase()] })
  }
  regionPositions.sort((a, b) => a.pos - b.pos)

  const regionAt = (pos) => {
    let cur = null
    for (const r of regionPositions) {
      if (r.pos <= pos) cur = r.region
      else break
    }
    return cur
  }

  const rows = []
  const rowRe = /<tr\s+class="el-item">([\s\S]*?)<\/tr>/g
  let m
  while ((m = rowRe.exec(html)) !== null) {
    const rowHtml = m[1]
    const titleM = rowHtml.match(/<div\s+class="el-title[^"]*"[^>]*>([\s\S]*?)<\/div>/)
    const linkM = rowHtml.match(
      /<a\s+class="el-link[^"]*"\s+href="([^"]*course\.asp\?ncourse=(\d+)[^"]*)"[^>]*>([\s\S]*?)<\/a>/
    )
    if (!linkM) continue
    const ncourse = linkM[2]
    const longName = stripTags(linkM[3])
    const shortName = titleM ? stripTags(titleM[1]) : ''
    rows.push({
      region: regionAt(m.index),
      ncourse_id: ncourse,
      list_short: shortName,
      list_long: longName,
    })
  }
  return rows
}

// ---- Step 2: Course metadata -------------------------------------------------

function pickCell(html, label) {
  // Pattern: <td align="right">LABEL:</td>\s*<td align="left" ...><b>VALUE...</b></td>
  // Allow optional class/colspan attributes; tolerate the "Email" wrapper that
  // breaks lines and includes a mailto link.
  const re = new RegExp(
    `<td[^>]*align="right"[^>]*>\\s*${label}\\s*:\\s*</td>\\s*<td[^>]*>([\\s\\S]*?)</td>`,
    'i'
  )
  const m = html.match(re)
  return m ? stripTags(m[1]) : ''
}

function pickHrefForLabel(html, label) {
  const re = new RegExp(
    `<td[^>]*align="right"[^>]*>\\s*${label}\\s*:\\s*</td>\\s*<td[^>]*>[\\s\\S]*?<a\\s+href="([^"]+)"`,
    'i'
  )
  const m = html.match(re)
  return m ? m[1] : ''
}

function parseCourse(html, ncourse) {
  const nameM = html.match(/<H5>([\s\S]*?)<\/H5>/i)
  const club_name = nameM ? stripTags(nameM[1]) : ''

  const morada = pickCell(html, 'Morada')
  const city = pickCell(html, 'Cidade')
  const cpRaw = pickCell(html, 'Cód\\.Postal')
  const phone = pickCell(html, 'Telefone')
  const district = pickCell(html, 'Distrito')
  const dataAbertura = pickCell(html, 'Data Abertura')

  // Cód.Postal often reads "4500-653 Espinho" — split postal vs city repeat.
  let postal_code = ''
  const cpM = cpRaw.match(/(\d{4}-\d{3})/)
  if (cpM) postal_code = cpM[1]

  // Email lives inside a mailto: link
  let email = ''
  const emailM = html.match(/mailto:([^"'?\s]+)/i)
  if (emailM) email = emailM[1].replace(/&nbsp;|&#160;/gi, '').trim()

  // Website: first http href in a row labelled "WebSite"
  let website = pickHrefForLabel(html, 'WebSite')
  if (website && /^mailto:/i.test(website)) website = ''
  // FPG sometimes stores doubled-up schemes: "http://http://example.com".
  website = website.replace(/^https?:\/\/(https?:\/\/)/i, '$1')

  // GPS in Google Maps iframe: daddr=lat,lng
  let latitude = null
  let longitude = null
  const gpsM = html.match(/daddr=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
  if (gpsM) {
    latitude = parseFloat(gpsM[1])
    longitude = parseFloat(gpsM[2])
  }

  // Founded year — extract 4-digit year from "1/1/1890" style date
  let founded_year = null
  const yM = dataAbertura.match(/\b(1[89]\d{2}|20\d{2})\b/)
  if (yM) founded_year = parseInt(yM[1], 10)

  // Address: street alone — many entries only fill morada (e.g. "Paramos").
  const address = morada || ''

  return {
    club_name,
    ncourse_id: ncourse,
    address,
    postal_code,
    city,
    district,
    phone,
    email,
    website,
    latitude,
    longitude,
    founded_year,
  }
}

// ---- Main --------------------------------------------------------------------

console.log('Step 1: fetching roster from FPG listagem...')
const listagemHtml = await fetchText(LISTAGEM_URL)
const roster = parseRoster(listagemHtml)
console.log(`Roster rows: ${roster.length}`)

const byRegion = roster.reduce((acc, r) => {
  acc[r.region || '(unknown)'] = (acc[r.region || '(unknown)'] || 0) + 1
  return acc
}, {})
for (const [region, count] of Object.entries(byRegion)) {
  console.log(`  ${region}: ${count}`)
}

if (roster.length < 50) {
  console.error('Roster looks too small — aborting before step 2.')
  process.exit(1)
}

console.log('')
console.log('Step 2: fetching per-club metadata from scoring-pt.datagolf.pt...')

const results = []
const failures = []
for (let i = 0; i < roster.length; i++) {
  const row = roster[i]
  const tag = `[${i + 1}/${roster.length}] ncourse=${row.ncourse_id}`
  try {
    const html = await fetchText(COURSE_URL(row.ncourse_id))
    const meta = parseCourse(html, row.ncourse_id)
    const entry = {
      club_name: meta.club_name || row.list_long || row.list_short,
      region: row.region,
      ncourse_id: row.ncourse_id,
      address: meta.address,
      postal_code: meta.postal_code,
      city: meta.city,
      district: meta.district,
      phone: meta.phone,
      email: meta.email,
      website: meta.website,
      latitude: meta.latitude,
      longitude: meta.longitude,
      founded_year: meta.founded_year,
    }
    results.push(entry)
    console.log(`${tag}  ${entry.club_name}`)
  } catch (err) {
    failures.push({ ncourse_id: row.ncourse_id, list_long: row.list_long, error: err.message })
    console.log(`${tag}  FAILED: ${err.message}`)
  }
  if (i < roster.length - 1) await sleep(DELAY_MS)
}

mkdirSync('scripts/portugal', { recursive: true })
writeFileSync(OUT_PATH, JSON.stringify(results, null, 2))

console.log('')
console.log('--- Summary ---')
console.log(`Roster rows:       ${roster.length}`)
console.log(`Scraped clubs:     ${results.length}`)
console.log(`Failures:          ${failures.length}`)
console.log(`With website:      ${results.filter((r) => r.website).length}`)
console.log(`With phone:        ${results.filter((r) => r.phone).length}`)
console.log(`With email:        ${results.filter((r) => r.email).length}`)
console.log(`With GPS:          ${results.filter((r) => r.latitude != null).length}`)
console.log(`With postal code:  ${results.filter((r) => r.postal_code).length}`)
console.log(`Wrote: ${OUT_PATH}`)

if (failures.length > 0) {
  console.log('')
  console.log('Failures:')
  for (const f of failures) console.log(`  ncourse=${f.ncourse_id} (${f.list_long}): ${f.error}`)
}
