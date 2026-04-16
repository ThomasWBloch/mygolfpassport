import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileClient from '@/components/ProfileClient'
import type { Badge } from '@/components/ProfileClient'
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

    supabase
      .from('rounds')
      .select('course_id, courses(country, club, flag)')
      .eq('user_id', user!.id),

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

  // Build earned badges from DB
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
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
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

      </div>
    </div>
  )
}
