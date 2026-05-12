import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Returns IDs of combo course rows that the UI should hide to avoid
 * duplicate / nonsensical entries. Covers two categories:
 *
 * 1. Self-pair combos (name like "Blå + Blå") — playing the same 9 holes
 *    twice isn't a distinct course; the GolfAPI export includes these as
 *    noise.
 *
 * 2. Non-canonical reverse-order combos — for each unordered pair of
 *    component names the DB may have both "Blå + Gul" and "Gul + Blå".
 *    Keep only the locale-sorted one (Nordic collation). Hide the other.
 *
 * NOTE: 9-hole loop rows that are halves of a combo at the same club used
 * to be hidden by this function as well, but are now intentionally kept
 * visible. A 9-hole loop is a logable course in its own right — playing
 * "Farum + Hestkøb" and playing "Farum" alone are two different rounds.
 * Combos and their constituent loops are treated as equally valid courses.
 */
export async function getComboComponentIds(supabase: SupabaseClient): Promise<string[]> {
  // Paginate: Supabase caps a single select at 1000 rows, and there are
  // thousands of combo rows globally.
  const combos: Array<{ id: string; club: string | null; country: string | null; name: string | null }> = []
  let offset = 0
  while (true) {
    const { data, error } = await supabase
      .from('courses')
      .select('id, club, country, name')
      .eq('is_combo', true)
      .range(offset, offset + 999)
    if (error || !data?.length) break
    combos.push(...(data as typeof combos))
    offset += data.length
    if (data.length < 1000) break
  }
  if (!combos.length) return []

  const ids = new Set<string>()
  const collator = new Intl.Collator('sv') // Nordic sort covers ø/å/æ/ö/ä

  // Track canonical (alphabetically-first) row per (club, country, sorted-pair).
  // Any other row representing the same unordered pair is hidden.
  const canonicalKeeper = new Map<string, string>() // key -> id of the row kept visible

  for (const c of combos) {
    const parts = String(c.name ?? '').split(' + ').map(x => x.trim()).filter(Boolean)
    if (parts.length !== 2) continue

    const [a, b] = parts

    // Category 1: self-pair
    if (a === b) {
      ids.add(c.id as string)
      continue
    }

    // Category 2: canonicalize via Nordic sort
    const sorted = [a, b].slice().sort((x, y) => collator.compare(x, y))
    const canonicalName = sorted.join(' + ')
    const key = `${c.club}||${c.country}||${canonicalName}`

    if (c.name === canonicalName) {
      // This row is the canonical one
      if (canonicalKeeper.has(key)) {
        // Two rows match the canonical name (shouldn't happen with clean data) — hide this one
        ids.add(c.id as string)
      } else {
        canonicalKeeper.set(key, c.id as string)
      }
    } else {
      // Non-canonical ordering — hide. If no canonical-form row exists yet,
      // the first non-canonical we see gets "promoted" to keeper so the
      // unordered pair remains visible somewhere.
      if (!canonicalKeeper.has(key)) {
        canonicalKeeper.set(key, c.id as string)
      } else {
        ids.add(c.id as string)
      }
    }
  }

  return [...ids]
}
