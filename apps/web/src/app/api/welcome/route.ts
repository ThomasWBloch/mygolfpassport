import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getRequestUserId } from '@/lib/request-user'

// System user ID — must exist in auth.users and profiles
// Create this user manually in Supabase Auth with email: system@mygolfpassport.golf
const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID

// Sends the one-time welcome DM after onboarding. Called by web onboarding
// (cookie session) and the mobile app's onboarding (Bearer token);
// idempotent, since an existing system conversation short-circuits it.
export async function POST(request: Request) {
  if (!SYSTEM_USER_ID) {
    return NextResponse.json({ error: 'SYSTEM_USER_ID not configured' }, { status: 500 })
  }

  const userId = await getRequestUserId(request)
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Check if a conversation already exists (prevent duplicates)
  const { data: existing } = await adminSupabase
    .from('conversations')
    .select('id')
    .or(
      `and(participant_1.eq.${SYSTEM_USER_ID},participant_2.eq.${userId}),and(participant_1.eq.${userId},participant_2.eq.${SYSTEM_USER_ID})`
    )
    .limit(1)
    .single()

  if (existing) {
    return NextResponse.json({ ok: true, existing: true })
  }

  // Get user's first name
  const { data: profile } = await adminSupabase
    .from('profiles')
    .select('full_name')
    .eq('id', userId)
    .single()

  const firstName = (profile?.full_name as string)?.split(' ')[0] ?? 'golfer'

  // Create conversation
  const { data: convo, error: convoError } = await adminSupabase
    .from('conversations')
    .insert({ participant_1: SYSTEM_USER_ID, participant_2: userId })
    .select('id')
    .single()

  if (convoError) {
    return NextResponse.json({ error: convoError.message }, { status: 500 })
  }

  // Send welcome message
  await adminSupabase.from('messages').insert({
    conversation_id: convo.id,
    sender_id: SYSTEM_USER_ID,
    content: `Hej ${firstName}!\n\nVelkommen til My Golf Passport — jeg er glad for at have dig med! Her kan du logge de golfbaner du har spillet, se dem på et verdenskort, connecte med andre golfere og følge dine fremskridt med badges.\n\nJeg håber du vil bruge lidt tid på at klikke dig rundt og se, hvordan det virker. Tilføj mig gerne som ven og send en besked 😊\n\nVi ses\nThomas`,
  })

  return NextResponse.json({ ok: true })
}
