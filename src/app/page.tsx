import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import UserAvatar from '@/components/UserAvatar'
import PassportCard from '@/components/PassportCard'
import HomeNavTiles from '@/components/HomeNavTiles'
import FeedCard from '@/components/FeedCard'
import { fetchFeed } from '@/lib/feed'
import { computeInitials } from '@/lib/initials'
import { SYSTEM_USER_ID } from '@/lib/constants'

/**
 * Home — Adventure landing page.
 *
 * Pivoted from feed-as-hero (Sprint 2.1) to a calmer "passport + nav-tiles +
 * feed below" layout. Reasoning: opening the app should feel like opening a
 * travel diary, not landing in a Twitter timeline. Feed still lives here,
 * folded under the hero, so users who scroll get the social signal — but the
 * primary impression is the user's own passport and clear next-steps.
 *
 * Layout (top → bottom):
 *  · Top bar (cover-green, M-monogram, ✉ unread badge, avatar)
 *  · PassportCard hero (full-fat passport ID page)
 *  · HomeNavTiles (Atlas / Trophy room / Standings / Companions)
 *  · "Recent stamps from your circle" eyebrow + feed body
 *  · Load older link (when more pages available)
 *  · Empty-state CTA when user has no friends yet (own stamps + find-friends)
 *
 * Feed deep-link target from native push notifications can still be /?before=
 * or a dedicated /feed route in future — this page is also the home tab in
 * BottomNav, so feed access remains "scroll down".
 */

interface Props {
  searchParams: Promise<{ before?: string }>
}

interface EarnedBadge {
  emoji: string
  name: string
  tier: string
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
  // rounds, badges, and friendship counts in both directions). Falls back to
  // user client if no service key is set.
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

  const { before } = await searchParams

