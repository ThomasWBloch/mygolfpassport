// Pass 4 — Hulantal- og banenavne-verifikation (DB vs LC).
//
// Genererer rapport over uoverensstemmelser mellem DB course-records og
// LC's banen-list pr klub. Manuel review, ingen auto-apply.
//
// For hver DB-klub:
//   1. Find LC-klub-match (sim ≥ 0.7)
//   2. For hver DB-course (med name + holes), find best LC banen-match
//   3. Flag: navn-uoverensstemmelse (sim < 0.85) eller holes-uoverensstemmelse
//
// Output:
//   scripts/netherlands/holland-banenavne-report.md
//   scripts/netherlands/holland-banenavne-diff.json
//
// Run: node --env-file=.env.local scripts/netherlands/report-netherlands-banenavne.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

const LC_PATH = 'scripts/netherlands/holland-lc-clubs.json'
const REPORT_PATH = 'scripts/netherlands/holland-banenavne-report.md'
const DIFF_PATH = 'scripts/netherlands/holland-banenavne-diff.json'

const norm = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\b(golf|club|the|de|gc|golfbaan|golfclub|country|links|course|baan|society|resort|hotel|vereniging)\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

function similarity(a, b) {
  a = norm(a); b = norm(b)
  if (!a || !b) return 0
  if (a === b) return 1
  const lev = (s, t) => {
    const m = s.length, n = t.length
    const dp = Array(n + 1).fill(0).map((_, i) => i)
    for (let i = 1; i <= m; i++) {
      let prev = dp[0]
      dp[0] = i
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j]
        dp[j] = s[i - 1] === t[j - 1] ? prev : 1 + Math.min(prev, dp[j], dp[j - 1])
        prev = tmp
      }
    }
    return dp[n]
  }
  return 1 - lev(a, b) / Math.max(a.length, b.length)
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const PAGE_SIZE = 1000
const db = []
for (let from = 0; ; from += PAGE_SIZE) {
  const { data, error } = await supabase
    .from('courses').select('id, name, club, holes').eq('country', 'Netherlands')
    .order('club').order('name').range(from, from + PAGE_SIZE - 1)
  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break
  db.push(...data)
  if (data.length < PAGE_SIZE) break
}

const lcRaw = JSON.parse(readFileSync(LC_PATH, 'utf8'))
const lc = Array.isArray(lcRaw) ? lcRaw : (lcRaw.clubs || [])

console.log(`DB: ${db.length} courses, LC: ${lc.length} klubber`)

const dbByClub = new Map()
for (const c of db) {
  if (!dbByClub.has(c.club)) dbByClub.set(c.club, [])
  dbByClub.get(c.club).push(c)
}

const diffs = []
let okCount = 0
let lcNoMatch = 0
let lcNoBanen = 0

for (const [club, courses] of dbByClub) {
  // Find LC klub-match
  let bestLcClub = null
  for (const lcClub of lc) {
    const sim = similarity(club, lcClub.name)
    if (sim < 0.7) continue
    if (!bestLcClub || sim > bestLcClub.sim) bestLcClub = { record: lcClub, sim }
  }

  if (!bestLcClub) { lcNoMatch++; continue }
  const lcBanen = bestLcClub.record.banen || []
  if (lcBanen.length === 0) { lcNoBanen++; continue }

  const clubDiffs = []
  for (const dbCourse of courses) {
    let bestBanen = null
    for (const banen of lcBanen) {
      const sim = similarity(dbCourse.name, banen.name)
      if (!bestBanen || sim > bestBanen.sim) bestBanen = { record: banen, sim }
    }

    const lcName = bestBanen?.record?.name
    const lcHoles = bestBanen?.record?.holes
    const nameSim = bestBanen?.sim || 0
    const nameMismatch = nameSim < 0.85
    const holesMismatch = lcHoles != null && dbCourse.holes != null && lcHoles !== dbCourse.holes

    if (nameMismatch || holesMismatch) {
      clubDiffs.push({
        courseId: dbCourse.id,
        dbName: dbCourse.name,
        dbHoles: dbCourse.holes,
        lcName,
        lcHoles,
        nameSim: +nameSim.toFixed(3),
        nameMismatch,
        holesMismatch,
      })
    } else {
      okCount++
    }
  }

  // Tjek også for unmatched LC-banen (banen i LC der ikke findes i DB)
  const dbCourseNames = courses.map((c) => norm(c.name))
  const unmatchedLcBanen = lcBanen.filter((b) => {
    return !dbCourseNames.some((dn) => similarity(b.name, dn) >= 0.85)
  })

  if (clubDiffs.length || unmatchedLcBanen.length) {
    diffs.push({
      club,
      lcName: bestLcClub.record.name,
      lcSim: +bestLcClub.sim.toFixed(3),
      dbCourseCount: courses.length,
      lcBanenCount: lcBanen.length,
      countMismatch: courses.length !== lcBanen.length,
      diffs: clubDiffs,
      unmatchedLcBanen: unmatchedLcBanen.map((b) => ({ name: b.name, holes: b.holes, rating: b.rating })),
    })
  }
}

