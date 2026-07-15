import { supabase } from './supabase';

export type Course = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  holes: number | null;
};

const COURSE_FIELDS = 'id, name, club, country, state, holes';
const COURSE_LIST_LIMIT = 100;
const SEARCH_RESULT_LIMIT = 50;

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .order('name')
    .limit(COURSE_LIST_LIMIT);

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

export async function searchCourses(query: string): Promise<Course[]> {
  const safeQuery = sanitizeForIlikeFilter(query);
  if (safeQuery.length === 0) return [];

  const { data, error } = await supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .or(`name.ilike.%${safeQuery}%,club.ilike.%${safeQuery}%`)
    .order('name')
    .limit(SEARCH_RESULT_LIMIT);

  if (error) throw error;
  return data ?? [];
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
