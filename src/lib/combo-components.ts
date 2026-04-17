import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Returns the IDs of 9-hole courses that appear as a half of an 18-hole
 * combo at the same club (e.g., the "Blå" and "Gul" 9-hole rows at a club
 * that also has a "Blå + Gul" combo row). The UI hides these so users see
 * the combo entries instead of duplicate halves.
 *
 * Standalone 9-hole courses (practice, par-3, academy loops not referenced
 * by any combo) are NOT returned and stay visible.
 */
export async function getComboComponentIds(supabase: SupabaseClient): Promise<string[]> {
  const { data: combos } = await supabase
    .from('courses')
    .select('club, country, name')
    .eq('is_combo', true)
  if (!combos?.length) return []

  const componentsByClub = new Map<string, Set<string>>()
  const clubs = new Set<string>()
  const countries = new Set<string>()
  for (const c of combos) {
    const parts = String(c.name ?? '').split(' + ').map(x => x.trim()).filter(Boolean)
    if (parts.length !== 2) continue
    const key = `${c.club}||${c.country}`
    let set = componentsByClub.get(key)
    if (!set) { set = new Set<string>(); componentsByClub.set(key, set) }
    for (const p of parts) set.add(p)
    if (c.club) clubs.add(c.club as string)
    if (c.country) countries.add(c.country as string)
  }
  if (!componentsByClub.size) return []

  const { data: nines } = await supabase
    .from('courses')
    .select('id, name, club, country')
    .eq('holes', 9)
    .eq('is_combo', false)
    .in('club', [...clubs])
    .in('country', [...countries])

  const ids: string[] = []
  for (const r of nines ?? []) {
    const key = `${r.club}||${r.country}`
    const names = componentsByClub.get(key)
    if (names?.has(r.name as string)) ids.push(r.id as string)
  }
  return ids
}
