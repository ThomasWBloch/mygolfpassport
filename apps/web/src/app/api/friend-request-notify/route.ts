import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

// POST /api/friend-request-notify  body: { targetUserId: string }
// Sends a system message notifying the target user of a friend request
export async function POST(request: Request) {
  if (!SYSTEM_USER_ID) {
    return NextResponse.json({ error: 'SYSTEM_USER_ID not configured' }, { status: 500 })
  }

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

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { targetUserId } = await request.json()
  // Must be a bare UUID — it's interpolated into a PostgREST .or() filter
  // below, where ',' and ')' would otherwise rewrite the filter.
  if (typeof targetUserId !== 'string' || !UUID_RE.test(targetUserId)) {
    return NextResponse.json({ error: 'Invalid targetUserId' }, { status: 400 })
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Only notify about a request the caller actually sent — otherwise any
  // signed-in user could push system messages to arbitrary strangers.
  const { data: pendingRequests } = await adminSupabase
    .from('friendships')
    .select('id')
    .eq('user_id', user.id)
    .eq('friend_id', targetUserId)
    .eq('status', 'pending')
    .limit(1)
  if (!pendingRequests?.length) {
    return NextResponse.json({ error: 'No pending friend request' }, { status: 403 })
  }

  // Get sender's name
  const { data: senderProfile } = await adminSupabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .single()

  const senderName = (senderProfile?.full_name as string) ?? 'Someone'

  // Find or create conversation between system user and target
  const { data: existing } = await adminSupabase
    .from('conversations')
    .select('id')
    .or(
      `and(participant_1.eq.${SYSTEM_USER_ID},participant_2.eq.${targetUserId}),and(participant_1.eq.${targetUserId},participant_2.eq.${SYSTEM_USER_ID})`
    )
    .limit(1)
    .single()

  let conversationId: string

  if (existing) {
    conversationId = existing.id as string
  } else {
    const { data: convo, error: convoError } = await adminSupabase
      .from('conversations')
      .insert({ participant_1: SYSTEM_USER_ID, participant_2: targetUserId })
      .select('id')
      .single()

    if (convoError) {
      return NextResponse.json({ error: convoError.message }, { status: 500 })
    }
    conversationId = convo.id as string
  }

  // Send notification message
  await adminSupabase.from('messages').insert({
    conversation_id: conversationId,
    sender_id: SYSTEM_USER_ID,
    content: `${senderName} has sent you a friend request. Go to Friends → Pending Requests to accept or decline.`,
  })

  return NextResponse.json({ ok: true })
}
