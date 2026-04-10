import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import ClubAffiliationToggle from '@/components/ClubAffiliationToggle'
import GolfersListAccordion from '@/components/GolfersListAccordion'
import type { GolferEntry } from '@/components/GolfersListAccordion'

const STAR = '★'
const EMPTY = '☆'

function stars(avg: number | null): string {
  if (avg == null) return ''
  const r = Math.round(avg)
  return STAR.repeat(r) + EMPTY.repeat(5 - r)
}

export default async function ClubPage({ params }: { params: Promise<{ club: string }> }) {
  const { club: clubSlug } = await params
  const clubName = decodeURIComponent(clubSlug)
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

  // ── Step 1: fetch courses for this club ──────────────────────────────────
  const { data: courseRows } = await supabase
    .from('courses')
    .select('id, name, holes, par, country, flag')
    .eq('club', clubName)
    .order('name')

  if (!courseRows || courseRows.length === 0) notFound()

  const courseIds = courseRows.map(c => c.id)
  const representative = courseRows[0]

  // ── Step 2: parallel social + stat queries ───────────────────────────────
  const [
    ratingsResult,
    userPlayedResult,
    affiliationsResult,
    clubRoundsResult,
    friendshipsResult,
    profileResult,
  ] = await Promise.all([
    // Average rating per course
    supabase
      .from('rounds')
      .select('course_id, rating')
      .in('course_id', courseIds)
      .not('rating', 'is', null),

    // Courses the current user has played
    supabase
      .from('rounds')
      .select('course_id')
      .eq('user_id', user!.id)
      .in('course_id', courseIds),

    // Users affiliated with any course in this club
    adminSupabase
      .from('course_affiliations')
      .select('user_id')
      .in('course_id', courseIds),

    // All rounds on any course in this club (distinct by user)
    supabase
      .from('rounds')
      .select('user_id')
      .in('course_id', courseIds),

    // Current user's accepted friendships
    supabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${user!.id},friend_id.eq.${user!.id}`)
      .eq('status', 'accepted'),

    // Profile for topbar initials
    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user!.id)
      .single(),
  ])

  // ── Derived stats ────────────────────────────────────────────────────────
  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  // Per-course average ratings
  const ratingsByCoruse = new Map<string, number[]>()
  for (const r of ratingsResult.data ?? []) {
    const arr = ratingsByCoruse.get(r.course_id) ?? []
    arr.push(r.rating as number)
    ratingsByCoruse.set(r.course_id, arr)
  }

  const userPlayedIds = new Set((userPlayedResult.data ?? []).map(r => r.course_id as string))
  const isAffiliated = (affiliationsResult.data ?? []).some(a => a.user_id === user!.id)

  // ── Profiles for social sections (admin to bypass RLS) ───────────────────
  const affiliateUserIds = [...new Set((affiliationsResult.data ?? []).map(a => a.user_id as string))]
  const golferUserIds    = [...new Set((clubRoundsResult.data ?? []).map(r => r.user_id as string).filter(id => id !== user!.id))]
  const allProfileIds    = [...new Set([...affiliateUserIds, ...golferUserIds])]

  const { data: profileRows } = allProfileIds.length > 0
    ? await adminSupabase
        .from('profiles')
        .select('id, full_name, handicap')
        .in('id', allProfileIds)
    : { data: [] }

  const profileMap = new Map(
    (profileRows ?? []).map(p => [p.id, { fullName: p.full_name ?? 'Anonym', handicap: p.handicap as number | null }])
  )

  // Friends set
  const friendIds = new Set(
    (friendshipsResult.data ?? []).map(f =>
      f.user_id === user!.id ? f.friend_id : f.user_id
    )
  )

  // Accordions
  const members: GolferEntry[] = affiliateUserIds
    .filter(id => id !== user!.id)
    .map(id => profileMap.get(id) ?? { fullName: 'Anonym', handicap: null })

  const allGolfers: GolferEntry[] = golferUserIds
    .map(id => profileMap.get(id) ?? { fullName: 'Anonym', handicap: null })

  const friendGolfers: GolferEntry[] = golferUserIds
    .filter(id => friendIds.has(id))
    .map(id => profileMap.get(id) ?? { fullName: 'Ven', handicap: null })

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
          <Link href="/map" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Kort
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                {clubName}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 6 }}>
                {representative.country} {representative.flag ?? ''}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4 }}>
                {courseRows.length} {courseRows.length === 1 ? 'bane' : 'baner'}
              </div>
            </div>
            <span style={{ fontSize: 44, flexShrink: 0 }}>{representative.flag ?? '🏌️'}</span>
          </div>
        </div>

        {/* Courses list */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Baner
          </div>
          {courseRows.map((c, i) => {
            const ratings = ratingsByCoruse.get(c.id) ?? []
            const avg = ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : null
            const played = userPlayedIds.has(c.id)

            return (
              <div
                key={c.id}
                style={{
                  padding: '12px 16px',
                  borderTop: i === 0 ? '1px solid #f3f4f6' : 'none',
                  borderBottom: i < courseRows.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={`/courses/${c.id}`}
                    style={{ fontSize: 14, fontWeight: 700, color: '#1a5c38', textDecoration: 'none' }}
                  >
                    {c.name}
                  </Link>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {[c.holes && `${c.holes} huller`, c.par && `Par ${c.par}`].filter(Boolean).join(' · ')}
                    {avg != null && (
                      <span style={{ color: '#c9a84c', fontSize: 11 }}>{stars(avg)}</span>
                    )}
                    {avg != null && (
                      <span style={{ color: '#9ca3af', fontSize: 11 }}>({ratings.length})</span>
                    )}
                  </div>
                </div>
                {played ? (
                  <span style={{ fontSize: 18, color: '#1a5c38', flexShrink: 0 }}>✓</span>
                ) : (
                  <Link
                    href={`/courses/${c.id}`}
                    style={{
                      background: '#1a5c38', color: '#fff',
                      borderRadius: 10, padding: '6px 12px',
                      fontSize: 12, fontWeight: 700, textDecoration: 'none',
                      flexShrink: 0,
                    }}
                  >
                    Se bane →
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Membership toggle */}
        <ClubAffiliationToggle
          userId={user!.id}
          courseIds={courseIds}
          initialAffiliated={isAffiliated}
        />

        {/* Social accordions */}
        <GolfersListAccordion
          title="Klubmedlemmer"
          emoji="🏠"
          golfers={members}
          accentColor="#c9a84c"
          accentText="#7a5a00"
          borderColor="#e5e7eb"
        />

        <GolfersListAccordion
          title="Golfere der har spillet"
          emoji="⛳"
          golfers={allGolfers}
          accentColor="#1a5c38"
          accentText="#fff"
          borderColor="#e5e7eb"
        />

        <GolfersListAccordion
          title="Venner der har spillet"
          emoji="👥"
          golfers={friendGolfers}
          accentColor="#1a5c38"
          accentText="#fff"
          borderColor="#a7d5b8"
        />

      </div>
    </div>
  )
}
