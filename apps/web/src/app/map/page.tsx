import { redirect } from 'next/navigation'

/**
 * /map — preserved as a redirect into /courses?view=map so existing
 * deep-links (notifications, share URLs, BottomNav prefixes) keep working
 * after Phase 2 of the S53 refactor folded the world map into a /courses
 * subtab.
 */

export default function MapPage() {
  redirect('/courses?view=map')
}
