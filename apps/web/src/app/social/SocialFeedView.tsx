import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import FriendsActivitySection from '@/components/FriendsActivitySection'
import { fetchFeed } from '@/lib/feed'

/**
 * SocialFeedView — the "Feed" subtab on /social.
 *
 * Renders the full friends-activity feed. Reuses FriendsActivitySection
 * (same component used by the home page) so the empty-states stay aligned
 * across home + Social. Pulls a pageful of items (limit 20) instead of the
 * 2-item home preview.
 */

interface Props {
  before?: string
}

export default async function SocialFeedView({ before }: Props) {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/welcome')

  const { items, hasFriends } = await fetchFeed(adminSupabase, user.id, {
    before: before ?? null,
    limit: 20,
  })

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', paddingBottom: 48 }}>
      <FriendsActivitySection items={items} hasFriends={hasFriends} />
    </div>
  )
}
