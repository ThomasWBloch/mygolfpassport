// Match Croatia HGS federation data against DB courses.
//
// Run: node --env-file=.env.local scripts/hr/match-slovenia.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const FED_PATH = 'scripts/hr/hr-clubs-hgs.json'
const REPORT_PATH = 'scripts/hr/croatia-match-report.md'
const CANDIDATES_PATH = 'scripts/hr/croatia-match-candidates.json'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

// SI klub-prefix variants: GK, GC, G&CK, GCK, "Goriški GK", "Koroški GK", "Racman GK", "European GK"
// Strip these as well as common terms.
const HR_STOPWORDS = [
  'gk', 'golf', 'klub', 'club', 'country', 'igraliste', 'igralista',
  'hrvatska', 'hrvatski', 'croatia', 'savez',
  'i', 'ii', 'iii', 'iv', 'v',
  'resort', 'park', 'old', 'centar', 'centre', 'center',
]

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(new RegExp(`\\b(${HR_STOPWORDS.join('|')})\\b`, 'g'), '')
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

function stripWebsiteHost(url) {
  if (!url) return ''
  return String(url)
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
}

function postalCity(addr) {
  if (!addr) return ''
  // SI postal patterns: "Bled (4260)", "SI-1000 Ljubljana", "1235 Radomlje", "8000 Novo mesto"
  const m1 = /\(\d{4}\)/.exec(addr) // "Bled (4260)"
  const m2 = /SI-\d{4}\s+(\S+)/i.exec(addr) // "SI-1000 Ljubljana"
  const m3 = /\b\d{4}\s+([A-Za-zČŠŽčšž][^,]*?)$/.exec(addr) // "1235 Radomlje" at end
  if (m2) return m2[1].toLowerCase()
  if (m3) return m3[1].toLowerCase().trim()
  // Fallback: word before postal-paren
  const m4 = /([A-Za-zČŠŽčšž][^,]*?)\s+\(\d{4}\)/.exec(addr)
  if (m4) return m4[1].toLowerCase().trim()
  return ''
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

  const city = postalCity(fed.address)
  if (city && haystack.includes(city)) { s += 0.07; reasons.push('+postalCity') }

  const fedHost = stripWebsiteHost(fed.website)
  const dbHost = stripWebsiteHost(dbRow.website || '')
  if (fedHost && dbHost && (fedHost === dbHost || fedHost.endsWith('.' + dbHost) || dbHost.endsWith('.' + fedHost))) {
    s += 0.05; reasons.push('+webDomain')
  }
  if (fedHost) {
    const stem = fedHost.split('.')[0]
    if (stem && stem.length >= 5 && (dbRow.club || '').toLowerCase().includes(stem)) {
      s += 0.04; reasons.push('+webStem')
    }
  }
  if (fed.email && dbRow.email) {
    const fdom = fed.email.split('@').pop()?.toLowerCase()
    const ddom = dbRow.email.split('@').pop()?.toLowerCase()
    if (fdom && ddom && fdom === ddom) { s += 0.04; reasons.push('+emailDomain') }
  }
  if (fed.phone && dbRow.phone) {
    const fp = String(fed.phone).replace(/\D/g, '')
    const dp = String(dbRow.phone).replace(/\D/g, '')
    if (fp.length >= 6 && dp.length >= 6 && fp.slice(-7) === dp.slice(-7)) {
      s += 0.05; reasons.push('+phoneMatch')
    }
  }
  return { boostedSim: Math.min(s, 1.0), reasons }
}

