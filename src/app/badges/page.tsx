import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import { TIER_ORDER, TIER_STYLES } from '@/lib/levels'

interface BadgeDef {
  id: string
  emoji: string
  name: string
  description: string
  tier: string
}

export default async function BadgesPage() {
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

  const [profileResult, allBadgesResult, userBadgesResult] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
    supabase.from('badges').select('id, emoji, name, description, tier').order('name'),
    supabase.from('user_badges').select('badge_id, earned_at').eq('user_id', user.id),
  ])

  const initials = computeInitials(
    profileResult.data?.full_name ?? user.user_metadata?.full_name,
    user.email
  )

  const allBadges = (allBadgesResult.data ?? []) as BadgeDef[]
  const earnedMap = new Map(
    (userBadgesResult.data ?? []).map(ub => [ub.badge_id as string, ub.earned_at as string])
  )

  const totalCount = allBadges.length
  const earnedCount = earnedMap.size

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
          <Link href="/profile" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Profile
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>🏅 Badges</div>
          <div style={{
            fontSize: 13, fontWeight: 700, color: '#1a5c38',
            background: '#e8f5ee', borderRadius: 10, padding: '5px 12px',
          }}>
            {earnedCount} / {totalCount} earned
          </div>
        </div>

        {/* Grouped by tier */}
        {TIER_ORDER.map(tier => {
          const tierBadges = allBadges.filter(b => b.tier === tier)
          if (tierBadges.length === 0) return null
          const ts = TIER_STYLES[tier] ?? TIER_STYLES.common
          const tierEarned = tierBadges.filter(b => earnedMap.has(b.id)).length
          const isGoldTier = tier === 'rare' || tier === 'legendary'

          return (
            <div key={tier} style={{ marginBottom: 20 }}>
              {/* Tier header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.5px', color: ts.color,
                }}>
                  {tier}
                </div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>
                  {tierEarned} / {tierBadges.length} earned
                </div>
              </div>

              {/* Badge cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {tierBadges.map(b => {
                  const earned = earnedMap.has(b.id)
                  const earnedAt = earnedMap.get(b.id)

                  return (
                    <div key={b.id} style={{
                      background: earned
                        ? (isGoldTier ? '#fffbeb' : '#fff')
                        : '#f9fafb',
                      border: `1px solid ${earned ? ts.border : '#e5e7eb'}`,
                      borderRadius: 12, padding: '14px 16px',
                      display: 'flex', alignItems: 'center', gap: 14,
                      opacity: earned ? 1 : 0.7,
                    }}>
                      {/* Emoji */}
                      <div style={{
                        fontSize: 40, lineHeight: 1, flexShrink: 0,
                        filter: earned ? 'none' : 'grayscale(1)',
                      }}>
                        {earned ? b.emoji : '🔒'}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 14, fontWeight: 700,
                          color: earned ? '#1a1a1a' : '#9ca3af',
                        }}>
                          {b.name}
                        </div>
                        <div style={{
                          fontSize: 12, color: earned ? '#6b7280' : '#9ca3af',
                          marginTop: 2, lineHeight: 1.4,
                        }}>
                          {b.description}
                        </div>
                      </div>

                      {/* Right side */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        {/* Tier pill */}
                        <div style={{
                          fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                          color: ts.color, background: ts.bg,
                          border: `1px solid ${ts.border}`,
                          borderRadius: 6, padding: '2px 6px', display: 'inline-block',
                        }}>
                          {tier}
                        </div>

                        {earned ? (
                          <>
                            <div style={{ fontSize: 11, fontWeight: 700, color: '#1a5c38', marginTop: 6 }}>
                              Earned ✓
                            </div>
                            {earnedAt && (
                              <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                                {new Date(earnedAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            )}
                          </>
                        ) : (
                          <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 6 }}>
                            Locked
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
