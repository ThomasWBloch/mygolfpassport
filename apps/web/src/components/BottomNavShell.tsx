import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { SYSTEM_USER_ID } from '@/lib/constants'
import BottomNav from './BottomNav'

/**
 * Server wrapper around BottomNav. Fetches the user's unread-message count
 * and pending-incoming-friend-request count once per render so the Social
 * tab can show a notification dot without BottomNav itself having to be
 * async or run a client-side poll.
 *
 * Both signals feed the same Social-tab dot — BottomNav just checks
 * unreadCount > 0, it doesn't care which kind of "unread" it is. Previously
 * only messages lit the dot, so an incoming friend request was silent on
 * the tab bar and only visible once you opened Messages (focus-group
 * finding, 2026-06).
 *
 * No unread row when there's no logged-in user (signin / welcome routes
 * etc.) — BottomNav already hides itself on those paths regardless.
 */
export default async function BottomNavShell() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // friendships RLS only allows `auth.uid() = user_id` — the recipient side
  // (friend_id) can't read incoming-request rows through the normal client.
  // SocialFriendsView already routes around this with the service-role key;
  // do the same here rather than widening the policy as a drive-by change.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } },
      )
    : supabase

  let unreadCount = 0
  if (user) {
    // Same query Home used for the top-bar ✉ badge before we moved the
    // notification onto the Social tab. RLS scopes this to conversations
    // the user is in, so "not sent by me + unread" reads correctly.
    const [{ count: messageCount }, { count: friendRequestCount }] = await Promise.all([
      supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .neq('sender_id', user.id)
        .is('read_at', null),

      // Incoming = someone else sent ME a pending request, i.e. I'm
      // friend_id, not user_id (see SocialFriendsView's direction logic).
      // System-user rows are excluded same as everywhere else they're filtered.
      adminSupabase
        .from('friendships')
        .select('id', { count: 'exact', head: true })
        .eq('friend_id', user.id)
        .eq('status', 'pending')
        .neq('user_id', SYSTEM_USER_ID),
    ])
    unreadCount = (messageCount ?? 0) + (friendRequestCount ?? 0)
  }

  return <BottomNav unreadCount={unreadCount} />
}
