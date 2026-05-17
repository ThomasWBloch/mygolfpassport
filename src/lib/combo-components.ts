import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Returns IDs of course rows that the UI should hide. Sources from the
 * persistent `is_displayed = false` flag on the courses table, which was
 * set globally on 2026-05-04 (memory: project_combo_display_strategy).
 *
 * The flag covers:
 *   * Combo "X + X" self-pairs — playing the same 9 holes twice isn't a
 *     distinct course.
 *   * Non-canonical reverse-order combos — for each unordered pair only
 *     the locale-sorted "X + Y" stays visible, the "Y + X" duplicate is
 *     hidden.
 *   * Federation-roster pollution (Turkish spor-kulübü, UK Ladies-only
 *     auxiliaries, indoor-studio rows, generic "18-hole course" dupes)
 *     that doesn't represent a real course.
 *
 * Earlier versions of this function recomputed categories 1 and 2 at
 * runtime from combo names. That logic had a row-order dependency: if a
 * non-canonical row arrived first from Supabase, it was promoted to
 * "keeper" and the canonical row ended up hidden instead. The DB flag is
 * the canonical source of truth — runtime parsing is no longer needed.
 */
export async function getComboComponentIds(supabase: SupabaseClient): Promise<string[]> {
  // Paginate: Supabase caps a single select at 1000 rows, and there are
  // ~6.300 hidden rows globally (5.939 combo-noise + 318 federation
  // pollution + 14 generic-name dupes).
  const ids: string[] = []
  let offset = 0
  while (true) {
    const { data, error } = await supabase
      .from('courses')
      .select('id')
      .eq('is_displayed', false)
      .range(offset, offset + 999)
    if (error || !data?.length) break
    for (const r of data as Array<{ id: string }>) ids.push(r.id)
    offset += data.length
    if (data.length < 1000) break
  }
  return ids
}
