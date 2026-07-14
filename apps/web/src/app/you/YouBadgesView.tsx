import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import WaxSealBadge from '@/components/WaxSealBadge'
import { TIER_ORDER } from '@/lib/levels'

/**
 * YouBadgesView — the "Badges" subtab on /you.
 *
 * Renders the trophy room — every badge in the catalog, grouped by tier,
 * dimmed when unearned. Ported from /badges/page.tsx; the standalone
 * /badges route now redirects here so deep-links keep working.
 *
 * The eyebrow + Cormorant title + "x / y earned" pill that the old
 * /badges page used at the top of its content area are dropped because
 * /you's SubTabs row already labels the section.
 */

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

export default async function YouBadgesView() {
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
  if (!user) redirect('/welcome')

  const [allBadgesResult, userBadgesResult] = await Promise.all([
    supabase.from('badges').select('id, emoji, name, description, tier').order('name'),
    supabase.from('user_badges').select('badge_id, earned_at').eq('user_id', user.id),
  ])

  const allBadges = (allBadgesResult.data ?? []) as BadgeDef[]
  const earnedMap = new Map(
    (userBadgesResult.data ?? []).map(ub => [ub.badge_id as string, ub.earned_at as string])
  )

  const totalCount = allBadges.length
  const earnedCount = earnedMap.size

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 64px' }}>

      {/* "x / y earned" counter pill — top-right of content area. The page
          title + eyebrow are owned by the SubTabs row above, so we keep
          only the earned-count which is genuinely subtab-specific. */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 18 }}>
        <div
          style={{
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
          }}
        >
          {earnedCount} / {totalCount} earned
        </div>
      </div>

      {TIER_ORDER.map(tier => {
        const tierBadges = allBadges.filter(b => b.tier === tier)
        if (tierBadges.length === 0) return null
        const tierEarned = tierBadges.filter(b => earnedMap.has(b.id)).length

        return (
          <section key={tier} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 14,
                paddingBottom: 6,
                borderBottom: '0.5px solid var(--color-mgp-border)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                }}
              >
                {TIER_LABELS[tier] ?? tier}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: 1.2,
                  color: 'var(--color-mgp-ink-3)',
                }}
              >
                {tierEarned} / {tierBadges.length}
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 14,
              }}
            >
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

                    {!earned && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: 1.2,
                          textTransform: 'uppercase',
                          color: 'var(--color-mgp-ink-3)',
                          background: 'var(--color-mgp-cream-warm)',
                          border: '1px solid var(--color-mgp-border)',
                          borderRadius: 4,
                          padding: '2px 6px',
                        }}
                      >
                        Locked
                      </div>
                    )}

                    <div
                      style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        letterSpacing: -0.2,
                        lineHeight: 1.2,
                        marginTop: 4,
                      }}
                    >
                      {b.name}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'var(--color-mgp-ink-3)',
                        lineHeight: 1.4,
                      }}
                    >
                      {b.description}
                    </div>

                    <div
                      style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontWeight: 600,
                        fontSize: 11,
                        letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        marginTop: 4,
                        color: earned ? 'var(--color-mgp-success)' : 'transparent',
                      }}
                    >
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
  )
}
