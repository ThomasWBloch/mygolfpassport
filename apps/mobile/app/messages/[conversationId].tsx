import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { supabase } from '@/lib/supabase';
import {
  fetchConversationInfo,
  fetchMessages,
  sendMessage,
  type Message,
} from '@/lib/messages';

export default function ConversationScreen() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const router = useRouter();
  const { session } = useAuth();
  const userId = session?.user.id;
  const insets = useSafeAreaInsets();

  const [otherName, setOtherName] = useState<string | null>(null);
  const [otherAvatarUrl, setOtherAvatarUrl] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!userId || !conversationId) return;
    Promise.all([
      fetchConversationInfo(conversationId, userId),
      fetchMessages(conversationId, userId),
    ])
      .then(([info, msgs]) => {
        setOtherName(info?.otherName ?? 'Golfer');
        setOtherAvatarUrl(info?.otherAvatarUrl ?? null);
        setMessages(msgs);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load conversation.'))
      .finally(() => setLoading(false));
  }, [conversationId, userId]);

  // Realtime subscription — mirrors apps/web/src/components/ChatThread.tsx.
  useEffect(() => {
    if (!conversationId || !userId) return;
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          const m = payload.new as { id: string; sender_id: string; content: string; created_at: string };
          setMessages((prev) => {
            if (prev.some((p) => p.id === m.id)) return prev;
            return [...prev, { id: m.id, senderId: m.sender_id, content: m.content, createdAt: m.created_at }];
          });
          if (m.sender_id !== userId) {
            supabase.from('messages').update({ read_at: new Date().toISOString() }).eq('id', m.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
    }
  }, [messages.length]);

  async function handleSend() {
    const content = input.trim();
    if (!content || sending || !userId || !conversationId) return;
    setSending(true);
    setInput('');
    try {
      await sendMessage(conversationId, userId, content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send message.');
      setInput(content);
    } finally {
      setSending(false);
    }
  }

  if (!userId) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.paper.cream }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          paddingHorizontal: 16,
          paddingTop: insets.top + 14,
          paddingBottom: 14,
          backgroundColor: colors.passport.cover,
        }}
      >
        <Pressable accessibilityRole="button" onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={colors.paper.cream} />
        </Pressable>
        {otherName && <Avatar name={otherName} avatarUrl={otherAvatarUrl} size={32} />}
        <Text style={{ color: colors.paper.cream, fontFamily: displayFont.medium, fontSize: 19 }}>
          {otherName ?? '…'}
        </Text>
      </View>

      {loading && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 12 }}>{error}</Text>
      )}

      {!loading && (
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 14, gap: 8 }}
          ListEmptyComponent={
            <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, textAlign: 'center', marginTop: 40 }}>
              Send your first message.
            </Text>
          }
          renderItem={({ item }) => {
            const isMe = item.senderId === userId;
            return (
              <View style={{ alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                <View
                  style={{
                    maxWidth: '75%',
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 12,
                    backgroundColor: isMe ? colors.passport.cover : colors.paper.white,
                    borderWidth: isMe ? 0 : 1,
                    borderColor: colors.border.paperFaint,
                  }}
                >
                  <Text
                    style={{
                      color: isMe ? colors.ink.inverse : colors.ink.primary,
                      fontFamily: bodyFont.regular,
                      fontSize: 15,
                    }}
                  >
                    {item.content}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          padding: 12,
          borderTopWidth: 1,
          borderTopColor: colors.border.paperFaint,
          backgroundColor: colors.paper.white,
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Write a message…"
          placeholderTextColor={colors.ink.tertiary}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 10,
            fontFamily: bodyFont.regular,
            fontSize: 15,
            color: colors.ink.primary,
            backgroundColor: colors.paper.creamWarm,
          }}
          onSubmitEditing={handleSend}
        />
        <Pressable
          accessibilityRole="button"
          onPress={handleSend}
          disabled={!input.trim() || sending}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: input.trim() ? colors.accent.gold : colors.paper.creamWarm,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: input.trim() ? colors.passport.coverInk : colors.ink.tertiary,
            }}
          >
            ↑
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