writeFileSync(DIFF_PATH, JSON.stringify({ diffs, okCount, lcNoMatch, lcNoBanen }, null, 2))

const md = []
md.push('# Netherlands banenavne-verifikation (Pass 4)')
md.push(`Generated: ${new Date().toISOString().slice(0, 19)}`)
md.push('')
md.push('Sammenligning af DB course-records vs Leading Courses banen-list pr klub.')
md.push('Manuel review — ingen auto-apply.')
md.push('')
md.push('## Summary')
md.push('')
md.push(`| Status | Count |`)
md.push(`|---|---:|`)
md.push(`| Courses OK (navn match + holes match) | ${okCount} |`)
md.push(`| Klubber med diffs | ${diffs.length} |`)
md.push(`| Klubber uden LC-match | ${lcNoMatch} |`)
md.push(`| Klubber uden LC-banen-list | ${lcNoBanen} |`)
md.push('')

// Sort: count-mismatch først, så holes-mismatch, så name-mismatch
diffs.sort((a, b) => {
  if (a.countMismatch !== b.countMismatch) return a.countMismatch ? -1 : 1
  const aHm = a.diffs.filter((d) => d.holesMismatch).length
  const bHm = b.diffs.filter((d) => d.holesMismatch).length
  if (aHm !== bHm) return bHm - aHm
  return b.diffs.length - a.diffs.length
})

md.push('## Diffs per klub')
md.push('')
for (const d of diffs) {
  md.push(`### ${d.club} (DB-match LC: "${d.lcName}", sim=${d.lcSim})`)
  md.push(`- DB courses: ${d.dbCourseCount}, LC banen: ${d.lcBanenCount}${d.countMismatch ? ' ⚠️ COUNT MISMATCH' : ''}`)
  if (d.diffs.length) {
    md.push('')
    md.push('| DB Course | DB holes | LC Banen | LC holes | nameSim | issue |')
    md.push('|---|---:|---|---:|---:|---|')
    for (const c of d.diffs) {
      const issues = []
      if (c.nameMismatch) issues.push('NAME')
      if (c.holesMismatch) issues.push('HOLES')
      md.push(`| ${c.dbName} | ${c.dbHoles ?? '-'} | ${c.lcName ?? '-'} | ${c.lcHoles ?? '-'} | ${c.nameSim} | ${issues.join(', ')} |`)
    }
  }
  if (d.unmatchedLcBanen.length) {
    md.push('')
    md.push(`**LC-banen ikke i DB:**`)
    for (const b of d.unmatchedLcBanen) {
      md.push(`  - ${b.name} (${b.holes ?? '?'} holes, rating ${b.rating ?? '-'})`)
    }
  }
  md.push('')
}

writeFileSync(REPORT_PATH, md.join('\n'))

console.log('--- Banenavne-rapport summary ---')
console.log(`OK courses:               ${okCount}`)
console.log(`Klubber med diffs:        ${diffs.length}`)
console.log(`Klubber uden LC-match:    ${lcNoMatch}`)
console.log(`Klubber uden LC-banen:    ${lcNoBanen}`)
console.log(`Wrote: ${REPORT_PATH}`)
console.log(`Wrote: ${DIFF_PATH}`)
