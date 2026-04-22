import { readFileSync } from 'node:fs'
const sgl = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))

function normalizeUrl(u) {
  if (!u) return null
  let s = String(u).trim()
  if (!s) return null
  s = s.replace(/^www\.(https?:\/\/)/i, '$1')
  if (!/^https?:\/\//i.test(s) && /^www\./i.test(s)) s = s.slice(4)
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s
  s = s.replace(/^http:\/\//i, 'https://')
  s = s.replace(/\/+$/, '')
  return s
}

function composeAddress(c) {
  let street = (c.streetAddress || '').trim()
  let embeddedPost = null
  let m = street.match(/\s*\(\s*(\d{5})\s*\)\s*$/)
  if (m) { embeddedPost = m[1]; street = street.slice(0, m.index).trim() }
  m = street.match(/\s*,\s*(\d{5})\s*$/)
  if (m) { embeddedPost = embeddedPost || m[1]; street = street.slice(0, m.index).trim() }
  street = street.replace(/[\s,]+$/, '').trim()
  const postCode = (c.postCode || embeddedPost || '').trim()
  const city = (c.city || '').trim()
  const parts = []
  if (street) parts.push(street)
  if (postCode || city) parts.push([postCode, city].filter(Boolean).join(' '))
  return parts.join(', ') || null
}

console.log('Sample of 15 random SGL clubs — normalized address + website:\n')
const sample = sgl.slice(0, 15)
for (const c of sample) {
  console.log(`${c.name}`)
  console.log(`  raw street=${c.streetAddress}  post=${c.postCode}  city=${c.city}`)
  console.log(`  addr  → ${composeAddress(c)}`)
  console.log(`  raw url=${c.url}`)
  console.log(`  url   → ${normalizeUrl(c.url)}`)
  console.log()
}

console.log('\nEdge cases:')
const edges = sgl.filter(c => /www\.https|\(\d{5}\)/.test((c.url || '') + ' ' + (c.streetAddress || '')))
for (const c of edges.slice(0, 5)) {
  console.log(`${c.name}: raw url="${c.url}" street="${c.streetAddress}"`)
  console.log(`  → addr="${composeAddress(c)}"  url="${normalizeUrl(c.url)}"`)
}
