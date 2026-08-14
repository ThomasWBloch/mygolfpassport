// Ported 1:1 from apps/mobile/lib/played-date.ts — pure TS, no framework
// dependencies. Backs the stepped year/month/day "played date" picker:
// rounds.played_at is always a real date encoding the START of whatever
// period is known (year-only -> Jan 1, month-only -> the 1st), paired with
// rounds.played_at_precision so display code knows how much of it to show.

export type PlayedPrecision = 'day' | 'month' | 'year'

export type PlayedDateValue = {
  playedAt: string | null
  precision: PlayedPrecision | null
}

const MONTH_NAMES_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTH_NAMES_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function daysInMonth(year: number, month: number): number {
  // month is 0-indexed (0 = January), matching JS Date conventions.
  return new Date(year, month + 1, 0).getDate()
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n)
}

/** Builds the {playedAt, precision} pair to store, from however far the
 * stepped picker got. Any of year/month/day can be null — day requires
 * month, month requires year (the picker enforces this by construction). */
export function encodePlayedDate(
  year: number | null,
  month: number | null,
  day: number | null
): PlayedDateValue {
  if (year == null) return { playedAt: null, precision: null }
  if (month == null) return { playedAt: `${year}-01-01`, precision: 'year' }
  if (day == null) return { playedAt: `${year}-${pad2(month + 1)}-01`, precision: 'month' }
  return { playedAt: `${year}-${pad2(month + 1)}-${pad2(day)}`, precision: 'day' }
}

/** Parses a stored played_at (YYYY-MM-DD) into its numeric parts without
 * going through `new Date()` — avoids local-timezone shift bugs entirely. */
export function decodePlayedDate(playedAt: string): { year: number; month: number; day: number } {
  const [y, m, d] = playedAt.split('-').map(Number)
  return { year: y, month: m - 1, day: d }
}

export function isYearSelectable(year: number, maxDate: Date): boolean {
  return year <= maxDate.getFullYear()
}

export function isMonthSelectable(year: number, month: number, maxDate: Date): boolean {
  if (year < maxDate.getFullYear()) return true
  if (year > maxDate.getFullYear()) return false
  return month <= maxDate.getMonth()
}

export function isDaySelectable(year: number, month: number, day: number, maxDate: Date): boolean {
  if (year !== maxDate.getFullYear() || month !== maxDate.getMonth()) {
    return year < maxDate.getFullYear() || (year === maxDate.getFullYear() && month < maxDate.getMonth())
  }
  return day <= maxDate.getDate()
}

/**
 * Precision-aware formatter — the single place every display style branches
 * on how much of the date is actually known. Year precision NEVER fabricates
 * a month or day, at any style; that's the core correctness fix this whole
 * feature is for.
 */
export function formatPlayedDate(
  playedAt: string | null,
  precision: PlayedPrecision | null,
  style: 'long' | 'short' | 'stampShort'
): string | null {
  if (!playedAt || !precision) return null
  const { year, month, day } = decodePlayedDate(playedAt)

  if (precision === 'year') return String(year)

  if (precision === 'month') {
    const name = style === 'long' ? MONTH_NAMES_LONG[month] : MONTH_NAMES_SHORT[month]
    return style === 'stampShort' ? `${name.toUpperCase()} ${year}` : `${name} ${year}`
  }

  // precision === 'day'
  if (style === 'long') return `${day} ${MONTH_NAMES_LONG[month]} ${year}`
  if (style === 'short') return `${day} ${MONTH_NAMES_SHORT[month]} ${year}`
  return `${day} ${MONTH_NAMES_SHORT[month].toUpperCase()} ${year}`
}

/** "PLAYED 18 APR 2026" style label for feed/stamp cards — preserves the
 * existing >365-day age-collapse exactly for day-precision rounds (all
 * historical data backfilled to 'day', so no visual regression there).
 * Month/year precision rounds have no finer detail to collapse from, so
 * they always render at their true stored precision regardless of age. */
export function playedAtLabel(
  playedAt: string | null,
  precision: PlayedPrecision | null,
  now: Date = new Date()
): string | null {
  if (!playedAt || !precision) return null
  if (precision !== 'day') return `PLAYED ${formatPlayedDate(playedAt, precision, 'stampShort')}`

  const { year, month, day } = decodePlayedDate(playedAt)
  const playedDate = new Date(year, month, day)
  const diffDays = (now.getTime() - playedDate.getTime()) / 86_400_000
  const style = diffDays < 365 ? 'stampShort' : 'month-only'

  if (style === 'stampShort') return `PLAYED ${formatPlayedDate(playedAt, precision, 'stampShort')}`
  return `PLAYED ${MONTH_NAMES_SHORT[month].toUpperCase()} ${year}`
}
