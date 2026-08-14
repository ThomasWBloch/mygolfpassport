import type { PlayedPrecision } from './played-date';
import { supabase } from './supabase';

/**
 * Data fetchers for the "You" tab's three subtabs (Profile / Courses /
 * Badges), ported from apps/web/src/app/you/YouProfileView.tsx,
 * YouCoursesView.tsx, YouBadgesView.tsx. Each subtab fetches only what it
 * renders, mirroring the web's per-view queries rather than one shared
 * mega-fetch.
 */

type CourseLite = { name: string | null; club: string | null; country: string | null; flag: string | null } | null;
function courseOf<T extends { courses: CourseLite | CourseLite[] }>(row: T): CourseLite {
  return Array.isArray(row.courses) ? (row.courses[0] ?? null) : row.courses;
}

// ── Profile subtab: passport-card stats + earned badge strip ────────────────

export type EarnedBadgeLite = { emoji: string; name: string; tier: string };

export type YouProfileStats = {
  courseCount: number;
  countryCount: number;
  clubFlag: string | null;
  earnedBadges: EarnedBadgeLite[];
};

type ProfileStatsRoundRow = { course_id: string; courses: CourseLite | CourseLite[] };
type EarnedBadgeRow = { badges: EarnedBadgeLite | EarnedBadgeLite[] | null };

export async function fetchYouProfileStats(userId: string, homeClub: string | null): Promise<YouProfileStats> {
  const [roundsRes, badgesRes] = await Promise.all([
    supabase
      .from('rounds')
      .select('course_id, courses(name, club, country, flag)')
      .eq('user_id', userId)
      .is('parent_round_id', null)
      .returns<ProfileStatsRoundRow[]>(),
    supabase
      .from('user_badges')
      .select('badges(emoji, name, tier)')
      .eq('user_id', userId)
      .order('earned_at', { ascending: false })
      .returns<EarnedBadgeRow[]>(),
  ]);
  if (roundsRes.error) throw roundsRes.error;
  if (badgesRes.error) throw badgesRes.error;

  const rows = roundsRes.data ?? [];
  const courseIds = new Set(rows.map((r) => r.course_id));
  const countries = new Set<string>();
  let clubFlag: string | null = null;
  for (const r of rows) {
    const c = courseOf(r);
    if (c?.country) countries.add(c.country);
    if (homeClub && c?.club === homeClub && clubFlag === null) clubFlag = c.flag ?? null;
  }

  const earnedBadges = (badgesRes.data ?? [])
    .map((ub) => (Array.isArray(ub.badges) ? ub.badges[0] : ub.badges))
    .filter((b): b is EarnedBadgeLite => !!b);

  return { courseCount: courseIds.size, countryCount: countries.size, clubFlag, earnedBadges };
}

// ── Profile subtab: ratings & written reviews ────────────────────────────────

export type RatingRow = { courseId: string; club: string; name: string; country: string; rating: number; played: string };
export type ReviewRow = RatingRow & { note: string };

type RatingReviewRoundRow = {
  course_id: string;
  rating: number | null;
  note: string | null;
  played_at: string | null;
  courses: CourseLite | CourseLite[];
};

export async function fetchRatingsReviews(userId: string): Promise<{ ratings: RatingRow[]; reviews: ReviewRow[] }> {
  const { data, error } = await supabase
    .from('rounds')
    .select('course_id, rating, note, played_at, courses(name, club, country, flag)')
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .returns<RatingReviewRoundRow[]>();
  if (error) throw error;

  const fmtPlayed = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  const rows = data ?? [];
  const rowBase = (r: RatingReviewRoundRow) => {
    const c = courseOf(r);
    return {
      courseId: r.course_id,
      club: c?.club ?? c?.name ?? 'Unknown course',
      name: c?.name ?? '',
      country: c?.country ?? '',
      played: fmtPlayed(r.played_at),
    };
  };

  const ratings: RatingRow[] = rows
    .filter((r) => r.rating != null)
    .map((r) => ({ ...rowBase(r), rating: r.rating as number }));

  const reviews: ReviewRow[] = rows
    .filter((r) => typeof r.note === 'string' && r.note.trim().length > 0)
    .sort((a, b) => String(b.played_at ?? '').localeCompare(String(a.played_at ?? '')))
    .map((r) => ({ ...rowBase(r), rating: r.rating ?? 0, note: (r.note as string).trim() }));

  return { ratings, reviews };
}

// ── Courses subtab: Courses (by round, grouped by country) + Countries ──────

export type CourseEntry = {
  courseId: string;
  courseName: string;
  clubName: string | null;
  country: string | null;
  flag: string | null;
  rating: number | null;
  playedAt: string | null;
  playedAtPrecision: PlayedPrecision | null;
  // Only populated for the most recent round on this course — lets the
  // Courses accordion offer an edit link on the caller's own profile.
  roundId: string | null;
};

