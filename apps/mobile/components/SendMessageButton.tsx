import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import { bodyFont } from '@/lib/fonts';
import { findOrCreateConversation } from '@/lib/messages';

/** Ported from apps/web/src/components/SendMessageButton.tsx. */
export default function SendMessageButton({ currentUserId, targetUserId }: { currentUserId: string; targetUserId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    if (loading) return;
    setLoading(true);
    try {
      const conversationId = await findOrCreateConversation(currentUserId, targetUserId);
      router.push(`/messages/${conversationId}?from=profile`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handlePress}
      disabled={loading}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.passport.cover,
        borderWidth: 1,
        borderColor: colors.accent.gold,
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 18,
        opacity: loading ? 0.6 : 1,
      }}
    >
      <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.inverse }}>
        {loading ? 'Opening…' : '+ Message'}
      </Text>
    </Pressable>
  );
}
