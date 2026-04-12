const COLORS = ['#1a5c38', '#c9a84c', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#be185d', '#059669']

function hashColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')
}

interface Props {
  name: string
  avatarUrl?: string | null
  size?: number
  bgColor?: string
  border?: string
}

export default function UserAvatar({ name, size = 36, bgColor, border }: Props) {
  const bg = bgColor ?? hashColor(name)

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
      border: border ?? 'none',
    }}>
      {getInitials(name)}
    </div>
  )
}
