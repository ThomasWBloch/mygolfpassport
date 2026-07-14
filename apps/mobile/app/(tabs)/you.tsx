import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';

export default function YouScreen() {
  const { session, signOut } = useAuth();

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.paper.cream, gap: 16 }}
    >
      <Text
        className="uppercase"
        style={{
          color: colors.passport.cover,
          fontWeight: '700',
          fontSize: typography.size.h3,
          letterSpacing: typography.tracking.stamp,
        }}
      >
        You
      </Text>

      {session?.user.email && (
        <Text style={{ color: colors.ink.secondary, fontSize: 14 }}>{session.user.email}</Text>
      )}

      <Pressable
        accessibilityRole="button"
        onPress={() => signOut()}
        style={{
          borderWidth: 1,
          borderColor: colors.border.paperStrong,
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: colors.state.danger, fontWeight: '600', fontSize: 14 }}>
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}
