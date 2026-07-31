import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';
import FeedSubtab from '@/components/social/FeedSubtab';
import FriendsSubtab from '@/components/social/FriendsSubtab';
import LeaderboardSubtab from '@/components/social/LeaderboardSubtab';
import MessagesSubtab from '@/components/social/MessagesSubtab';

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
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <View style={{ paddingHorizontal: 20, paddingTop: insets.top + 16, paddingBottom: 12 }}>
        <Text
          style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 26, marginBottom: 14 }}
        >
          Social
        </Text>

        <View style={{ flexDirection: 'row', gap: 6 }}>
          {TABS.map((t) => (
            <Pressable
              key={t.key}
              accessibilityRole="button"
              onPress={() => setTab(t.key)}
              style={{
                flexShrink: 1,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 999,
                backgroundColor: tab === t.key ? colors.accent.gold : colors.paper.white,
                borderWidth: 1,
                borderColor: tab === t.key ? colors.accent.gold : colors.border.paper,
              }}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  color: tab === t.key ? colors.passport.coverInk : colors.ink.secondary,
                  fontFamily: bodyFont.semibold,
                  fontSize: 11.5,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
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
