import { Image, Text, View } from 'react-native';

import { computeInitials } from '@/lib/initials';

// Ported from apps/web/src/components/UserAvatar.tsx — same 8-color hashed
// palette (drawn from design-tokens.ts) and initials fallback, so a given
// user always gets the same disc color across web and mobile.
const COLORS = [
  '#a84a2c', // stamp-red
  '#3a5266', // stamp-blue
  '#5e3a5b', // stamp-purple
  '#5a7a4a', // state-success (forest)
  '#9a7e2a', // gold-dark
  '#2d4d40', // cover-light
  '#6b6048', // ink-2 (warm khaki)
  '#1f3a2e', // cover
];

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

type Props = {
  name: string;
  avatarUrl?: string | null;
  size?: number;
};

export default function Avatar({ name, avatarUrl, size = 36 }: Props) {
  const bg = hashColor(name);

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg }}
      />
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bg,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <Text style={{ color: '#fff', fontSize: size * 0.35, fontWeight: '700' }}>
        {computeInitials(name, null)}
      </Text>
    </View>
  );
}
