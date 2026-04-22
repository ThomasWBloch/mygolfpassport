// Scrape Icelandic golf clubs and courses from rastimar.golf.is (GSÍ).
// The site is a Remix app; full loader data is embedded in `window.__remixContext`
// on both list pages, so the two list requests return every field we need —
// no per-detail loop required (see summary at the end).
//
// Writes:
//   scripts/iceland-clubs-gsi.json
//   scripts/iceland-courses-gsi.json
//
// Respects the site: single hit per list endpoint, plain curl-style fetch.

import { writeFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 (compatible; mygolfpassport-research/1.0)'
const BASE = 'https://rastimar.golf.is'

// ── Remix SSR payload extraction ─────────────────────────────────────────────
function extractRemixContext(html) {
  const marker = 'window.__remixContext = '
  const start = html.indexOf(marker)
  if (start === -1) throw new Error('No __remixContext found')
  const from = start + marker.length
  let depth = 0, inStr = false, esc = false, end = -1
  for (let i = from; i < html.length; i++) {
    const ch = html[i]
    if (esc) { esc = false; continue }
    if (ch === '\\') { esc = true; continue }
    if (ch === '"') { inStr = !inStr; continue }
    if (inStr) continue
    if (ch === '{') depth++
    else if (ch === '}') { depth--; if (depth === 0) { end = i + 1; break } }
  }
  if (end === -1) throw new Error('Could not find end of __remixContext object')
  return JSON.parse(html.slice(from, end))
}

async function fetchHtml(path) {
  const res = await fetch(BASE + path, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`${path} → HTTP ${res.status}`)
  return res.text()
}

// ── Parse Icelandic postal address ──────────────────────────────────────────
// Format: "Street, 123 City" or "Street 12, 123 City" or "Street"
function splitAddress(addr) {
  if (!addr || typeof addr !== 'string') return { street: null, postal_code: null, city: null }
  const raw = addr.trim()
  // Match a 3-digit postal code followed by a city name at the end of the string.
  const m = raw.match(/^(.+?)(?:,\s*|\s+)(\d{3})\s+(.+)$/)
  if (m) {
    return { street: m[1].trim().replace(/,$/, ''), postal_code: m[2], city: m[3].trim() }
  }
  return { street: raw, postal_code: null, city: null }
}

// ── Scrape ──────────────────────────────────────────────────────────────────
console.log('Fetching /klubbar …')
const clubsHtml = await fetchHtml('/klubbar')
const clubsCtx = extractRemixContext(clubsHtml)
const rawClubs = clubsCtx.state.loaderData['routes/_public.klubbar._index']?.clubs ?? []

console.log('Fetching /vellir …')
const coursesHtml = await fetchHtml('/vellir')
const coursesCtx = extractRemixContext(coursesHtml)
const rawCourses = coursesCtx.state.loaderData['routes/_public.vellir._index']?.courses ?? []

// ── Build clubs JSON ────────────────────────────────────────────────────────
const clubs = rawClubs.map(c => {
  const parsed = splitAddress(c.address)
  return {
    id: c.id,
    name: c.name,
    short_name: c.short_name ?? null,
    slug: c.slug_v2 ?? c.slug,                   // prefer URL-safe slug_v2
    slug_original: c.slug,
    region: c.region ?? null,
    raw_address: c.address ?? null,
    street: parsed.street,
    postal_code: parsed.postal_code,
    city: parsed.city,
    phone: c.phone || null,
    email: c.email || null,
    website: c.website || null,
    latitude: c.latitude ?? null,
    longitude: c.longitude ?? null,
    logo_url: c.photo || null,
    affiliate_courses_website: c.affiliate_courses_website ?? null,
    has_practice_range: !!c.has_practice_range,
    has_practice_green: !!c.has_practice_green,
    has_club_rental: !!c.has_club_rental,
    has_golf_carts: !!c.has_golf_carts,
    has_simulator: !!c.has_simulator,
    course_count: (c.courses ?? []).length,
  }
})

// Build a lookup from club_id → club so we can annotate courses with club_name / club_slug
const clubById = new Map(rawClubs.map(c => [c.id, c]))

// ── Build courses JSON (prefer /vellir as it has more courses) ──────────────
const courses = rawCourses.map(r => {
  // The vellir endpoint embeds a `club` object on each course; fall back to the
  // clubById lookup from /klubbar when it's missing.
  const clubInline = r.club ?? null
  const clubRef = clubInline ?? clubById.get(r.club_id) ?? null
  const parsed = splitAddress(r.address)
  return {
    id: r.id,
    name: r.name,
    slug: r.slug_v2 ?? r.slug,
    slug_original: r.slug,
    club_id: r.club_id,
    club_name: clubRef?.name ?? null,
    club_slug: clubRef ? (clubRef.slug_v2 ?? clubRef.slug) : null,
    holes: r.length ?? null,                     // "length" == number of holes
    par: r.par ?? null,
    is_open: !!r.is_open,
    is_practice_course: !!r.is_practice_course,
    has_pay_and_play: !!r.has_pay_and_play,
    has_online_booking: !!r.has_online_booking,
    estimated_opening: r.estimated_opening ?? null,
    raw_address: r.address ?? null,
    street: parsed.street,
    postal_code: parsed.postal_code,
    city: parsed.city,
    latitude: r.latitude ?? null,
    longitude: r.longitude ?? null,
    photo_url: r.photo ?? null,
  }
})

// ── Cross-check: any club_id in courses that's not in clubs? ────────────────
const clubIds = new Set(clubs.map(c => c.id))
const orphanCourses = courses.filter(c => c.club_id != null && !clubIds.has(c.club_id))

// ── Write outputs ───────────────────────────────────────────────────────────
writeFileSync('scripts/iceland-clubs-gsi.json', JSON.stringify(clubs, null, 2))
writeFileSync('scripts/iceland-courses-gsi.json', JSON.stringify(courses, null, 2))

// ── Summary ─────────────────────────────────────────────────────────────────
const clubsWithWebsite = clubs.filter(c => c.website).length
const clubsWithCoords = clubs.filter(c => c.latitude != null && c.longitude != null).length
const clubsWithPhone = clubs.filter(c => c.phone).length
const clubsWithEmail = clubs.filter(c => c.email).length
const clubsWithPostal = clubs.filter(c => c.postal_code).length
const coursesWithCoords = courses.filter(c => c.latitude != null && c.longitude != null).length
const coursesOpen = courses.filter(c => c.is_open).length

console.log('\n═══════════════════════════════════════════════════')
console.log(' GSÍ scrape summary (rastimar.golf.is)')
console.log('═══════════════════════════════════════════════════')
console.log(` Clubs:   ${clubs.length}`)
console.log(`   with website:     ${clubsWithWebsite}  (${Math.round(clubsWithWebsite / clubs.length * 100)}%)`)
console.log(`   with phone:       ${clubsWithPhone}`)
console.log(`   with email:       ${clubsWithEmail}`)
console.log(`   with coordinates: ${clubsWithCoords}`)
console.log(`   with postal code: ${clubsWithPostal}`)
console.log(` Courses: ${courses.length}`)
console.log(`   with coordinates: ${coursesWithCoords}  (${Math.round(coursesWithCoords / courses.length * 100)}%)`)
console.log(`   currently open:   ${coursesOpen}`)
console.log(`   orphan (no matching club in /klubbar): ${orphanCourses.length}`)
if (orphanCourses.length > 0) {
  orphanCourses.forEach(c => console.log(`     • ${c.name} (club_id=${c.club_id})`))
}

console.log('\n Written:')
console.log('   scripts/iceland-clubs-gsi.json')
console.log('   scripts/iceland-courses-gsi.json')

console.log('\n Note: both list endpoints return fully-hydrated loader data, so')
console.log(' per-detail loops aren\'t needed for the requested fields. The')
console.log(' individual /klubbar/{slug} pages only add `affiliate_courses` and')
console.log(' `instructors` arrays, which aren\'t in scope for this scrape.')
