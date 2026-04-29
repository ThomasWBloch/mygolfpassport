// Find websites + par for Belgium clubs that lack them.
// Uses DDG HTML search → fetches likely official site → regexes par.
// Dry-run by default. --live writes website/par back to courses (conservative).
// Run: node --env-file=.env.local scripts/belgium/find-websites-par.mjs [--live]

import { writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const OUT_PATH = 'scripts/belgium/website-par-results.json'
const LIVE = process.argv.includes('--live')

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
const RATE_DELAY_MS = 1500
const REQUEST_TIMEOUT_MS = 20000
const MAX_RETRIES = 3

const BLOCKED_DOMAINS = new Set([
  'leadingcourses.com', 'golfpass.com', '1golf.eu', 'golf.de', 'golfgo.dk',
  'tripadvisor.com', 'tripadvisor.be', 'tripadvisor.fr', 'tripadvisor.nl',
  'wikipedia.org', 'wikiwand.com',
  'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'linkedin.com', 'youtube.com',
  'pgatour.com', 'eurogolf.de', 'mygolfdata.com', 'golfclubs.de',
  'top100golfcourses.com', 'wikiloc.com', 'foursquare.com',
  'yellowpages.com', 'yelp.com', 'maps.google.com',
  'google.com', 'bing.com', 'duckduckgo.com', 'duck.com',
  'golfvlaanderen.be', 'afgolf.be', 'golfbelgium.be', 'i-golf.be',
  'belgiumgolf.com', 'golfeurope.com', 'golfholidays.com',
  'visitbelgium.com', 'visitflanders.com', 'visitwallonia.com',
  'booking.com', 'expedia.com', 'hotels.com',
  'pinterest.com', 'reddit.com',
  'golfbreaks.com', 'golfclickphoto.com', 'golf24.dk',
])

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, '').toLowerCase() } catch { return '' }
}

function isBlocked(url) {
  const h = hostOf(url)
  if (!h) return true
  for (const b of BLOCKED_DOMAINS) {
    if (h === b || h.endsWith('.' + b)) return true
  }
  return false
}

async function fetchWithRetry(url, opts = {}) {
  let lastErr
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const resp = await fetch(url, {
        ...opts,
        headers: { 'User-Agent': UA, 'Accept-Language': 'en,fr,nl', ...(opts.headers || {}) },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      return resp
    } catch (err) {
      lastErr = err
      if (attempt < MAX_RETRIES) await sleep(2000 * attempt)
    }
  }
  throw lastErr
}

// Decode DDG's /l/?uddg=...&rut=... redirect link.
function decodeDDG(href) {
  try {
    const u = href.startsWith('//') ? 'https:' + href : (href.startsWith('http') ? href : 'https://duckduckgo.com' + href)
    const parsed = new URL(u)
    const target = parsed.searchParams.get('uddg')
    return target ? decodeURIComponent(target) : u
  } catch { return href }
}

// Parse top result links from DDG HTML.
function parseDDG(html) {
  const out = []
  const rx = /<a\s+rel="nofollow"\s+class="result__a"\s+href="([^"]+)"/g
  let m
  while ((m = rx.exec(html)) && out.length < 8) {
    out.push(decodeDDG(m[1]))
  }
  // Fallback: simpler href grep if class name varies.
  if (out.length === 0) {
    const rx2 = /class="result__a"[^>]*href="([^"]+)"/g
    while ((m = rx2.exec(html)) && out.length < 8) {
      out.push(decodeDDG(m[1]))
    }
  }
  return out
}

function looksLikeAnomaly(html) {
  return /Anomaly detected|unusual traffic|please solve this captcha|blocked/i.test(html)
}

// Score how "official" a URL looks given the club name.
function clubTokens(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !['golf', 'club', 'country', 'royal', 'links'].includes(w))
}

function scoreCandidate(url, tokens) {
  const h = hostOf(url)
  if (!h) return -1
  let score = 0
  for (const t of tokens) {
    if (h.includes(t)) score += 2
  }
  if (h.endsWith('.be')) score += 1
  if (h.endsWith('.com') || h.endsWith('.eu')) score += 0.5
  return score
}

