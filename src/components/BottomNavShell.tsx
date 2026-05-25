import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import BottomNav from './BottomNav'

/**
 * Server wrapper around BottomNav. Fetches the user's unread-message count
 * once per render so the Social tab can show a notification dot without
 * BottomNav itself having to be async or run a client-side poll.
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

  let unreadCount = 0
  if (user) {
    // Same query Home used for the top-bar ✉ badge before we moved the
    // notification onto the Social tab. RLS scopes this to conversations
    // the user is in, so "not sent by me + unread" reads correctly.
    const { count } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .neq('sender_id', user.id)
      .is('read_at', null)
    unreadCount = count ?? 0
  }

  return <BottomNav unreadCount={unreadCount} />
}
