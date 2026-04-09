import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileClient from '@/components/ProfileClient'
import type { Badge } from '@/components/ProfileClient'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

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

  const [profileResult, roundCountResult, roundsResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count')
      .eq('id', user!.id)
      .single(),

    supabase
      .from('rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user!.id),

    supabase
      .from('rounds')
      .select('course_id, courses(country, is_major)')
      .eq('user_id', user!.id),
  ])

  const profile = profileResult.data
  const roundCount = roundCountResult.count ?? 0
  const rounds = roundsResult.data ?? []

  // Distinct countries
  const countrySet = new Set(
    rounds
      .map(r => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  // Major Hunter check
  const hasPlayedMajor = rounds.some(
    r => (r.courses as unknown as { is_major: boolean } | null)?.is_major === true
  )

  // Top 100 check — query top100_rankings for any of the user's course IDs
  const courseIds = [...new Set(rounds.map(r => r.course_id))]
  let hasTop100 = false
  if (courseIds.length > 0) {
    const { count } = await supabase
      .from('top100_rankings')
      .select('*', { count: 'exact', head: true })
      .in('course_id', courseIds)
    hasTop100 = (count ?? 0) > 0
  }

  const fullName =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfspiller'

  const initials = computeInitials(fullName, user?.email)

  const badges: Badge[] = [
    { key: 'first-tee',          label: 'First Tee',          emoji: '⛳', earned: roundCount >= 1,   description: 'Log din første bane' },
    { key: 'border-crosser',     label: 'Border Crosser',     emoji: '🌍', earned: countryCount >= 2, description: 'Spil i 2 lande' },
    { key: 'getting-started',    label: 'Getting Started',    emoji: '🏌️', earned: roundCount >= 10,  description: 'Log 10 baner' },
    { key: 'european-explorer',  label: 'European Explorer',  emoji: '🗺️', earned: countryCount >= 5, description: 'Spil i 5 lande' },
    { key: 'seasoned-golfer',    label: 'Seasoned Golfer',    emoji: '🎖️', earned: roundCount >= 50,  description: 'Log 50 baner' },
    { key: 'century-club',       label: 'Century Club',       emoji: '💯', earned: roundCount >= 100, description: 'Log 100 baner' },
    { key: 'major-hunter',       label: 'Major Hunter',       emoji: '🏆', earned: hasPlayedMajor,    description: 'Spil en Major-bane' },
    { key: 'top-100',            label: 'Top 100',            emoji: '⭐', earned: hasTop100,          description: 'Spil en Top 100-bane' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Top bar — full width */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </Link>
        <ProfileButton initials={initials} />
      </div>

      {/* Content — max-width centered */}
      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>
          👤 Min profil
        </div>

        <ProfileClient
          userId={user!.id}
          email={user?.email ?? ''}
          initials={initials}
          fullName={fullName}
          handicap={profile?.handicap ?? null}
          homeClub={profile?.home_club ?? null}
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
