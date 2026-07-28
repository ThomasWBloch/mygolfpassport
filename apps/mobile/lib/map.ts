import { supabase } from './supabase';

/**
 * Ported from apps/web/src/app/courses/CoursesMapView.tsx — the user's
 * stamped courses (primary rounds only; combo loop-rounds are bookkeeping
 * and shouldn't render extra pins or accordion rows), grouped by country
 * with a representative lat/lng for the map pin.
 */
export type MapCourse = { id: string; name: string; club: string | null; rating: number | null };
export type CountryGroup = { country: string; flag: string; lat: number; lng: number; count: number; courses: MapCourse[] };

type RoundRatingRow = { course_id: string; rating: number | null };
type CourseRow = { id: string; name: string; club: string | null; country: string | null; flag: string | null; latitude: number | null; longitude: number | null };

export async function fetchMapData(
  userId: string
): Promise<{ countries: CountryGroup[]; totalRounds: number; totalCountries: number }> {
  const { data: rounds, error: roundsError } = await supabase
    .from('rounds')
    .select('course_id, rating')
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .returns<RoundRatingRow[]>();
  if (roundsError) throw roundsError;

  const ratingMap = new Map<string, number[]>();
  for (const r of rounds ?? []) {
    if (r.rating == null) continue;
    const arr = ratingMap.get(r.course_id) ?? [];
    arr.push(r.rating);
    ratingMap.set(r.course_id, arr);
  }
  function avgRating(courseId: string): number | null {
    const ratings = ratingMap.get(courseId);
    if (!ratings || ratings.length === 0) return null;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }

  const distinctCourseIds = [...new Set((rounds ?? []).map((r) => r.course_id))];
  if (distinctCourseIds.length === 0) return { countries: [], totalRounds: 0, totalCountries: 0 };

  const { data: courseRows, error: coursesError } = await supabase
    .from('courses')
    .select('id, name, club, country, flag, latitude, longitude')
    .in('id', distinctCourseIds)
    .returns<CourseRow[]>();
  if (coursesError) throw coursesError;

  const grouped = new Map<string, CountryGroup>();
  for (const course of courseRows ?? []) {
    if (course.latitude == null || course.longitude == null || !course.country) continue;
    const key = course.country;
    if (!grouped.has(key)) {
      grouped.set(key, { country: course.country, flag: course.flag ?? '', lat: course.latitude, lng: course.longitude, count: 0, courses: [] });
    }
    const entry = grouped.get(key)!;
    entry.count += 1;
    entry.courses.push({ id: course.id, name: course.name, club: course.club, rating: avgRating(course.id) });
  }

  for (const group of grouped.values()) {
    group.courses.sort((a, b) => {
      if (a.rating == null && b.rating == null) return 0;
      if (a.rating == null) return 1;
      if (b.rating == null) return -1;
      return b.rating - a.rating;
    });
  }

  const countries = [...grouped.values()];
  const totalRounds = countries.reduce((sum, c) => sum + c.count, 0);
  const totalCountries = countries.length;

  return { countries, totalRounds, totalCountries };
}

/**
 * Ported from apps/web/src/components/CountryClusterMap.tsx's data need —
 * every displayable course in a country (not just the ones the viewer has
 * played), so the drill-down map can show a pin for each and color it by
 * played status.
 */
export type CountryMapCourse = {
  id: string;
  name: string;
  club: string | null;
  holes: number | null;
  latitude: number;
  longitude: number;
  played: boolean;
};

type CountryCourseRow = { id: string; name: string; club: string | null; holes: number | null; latitude: number | null; longitude: number | null };

// PostgREST caps a single request at 1000 rows by default; a country with
// more displayable courses than that (e.g. USA) would silently truncate
// without paging through with .range().
const PAGE_SIZE = 1000;

async function fetchAllCountryCourseRows(country: string): Promise<CountryCourseRow[]> {
  const all: CountryCourseRow[] = [];
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name, club, holes, latitude, longitude')
      .eq('country', country)
      .not('is_displayed', 'is', false)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      .range(from, from + PAGE_SIZE - 1)
      .returns<CountryCourseRow[]>();
    if (error) throw error;

    const page = data ?? [];
    all.push(...page);
    if (page.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }
  return all;
}

export async function fetchCountryMapCourses(country: string, userId: string): Promise<CountryMapCourse[]> {
  const [courseRows, playedRes] = await Promise.all([
    fetchAllCountryCourseRows(country),
    supabase.from('rounds').select('course_id').eq('user_id', userId),
  ]);
  if (playedRes.error) throw playedRes.error;

  const playedIds = new Set((playedRes.data ?? []).map((r) => r.course_id as string));

  return courseRows
    .filter((c) => c.latitude != null && c.longitude != null)
    .map((c) => ({
      id: c.id,
      name: c.name,
      club: c.club,
      holes: c.holes,
      latitude: c.latitude as number,
      longitude: c.longitude as number,
      played: playedIds.has(c.id),
    }));
}
