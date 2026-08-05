import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import Pill from '@/components/Pill';
import TopBar from '@/components/TopBar';
import YouBadgesView from '@/components/you/YouBadgesView';
import YouCoursesView from '@/components/you/YouCoursesView';
import YouProfileView from '@/components/you/YouProfileView';
import { useAuth } from '@/lib/auth-context';

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
  const { tab: initialTab } = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<SubTab>(
    initialTab === 'courses' || initialTab === 'badges' ? initialTab : 'profile'
  );

  const userId = session?.user.id;
  if (!userId) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <TopBar />

      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {TABS.map((t) => (
            <Pill key={t.key} label={t.label} active={tab === t.key} onPress={() => setTab(t.key)} />
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
