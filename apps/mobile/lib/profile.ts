import { supabase } from './supabase';

export type Profile = {
  full_name: string | null;
  handicap: number | null;
  home_club: string | null;
  home_country: string | null;
  // Nullable in the DB (defaults added after the columns existed, so older
  // rows can still be NULL) — treat null as false wherever these render.
  allow_round_requests_friends: boolean | null;
  allow_round_requests_strangers: boolean | null;
  show_in_search: boolean | null;
  show_course_count: boolean | null;
  hide_from_feeds: boolean;
};

const PROFILE_FIELDS =
  'full_name, handicap, home_club, home_country, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count, hide_from_feeds';

export async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select(PROFILE_FIELDS)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(
  userId: string,
  updates: { full_name: string | null; handicap: number | null; home_club: string | null; home_country: string | null }
): Promise<void> {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
  if (error) throw error;
}

export async function updateProfileField(
  userId: string,
  field: keyof Pick<
    Profile,
    'allow_round_requests_friends' | 'allow_round_requests_strangers' | 'show_in_search' | 'show_course_count' | 'hide_from_feeds'
  >,
  value: boolean
): Promise<void> {
  const { error } = await supabase.from('profiles').update({ [field]: value }).eq('id', userId);
  if (error) throw error;
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
