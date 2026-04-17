import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Returns IDs of course rows that the UI should hide to avoid duplicate /
 * nonsensical combo entries. Covers three categories:
 *
 * 1. 9-hole courses that appear as a half of an 18-hole combo at the same
 *    club (e.g., "Blå" and "Gul" 9-hole rows at a club that also has
 *    "Blå + Gul"). Users see the combo entries instead of duplicate halves.
 *
 * 2. Self-pair combos (name like "Blå + Blå") — playing the same 9 holes
 *    twice isn't a distinct course; the GolfAPI export includes these as
 *    noise.
 *
 * 3. Non-canonical reverse-order combos — for each unordered pair of
 *    component names the DB may have both "Blå + Gul" and "Gul + Blå".
 *    Keep only the locale-sorted one (Nordic collation). Hide the other.
 *
 * Standalone 9-hole courses (practice, par-3, academy loops not referenced
 * by any combo) are NOT returned and stay visible.
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

  // Component names per (club, country) for later 9-hole matching.
  const componentsByClub = new Map<string, Set<string>>()
  const clubs = new Set<string>()
  const countries = new Set<string>()

  for (const c of combos) {
    const parts = String(c.name ?? '').split(' + ').map(x => x.trim()).filter(Boolean)
    if (parts.length !== 2) continue

    const [a, b] = parts

    // Category 2: self-pair
    if (a === b) {
      ids.add(c.id as string)
      continue
    }

    // Track for 9-hole component matching (category 1)
    const compKey = `${c.club}||${c.country}`
    let compSet = componentsByClub.get(compKey)
    if (!compSet) { compSet = new Set<string>(); componentsByClub.set(compKey, compSet) }
    compSet.add(a); compSet.add(b)
    if (c.club) clubs.add(c.club as string)
    if (c.country) countries.add(c.country as string)

    // Category 3: canonicalize via Nordic sort
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

  // Category 1: 9-hole components at clubs with combos.
  // Batch the club IN clause to stay well under URL-length limits.
  if (componentsByClub.size > 0) {
    const clubArr = [...clubs]
    const countryArr = [...countries]
    const BATCH = 100
    for (let i = 0; i < clubArr.length; i += BATCH) {
      const { data: nines } = await supabase
        .from('courses')
        .select('id, name, club, country')
        .eq('holes', 9)
        .eq('is_combo', false)
        .in('club', clubArr.slice(i, i + BATCH))
        .in('country', countryArr)
      for (const r of nines ?? []) {
        const key = `${r.club}||${r.country}`
        const names = componentsByClub.get(key)
        if (names?.has(r.name as string)) ids.add(r.id as string)
      }
    }
  }

  return [...ids]
}
