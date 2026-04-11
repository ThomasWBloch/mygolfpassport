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

    // Award XP for the badge
    await awardXP(userId, badge.xp_reward, `badge_${badge.tier}`, supabase)

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
  roundsWithDates: { courseId: string; country: string | null; createdAt: string }[]
}

async function fetchUserData(
  userId: string,
  supabase: SupabaseClient
): Promise<UserData> {
  // Fetch all rounds with course info
  const { data: rounds } = await supabase
    .from('rounds')
    .select('course_id, created_at, courses(country, is_major)')
    .eq('user_id', userId)

  const rows = rounds ?? []

  // Distinct courses
  const courseIds = [...new Set(rows.map(r => r.course_id as string))]
  const courseCount = courseIds.length

  // Countries from rounds
  const countries = [
    ...new Set(
      rows
        .map(r => (r.courses as unknown as { country: string } | null)?.country)
        .filter((c): c is string => !!c)
    ),
  ]
  const countryCount = countries.length

  // Major count (distinct courses that are majors)
  const majorCourseIds = new Set(
    rows
      .filter(r => (r.courses as unknown as { is_major: boolean } | null)?.is_major)
      .map(r => r.course_id as string)
  )
  const majorCount = majorCourseIds.size

  // Top 100 count
  let top100Count = 0
  if (courseIds.length > 0) {
    const { count } = await supabase
      .from('top100_rankings')
      .select('course_id', { count: 'exact', head: true })
      .in('course_id', courseIds)
    top100Count = count ?? 0
  }

  // European country count
  const europeanCountryCount = countries.filter(c => EUROPEAN_COUNTRIES.has(c)).length

  // Continent count
  const continents = new Set(countries.map(c => getContinent(c)))
  const continentCount = continents.size

  // Per-country course counts
  const countryCounts = new Map<string, number>()
  for (const r of rows) {
    const country = (r.courses as unknown as { country: string } | null)?.country
    if (!country) continue
    countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1)
  }

  // Rounds with dates for time-based checks
  const roundsWithDates = rows.map(r => ({
    courseId: r.course_id as string,
    country: (r.courses as unknown as { country: string } | null)?.country ?? null,
    createdAt: r.created_at as string,
  }))

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
  }
}

// ── Criteria Evaluation ──────────────────────────────────────────────────────

function evaluateCriteria(badge: Badge, data: UserData): boolean {
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
      const days = cv.days as number
      const needed = cv.count as number
      const cutoff = Date.now() - days * 86400000
      const recent = data.roundsWithDates.filter(
        r => new Date(r.createdAt).getTime() >= cutoff
      )
      const distinctCourses = new Set(recent.map(r => r.courseId))
      return distinctCourses.size >= needed
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
