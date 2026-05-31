import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { fetchUserData, evaluateCriteria } from '@/lib/badges'

/**
 * PATCH /api/rounds/[id]
 * Body: { rating?: number | null, played_at?: string | null, note?: string | null }
 *
 * Updates an existing round owned by the current user. Validates that the
 * round is a parent round (synthetic loop-rounds from combo fan-out can't
 * be directly edited — they're bookkeeping). When played_at changes on a
 * parent round, synthetic children are cascaded to keep the loop dates in
 * sync. Badges are re-evaluated since rating + played_at can both affect
 * criteria.
 */

const NOTE_MAX = 1000
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: roundId } = await params
  if (!roundId || !/^[0-9a-f-]{36}$/i.test(roundId)) {
    return NextResponse.json({ error: 'Invalid round id' }, { status: 400 })
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
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null) as {
    rating?: unknown
    played_at?: unknown
    note?: unknown
  } | null
  if (!body) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 })
  }

  // Validate rating
  let rating: number | null = null
  if ('rating' in body) {
    if (body.rating === null || body.rating === 0) {
      rating = null
    } else if (typeof body.rating === 'number' && body.rating >= 1 && body.rating <= 10 && Number.isInteger(body.rating)) {
      rating = body.rating
    } else {
      return NextResponse.json({ error: 'Rating must be an integer between 1 and 10, or null' }, { status: 400 })
    }
  }

  // Validate played_at
  let playedAt: string | null = null
  if ('played_at' in body) {
    if (body.played_at === null || body.played_at === '') {
      playedAt = null
    } else if (typeof body.played_at === 'string' && DATE_REGEX.test(body.played_at)) {
      // Sanity check: not after today
      const d = new Date(body.played_at)
      if (isNaN(d.getTime())) {
        return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
      }
      playedAt = body.played_at
    } else {
      return NextResponse.json({ error: 'played_at must be YYYY-MM-DD' }, { status: 400 })
    }
  }

  // Validate note
  let note: string | null = null
  if ('note' in body) {
    if (body.note === null || body.note === '') {
      note = null
    } else if (typeof body.note === 'string') {
      const trimmed = body.note.trim()
      if (trimmed.length === 0) {
        note = null
      } else if (trimmed.length > NOTE_MAX) {
        return NextResponse.json({ error: `Note exceeds ${NOTE_MAX} characters` }, { status: 400 })
      } else {
        note = trimmed
      }
    }
  }

  // Admin client for the actual UPDATE — rounds RLS only allows SELECT for
  // everyone + INSERT for auth.uid()=user_id. No UPDATE policy means only
  // service role can modify rows; we own the ownership check here.
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // 1. Fetch the round + verify ownership + verify it's a parent round.
  const { data: round } = await adminSupabase
    .from('rounds')
    .select('id, user_id, played_at, parent_round_id')
    .eq('id', roundId)
    .single()

  if (!round) {
    return NextResponse.json({ error: 'Round not found' }, { status: 404 })
  }
  if (round.user_id !== user.id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }
  if (round.parent_round_id != null) {
    return NextResponse.json({
      error: 'This round is part of a combo and is updated automatically with the parent round.',
    }, { status: 400 })
  }

  // 2. Build the patch payload. Only include fields that were sent.
  const patch: Record<string, unknown> = {}
  if ('rating' in body) patch.rating = rating
  if ('played_at' in body) patch.played_at = playedAt
  if ('note' in body) patch.note = note

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 })
  }

  // 3. Apply the UPDATE on the parent round.
  const { error: updErr } = await adminSupabase
    .from('rounds')
    .update(patch)
    .eq('id', roundId)
  if (updErr) {
    console.error('[rounds/PATCH] update failed', updErr)
    return NextResponse.json({ error: updErr.message }, { status: 500 })
  }

  // 4. Cascade played_at to synthetic loop-children if the date changed.
  //    Rating + note stay parent-only (synthetic rounds were never logged
  //    directly, so they shouldn't gain a rating just because the parent
  //    got one).
  if ('played_at' in patch && playedAt !== (round.played_at as string | null)) {
    const { error: cascadeErr } = await adminSupabase
      .from('rounds')
      .update({ played_at: playedAt })
      .eq('parent_round_id', roundId)
    if (cascadeErr) {
      console.error('[rounds/PATCH] cascade failed', cascadeErr)
      // Don't fail the request — the parent is already updated.
    }
  }

  // 5. Re-evaluate earned badges. Changing a rating doesn't affect badge
  //    criteria today, but changing played_at could (date-windowed badges
  //    like 'rounds in 30 days'). Mirrors the rounds/delete revoke logic.
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
      userData,
    )
    if (!stillEarned) {
      removedBadgeNames.push(b.name)
      removedBadgeIds.push(b.id)
    }
  }
  if (removedBadgeIds.length > 0) {
    const { error: revokeErr } = await adminSupabase
      .from('user_badges')
      .delete()
      .eq('user_id', user.id)
      .in('badge_id', removedBadgeIds)
    if (revokeErr) {
      console.error('[rounds/PATCH] badge revoke failed:', revokeErr)
    }
  }

  return NextResponse.json({
    success: true,
    removed_badges: removedBadgeNames,
  })
}
