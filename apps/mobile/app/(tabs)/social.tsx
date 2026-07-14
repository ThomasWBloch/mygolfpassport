import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import FriendsSubtab from '@/components/social/FriendsSubtab';
import LeaderboardSubtab from '@/components/social/LeaderboardSubtab';
import MessagesSubtab from '@/components/social/MessagesSubtab';

type SubTab = 'friends' | 'leaderboard' | 'messages';

const TABS: { key: SubTab; label: string }[] = [
  { key: 'friends', label: 'Friends' },
  { key: 'leaderboard', label: 'Leaderboard' },
  { key: 'messages', label: 'Messages' },
];

export default function SocialScreen() {
  const [tab, setTab] = useState<SubTab>('friends');

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 }}>
        <Text
          className="uppercase"
          style={{
            color: colors.passport.cover,
            fontWeight: '700',
            fontSize: typography.size.h2,
            letterSpacing: typography.tracking.wide,
            marginBottom: 14,
          }}
        >
          Social
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
                  fontWeight: '600',
                  fontSize: 13,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {tab === 'friends' && <FriendsSubtab />}
      {tab === 'leaderboard' && <LeaderboardSubtab />}
      {tab === 'messages' && <MessagesSubtab />}
    </View>
  );
}
