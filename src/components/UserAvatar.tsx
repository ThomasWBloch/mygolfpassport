// Adventure palette — stamp colors + complementary tones drawn from
// design-tokens.ts so avatars feel like part of the passport, not stickers
// from a different app. Eight options keeps variety high without leaving the
// system.
const COLORS = [
  '#a84a2c', // stamp-red
  '#3a5266', // stamp-blue
  '#5e3a5b', // stamp-purple
  '#5a7a4a', // state-success (forest)
  '#9a7e2a', // gold-dark
  '#2d4d40', // cover-light
  '#6b6048', // ink-2 (warm khaki)
  '#1f3a2e', // cover
]

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
