import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SYSTEM_USER_ID } from '@/lib/constants'
import { fetchRoundsForCourseCounts } from '@/lib/counts'
import FriendsPageClient from '@/components/FriendsPageClient'
import type { FriendEntry, PendingRequest } from '@/components/FriendsPageClient'

/**
 * SocialFriendsView — the "Friends" subtab on /social.
 *
 * Same data-fetch pattern as /friends/page.tsx but rendered without the
 * top-bar / outer wrapper chrome; /social/page.tsx owns those. The
 * "Companions / Friends / Leaderboard →" header block is dropped because
 * the SubTab row already provides the section label, and Leaderboard is
 * now a sibling subtab so the redirect link is redundant.
 */

export default async function SocialFriendsView() {
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
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/welcome')

  const [acceptedResult, pendingResult] = await Promise.all([
    adminSupabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted'),

    adminSupabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'pending'),
  ])

  const acceptedRowsRaw = acceptedResult.data ?? []
  const pendingRowsRaw = pendingResult.data ?? []

  const isNonSystem = (f: { user_id: unknown; friend_id: unknown }) =>
    f.user_id !== SYSTEM_USER_ID && f.friend_id !== SYSTEM_USER_ID

  const acceptedRows = acceptedRowsRaw.filter(isNonSystem)
  const pendingRows = pendingRowsRaw.filter(isNonSystem)

  const friendUserIds = acceptedRows.map((f) =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const pendingUserIds = pendingRows.map((f) =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const allUserIds = [...new Set([...friendUserIds, ...pendingUserIds])]

  const [profilesResult, roundsResult] = await Promise.all([
    allUserIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, home_club, handicap, avatar_url').in('id', allUserIds)
      : Promise.resolve({ data: [] }),

    allUserIds.length > 0
      ? fetchRoundsForCourseCounts(adminSupabase, allUserIds)
      : Promise.resolve({ data: [] }),
  ])

  const allClubs = [...new Set((profilesResult.data ?? []).map((p) => p.home_club as string).filter(Boolean))]
  const clubCountriesResult = allClubs.length > 0
    ? await adminSupabase.from('courses').select('club, country').in('club', allClubs)
    : { data: [] }

  const profileMap = new Map(
    (profilesResult.data ?? []).map((p) => [
      p.id as string,
      {
        fullName: (p.full_name as string | null) ?? 'Golfer',
        homeClub: p.home_club as string | null,
        handicap: p.handicap as number | null,
        avatarUrl: (p.avatar_url as string) ?? null,
      },
    ])
  )

  const roundsByUser = new Map<string, Set<string>>()
  for (const r of roundsResult.data ?? []) {
    const uid = r.user_id as string
    const set = roundsByUser.get(uid) ?? new Set()
    set.add(r.course_id as string)
    roundsByUser.set(uid, set)
  }

  const clubCountryMap = new Map<string, string>()
  for (const row of (clubCountriesResult as { data: { club: string; country: string }[] | null }).data ?? []) {
    if (row.club && row.country && !clubCountryMap.has(row.club)) {
      clubCountryMap.set(row.club, row.country)
    }
  }

  const friends: FriendEntry[] = acceptedRows.map((f) => {
    const friendId = (f.user_id === user.id ? f.friend_id : f.user_id) as string
    const p = profileMap.get(friendId)
    const country = p?.homeClub ? clubCountryMap.get(p.homeClub) ?? null : null
    return {
      friendshipId: f.id as string,
      userId: friendId,
      fullName: p?.fullName ?? 'Golfer',
      homeClub: p?.homeClub ?? null,
      country,
      handicap: p?.handicap ?? null,
      courseCount: roundsByUser.get(friendId)?.size ?? 0,
      avatarUrl: p?.avatarUrl ?? null,
    }
  })

  const pending: PendingRequest[] = pendingRows.map((f) => {
    const isOutgoing = f.user_id === user.id
    const otherUserId = (isOutgoing ? f.friend_id : f.user_id) as string
    const p = profileMap.get(otherUserId)
    return {
      friendshipId: f.id as string,
      userId: otherUserId,
      fullName: p?.fullName ?? 'Golfer',
      homeClub: p?.homeClub ?? null,
      direction: isOutgoing ? 'outgoing' as const : 'incoming' as const,
    }
  })

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <FriendsPageClient
        currentUserId={user.id}
        friends={friends}
        pending={pending}
      />
    </div>
  )
}
