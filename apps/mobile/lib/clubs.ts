import { supabase } from './supabase';

/**
 * Ported from apps/web/src/lib/club-display.ts — a single text-value like
 * "Rolling Hills Country Club" can refer to several physically separate
 * golf clubs in different US states. Until there's a proper clubs table
 * with stable IDs, the club page disambiguates by grouping courses by
 * physical location (rounded lat/lng) and, for USA, labeling each group
 * with its state parsed from the address.
 */
export function parseStateFromUsAddress(address: string | null | undefined): string | null {
  if (!address) return null;
  const lastComma = address.lastIndexOf(',');
  if (lastComma === -1) return null;
  const tail = address.slice(lastComma + 1).trim();
  const match = tail.match(/^([A-Z]{2})\b/);
  return match ? match[1] : null;
}

export type ClubCourse = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  flag: string | null;
  holes: number | null;
  par: number | null;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
};

/**
 * Ported from apps/web/src/app/clubs/[country]/[club]/page.tsx's course
 * fetch. Web matches URL slugs against club_normalized with a fuzzy ilike
 * + exact-slug verification in JS (since slugs collapse spaces/accents);
 * mobile navigates with the exact club/country strings already in hand
 * (read off a Course row), so a plain ilike match is enough — no slugs to
 * round-trip.
 */
export async function fetchClubCourses(country: string, club: string): Promise<ClubCourse[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, country, flag, holes, par, latitude, longitude, address')
    .ilike('country', country)
    .ilike('club', club)
    .not('is_displayed', 'is', false)
    .order('holes', { ascending: false, nullsFirst: false })
    .order('name')
    .returns<ClubCourse[]>();
  if (error) throw error;
  return data ?? [];
}

export type ClubLocationGroup = {
  key: string;
  label: string;
  courses: ClubCourse[];
};

/**
 * Buckets courses by ~100m-precision rounded coordinates so namesake clubs
 * in different physical locations (e.g. "Eagle Ridge Golf Club" across
 * several US states) render as separate sections instead of one confusing
 * merged list. Groups sort by course-count DESC (the largest physical club
 * — typically the one the user navigated from — appears first). The state
 * suffix only applies for USA when the name genuinely maps to >1 location;
 * other countries have too few real namesakes for the suffix to be worth
 * showing unconditionally.
 */
export function groupByLocation(courses: ClubCourse[]): ClubLocationGroup[] {
  const buckets = new Map<string, ClubCourse[]>();
  for (const c of courses) {
    const key =
      c.latitude != null && c.longitude != null
        ? `${Math.round(c.latitude * 1000)}_${Math.round(c.longitude * 1000)}`
        : '__no_coords__';
    const bucket = buckets.get(key) ?? [];
    bucket.push(c);
    buckets.set(key, bucket);
  }

  const groups = [...buckets.entries()]
    .map(([key, groupCourses]) => {
      const withAddr = groupCourses.find((c) => c.address) ?? groupCourses[0];
      return { key, address: withAddr.address, courses: groupCourses };
    })
    .sort((a, b) => {
      if (b.courses.length !== a.courses.length) return b.courses.length - a.courses.length;
      const aLat = a.courses[0].latitude ?? 0;
      const bLat = b.courses[0].latitude ?? 0;
      return aLat - bLat;
    });

  const hasMultipleLocations = groups.length > 1;
  const country = courses[0]?.country ?? null;
  const showStateSuffix = hasMultipleLocations && country === 'USA';

  return groups.map(({ key, address, courses: groupCourses }) => {
    let label = 'Courses';
    if (hasMultipleLocations) {
      const state = showStateSuffix ? parseStateFromUsAddress(address) : null;
      if (state) {
        label = `Courses · ${state}`;
      } else if (address) {
        label = `Courses · ${address.split(',').slice(-2).join(',').trim()}`;
      } else if (key === '__no_coords__') {
        label = 'Courses · location unknown';
      }
    }
    return { key, label, courses: groupCourses };
  });
}

export type ClubRatingsAndPlayed = {
  ratingsByCourse: Map<string, { avg: number; count: number }>;
  playedIds: Set<string>;
};

export async function fetchClubRatingsAndPlayed(courseIds: string[], userId: string): Promise<ClubRatingsAndPlayed> {
  const [ratingsRes, playedRes] = await Promise.all([
    supabase.from('rounds').select('course_id, rating').in('course_id', courseIds).not('rating', 'is', null),
    supabase.from('rounds').select('course_id').eq('user_id', userId).in('course_id', courseIds),
  ]);
  if (ratingsRes.error) throw ratingsRes.error;
  if (playedRes.error) throw playedRes.error;

  const byRatings = new Map<string, number[]>();
  for (const r of ratingsRes.data ?? []) {
    const arr = byRatings.get(r.course_id) ?? [];
    arr.push(r.rating as number);
    byRatings.set(r.course_id, arr);
  }
  const ratingsByCourse = new Map(
    [...byRatings.entries()].map(([id, ratings]) => [
      id,
      { avg: ratings.reduce((a, b) => a + b, 0) / ratings.length, count: ratings.length },
    ])
  );

  const playedIds = new Set((playedRes.data ?? []).map((r) => r.course_id as string));

  return { ratingsByCourse, playedIds };
}
