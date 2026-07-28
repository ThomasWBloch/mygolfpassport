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

export type EditableRound = {
  roundId: string;
  rating: number | null;
  note: string | null;
  playedAt: string | null;
  course: { id: string; name: string; club: string | null; country: string | null; state: string | null; flag: string | null; holes: number | null };
};

type EditableRoundRow = {
  id: string;
  user_id: string;
  parent_round_id: string | null;
  rating: number | null;
  note: string | null;
  played_at: string | null;
  courses:
    | { id: string; name: string; club: string | null; country: string | null; state: string | null; flag: string | null; holes: number | null }
    | { id: string; name: string; club: string | null; country: string | null; state: string | null; flag: string | null; holes: number | null }[]
    | null;
};

/**
 * Ported from apps/web/src/app/log/page.tsx's editRoundFetch — used when
 * arriving via /log?edit=<roundId> (the You tab's Courses accordion pencil
 * icon). Synthetic loop-rounds from combo fan-out can't be directly
 * edited, so this returns null for anything that isn't a parent round
 * owned by the caller.
 */
export async function fetchEditableRound(roundId: string, userId: string): Promise<EditableRound | null> {
  const { data, error } = await supabase
    .from('rounds')
    .select('id, user_id, parent_round_id, rating, note, played_at, courses(id, name, club, country, state, flag, holes)')
    .eq('id', roundId)
    .maybeSingle<EditableRoundRow>();
  if (error) throw error;
  if (!data || data.user_id !== userId || data.parent_round_id != null) return null;

  const course = Array.isArray(data.courses) ? data.courses[0] : data.courses;
  if (!course) return null;

  return { roundId: data.id, rating: data.rating, note: data.note, playedAt: data.played_at, course };
}

/**
 * Ported from apps/web/src/app/api/rounds/[id]/route.ts's PATCH handler,
 * minus badge re-evaluation (deferred — see the update_round RPC comment).
 * Calls the update_round() RPC directly since the rounds table has no
 * client-facing UPDATE policy (web's route uses the service_role key).
 */
export async function updateRound(params: { roundId: string; rating: number | null; note: string | null; playedAt: string | null }): Promise<void> {
  const { error } = await supabase.rpc('update_round', {
    p_round_id: params.roundId,
    p_rating: params.rating,
    p_played_at: params.playedAt,
    p_note: params.note,
  });
  if (error) throw error;
}

/**
 * Ported from apps/web/src/app/api/rounds/delete/route.ts. rounds has no
 * client-facing DELETE policy (service role only) and the badge-revocation
 * business logic (fetchUserData/evaluateCriteria in
 * apps/web/src/lib/badges.ts) is too large/nuanced to safely re-implement
 * in SQL, so this calls a Supabase Edge Function
 * (supabase/functions/delete-round) that ports that TypeScript logic
 * near-verbatim instead of a plpgsql RPC.
 */
export async function deleteRound(roundId: string): Promise<{ removedBadges: string[] }> {
  const { data, error } = await supabase.functions.invoke('delete-round', {
    body: { round_id: roundId },
  });
  if (error) throw error;
  if (!data?.success) throw new Error(data?.error ?? 'Could not delete the round. Please try again.');
  return { removedBadges: data.removed_badges ?? [] };
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
