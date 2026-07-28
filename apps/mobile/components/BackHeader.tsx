import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import { displayFont } from '@/lib/fonts';

/**
 * Shared top bar for stack screens (course detail, club, profile): a back
 * chevron + contextual label as ONE tappable row with generous hitSlop,
 * instead of a tiny icon-only tap target next to non-interactive text.
 */
export default function BackHeader({ label }: { label: string }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingHorizontal: 16, paddingTop: insets.top + 14, paddingBottom: 14, backgroundColor: colors.passport.cover }}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.back()}
        hitSlop={12}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 8, paddingRight: 16 }}
      >
        <Ionicons name="chevron-back" size={22} color={colors.paper.cream} />
        <Text numberOfLines={1} style={{ color: colors.paper.cream, fontFamily: displayFont.medium, fontSize: 18 }}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
}
