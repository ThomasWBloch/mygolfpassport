import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import UserAvatar from '@/components/UserAvatar'
import PassportCard from '@/components/PassportCard'
import SectionEyebrow from '@/components/SectionEyebrow'
import FriendsActivitySection from '@/components/FriendsActivitySection'
import { fetchFeed, playedAtLabel, relativeTimestamp } from '@/lib/feed'
import { computeInitials } from '@/lib/initials'
import { isGenericCourseName } from '@/lib/course-display'
import RatingBadge from '@/components/RatingBadge'

/**
 * Home — Adventure landing page.
 *
 * May 2026 redesign (Session 52 structure-alignment): the home page is now
 * a three-band layout that mirrors the prototype:
 *   1. Greeting + PassportCard hero (passport ID page with 3-up stats)
 *   2. "Recently logged" — the user's own two most recent stamps
 *   3. "Friends' activity" — two latest feed items, click deep-links to the
 *      Social tab where the full feed lives (bucket-list section from the
 *      prototype is intentionally skipped until the bucket feature ships).
 *
 * Differences from the May redesign that landed in 84ef4d0:
 *   - Friends stat removed from PassportCard globally (lives on Friends tab)
 *   - "Recent activity from your circle" multi-item feed → 2 latest only
 *   - "MORE ›" pagination link removed (deep-link to Social handles "more")
 *
 * Feed deep-link target from native push notifications still works against
 * the underlying feed query in /lib/feed.ts — we just expose two items on
 * the home page rather than the full paginated stream.
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
    ownRecentRoundsResult,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, avatar_url')
      .eq('id', user.id)
      .single(),

    // Rounds — used for own course/country counts.
    supabase
      .from('rounds')
      .select('course_id, courses(country)')
      .eq('user_id', user.id)
      .is('parent_round_id', null),

    // Badges — just the count (used by the Badges stat box).
    supabase
      .from('user_badges')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id),

    // Friends' activity — only need 2 items for the home preview. The full
    // feed lives on the Social tab once that route ships; until then the
    // "see all" link on this section points at /friends as a placeholder.
    fetchFeed(adminSupabase, user.id, { before: before ?? null, limit: 2 }),

    // Own recent rounds — drives the "Recently logged" section under the
    // passport card. We over-fetch a tiny bit (3) so that if the most recent
    // is a synthetic loop-round (already filtered server-side via
    // parent_round_id IS NULL) we still have two display rows.
    supabase
      .from('rounds')
      .select('id, course_id, rating, note, played_at, created_at, courses(name, club, country, flag)')
      .eq('user_id', user.id)
      .is('parent_round_id', null)
      .order('created_at', { ascending: false })
      .limit(3),

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

  // ── Badges ───────────────────────────────────────────────────────────────
  const badgeCount = (userBadgesResult as { count: number | null }).count ?? 0

  const { items, hasFriends } = feedResult

  // ── Greeting first-name ──────────────────────────────────────────────────
  // Falls back to the email-handle when no profile name is set so the greeting
  // never reads "Fore , 🏌️". We deliberately split on space (not " ") so a
  // single-token name (e.g. "Madonna") doesn't strip itself to an empty string.
  const firstName = (fullName.split(/\s+/)[0] || '').trim() || 'Golfer'

  // ── Own recent rounds for "Recently logged" — typed shape ────────────────
  type OwnRoundRow = {
    id: string
    course_id: string
    rating: number | null
    note: string | null
    played_at: string | null
    created_at: string
    courses: { name: string; club: string | null; country: string | null; flag: string | null } | null
  }
  const ownRecentRounds = ((ownRecentRoundsResult.data ?? []) as unknown as OwnRoundRow[])
    .slice(0, 2)

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Home glyph — replaces the previous gold "M" monogram. Sketched
              inline so it can pick up the gold token without an extra asset. */}
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
<Link href="/you" style={{ textDecoration: 'none', display: 'flex' }}>
            <UserAvatar
              name={fullName}
              avatarUrl={avatarUrl}
              size={32}
              border="1.5px solid var(--color-mgp-gold)"
            />
          </Link>
        </div>
      </div>

      {/* ── Greeting ─────────────────────────────────────────────────── */}
      <div style={{ padding: '16px 16px 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 22,
            fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.2,
          }}
        >
          Fore {firstName}!
        </div>
      </div>

      {/* ── Passport hero ────────────────────────────────────────────── */}
      <div style={{ padding: '10px 14px 0' }}>
        <PassportCard
          fullName={fullName}
          email={user.email ?? undefined}
          initials={initials}
          homeClub={homeClub}
          homeCountry={homeCountry}
          handicap={handicap}
          roundCount={roundCount}
          countryCount={countryCount}
          badgeCount={badgeCount}
          coursesHref="/you?tab=courses"
          countriesHref="/you?tab=courses"
          badgesHref="/you?tab=badges"
        />
      </div>

      {/* ── Recently logged (own activity) ───────────────────────────── */}
      <RecentlyLoggedSection rounds={ownRecentRounds} />

      {/* ── Friends' activity (preview of feed) ──────────────────────── */}
      <FriendsActivitySection items={items} hasFriends={hasFriends} />

      <div style={{ height: 24 }} />
    </div>
  )
}

