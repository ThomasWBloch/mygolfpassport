import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import SendMessageButton from '@/components/SendMessageButton'
import { computeInitials } from '@/lib/initials'
import { getLevelTitle, TIER_STYLES } from '@/lib/levels'
import PublicBadgeList from '@/components/PublicBadgeList'

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
      .select('full_name, handicap, home_club, show_course_count, total_xp, level')
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

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {computeInitials(fullName, undefined)}
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{fullName}</div>
              {profile.handicap != null && (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                  HCP <span style={{ color: '#c9a84c', fontWeight: 700 }}>{profile.handicap}</span>
                </div>
              )}
              {profile.home_club && (
                <div style={{ marginTop: 4 }}>
                  <Link
                    href={`/clubs/${encodeURIComponent(profile.home_club)}`}
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}
                  >
                    🏠 {profile.home_club}
                  </Link>
                </div>
              )}
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 4 }}>
                Lvl {level} · {levelTitle} · {totalXP} XP
              </div>
            </div>
          </div>
        </div>

        {/* Message button */}
        {user && user.id !== targetId && (
          <SendMessageButton targetUserId={targetId} />
        )}

        {/* Stats */}
        {profile.show_course_count && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', gap: 0 }}>
            <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1a5c38' }}>{roundCount}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Courses</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1a5c38' }}>{countryCount}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Countries</div>
            </div>
          </div>
        )}

        {/* Badges — shows Rare/Legendary by default, toggle for all */}
        {earnedBadges.length > 0 && (
          <PublicBadgeList badges={earnedBadges} />
        )}
      </div>
    </div>
  )
}
