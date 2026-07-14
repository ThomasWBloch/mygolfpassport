import { redirect } from 'next/navigation'

/**
 * /profile — legacy route, now a redirect into /you?tab=profile.
 *
 * The page content moved into src/app/you/YouProfileView.tsx as part of
 * Trin 7 (Phase 2 of the S53 structural refactor). This thin redirect
 * keeps deep-links and bookmarks working.
 *
 * Sub-routes /profile/edit and /profile/[user_id] are NOT redirected —
 * they remain standalone (settings form + public friend-profile view).
 */

export default function ProfilePage() {
  redirect('/you')
}
