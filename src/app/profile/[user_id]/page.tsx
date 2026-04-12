import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import SendMessageButton from '@/components/SendMessageButton'
import { computeInitials } from '@/lib/initials'
import { getLevelTitle, TIER_STYLES } from '@/lib/levels'
import UserAvatar from '@/components/UserAvatar'
import PassportCard from '@/components/PassportCard'

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
      .select('course_id, courses(country, is_major)')
      .eq('user_id', targetId),

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

  // Club flag lookup
  let clubFlag: string | null = null
  if (profile.home_club) {
    const { data: clubRow } = await adminSupabase
      .from('courses')
      .select('flag')
      .eq('club', profile.home_club as string)
      .limit(1)
      .single()
    clubFlag = (clubRow?.flag as string) ?? null
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

        {/* Badges — all earned */}
        {earnedBadges.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px 8px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Badges ({earnedBadges.length})
            </div>
            <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {earnedBadges.map(b => {
                const ts = TIER_STYLES[b.tier] ?? TIER_STYLES.common
                const isGold = b.tier === 'rare' || b.tier === 'legendary'
                return (
                  <div key={b.name} style={{
                    background: isGold ? '#fffbeb' : '#f9fafb',
                    border: `1px solid ${ts.border}`,
                    borderRadius: 10, padding: '10px 12px',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{b.name}</div>
                      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{b.description}</div>
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                      color: ts.color, background: ts.bg,
                      border: `1px solid ${ts.border}`,
                      borderRadius: 5, padding: '2px 6px', flexShrink: 0,
                    }}>
                      {b.tier}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
