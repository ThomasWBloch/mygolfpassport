import type { SupabaseClient } from '@supabase/supabase-js'
import { getContinent } from './continents'

// ── Types ────────────────────────────────────────────────────────────────────

interface Badge {
  id: string
  key: string
  tier: string
  criteria_type: string
  criteria_value: Record<string, unknown>
  xp_reward: number
}

interface AwardedBadge {
  key: string
  name: string
  emoji: string
  description: string
  tier: string
  xp_reward: number
}

const EUROPEAN_COUNTRIES = new Set([
  'Denmark', 'Sverige', 'Danmark',
  'Sweden', 'Scotland', 'Skotland',
  'Ireland', 'Irland', 'Wales',
  'England', 'France', 'Frankrig',
  'Germany', 'Tyskland', 'Netherlands',
  'Holland', 'Norway', 'Norge',
  'Finland',
])

// ── XP Functions ─────────────────────────────────────────────────────────────

export async function awardXP(
  userId: string,
  amount: number,
  reason: string,
  supabase: SupabaseClient
) {
  // Insert XP event
  await supabase.from('xp_events').insert({
    user_id: userId,
    xp_amount: amount,
    reason,
  })

  // Fetch current total and recalculate
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp')
    .eq('id', userId)
    .single()

  const currentXP = (profile?.total_xp as number) ?? 0
  const newTotal = currentXP + amount
  const newLevel = Math.floor(newTotal / 500) + 1

  await supabase
    .from('profiles')
    .update({ total_xp: newTotal, level: newLevel })
    .eq('id', userId)
}

export async function awardCourseXP(
  userId: string,
  isNewCountry: boolean,
  supabase: SupabaseClient
) {
  await awardXP(userId, 100, 'new_course', supabase)
  if (isNewCountry) {
    await awardXP(userId, 500, 'new_country', supabase)
  }
}

// ── Badge Checking ───────────────────────────────────────────────────────────

export async function checkAndAwardBadges(
  userId: string,
  supabase: SupabaseClient
): Promise<AwardedBadge[]> {
  // 1. Fetch all badge definitions
  const { data: allBadges } = await supabase
    .from('badges')
    .select('id, key, name, emoji, description, tier, criteria_type, criteria_value, xp_reward')

  if (!allBadges || allBadges.length === 0) return []

  // 2. Fetch already earned badge IDs for this user
  const { data: earnedRows } = await supabase
    .from('user_badges')
    .select('badge_id')
    .eq('user_id', userId)

  const earnedIds = new Set((earnedRows ?? []).map(r => r.badge_id as string))

  // 3. Filter to unevaluated badges
  const unearnedBadges = (allBadges as Badge[]).filter(b => !earnedIds.has(b.id))
  if (unearnedBadges.length === 0) return []

  // 4. Fetch user data needed for evaluation
  const userData = await fetchUserData(userId, supabase)

  // 5. Evaluate each unearned badge
  const newlyAwarded: AwardedBadge[] = []

  for (const badge of unearnedBadges) {
    const met = evaluateCriteria(badge, userData)
    if (!met) continue

    // Award badge
    const { error } = await supabase
      .from('user_badges')
      .insert({ user_id: userId, badge_id: badge.id })

    if (error) continue // skip if insert fails (e.g. duplicate)

    newlyAwarded.push({
      key: badge.key,
      name: (badge as unknown as { name: string }).name,
      emoji: (badge as unknown as { emoji: string }).emoji,
      description: (badge as unknown as { description: string }).description ?? '',
      tier: badge.tier,
      xp_reward: badge.xp_reward,
    })
  }

  return newlyAwarded
}

// ── User Data Fetching ───────────────────────────────────────────────────────

interface UserData {
  courseCount: number
  countries: string[]
  countryCount: number
  majorCount: number
  top100Count: number
  europeanCountryCount: number
  continentCount: number
  countryCounts: Map<string, number>
  roundsWithDates: { courseId: string; club: string | null; country: string | null; createdAt: string }[]
  // Per-club badge cap. Key is `${club}|||${country}`. Used by the
  // courses_in_days evaluator so it can apply the same credit-cap-per-club
  // rule within the time window. See fetchUserData for how the cap is derived.
  clubCaps: Map<string, number>
}

