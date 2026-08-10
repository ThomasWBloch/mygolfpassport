// Ported 1:1 from apps/web/src/lib/course-display.ts (pure TS, no Next
// dependencies). Many rows imported from GolfAPI lack a real course name
// and were filled with "${holes}-hole course" placeholders — these
// helpers fall back to the club name when that happens, and otherwise
// prefer the course's own name so clubs with multiple courses (e.g.
// Himmerland's several tracks) stay distinguishable in lists.

// Matches "18-hole course" style placeholders (optional trailing "- pfc"),
// plus other bare short-course-type placeholders with the same problem:
// "Par 3", "Par-3 Course", "Executive", "Short Course", etc. — confirmed
// via a DB scan (~350 courses) rather than assumed from one report.
const GENERIC_COURSE_NAME_RE =
  /^\s*(?:\d+\s*[-\s]?\s*(?:hole|holes)(?:\s*course)?(?:\s*-\s*pfc)?|(?:par[-\s]?3|par[-\s]?three|executive|short)(?:\s*course)?)\s*$/i;

export function isGenericCourseName(name: string | null | undefined): boolean {
  if (!name) return true;
  return GENERIC_COURSE_NAME_RE.test(name.trim());
}

/** Best primary label for a course in lists — the course's own name,
 * unless it's a generic placeholder, in which case the club name. */
export function courseDisplayLabel(args: {
  courseName: string | null | undefined;
  clubName: string | null | undefined;
}): string {
  const { courseName, clubName } = args;
  if (isGenericCourseName(courseName)) return clubName ?? courseName ?? 'Unknown course';
  return courseName ?? clubName ?? 'Unknown course';
}

/** Secondary/subtitle label — the club name, but only when it adds
 * information (not empty, not a generic-name fallback, not identical to
 * the primary label). */
export function courseSecondaryLabel(args: {
  courseName: string | null | undefined;
  clubName: string | null | undefined;
}): string {
  const { courseName, clubName } = args;
  if (isGenericCourseName(courseName)) return '';
  if (!clubName) return '';
  if (courseName && courseName.trim().toLowerCase() === clubName.trim().toLowerCase()) return '';
  return clubName;
}

/** " (California)" suffix for US courses — disambiguates common names
 * (many "Eagle Ridge Golf Club"s) across states. Empty for non-US
 * courses or unknown state. */
export function usStateSuffix(country: string | null | undefined, state: string | null | undefined): string {
  if (country !== 'USA') return '';
  if (!state || state === 'Unknown state') return '';
  return ` (${state})`;
}
