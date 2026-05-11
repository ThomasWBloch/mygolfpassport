'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

/**
 * Bottom navigation — 5 tabs with center FAB.
 * Adventure design system. Pulls colors and font from CSS variables defined
 * in src/app/globals.css (which mirrors src/lib/design-tokens.ts).
 *
 * Hidden on auth/onboarding routes — see ROUTES_WITHOUT_NAV below.
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
  icon: string
  matchPrefixes: string[]
}

const TABS: Tab[] = [
  { href: '/', label: 'FEED', icon: '⌂', matchPrefixes: ['/'] },
  { href: '/map', label: 'MAP', icon: '⊕', matchPrefixes: ['/map', '/courses', '/clubs'] },
  // Center FAB sits between MAP and FRIENDS
  { href: '/friends', label: 'FRIENDS', icon: '∞', matchPrefixes: ['/friends', '/leaderboard', '/messages'] },
  { href: '/profile', label: 'YOU', icon: '◯', matchPrefixes: ['/profile', '/badges'] },
]

const isActive = (pathname: string, tab: Tab): boolean => {
  if (tab.href === '/') return pathname === '/'
  return tab.matchPrefixes.some((p) => p !== '/' && (pathname === p || pathname.startsWith(p + '/')))
}

export default function BottomNav() {
  const pathname = usePathname() || '/'
  const router = useRouter()

  // Hide on the exact-match auth/onboarding routes above, and on individual
  // chat threads (/messages/<id>) which are full-screen. The /messages list
  // route deliberately keeps the nav so users can tab away from the inbox.
  const isChatThread = pathname.startsWith('/messages/') && pathname !== '/messages'
  if (ROUTES_WITHOUT_NAV.has(pathname) || isChatThread) return null

  // Render: 2 tabs · FAB · 2 tabs
  const left = TABS.slice(0, 2)
  const right = TABS.slice(2, 4)

  return (
    <nav
      aria-label="Primary"
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        height: 64,
        background: 'var(--color-mgp-cover)',
        borderTop: '1px solid var(--color-mgp-gold)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 16px rgba(15, 37, 25, 0.4)',
      }}
    >
      {left.map((t) => (
        <NavItem key={t.href} tab={t} active={isActive(pathname, t)} />
      ))}

      <button
        type="button"
        aria-label="Stamp a course"
        onClick={() => {
          // When already on /log, Next.js skips re-rendering the page on a
          // same-URL push, so LogForm's `step='success'` state would survive
          // and trap the user on the success screen. Append a fresh ?t param
          // so the URL changes; LogForm's effect picks that up and resets
          // back to the search step.
          if (pathname === '/log') {
            router.push(`/log?t=${Date.now()}`)
          } else {
            router.push('/log')
          }
        }}
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--color-mgp-gold)',
          color: 'var(--color-mgp-cover)',
          border: '3px solid var(--color-mgp-cover)',
          boxShadow: '0 6px 16px rgba(201, 168, 76, 0.5)',
          fontFamily: 'var(--font-mgp-display)',
          fontWeight: 700,
          fontSize: 28,
          marginTop: -20,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        +
      </button>

      {right.map((t) => (
        <NavItem key={t.href} tab={t} active={isActive(pathname, t)} />
      ))}
    </nav>
  )
}

function NavItem({ tab, active }: { tab: Tab; active: boolean }) {
  return (
    <Link
      href={tab.href}
      style={{
        flex: 1,
        textAlign: 'center',
        textDecoration: 'none',
        color: 'var(--color-mgp-gold)',
        opacity: active ? 1 : 0.5,
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 9,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
      }}
    >
      <span style={{ display: 'block', fontSize: 16, marginBottom: 2 }}>
        {tab.icon}
      </span>
      {tab.label}
    </Link>
  )
}
