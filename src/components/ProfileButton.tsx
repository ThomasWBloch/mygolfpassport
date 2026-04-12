import Link from 'next/link'

export default function ProfileButton({ initials, avatarUrl }: { initials: string; avatarUrl?: string | null }) {
  return (
    <Link
      href="/profile"
      style={{
        width: 34, height: 34, borderRadius: '50%',
        background: avatarUrl ? 'transparent' : 'rgba(255,255,255,0.2)',
        border: '2px solid rgba(255,255,255,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 12, fontWeight: 700,
        textDecoration: 'none', flexShrink: 0,
        letterSpacing: '-0.3px',
        overflow: 'hidden',
      }}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="" style={{ width: 34, height: 34, objectFit: 'cover' }} />
      ) : (
        initials
      )}
    </Link>
  )
}