// ── Badge-counting credit rule ─────────────────────────────────────────────
//
// Established Session 50 (2026-05-12) when combo fan-out shipped: a user's
// "courses played" tally toward badges is not a raw count of distinct
// course_ids. Two principles:
//
//   1. Synthetic loop-rounds (parent_round_id IS NOT NULL) don't count.
//      They mark loops as "played" in the user's history but contribute zero
//      badge progress. Filtered at fetch time below.
//
//   2. Each club is capped at `ceil(total_holes_at_club / 18)` credits:
//        9-hole-only club  → 1
//        18-hole club      → 1
//        27-hole club      → 2
//        36-hole club      → 2
//        45-hole club      → 3
//      ...so playing all 3 combos at a 27-hole club like Furesø gives 2
//      credits, not 3. The third combo's "extra" round is already covered
//      by the first two.
//
//   3. A round is "creditable" if its course has holes >= 18, OR if the
//      club has no 18-hole option at all (the 9-hole-only par-3 / executive
//      course case). Direct 9-hole loop rounds at clubs with 18-hole combos
//      do not contribute — the user must play a combo to earn credit there.
//
// Applies to: course_count, country_courses, courses_in_days.
// Unchanged: country_count, continent_count, european_country_count,
// major_count, top100_count, grand_slam, year_rounder.

