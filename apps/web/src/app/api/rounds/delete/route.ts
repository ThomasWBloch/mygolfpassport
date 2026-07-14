import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { fetchUserData, evaluateCriteria } from '@/lib/badges'

// POST /api/rounds/delete  body: { round_id: string }
// Deletes a round owned by the current user, then re-evaluates the user's
// earned badges and removes any whose criteria are no longer met.
// Returns: { success: true, removed_badges: string[] }
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

  const body = await request.json().catch(() => null)
  const roundId: string | undefined = body?.round_id
  if (!roundId) {
    return NextResponse.json({ error: 'Missing round_id' }, { status: 400 })
  }

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // 1. Verify ownership
  const { data: round } = await adminSupabase
    .from('rounds')
    .select('id, user_id')
    .eq('id', roundId)
    .single()

  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }
  if (round.user_id !== user.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  // 2. Delete the round
  const { error: delErr } = await adminSupabase
    .from('rounds')
    .delete()
    .eq('id', roundId)
  if (delErr) {
    return NextResponse.json({ error: delErr.message }, { status: 500 })
  }

  // 3. Re-evaluate earned badges against fresh user data
  const userData = await fetchUserData(user.id, adminSupabase)

  const { data: earnedRows } = await adminSupabase
    .from('user_badges')
    .select('badge_id, badges(id, key, name, tier, criteria_type, criteria_value, xp_reward)')
    .eq('user_id', user.id)

  const removedBadgeNames: string[] = []
  const removedBadgeIds: string[] = []

  for (const row of earnedRows ?? []) {
    const b = row.badges as unknown as {
      id: string
      key: string
      name: string
      tier: string
      criteria_type: string
      criteria_value: Record<string, unknown>
      xp_reward: number
    } | null
    if (!b) continue

    const stillEarned = evaluateCriteria(
      { id: b.id, key: b.key, tier: b.tier, criteria_type: b.criteria_type, criteria_value: b.criteria_value, xp_reward: b.xp_reward },
      userData
    )
    if (!stillEarned) {
      removedBadgeNames.push(b.name)
      removedBadgeIds.push(b.id)
      console.log(`[rounds/delete] Revoking badge "${b.name}" from user ${user.id} — criteria no longer met`)
    }
  }

  if (removedBadgeIds.length > 0) {
    const { error: revokeErr } = await adminSupabase
      .from('user_badges')
      .delete()
      .eq('user_id', user.id)
      .in('badge_id', removedBadgeIds)
    if (revokeErr) {
      console.error('[rounds/delete] Badge revoke failed:', revokeErr)
      // Don't fail the whole request — the round is already deleted.
    }
  }

  return NextResponse.json({ success: true, removed_badges: removedBadgeNames })
}
