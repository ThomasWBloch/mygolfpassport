import { supabase } from './supabase';

export type Profile = {
  full_name: string | null;
  handicap: number | null;
  home_club: string | null;
  home_country: string | null;
};

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, handicap, home_club, home_country')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Same query shape as apps/web/src/lib/counts.ts's fetchRoundsForCourseCounts
 * — `parent_round_id IS NULL` is required to avoid double-counting
 * combo-round fan-out children. Duplicated here (not imported) because
 * apps/web isn't a shared package; if mobile's stats ever need more than
 * this one count, move counts.ts into packages/shared instead of
 * re-syncing this by hand.
 */
export async function fetchPlayedCoursesCount(userId: string): Promise<number> {
  const { data, error } = await supabase
    .from('rounds')
    .select('course_id')
    .eq('user_id', userId)
    .is('parent_round_id', null);

  if (error) throw error;
  const uniqueCourseIds = new Set((data ?? []).map((row) => row.course_id));
  return uniqueCourseIds.size;
}
