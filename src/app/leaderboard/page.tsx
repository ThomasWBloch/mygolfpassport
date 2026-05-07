import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import { getContinent } from '@/lib/continents'
import { SYSTEM_USER_ID } from '@/lib/constants'
import LeaderboardTabs from '@/components/LeaderboardTabs'
import type { LeaderboardUser } from '@/components/LeaderboardTabs'

export default async function LeaderboardPage() {
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

  // ── Batch 1: current user data ───────────────────────────────────────────
  const [profileResult, acceptedResult, pendingResult] = await Promise.all([
    supabase.from('profiles').select('full_name, home_club, home_country').eq('id', user.id).single(),
    // Use admin client to bypass RLS — ensures we see friendships in both directions
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

  const initials = computeInitials(
    myProfile?.full_name ?? user.user_metadata?.full_name,
    user.email
  )

  const friendIds = new Set(
    (acceptedResult.data ?? []).map(f =>
      f.user_id === user.id ? f.friend_id : f.user_id
    )
  )

  // Map: other userId → { friendshipId, direction }
  // direction 'sent'     = current user initiated (shows "Request sent")
  // direction 'received' = other user initiated (shows "Accept")
  const pendingMap = new Map<string, { friendshipId: string; direction: 'sent' | 'received' }>()
  for (const f of pendingResult.data ?? []) {
    const isSent = f.user_id === user.id
    const otherId = (isSent ? f.friend_id : f.user_id) as string
    pendingMap.set(otherId, {
      friendshipId: f.id as string,
      direction: isSent ? 'sent' : 'received',
    })
  }

  // ── Batch 2: all profiles + all rounds (admin to bypass RLS) ─────────────
  const [allProfilesResult, allRoundsResult] = await Promise.all([
    adminSupabase.from('profiles').select('id, full_name, home_club, home_country, avatar_url').neq('id', SYSTEM_USER_ID),
    adminSupabase.from('rounds').select('user_id, course_id, courses(country)'),
  ])

  const allProfiles = allProfilesResult.data ?? []
  const allRounds = allRoundsResult.data ?? []

  // ── Current user's home country + continent (from profiles.home_country) ─
  const myCountry = (myProfile?.home_country as string | null) ?? null
  const myContinent = myCountry ? getContinent(myCountry) : null

  // ── Build per-user stats ─────────────────────────────────────────────────
  // Group rounds by user
  const userRoundsMap = new Map<string, typeof allRounds>()
  for (const r of allRounds) {
    const uid = r.user_id as string
    const arr = userRoundsMap.get(uid) ?? []
    arr.push(r)
    userRoundsMap.set(uid, arr)
  }

  const users: LeaderboardUser[] = allProfiles.map(p => {
    const uid = p.id as string
    const rounds = userRoundsMap.get(uid) ?? []
    const courseIds = new Set(rounds.map(r => r.course_id as string))
    const courseCount = courseIds.size
    const countries = new Set(
      rounds
        .map(r => (r.courses as unknown as { country: string } | null)?.country)
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

        {/* Eyebrow + display title with premium pill */}
        <div>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 6,
          }}>
            Standings
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 24,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.3,
            }}>
              Leaderboard
            </div>
            <span style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10, fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              background: 'var(--color-mgp-gold-faint)',
              color: 'var(--color-mgp-gold-dark)',
              border: '1px solid var(--color-mgp-gold)',
              borderRadius: 6,
              padding: '3px 8px',
            }}>
              ⭐ Premium
            </span>
          </div>
        </div>

        <LeaderboardTabs
          users={users}
          currentUserId={user.id}
          hasHomeClub={myHomeClub != null}
          hasCountry={myCountry != null}
        />
      </div>
    </div>
  )
}
