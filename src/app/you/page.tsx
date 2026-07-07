import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import SubTabs from '@/components/SubTabs'
import { computeInitials } from '@/lib/initials'
import YouProfileView from './YouProfileView'
import YouCoursesView from './YouCoursesView'
import YouBadgesView from './YouBadgesView'

/**
 * /you — Phase 2 Trin 7 section page with three subtabs.
 *
 * Mirrors the /social shell pattern from 71cd44b: each subtab is its own
 * async server component that fetches just the data it renders, so a page
 * load only pays for the active view. Legacy routes /profile and /badges
 * redirect into the matching /you?tab=... so existing deep-links keep
 * working — the only standalone profile-tree route that remains is
 * /profile/edit (settings form) and /profile/[user_id] (public
 * friend-profile view).
 */

type Tab = 'profile' | 'courses' | 'badges'
const VALID: ReadonlySet<string> = new Set(['profile', 'courses', 'badges'])

export default async function YouPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>
}) {
  const { tab: tabParam } = await searchParams
  const tab: Tab = (VALID.has(tabParam ?? '') ? tabParam : 'profile') as Tab

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
      {/* Top bar — home glyph + brand title + ProfileButton. Matches the
          chrome that /courses, /social, /bucket-list landed in f710c23. */}
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
            { value: 'profile', label: 'Profile' },
            { value: 'courses', label: 'Courses' },
            { value: 'badges', label: 'Badges' },
          ]}
          active={tab}
          getHref={(v) => (v === 'profile' ? '/you' : `/you?tab=${v}`)}
        />
      </div>

      {tab === 'profile' && <YouProfileView />}
      {tab === 'courses' && <YouCoursesView />}
      {tab === 'badges' && <YouBadgesView />}
    </div>
  )
}
