import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import HomeIcon from '@/components/icons/HomeIcon';
import { displayFont } from '@/lib/fonts';

/**
 * Shared green brand bar for the Courses/Social/You tabs — mirrors web's
 * top bar (a solid --color-mgp-cover strip with the icon+wordmark logo,
 * tappable back to "/") instead of each screen inventing its own header.
 * This is the only "back to home" control on these screens — no redundant
 * icon elsewhere on the page.
 */
export default function TopBar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: colors.passport.cover,
        paddingTop: insets.top + 12,
        paddingBottom: 12,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable
        accessibilityLabel="Go to home"
        onPress={() => router.push('/')}
        style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
      >
        <HomeIcon color={colors.accent.gold} size={20} />
        <Text style={{ fontFamily: displayFont.medium, fontSize: 18, color: colors.ink.inverse, letterSpacing: 0.3 }}>
          My Golf Passport
        </Text>
      </Pressable>
    </View>
  );
}
