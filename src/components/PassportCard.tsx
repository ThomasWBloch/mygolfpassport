import Link from 'next/link'

const COUNTRY_FLAGS: Record<string, string> = {
  Denmark: '🇩🇰', Sweden: '🇸🇪', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', Ireland: '🇮🇪',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', France: '🇫🇷', Germany: '🇩🇪',
  Netherlands: '🇳🇱', Norway: '🇳🇴', Finland: '🇫🇮',
}

interface BadgeEmoji {
  emoji: string
  name: string
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
  level: number
  levelTitle: string
  totalXP: number
  /** Up to 5 badge emojis for the footer row */
  badgeEmojis?: BadgeEmoji[]
  /** Total earned badges (for +N indicator) */
  totalBadges?: number
}

export default function PassportCard(props: PassportCardProps) {
  const {
    fullName, email, initials, homeClub, clubFlag, homeCountry, handicap,
    roundCount, countryCount, badgeCount, level, levelTitle, totalXP,
    badgeEmojis, totalBadges,
  } = props

  const countryFlag = homeCountry ? (COUNTRY_FLAGS[homeCountry] ?? '') : ''
  const xpInLevel = totalXP % 500

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
            <Link
              href={`/clubs/${encodeURIComponent(homeClub)}`}
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2, textDecoration: 'none', display: 'block' }}
            >
              🏠 {homeClub} {clubFlag ?? ''}
            </Link>
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

      {/* XP level bar */}
      <div style={{ marginTop: 12 }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ color: '#c9a84c', fontWeight: 600 }}>Lvl {level} · {levelTitle}</span>
          <span>{xpInLevel} / 500 XP</span>
        </div>
        <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.round(xpInLevel / 5)}%`, background: 'linear-gradient(90deg, #c9a84c, #f5d070)', borderRadius: 2, transition: 'width 0.4s ease' }} />
        </div>
        {totalXP > 0 && (
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, marginTop: 3, textAlign: 'right' }}>
            {totalXP.toLocaleString()} XP total
          </div>
        )}
      </div>

      {/* Badge emojis footer */}
      {badgeEmojis && badgeEmojis.length > 0 && (
        <Link href="/badges" style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
          {badgeEmojis.map((b, i) => (
            <span key={i} title={b.name} style={{ fontSize: 20 }}>{b.emoji}</span>
          ))}
          {(totalBadges ?? 0) > badgeEmojis.length && (
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginLeft: 4 }}>+{(totalBadges ?? 0) - badgeEmojis.length}</span>
          )}
        </Link>
      )}
    </div>
  )
}
