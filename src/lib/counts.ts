import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Fetch the rows needed to compute per-user "courses played" counts.
 *
 * Combo-rounds fan out into child rows with `parent_round_id` set to the
 * parent round's id. Those children must never be counted as separately
 * played courses, or a single combo-round gets double/triple-counted.
 * `.is('parent_round_id', null)` excludes them.
 */
export async function fetchRoundsForCourseCounts(
  supabase: SupabaseClient,
  userIds: string[]
) {
  return supabase
    .from('rounds')
    .select('user_id, course_id, courses(country)')
    .in('user_id', userIds)
    .is('parent_round_id', null)
}