async function fetchCroatiaCourses() {
  const PAGE = 1000
  const all = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await sb
      .from('courses')
      .select('*')
      .eq('country', 'Croatia')
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
  console.log('Loading HGS federation data…')
  const fed = JSON.parse(readFileSync(FED_PATH, 'utf8'))
  const fedKlubs = fed.clubs
  console.log(`  ${fedKlubs.length} HGS klubs`)

  console.log('Loading DB courses (Croatia)…')
  const db = await fetchCroatiaCourses()
  console.log(`  ${db.length} DB course-rows`)

  const dbByClub = new Map()
  for (const r of db) {
    const key = r.club_normalized || norm(r.club || r.name)
    if (!dbByClub.has(key)) dbByClub.set(key, { key, club: r.club, rows: [] })
    dbByClub.get(key).rows.push(r)
  }
  console.log(`  ${dbByClub.size} unique DB clubs`)

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
        name: best.fed.name, address: best.fed.address,
        website: best.fed.website, email: best.fed.email, phone: best.fed.phone,
        sim: best.sim, boostedSim: best.boostedSim, reasons: best.reasons,
      } : null,
      runnerUp: runnerUp ? {
        name: runnerUp.fed.name, sim: runnerUp.sim, boostedSim: runnerUp.boostedSim,
      } : null,
    })
  }

  // Chain-twin dedup: highest scorer claims the FPG-klub
  const usedFedNames = new Set()
  candidates.sort((a, b) => (b.best?.boostedSim || 0) - (a.best?.boostedSim || 0))
  for (const c of candidates) {
    if (!c.best) {
      c.bucket = 'no_match'
      continue
    }
    const key = c.best.name
    if (!usedFedNames.has(key)) {
      usedFedNames.add(key)
      c.bucket = bucketize({ boostedSim: c.best.boostedSim, sim: c.best.sim })
    } else {
      if (c.runnerUp && !usedFedNames.has(c.runnerUp.name) && c.runnerUp.boostedSim >= 0.65) {
        c.dedup_demoted_from = c.best
        // Need full fed data for runnerUp
        const ruFull = fedKlubs.find((f) => f.name === c.runnerUp.name)
        c.best = ruFull ? {
          name: ruFull.name, address: ruFull.address,
          website: ruFull.website, email: ruFull.email, phone: ruFull.phone,
          sim: c.runnerUp.sim, boostedSim: c.runnerUp.boostedSim, reasons: ['runnerUp'],
        } : null
        c.runnerUp = null
        if (c.best) {
          usedFedNames.add(c.best.name)
          c.bucket = bucketize({ boostedSim: c.best.boostedSim, sim: c.best.sim })
        } else c.bucket = 'dedup_lost'
      } else {
        c.dedup_demoted_from = c.best
        c.best = null
        c.runnerUp = null
        c.bucket = 'dedup_lost'
      }
    }
  }

  const order = { high: 0, medium: 1, low: 2, dedup_lost: 3, no_match: 4 }
  candidates.sort((a, b) => {
    if (order[a.bucket] !== order[b.bucket]) return order[a.bucket] - order[b.bucket]
    return (b.best?.boostedSim || 0) - (a.best?.boostedSim || 0)
  })

  const counts = { high: 0, medium: 0, low: 0, dedup_lost: 0, no_match: 0 }
  for (const c of candidates) counts[c.bucket]++

  const unmatchedFed = fedKlubs.filter((f) => !usedFedNames.has(f.name))

  writeFileSync(CANDIDATES_PATH, JSON.stringify({
    candidates,
    unmatchedFed: unmatchedFed.map((f) => ({
      name: f.name, address: f.address, website: f.website, email: f.email, phone: f.phone,
    })),
  }, null, 2), 'utf8')

  const lines = []
  lines.push('# Croatia match report')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push('')
  lines.push(`- DB clubs: ${dbByClub.size}`)
  lines.push(`- HGS klubs: ${fedKlubs.length}`)
  lines.push(`- High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  lines.push(`- Unmatched HGS klubs: ${unmatchedFed.length}`)
  lines.push('')
  for (const bucket of ['high', 'medium', 'low', 'dedup_lost', 'no_match']) {
    const items = candidates.filter((c) => c.bucket === bucket)
    if (!items.length) continue
    lines.push(`## ${bucket.toUpperCase()} (${items.length})`)
    lines.push('')
    lines.push('| DB club | rows | HGS name | sim | boost | website | email | phone | reasons |')
    lines.push('|---|---|---|---|---|---|---|---|---|')
    for (const c of items) {
      lines.push(`| ${c.dbClub || ''} | ${c.dbRowCount} | ${c.best?.name || '—'} | ${c.best?.sim?.toFixed(2) || ''} | ${c.best?.boostedSim?.toFixed(2) || ''} | ${c.best?.website ? 'Y' : ''} | ${c.best?.email ? 'Y' : ''} | ${c.best?.phone ? 'Y' : ''} | ${c.best?.reasons?.join(',') || ''} |`)
    }
    lines.push('')
  }

  if (unmatchedFed.length) {
    lines.push('## Unmatched HGS klubs')
    lines.push('')
    lines.push('| Name | Address | Website | Email |')
    lines.push('|---|---|---|---|')
    for (const f of unmatchedFed) {
      lines.push(`| ${f.name} | ${(f.address || '').slice(0, 40)} | ${f.website || ''} | ${f.email || ''} |`)
    }
  }

  writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8')

  console.log(`\n=== Match summary ===`)
  console.log(`  High: ${counts.high} | Medium: ${counts.medium} | Low: ${counts.low} | Dedup-lost: ${counts.dedup_lost} | No-match: ${counts.no_match}`)
  console.log(`  Unmatched HGS: ${unmatchedFed.length}`)
}

main().catch((e) => { console.error(e); process.exit(1) })
