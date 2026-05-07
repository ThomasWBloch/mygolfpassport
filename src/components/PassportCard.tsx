import type { ReactNode } from 'react'
import Link from 'next/link'
import { COUNTRY_FLAGS } from '@/lib/countries'
import { buildClubHref } from '@/lib/links'
import WaxSealBadge from '@/components/WaxSealBadge'

/**
 * PassportCard — the user's passport ID-page hero.
 *
 * Adventure design system. The shell evokes the inside cover / photo page
 * of a real passport: cream paper, perforated tear-edges top and bottom,
 * embossed-gold initials disc, Cormorant display name, and stamp-
 * typography meta lines. Below sits the stats grid (numbers in display
 * type) and a row of wax-seal badges that link to the full trophy room.
 *
 * Layout (mobile, ~398px wide):
 *   ┌─────────────────────────────────────┐
 *   │ ┊                                ┊ │  perforated edge
 *   │  ╔══╗  PASSPORT HOLDER          🇩🇰 │  flag watermark
 *   │  ║TB║  Thomas Bloch                 │  Cormorant display
 *   │  ╚══╝  Helsingør Golf Klub ›        │
 *   │        DENMARK · HCP 12             │  stamp typography
 *   │  ┌────┐ ┌────┐ ┌────┐               │
 *   │  │ 47 │ │  8 │ │ 23 │               │  Cormorant numerals
 *   │  │CRS │ │CTRY│ │BDG │               │  Special Elite labels
 *   │  └────┘ └────┘ └────┘               │
 *   │  🔴 🔵 🟡 +5                        │  wax-seal strip
 *   │ ┊                                ┊ │  perforated edge
 *   └─────────────────────────────────────┘
 */

interface BadgeEmoji {
  emoji: string
  name: string
  /** Tier drives the wax colour on the mini-seal */
  tier: string
}

export interface PassportCardProps {
  fullName: string
  email?: string
  initials: string
  homeClub: string | null
  clubFlag: string | null
  homeCountry: string | null
  handicap: number | null
  roundCount: number
  countryCount: number
  badgeCount: number
  /** Up to 5 badges shown as mini wax-seals in the footer row */
  badgeEmojis?: BadgeEmoji[]
  /** Total earned badges (for +N indicator) */
  totalBadges?: number
  /**
   * Make the badge strip a Link to this href (e.g. "/badges" on own profile).
   * Leave undefined on other users' profiles so it stays static.
   */
  badgesHref?: string
  /** Optional slot shown in the top-right corner (e.g. friend action pill) */
  topRightAction?: ReactNode
}

