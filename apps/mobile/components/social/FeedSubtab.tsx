import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchFeed, type FeedItem } from '@/lib/feed';
import { supabase } from '@/lib/supabase';
import FeedCard from './FeedCard';
import { SmallButton } from './shared';

/**
 * Ported from apps/web/src/app/social/SocialFeedView.tsx +
 * FriendsActivitySection.tsx — friends' recent rounds, badges, and new
 * friendships in one chronological stream. When the viewer has no friends
 * yet, falls back to their own recent stamps (fetchFeed's ownStamps) so the
 * tab never looks completely empty.
 */
export default function FeedSubtab({ onFindFriends }: { onFindFriends: () => void }) {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [items, setItems] = useState<FeedItem[] | null>(null);
  const [hasFriends, setHasFriends] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;
    fetchFeed(supabase, userId, { limit: 20 })
      .then((res) => {
        setHasFriends(res.hasFriends);
        setItems(res.hasFriends ? res.items : res.ownStamps);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load feed.'));
  }, [userId]);

  if (!userId) return null;

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}>
      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular }}>{error}</Text>
      )}

      {!items && error.length === 0 && <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 40 }} />}

      {items && !hasFriends && (
        <View
          style={{
            backgroundColor: colors.paper.creamWarm,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            padding: 18,
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <Text style={{ fontFamily: displayFont.medium, fontSize: 18, color: colors.ink.primary, marginBottom: 4 }}>
            Find your golf circle
          </Text>
          <Text style={{ fontSize: 13, color: colors.ink.secondary, lineHeight: 18, textAlign: 'center', marginBottom: 12 }}>
            Add a friend or two — their stamps, badges, and new connections show up here.
          </Text>
          <SmallButton label="Find friends →" filled onPress={onFindFriends} />
        </View>
      )}

      {items && items.length === 0 && hasFriends && (
        <View
          style={{
            backgroundColor: colors.paper.white,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            padding: 18,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: displayFont.medium, fontSize: 17, color: colors.ink.primary, marginBottom: 4 }}>
            Quiet on the green
          </Text>
          <Text style={{ fontSize: 13, color: colors.ink.secondary, lineHeight: 18, textAlign: 'center' }}>
            None of your friends have stamped a course yet. When they do, it shows up here.
          </Text>
        </View>
      )}

      {items && items.length > 0 && (
        <View style={{ gap: 10, paddingBottom: 24 }}>
          {items.map((item) => (
            <FeedCard key={`${item.type}-${item.id}`} item={item} viewerId={userId} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
