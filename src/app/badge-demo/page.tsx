import Link from 'next/link'
import WaxSealBadge from '@/components/WaxSealBadge'

interface BadgeDemo {
  name: string
  emoji: string
  description: string
  tier: 'common' | 'uncommon' | 'rare' | 'legendary'
}

// Hard-coded list of all 30 badges from the DB so we can preview without auth.
// Sorted by tier ascending so the page reads as a progression.
const BADGES: BadgeDemo[] = [
  // common (4)
  { name: 'First Tee', emoji: '⛳', description: 'Log your first course', tier: 'common' },
  { name: 'Border Crosser', emoji: '✈️', description: 'Play in 2 different countries', tier: 'common' },
  { name: 'Major Hunter', emoji: '🎖️', description: 'Play one Major course', tier: 'common' },
  { name: 'Top 100', emoji: '👑', description: 'Play one Top 100 course', tier: 'common' },

  // uncommon (12)
  { name: 'Getting Started', emoji: '🌱', description: 'Log 10 courses', tier: 'uncommon' },
  { name: 'On a Roll', emoji: '🔥', description: 'Log 3 courses within 30 days', tier: 'uncommon' },
  { name: 'European Explorer', emoji: '🗺️', description: 'Play in 5 European countries', tier: 'uncommon' },
  { name: 'The Continental Breakfast', emoji: '☕', description: 'Play on 2 continents', tier: 'uncommon' },
  { name: 'Danish Devotee', emoji: '🇩🇰', description: 'Play 5 courses in Denmark', tier: 'uncommon' },
  { name: 'Dutch Master', emoji: '🇳🇱', description: 'Play 5 courses in the Netherlands', tier: 'uncommon' },
  { name: 'English Rose', emoji: '🏴', description: 'Play 5 courses in England', tier: 'uncommon' },
  { name: 'Finnish Line', emoji: '🇫🇮', description: 'Play 5 courses in Finland', tier: 'uncommon' },
  { name: 'French Connection', emoji: '🇫🇷', description: 'Play 5 courses in France', tier: 'uncommon' },
  { name: 'German Precision', emoji: '🇩🇪', description: 'Play 5 courses in Germany', tier: 'uncommon' },
  { name: 'Irish Wanderer', emoji: '🇮🇪', description: 'Play 5 courses in Ireland', tier: 'uncommon' },
  { name: 'Norwegian Wood', emoji: '🇳🇴', description: 'Play 5 courses in Norway', tier: 'uncommon' },
  { name: 'Scotland Pilgrim', emoji: '🏴', description: 'Play 5 courses in Scotland', tier: 'uncommon' },
  { name: 'Swedish Viking', emoji: '🇸🇪', description: 'Play 5 courses in Sweden', tier: 'uncommon' },
  { name: 'Welsh Dragon', emoji: '🏴', description: 'Play 5 courses in Wales', tier: 'uncommon' },

  // rare (5)
  { name: 'Club Regular', emoji: '🏅', description: 'Log 25 courses', tier: 'rare' },
  { name: 'Year Rounder', emoji: '📅', description: 'At least one course in each quarter of a calendar year', tier: 'rare' },
  { name: 'Globetrotter', emoji: '🌍', description: 'Play in 10 countries', tier: 'rare' },
  { name: 'Major Collector', emoji: '🎯', description: 'Play 5 Major courses', tier: 'rare' },
  { name: 'Top 100 Hunter', emoji: '💫', description: 'Play 5 Top 100 courses', tier: 'rare' },

  // legendary (6)
  { name: 'Seasoned Golfer', emoji: '⭐', description: 'Log 50 courses', tier: 'legendary' },
  { name: 'Century Club', emoji: '🏆', description: 'Log 100 courses', tier: 'legendary' },
  { name: 'Golf Legend', emoji: '💎', description: 'Log 250 courses', tier: 'legendary' },
  { name: 'World Traveler', emoji: '🌐', description: 'Play in 15 countries', tier: 'legendary' },
  { name: 'The Grand Slam', emoji: '🗺️', description: 'Play in Scotland, Ireland, England and USA', tier: 'legendary' },
  { name: 'Major Master', emoji: '👑', description: 'Play 10 Major courses', tier: 'legendary' },
]

const TIER_LABELS: Record<string, string> = {
  common: 'Common · matte black wax',
  uncommon: 'Uncommon · midnight blue wax',
  rare: 'Rare · crimson wax',
  legendary: 'Legendary · gold foil',
}

const TIER_ORDER: Array<keyof typeof TIER_LABELS> = ['common', 'uncommon', 'rare', 'legendary']

export default function BadgeDemoPage() {
  const grouped = TIER_ORDER.map(tier => ({
    tier,
    badges: BADGES.filter(b => b.tier === tier),
  }))

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar */}
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
        <Link href="/" style={{
          color: 'var(--color-mgp-gold)',
          fontSize: 13, fontWeight: 500, textDecoration: 'none',
        }}>
          ← Home
        </Link>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 64px' }}>

        {/* Title block */}
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}>
          Design preview
        </div>
        <div style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 24,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 4,
          letterSpacing: -0.3,
        }}>
          Wax-seal badges
        </div>
        <div style={{
          fontSize: 13,
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 24,
        }}>
          All 30 badges, four tier visualisations, custom SVG symbol per badge
        </div>

        {/* Tier sections */}
        {grouped.map(({ tier, badges }) => (
          <section key={tier} style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 14,
              paddingBottom: 6,
              borderBottom: '0.5px solid var(--color-mgp-border)',
            }}>
              {TIER_LABELS[tier]} · {badges.length}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 16,
            }}>
              {badges.map(b => (
                <div key={b.name} style={{
                  background: 'var(--color-mgp-paper)',
                  border: '1px solid var(--color-mgp-border)',
                  borderRadius: 14,
                  padding: '20px 12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                  textAlign: 'center',
                }}>
                  <WaxSealBadge
                    name={b.name}
                    tier={b.tier}
                    emoji={b.emoji}
                    size={88}
                    rotation={(b.name.charCodeAt(0) % 7) - 3}
                  />
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
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Compact size preview — for PassportCard hero use */}
        <section style={{ marginTop: 40 }}>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 14,
            paddingBottom: 6,
            borderBottom: '0.5px solid var(--color-mgp-border)',
          }}>
            Compact size (32px) for PassportCard hero
          </div>
          <div style={{
            background: 'var(--color-mgp-cover)',
            borderRadius: 14,
            padding: '16px 20px',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}>
            <WaxSealBadge name="First Tee" tier="common" size={32} />
            <WaxSealBadge name="Danish Devotee" tier="uncommon" size={32} />
            <WaxSealBadge name="Globetrotter" tier="rare" size={32} />
            <WaxSealBadge name="Century Club" tier="legendary" size={32} />
            <WaxSealBadge name="The Grand Slam" tier="legendary" size={32} />
            <span style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 1.5,
              color: 'var(--color-mgp-gold)',
              marginLeft: 6,
            }}>
              +12
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
