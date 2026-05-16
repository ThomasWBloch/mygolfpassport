/**
 * Helpers for disambiguating namesake clubs in the UI.
 *
 * Problem: a single text-value like "Rolling Hills Country Club" can refer
 * to 13 physically separate golf clubs in different US states. Until we
 * have a proper clubs-table with stable UUIDs (deferred — see
 * project_clubs_table_deferred memory), we disambiguate at display time
 * by appending a location suffix (the state) — but only when there's
 * actually a namesake conflict, and only for USA where the problem is
 * concentrated (~94 % of real namesakes globally).
 *
 * Two-step usage:
 *   1. Fetch namesake-status for the (club, country) pairs being rendered
 *      (see clubNamesakeKeys() — typically a batched DB call).
 *   2. Call formatClubLabel() for each header with the namesake set,
 *      address, country, and country handed in. The helper appends e.g.
 *      "Rolling Hills Country Club (TX)" when relevant, leaves the
 *      unique cases untouched.
 */

/**
 * Map (club, country) to a stable cache key. Same shape used inside
 * lib/badges.ts so the two layers stay aligned.
 */
export function clubKey(club: string | null | undefined, country: string | null | undefined): string {
  return `${club ?? ''}|||${country ?? ''}`
}

/**
 * Extract the 2-letter US state code from a free-form address string.
 * US addresses follow ", City, STATE" or ", City, STATE ZIP" — we take
 * whatever comes after the last comma and isolate the leading 2-letter
 * code. Returns null when the address doesn't look like a US address
 * or when no state can be confidently parsed.
 */
export function parseStateFromUsAddress(address: string | null | undefined): string | null {
  if (!address) return null
  // Take everything after the last comma (most addresses end with ", ST" or ", ST ZIP")
  const lastComma = address.lastIndexOf(',')
  if (lastComma === -1) return null
  const tail = address.slice(lastComma + 1).trim()
  // Match leading 2 uppercase letters (US state code)
  const match = tail.match(/^([A-Z]{2})\b/)
  return match ? match[1] : null
}

/**
 * Build the display label for a club header. When the (club, country)
 * is in the namesake set AND we can parse a state from the address,
 * append " (ST)" to disambiguate. Otherwise return the bare club label.
 *
 * Currently scoped to USA — other countries have so few real namesakes
 * that the visual cost of always-on suffixes outweighs the gain. When
 * Australia/Canada/Japan/Korea move into scope, expand the country
 * gate below.
 */
export function formatClubLabel(opts: {
  clubLabel: string
  country: string | null | undefined
  address: string | null | undefined
  isNamesake: boolean
}): string {
  const { clubLabel, country, address, isNamesake } = opts
  if (!isNamesake) return clubLabel
  if (country !== 'USA') return clubLabel
  const state = parseStateFromUsAddress(address)
  if (!state) return clubLabel
  return `${clubLabel} (${state})`
}
