import { redirect } from 'next/navigation'

/**
 * /friends — preserved as a redirect into /social?tab=friends so existing
 * deep-links (notifications, share URLs, BottomNav prefixes) keep working
 * after Phase 2 Trin 8 folded the friends list into the /social shell.
 */

export default function FriendsPage() {
  redirect('/social?tab=friends')
}
