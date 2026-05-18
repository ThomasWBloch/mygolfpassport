// RFEG (Real Federación Española de Golf) scrape
// Pattern from memory: rfegolf.es/clubes embedded JSON.parse('{...}')
// Requires Chrome-UA + gzip

import fs from 'fs'

const URL = 'https://rfegolf.es/clubes'
const r = await fetch(URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  },
})
const html = await r.text()
console.log(`Fetched ${html.length} bytes (HTTP ${r.status})`)

// Find embedded JSON.parse('{...}') containing club data
// Memory pattern: JSON.parse with double-escape pattern
const jsonMatches = [...html.matchAll(/JSON\.parse\('((?:[^'\\]|\\.)*)'\)/g)]
console.log(`Found ${jsonMatches.length} JSON.parse blocks`)

let clubsData = null
for (const m of jsonMatches) {
  try {
    const decoded = m[1].replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')
    const parsed = JSON.parse(decoded)
    if (Array.isArray(parsed) && parsed.length > 100) { clubsData = parsed; break }
    if (parsed && typeof parsed === 'object') {
      for (const k of Object.keys(parsed)) {
        if (Array.isArray(parsed[k]) && parsed[k].length > 100) {
          clubsData = parsed[k]
          console.log(`Found clubs in key: ${k}`)
          break
        }
      }
      if (clubsData) break
    }
  } catch (e) { /* try next */ }
}

if (!clubsData) {
  // Fallback: look for window.__INITIAL_STATE__ or similar
  const initStateMatch = html.match(/window\.\w+\s*=\s*({[\s\S]+?});/)
  if (initStateMatch) {
    console.log('Trying window.X assignment...')
    try {
      const parsed = JSON.parse(initStateMatch[1])
      console.log('Top keys:', Object.keys(parsed))
    } catch (e) { console.log('Parse failed:', e.message) }
  }
  console.log('No embedded clubs found in JSON.parse blocks')
  process.exit(1)
}

console.log(`Got ${clubsData.length} clubs`)
console.log('Sample[0]:', JSON.stringify(clubsData[0], null, 2).slice(0, 500))

fs.writeFileSync('/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/spain/rfeg-clubs-2026-05-12.json', JSON.stringify(clubsData, null, 2))
console.log('Saved')
