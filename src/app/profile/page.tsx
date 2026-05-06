import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileClient from '@/components/ProfileClient'
import type { Badge } from '@/components/ProfileClient'
import ProfileAccordions from '@/components/ProfileAccordions'
import type { CourseEntry, CountryEntry } from '@/components/ProfileAccordions'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

interface EarnedBadge {
  emoji: string
  name: string
  description: string
  tier: string
  earnedAt: string
}

export default async function ProfilePage() {
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

  const [profileResult, roundsResult, userBadgesResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count')
      .eq('id', user!.id)
      .single(),

    // Fetch enough data to power both the stats counters and the accordions
    supabase
      .from('rounds')
      .select('id, course_id, rating, played_at, created_at, courses(name, club, country, flag)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),

    supabase
      .from('user_badges')
      .select('earned_at, badges(emoji, name, description, tier)')
      .eq('user_id', user!.id)
      .order('earned_at', { ascending: false }),
  ])

  const profile = profileResult.data
  const rounds = roundsResult.data ?? []
  const roundCount = new Set(rounds.map(r => r.course_id)).size

  const countrySet = new Set(
    rounds
      .map(r => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  const fullName =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfer'

  const initials = computeInitials(fullName, user?.email)

  // Club flag — derive from rounds data to avoid extra query
  const homeClub = profile?.home_club as string | null
  let clubFlag: string | null = null
  if (homeClub) {
    const match = rounds.find(r => (r.courses as unknown as { club?: string } | null)?.club === homeClub)
    clubFlag = match ? ((match.courses as unknown as { flag?: string } | null)?.flag ?? null) : null
  }

  // ── Build accordion data: courses, countries, badges ─────────────────────
  const seenCourseIds = new Set<string>()
  const courseEntries: CourseEntry[] = []
  for (const r of rounds) {
    const cid = r.course_id as string
    if (seenCourseIds.has(cid)) continue
    seenCourseIds.add(cid)
    const c = r.courses as unknown as { name: string; club: string | null; country: string | null; flag: string | null } | null
    if (!c) continue
    courseEntries.push({
      courseId: cid,
      courseName: c.name,
      clubName: c.club,
      country: c.country,
      flag: c.flag,
      rating: r.rating as number | null,
      playedAt: (r.played_at ?? r.created_at) as string | null,
      roundId: r.id as string,
    })
  }

  const countryStatsMap = new Map<string, { flag: string | null; count: number }>()
  for (const c of courseEntries) {
    if (!c.country) continue
    const e = countryStatsMap.get(c.country)
    if (e) e.count++
    else countryStatsMap.set(c.country, { flag: c.flag, count: 1 })
  }
  const countryEntries: CountryEntry[] = [...countryStatsMap.entries()]
    .map(([country, { flag, count }]) => ({ country, flag, courseCount: count }))
    .sort((a, b) => b.courseCount - a.courseCount)

  const tierWeight: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 }
  const earnedBadges: EarnedBadge[] = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as { emoji: string; name: string; description: string; tier: string } | null
      if (!b) return null
      return { emoji: b.emoji, name: b.name, description: b.description, tier: b.tier, earnedAt: ub.earned_at as string }
    })
    .filter((b): b is EarnedBadge => b !== null)
    .sort((a, b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9))

  // Legacy badges array for ProfileClient (used in the old badge grid)
  const badges: Badge[] = earnedBadges.map(b => ({
    key: b.name, label: b.name, emoji: b.emoji, earned: true, description: b.description,
  }))

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar — Adventure tokens */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
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
        </Link>
        <ProfileButton initials={initials} />
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px' }}>

        <ProfileClient
          userId={user!.id}
          email={user?.email ?? ''}
          initials={initials}
          fullName={fullName}
          handicap={profile?.handicap ?? null}
          homeClub={profile?.home_club ?? null}
          homeCountry={(profile?.home_country as string) ?? null}
          clubFlag={clubFlag}
          avatarUrl={(profile?.avatar_url as string) ?? null}
          allowFriends={profile?.allow_round_requests_friends ?? true}
          allowStrangers={profile?.allow_round_requests_strangers ?? false}
          showInSearch={profile?.show_in_search ?? true}
          showCourseCount={profile?.show_course_count ?? true}
          roundCount={roundCount}
          countryCount={countryCount}
          badges={badges}
        />

        {/* Passport sections — courses / countries / badges */}
        {courseEntries.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <ProfileAccordions
              courses={courseEntries}
              countries={countryEntries}
              badges={earnedBadges}
              isOwnProfile
            />
          </div>
        )}

      </div>
    </div>
  )
}
