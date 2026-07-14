// Domain-guess + verify for Belgium clubs without website.
// Reads website-par-results.json (or queries DB), tries 4 URL patterns per club,
// verifies HTTP 200 + body contains a club-name token, parses par.
// Dry-run by default. --live writes website (NOT par) to courses.
// Run: node --env-file=.env.local scripts/belgium/find-websites-guess.mjs [--live]

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const PREV_PATH = 'scripts/belgium/website-par-results.json'
const OUT_PATH = 'scripts/belgium/website-guess-results.json'
const LIVE = process.argv.includes('--live')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
const RATE_DELAY_MS = 2000
const REQUEST_TIMEOUT_MS = 8000

const STRIP_WORDS = new Set(['golf', 'club', 'country', 'royal', 'de', 'du'])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function unaccent(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function normalizeForDomain(name) {
  return unaccent(name)
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter((w) => w && !STRIP_WORDS.has(w))
    .join('-')
}

function clubTokens(name) {
  return new Set(
    unaccent(name)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 4 && !STRIP_WORDS.has(w))
  )
}

async function tryFetch(url) {
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept-Language': 'en,fr,nl' },
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
    if (!resp.ok) return { ok: false, status: resp.status }
    const html = await resp.text()
    return { ok: true, status: resp.status, html, finalUrl: resp.url }
  } catch (err) {
    return { ok: false, err: err.message }
  }
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
}

function findPar(text) {
  const candidates = []
  const re = /\bpar\b[\s:.\-=•]{0,5}(\d{2,3})/gi
  let m
  while ((m = re.exec(text))) {
    const n = parseInt(m[1], 10)
    if (n >= 27 && n <= 75) {
      candidates.push({ n, idx: m.index, snippet: text.slice(Math.max(0, m.index - 40), Math.min(text.length, m.index + 40)) })
    }
  }
  const re2 = /(\d{2,3})\s*[\s:.\-=•]?\s*\bpar\b/gi
  while ((m = re2.exec(text))) {
    const n = parseInt(m[1], 10)
    if (n >= 27 && n <= 75) {
      candidates.push({ n, idx: m.index, snippet: text.slice(Math.max(0, m.index - 40), Math.min(text.length, m.index + 40)) })
    }
  }
  if (candidates.length === 0) return null
  const tier = (n) => (n >= 70 && n <= 72 ? 0 : n >= 35 && n <= 36 ? 1 : n >= 65 && n <= 75 ? 2 : 3)
  candidates.sort((a, b) => tier(a.n) - tier(b.n))
  const best = candidates[0]
  return { par: best.n, snippet: best.snippet.replace(/\s+/g, ' ').trim() }
}

function bodyMatchesClub(html, tokens) {
  const text = stripHtml(html).toLowerCase()
  const folded = unaccent(text)
  // Hard requirement: body must contain literal word "golf"
  if (!/\bgolf\b/.test(folded)) return null
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? unaccent(stripHtml(titleMatch[1]).toLowerCase()) : ''
  // AND at least one distinctive club token (tokens already exclude "golf" via STRIP_WORDS)
  for (const t of tokens) {
    if (title.includes(t) || folded.includes(t)) return t
  }
  return null
}

function buildUrls(normalized) {
  if (!normalized) return []
  return [
    `https://www.${normalized}.be`,
    `https://${normalized}.be`,
    `https://www.golf${normalized}.be`,
    `https://www.${normalized}golf.be`,
  ]
}

// 1. Determine the list of clubs to probe
let clubs
if (existsSync(PREV_PATH)) {
  const prev = JSON.parse(readFileSync(PREV_PATH, 'utf8'))
  clubs = prev.filter((p) => !p.found_url).map((p) => p.club)
  console.log(`Loaded ${prev.length} from previous run; probing ${clubs.length} without found_url`)
} else {
  const { data, error } = await supabase
    .from('courses')
    .select('club')
    .eq('country', 'Belgium')
    .or('website.is.null,website.eq.')
  if (error) { console.error(error); process.exit(1) }
  clubs = [...new Set(data.map((r) => r.club).filter(Boolean))].sort()
  console.log(`Probing ${clubs.length} clubs from DB`)
}

