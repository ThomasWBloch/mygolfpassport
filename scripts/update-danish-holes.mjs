// Update holes field for Danish golf courses using data from golfmagasin.dk
// Run with: node --env-file=.env.local scripts/update-danish-holes.mjs

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// ── Step 1: Fetch and parse golfmagasin.dk ─────────────────────────────────
// Table columns: DGU nummer | Golfklubbens navn | Antal medlemmer | Green fee pris |
//                Pay and Play | Antal huller | Klubbens adresse | Kontakt | Hjemmeside

async function fetchGolfmagasinData() {
  console.log('Fetching golfmagasin.dk/golfklubber/ ...')
  const resp = await fetch('https://golfmagasin.dk/golfklubber/', {
    signal: AbortSignal.timeout(30000),
  })
  if (!resp.ok) {
    console.error(`HTTP ${resp.status}`)
    process.exit(1)
  }
  const html = await resp.text()
  console.log(`  Got ${html.length} bytes of HTML`)

  const clubs = []
  const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi
  let trMatch
  while ((trMatch = trRegex.exec(html)) !== null) {
    const rowHtml = trMatch[1]
    // Skip header rows
    if (rowHtml.includes('<th')) continue

    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi
    const cells = []
    let tdMatch
    while ((tdMatch = tdRegex.exec(rowHtml)) !== null) {
      cells.push(tdMatch[1].replace(/<[^>]*>/g, '').trim())
    }

    // Column indices: 0=DGU, 1=Name, 2=Members, 3=Green fee, 4=Pay&Play, 5=Holes, 6=Address, 7=Contact, 8=Website
    if (cells.length < 6) continue

    const name = cells[1]
    const holesStr = cells[5]
    const address = cells[6] || null
    const contact = cells[7] || null
    const website = cells[8] || null

    if (!name || !holesStr) continue

    const holes = parseInt(holesStr, 10)
    if (isNaN(holes) || holes <= 0) continue

    // Extract phone from contact field (format: "email / phone")
    let phone = null
    if (contact) {
      const phonePart = contact.split('/').pop()?.trim()
      if (phonePart && /\d{2}\s?\d{2}\s?\d{2}\s?\d{2}/.test(phonePart)) {
        phone = phonePart
      }
    }

    clubs.push({ name, holes, address, phone, website })
  }

  console.log(`  Parsed ${clubs.length} clubs from golfmagasin.dk\n`)
  return clubs
}

// ── Step 2: Matching logic ─────────────────────────────────────────────────

