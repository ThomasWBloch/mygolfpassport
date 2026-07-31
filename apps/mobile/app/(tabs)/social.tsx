import { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import FeedSubtab from '@/components/social/FeedSubtab';
import FriendsSubtab from '@/components/social/FriendsSubtab';
import LeaderboardSubtab from '@/components/social/LeaderboardSubtab';
import MessagesSubtab from '@/components/social/MessagesSubtab';
import Pill from '@/components/Pill';
import TopBar from '@/components/TopBar';

type SubTab = 'feed' | 'friends' | 'leaderboard' | 'messages';

const TABS: { key: SubTab; label: string }[] = [
  { key: 'feed', label: 'Feed' },
  { key: 'friends', label: 'Friends' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'messages', label: 'Messages' },
];

const VALID_TABS = new Set<SubTab>(['feed', 'friends', 'leaderboard', 'messages']);

export default function SocialScreen() {
  // Matches web, where /social defaults to the Feed subtab — overridable via
  // ?tab= so other screens (e.g. Home's "Find friends" CTA) can deep-link
  // straight into a specific subtab.
  const { tab: tabParam } = useLocalSearchParams<{ tab?: string }>();
  const initialTab = tabParam && VALID_TABS.has(tabParam as SubTab) ? (tabParam as SubTab) : 'feed';
  const [tab, setTab] = useState<SubTab>(initialTab);

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <TopBar />

      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {TABS.map((t) => (
            <Pill key={t.key} label={t.label} active={tab === t.key} onPress={() => setTab(t.key)} />
          ))}
        </View>
      </View>

      {tab === 'feed' && <FeedSubtab onFindFriends={() => setTab('friends')} />}
      {tab === 'friends' && <FriendsSubtab />}
      {tab === 'leaderboard' && <LeaderboardSubtab />}
      {tab === 'messages' && <MessagesSubtab />}
    </View>
  );
}
