import Link from 'next/link'
import { COUNTRY_NAMES } from '@/lib/countries'

/**
 * HomeNavTiles — 2x2 grid of passport-stamp-style entry tiles shown on the
 * home page below the PassportCard hero. Each tile carries a small stamp/seal
 * indicator with personal context so the home feels alive rather than
 * generic-nav.
 *
 * Tiles:
 *   Atlas        → /map           red-dashed stamp "X / 149"
 *   Trophy room  → /badges        embossed gold-seal with badge count
 *   Standings    → /leaderboard   paper pill "View"
 *   Companions   → /friends       gold-faint pill "N pending" if pending > 0,
 *                                 else paper pill "N"
 *
 * The Atlas + Companions entries deliberately overlap with BottomNav (MAP +
 * FRIENDS) — the visual stamp indicators add stat-context that the abstract
 * BottomNav icons cannot. Trophy room (/badges) and Standings (/leaderboard)
 * are buried under YOU and FRIENDS tabs respectively, so this is their
 * primary surface.
 */

interface Props {
  countryCount: number
  badgeCount: number
  friendCount: number
  pendingCount: number
}

export default function HomeNavTiles({
  countryCount,
  badgeCount,
  friendCount,
  pendingCount,
}: Props) {
  const totalCountries = COUNTRY_NAMES.length

  return (
    <section style={{ padding: '14px 14px 0' }}>
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          color: 'var(--color-mgp-ink-3)',
          textTransform: 'uppercase',
          padding: '4px 2px 8px',
        }}
      >
        Where to next
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Tile
          href="/map"
          icon="⊕"
          iconColor="var(--color-mgp-cover)"
          title="Atlas"
          subtitle="Browse the map"
          stamp={{
            text: `${countryCount}/${totalCountries}`,
            variant: 'red-dashed',
            rotate: -8,
          }}
        />

        <Tile
          href="/badges"
          icon="♛"
          iconColor="var(--color-mgp-gold)"
          title="Trophy room"
          subtitle="Your badges"
          stamp={{
            text: String(badgeCount),
            variant: 'gold-seal',
            rotate: 6,
          }}
        />

        <Tile
          href="/leaderboard"
          icon="≡"
          iconColor="var(--color-mgp-cover)"
          title="Standings"
          subtitle="Friends &amp; clubs"
          stamp={{
            text: 'View',
            variant: 'paper-pill',
            rotate: -4,
          }}
        />

        <Tile
          href="/friends"
          icon="∞"
          iconColor="var(--color-mgp-cover)"
          title="Companions"
          subtitle={
            pendingCount > 0
              ? `${pendingCount} pending`
              : `${friendCount} ${friendCount === 1 ? 'friend' : 'friends'}`
          }
          stamp={
            pendingCount > 0
              ? { text: String(pendingCount), variant: 'gold-faint', rotate: 8 }
              : { text: String(friendCount), variant: 'paper-pill', rotate: 4 }
          }
        />
      </div>
    </section>
  )
}

// ── Tile ─────────────────────────────────────────────────────────────────────

type StampVariant = 'red-dashed' | 'gold-seal' | 'gold-faint' | 'paper-pill'

interface TileProps {
  href: string
  icon: string
  iconColor: string
  title: string
  subtitle: string
  stamp: {
    text: string
    variant: StampVariant
    rotate: number
  }
}

function Tile({ href, icon, iconColor, title, subtitle, stamp }: TileProps) {
  return (
    <Link
      href={href}
      style={{
        background: 'var(--color-mgp-paper)',
        border: '0.5px solid var(--color-mgp-border-strong)',
        padding: '12px 12px 10px',
        textDecoration: 'none',
        position: 'relative',
        display: 'block',
        minHeight: 84,
      }}
    >
      <StampIndicator {...stamp} />

      <div
        aria-hidden
        style={{
          fontSize: 22,
          color: iconColor,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          lineHeight: 1.1,
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 9,
          letterSpacing: 1.5,
          color: 'var(--color-mgp-ink-3)',
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        {subtitle}
      </div>
    </Link>
  )
}

// ── Stamp variants ───────────────────────────────────────────────────────────

function StampIndicator({
  text,
  variant,
  rotate,
}: {
  text: string
  variant: StampVariant
  rotate: number
}) {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    right: 8,
    transform: `rotate(${rotate}deg)`,
    fontFamily: 'var(--font-mgp-stamp)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: 700,
    pointerEvents: 'none',
  }

  switch (variant) {
    case 'red-dashed':
      return (
        <span
          style={{
            ...baseStyle,
            fontSize: 8,
            border: '1.5px dashed var(--color-mgp-stamp-red)',
            padding: '1px 5px',
            color: 'var(--color-mgp-stamp-red)',
          }}
        >
          {text}
        </span>
      )

    case 'gold-seal':
      return (
        <span
          style={{
            ...baseStyle,
            width: 22,
            height: 22,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 60%, var(--color-mgp-gold-dark) 100%)',
            border: '1.5px solid var(--color-mgp-gold-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: 'var(--color-mgp-cover-ink)',
          }}
        >
          {text}
        </span>
      )

    case 'gold-faint':
      return (
        <span
          style={{
            ...baseStyle,
            fontSize: 9,
            background: 'var(--color-mgp-gold-faint)',
            border: '0.5px solid var(--color-mgp-gold)',
            padding: '2px 6px',
            color: 'var(--color-mgp-gold-dark)',
          }}
        >
          {text}
        </span>
      )

    case 'paper-pill':
    default:
      return (
        <span
          style={{
            ...baseStyle,
            fontSize: 9,
            background: 'var(--color-mgp-cream-warm)',
            border: '0.5px solid var(--color-mgp-border-strong)',
            padding: '1px 6px',
            color: 'var(--color-mgp-ink-2)',
          }}
        >
          {text}
        </span>
      )
  }
}
