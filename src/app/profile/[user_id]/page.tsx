import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

const STAR = '★'
const EMPTY = '☆'

function stars(n: number): string {
  const r = Math.round(n)
  return STAR.repeat(r) + EMPTY.repeat(5 - r)
}

interface Badge {
  key: string
  label: string
  emoji: string
  earned: boolean
  description: string
}

export default async function PublicProfilePage({ params }: { params: Promise<{ user_id: string }> }) {
  const { user_id: targetId } = await params
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

  const [profileResult, viewerProfileResult, roundsResult] = await Promise.all([
    // Target user's profile (admin to bypass RLS)
    adminSupabase
      .from('profiles')
      .select('full_name, handicap, home_club, show_course_count')
      .eq('id', targetId)
      .single(),

    // Viewer's profile for initials
    user
      ? supabase.from('profiles').select('full_name').eq('id', user.id).single()
      : Promise.resolve({ data: null }),

    // Target's rounds (admin to bypass RLS)
    adminSupabase
      .from('rounds')
      .select('course_id, courses(country, is_major)')
      .eq('user_id', targetId),
  ])

  if (!profileResult.data) notFound()

  const profile = profileResult.data
  const rounds = roundsResult.data ?? []
  const courseIds = [...new Set(rounds.map(r => r.course_id as string))]
  const roundCount = courseIds.length

  // Countries
  const countrySet = new Set(
    rounds
      .map(r => (r.courses as unknown as { country: string } | null)?.country)
      .filter(Boolean)
  )
  const countryCount = countrySet.size

  // Major Hunter
  const hasPlayedMajor = rounds.some(
    r => (r.courses as unknown as { is_major: boolean } | null)?.is_major === true
  )

  // Top 100
  let hasTop100 = false
  if (courseIds.length > 0) {
    const { count } = await adminSupabase
      .from('top100_rankings')
      .select('*', { count: 'exact', head: true })
      .in('course_id', courseIds)
    hasTop100 = (count ?? 0) > 0
  }

  const fullName = profile.full_name ?? 'Golfer'

  const badges: Badge[] = [
    { key: 'first-tee',         label: 'First Tee',         emoji: '⛳', earned: roundCount >= 1,   description: 'Log your first course' },
    { key: 'border-crosser',    label: 'Border Crosser',    emoji: '🌍', earned: countryCount >= 2, description: 'Play in 2 countries' },
    { key: 'getting-started',   label: 'Getting Started',   emoji: '🏌️', earned: roundCount >= 10,  description: 'Log 10 courses' },
    { key: 'european-explorer', label: 'European Explorer', emoji: '🗺️', earned: countryCount >= 5, description: 'Play in 5 countries' },
    { key: 'seasoned-golfer',   label: 'Seasoned Golfer',   emoji: '🎖️', earned: roundCount >= 50,  description: 'Log 50 courses' },
    { key: 'century-club',      label: 'Century Club',      emoji: '💯', earned: roundCount >= 100, description: 'Log 100 courses' },
    { key: 'major-hunter',      label: 'Major Hunter',      emoji: '🏆', earned: hasPlayedMajor,    description: 'Play a Major course' },
    { key: 'top-100',           label: 'Top 100',           emoji: '⭐', earned: hasTop100,          description: 'Play a Top 100 course' },
  ]

  const initials = computeInitials(
    (viewerProfileResult as { data: { full_name?: string } | null }).data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

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
          <Link href="javascript:history.back()" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Back
          </Link>
          {user && <ProfileButton initials={initials} />}
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Hero card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {computeInitials(fullName, undefined)}
            </div>
            <div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, lineHeight: 1.2 }}>{fullName}</div>
              {profile.handicap != null && (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                  HCP <span style={{ color: '#c9a84c', fontWeight: 700 }}>{profile.handicap}</span>
                </div>
              )}
              {profile.home_club && (
                <div style={{ marginTop: 4 }}>
                  <Link
                    href={`/clubs/${encodeURIComponent(profile.home_club)}`}
                    style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, textDecoration: 'none' }}
                  >
                    🏠 {profile.home_club}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {profile.show_course_count && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '16px 20px', display: 'flex', gap: 0 }}>
            <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #f3f4f6' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1a5c38' }}>{roundCount}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Courses</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1a5c38' }}>{countryCount}</div>
              <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>Countries</div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px 8px', fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Badges earned
          </div>
          <div style={{ padding: '0 12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {badges.map(b => (
              <div
                key={b.key}
                title={b.description}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  padding: '10px 6px', borderRadius: 10,
                  background: b.earned ? '#f0fdf4' : '#f9fafb',
                  border: `1px solid ${b.earned ? '#a7d5b8' : '#e5e7eb'}`,
                  opacity: b.earned ? 1 : 0.45,
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 24 }}>{b.emoji}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: b.earned ? '#1a5c38' : '#9ca3af', textAlign: 'center', lineHeight: 1.2 }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