export async function fetchUserData(
  userId: string,
  supabase: SupabaseClient
): Promise<UserData> {
  // ── 1. User's primary rounds (synthetic loop-rounds excluded) ──────────
  const { data: rounds } = await supabase
    .from('rounds')
    .select('course_id, played_at, created_at, courses(name, club, country, holes, is_combo, is_major)')
    .eq('user_id', userId)
    .is('parent_round_id', null)

  type RoundRow = {
    course_id: string
    played_at: string | null
    created_at: string
    courses: {
      name: string
      club: string | null
      country: string | null
      holes: number | null
      is_combo: boolean
      is_major: boolean
    } | null
  }
  const rows = (rounds ?? []) as unknown as RoundRow[]

  // ── 2. Distinct (club, country) pairs the user has touched ──────────────
  const clubKey = (club: string, country: string) => `${club}|||${country}`
  const playedClubs = new Map<string, { club: string; country: string }>()
  for (const r of rows) {
    const c = r.courses
    if (c?.club && c?.country) {
      const k = clubKey(c.club, c.country)
      if (!playedClubs.has(k)) playedClubs.set(k, { club: c.club, country: c.country })
    }
  }

  // ── 3. Pull every course row at those clubs so we can derive total_holes
  //      and detect whether the club has any 18-hole option. Batched IN
  //      queries to stay under URL length limits for users with many clubs.
  type ClubCourseRow = { club: string; country: string; name: string; holes: number | null; is_combo: boolean }
  const allClubCourses: ClubCourseRow[] = []
  if (playedClubs.size > 0) {
    const clubList = [...playedClubs.values()]
    const BATCH = 100
    for (let i = 0; i < clubList.length; i += BATCH) {
      const batch = clubList.slice(i, i + BATCH)
      const clubsBatch = [...new Set(batch.map(c => c.club))]
      const countriesBatch = [...new Set(batch.map(c => c.country))]
      const { data: batchData } = await supabase
        .from('courses')
        .select('club, country, name, holes, is_combo')
        .in('club', clubsBatch)
        .in('country', countriesBatch)
      for (const c of (batchData ?? []) as ClubCourseRow[]) {
        // Cross-country namesake guard: a club name shared by two countries
        // would otherwise leak in via the cartesian product of IN-IN.
        if (playedClubs.has(clubKey(c.club, c.country))) allClubCourses.push(c)
      }
    }
  }

  // ── 4. Per-club metadata: total_holes, badge_cap, has_18_hole_option ───
  //      total_holes is the larger of:
  //        (a) distinct loop names across all combo rows × 9
  //            (Furesø's three combos → {Farum, Hestkøb, Parkvej} → 27)
  //        (b) sum of holes across distinct non-combo course names
  //            (St Andrews Links has 8 separate 18-hole courses + Balgove
  //            9-hole → 8×18 + 9 = 153. A naive MAX(holes) would treat
  //            this as a 1-cap club and crush legitimate multi-course
  //            plays.)
  //      Take MAX(a, b) because some clubs have both (e.g. a 27-hole loop
  //      complex plus a separate "Main 18" row), and either source alone
  //      under-counts.
  //      badge_cap = max(1, ceil(total_holes / 18))
  //      has_18: any course at the club has holes >= 18 (used as the
  //              "loop standalone NOT creditable" gate).
  type ClubMeta = { totalHoles: number; cap: number; has18: boolean }
  const clubMeta = new Map<string, ClubMeta>()
  const courseRowsByClub = new Map<string, ClubCourseRow[]>()
  for (const c of allClubCourses) {
    const k = clubKey(c.club, c.country)
    if (!courseRowsByClub.has(k)) courseRowsByClub.set(k, [])
    courseRowsByClub.get(k)!.push(c)
  }
  for (const [k, courses] of courseRowsByClub) {
    let has18 = false
    const loopNames = new Set<string>()
    // Per non-combo course name, keep the max holes value. Dedupes data-
    // quality artifacts like Eagle Ridge's three "Eagle Ridge" rows while
    // still surfacing different named courses (Eden, Jubilee, Old Course…).
    const holesByName = new Map<string, number>()
    for (const c of courses) {
      const h = c.holes ?? 0
      if (h >= 18) has18 = true
      if (c.is_combo) {
        if (c.name) {
          const parts = c.name.split(' + ').map(s => s.trim()).filter(Boolean)
          if (parts.length === 2) for (const p of parts) loopNames.add(p)
        }
      } else if (c.name) {
        const prev = holesByName.get(c.name) ?? 0
        if (h > prev) holesByName.set(c.name, h)
      }
    }
    const fromCombos = loopNames.size * 9
    let fromDistinctCourses = 0
    for (const h of holesByName.values()) fromDistinctCourses += h
    const totalHoles = Math.max(fromCombos, fromDistinctCourses)
    const cap = Math.max(1, Math.ceil(totalHoles / 18))
    clubMeta.set(k, { totalHoles, cap, has18 })
  }

  // ── 5. Determine creditable rounds ─────────────────────────────────────
  type Creditable = {
    courseId: string
    club: string
    country: string
    createdAt: string
    isMajor: boolean
  }
  const creditableRounds: Creditable[] = []
  for (const r of rows) {
    const c = r.courses
    if (!c?.club || !c?.country) continue
    const k = clubKey(c.club, c.country)
    const meta = clubMeta.get(k)
    if (!meta) continue
    const holes = c.holes ?? 0
    // Round is creditable when course has 18+ holes OR the club has no
    // 18-hole option (9-hole-only par-3/exec courses).
    const isCreditable = holes >= 18 || !meta.has18
    if (!isCreditable) continue
    creditableRounds.push({
      courseId: r.course_id,
      club: c.club,
      country: c.country,
      createdAt: r.created_at,
      isMajor: c.is_major,
    })
  }

  // ── 6. Sum credits per club (capped) → courseCount + countryCounts ─────
  const creditableByClub = new Map<string, Set<string>>()
  for (const cr of creditableRounds) {
    const k = clubKey(cr.club, cr.country)
    if (!creditableByClub.has(k)) creditableByClub.set(k, new Set())
    creditableByClub.get(k)!.add(cr.courseId)
  }
  let courseCount = 0
  const countryCounts = new Map<string, number>()
  const creditedCountries = new Set<string>()
  for (const [k, courseSet] of creditableByClub) {
    const meta = clubMeta.get(k)
    if (!meta) continue
    const credit = Math.min(courseSet.size, meta.cap)
    if (credit <= 0) continue
    courseCount += credit
    const country = k.split('|||')[1]
    countryCounts.set(country, (countryCounts.get(country) ?? 0) + credit)
    creditedCountries.add(country)
  }

  // ── 7. Country list (countries the user earned at least 1 credit in) ───
  const countries = [...creditedCountries]
  const countryCount = countries.length

  // ── 8. Major + top100 (distinct creditable courses) ────────────────────
  const majorCourseIds = new Set(
    creditableRounds.filter(r => r.isMajor).map(r => r.courseId)
  )
  const majorCount = majorCourseIds.size

  const creditableCourseIds = [...new Set(creditableRounds.map(r => r.courseId))]
  let top100Count = 0
  if (creditableCourseIds.length > 0) {
    const { count } = await supabase
      .from('top100_rankings')
      .select('course_id', { count: 'exact', head: true })
      .in('course_id', creditableCourseIds)
    top100Count = count ?? 0
  }

  // ── 9. European + continent counts ─────────────────────────────────────
  const europeanCountryCount = countries.filter(c => EUROPEAN_COUNTRIES.has(c)).length
  const continents = new Set(countries.map(c => getContinent(c)))
  const continentCount = continents.size

  // ── 10. roundsWithDates — used by courses_in_days + year_rounder.
  //       Restricted to creditable rounds (same set used above) and
  //       enriched with club so the in-window credit accounting can
  //       reuse clubCaps below.
  const roundsWithDates = creditableRounds.map(r => ({
    courseId: r.courseId,
    club: r.club,
    country: r.country,
    createdAt: r.createdAt,
  }))

  // ── 11. clubCaps — exposed for the courses_in_days evaluator. Same key
  //       shape as used internally (`${club}|||${country}`).
  const clubCaps = new Map<string, number>()
  for (const [k, meta] of clubMeta) clubCaps.set(k, meta.cap)

  return {
    courseCount,
    countries,
    countryCount,
    majorCount,
    top100Count,
    europeanCountryCount,
    continentCount,
    countryCounts,
    roundsWithDates,
    clubCaps,
  }
}

