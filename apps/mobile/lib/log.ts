import { supabase } from './supabase';

export async function logRound(params: {
  userId: string;
  courseId: string;
  rating: number | null;
  note: string | null;
  playedAt: string;
}): Promise<void> {
  const { error } = await supabase.from('rounds').insert({
    user_id: params.userId,
    course_id: params.courseId,
    rating: params.rating,
    note: params.note,
    played_at: params.playedAt,
  });
  if (error) throw error;
}

type PrevCountryRow = { courses: { country: string | null } | { country: string | null }[] | null };

/**
 * Countries the user had already played before this course, for the
 * success screen's "new country" / "new continent" banner. Same shape as
 * apps/web/src/components/LogForm.tsx's prevCountryRounds query (no
 * parent_round_id filter, matching web exactly).
 */
export async function fetchPrevCountries(userId: string, excludeCourseId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('rounds')
    .select('course_id, courses(country)')
    .eq('user_id', userId)
    .neq('course_id', excludeCourseId)
    .returns<PrevCountryRow[]>();

  if (error) throw error;

  return (data ?? [])
    .map((row) => (Array.isArray(row.courses) ? row.courses[0]?.country : row.courses?.country))
    .filter((c): c is string => !!c);
}