function normalize(s) {
  return s.toLowerCase()
    .replace(/golf\s*klub(ben)?/g, '')
    .replace(/golf\s*club/g, '')
    .replace(/golf\s*center/g, '')
    .replace(/golfcenter/g, '')
    .replace(/golfbane/g, '')
    .replace(/[^a-zæøåäö0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function matchScore(sourceName, dbName, dbClub) {
  const src = normalize(sourceName)
  const name = normalize(dbName)
  const club = normalize(dbClub || '')

  // Exact normalized match
  if (src === name || src === club) return 100

  // One contains the other
  if (src.length > 3 && name.length > 3) {
    if (name.includes(src) || src.includes(name)) return 80
  }
  if (src.length > 3 && club.length > 3) {
    if (club.includes(src) || src.includes(club)) return 80
  }

  // Key word overlap
  const srcWords = src.split(' ').filter(w => w.length > 2)
  const nameWords = name.split(' ').filter(w => w.length > 2)
  const clubWords = club.split(' ').filter(w => w.length > 2)

  if (srcWords.length === 0) return 0

  const nameOverlap = srcWords.filter(w => nameWords.some(nw => nw.includes(w) || w.includes(nw))).length
  const clubOverlap = srcWords.filter(w => clubWords.some(cw => cw.includes(w) || w.includes(cw))).length
  const bestOverlap = Math.max(nameOverlap, clubOverlap)

  if (bestOverlap >= srcWords.length * 0.6 && bestOverlap >= 1) return 60

  return 0
}

// ── Step 3: Main ───────────────────────────────────────────────────────────

async function main() {
  const sourceClubs = await fetchGolfmagasinData()
  if (sourceClubs.length === 0) {
    console.error('No club data parsed. Aborting.')
    process.exit(1)
  }

  console.log('Source data sample (first 10):')
  sourceClubs.slice(0, 10).forEach(c => console.log(`  ${c.name} → ${c.holes} holes`))
  console.log()

  // Fetch all Danish courses from DB
  const { data: dbCourses } = await supabase
    .from('courses')
    .select('id, name, club, holes')
    .eq('country', 'Denmark')

  const allCourses = dbCourses || []
  const coursesNeedingHoles = allCourses.filter(c => c.holes == null)
  console.log(`${allCourses.length} Danish courses in DB, ${coursesNeedingHoles.length} missing holes\n`)

  let updated = 0
  let skipped = 0
  let unmatched = 0
  const alreadyUpdatedIds = new Set()

  for (const source of sourceClubs) {
    const matches = allCourses
      .filter(c => !alreadyUpdatedIds.has(c.id))
      .map(c => ({ course: c, score: matchScore(source.name, c.name, c.club) }))
      .filter(m => m.score >= 60)
      .sort((a, b) => b.score - a.score)

    if (matches.length === 0) {
      console.log(`  ✗ "${source.name}" (${source.holes}H) → no match`)
      unmatched++
      continue
    }

    const totalHoles = source.holes
    const matchedCourses = matches.map(m => m.course)

    if (totalHoles === 9 || totalHoles === 18) {
      const target = matchedCourses.find(c => c.holes == null)
      if (!target) {
        console.log(`  ○ "${source.name}" (${totalHoles}H) → "${matchedCourses[0].name}" already has ${matchedCourses[0].holes}H`)
        skipped++
        continue
      }
      const { error } = await supabase.from('courses').update({ holes: totalHoles }).eq('id', target.id)
      if (!error) {
        console.log(`  ✓ "${source.name}" (${totalHoles}H) → "${target.name}" = ${totalHoles}H`)
        updated++
        alreadyUpdatedIds.add(target.id)
      }
    } else if (totalHoles === 27) {
      // 18 + 9
      const needingHoles = matchedCourses.filter(c => c.holes == null)
      if (needingHoles.length === 0) {
        console.log(`  ○ "${source.name}" (27H) → all matches already have holes`)
        skipped++
        continue
      }
      const shortNames = /par.?3|academy|akademi|intermediate|short|9.?hul|pitch|pay.?play/i
      const shortCourse = needingHoles.find(c => shortNames.test(c.name))
      const mainCourse = needingHoles.find(c => c !== shortCourse)

      if (shortCourse && mainCourse) {
        await supabase.from('courses').update({ holes: 18 }).eq('id', mainCourse.id)
        await supabase.from('courses').update({ holes: 9 }).eq('id', shortCourse.id)
        console.log(`  ✓ "${source.name}" (27H) → "${mainCourse.name}" = 18H, "${shortCourse.name}" = 9H`)
        updated += 2
        alreadyUpdatedIds.add(mainCourse.id)
        alreadyUpdatedIds.add(shortCourse.id)
      } else {
        const target = needingHoles[0]
        await supabase.from('courses').update({ holes: 18 }).eq('id', target.id)
        console.log(`  ✓ "${source.name}" (27H) → "${target.name}" = 18H (single match)`)
        updated++
        alreadyUpdatedIds.add(target.id)
      }
    } else if (totalHoles === 36) {
      // 18 + 18
      const needingHoles = matchedCourses.filter(c => c.holes == null)
      if (needingHoles.length === 0) {
        console.log(`  ○ "${source.name}" (36H) → all matches already have holes`)
        skipped++
        continue
      }
      for (const target of needingHoles.slice(0, 2)) {
        await supabase.from('courses').update({ holes: 18 }).eq('id', target.id)
        console.log(`  ✓ "${source.name}" (36H) → "${target.name}" = 18H`)
        updated++
        alreadyUpdatedIds.add(target.id)
      }
    } else if (totalHoles === 54) {
      // 18 + 18 + 18
      const needingHoles = matchedCourses.filter(c => c.holes == null)
      if (needingHoles.length === 0) {
        console.log(`  ○ "${source.name}" (54H) → all matches already have holes`)
        skipped++
        continue
      }
      for (const target of needingHoles.slice(0, 3)) {
        await supabase.from('courses').update({ holes: 18 }).eq('id', target.id)
        console.log(`  ✓ "${source.name}" (54H) → "${target.name}" = 18H`)
        updated++
        alreadyUpdatedIds.add(target.id)
      }
    } else {
      console.log(`  ? "${source.name}" (${totalHoles}H) → unusual hole count, skipped`)
      skipped++
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`Summary:`)
  console.log(`  Updated:   ${updated} courses`)
  console.log(`  Skipped:   ${skipped} (already had holes)`)
  console.log(`  Unmatched: ${unmatched} (no DB match found)`)
  console.log(`  Source:    ${sourceClubs.length} clubs from golfmagasin.dk`)
}

main()
