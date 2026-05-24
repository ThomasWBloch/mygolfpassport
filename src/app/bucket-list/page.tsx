import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

/**
 * /bucket-list — placeholder landing page.
 *
 * The bucket-list feature itself doesn't exist in the DB yet (no table, no
 * "save course" affordance on /courses). This route exists so future
 * deep-links — the You subtab from Trin 7, an "add to bucket" button on
 * course/club pages, native push notifications, share URLs — don't 404 in
 * the meantime. When the feature ships, the placeholder card gets swapped
 * out for the real list view; the route URL stays the same.
 *
 * Chrome matches /courses, /social, /profile after f710c23 (home-glyph SVG
 * + 19px brand title + ProfileButton on the right). No back-link — Bucket
 * list is reached via the BottomNav You tab, not as a sub-destination.
 */

export default async function BucketListPage() {
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

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 6,
          }}
        >
          List
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 24,
            fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            marginBottom: 4,
            letterSpacing: -0.3,
          }}
        >
          Bucket list
        </div>

        {/* Placeholder card — swapped for the real list view once the
            bucket-list feature ships. */}
        <div
          style={{
            marginTop: 20,
            background: 'var(--color-mgp-paper)',
            border: '1px solid var(--color-mgp-border-faint)',
            borderRadius: 14,
            padding: '32px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 10 }} aria-hidden>🎯</div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 22,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              marginBottom: 8,
              letterSpacing: -0.2,
            }}
          >
            Coming soon
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--color-mgp-ink-3)',
              lineHeight: 1.5,
              maxWidth: 320,
              margin: '0 auto',
            }}
          >
            Save courses you&apos;d love to play, then check them off as you stamp them into your passport. We&apos;re building it now.
          </div>
          <Link
            href="/courses"
            style={{
              display: 'inline-block',
              marginTop: 16,
              background: 'var(--color-mgp-cover)',
              color: 'var(--color-mgp-ink-inv)',
              borderRadius: 12,
              padding: '12px 24px',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Browse courses ›
          </Link>
        </div>
      </div>
    </div>
  )
}
