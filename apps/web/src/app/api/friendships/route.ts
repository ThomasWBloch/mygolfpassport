import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// PATCH /api/friendships  body: { friendshipId, action: 'accept' | 'decline' | 'cancel' | 'remove' }
export async function PATCH(request: Request) {
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

  const { friendshipId, action } = await request.json()
  if (!friendshipId || !action) {
    return NextResponse.json({ error: 'Missing friendshipId or action' }, { status: 400 })
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Verify the user is a participant in this friendship
  const { data: friendship } = await adminSupabase
    .from('friendships')
    .select('id, user_id, friend_id, status')
    .eq('id', friendshipId)
    .single()

  if (!friendship) {
    return NextResponse.json({ error: 'Friendship not found' }, { status: 404 })
  }

  if (friendship.user_id !== user.id && friendship.friend_id !== user.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  if (action === 'accept') {
    const { error } = await adminSupabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  if (action === 'decline' || action === 'cancel' || action === 'remove') {
    const { error } = await adminSupabase
      .from('friendships')
      .delete()
      .eq('id', friendshipId)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
