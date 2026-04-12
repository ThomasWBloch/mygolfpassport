import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import ChatThread from '@/components/ChatThread'

export default async function ConversationPage({ params }: { params: Promise<{ conversation_id: string }> }) {
  const { conversation_id } = await params
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    }
  )

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
    : supabase

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify conversation exists and user is a participant
  const { data: convo } = await supabase
    .from('conversations')
    .select('id, participant_1, participant_2')
    .eq('id', conversation_id)
    .single()

  if (!convo) notFound()
  if (convo.participant_1 !== user.id && convo.participant_2 !== user.id) notFound()

  const otherId = (convo.participant_1 === user.id ? convo.participant_2 : convo.participant_1) as string

  // Fetch other user's profile + initial messages in parallel
  const [profileResult, messagesResult] = await Promise.all([
    adminSupabase.from('profiles').select('full_name, avatar_url').eq('id', otherId).single(),
    supabase
      .from('messages')
      .select('id, sender_id, content, created_at, read_at')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })
      .limit(200),
  ])

  const otherName = (profileResult.data?.full_name as string) ?? 'Golfer'
  const otherAvatarUrl = (profileResult.data?.avatar_url as string) ?? null

  // Mark unread messages as read
  const unreadIds = (messagesResult.data ?? [])
    .filter(m => m.sender_id !== user.id && !m.read_at)
    .map(m => m.id as string)

  if (unreadIds.length > 0) {
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .in('id', unreadIds)
  }

  const initialMessages = (messagesResult.data ?? []).map(m => ({
    id: m.id as string,
    senderId: m.sender_id as string,
    content: m.content as string,
    createdAt: m.created_at as string,
  }))

  return (
    <ChatThread
      conversationId={conversation_id}
      currentUserId={user.id}
      otherName={otherName}
      otherAvatarUrl={otherAvatarUrl}
      initialMessages={initialMessages}
    />
  )
}
