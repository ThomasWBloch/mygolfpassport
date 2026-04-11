import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// POST /api/conversations  body: { otherUserId: string }
// Returns existing conversation or creates a new one
export async function POST(request: Request) {
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

  const { otherUserId } = await request.json()
  if (!otherUserId) return NextResponse.json({ error: 'Missing otherUserId' }, { status: 400 })

  // Check for existing conversation between these two users
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .or(
      `and(participant_1.eq.${user.id},participant_2.eq.${otherUserId}),and(participant_1.eq.${otherUserId},participant_2.eq.${user.id})`
    )
    .limit(1)
    .single()

  if (existing) {
    return NextResponse.json({ conversationId: existing.id })
  }

  // Create new conversation
  const { data: created, error } = await supabase
    .from('conversations')
    .insert({ participant_1: user.id, participant_2: otherUserId })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ conversationId: created.id })
}
