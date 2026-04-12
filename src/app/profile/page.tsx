import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileClient from '@/components/ProfileClient'
import type { Badge } from '@/components/ProfileClient'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import { getLevelTitle, TIER_ORDER, TIER_STYLES } from '@/lib/levels'

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
      .select('full_name, handicap, home_club, home_country, avatar_url, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count, total_xp, level')
      .eq('id', user!.id)
      .single(),

    supabase
      .from('rounds')
      .select('course_id, courses(country, is_major)')
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

  const totalXP = (profile?.total_xp as number) ?? 0
  const level = (profile?.level as number) ?? 1
  const levelTitle = getLevelTitle(level)

  const fullName =
    profile?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    'Golfer'

  const initials = computeInitials(fullName, user?.email)

  // Look up club's country flag from courses table
  let clubFlag: string | null = null
  const homeClub = profile?.home_club as string | null
  if (homeClub) {
    const { data: clubRow } = await supabase
      .from('courses')
      .select('flag')
      .eq('club', homeClub)
      .limit(1)
      .single()
    clubFlag = (clubRow?.flag as string) ?? null
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
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>
          👤 My profile
        </div>

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
          totalXP={totalXP}
          level={level}
          levelTitle={levelTitle}
        />

        {/* ── Badges section (grouped by tier) ──────────────────────────────── */}
        {earnedBadges.length >= 0 && (
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Badges ({earnedBadges.length})
              </div>
              <Link href="/badges" style={{ fontSize: 12, fontWeight: 600, color: '#1a5c38', textDecoration: 'none' }}>
                See all badges →
              </Link>
            </div>

            {TIER_ORDER.map(tier => {
              const tierBadges = earnedBadges.filter(b => b.tier === tier)
              if (tierBadges.length === 0) return null
              const ts = TIER_STYLES[tier] ?? TIER_STYLES.common
              const isGold = tier === 'rare' || tier === 'legendary'

              return (
                <div key={tier} style={{ marginBottom: 12 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                    letterSpacing: '0.5px', color: ts.color, marginBottom: 8,
                  }}>
                    {tier}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {tierBadges.map(b => (
                      <div key={b.name} style={{
                        background: isGold ? '#fffbeb' : '#fff',
                        border: `1px solid ${ts.border}`,
                        borderRadius: 12, padding: '12px 14px',
                        display: 'flex', alignItems: 'center', gap: 12,
                      }}>
                        <span style={{ fontSize: 28, flexShrink: 0 }}>{b.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{b.name}</div>
                          <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{b.description}</div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{
                            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                            color: ts.color, background: ts.bg,
                            border: `1px solid ${ts.border}`,
                            borderRadius: 6, padding: '2px 6px', display: 'inline-block',
                          }}>
                            {tier}
                          </div>
                          <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                            {new Date(b.earnedAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