export type CountryEntry = { country: string; flag: string | null; courseCount: number };

type CourseCountryRoundRow = {
  id: string;
  course_id: string;
  rating: number | null;
  played_at: string | null;
  played_at_precision: PlayedPrecision | null;
  created_at: string;
  courses: CourseLite | CourseLite[];
};

export async function fetchCourseCountryEntries(
  userId: string
): Promise<{ courseEntries: CourseEntry[]; countryEntries: CountryEntry[] }> {
  const { data, error } = await supabase
    .from('rounds')
    .select('id, course_id, rating, played_at, played_at_precision, created_at, courses(name, club, country, flag)')
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .order('created_at', { ascending: false })
    .returns<CourseCountryRoundRow[]>();
  if (error) throw error;

  const rows = data ?? [];
  const seen = new Set<string>();
  const courseEntries: CourseEntry[] = [];
  for (const r of rows) {
    if (seen.has(r.course_id)) continue;
    seen.add(r.course_id);
    const c = courseOf(r);
    if (!c?.name) continue;
    courseEntries.push({
      courseId: r.course_id,
      courseName: c.name,
      clubName: c.club,
      country: c.country,
      flag: c.flag,
      rating: r.rating,
      playedAt: r.played_at ?? r.created_at,
      playedAtPrecision: r.played_at_precision ?? 'day',
      roundId: r.id,
    });
  }

  const countryMap = new Map<string, { flag: string | null; count: number }>();
  for (const c of courseEntries) {
    if (!c.country) continue;
    const e = countryMap.get(c.country);
    if (e) e.count++;
    else countryMap.set(c.country, { flag: c.flag, count: 1 });
  }
  const countryEntries: CountryEntry[] = [...countryMap.entries()]
    .map(([country, { flag, count }]) => ({ country, flag, courseCount: count }))
    .sort((a, b) => b.courseCount - a.courseCount);

  return { courseEntries, countryEntries };
}

// ── Earned badges (with descriptions) — used by the public profile's
// Badges accordion, distinct from the full-catalog Badges subtab above. ────

export type BadgeEntry = { emoji: string; name: string; description: string; tier: string; earnedAt: string };

type EarnedBadgeFullRow = {
  earned_at: string;
  badges: { emoji: string; name: string; description: string; tier: string } | { emoji: string; name: string; description: string; tier: string }[] | null;
};

const TIER_WEIGHT: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 };

export async function fetchEarnedBadgeEntries(userId: string): Promise<BadgeEntry[]> {
  const { data, error } = await supabase
    .from('user_badges')
    .select('earned_at, badges(emoji, name, description, tier)')
    .eq('user_id', userId)
    .order('earned_at', { ascending: false })
    .returns<EarnedBadgeFullRow[]>();
  if (error) throw error;

  const entries = (data ?? [])
    .map((ub) => {
      const b = Array.isArray(ub.badges) ? ub.badges[0] : ub.badges;
      if (!b) return null;
      return { emoji: b.emoji, name: b.name, description: b.description, tier: b.tier, earnedAt: ub.earned_at };
    })
    .filter((b): b is BadgeEntry => b !== null);

  return entries.sort((a, b) => (TIER_WEIGHT[a.tier] ?? 9) - (TIER_WEIGHT[b.tier] ?? 9));
}

// ── Badges subtab: full catalog grouped by tier ──────────────────────────────

export type BadgeDef = { id: string; emoji: string; name: string; description: string; tier: string };
export type BadgeTierGroup = { tier: string; badges: (BadgeDef & { earned: boolean; earnedAt: string | null })[] };

export const TIER_ORDER = ['common', 'uncommon', 'rare', 'legendary'] as const;

export async function fetchAllBadgesWithEarned(
  userId: string
): Promise<{ groups: BadgeTierGroup[]; earnedCount: number; totalCount: number }> {
  const [allBadgesRes, userBadgesRes] = await Promise.all([
    supabase.from('badges').select('id, emoji, name, description, tier').order('name'),
    supabase.from('user_badges').select('badge_id, earned_at').eq('user_id', userId),
  ]);
  if (allBadgesRes.error) throw allBadgesRes.error;
  if (userBadgesRes.error) throw userBadgesRes.error;

  const allBadges = (allBadgesRes.data ?? []) as BadgeDef[];
  const earnedMap = new Map(
    (userBadgesRes.data ?? []).map((ub) => [ub.badge_id as string, ub.earned_at as string])
  );

  const groups: BadgeTierGroup[] = TIER_ORDER.map((tier) => ({
    tier,
    badges: allBadges
      .filter((b) => b.tier === tier)
      .map((b) => ({ ...b, earned: earnedMap.has(b.id), earnedAt: earnedMap.get(b.id) ?? null })),
  })).filter((g) => g.badges.length > 0);

  return { groups, earnedCount: earnedMap.size, totalCount: allBadges.length };
}
