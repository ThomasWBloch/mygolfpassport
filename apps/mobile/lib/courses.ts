import { normalizeSearch } from './friends';
import { supabase } from './supabase';

export type Course = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  holes: number | null;
  flag: string | null;
};

const COURSE_FIELDS = 'id, name, club, country, state, holes, flag';
// Matches web's CourseBrowser: fetch a generous raw-row pool once, then
// group/paginate by club client-side (see lib/course-groups.ts and
// components/CourseGroupList.tsx) instead of re-querying per page.
const RAW_ROW_LIMIT = 2000;

export async function fetchCourses(country?: string | null): Promise<Course[]> {
  let qb = supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .order('name')
    .limit(RAW_ROW_LIMIT);

  if (country) qb = qb.eq('country', country);

  const { data, error } = await qb;
  if (error) throw error;
  return data ?? [];
}

// PostgREST's .or() filter string treats , ( ) as syntax — strip them so a
// query containing e.g. "St. Andrews (Old)" can't produce a malformed
// filter. Not a security boundary (courses is publicly readable either
// way), just avoids confusing empty-result errors.
function sanitizeForIlikeFilter(query: string): string {
  return query.replace(/[,()]/g, ' ').trim();
}

/**
 * ILIKE only matches literal substrings, and course/club names in this
 * dataset are inconsistent about abbreviation periods — e.g. "St Andrews
 * Links" (Scotland, no period) vs "Larters at St. Andrews Golf and
 * Country Club" (Canada, has one). Searching "st. andrews" only matched
 * the period-normalized column, silently missing the famous course. Try
 * the query as typed AND a period-stripped variant so either data shape
 * matches, instead of trying to normalize one canonical form.
 */
function buildSearchPatterns(query: string): string[] {
  const base = sanitizeForIlikeFilter(query);
  if (base.length === 0) return [];
  const noPeriods = base.replace(/\./g, '').replace(/\s+/g, ' ').trim();
  return noPeriods.length > 0 && noPeriods !== base ? [base, noPeriods] : [base];
}

export async function searchCourses(query: string, country?: string | null): Promise<Course[]> {
  const patterns = buildSearchPatterns(normalizeSearch(query));
  if (patterns.length === 0) return [];

  const orClauses = patterns.flatMap((p) => [`name_normalized.ilike.%${p}%`, `club_normalized.ilike.%${p}%`]).join(',');

  let qb = supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .or(orClauses)
    .order('name')
    .limit(RAW_ROW_LIMIT);

  if (country) qb = qb.eq('country', country);

  const { data, error } = await qb;
  if (error) throw error;
  return data ?? [];
}

export type ClubResult = {
  club: string;
  country: string | null;
  flag: string | null;
};

/**
 * Home-club autocomplete for the Edit Profile screen — same
 * club_normalized ilike + dedupe-by-club + home-country-first sort as
 * apps/web/src/components/ProfileEditClient.tsx's searchClubs.
 */
export async function searchClubs(query: string, homeCountry: string | null): Promise<ClubResult[]> {
  const normalized = normalizeSearch(query);
  if (normalized.length < 2) return [];

  // Same period-inconsistency issue as searchCourses — try both the typed
  // query and a period-stripped variant against club_normalized.
  const noPeriods = normalized.replace(/\./g, '').replace(/\s+/g, ' ').trim();
  const clubPatterns = noPeriods.length > 0 && noPeriods !== normalized ? [normalized, noPeriods] : [normalized];
  const orClauses = clubPatterns.map((p) => `club_normalized.ilike.%${p}%`).join(',');

  const { data, error } = await supabase
    .from('courses')
    .select('club, country, flag')
    .or(orClauses)
    .not('club', 'is', null)
    .order('club')
    .limit(100);

  if (error) throw error;

  const seen = new Set<string>();
  const unique: ClubResult[] = [];
  for (const row of data ?? []) {
    if (!row.club) continue;
    const key = row.club.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ club: row.club, country: row.country, flag: row.flag });
  }

  unique.sort((a, b) => {
    if (homeCountry) {
      const aHome = a.country === homeCountry ? 0 : 1;
      const bHome = b.country === homeCountry ? 0 : 1;
      if (aHome !== bHome) return aHome - bHome;
    }
    const aStarts = normalizeSearch(a.club).startsWith(normalized) ? 0 : 1;
    const bStarts = normalizeSearch(b.club).startsWith(normalized) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.club.localeCompare(b.club);
  });

  return unique.slice(0, 8);
}

