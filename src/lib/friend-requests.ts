import type { SupabaseClient } from '@supabase/supabase-js'
import { SYSTEM_USER_ID } from '@/lib/constants'
import type { PendingRequest } from '@/components/FriendsPageClient'

/**
 * fetchPendingRequests — shared loader for the pending friend-request data.
 *
 * Returns both incoming and outgoing requests for `userId`, with the SYSTEM
 * user filtered out (system never participates in friend mechanics). Used
 * by both /social?tab=friends (which renders the full Friends UI) and the
 * FriendRequestsBanner on /social + /, so the same shape lands in both
 * surfaces without re-implementing the join.
 *
 * Pass an admin (service-role) client so cross-user profile reads bypass
 * RLS — the user-scoped client cannot SELECT profile rows for someone
 * they aren't friends with yet, which would null out request senders'
 * names.
 */

export async function fetchPendingRequests(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ incoming: PendingRequest[]; outgoing: PendingRequest[] }> {
  const pendingResult = await supabase
    .from('friendships')
    .select('id, user_id, friend_id')
    .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
    .eq('status', 'pending')

  const pendingRows = (pendingResult.data ?? []).filter(
    (f: { user_id: unknown; friend_id: unknown }) =>
      f.user_id !== SYSTEM_USER_ID && f.friend_id !== SYSTEM_USER_ID
  )

  if (pendingRows.length === 0) {
    return { incoming: [], outgoing: [] }
  }

  const otherIds = pendingRows.map((f) =>
    (f.user_id === userId ? f.friend_id : f.user_id) as string
  )
  const uniqueIds = [...new Set(otherIds)]

  const profilesResult = await supabase
    .from('profiles')
    .select('id, full_name, home_club')
    .in('id', uniqueIds)

  const profileMap = new Map(
    (profilesResult.data ?? []).map((p: { id: unknown; full_name: unknown; home_club: unknown }) => [
      p.id as string,
      {
        fullName: (p.full_name as string | null) ?? 'Golfer',
        homeClub: (p.home_club as string | null) ?? null,
      },
    ])
  )

  const requests: PendingRequest[] = pendingRows.map((f) => {
    const isOutgoing = f.user_id === userId
    const otherUserId = (isOutgoing ? f.friend_id : f.user_id) as string
    const p = profileMap.get(otherUserId)
    return {
      friendshipId: f.id as string,
      userId: otherUserId,
      fullName: p?.fullName ?? 'Golfer',
      homeClub: p?.homeClub ?? null,
      direction: isOutgoing ? ('outgoing' as const) : ('incoming' as const),
    }
  })

  const incoming = requests.filter((r) => r.direction === 'incoming')
  const outgoing = requests.filter((r) => r.direction === 'outgoing')

  return { incoming, outgoing }
}
