import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import SendMessageButton from '@/components/SendMessageButton'
import { computeInitials } from '@/lib/initials'
import { getLevelTitle } from '@/lib/levels'
import PassportCard from '@/components/PassportCard'
import ProfileAccordions from '@/components/ProfileAccordions'
import type { CourseEntry, CountryEntry } from '@/components/ProfileAccordions'

export default async function PublicProfilePage({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id: targetId } = await params
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

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()

  const [profileResult, viewerProfileResult, roundsResult, userBadgesResult] = await Promise.all([
    adminSupabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, show_course_count, total_xp, level, avatar_url')
      .eq('id', targetId)
      .single(),

    user
      ? supabase.from('profiles').select('full_name').eq('id', user.id).single()
      : Promise.resolve({ data: null }),

    adminSupabase
      .from('rounds')
      .select('course_id, rating, played_at, created_at, courses(name, club, country, flag)')
      .eq('user_id', targetId)
      .order('created_at', { ascending: false }),

    adminSupabase
      .from('user_badges')
      .select('earned_at, badges(emoji, name, description, tier)')
      .eq('user_id', targetId)
      .order('earned_at', { ascending: false }),
  ])

  if (!profileResult.data) notFound()

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

  const totalXP = (profile.total_xp as number) ?? 0
  const level = (profile.level as number) ?? 1
  const levelTitle = getLevelTitle(level)

  const fullName = profile.full_name ?? 'Golfer'
  const homeCountry = (profile.home_country as string) ?? null

  // Club flag — derive from rounds data to avoid extra query
  let clubFlag: string | null = null
  if (profile.home_club) {
    const match = rounds.find(r => (r.courses as unknown as { club?: string } | null)?.club === (profile.home_club as string))
    clubFlag = match ? ((match.courses as unknown as { flag?: string } | null)?.flag ?? null) : null
  }

  // Build earned badges from DB
  const tierWeight: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 }
  const earnedBadges = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as { emoji: string; name: string; description: string; tier: string } | null
      if (!b) return null
      return { emoji: b.emoji, name: b.name, description: b.description, tier: b.tier, earnedAt: ub.earned_at as string }
    })
    .filter((b): b is { emoji: string; name: string; description: string; tier: string; earnedAt: string } => b !== null)
    .sort((a, b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9))

  // Build course entries for accordion (deduplicated, most recent first)
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
    })
  }

  // Build country entries for accordion
  const countryMap = new Map<string, { flag: string | null; count: number }>()
  for (const c of courseEntries) {
    if (!c.country) continue
    const entry = countryMap.get(c.country)
    if (entry) entry.count++
    else countryMap.set(c.country, { flag: c.flag, count: 1 })
  }
  const countryEntries: CountryEntry[] = [...countryMap.entries()]
    .map(([country, { flag, count }]) => ({ country, flag, courseCount: count }))
    .sort((a, b) => b.courseCount - a.courseCount)

  const initials = computeInitials(
    (viewerProfileResult as { data: { full_name?: string } | null }).data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', ...font }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="javascript:history.back()" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Back
          </Link>
          {user && <ProfileButton initials={initials} />}
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Passport card */}
        <PassportCard
          fullName={fullName}
          initials={computeInitials(fullName, undefined)}
          homeClub={(profile.home_club as string) ?? null}
          clubFlag={clubFlag}
          homeCountry={homeCountry}
          handicap={(profile.handicap as number) ?? null}
          roundCount={roundCount}
          countryCount={countryCount}
          badgeCount={earnedBadges.length}
          level={level}
          levelTitle={levelTitle}
          totalXP={totalXP}
          badgeEmojis={earnedBadges.slice(0, 5).map(b => ({ emoji: b.emoji, name: b.name }))}
          totalBadges={earnedBadges.length}
        />

        {/* Message button */}
        {user && user.id !== targetId && (
          <SendMessageButton targetUserId={targetId} />
        )}

        {/* Courses / Countries / Badges accordions */}
        <ProfileAccordions
          courses={courseEntries}
          countries={countryEntries}
          badges={earnedBadges}
        />
      </div>
    </div>
  )
}
