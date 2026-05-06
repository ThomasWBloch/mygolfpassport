import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import UserAvatar from '@/components/UserAvatar'
import MiniPassportStrip from '@/components/MiniPassportStrip'
import FeedCard from '@/components/FeedCard'
import { fetchFeed } from '@/lib/feed'

/**
 * Home → Feed
 *
 * Sprint 2 pivot: home is no longer a passport-snapshot mirror of /profile.
 * It's the social feed — friends' recent stamps, badges, and new connections.
 *
 * Layout:
 *  · Top bar (cover-green, gold accents)
 *  · MiniPassportStrip (own glance-status, links to /profile)
 *  · Section eyebrow
 *  · Feed cards
 *  · Load-older link (when more pages available)
 *  · Empty state when user has no friends yet (own stamps + find-friends CTA)
 */

interface Props {
  searchParams: Promise<{ before?: string }>
}

export default async function Home({ searchParams }: Props) {
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

  // Use admin client for cross-user reads (bypasses RLS so we can see friends'
  // rounds and badges). Falls back to user client if no service key is set.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { before } = await searchParams

  // ── Parallel fetches: own profile/stats, feed, unread messages count ─────
  const [profileResult, ownStatsResult, feedResult, unreadResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single(),

    supabase
      .from('rounds')
      .select('course_id, courses(country)')
      .eq('user_id', user.id),

    fetchFeed(adminSupabase, user.id, { before: before ?? null, limit: 20 }),

    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .neq('sender_id', user.id)
      .is('read_at', null),
  ])

  const userBadgesResult = await supabase
    .from('user_badges')
    .select('id')
    .eq('user_id', user.id)

  const profile = profileResult.data
  const fullName = (profile?.full_name as string | null)
    ?? (user.user_metadata?.full_name as string | undefined)
    ?? user.email?.split('@')[0]
    ?? 'Golfer'
  const avatarUrl = (profile?.avatar_url as string | null) ?? null

  // Own glance-totals for the MiniPassportStrip
  const ownRounds = ownStatsResult.data ?? []
  const roundCount = new Set(ownRounds.map(r => r.course_id as string)).size
  const countryCount = new Set(
    ownRounds
      .map(r => (r.courses as unknown as { country?: string } | null)?.country)
      .filter((c): c is string => Boolean(c))
  ).size
  const badgeCount = (userBadgesResult.data ?? []).length

  const unreadCount = (unreadResult as { count: number | null }).count ?? 0

  const { items, hasFriends, nextCursor, ownStamps } = feedResult

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 14,
          }}>
            M
          </span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>
            My Golf Passport
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/messages"
            aria-label="Messages"
            style={{ color: 'var(--color-mgp-gold)', fontSize: 18, textDecoration: 'none', position: 'relative', lineHeight: 1 }}
          >
            ✉
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -8,
                minWidth: 16, height: 16, borderRadius: 8,
                background: 'var(--color-mgp-stamp-red)',
                color: 'var(--color-mgp-ink-inv)',
                border: '1.5px solid var(--color-mgp-cover)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700,
                padding: '0 3px',
              }}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none', display: 'flex' }}>
            <UserAvatar name={fullName} avatarUrl={avatarUrl} size={32} border="1.5px solid var(--color-mgp-gold)" />
          </Link>
        </div>
      </div>

      {/* ── Mini passport strip (own glance status) ──────────────────── */}
      <MiniPassportStrip
        fullName={fullName}
        avatarUrl={avatarUrl}
        countryCount={countryCount}
        roundCount={roundCount}
        badgeCount={badgeCount}
      />

      {/* ── Feed body ────────────────────────────────────────────────── */}
      {hasFriends ? (
        <FeedBody items={items} nextCursor={nextCursor} />
      ) : (
        <EmptyFeedState ownStamps={ownStamps} />
      )}

      <div style={{ height: 24 }} />
    </div>
  )
}

// ── Sub-views ────────────────────────────────────────────────────────────────

function FeedBody({
  items,
  nextCursor,
}: {
  items: Awaited<ReturnType<typeof fetchFeed>>['items']
  nextCursor: string | null
}) {
  return (
    <>
      <div style={{ padding: '14px 16px 8px' }}>
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
        }}>
          Recent stamps from your circle
        </div>
      </div>

      {items.length === 0 ? (
        <NoActivityYet />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
          {items.map(item => (
            <FeedCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}

      {nextCursor && (
        <div style={{ padding: '16px 16px 0', textAlign: 'center' }}>
          <Link
            href={`/?before=${encodeURIComponent(nextCursor)}`}
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 2,
              color: 'var(--color-mgp-cover)',
              textDecoration: 'none',
              padding: '8px 16px',
              border: '0.5px solid var(--color-mgp-border-strong)',
              borderRadius: 4,
              background: 'var(--color-mgp-paper)',
            }}
          >
            LOAD OLDER →
          </Link>
        </div>
      )}
    </>
  )
}

function NoActivityYet() {
  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{
        background: 'var(--color-mgp-paper)',
        border: '0.5px solid var(--color-mgp-border)',
        borderRadius: 8,
        padding: 20,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 18,
          color: 'var(--color-mgp-ink)',
          marginBottom: 4,
        }}>
          Quiet on the green
        </div>
        <div style={{ fontSize: 12, color: 'var(--color-mgp-ink-2)', lineHeight: 1.5 }}>
          None of your friends have stamped a course yet. When they do, it shows up here.
        </div>
      </div>
    </div>
  )
}

function EmptyFeedState({
  ownStamps,
}: {
  ownStamps: Awaited<ReturnType<typeof fetchFeed>>['ownStamps']
}) {
  return (
    <>
      {/* Find friends CTA */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'var(--color-mgp-cream-warm)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 22,
            color: 'var(--color-mgp-ink)',
            marginBottom: 6,
          }}>
            Find your golf circle
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--color-mgp-ink-2)',
            lineHeight: 1.5,
            marginBottom: 14,
          }}>
            Your feed lights up with friends' stamps, badges, and new connections.
            Add a few to get started.
          </div>
          <Link
            href="/friends"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 2,
              color: 'var(--color-mgp-ink-inv)',
              background: 'var(--color-mgp-cover)',
              padding: '10px 22px',
              borderRadius: 4,
              textDecoration: 'none',
            }}
          >
            FIND FRIENDS →
          </Link>
        </div>
      </div>

      {/* Own stamps as something to look at */}
      {ownStamps.length > 0 && (
        <>
          <div style={{ padding: '20px 16px 8px' }}>
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
            }}>
              Your recent stamps
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
            {ownStamps.map(item => (
              <FeedCard key={`own-${item.id}`} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
