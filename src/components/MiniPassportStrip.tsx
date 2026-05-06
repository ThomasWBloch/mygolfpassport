import Link from 'next/link'
import UserAvatar from '@/components/UserAvatar'

/**
 * MiniPassportStrip — compact glance-status row above the feed showing the
 * user's own passport totals. Tapping it goes to /profile for the full view.
 */

interface Props {
  fullName: string
  avatarUrl: string | null
  countryCount: number
  roundCount: number
  badgeCount: number
}

export default function MiniPassportStrip({
  fullName, avatarUrl, countryCount, roundCount, badgeCount,
}: Props) {
  return (
    <Link
      href="/profile"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        background: 'var(--color-mgp-cream-warm)',
        borderBottom: '0.5px solid var(--color-mgp-border)',
        textDecoration: 'none',
      }}
    >
      <UserAvatar
        name={fullName}
        avatarUrl={avatarUrl}
        size={40}
        border="1.5px solid var(--color-mgp-gold)"
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
        }}>
          {fullName}
        </div>
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11,
          color: 'var(--color-mgp-ink-2)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          marginTop: 2,
        }}>
          {countryCount} {countryCount === 1 ? 'country' : 'countries'} · {roundCount} {roundCount === 1 ? 'round' : 'rounds'} · {badgeCount} {badgeCount === 1 ? 'stamp' : 'stamps'}
        </div>
      </div>

      <span
        aria-hidden
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11,
          color: 'var(--color-mgp-gold-dark)',
          letterSpacing: 1,
        }}
      >
        VIEW ›
      </span>
    </Link>
  )
}
