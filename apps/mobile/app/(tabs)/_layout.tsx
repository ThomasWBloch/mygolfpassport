import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import AddCourseFab from '@/components/AddCourseFab';
import CoursesIcon from '@/components/icons/CoursesIcon';
import SocialIcon from '@/components/icons/SocialIcon';
import YouIcon from '@/components/icons/YouIcon';
import { bodyFont } from '@/lib/fonts';

/**
 * Mirrors apps/web/src/components/BottomNav.tsx: 3 visible tabs
 * (Courses / Social / You). Home is a separate surface — routable at
 * "/" but not a highlighted tab — so its screen is hidden from the bar
 * via `href: null`. The "Add Course" FAB is overlaid on top, not a tab.
 */
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent.goldLight,
          tabBarInactiveTintColor: colors.accent.gold,
          tabBarStyle: {
            backgroundColor: colors.passport.cover,
            borderTopColor: colors.accent.gold,
            borderTopWidth: 2,
            height: 56 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: bodyFont.semibold,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
          },
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="courses"
          options={{
            title: 'Courses',
            tabBarIcon: ({ color, size }) => <CoursesIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarIcon: ({ color, size }) => <SocialIcon color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="you"
          options={{
            title: 'You',
            tabBarIcon: ({ color, size }) => <YouIcon color={color} size={size} />,
          }}
        />
      </Tabs>
      <AddCourseFab />
    </View>
  );
}
