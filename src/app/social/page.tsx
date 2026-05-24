import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import SubTabs from '@/components/SubTabs'
import { computeInitials } from '@/lib/initials'
import SocialFeedView from './SocialFeedView'
import SocialFriendsView from './SocialFriendsView'
import SocialLeaderboardView from './SocialLeaderboardView'
import SocialMessagesView from './SocialMessagesView'

/**
 * /social — Phase 2 section page with four subtabs.
 *
 * Each subtab is its own async server component fetching its own data so
 * a page-load only pays for the active view. The legacy routes /friends,
 * /leaderboard, /messages remain live for deep-link access; Trin 8 will
 * redirect them into the matching /social?tab=... once everything else
 * has settled.
 */

type Tab = 'feed' | 'friends' | 'leaderboard' | 'messages'
const VALID: ReadonlySet<string> = new Set(['feed', 'friends', 'leaderboard', 'messages'])

export default async function SocialPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; before?: string }>
}) {
  const { tab: tabParam, before } = await searchParams
  const tab: Tab = (VALID.has(tabParam ?? '') ? tabParam : 'feed') as Tab

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/welcome')

  const profileResult = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const profile = (profileResult as { data: { full_name?: string } | null }).data
  const initials = computeInitials(
    profile?.full_name ?? user.user_metadata?.full_name,
    user.email
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-mgp-cream)',
        fontFamily: 'var(--font-mgp-body)',
      }}
    >
      {/* Top bar — home glyph + brand title + ProfileButton */}
      <div
        style={{
          background: 'var(--color-mgp-cover)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-mgp-gold)',
              lineHeight: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M3 10 L11 3 L19 10 L19 18 L13.5 18 L13.5 12.5 L8.5 12.5 L8.5 18 L3 18 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 19,
              fontWeight: 500,
              color: 'var(--color-mgp-ink-inv)',
              letterSpacing: 0.5,
            }}
          >
            My Golf Passport
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ProfileButton initials={initials} />
        </div>
      </div>

      {/* Subtabs row */}
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 0' }}>
        <SubTabs
          options={[
            { value: 'feed', label: 'Feed' },
            { value: 'friends', label: 'Friends' },
            { value: 'leaderboard', label: 'Leaderboard' },
            { value: 'messages', label: 'Messages' },
          ]}
          active={tab}
          getHref={(v) => (v === 'feed' ? '/social' : `/social?tab=${v}`)}
        />
      </div>

      {tab === 'feed' && <SocialFeedView before={before} />}
      {tab === 'friends' && <SocialFriendsView />}
      {tab === 'leaderboard' && <SocialLeaderboardView />}
      {tab === 'messages' && <SocialMessagesView />}
    </div>
  )
}
