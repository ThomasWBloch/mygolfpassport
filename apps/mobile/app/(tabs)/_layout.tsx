import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import AddCourseFab from '@/components/AddCourseFab';

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
            fontSize: 11,
            fontWeight: '600',
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
            tabBarIcon: ({ color, size }) => <Ionicons name="golf-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="you"
          options={{
            title: 'You',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
      </Tabs>
      <AddCourseFab />
    </View>
  );
}