// ── Sub-views ────────────────────────────────────────────────────────────────

/** Recently logged — your own most recent two stamps, each linking to the
 *  course detail page. Simple card style (no avatar — it's your stuff). */
function RecentlyLoggedSection({
  rounds,
}: {
  rounds: ReadonlyArray<{
    id: string
    course_id: string
    rating: number | null
    note: string | null
    played_at: string | null
    created_at: string
    courses: { name: string; club: string | null; country: string | null; flag: string | null } | null
  }>
}) {
  return (
    <section>
      <div style={{ padding: '18px 16px 8px' }}>
        <SectionEyebrow>Recently logged</SectionEyebrow>
      </div>

      {rounds.length === 0 ? (
        <div style={{ padding: '0 16px' }}>
          <div
            style={{
              background: 'var(--color-mgp-paper)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 8,
              padding: 18,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 17,
                color: 'var(--color-mgp-ink)',
                marginBottom: 4,
              }}
            >
              Your passport is blank
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--color-mgp-ink-2)',
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              Stamp your first course to start your travel diary.
            </div>
            <Link
              href="/log"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mgp-stamp)',
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--color-mgp-ink-inv)',
                background: 'var(--color-mgp-cover)',
                padding: '10px 18px',
                borderRadius: 4,
                textDecoration: 'none',
              }}
            >
              LOG A ROUND →
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 16px' }}>
          {rounds.map(r => (
            <OwnStampCard key={r.id} round={r} />
          ))}
        </div>
      )}
    </section>
  )
}

/** Single own-stamp card — mirrors the friends'-activity FeedCard layout:
 *  club + course on the left, rating + note preview underneath, date stamp
 *  below, and a PLAYED-{year} circle + country flag in the right column.
 *  Avatar is intentionally absent — it's your own activity. */
function OwnStampCard({
  round,
}: {
  round: {
    id: string
    course_id: string
    rating: number | null
    note: string | null
    played_at: string | null
    created_at: string
    courses: { name: string; club: string | null; country: string | null; flag: string | null } | null
  }
}) {
  const c = round.courses
  const flag = c?.flag ?? ''
  const courseName = c?.name ?? 'Unknown course'
  const clubName = c?.club ?? null

  const playedYear = round.played_at ? new Date(round.played_at).getFullYear() : null
  const dateLabel = playedAtLabel(round.played_at) ?? relativeTimestamp(round.created_at)
  const courseIsGeneric = isGenericCourseName(courseName)
  const courseAndClubAreSame =
    !!clubName && clubName.trim().toLowerCase() === courseName.trim().toLowerCase()

  return (
    <Link
      href={`/courses/${round.course_id}`}
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        background: 'var(--color-mgp-paper)',
        border: '0.5px solid var(--color-mgp-border)',
        borderRadius: 8,
        padding: 14,
        textDecoration: 'none',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        {courseIsGeneric && clubName ? (
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 17, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.2,
            lineHeight: 1.2,
          }}>
            {clubName}
          </div>
        ) : courseAndClubAreSame || !clubName ? (
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 17, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.2,
            lineHeight: 1.2,
          }}>
            {courseName}
          </div>
        ) : (
          <>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
              lineHeight: 1.2,
            }}>
              {clubName}
            </div>
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600,
              fontSize: 11, letterSpacing: 1.2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginTop: 3,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {courseName}
            </div>
          </>
        )}

        {round.rating != null && (
          <div style={{ marginTop: 6 }}>
            <RatingBadge value={round.rating} />
          </div>
        )}

        {round.note && (
          <div style={{
            marginTop: 6,
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 13, fontStyle: 'italic',
            color: 'var(--color-mgp-ink-2)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            &ldquo;{round.note}&rdquo;
          </div>
        )}

        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10, letterSpacing: 1,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginTop: 8,
        }}>
          {dateLabel}
        </div>
      </div>

      {playedYear && (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6, flexShrink: 0,
        }}>
          <div
            aria-hidden
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1.5px dashed var(--color-mgp-stamp-red)',
              transform: 'rotate(-8deg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600, fontSize: 8,
              color: 'var(--color-mgp-stamp-red)',
              lineHeight: 1, textAlign: 'center',
              letterSpacing: 0.5,
            }}
          >
            PLAYED<br />{playedYear}
          </div>
          {flag && <span style={{ fontSize: 18, lineHeight: 1 }}>{flag}</span>}
        </div>
      )}
    </Link>
  )
}

