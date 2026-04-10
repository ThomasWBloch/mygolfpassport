import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import FriendsPageClient from '@/components/FriendsPageClient'
import type { FriendEntry, PendingRequest } from '@/components/FriendsPageClient'

export default async function FriendsPage() {
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
  if (!user) redirect('/login')

  // ── Fetch friendships + profile ──────────────────────────────────────────
  const [acceptedResult, pendingResult, profileResult] = await Promise.all([
    supabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted'),

    supabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'pending'),

    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
  ])

  const initials = computeInitials(
    profileResult.data?.full_name ?? user.user_metadata?.full_name,
    user.email
  )

  // ── Build friend user IDs ────────────────────────────────────────────────
  const acceptedRows = acceptedResult.data ?? []
  const pendingRows = pendingResult.data ?? []

  const friendUserIds = acceptedRows.map(f =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const pendingUserIds = pendingRows.map(f =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const allUserIds = [...new Set([...friendUserIds, ...pendingUserIds])]

  // ── Fetch profiles + round counts for all related users ──────────────────
  const [profilesResult, roundsResult, clubCountriesResult] = await Promise.all([
    allUserIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, home_club, handicap').in('id', allUserIds)
      : Promise.resolve({ data: [] }),

    allUserIds.length > 0
      ? adminSupabase.from('rounds').select('user_id, course_id').in('user_id', allUserIds)
      : Promise.resolve({ data: [] }),

    // Get countries for home clubs
    allUserIds.length > 0
      ? adminSupabase.from('profiles').select('home_club').in('id', allUserIds).not('home_club', 'is', null)
        .then(async ({ data: clubProfiles }) => {
          const clubs = [...new Set((clubProfiles ?? []).map(p => p.home_club as string).filter(Boolean))]
          if (clubs.length === 0) return { data: [] }
          return adminSupabase.from('courses').select('club, country').in('club', clubs)
        })
      : Promise.resolve({ data: [] }),
  ])

  const profileMap = new Map(
    (profilesResult.data ?? []).map(p => [
      p.id as string,
      {
        fullName: (p.full_name as string | null) ?? 'Golfer',
        homeClub: p.home_club as string | null,
        handicap: p.handicap as number | null,
      },
    ])
  )

  // Per-user course count
  const roundsByUser = new Map<string, Set<string>>()
  for (const r of roundsResult.data ?? []) {
    const uid = r.user_id as string
    const set = roundsByUser.get(uid) ?? new Set()
    set.add(r.course_id as string)
    roundsByUser.set(uid, set)
  }

  // Club → country mapping
  const clubCountryMap = new Map<string, string>()
  for (const row of (clubCountriesResult as { data: { club: string; country: string }[] | null }).data ?? []) {
    if (row.club && row.country && !clubCountryMap.has(row.club)) {
      clubCountryMap.set(row.club, row.country)
    }
  }

  // ── Build friend entries ─────────────────────────────────────────────────
  const friends: FriendEntry[] = acceptedRows.map(f => {
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
    }
  })

  // ── Build pending entries ────────────────────────────────────────────────
  const pending: PendingRequest[] = pendingRows.map(f => {
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

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', ...font }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Home
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a' }}>
            👥 Friends
          </div>
          <Link
            href="/leaderboard"
            style={{
              fontSize: 12, fontWeight: 600, color: '#1a5c38',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            🏆 Leaderboard →
          </Link>
        </div>

        <FriendsPageClient
          currentUserId={user.id}
          friends={friends}
          pending={pending}
        />
      </div>
    </div>
  )
}
