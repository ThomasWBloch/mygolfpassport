import type { ReactNode } from 'react'
import Link from 'next/link'
import { COUNTRY_FLAGS } from '@/lib/countries'
import { buildClubHref } from '@/lib/links'
import WaxSealBadge from '@/components/WaxSealBadge'

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

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
      borderRadius: 14, padding: 18, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', right: -30, top: -30,
        width: 140, height: 140, borderRadius: '50%',
        background: 'rgba(255,255,255,0.04)',
      }} />

      {topRightAction && (
        <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 1 }}>
          {topRightAction}
        </div>
      )}

      {/* User row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: '#c9a84c',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 17, color: '#fff',
          border: '2px solid rgba(255,255,255,0.3)', flexShrink: 0,
        }}>
          {initials}
        </div>
        <div>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>
            {fullName || email || 'Golfer'}
          </div>
          {homeClub && (
            clubHref ? (
              <Link
                href={clubHref}
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2, textDecoration: 'none', display: 'block' }}
              >
                🏠 {homeClub} {clubFlag ?? ''}
              </Link>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>
                🏠 {homeClub} {clubFlag ?? ''}
              </div>
            )
          )}
          {homeCountry && (
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 2 }}>
              📍 {homeCountry} {countryFlag}
            </div>
          )}
          {handicap != null && (
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginTop: 2 }}>
              HCP <span style={{ color: '#c9a84c', fontWeight: 600 }}>{handicap}</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { value: roundCount,   label: 'Courses' },
          { value: countryCount, label: 'Countries' },
          { value: badgeCount,   label: 'Badges' },
        ].map(({ value, label }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 10,
            padding: '10px 8px', textAlign: 'center',
          }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{value}</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, marginTop: 3, textTransform: 'uppercase' }}>{label}</div>
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
              <span style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11,
                letterSpacing: 1.2,
                color: 'var(--color-mgp-gold)',
                marginLeft: 4,
                fontWeight: 700,
              }}>
                +{(totalBadges ?? 0) - badgeEmojis.length}
              </span>
            )}
          </>
        )
        const stripStyle: React.CSSProperties = {
          marginTop: 12,
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
  )
}