// Par regex: capture numbers near the word "par" within plausible range.
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
  // Prefer 70-72 (standard 18-hole), then 35-36 (9-hole), then any.
  const tier = (n) => (n >= 70 && n <= 72 ? 0 : n >= 35 && n <= 36 ? 1 : n >= 65 && n <= 75 ? 2 : 3)
  candidates.sort((a, b) => tier(a.n) - tier(b.n))
  const best = candidates[0]
  return { par: best.n, snippet: best.snippet.replace(/\s+/g, ' ').trim() }
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
}

// 1. Fetch clubs lacking website
const { data: rows, error: e1 } = await supabase
  .from('courses')
  .select('club, par')
  .eq('country', 'Belgium')
  .or('website.is.null,website.eq.')
if (e1) { console.error('select clubs:', e1); process.exit(1) }

const clubSet = new Map() // club → { rows: int }
for (const r of rows) {
  if (!r.club) continue
  if (!clubSet.has(r.club)) clubSet.set(r.club, { rows: 0 })
  clubSet.get(r.club).rows++
}
const clubs = [...clubSet.keys()].sort()
console.log(`Belgium clubs without website: ${clubs.length}`)
console.log(`Mode: ${LIVE ? 'LIVE' : 'DRY-RUN'}`)
console.log('')

const results = []
let blocked = false

for (let i = 0; i < clubs.length; i++) {
  if (blocked) break
  const club = clubs[i]
  const tokens = clubTokens(club)
  const query = `${club} golf Belgium official site`
  process.stdout.write(`[${i + 1}/${clubs.length}] ${club} → `)

  // 1. DDG search
  let foundUrl = null
  let parResult = null
  let confidence = 'low'
  let snippet = ''

  try {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`
    const resp = await fetchWithRetry(ddgUrl, { headers: { 'Referer': 'https://duckduckgo.com/' } })
    if (resp.status === 403 || resp.status === 429) {
      console.log(`DDG blocked (HTTP ${resp.status}) — stopping`)
      blocked = true
      break
    }
    const html = await resp.text()
    if (looksLikeAnomaly(html)) {
      console.log('DDG anomaly — stopping')
      blocked = true
      break
    }
    const links = parseDDG(html)
    const candidates = links.filter((u) => u.startsWith('http') && !isBlocked(u))
    if (candidates.length === 0) {
      console.log('no non-aggregator hit')
      results.push({ club, found_url: null, par: null, confidence: 'low', source_snippet: '' })
      await sleep(RATE_DELAY_MS)
      continue
    }
    // Pick best by score
    const scored = candidates.map((u) => ({ url: u, score: scoreCandidate(u, tokens) }))
    scored.sort((a, b) => b.score - a.score)
    foundUrl = scored[0].url
  } catch (err) {
    console.log(`DDG err: ${err.message}`)
    results.push({ club, found_url: null, par: null, confidence: 'low', source_snippet: `DDG err: ${err.message}` })
    await sleep(RATE_DELAY_MS)
    continue
  }

  await sleep(RATE_DELAY_MS)

  // 2. Fetch club site
  try {
    const resp = await fetchWithRetry(foundUrl)
    if (!resp.ok) throw new Error(`${resp.status}`)
    const html = await resp.text()
    const text = stripHtml(html)
    parResult = findPar(text)
    if (parResult) {
      confidence = 'high'
      snippet = parResult.snippet
    } else {
      confidence = 'medium'
    }
  } catch (err) {
    snippet = `fetch err: ${err.message}`
    confidence = 'medium'
  }

  console.log(`${foundUrl}${parResult ? `  par=${parResult.par}` : '  (no par)'}  [${confidence}]`)
  results.push({
    club,
    found_url: foundUrl,
    par: parResult ? parResult.par : null,
    confidence,
    source_snippet: snippet,
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
if (blocked) console.log('⚠️  Stopped early due to DDG anomaly detection.')

// 3. Live writes — website only. Par is kept in JSON for manual review.
if (LIVE) {
  console.log('')
  console.log('--- LIVE: applying website updates (par NOT written) ---')
  let webUpdated = 0
  for (const r of results) {
    if (!r.found_url) continue
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
      webUpdated++
    }
  }
  console.log(`Websites written: ${webUpdated}`)
  console.log('Par values: kept in JSON only — review manually before any DB write.')
}

if (!LIVE) console.log('\n(dry-run — re-run with --live to write)')
