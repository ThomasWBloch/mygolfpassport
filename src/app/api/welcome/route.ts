import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// System user ID — must exist in auth.users and profiles
// Create this user manually in Supabase Auth with email: system@mygolfpassport.golf
const SYSTEM_USER_ID = process.env.SYSTEM_USER_ID

export async function POST() {
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
      `and(participant_1.eq.${SYSTEM_USER_ID},participant_2.eq.${user.id}),and(participant_1.eq.${user.id},participant_2.eq.${SYSTEM_USER_ID})`
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
    .eq('id', user.id)
    .single()

  const firstName = (profile?.full_name as string)?.split(' ')[0] ?? 'golfer'

  // Create conversation
  const { data: convo, error: convoError } = await adminSupabase
    .from('conversations')
    .insert({ participant_1: SYSTEM_USER_ID, participant_2: user.id })
    .select('id')
    .single()

  if (convoError) {
    return NextResponse.json({ error: convoError.message }, { status: 500 })
  }

  // Send welcome message
  await adminSupabase.from('messages').insert({
    conversation_id: convo.id,
    sender_id: SYSTEM_USER_ID,
    content: `Hej ${firstName}! 👋\n\nVelkommen til My Golf Passport — vi er glade for at have dig med!\n\nHer kan du logge de golfbaner du har spillet, se dem på et verdenskort, connecte med andre golfere og følge din progression med badges og XP.\n\nDu kan give os feedback her: mygolfpassport.vercel.app/survey — det tager kun 5 minutter og betyder meget for os! 🙏\n\nGod fornøjelse på banen! ⛳`,
  })

  return NextResponse.json({ ok: true })
}
