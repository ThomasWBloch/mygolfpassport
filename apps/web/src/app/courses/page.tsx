import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileButton from '@/components/ProfileButton'
import SubTabs from '@/components/SubTabs'
import { computeInitials } from '@/lib/initials'
import CoursesAtlasView from './CoursesAtlasView'
import CoursesMapView from './CoursesMapView'
import TopRatedCoursesView from './TopRatedCoursesView'
import { isContinentKey } from '@/lib/continents'

/**
 * /courses — section page with three subtabs (Course Atlas / Top Rated /
 * My Map).
 *
 * The page itself only owns the top-bar chrome and the SubTabs row; each
 * subview is its own async server component fetching its own data.
 * CoursesAtlasView is a dispatcher that reads `?c`, `?country`, `?v` to
 * pick one of three drill-in states. `?country` is reused by the Top Rated
 * view for its own (unrelated) country filter — safe since only one view
 * reads it at a time. The legacy /map route still redirects here with
 * ?view=map.
 */

type View = 'atlas' | 'top-rated' | 'map'

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: string
    c?: string
    country?: string
    state?: string
    v?: string
  }>
}) {
  const {
    view: viewParam = 'atlas',
    c: continentParam,
    country: countryParam,
    state: stateParam,
    v: viewModeParam,
  } = await searchParams

  const view: View = viewParam === 'map' ? 'map' : viewParam === 'top-rated' ? 'top-rated' : 'atlas'
  const continent =
    continentParam && isContinentKey(continentParam) ? continentParam : null
  const country = countryParam ? countryParam : null
  const state = stateParam ? stateParam : null
  const viewMode: 'list' | 'map' = viewModeParam === 'map' ? 'map' : 'list'

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

  const profileResult = user
    ? await supabase.from('profiles').select('full_name').eq('id', user.id).single()
    : { data: null }

  const profile = (profileResult as { data: { full_name?: string } | null }).data
  const initials = computeInitials(
    profile?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-mgp-cream)',
        fontFamily: 'var(--font-mgp-body)',
      }}
    >
      {/* Top bar — Adventure chrome (home-icon + brand title + ProfileButton) */}
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
          {user && <ProfileButton initials={initials} />}
        </div>
      </div>

      {/* Subtabs row */}
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 0' }}>
        <SubTabs
          options={[
            { value: 'atlas', label: 'Course Atlas' },
            { value: 'top-rated', label: 'Top Rated' },
            { value: 'map', label: 'My Map' },
          ]}
          active={view}
          getHref={(v) => (v === 'atlas' ? '/courses' : `/courses?view=${v}`)}
        />
      </div>

      {view === 'map' ? (
        <CoursesMapView />
      ) : view === 'top-rated' ? (
        <TopRatedCoursesView country={country} />
      ) : (
        <CoursesAtlasView
          continent={continent}
          country={country}
          state={state}
          viewMode={viewMode}
        />
      )}
    </div>
  )
}
