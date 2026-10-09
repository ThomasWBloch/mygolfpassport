import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import AddCourseTabButton from '@/components/AddCourseTabButton';
import CoursesIcon from '@/components/icons/CoursesIcon';
import SocialIcon from '@/components/icons/SocialIcon';
import YouIcon from '@/components/icons/YouIcon';
import TabBarIcon from '@/components/TabBarIcon';
import { bodyFont } from '@/lib/fonts';

/**
 * Bottom bar: Courses / Add / Social / You. "Add" is a button slot, not a
 * screen — it opens the /log modal (see AddCourseTabButton). Home is a
 * separate surface — routable at "/" but not a highlighted tab — so its
 * screen is hidden from the bar via `href: null`.
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
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon focused={focused}>
                <CoursesIcon color={color} size={size} />
              </TabBarIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: 'Add',
            tabBarButton: () => <AddCourseTabButton />,
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon focused={focused}>
                <SocialIcon color={color} size={size} />
              </TabBarIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="you"
          options={{
            title: 'You',
            tabBarIcon: ({ color, size, focused }) => (
              <TabBarIcon focused={focused}>
                <YouIcon color={color} size={size} />
              </TabBarIcon>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