console.log(`Mode: ${LIVE ? 'LIVE' : 'DRY-RUN'}`)
console.log('')

const results = []

for (let i = 0; i < clubs.length; i++) {
  const club = clubs[i]
  const tokens = clubTokens(club)
  const normalized = normalizeForDomain(club)
  const urls = buildUrls(normalized)

  process.stdout.write(`[${i + 1}/${clubs.length}] ${club}  (n=${normalized}) → `)

  if (!normalized || tokens.size === 0) {
    console.log('skip (empty normalize/tokens)')
    results.push({ club, normalized, found_url: null, par: null, confidence: 'low', tried: urls, reason: 'empty-normalize' })
    continue
  }

  let hit = null
  const tried = []
  for (const url of urls) {
    const r = await tryFetch(url)
    tried.push({ url, status: r.status ?? null, err: r.err ?? null, ok: r.ok })
    if (!r.ok) continue
    const matchedToken = bodyMatchesClub(r.html, tokens)
    if (!matchedToken) {
      tried[tried.length - 1].rejected = 'no-token-match'
      continue
    }
    hit = { url: r.finalUrl || url, html: r.html, matchedToken }
    break
  }

  if (!hit) {
    console.log('no hit')
    results.push({ club, normalized, found_url: null, par: null, confidence: 'low', tried })
    await sleep(RATE_DELAY_MS)
    continue
  }

  const text = stripHtml(hit.html)
  const parResult = findPar(text)
  const confidence = parResult ? 'high' : 'medium'
  const snippet = parResult ? parResult.snippet : `matched token: ${hit.matchedToken}`
  console.log(`${hit.url}${parResult ? `  par=${parResult.par}` : '  (no par)'}  [${confidence}]`)
  results.push({
    club,
    normalized,
    found_url: hit.url,
    par: parResult ? parResult.par : null,
    confidence,
    matched_token: hit.matchedToken,
    source_snippet: snippet,
    tried,
  })

  await sleep(RATE_DELAY_MS)
}

writeFileSync(OUT_PATH, JSON.stringify(results, null, 2))
console.log('')
console.log(`Wrote: ${OUT_PATH}`)

const high = results.filter((r) => r.confidence === 'high').length
const med = results.filter((r) => r.confidence === 'medium').length
const low = results.filter((r) => r.confidence === 'low').length
console.log(`Confidence: ${high} high / ${med} medium / ${low} low`)
console.log(`Hits: ${high + med}/${results.length}`)

if (LIVE) {
  console.log('')
  console.log('--- LIVE: applying website updates (par NOT written) ---')
  let webUpdated = 0
  let rejected = 0
  // Re-read JSON so manually-set "verified" flags are honored.
  const liveResults = JSON.parse(readFileSync(OUT_PATH, 'utf8'))
  for (const r of liveResults) {
    if (!r.found_url) continue
    if (r.verified === false) {
      console.log(`  [skip:rejected] ${r.club}  (${r.found_url})`)
      rejected++
      continue
    }
    const { data: cur, error: ec } = await supabase
      .from('courses')
      .select('id, website')
      .eq('country', 'Belgium')
      .eq('club', r.club)
    if (ec) { console.error(`  ${r.club}: select err: ${ec.message}`); continue }
    for (const row of cur) {
      if (row.website != null && row.website !== '') continue
      const { error: eu } = await supabase.from('courses').update({ website: r.found_url }).eq('id', row.id)
      if (eu) { console.error(`  ${row.id}: update err: ${eu.message}`); continue }
      console.log(`  [UPDATE] ${row.id}  (${r.club})  website=${JSON.stringify(r.found_url)}`)
      webUpdated++
    }
  }
  console.log(`Websites written: ${webUpdated}`)
  console.log(`Rejected (verified=false): ${rejected}`)
  console.log('Par values: kept in JSON only — review manually before any DB write.')
}

if (!LIVE) console.log('\n(dry-run — re-run with --live to write)')
