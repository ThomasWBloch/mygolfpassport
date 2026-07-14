import { redirect } from 'next/navigation'

/**
 * /leaderboard — preserved as a redirect into /social?tab=leaderboard so
 * existing deep-links keep working after Phase 2 Trin 8 folded the
 * standings into the /social shell.
 */

export default function LeaderboardPage() {
  redirect('/social?tab=leaderboard')
}