  // ── Parallel fetches ─────────────────────────────────────────────────────
  const [
    profileResult,
    roundsResult,
    userBadgesResult,
    feedResult,
    unreadResult,
    friendshipsResult,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, avatar_url')
      .eq('id', user.id)
      .single(),

    // Rounds — used for own course/country counts AND for deriving the home
    // club's flag without an extra round-trip.
    supabase
      .from('rounds')
      .select('course_id, courses(country, club, flag)')
      .eq('user_id', user.id),

    // Badges — emoji/name/tier for PassportCard wax-seal strip + count.
    supabase
      .from('user_badges')
      .select('earned_at, badges(emoji, name, tier)')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false }),

    fetchFeed(adminSupabase, user.id, { before: before ?? null, limit: 20 }),

    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .neq('sender_id', user.id)
      .is('read_at', null),

    // Friendships — for HomeNavTiles Companions stamp.
    // Use admin client to bypass RLS (mirrors /friends page pattern).
    adminSupabase
      .from('friendships')
      .select('id, user_id, friend_id, status')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .in('status', ['accepted', 'pending']),
  ])

  // ── Profile + identity ───────────────────────────────────────────────────
  const profile = profileResult.data
  const fullName =
    (profile?.full_name as string | null) ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email?.split('@')[0] ??
    'Golfer'
  const avatarUrl = (profile?.avatar_url as string | null) ?? null
  const initials = computeInitials(fullName, user.email)
  const homeCountry = (profile?.home_country as string) ?? null
  const homeClub = (profile?.home_club as string) ?? null
  const handicap = (profile?.handicap as number) ?? null

  // ── Stats ────────────────────────────────────────────────────────────────
  const ownRounds = roundsResult.data ?? []
  const courseIds = new Set(ownRounds.map(r => r.course_id as string))
  const roundCount = courseIds.size
  const countryCount = new Set(
    ownRounds
      .map(r => (r.courses as unknown as { country?: string } | null)?.country)
      .filter((c): c is string => Boolean(c))
  ).size

  // Derive home club's flag from already-fetched rounds (avoids extra query).
  let clubFlag: string | null = null
  if (homeClub) {
    const match = ownRounds.find(
      r => (r.courses as unknown as { club?: string } | null)?.club === homeClub
    )
    clubFlag = match
      ? (match.courses as unknown as { flag?: string } | null)?.flag ?? null
      : null
  }

  // ── Badges ───────────────────────────────────────────────────────────────
  const tierWeight: Record<string, number> = {
    legendary: 0, rare: 1, uncommon: 2, common: 3,
  }
  const earnedBadges: EarnedBadge[] = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as
        { emoji: string; name: string; tier: string } | null
      if (!b) return null
      return { emoji: b.emoji, name: b.name, tier: b.tier }
    })
    .filter((b): b is EarnedBadge => b !== null)
    .sort((a, b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9))
  const badgeCount = earnedBadges.length

  // ── Friendships ──────────────────────────────────────────────────────────
  // Filter system account from counts (audit #14 — system "My Golf Passport"
  // user is used for notification messages and isn't a real connection).
  const friendshipRows = (friendshipsResult.data ?? []).filter(
    f => f.user_id !== SYSTEM_USER_ID && f.friend_id !== SYSTEM_USER_ID
  )
  const friendCount = friendshipRows.filter(f => f.status === 'accepted').length
  const pendingCount = friendshipRows.filter(f => f.status === 'pending').length

  const unreadCount = (unreadResult as { count: number | null }).count ?? 0
  const { items, hasFriends, nextCursor, ownStamps } = feedResult

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-mgp-cream)',
        fontFamily: 'var(--font-mgp-body)',
      }}
    >
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          background: 'var(--color-mgp-cover)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              border: '1.5px solid var(--color-mgp-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-mgp-gold)',
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 14,
            }}
          >
            M
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 18,
              fontWeight: 500,
              color: 'var(--color-mgp-ink-inv)',
              letterSpacing: 0.5,
            }}
          >
            My Golf Passport
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/messages"
            aria-label="Messages"
            style={{
              color: 'var(--color-mgp-gold)',
              fontSize: 18,
              textDecoration: 'none',
              position: 'relative',
              lineHeight: 1,
            }}
          >
            ✉
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: -6,
                  right: -8,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: 'var(--color-mgp-stamp-red)',
                  color: 'var(--color-mgp-ink-inv)',
                  border: '1.5px solid var(--color-mgp-cover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '0 3px',
                }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none', display: 'flex' }}>
            <UserAvatar
              name={fullName}
              avatarUrl={avatarUrl}
              size={32}
              border="1.5px solid var(--color-mgp-gold)"
            />
          </Link>
        </div>
      </div>

      {/* ── Passport hero ────────────────────────────────────────────── */}
      <div style={{ padding: '14px 14px 0' }}>
        <PassportCard
          fullName={fullName}
          email={user.email ?? undefined}
          initials={initials}
          homeClub={homeClub}
          clubFlag={clubFlag}
          homeCountry={homeCountry}
          handicap={handicap}
          roundCount={roundCount}
          countryCount={countryCount}
          badgeCount={badgeCount}
          badgeEmojis={earnedBadges.slice(0, 5)}
          totalBadges={badgeCount}
          badgesHref="/badges"
        />
      </div>

      {/* ── Nav tiles ────────────────────────────────────────────────── */}
      <HomeNavTiles
        countryCount={countryCount}
        badgeCount={badgeCount}
        friendCount={friendCount}
        pendingCount={pendingCount}
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
      <div style={{ padding: '18px 16px 6px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
          }}
        >
          Recent stamps from your circle
        </div>
      </div>

      {items.length === 0 ? (
        <NoActivityYet />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            padding: '0 16px',
          }}
        >
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
      <div
        style={{
          background: 'var(--color-mgp-paper)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 8,
          padding: 20,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18,
            color: 'var(--color-mgp-ink)',
            marginBottom: 4,
          }}
        >
          Quiet on the green
        </div>
        <div
          style={{
            fontSize: 12,
            color: 'var(--color-mgp-ink-2)',
            lineHeight: 1.5,
          }}
        >
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
      <div style={{ padding: '18px 16px 0' }}>
        <div
          style={{
            background: 'var(--color-mgp-cream-warm)',
            border: '0.5px solid var(--color-mgp-border)',
            borderRadius: 8,
            padding: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 22,
              color: 'var(--color-mgp-ink)',
              marginBottom: 6,
            }}
          >
            Find your golf circle
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'var(--color-mgp-ink-2)',
              lineHeight: 1.5,
              marginBottom: 14,
            }}
          >
            Your feed lights up with friends&apos; stamps, badges, and new connections.
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
            <div
              style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
              }}
            >
              Your recent stamps
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '0 16px',
            }}
          >
            {ownStamps.map(item => (
              <FeedCard key={`own-${item.id}`} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
