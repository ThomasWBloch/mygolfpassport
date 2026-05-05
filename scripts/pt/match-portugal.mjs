// Match Portugal FPG federation data against DB courses.
//
// Single-source matcher. FPG har klub-niveau kontakt (website/email/phone) men ikke
// per-bane coords eller holes — DB har allerede coords (97.5%) og holes (99.2%) fra
// Golfapi import. Vi bruger FPG til at fylde NULL-felter for kontakt.
//
// Data-shape (FPG): flat klub-record (ingen nested courses).
//   { code, name, zona, address, postal, district, phone, email, website }
//
// Confidence-buckets (AND-policy per memory):
//   high   → sim ≥ 0.90 AND coord-dist ≤ 1500m  (eller sim = 1.0 navne-match m. boost)
//   medium → sim ≥ 0.78 AND coord-dist ≤ 5000m  (større dist OK — FPG har ingen coords)
//   low    → svagere — manuel review
//   no_match → ingen kandidater
//
// Bemærk: FPG har INGEN coords i listing/detail. Coord-distance bestemmes ved at
// matche FPG.district + city-fra-postal mod DB.address. Vi har ingen reel distance,
// så coord-bucket er meningsløs her — vi ranker udelukkende på navne-similarity
// + tekstuelle boost-signaler.
//
// Boost-signaler (federation match) — 7 stk:
//   +0.06 hvis FPG.district matcher DB.address
//   +0.05 hvis postal-by (efter "1234-567 ByName") findes i DB.address
//   +0.05 hvis FPG.zona matcher DB.address (Algarve, Açores, Madeira, etc.)
//   +0.05 hvis email-domæne stammer fra DB.website-domæne (FPG email ↔ DB website)
//   +0.04 hvis FPG.acronym (≥4 chars) er substring af DB.club/name
//   +0.04 hvis website-domæne (uden www/scheme) findes i DB.club/name
//   +0.03 hvis FPG.phone-prefix (3 første cifre, area code) matcher DB.phone-prefix
//
// Chain-twin dedup: hver FPG-klub kun matched mod én DB-klub. Højeste boostedSim
// wins; andre DB-rows der pegede på samme FPG-klub → tilbage til nomatch.
// Forebygger falske positives når matcher fallbacker (per memory).
//
// Run: node --env-file=.env.local scripts/pt/match-portugal.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/pt/pt-clubs-fpg.json'
const REPORT_PATH = 'scripts/pt/portugal-match-report.md'
const CANDIDATES_PATH = 'scripts/pt/portugal-match-candidates.json'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// Portuguese golf stopwords. Avoid stripping city tokens (lisboa, porto, faro)
// — those help distinguish "Clube de Golfe do Estoril" vs "Clube de Golf da Penha".
const PT_STOPWORDS = [
  'clube', 'club', 'golfe', 'golf', 'golfclub', 'golfclube',
  'de', 'do', 'da', 'dos', 'das', 'di', 'del',
  'cgc', 'cg', 'gc', 'gcs',
  'sa', 'lda', 'limitada',
  'i', 'ii', 'iii', 'iv', 'v',
  'n1', 'n2', 'no1',
  'sociedade', 'sociedad',
  'resort', 'park', 'parque',
  'campo',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // diacritics
    .replace(/ç/g, 'c') // belt-and-suspenders for cedilla
    .replace(new RegExp(`\\b(${PT_STOPWORDS.join('|')})\\b`, 'g'), '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const bigrams = (s) => {
  const b = new Set()
  for (let i = 0; i < s.length - 1; i++) b.add(s.slice(i, i + 2))
  return b
}

const sim = (a, b) => {
  const A = norm(a), B = norm(b)
  if (!A || !B) return 0
  if (A === B) return 1
  if (A.replace(/\s+/g, '') && B.includes(A)) return 0.95
  if (B.replace(/\s+/g, '') && A.includes(B)) return 0.95
  const bA = bigrams(A.replace(/\s+/g, ''))
  const bB = bigrams(B.replace(/\s+/g, ''))
  if (!bA.size || !bB.size) return 0
  let inter = 0
  for (const x of bA) if (bB.has(x)) inter++
  return (2 * inter) / (bA.size + bB.size)
}

function stripWebsite(url) {
  if (!url) return ''
  return String(url)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
}

function postalCity(postal) {
  if (!postal) return ''
  // "4500-653 Espinho" → "espinho"
  const m = /\d{4}-\d{3}\s+(.+)$/.exec(postal.trim())
  return m ? m[1].toLowerCase() : ''
}

function applyBoosts(dbRow, fed, baseSim) {
  let s = baseSim
  const reasons = []
  const haystack = [
    dbRow.address || '',
    dbRow.club || '',
    dbRow.name || '',
    dbRow.website || '',
  ].join(' ').toLowerCase()

  // 1. district match
  if (fed.district) {
    const d = fed.district.toLowerCase()
    if (haystack.includes(d)) { s += 0.06; reasons.push('+district') }
  }
  // 2. postal-city match
  const city = postalCity(fed.postal)
  if (city && haystack.includes(city)) { s += 0.05; reasons.push('+postalCity') }
  // 3. zona match
  if (fed.zona) {
    const z = fed.zona.toLowerCase()
    if (haystack.includes(z)) { s += 0.05; reasons.push('+zona') }
  }
  // 4. shared email/website domain
  const fedDom = stripWebsite(fed.website)
  const dbDom = stripWebsite(dbRow.website || '')
  if (fedDom && dbDom && (fedDom === dbDom || fedDom.endsWith('.' + dbDom) || dbDom.endsWith('.' + fedDom))) {
    s += 0.05; reasons.push('+webDomain')
  }
  // 5. acronym substring
  if (fed.acronym && fed.acronym.length >= 4) {
    const a = fed.acronym.toLowerCase().replace(/[^a-z0-9]/g, '')
    const cleanHay = haystack.replace(/[^a-z0-9]/g, '')
    if (a.length >= 4 && cleanHay.includes(a)) { s += 0.04; reasons.push('+acronym') }
  }
  // 6. fed website domain in DB club/name
  if (fedDom) {
    const stem = fedDom.split('.')[0]
    if (stem && stem.length >= 5 && (dbRow.club || '').toLowerCase().includes(stem)) {
      s += 0.04; reasons.push('+webStem')
    }
  }
  // 7. phone-prefix match (PT mobile/fixed area)
  if (fed.phone && dbRow.phone) {
    const fp = String(fed.phone).replace(/\D/g, '')
    const dp = String(dbRow.phone).replace(/\D/g, '')
    if (fp.length >= 5 && dp.length >= 5 && fp.slice(-7) === dp.slice(-7)) {
      s += 0.05; reasons.push('+phoneMatch')
    } else if (fp.length >= 5 && dp.length >= 5 && fp.slice(0, 6) === dp.slice(0, 6)) {
      s += 0.03; reasons.push('+phonePrefix')
    }
  }
  return { boostedSim: Math.min(s, 1.0), reasons }
}

async function fetchPortugalCourses() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('country', 'Portugal')
      .range(from, from + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
  }
  return all
}

