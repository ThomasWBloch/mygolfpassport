'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

/**
 * Bottom navigation — 3 tabs (Courses / Social / You) + floating gold FAB.
 *
 * Phase 1 of the S53 structural refactor: the 5-tab bar collapsed to 3 tabs
 * with a separate floating action button. Routes /social, /you, /bucket-list
 * don't exist yet — Social currently aliases to /friends and You to /profile
 * until Phase 2 adds the new routes.
 *
 * useSearchParams forces a Suspense boundary in the build, so the default
 * export wraps the inner component.
 *
 * Hidden on auth/onboarding routes (see ROUTES_WITHOUT_NAV) and on individual
 * chat threads. On /log: the tab-bar is visible during the search step but
 * hidden when a course is being rated (?course=); the FAB is hidden across
 * the whole /log flow since the user is already mid-log.
 */

const ROUTES_WITHOUT_NAV = new Set<string>([
  '/welcome',
  '/signin',
  '/signup',
  '/signup/check-email',
  '/auth/callback',
  '/login',
  '/forgot-password',
  '/reset-password',
  '/onboarding',
  '/survey',
  '/badge-demo',
])

type Tab = {
  href: string
  label: string
  matchPrefixes: string[]
  Icon: (props: { color: string }) => React.ReactElement
}

const TABS: Tab[] = [
  {
    // Courses tab links straight to the Atlas view. We still treat the
    // home route as part of the Courses scope (matchPrefixes), so the
    // tab stays highlighted when the user is on /. Without this, tapping
    // Courses from anywhere would land on Home instead of the Atlas.
    href: '/courses',
    label: 'Courses',
    matchPrefixes: ['/', '/courses', '/clubs', '/map'],
    Icon: CoursesIcon,
  },
  {
    href: '/social',
    label: 'Social',
    matchPrefixes: ['/social', '/friends', '/leaderboard', '/messages'],
    Icon: SocialIcon,
  },
  {
    href: '/you',
    label: 'You',
    matchPrefixes: ['/you', '/profile', '/badges', '/bucket-list'],
    Icon: YouIcon,
  },
]

const isActive = (pathname: string, tab: Tab): boolean => {
  return tab.matchPrefixes.some((p) => {
    if (p === '/') return pathname === '/'
    return pathname === p || pathname.startsWith(p + '/')
  })
}

export default function BottomNav({ unreadCount = 0 }: { unreadCount?: number }) {
  return (
    <Suspense fallback={null}>
      <BottomNavInner unreadCount={unreadCount} />
    </Suspense>
  )
}

function BottomNavInner({ unreadCount }: { unreadCount: number }) {
  const pathname = usePathname() || '/'
  const searchParams = useSearchParams()
  const router = useRouter()

  const isChatThread = pathname.startsWith('/messages/') && pathname !== '/messages'
  if (ROUTES_WITHOUT_NAV.has(pathname) || isChatThread) return null

  // /log + ?course= = the rating form. Hide the tab-bar so it doesn't compete
  // with the form controls. Search step (/log alone) keeps the bar visible.
  const hideTabBar = pathname === '/log' && searchParams.has('course')

  // The FAB stays hidden across the entire /log flow — the user is already
  // doing the thing it would start.
  const hideFab = pathname.startsWith('/log')

  const onFabClick = () => {
    // Same trick as before: re-enter /log with a fresh ?t= so LogForm's
    // success-screen state resets when the user taps the FAB from inside /log.
    if (pathname === '/log') {
      router.push(`/log?t=${Date.now()}`)
    } else {
      router.push('/log')
    }
  }

  return (
    <>
      {!hideTabBar && (
        <nav
          aria-label="Primary"
          style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: 430,
            height: 72,
            background: 'var(--color-mgp-cover)',
            borderTop: '2px solid var(--color-mgp-gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 50,
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            boxShadow: '0 -4px 16px rgba(15, 37, 25, 0.4)',
          }}
        >
          {TABS.map((t) => (
            <NavItem
              key={t.href}
              tab={t}
              active={isActive(pathname, t)}
              showUnreadDot={t.label === 'Social' && unreadCount > 0}
            />
          ))}
        </nav>
      )}

      {!hideFab && (
        <button
          type="button"
          aria-label="Stamp a course"
          onClick={onFabClick}
          style={{
            position: 'fixed',
            right: 16,
            bottom: 'calc(88px + env(safe-area-inset-bottom, 0px))',
            width: 56,
            height: 56,
            borderRadius: '50%',
            background:
              'linear-gradient(180deg, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 60%, var(--color-mgp-gold-dark) 100%)',
            border: 'none',
            boxShadow:
              '0 6px 16px rgba(15, 37, 25, 0.5), 0 0 0 0 transparent',
            color: 'var(--color-mgp-cover-ink)',
            fontFamily: 'var(--font-mgp-display)',
            fontWeight: 700,
            fontSize: 32,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            cursor: 'pointer',
          }}
        >
          +
        </button>
      )}
    </>
  )
}

function NavItem({
  tab,
  active,
  showUnreadDot = false,
}: {
  tab: Tab
  active: boolean
  showUnreadDot?: boolean
}) {
  const iconColor = active
    ? 'var(--color-mgp-gold-light)'
    : 'var(--color-mgp-gold)'

  return (
    <Link
      href={tab.href}
      style={{
        flex: 1,
        textAlign: 'center',
        textDecoration: 'none',
        color: 'var(--color-mgp-gold)',
        opacity: active ? 1 : 0.55,
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 10,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {active && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 40,
            height: 3,
            background: 'var(--color-mgp-gold-light)',
            borderRadius: 1.5,
          }}
        />
      )}
      <div style={{ position: 'relative', lineHeight: 0 }}>
        <tab.Icon color={iconColor} />
        {showUnreadDot && (
          <span
            aria-label="Unread messages"
            style={{
              position: 'absolute',
              top: -2,
              right: -4,
              width: 10,
              height: 10,
              borderRadius: 5,
              background: 'var(--color-mgp-stamp-red)',
              border: '1.5px solid var(--color-mgp-cover)',
              boxSizing: 'border-box',
            }}
          />
        )}
      </div>
      <span style={{ marginTop: 4 }}>{tab.label}</span>
    </Link>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────
// All 24x24, stroke 1.8, line-only except where currentColor fill is needed
// to keep the silhouette readable at small sizes.

function CoursesIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ color }}
    >
      <ellipse
        cx="12"
        cy="16"
        rx="9"
        ry="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="14"
        y1="16"
        x2="14"
        y2="3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 14 3 L 22 6 L 14 9 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="16" r="1.2" fill="currentColor" />
    </svg>
  )
}

function SocialIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ color }}
    >
      <circle
        cx="8"
        cy="7"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="16"
        cy="7"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 2 18 C 2 13 5 11 8 11 C 11 11 14 13 14 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 10 18 C 10 13 13 11 16 11 C 19 11 22 13 22 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function YouIcon({ color }: { color: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ color }}
    >
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 4 18 C 4 12 8 10 12 10 C 16 10 20 12 20 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
