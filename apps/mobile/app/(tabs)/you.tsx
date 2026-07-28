import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import YouBadgesView from '@/components/you/YouBadgesView';
import YouCoursesView from '@/components/you/YouCoursesView';
import YouProfileView from '@/components/you/YouProfileView';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';

type SubTab = 'profile' | 'courses' | 'badges';

const TABS: { key: SubTab; label: string }[] = [
  { key: 'profile', label: 'Profile' },
  { key: 'courses', label: 'Courses' },
  { key: 'badges', label: 'Badges' },
];

/**
 * Ported from apps/web/src/app/you/page.tsx — three subtabs (Profile /
 * Courses / Badges), same shell pattern as (tabs)/social.tsx.
 */
export default function YouScreen() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<SubTab>('profile');

  const userId = session?.user.id;
  if (!userId) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <View style={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 12 }}>
        <Text style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 26, marginBottom: 14 }}>
          You
        </Text>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {TABS.map((t) => (
            <Pressable
              key={t.key}
              accessibilityRole="button"
              onPress={() => setTab(t.key)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 999,
                backgroundColor: tab === t.key ? colors.accent.gold : colors.paper.white,
                borderWidth: 1,
                borderColor: tab === t.key ? colors.accent.gold : colors.border.paper,
              }}
            >
              <Text
                style={{
                  color: tab === t.key ? colors.passport.coverInk : colors.ink.secondary,
                  fontFamily: bodyFont.semibold,
                  fontSize: 13,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {tab === 'profile' && (
        <YouProfileView userId={userId} onPressCourses={() => setTab('courses')} onPressBadges={() => setTab('badges')} />
      )}
      {tab === 'courses' && <YouCoursesView userId={userId} />}
      {tab === 'badges' && <YouBadgesView userId={userId} />}
    </View>
  );
}