function findBestMatch(dbRow, fedKlubs) {
  let best = null
  let runnerUp = null
  for (const f of fedKlubs) {
    let s = sim(dbRow.club, f.name)
    const sn = sim(dbRow.name, f.name)
    if (sn > s) s = sn
    // Acronym fallback: if DB club is shortish brand name like "Oporto" vs full "Oporto Golf Clube"
    if (f.acronym) {
      const sa = sim(dbRow.club, f.acronym)
      if (sa > s) s = sa
      const san = sim(dbRow.name, f.acronym)
      if (san > s) s = san
    }
    if (s < 0.40) continue
    const { boostedSim, reasons } = applyBoosts(dbRow, f, s)
    const cand = { fed: f, sim: s, boostedSim, reasons }
    if (
      !best
      || cand.boostedSim > best.boostedSim
      || (cand.boostedSim === best.boostedSim && cand.sim > best.sim)
    ) {
      runnerUp = best
      best = cand
    } else if (!runnerUp || cand.boostedSim > runnerUp.boostedSim) {
      runnerUp = cand
    }
  }
  return { best, runnerUp }
}

function bucketize(cand) {
  if (!cand) return 'no_match'
  const { boostedSim, sim: baseSim } = cand
  if (boostedSim >= 0.92) return 'high'
  if (boostedSim >= 0.85 && baseSim >= 0.75) return 'high'
  if (boostedSim >= 0.78) return 'medium'
  if (boostedSim >= 0.65) return 'low'
  return 'low'
}

