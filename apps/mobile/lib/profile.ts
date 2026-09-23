import { supabase } from './supabase';

export type Profile = {
  full_name: string | null;
  handicap: number | null;
  home_club: string | null;
  home_country: string | null;
  referral_code: string | null;
  // Nullable in the DB (defaults added after the columns existed, so older
  // rows can still be NULL) — treat null as false wherever these render.
  is_public: boolean | null;
  show_ratings_public: boolean | null;
  allow_messages_from_strangers: boolean | null;
  show_in_search: boolean | null;
  show_course_count: boolean | null;
  hide_from_feeds: boolean;
  push_enabled: boolean;
};

const PROFILE_FIELDS =
  'full_name, handicap, home_club, home_country, referral_code, is_public, show_ratings_public, allow_messages_from_strangers, show_in_search, show_course_count, hide_from_feeds, push_enabled';

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
  updates: {
    full_name: string | null;
    handicap: number | null;
    home_club: string | null;
    home_country: string | null;
    // Onboarding only — omit entirely rather than passing false; consent
    // should only ever be recorded at the moment it's actively given (GDPR),
    // matching web's OnboardingClient.tsx.
    marketing_opt_in?: true;
    marketing_opt_in_at?: string;
  }
): Promise<void> {
  const { error } = await supabase.from('profiles').update(updates).eq('id', userId);
  if (error) throw error;
}

// Web API routes that need the service role; the app has no cookie session,
// so they take the Supabase access token as a Bearer header instead.
async function postToWebApi(path: string): Promise<Response> {
  const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not signed in');

  return fetch(`${apiBaseUrl}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${session.access_token}` },
  });
}

/** Sends the one-time welcome DM (same as web onboarding). Idempotent. */
export async function sendWelcomeMessage(): Promise<void> {
  const res = await postToWebApi('/api/welcome');
  if (!res.ok) throw new Error('Could not send welcome message');
}

/**
 * Permanently deletes the signed-in user's account and all of their data
 * via web's /api/delete-account (auth.admin.deleteUser needs the service
 * role, so it can't run from the app). Clears the local session afterwards;
 * a server-side sign-out would fail since the user no longer exists.
 */
export async function deleteAccount(): Promise<void> {
  const res = await postToWebApi('/api/delete-account');
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? 'Could not delete your account. Please try again.');
  }

  await supabase.auth.signOut({ scope: 'local' });
}

export async function updateProfileField(
  userId: string,
  field: keyof Pick<
    Profile,
    | 'is_public'
    | 'show_ratings_public'
    | 'allow_messages_from_strangers'
    | 'show_in_search'
    | 'show_course_count'
    | 'hide_from_feeds'
    | 'push_enabled'
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
