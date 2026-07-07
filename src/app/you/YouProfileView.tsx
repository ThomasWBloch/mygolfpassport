import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import PassportCard from '@/components/PassportCard'
import SharePassport from '@/components/SharePassport'
import ShareCard from '@/components/ShareCard'
import ProfileRatingsReviews, { type RatingRow, type ReviewRow } from '@/components/ProfileRatingsReviews'
import { computeInitials } from '@/lib/initials'

/**
 * YouProfileView — the "Profile" subtab on /you (default tab).
 *
 * Renders the identity surface: PassportCard hero with Edit-button in the
 * top-right, plus Settings and Feedback tiles. The Courses / Countries
 * accordions that used to live below the card now live in the sibling
 * Courses subtab (YouCoursesView); the Badges list lives in YouBadgesView.
 *
 * The PassportCard's badge strip + Badges stat-box link to
 * /you?tab=badges so the user stays inside the You-tab section instead of
 * being redirected back to a legacy standalone route.
 */

interface EarnedBadge {
  emoji: string
  name: string
  tier: string
}

export default async function YouProfileView() {
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

  const [profileResult, roundsResult, userBadgesResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, avatar_url, referral_code')
      .eq('id', user.id)
      .single(),

    // Stat counters only — pull just the columns needed for round/country
    // tallies. The full accordion-data fetch happens in YouCoursesView so
    // this tab stays cheap.
    supabase
      .from('rounds')
      .select('course_id, rating, note, played_at, courses(name, country, club, flag)')
      .eq('user_id', user.id)
      .is('parent_round_id', null),

    supabase
      .from('user_badges')
      .select('badges(emoji, name, tier)')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false }),
  ])

  const profile = profileResult.data
  const rounds = roundsResult.data ?? []
  const courseIds = [...new Set(rounds.map(r => r.course_id as string))]
  const roundCount = courseIds.length

  const countrySet = new Set(
    rounds
      .map(r => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  const fullName =
    profile?.full_name ??
    user.user_metadata?.full_name ??
    user.email?.split('@')[0] ??
    'Golfer'

  const initials = computeInitials(fullName, user.email)
  const homeCountry = (profile?.home_country as string) ?? null

  // Club flag — derive from rounds data to avoid an extra query
  let clubFlag: string | null = null
  if (profile?.home_club) {
    const match = rounds.find(
      r => (r.courses as unknown as { club?: string } | null)?.club === (profile.home_club as string)
    )
    clubFlag = match ? ((match.courses as unknown as { flag?: string } | null)?.flag ?? null) : null
  }

  const earnedBadges: EarnedBadge[] = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as { emoji: string; name: string; tier: string } | null
      if (!b) return null
      return { emoji: b.emoji, name: b.name, tier: b.tier }
    })
    .filter((b): b is EarnedBadge => b !== null)

  // Ratings + written reviews for the two profile tiles. Both read from the
  // same primary-round set already fetched above.
  const fmtPlayed = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''
  type CourseLite = { name?: string; country?: string; club?: string } | null
  const courseOf = (r: (typeof rounds)[number]) => (r.courses as unknown as CourseLite)
  const rowBase = (r: (typeof rounds)[number]) => {
    const c = courseOf(r)
    return {
      club: c?.club ?? c?.name ?? 'Unknown course',
      name: c?.name ?? '',
      country: c?.country ?? '',
      played: fmtPlayed((r.played_at as string | null) ?? null),
    }
  }

  const ratings: RatingRow[] = rounds
    .filter(r => r.rating != null)
    .map(r => ({ ...rowBase(r), rating: r.rating as number }))

  const reviews: ReviewRow[] = rounds
    .filter(r => typeof r.note === 'string' && (r.note as string).trim().length > 0)
    .sort((a, b) => String(b.played_at ?? '').localeCompare(String(a.played_at ?? '')))
    .map(r => ({ ...rowBase(r), rating: (r.rating as number | null) ?? 0, note: (r.note as string).trim() }))

  return (
    <div
      style={{
        maxWidth: 768,
        margin: '0 auto',
        padding: '16px 14px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <PassportCard
        fullName={fullName}
        email={user.email ?? undefined}
        initials={initials}
        homeClub={(profile?.home_club as string) ?? null}
        clubFlag={clubFlag}
        homeCountry={homeCountry}
        handicap={(profile?.handicap as number) ?? null}
        roundCount={roundCount}
        countryCount={countryCount}
        badgeCount={earnedBadges.length}
        badgeEmojis={earnedBadges.slice(0, 5).map(b => ({ emoji: b.emoji, name: b.name, tier: b.tier }))}
        totalBadges={earnedBadges.length}
        coursesHref="/you?tab=courses"
        countriesHref="/you?tab=courses"
        badgesHref="/you?tab=badges"
      />

      <SharePassport
        fullName={fullName}
        initials={initials}
        homeClub={(profile?.home_club as string) ?? null}
        homeCountry={homeCountry}
        handicap={(profile?.handicap as number) ?? null}
        roundCount={roundCount}
        countryCount={countryCount}
        badgeCount={earnedBadges.length}
        referralCode={(profile?.referral_code as string) ?? null}
      />

      <ShareCard />

      <ProfileRatingsReviews ratings={ratings} reviews={reviews} />

      {/* Quick link to settings (in addition to passport-card top-right) */}
      <Link
        href="/profile/edit"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-mgp-paper)',
          border: '1px solid var(--color-mgp-border-faint)',
          borderRadius: 14,
          padding: '14px 16px',
          textDecoration: 'none',
          marginTop: 6,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 3,
            }}
          >
            Settings
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
              lineHeight: 1.15,
            }}
          >
            Edit profile &amp; settings
          </div>
        </div>
        <span style={{ color: 'var(--color-mgp-ink-3)', fontSize: 18 }}>›</span>
      </Link>

      {/* Feedback tile — entry-point to /survey (no other surface links to it) */}
      <Link
        href="/survey"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--color-mgp-paper)',
          border: '1px solid var(--color-mgp-border-faint)',
          borderRadius: 14,
          padding: '14px 16px',
          textDecoration: 'none',
          marginTop: 6,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 3,
            }}
          >
            Feedback
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
              lineHeight: 1.15,
            }}
          >
            Give feedback on the app
          </div>
        </div>
        <span style={{ color: 'var(--color-mgp-ink-3)', fontSize: 18 }}>›</span>
      </Link>
    </div>
  )
}
