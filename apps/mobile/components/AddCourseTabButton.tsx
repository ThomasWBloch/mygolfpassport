import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';
import PlusIcon from '@/components/icons/PlusIcon';
import { bodyFont } from '@/lib/fonts';

/**
 * The centre "Add" slot of the bottom tab bar: a gold gradient circle that
 * opens /log (a modal outside the tabs) instead of switching screen. It
 * replaced the old floating "Add Course" button, which sat on top of the
 * screen content; living inside the bar it's an ordinary native tab press.
 * Used as a Tabs.Screen `tabBarButton`, so it must provide its own layout.
 */
export default function AddCourseTabButton() {
  const router = useRouter();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add a course"
      onPress={() => router.push('/log')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
    >
      <View style={{ width: 40, alignItems: 'center' }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={[colors.accent.goldLight, colors.accent.gold, colors.accent.goldDark]}
            style={StyleSheet.absoluteFillObject}
          />
          <PlusIcon color={colors.passport.coverInk} size={14} />
        </View>
      </View>
      <Text
        style={{
          color: colors.accent.gold,
          fontFamily: bodyFont.semibold,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        Add
      </Text>
    </Pressable>
  );
}