// ── Criteria Evaluation ──────────────────────────────────────────────────────

export function evaluateCriteria(badge: Badge, data: UserData): boolean {
  const cv = badge.criteria_value
  const type = badge.criteria_type

  switch (type) {
    case 'course_count':
      return data.courseCount >= (cv.count as number)

    case 'country_count':
      return data.countryCount >= (cv.count as number)

    case 'major_count':
      return data.majorCount >= (cv.count as number)

    case 'top100_count':
      return data.top100Count >= (cv.count as number)

    case 'european_country_count':
      return data.europeanCountryCount >= (cv.count as number)

    case 'continent_count':
      return data.continentCount >= (cv.count as number)

    case 'country_courses': {
      const country = cv.country as string
      const needed = cv.count as number
      return (data.countryCounts.get(country) ?? 0) >= needed
    }

    case 'courses_in_days': {
      // Apply the credit-cap-per-club rule within the time window: a 27-hole
      // club caps at 2 credits inside the window regardless of how many
      // combos were logged there during that span. Without the cap, a single
      // visit to a 27-hole club would trivially unlock "On a Roll" (3 in 30).
      const days = cv.days as number
      const needed = cv.count as number
      const cutoff = Date.now() - days * 86400000
      const recent = data.roundsWithDates.filter(
        r => new Date(r.createdAt).getTime() >= cutoff
      )
      const byClub = new Map<string, Set<string>>()
      for (const r of recent) {
        if (!r.club || !r.country) continue
        const k = `${r.club}|||${r.country}`
        if (!byClub.has(k)) byClub.set(k, new Set())
        byClub.get(k)!.add(r.courseId)
      }
      let credits = 0
      for (const [k, courseSet] of byClub) {
        const cap = data.clubCaps.get(k) ?? 1
        credits += Math.min(courseSet.size, cap)
      }
      return credits >= needed
    }

    case 'year_rounder': {
      // Check if user has rounds in all 4 quarters of any single calendar year
      const yearQuarters = new Map<number, Set<number>>()
      for (const r of data.roundsWithDates) {
        const d = new Date(r.createdAt)
        const year = d.getFullYear()
        const quarter = Math.floor(d.getMonth() / 3) + 1
        const set = yearQuarters.get(year) ?? new Set()
        set.add(quarter)
        yearQuarters.set(year, set)
      }
      for (const quarters of yearQuarters.values()) {
        if (quarters.size === 4) return true
      }
      return false
    }

    case 'grand_slam': {
      const requiredCountries = cv.countries as string[]
      const userCountrySet = new Set(data.countries)
      return requiredCountries.every(c => userCountrySet.has(c))
    }

    default:
      return false
  }
}
