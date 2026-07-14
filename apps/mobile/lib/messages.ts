import { supabase } from './supabase';

export type Conversation = {
  id: string;
  otherUserId: string;
  otherName: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  lastSenderIsMe: boolean;
  unreadCount: number;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
};

export async function fetchConversations(userId: string): Promise<Conversation[]> {
  const { data: convosData, error: convosError } = await supabase
    .from('conversations')
    .select('id, participant_1, participant_2, created_at')
    .or(`participant_1.eq.${userId},participant_2.eq.${userId}`)
    .order('created_at', { ascending: false });
  if (convosError) throw convosError;

  const convos = convosData ?? [];
  const otherIds = [...new Set(convos.map((c) => (c.participant_1 === userId ? c.participant_2 : c.participant_1)))];
  const convoIds = convos.map((c) => c.id);

  const [profilesRes, messagesRes] = await Promise.all([
    otherIds.length > 0
      ? supabase.from('profiles').select('id, full_name').in('id', otherIds)
      : Promise.resolve({ data: [], error: null }),
    convoIds.length > 0
      ? supabase
          .from('messages')
          .select('id, conversation_id, sender_id, content, created_at, read_at')
          .in('conversation_id', convoIds)
          .order('created_at', { ascending: false })
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (profilesRes.error) throw profilesRes.error;
  if (messagesRes.error) throw messagesRes.error;

  const profileMap = new Map((profilesRes.data ?? []).map((p) => [p.id, p.full_name ?? 'Golfer']));
  const msgs = messagesRes.data ?? [];

  const result: Conversation[] = convos.map((c) => {
    const otherId = c.participant_1 === userId ? c.participant_2 : c.participant_1;
    const convoMsgs = msgs.filter((m) => m.conversation_id === c.id);
    const lastMsg = convoMsgs[0] ?? null;
    const unreadCount = convoMsgs.filter((m) => m.sender_id !== userId && !m.read_at).length;

    return {
      id: c.id,
      otherUserId: otherId,
      otherName: profileMap.get(otherId) ?? 'Golfer',
      lastMessage: lastMsg?.content ?? null,
      lastMessageTime: lastMsg?.created_at ?? null,
      lastSenderIsMe: lastMsg?.sender_id === userId,
      unreadCount,
    };
  });

  return result.sort((a, b) => (b.lastMessageTime ?? '').localeCompare(a.lastMessageTime ?? ''));
}

export async function findOrCreateConversation(userId: string, otherUserId: string): Promise<string> {
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .or(`and(participant_1.eq.${userId},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${userId})`)
    .limit(1)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from('conversations')
    .insert({ participant_1: userId, participant_2: otherUserId })
    .select('id')
    .single();
  if (error) throw error;
  return created.id;
}

export async function fetchConversationInfo(
  conversationId: string,
  currentUserId: string
): Promise<{ otherUserId: string; otherName: string } | null> {
  const { data: convo, error: convoError } = await supabase
    .from('conversations')
    .select('id, participant_1, participant_2')
    .eq('id', conversationId)
    .single();
  if (convoError) throw convoError;
  if (!convo) return null;
  if (convo.participant_1 !== currentUserId && convo.participant_2 !== currentUserId) return null;

  const otherId = convo.participant_1 === currentUserId ? convo.participant_2 : convo.participant_1;
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', otherId)
    .single();
  if (profileError) throw profileError;

  return { otherUserId: otherId, otherName: profile?.full_name ?? 'Golfer' };
}

export async function fetchMessages(conversationId: string, currentUserId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('id, sender_id, content, created_at, read_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(200);
  if (error) throw error;

  const rows = data ?? [];
  const unreadIds = rows.filter((m) => m.sender_id !== currentUserId && !m.read_at).map((m) => m.id);
  if (unreadIds.length > 0) {
    await supabase.from('messages').update({ read_at: new Date().toISOString() }).in('id', unreadIds);
  }

  return rows.map((m) => ({
    id: m.id,
    senderId: m.sender_id,
    content: m.content,
    createdAt: m.created_at,
  }));
}

export async function sendMessage(conversationId: string, senderId: string, content: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: senderId, content });
  if (error) throw error;
}
