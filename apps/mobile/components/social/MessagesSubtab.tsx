import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { fetchConversations, type Conversation } from '@/lib/messages';
import { EmptyText } from './shared';

export default function MessagesSubtab() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;
    fetchConversations(userId)
      .then(setConversations)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load messages.'));
  }, [userId]);

  if (!userId) return null;

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular }}>{error}</Text>
      )}

      {!conversations && error.length === 0 && (
        <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 40 }} />
      )}

      {conversations && conversations.length === 0 && (
        <EmptyText>No messages yet. Add a friend and start a conversation from the Friends tab.</EmptyText>
      )}

      {conversations && conversations.length > 0 && (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ height: 1, backgroundColor: colors.border.paperFaint }} />
          )}
          renderItem={({ item }) => (
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push(`/messages/${item.id}?from=messages`)}
              style={{
                paddingVertical: 12,
                backgroundColor: item.unreadCount > 0 ? colors.paper.creamWarm : 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <Avatar name={item.otherName} avatarUrl={item.otherAvatarUrl} size={42} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text
                  style={{
                    color: colors.ink.primary,
                    fontFamily: item.unreadCount > 0 ? displayFont.semibold : displayFont.medium,
                    fontSize: 16,
                  }}
                  numberOfLines={1}
                >
                  {item.otherName}
                </Text>
                <Text
                  style={{
                    color: item.unreadCount > 0 ? colors.ink.primary : colors.ink.tertiary,
                    fontFamily: bodyFont.regular,
                    fontSize: 13,
                    marginTop: 2,
                  }}
                  numberOfLines={1}
                >
                  {item.lastMessage ? `${item.lastSenderIsMe ? 'You: ' : ''}${item.lastMessage}` : 'No messages yet'}
                </Text>
              </View>
              {item.unreadCount > 0 && (
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: colors.passport.cover,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 12 }}>
                    {item.unreadCount}
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