export default function PassportCard(props: PassportCardProps) {
  const {
    fullName, email, initials, homeClub, clubFlag, homeCountry, handicap,
    roundCount, countryCount, badgeCount,
    badgeEmojis, totalBadges, badgesHref, topRightAction,
  } = props

  const countryFlag = homeCountry ? (COUNTRY_FLAGS[homeCountry] ?? '') : ''
  const clubHref = buildClubHref(homeCountry, homeClub)

  // Stamp meta line — country and handicap on a single typeset row
  const metaParts: ReactNode[] = []
  if (homeCountry) {
    metaParts.push(
      <span key="country">
        {countryFlag ? `${countryFlag} ` : ''}{homeCountry}
      </span>
    )
  }
  if (handicap != null) {
    metaParts.push(
      <span key="hcp">
        HCP{' '}
        <span style={{ color: 'var(--color-mgp-stamp-red)', fontWeight: 700 }}>
          {handicap}
        </span>
      </span>
    )
  }

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--color-mgp-cream-warm)',
        border: '1.5px solid var(--color-mgp-border-strong)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(31,58,46,0.08)',
      }}
    >
      {/* Perforated tear-edge — top */}
      <PerforatedEdge position="top" />

      {/* Country flag watermark — sits low-right behind stats so it doesn't
          conflict with topRightAction. Subtle by design. */}
      {countryFlag && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 14,
            bottom: 60,
            fontSize: 60,
            lineHeight: 1,
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {countryFlag}
        </div>
      )}

      {/* Top-right slot (e.g. friend action pill) */}
      {topRightAction && (
        <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 2 }}>
          {topRightAction}
        </div>
      )}

      <div style={{ position: 'relative', padding: '24px 18px 20px', zIndex: 1 }}>
        {/* Identity row: gold initials disc + name block */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
          {/* Embossed-gold initials disc */}
          <div
            aria-hidden
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 35% 30%, var(--color-mgp-gold-light) 0%, var(--color-mgp-gold) 55%, var(--color-mgp-gold-dark) 100%)',
              border: '2px solid var(--color-mgp-gold-dark)',
              boxShadow: '0 1px 2px rgba(31,58,46,0.18), inset 0 -1px 2px rgba(31,58,46,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mgp-display)',
              fontWeight: 500,
              fontSize: 22,
              color: 'var(--color-mgp-cover-ink)',
              letterSpacing: 0.5,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>

          {/* Name + meta block */}
          <div style={{ minWidth: 0, flex: 1 }}>
            {/* Eyebrow */}
            <div
              style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 9,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
                marginBottom: 4,
              }}
            >
              Passport Holder
            </div>

            {/* Name */}
            <div
              style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 24,
                fontWeight: 500,
                color: 'var(--color-mgp-ink)',
                lineHeight: 1.15,
                letterSpacing: -0.3,
                wordBreak: 'break-word',
              }}
            >
              {fullName || email || 'Golfer'}
            </div>

            {/* Home club row */}
            {homeClub && (
              <div style={{ marginTop: 6 }}>
                {clubHref ? (
                  <Link
                    href={clubHref}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: 'var(--color-mgp-ink-2)',
                      textDecoration: 'none',
                    }}
                  >
                    {homeClub} {clubFlag ?? ''} ›
                  </Link>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-mgp-ink-2)' }}>
                    {homeClub} {clubFlag ?? ''}
                  </span>
                )}
              </div>
            )}

            {/* Stamp meta: country · HCP */}
            {metaParts.length > 0 && (
              <div
                style={{
                  marginTop: 8,
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10,
                  letterSpacing: 1.5,
                  color: 'var(--color-mgp-ink-3)',
                  textTransform: 'uppercase',
                }}
              >
                {metaParts.map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < metaParts.length - 1 && (
                      <span style={{ margin: '0 6px', color: 'var(--color-mgp-border-strong)' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {[
            { value: roundCount,   label: 'Courses' },
            { value: countryCount, label: 'Countries' },
            { value: badgeCount,   label: 'Badges' },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                background: 'var(--color-mgp-paper)',
                border: '1px solid var(--color-mgp-border-faint)',
                borderRadius: 6,
                padding: '10px 6px 8px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 26,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  lineHeight: 1,
                  letterSpacing: -0.5,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 9,
                  letterSpacing: 2,
                  color: 'var(--color-mgp-ink-3)',
                  marginTop: 5,
                  textTransform: 'uppercase',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Badge wax-seals footer — clickable on own profile, static on others */}
        {badgeEmojis && badgeEmojis.length > 0 && (() => {
          const stripContent = (
            <>
              {badgeEmojis.map((b, i) => (
                <span key={i} title={b.name} style={{ display: 'inline-flex' }}>
                  <WaxSealBadge name={b.name} tier={b.tier} emoji={b.emoji} size={28} />
                </span>
              ))}
              {(totalBadges ?? 0) > badgeEmojis.length && (
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 11,
                    letterSpacing: 1.2,
                    color: 'var(--color-mgp-ink-2)',
                    marginLeft: 4,
                    fontWeight: 700,
                  }}
                >
                  +{(totalBadges ?? 0) - badgeEmojis.length}
                </span>
              )}
            </>
          )
          const stripStyle: React.CSSProperties = {
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
          }
          return badgesHref ? (
            <Link href={badgesHref} style={stripStyle}>{stripContent}</Link>
          ) : (
            <div style={stripStyle}>{stripContent}</div>
          )
        })()}
      </div>

      {/* Perforated tear-edge — bottom */}
      <PerforatedEdge position="bottom" />
    </section>
  )
}

// ── Decorative edges ────────────────────────────────────────────────────────

/**
 * Perforated edge — a row of small circular punches that evoke a passport
 * page or ticket stub. Pure CSS, no SVG asset. Cream dots punch through
 * the warm-cream card surface.
 */
function PerforatedEdge({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: -4,
        height: 8,
        backgroundImage:
          'radial-gradient(circle, var(--color-mgp-cream) 3px, transparent 3.5px)',
        backgroundSize: '14px 8px',
        backgroundPosition: '7px 50%',
        backgroundRepeat: 'repeat-x',
        zIndex: 1,
      }}
    />
  )
}
