import { usStateSuffix } from './course-display';
import type { Course } from './courses';

export type CourseGroup = {
  key: string;
  label: string;
  flag: string | null;
  courses: Course[];
};

// Matches web's CourseBrowser: results are grouped into one card per club
// (header row + indented course sub-rows), not one row per course. Grouped
// by (club-or-name, country) so cross-country namesakes stay separate.
export function groupByClub(courses: Course[]): CourseGroup[] {
  const map = new Map<string, CourseGroup>();
  for (const c of courses) {
    const label = (c.club ?? c.name) + usStateSuffix(c.country, c.state);
    const key = `${label.toLowerCase()}|${c.country ?? ''}`;
    const group = map.get(key);
    if (group) group.courses.push(c);
    else map.set(key, { key, label, flag: c.flag, courses: [c] });
  }
  const groups = [...map.values()];
  for (const g of groups) {
    g.courses.sort((a, b) => (b.holes ?? 0) - (a.holes ?? 0) || a.name.localeCompare(b.name));
  }
  return groups.sort((a, b) => a.label.localeCompare(b.label));
}

// Web's real "played courses" view (apps/web/src/components/ProfileAccordions.tsx's
// CoursesByCountry) groups by country, not by club — mirrored here for
// Played mode. Web sorts countries by round-count DESC, but Thomas prefers
// alphabetical here, so that's what this returns.
export function groupByCountry(courses: Course[]): CourseGroup[] {
  const map = new Map<string, CourseGroup>();
  for (const c of courses) {
    const key = c.country ?? 'Unknown';
    const group = map.get(key);
    if (group) group.courses.push(c);
    else map.set(key, { key, label: key, flag: c.flag, courses: [c] });
  }
  const groups = [...map.values()];
  for (const g of groups) {
    g.courses.sort((a, b) => a.name.localeCompare(b.name));
  }
  return groups.sort((a, b) => a.label.localeCompare(b.label));
}
