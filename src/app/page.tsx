import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeInitials } from '@/lib/initials'
import UserAvatar from '@/components/UserAvatar'
import PassportCard from '@/components/PassportCard'
import ProfileAccordions from '@/components/ProfileAccordions'
import type { CourseEntry, CountryEntry } from '@/components/ProfileAccordions'

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function Home() {
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
  if (!user) redirect('/login')

  // ── Parallel data fetch ──────────────────────────────────────────────────
  const [profileResult, roundsResult, userBadgesResult, unreadResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('full_name, handicap, home_club, home_country, avatar_url')
      .eq('id', user!.id)
      .single(),

    supabase
      .from('rounds')
      .select('course_id, rating, played_at, created_at, courses(name, club, country, flag)')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),

    // Earned badges with badge details, ordered by tier weight then earned_at desc
    supabase
      .from('user_badges')
      .select('earned_at, badges(emoji, name, description, tier)')
      .eq('user_id', user!.id)
      .order('earned_at', { ascending: false }),

    // Unread messages count
    supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .neq('sender_id', user!.id)
      .is('read_at', null),
  ])

  // ── Derived values ───────────────────────────────────────────────────────
  const profile = profileResult.data

  const fullName: string =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfer'

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w: string) => w[0].toUpperCase())
    .join('')

  const avatarUrl = (profile?.avatar_url as string) ?? null
  const homeCountry = (profile?.home_country as string) ?? null

  const rounds = roundsResult.data ?? []
  const roundCount = new Set(rounds.map(r => r.course_id)).size

  const countrySet = new Set(
    rounds
      .map(r => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  // Build course entries for accordions (deduplicated, most recent first)
  const seenCourseIds = new Set<string>()
  const courseEntries: CourseEntry[] = []
  for (const r of rounds) {
    const cid = r.course_id as string
    if (seenCourseIds.has(cid)) continue
    seenCourseIds.add(cid)
    const c = r.courses as unknown as { name: string; club: string | null; country: string | null; flag: string | null } | null
    if (!c) continue
    courseEntries.push({
      courseId: cid, courseName: c.name, clubName: c.club,
      country: c.country, flag: c.flag,
      rating: r.rating as number | null,
      playedAt: (r.played_at ?? r.created_at) as string | null,
    })
  }

  // Build country entries for accordions
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

  // Club flag — try to derive from rounds data first, fallback to a single query
  const homeClub = profile?.home_club as string | null
  let clubFlag: string | null = null
  if (homeClub) {
    const matchedRound = rounds.find(r => (r.courses as unknown as { club?: string } | null)?.club === homeClub)
    clubFlag = matchedRound
      ? ((matchedRound.courses as unknown as { flag?: string } | null)?.flag ?? null)
      : ((await supabase.from('courses').select('flag').eq('club', homeClub).limit(1).single()).data?.flag as string) ?? null
  }

  // Earned badges — sort by tier (legendary first)
  const tierWeight: Record<string, number> = { legendary: 0, rare: 1, uncommon: 2, common: 3 }
  const earnedBadges = (userBadgesResult.data ?? [])
    .map(ub => {
      const b = ub.badges as unknown as { emoji: string; name: string; description: string; tier: string } | null
      return b ? { emoji: b.emoji, name: b.name, description: b.description ?? '', tier: b.tier, earnedAt: ub.earned_at as string } : null
    })
    .filter((b): b is { emoji: string; name: string; description: string; tier: string; earnedAt: string } => b !== null)
    .sort((a, b) => (tierWeight[a.tier] ?? 9) - (tierWeight[b.tier] ?? 9))

  const badgeCount = earnedBadges.length
  const displayBadges = earnedBadges.slice(0, 5)

  const unreadCount = (unreadResult as { count: number | null }).count ?? 0
  const showCta = roundCount === 0

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>
      <style>{`.stat-link:hover{background:rgba(255,255,255,0.15)!important}`}</style>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/messages" style={{ color: '#fff', fontSize: 20, textDecoration: 'none', lineHeight: 1, position: 'relative' }}>
            💬
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -8,
                minWidth: 18, height: 18, borderRadius: 9,
                background: '#dc2626', border: '2px solid #1a5c38',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff',
                padding: '0 4px',
              }}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>
          <Link href="/profile" style={{ textDecoration: 'none', display: 'flex' }}>
            <UserAvatar name={fullName} avatarUrl={avatarUrl} size={34} border="2px solid rgba(255,255,255,0.4)" />
          </Link>
        </div>
      </div>

      <div style={{ overflowY: 'auto' }}>

        {/* Passport card */}
        <div style={{ margin: '12px 14px' }}>
          <PassportCard
            fullName={fullName}
            initials={initials}
            homeClub={homeClub}
            clubFlag={clubFlag}
            homeCountry={homeCountry}
            handicap={profile?.handicap ?? null}
            roundCount={roundCount}
            countryCount={countryCount}
            badgeCount={badgeCount}
            badgeEmojis={displayBadges}
            totalBadges={earnedBadges.length}
          />
        </div>

        {/* Quick actions */}
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', padding: '0 18px', margin: '18px 0 10px' }}>
          Quick actions
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, padding: '0 14px' }}>
          {[
            { icon: '⛳', label: 'Log course',   bg: '#e8f5ee', href: '/log' },
            { icon: '🗺️', label: 'My map',      bg: '#f5e9c8', href: '/map' },
            { icon: '🌍', label: 'Courses',     bg: '#e8f0fe', href: '/courses' },
            { icon: '👥', label: 'Friends',     bg: '#fef3c7', href: '/friends' },
            { icon: '🏆', label: 'Leaderboard', bg: '#f0eafa', href: '/leaderboard' },
          ].map(({ icon, label, bg, href }) => (
            <Link key={label} href={href} style={{
              background: '#fff', borderRadius: 12, padding: '12px 6px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              border: '1px solid #e5e7eb', textDecoration: 'none',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 19 }}>
                {icon}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: '#6b7280', textAlign: 'center', lineHeight: 1.2 }}>
                {label}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA — only shown before first round */}
        {showCta && (
          <div style={{ margin: '20px 14px 32px' }}>
            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', padding: '20px 18px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>⛳</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
                Log your first course
              </div>
              <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16, lineHeight: 1.5 }}>
                Start your golf passport by logging the first course you've played.
              </div>
              <Link href="/log" style={{
                background: '#1a5c38', color: '#fff', borderRadius: 14,
                padding: '14px 32px', fontSize: 15, fontWeight: 700,
                display: 'block', textDecoration: 'none', boxSizing: 'border-box',
              }}>
                Log course →
              </Link>
            </div>
          </div>
        )}

        {/* Courses / Countries / Badges accordions */}
        {courseEntries.length > 0 && (
          <div style={{ padding: '0 14px', marginTop: 20 }}>
            <ProfileAccordions
              courses={courseEntries}
              countries={countryEntries}
              badges={earnedBadges}
            />
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <Link href="/badges" style={{ fontSize: 13, fontWeight: 600, color: '#1a5c38', textDecoration: 'none' }}>
                See all badges →
              </Link>
            </div>
          </div>
        )}

        <div style={{ height: 32 }} />

      </div>
    </div>
  )
}
