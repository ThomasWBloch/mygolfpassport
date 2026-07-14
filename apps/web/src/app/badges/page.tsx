import { redirect } from 'next/navigation'

/**
 * /badges — legacy route, now a redirect into /you?tab=badges.
 *
 * The trophy-room content moved into src/app/you/YouBadgesView.tsx as
 * part of Trin 7. This thin redirect keeps deep-links and bookmarks
 * working.
 */

export default function BadgesPage() {
  redirect('/you?tab=badges')
}
