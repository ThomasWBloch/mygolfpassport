import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID

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
  if (!targetUserId) return NextResponse.json({ error: 'Missing targetUserId' }, { status: 400 })

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

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
