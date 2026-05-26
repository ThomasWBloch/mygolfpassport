import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getContinent } from '@/lib/continents'
import { SYSTEM_USER_ID } from '@/lib/constants'
import LeaderboardTabs from '@/components/LeaderboardTabs'
import type { LeaderboardUser } from '@/components/LeaderboardTabs'

/**
 * SocialLeaderboardView — the "Leaderboard" subtab on /social.
 *
 * Data fetch copied 1:1 from /leaderboard/page.tsx. Top-bar / outer wrapper
 * are owned by /social/page.tsx. The "Standings / Leaderboard / Premium"
 * eyebrow+title block is dropped because the SubTab already names the
 * section; the Premium-pill messaging is deferred (the legacy /leaderboard
 * page still carries it for users who deep-link, and Trin 8 will need to
 * decide where to surface it within the /social shell).
 */

export default async function SocialLeaderboardView() {
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

  const [profileResult, acceptedResult, pendingResult] = await Promise.all([
    supabase.from('profiles').select('full_name, home_club, home_country').eq('id', user.id).single(),
    adminSupabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted'),
    adminSupabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'pending'),
  ])

  const myProfile = profileResult.data
  const myHomeClub = myProfile?.home_club ?? null

  const friendIds = new Set(
    (acceptedResult.data ?? []).map((f) =>
      f.user_id === user.id ? f.friend_id : f.user_id
    )
  )

  const pendingMap = new Map<string, { friendshipId: string; direction: 'sent' | 'received' }>()
  for (const f of pendingResult.data ?? []) {
    const isSent = f.user_id === user.id
    const otherId = (isSent ? f.friend_id : f.user_id) as string
    pendingMap.set(otherId, {
      friendshipId: f.id as string,
      direction: isSent ? 'sent' : 'received',
    })
  }

  const [allProfilesResult, allRoundsResult] = await Promise.all([
    adminSupabase.from('profiles').select('id, full_name, home_club, home_country, avatar_url').neq('id', SYSTEM_USER_ID),
    adminSupabase.from('rounds').select('user_id, course_id, courses(country)'),
  ])

  const allProfiles = allProfilesResult.data ?? []
  const allRounds = allRoundsResult.data ?? []

  const myCountry = (myProfile?.home_country as string | null) ?? null
  const myContinent = myCountry ? getContinent(myCountry) : null

  const userRoundsMap = new Map<string, typeof allRounds>()
  for (const r of allRounds) {
    const uid = r.user_id as string
    const arr = userRoundsMap.get(uid) ?? []
    arr.push(r)
    userRoundsMap.set(uid, arr)
  }

  const users: LeaderboardUser[] = allProfiles.map((p) => {
    const uid = p.id as string
    const rounds = userRoundsMap.get(uid) ?? []
    const courseIds = new Set(rounds.map((r) => r.course_id as string))
    const courseCount = courseIds.size
    const countries = new Set(
      rounds
        .map((r) => (r.courses as unknown as { country: string } | null)?.country)
        .filter(Boolean)
    )
    const countryCount = countries.size

    const userClub = p.home_club as string | null
    const userCountry = (p.home_country as string | null) ?? null
    const userContinent = userCountry ? getContinent(userCountry) : null

    const pending = pendingMap.get(uid) ?? null
    const isFriend = friendIds.has(uid)
    let friendshipStatus: LeaderboardUser['friendshipStatus']
    if (isFriend) friendshipStatus = 'friend'
    else if (pending?.direction === 'sent') friendshipStatus = 'pending_sent'
    else if (pending?.direction === 'received') friendshipStatus = 'pending_received'
    else friendshipStatus = 'none'

    return {
      userId: uid,
      fullName: (p.full_name as string | null) ?? 'Golfer',
      homeClub: userClub,
      homeCountry: userCountry,
      courseCount,
      countryCount,
      avatarUrl: (p.avatar_url as string) ?? null,
      isFriend,
      friendshipStatus,
      friendshipId: pending?.friendshipId ?? null,
      sameClub: myHomeClub != null && userClub === myHomeClub,
      sameCountry: myCountry != null && userCountry === myCountry,
      sameContinent: myContinent != null && userContinent === myContinent,
    }
  })

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <LeaderboardTabs
        users={users}
        currentUserId={user.id}
        hasHomeClub={myHomeClub != null}
        hasCountry={myCountry != null}
      />
    </div>
  )
}