type PlayedCourseRow = { courses: Course | Course[] | null };

/**
 * Same rounds+courses join shape as fetchPlayedCoursesCount in
 * lib/profile.ts (parent_round_id IS NULL, dedupe by course_id) — this
 * version selects the full course row instead of just counting.
 */
export async function fetchPlayedCourses(userId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('rounds')
    .select(`courses(${COURSE_FIELDS})`)
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .returns<PlayedCourseRow[]>();

  if (error) throw error;

  const seen = new Set<string>();
  const courses: Course[] = [];
  for (const row of data ?? []) {
    const course = Array.isArray(row.courses) ? row.courses[0] : row.courses;
    if (course && !seen.has(course.id)) {
      seen.add(course.id);
      courses.push(course);
    }
  }
  return courses.sort((a, b) => a.name.localeCompare(b.name));
}

export type NearbyCourse = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  flag: string | null;
  distanceKm: number;
  played: boolean;
};

// Same haversine formula as apps/web/src/app/api/courses/nearby/route.ts.
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type NearbyRow = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  flag: string | null;
  latitude: number | null;
  longitude: number | null;
};

/**
 * Web's version is a Next.js API route reading cookie-based auth; mobile
 * has no server route to call, so this ports the same bounding-box +
 * haversine + played-exclusion logic directly against Supabase.
 */
export async function fetchNearbyCourses(
  userId: string,
  lat: number,
  lng: number,
  limit = 5,
  includePlayed = false
): Promise<NearbyCourse[]> {
  const latDelta = 1.0; // ~111km
  const lngDelta = 2.0; // ~111km * cos(lat), generous for northern Europe

  const [{ data: nearby, error }, { data: playedRows, error: playedError }] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, state, flag, latitude, longitude')
      .eq('is_displayed', true)
      .gte('latitude', lat - latDelta)
      .lte('latitude', lat + latDelta)
      .gte('longitude', lng - lngDelta)
      .lte('longitude', lng + lngDelta)
      .limit(500)
      .returns<NearbyRow[]>(),
    supabase.from('rounds').select('course_id').eq('user_id', userId),
  ]);
  if (error) throw error;
  if (playedError) throw playedError;

  const playedIds = new Set((playedRows ?? []).map((r) => r.course_id as string));

  return (nearby ?? [])
    .filter((c) => c.latitude != null && c.longitude != null)
    .filter((c) => includePlayed || !playedIds.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      club: c.club,
      country: c.country,
      state: c.state,
      flag: c.flag,
      distanceKm: Math.round(haversineKm(lat, lng, c.latitude as number, c.longitude as number) * 10) / 10,
      played: playedIds.has(c.id),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

type LastRoundCourseRow = { latitude: number | null; longitude: number | null };
type LastRoundRow = { courses: LastRoundCourseRow | LastRoundCourseRow[] | null };

/**
 * Fallback reference point for "Courses near you" when device geolocation
 * is denied/unavailable. Intentionally native-only — see memory
 * project_log_nearby_fallback: web deliberately has no fallback because
 * browser geolocation denial is a much weaker signal than a native permission
 * denial, but this was always meant to ship on the native build once built.
 */
export async function fetchLastRoundCoords(userId: string): Promise<{ lat: number; lng: number } | null> {
  const { data, error } = await supabase
    .from('rounds')
    .select('created_at, courses(latitude, longitude)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .returns<LastRoundRow[]>();
  if (error) throw error;

  const row = data?.[0];
  const course = Array.isArray(row?.courses) ? row?.courses[0] : row?.courses;
  if (!course?.latitude || !course?.longitude) return null;
  return { lat: course.latitude, lng: course.longitude };
}