async function main() {
  console.log('Loading FPG federation data…')
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  const fedKlubs = fed.clubs
  console.log(`  ${fedKlubs.length} FPG klubs`)

  console.log('Loading DB courses (PT)…')
  const db = await fetchPortugalCourses()
  console.log(`  ${db.length} DB course-rows`)

  // Group DB by club_normalized for klub-level matching
  const dbByClub = new Map()
  for (const r of db) {
    const key = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(key)) dbByClub.set(key, { key, club: r.club, rows: [] })
    dbByClub.get(key).rows.push(r)
  }
  console.log(`  ${dbByClub.size} unique DB clubs`)

  // PASS 1: per-DB-club find best FPG match
  const candidates = []
  for (const [key, group] of dbByClub) {
    const rep = group.rows.find((r) => r.latitude != null) || group.rows[0]
    const { best, runnerUp } = findBestMatch(rep, fedKlubs)
    candidates.push({
      dbClubKey: key,
      dbClub: group.club,
      dbRowCount: group.rows.length,
      dbRows: group.rows.map((r) => ({
        id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
        website: r.website, email: r.email, phone: r.phone, holes: r.holes,
        is_combo: r.is_combo, is_displayed: r.is_displayed,
        address: r.address,
      })),
      best: best ? {
        code: best.fed.code, name: best.fed.name, acronym: best.fed.acronym,
        zona: best.fed.zona, district: best.fed.district, postal: best.fed.postal,
        website: best.fed.website, email: best.fed.email, phone: best.fed.phone,
        sim: best.sim, boostedSim: best.boostedSim, reasons: best.reasons,
      } : null,
      runnerUp: runnerUp ? {
        code: runnerUp.fed.code, name: runnerUp.fed.name,
        sim: runnerUp.sim, boostedSim: runnerUp.boostedSim,
      } : null,
    })
  }

  // PASS 2: chain-twin dedup. Multiple DB-clubs may have picked the same FPG-klub
  // as best — only the highest-scoring DB-club gets to keep that FPG-klub.
  // Others fall back to runnerUp (if exists and not also taken) or no_match.
  const usedFedCodes = new Set()
  // Sort candidates by best.boostedSim desc so highest scorer claims first
  candidates.sort((a, b) => (b.best?.boostedSim || 0) - (a.best?.boostedSim || 0))
  for (const c of candidates) {
    if (!c.best) {
      c.bucket = 'no_match'
      continue
    }
    const code = c.best.code
    if (!usedFedCodes.has(code)) {
      usedFedCodes.add(code)
      c.bucket = bucketize({ boostedSim: c.best.boostedSim, sim: c.best.sim })
    } else {
      // Try runnerUp
      if (c.runnerUp && !usedFedCodes.has(c.runnerUp.code) && c.runnerUp.boostedSim >= 0.65) {
        c.dedup_demoted_from = c.best
        c.best = c.runnerUp
        c.runnerUp = null
        usedFedCodes.add(c.best.code)
        c.bucket = bucketize({ boostedSim: c.best.boostedSim, sim: c.best.sim })
      } else {
        c.dedup_demoted_from = c.best
        c.best = null
        c.runnerUp = null
        c.bucket = 'dedup_lost'
      }
    }
  }

  // Re-sort for report
  const order = { high: 0, medium: 1, low: 2, dedup_lost: 3, no_match: 4 }
  candidates.sort((a, b) => {
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.boostedSim || 0) - (a.best?.boostedSim || 0)
  })

  const counts = { high: 0, medium: 0, low: 0, dedup_lost: 0, no_match: 0 }
  for (const c of candidates) counts[c.bucket]++

  // Unmatched FPG klubs
  const unmatchedFed = fedKlubs.filter((f) => !usedFedCodes.has(f.code))

  writeFileSync(CANDIDATES_PATH, JSON.stringify({
    candidates,
    unmatchedFed: unmatchedFed.map((f) => ({
      code: f.code, name: f.name, acronym: f.acronym, zona: f.zona, district: f.district,
      postal: f.postal, website: f.website, email: f.email, phone: f.phone,
    })),
  }, null, 2), 'utf8')

  // Markdown report
  const lines = []
  lines.push('# Portugal match report')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- FPG klubs: ${fedKlubs.length}`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  lines.push(`- Unmatched FPG klubs (potential new clubs): ${unmatchedFed.length}`)
  lines.push('')
  for (const bucket of ['high', 'medium', 'low', 'dedup_lost', 'no_match']) {
    const items = candidates.filter((c) => c.bucket === bucket)
    if (!items.length) continue
    lines.push(`## ${bucket.toUpperCase()} (${items.length})`)
    lines.push('')
    lines.push('| DB club | rows | FPG name | sim | boost | website | email | phone | reasons |')
    lines.push('|---|---|---|---|---|---|---|---|---|')
    for (const c of items) {
      lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || '—'} | ${c.best?.sim?.toFixed(2) || ''} | ${c.best?.boostedSim?.toFixed(2) || ''} | ${c.best?.website ? 'Y' : ''} | ${c.best?.email ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} | ${c.best?.reasons?.join(',') || ''} |`)
    }
    lines.push('')
  }

  if (unmatchedFed.length) {
    lines.push('## Unmatched FPG klubs (potential new clubs)')
    lines.push('')
    lines.push('| Code | FPG name | District | Zona | Website | Email |')
    lines.push('|---|---|---|---|---|---|')
    for (const f of unmatchedFed) {
      lines.push(`| ${f.code} | ${f.name} | ${f.district || ''} | ${f.zona || ''} | ${f.website || ''} | ${f.email || ''} |`)
    }
  }

  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')

  console.log(`\n=== Match summary ===`)
  console.log(`  High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  console.log(`  Unmatched FPG: ${unmatchedFed.length}`)
  console.log(`Wrote ${CANDIDATES_PATH}`)
  console.log(`Wrote ${REPORT_PATH}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
