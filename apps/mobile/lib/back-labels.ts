/**
 * Shared back-label vocabulary for the various stack screens that replace
 * their header title with a contextual "Back to X" instead of repeating
 * content already shown below (course name, club name, person's name).
 * Screens read their entry-point context from a `from` query param set by
 * whichever screen navigated them here.
 */
export const BACK_LABELS: Record<string, string> = {
  courses: 'Back to courses',
  course: 'Back to course',
  club: 'Back to club',
  profile: 'Back to profile',
  friends: 'Back to friends list',
  leaderboard: 'Back to leaderboard',
  messages: 'Back to messages',
};

export function resolveBackLabel(from: string | undefined, fallback = 'Back'): string {
  return (from && BACK_LABELS[from]) || fallback;
}
