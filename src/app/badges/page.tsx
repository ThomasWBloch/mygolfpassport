import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import BackButton from '@/components/BackButton'
import WaxSealBadge from '@/components/WaxSealBadge'
import { computeInitials } from '@/lib/initials'
import { TIER_ORDER } from '@/lib/levels'

interface BadgeDef {
  id: string
  emoji: string
  name: string
  description: string
  tier: string
}

const TIER_LABELS: Record<string, string> = {
  common: 'Common · matte black wax',
  uncommon: 'Uncommon · midnight blue wax',
  rare: 'Rare · crimson wax',
  legendary: 'Legendary · gold foil',
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar — Adventure chrome */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 14,
          }}>M</span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BackButton fallback="/profile" label="← Profile" />
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 64px' }}>

        {/* Eyebrow + title + earned counter */}
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}>
          Trophy room
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 24,
            fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.3,
          }}>
            Badges
          </div>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-gold-dark)',
            background: 'var(--color-mgp-gold-faint)',
            border: '1px solid var(--color-mgp-gold)',
            borderRadius: 6,
            padding: '5px 10px',
            fontWeight: 700,
          }}>
            {earnedCount} / {totalCount} earned
          </div>
        </div>

        {/* Tier sections */}
        {TIER_ORDER.map(tier => {
          const tierBadges = allBadges.filter(b => b.tier === tier)
          if (tierBadges.length === 0) return null
          const tierEarned = tierBadges.filter(b => earnedMap.has(b.id)).length

          return (
            <section key={tier} style={{ marginBottom: 32 }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 14,
                paddingBottom: 6,
                borderBottom: '0.5px solid var(--color-mgp-border)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                }}>
                  {TIER_LABELS[tier] ?? tier}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10,
                  letterSpacing: 1.2,
                  color: 'var(--color-mgp-ink-3)',
                }}>
                  {tierEarned} / {tierBadges.length}
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 14,
              }}>
                {tierBadges.map(b => {
                  const earned = earnedMap.has(b.id)
                  const earnedAt = earnedMap.get(b.id)
                  return (
                    <div
                      key={b.id}
                      style={{
                        background: 'var(--color-mgp-paper)',
                        border: '1px solid var(--color-mgp-border)',
                        borderRadius: 14,
                        padding: '20px 12px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        textAlign: 'center',
                        opacity: earned ? 1 : 0.45,
                        position: 'relative',
                      }}
                    >
                      <WaxSealBadge
                        name={b.name}
                        tier={tier}
                        emoji={b.emoji}
                        size={84}
                        rotation={(b.name.charCodeAt(0) % 7) - 3}
                      />

                      {/* Lock-mark for unearned badges (small stamp-style "LOCKED" tag) */}
                      {!earned && (
                        <div style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 9,
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                          color: 'var(--color-mgp-ink-3)',
                          background: 'var(--color-mgp-cream-warm)',
                          border: '1px solid var(--color-mgp-border)',
                          borderRadius: 4,
                          padding: '2px 6px',
                        }}>
                          Locked
                        </div>
                      )}

                      <div style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        letterSpacing: -0.2,
                        lineHeight: 1.2,
                        marginTop: 4,
                      }}>
                        {b.name}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: 'var(--color-mgp-ink-3)',
                        lineHeight: 1.4,
                      }}>
                        {b.description}
                      </div>

                      {/* Earned date or empty placeholder for layout consistency */}
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 9,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        marginTop: 4,
                        color: earned ? 'var(--color-mgp-success)' : 'transparent',
                      }}>
                        {earned && earnedAt
                          ? `Earned ${new Date(earnedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}`
                          : '—'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
