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
 * embossed-gold initials disc, Cormorant display name, and a stamp-
 * typography meta line. Below sits a 2x2 stats grid where each cell is
 * tap-targetable when a matching href is provided.
 *
 * The redundant "Passport Holder" eyebrow and the country flag previously
 * shown after the club name were removed in the May 2026 home-redesign —
 * country/HCP already live on the meta line and the card itself is
 * unmistakably an ID page.
 *
 * Layout (mobile, ~398px wide):
 *   ┌─────────────────────────────────────┐
 *   │ ┊                                ┊ │  perforated edge
 *   │  ╔══╗  Thomas Bloch              🇩🇰 │  flag watermark (subtle)
 *   │  ║TB║  Helsingør Golf Klub ›        │
 *   │  ╚══╝  DENMARK · HCP 12             │  stamp typography
 *   │  ┌──────────┐ ┌──────────┐          │
 *   │  │⚑   47   │ │🌐    8   │          │  2x2 stats grid,
 *   │  │ COURSES │ │COUNTRIES │          │  each cell clickable
 *   │  └──────────┘ └──────────┘          │
 *   │  ┌──────────┐ ┌──────────┐          │
 *   │  │★   23   │ │👥   12   │          │
 *   │  │ BADGES  │ │ FRIENDS  │          │
 *   │  └──────────┘ └──────────┘          │
 *   │ ┊                                ┊ │  perforated edge
 *   └─────────────────────────────────────┘
 *
 * The wax-seal badge strip (rendered only when badgeEmojis is provided) is
 * still supported as a legacy footer for the /profile/[user_id] page where
 * showing another user's badges inline makes sense. The home page omits it.
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
  /** Legacy — accepted but no longer rendered after the club name (country
   *  is already shown on the meta line below, so the flag was redundant). */
  clubFlag?: string | null
  homeCountry: string | null
  handicap: number | null
  roundCount: number
  countryCount: number
  badgeCount: number
  /** Number of accepted friendships — drives the Friends stat box (default 0) */
  friendCount?: number
  /** Optional href per stat box — when set, the box becomes a clickable Link */
  coursesHref?: string
  countriesHref?: string
  badgesHref?: string
  friendsHref?: string
  /** Up to 5 badges shown as mini wax-seals in the footer row.
   *  Legacy — only passed by /profile/[user_id] to display another user's
   *  badges inline. The home page intentionally omits this so the card stays
   *  clean (badges-stat-box links to /badges instead). */
  badgeEmojis?: BadgeEmoji[]
  /** Total earned badges (for +N indicator on the wax-seal strip) */
  totalBadges?: number
  /** Optional slot shown in the top-right corner (e.g. friend action pill) */
  topRightAction?: ReactNode
}

export default function PassportCard(props: PassportCardProps) {
  const {
    fullName, email, initials, homeClub, homeCountry, handicap,
    roundCount, countryCount, badgeCount, friendCount = 0,
    coursesHref, countriesHref, badgesHref, friendsHref,
    badgeEmojis, totalBadges, topRightAction,
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
            {/* Name */}
            <div
              style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 26,
                fontWeight: 500,
                color: 'var(--color-mgp-ink)',
                lineHeight: 1.15,
                letterSpacing: -0.3,
                wordBreak: 'break-word',
              }}
            >
              {fullName || email || 'Golfer'}
            </div>

            {/* Home club row — country flag intentionally NOT shown after the
                club name; the country is already on the meta line below. */}
            {homeClub && (
              <div style={{ marginTop: 6 }}>
                {clubHref ? (
                  <Link
                    href={clubHref}
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--color-mgp-ink-2)',
                      textDecoration: 'none',
                    }}
                  >
                    {homeClub} ›
                  </Link>
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-mgp-ink-2)' }}>
                    {homeClub}
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
                  fontSize: 11,
                  letterSpacing: 1.8,
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

        {/* 2x2 stats grid — each box is clickable if a matching href is set.
            Icons are small stroke-based SVGs in top-left so they don't
            compete with the Cormorant numeral. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          <StatBox value={roundCount}   label="Courses"   href={coursesHref}   icon={<CoursesIcon />} />
          <StatBox value={countryCount} label="Countries" href={countriesHref} icon={<CountriesIcon />} />
          <StatBox value={badgeCount}   label="Badges"    href={badgesHref}    icon={<BadgesIcon />} />
          <StatBox value={friendCount}  label="Friends"   href={friendsHref}   icon={<FriendsIcon />} />
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

// ── Stat box ────────────────────────────────────────────────────────────────

/**
 * StatBox — single cell in the 2x2 stats grid. Wraps in a Link when href is
 * provided so the box becomes a tap-target; otherwise renders as a static
 * div. Icon sits top-left in muted ink so the Cormorant numeral stays the
 * focal point.
 */
function StatBox({
  value,
  label,
  href,
  icon,
}: {
  value: number
  label: string
  href?: string
  icon: ReactNode
}) {
  const content = (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 8,
          left: 10,
          color: 'var(--color-mgp-ink-3)',
          lineHeight: 0,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 28,
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
          fontSize: 11,
          letterSpacing: 2,
          color: 'var(--color-mgp-ink-3)',
          marginTop: 6,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </>
  )

  const baseStyle: React.CSSProperties = {
    background: 'var(--color-mgp-paper)',
    border: '1px solid var(--color-mgp-border-faint)',
    borderRadius: 6,
    padding: '16px 6px 10px',
    textAlign: 'center',
    position: 'relative',
    display: 'block',
    textDecoration: 'none',
    cursor: href ? 'pointer' : 'default',
  }

  return href ? (
    <Link href={href} style={baseStyle}>{content}</Link>
  ) : (
    <div style={baseStyle}>{content}</div>
  )
}

// ── Stat icons (inline SVG, ~14x14, stroke-based, inherit currentColor) ─────

function CoursesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <line x1="3" y1="1" x2="3" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M3 2 L11 4 L3 6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function CountriesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="7" cy="7" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function BadgesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 3.8 L7.85 5.95 L10.2 6.05 L8.35 7.5 L9.05 9.75 L7 8.45 L4.95 9.75 L5.65 7.5 L3.8 6.05 L6.15 5.95 Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FriendsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 12 C1.5 9.8 3 9 5 9 C7 9 8.5 9.8 8.5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6.5 12 C6.5 10.2 8 9.5 10 9.5 C12 9.5 13 10.2 13 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
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
