import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import { SYSTEM_USER_ID } from '@/lib/constants'
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
    // Use admin client to bypass RLS — ensures we see both directions
    adminSupabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq('status', 'accepted'),

    // Use admin client to bypass RLS — ensures we see both sent and received requests
    adminSupabase
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
  // Filter out the SYSTEM_USER_ID (audit #14): the system account
  // ("My Golf Passport") is used for notification messages and should never
  // appear in the friends UI as a real connection or pending request.
  const acceptedRowsRaw = acceptedResult.data ?? []
  const pendingRowsRaw = pendingResult.data ?? []

  const isNonSystem = (f: { user_id: unknown; friend_id: unknown }) =>
    f.user_id !== SYSTEM_USER_ID && f.friend_id !== SYSTEM_USER_ID

  const acceptedRows = acceptedRowsRaw.filter(isNonSystem)
  const pendingRows = pendingRowsRaw.filter(isNonSystem)

  const friendUserIds = acceptedRows.map(f =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const pendingUserIds = pendingRows.map(f =>
    f.user_id === user.id ? f.friend_id : f.user_id
  ) as string[]

  const allUserIds = [...new Set([...friendUserIds, ...pendingUserIds])]

  // ── Fetch profiles + round counts for all related users ──────────────────
  const [profilesResult, roundsResult] = await Promise.all([
    allUserIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, home_club, handicap, avatar_url').in('id', allUserIds)
      : Promise.resolve({ data: [] }),

    allUserIds.length > 0
      ? adminSupabase.from('rounds').select('user_id, course_id').in('user_id', allUserIds)
      : Promise.resolve({ data: [] }),
  ])

  // Get countries for home clubs — extract clubs from already-fetched profiles
  const allClubs = [...new Set((profilesResult.data ?? []).map(p => p.home_club as string).filter(Boolean))]
  const clubCountriesResult = allClubs.length > 0
    ? await adminSupabase.from('courses').select('club, country').in('club', allClubs)
    : { data: [] }

  const profileMap = new Map(
    (profilesResult.data ?? []).map(p => [
      p.id as string,
      {
        fullName: (p.full_name as string | null) ?? 'Golfer',
        homeClub: p.home_club as string | null,
        handicap: p.handicap as number | null,
        avatarUrl: (p.avatar_url as string) ?? null,
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
      avatarUrl: p?.avatarUrl ?? null,
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar — Adventure chrome */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 14,
          }}>M</span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/" style={{
            color: 'var(--color-mgp-gold)',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>
            ← Home
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Eyebrow + display title */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 6,
          }}>
            Companions
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 24,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.3,
            }}>
              Friends
            </div>
            <Link
              href="/leaderboard"
              style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11, letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--color-mgp-cover)',
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              Leaderboard →
            </Link>
          </div>
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
