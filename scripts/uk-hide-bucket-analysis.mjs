import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const OUT_DIR = '/sessions/vibrant-busy-mendel/mnt/outputs/uk-audit'
const COUNTRIES = ['England','Scotland','Wales','Ireland','Northern Ireland']

function getDomain(url) {
  if (!url) return null
  return (url.toLowerCase().match(/^https?:\/\/(?:www\.)?([^\/\?]+)/) || [])[1] || null
}
function distM(la1, lo1, la2, lo2) {
  if (la1==null||la2==null||lo1==null||lo2==null) return Infinity
  const R = 6371000, toRad = d => d * Math.PI / 180
  const dLat = toRad(la2-la1), dLng = toRad(lo2-lo1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(la1))*Math.cos(toRad(la2))*Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const ALL_VISIBLE = []
const ALL_HIDDEN = []
for (const c of COUNTRIES) {
  let from = 0
  while (true) {
    const { data } = await sb.from('courses')
      .select('id,club,name,country,latitude,longitude,address,website,phone,is_displayed')
      .eq('country', c).range(from, from+999)
    for (const r of data) (r.is_displayed ? ALL_VISIBLE : ALL_HIDDEN).push(r)
    if (data.length < 1000) break; from += 1000
  }
}
console.log(`Visible: ${ALL_VISIBLE.length}, Hidden: ${ALL_HIDDEN.length}`)

const visByDomain = new Map()
for (const v of ALL_VISIBLE) {
  const d = getDomain(v.website)
  if (!d || d === 'facebook.com') continue
  if (!visByDomain.has(d)) visByDomain.set(d, [])
  visByDomain.get(d).push(v)
}

const buckets = { same_coords: [], same_domain: [], no_data: [], unique: [] }
for (const h of ALL_HIDDEN) {
  if (!h.address && !h.website && !h.phone) {
    buckets.no_data.push({ ...h, reason: 'no address/website/phone' })
    continue
  }
  const dom = getDomain(h.website)
  if (dom && visByDomain.has(dom)) {
    const collide = visByDomain.get(dom)[0]
    buckets.same_domain.push({ ...h, match: { id: collide.id, club: collide.club, country: collide.country, distance: Math.round(distM(h.latitude, h.longitude, collide.latitude, collide.longitude)) } })
    continue
  }
  let closest = null, minDist = Infinity
  for (const v of ALL_VISIBLE) {
    if (!v.latitude) continue
    const d = distM(h.latitude, h.longitude, v.latitude, v.longitude)
    if (d < minDist) { minDist = d; closest = v }
  }
  if (closest && minDist <= 200) {
    buckets.same_coords.push({ ...h, match: { id: closest.id, club: closest.club, country: closest.country, distance: Math.round(minDist) } })
    continue
  }
  buckets.unique.push({ ...h, closest_visible: closest ? { club: closest.club, country: closest.country, dist_m: Math.round(minDist) } : null })
}

console.log('\n=== Hide-bucket analyse (per row) ===')
console.log(`  same_coords (<=200m fra synlig): ${buckets.same_coords.length}`)
console.log(`  same_domain (deler website-domain): ${buckets.same_domain.length}`)
console.log(`  no_data (stub uden info): ${buckets.no_data.length}`)
console.log(`  unique (skal web-verify): ${buckets.unique.length}`)

fs.writeFileSync(`${OUT_DIR}/hide-bucket-analysis.json`, JSON.stringify(buckets, null, 2))

const perCountry = {}
for (const [bucket, rows] of Object.entries(buckets)) {
  for (const r of rows) {
    perCountry[r.country] = perCountry[r.country] || { same_coords:0, same_domain:0, no_data:0, unique:0, total:0 }
    perCountry[r.country][bucket]++
    perCountry[r.country].total++
  }
}
console.log('\n=== Per country ===')
console.table(perCountry)

console.log('\n=== Sample: same_coords (first 10 distinct) ===')
const seen = new Set()
for (const r of buckets.same_coords) {
  if (seen.has(r.club)) continue; seen.add(r.club)
  if (seen.size > 10) break
  console.log(`  ${r.country.slice(0,4).padEnd(4)} | "${r.club.slice(0,32).padEnd(32)}" -> "${r.match.club.slice(0,32)}" (${r.match.distance}m)`)
}

console.log('\n=== Sample: same_domain (first 10) ===')
seen.clear()
for (const r of buckets.same_domain) {
  if (seen.has(r.club)) continue; seen.add(r.club)
  if (seen.size > 10) break
  console.log(`  ${r.country.slice(0,4).padEnd(4)} | "${r.club.slice(0,32).padEnd(32)}" -> "${r.match.club.slice(0,32)}" | domain: ${getDomain(r.website)}`)
}

console.log('\n=== Sample: unique (first 15) ===')
buckets.unique.slice(0, 15).forEach(r => {
  console.log(`  ${r.country.slice(0,4).padEnd(4)} | "${r.club.slice(0,38).padEnd(38)}" | addr: ${(r.address||'').slice(0,28).padEnd(28)} | nearest: ${(r.closest_visible?.club||'-').slice(0,22)} (${r.closest_visible?.dist_m || '?'}m)`)
})
