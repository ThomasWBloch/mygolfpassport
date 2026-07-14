import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

/**
 * Mirrors apps/web/src/components/BottomNav.tsx's floating "Add Course" FAB:
 * gold gradient circle, overlaid bottom-right above the 3-tab bar, opens /log.
 */
export default function AddCourseFab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add a course"
      onPress={() => router.push('/log')}
      className="absolute right-4 items-center justify-center rounded-full"
      style={{
        bottom: 88 + insets.bottom,
        width: 80,
        height: 80,
        shadowColor: colors.passport.coverInk,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 8,
      }}
    >
      <LinearGradient
        colors={[colors.accent.goldLight, colors.accent.gold, colors.accent.goldDark]}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 40 }]}
      />
      <Ionicons name="add" size={20} color={colors.passport.coverInk} />
      <Text
        className="uppercase"
        style={{
          color: colors.passport.coverInk,
          fontWeight: '700',
          fontSize: 11,
          letterSpacing: 0.5,
          lineHeight: 13,
          marginTop: 2,
        }}
      >
        {'Add\nCourse'}
      </Text>
    </Pressable>
  );
}
