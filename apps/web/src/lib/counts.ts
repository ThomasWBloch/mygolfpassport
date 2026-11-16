import type { SupabaseClient } from '@supabase/supabase-js'

type CountRoundRow = {
  user_id: string
  course_id: string
  courses: { country: string | null; state: string | null; is_major: boolean | null } | null
}

// PostgREST caps every response at 1000 rows (Supabase `max_rows`). A single
// unpaginated query silently truncates once the table grows past that, which
// made users' leaderboard counts too low. Page explicitly instead.
const PAGE_SIZE = 1000

/**
 * Fetch the rows needed to compute per-user "courses played" counts.
 *
 * Combo-rounds fan out into child rows with `parent_round_id` set to the
 * parent round's id. Those children must never be counted as separately
 * played courses, or a single combo-round gets double/triple-counted.
 * `.is('parent_round_id', null)` excludes them.
 *
 * Returns `{ data, error }` like a normal supabase-js query. Results are
 * paginated (ordered by id for stable paging) so >1000 rows are not lost.
 */
export async function fetchRoundsForCourseCounts(
  supabase: SupabaseClient,
  userIds: string[]
): Promise<{ data: CountRoundRow[]; error: { message: string } | null }> {
  const all: CountRoundRow[] = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from('rounds')
      .select('user_id, course_id, courses(country, state, is_major)')
      .in('user_id', userIds)
      .is('parent_round_id', null)
      .order('id')
      .range(from, from + PAGE_SIZE - 1)
      .returns<CountRoundRow[]>()
    if (error) return { data: all, error }
    all.push(...(data ?? []))
    if (!data || data.length < PAGE_SIZE) break
  }
  return { data: all, error: null }
}
