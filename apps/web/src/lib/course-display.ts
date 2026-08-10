/**
 * Display helpers for course names that often contain generic placeholders
 * (e.g. "18-hole course", "9-hole course") rather than meaningful names.
 *
 * Many USA rows imported from OpenGolfAPI lack proper course names and were
 * filled with `${holes}-hole course` strings. When these surface verbatim in
 * the UI ("stamped 18-hole course") it looks like a bug. These helpers let
 * the display layer fall back to the club name in those cases.
 */

// Matches: "18-hole course", "9 hole course", "18-Holes", "18-hole", "12-hole course", etc.
// (optional trailing PFC suffix "- pfc" tolerated), plus other bare
// short-course-type placeholders that carry the same "generic" problem:
// "Par 3", "Par-3 Course", "Executive", "Short Course", etc. — confirmed
// via a DB scan (~350 courses) rather than assumed from this one report.
const GENERIC_COURSE_NAME_RE =
  /^\s*(?:\d+\s*[-\s]?\s*(?:hole|holes)(?:\s*course)?(?:\s*-\s*pfc)?|(?:par[-\s]?3|par[-\s]?three|executive|short)(?:\s*course)?)\s*$/i

/**
 * Returns true when the course name is a generic placeholder that conveys no
 * information beyond the holes count, and we should prefer showing the club.
 */
export function isGenericCourseName(name: string | null | undefined): boolean {
  if (!name) return true
  return GENERIC_COURSE_NAME_RE.test(name.trim())
}

/**
 * Returns the best primary label for a course in lists/feed. Falls back to
 * clubName when the course name is generic, then to the original course name
 * as a last resort.
 */
export function courseDisplayLabel(args: {
  courseName: string | null | undefined
  clubName: string | null | undefined
}): string {
  const { courseName, clubName } = args
  if (isGenericCourseName(courseName)) return clubName ?? courseName ?? 'Unknown course'
  return courseName ?? clubName ?? 'Unknown course'
}

/**
 * Returns the secondary label (typically used as a small subtitle below the
 * primary). Empty string when there's nothing useful to add (e.g. course is
 * generic, or course name == club name).
 */
export function courseSecondaryLabel(args: {
  courseName: string | null | undefined
  clubName: string | null | undefined
}): string {
  const { courseName, clubName } = args
  if (isGenericCourseName(courseName)) return ''
  if (!clubName) return ''
  if (courseName && clubName && courseName.trim().toLowerCase() === clubName.trim().toLowerCase()) return ''
  return clubName
}

/**
 * Returns a state suffix for US courses when state is known and meaningful.
 * Disambiguates the many "Chardonnay Golf Club" or "Eagle Ridge" namesakes
 * scattered across multiple US states. Empty string for non-US courses and
 * for US courses that fall into the 'Unknown state' bucket.
 *
 * Returned as " (California)" with the leading space so callers can simply
 * append it to a club/course label without conditional spacing.
 */
export function usStateSuffix(country: string | null | undefined, state: string | null | undefined): string {
  if (country !== 'USA') return ''
  if (!state || state === 'Unknown state') return ''
  return ` (${state})`
}
