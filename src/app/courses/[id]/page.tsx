import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import CourseAffiliationToggle from '@/components/CourseAffiliationToggle'
import CourseReviewsAccordion from '@/components/CourseReviewsAccordion'
import type { Review } from '@/components/CourseReviewsAccordion'
import ClubMembersAccordion from '@/components/ClubMembersAccordion'
import type { ClubMember } from '@/components/ClubMembersAccordion'

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  // Service role client — bypasses RLS for cross-user profile reads.
  // Falls back to the anon client if the key isn't configured in this environment.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()

  const [courseResult, ratingsResult, userRoundResult, profileResult, top100Result] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, flag, is_major, holes, par, website, phone, address, founded_year')
      .eq('id', id)
      .single(),

    supabase
      .from('rounds')
      .select('rating')
      .eq('course_id', id)
      .not('rating', 'is', null),

    supabase
      .from('rounds')
      .select('rating, note, played_at, created_at')
      .eq('user_id', user!.id)
      .eq('course_id', id)
      .order('created_at', { ascending: false })
      .limit(1),

    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),

    supabase
      .from('top100_rankings')
      .select('rank, list_name, year')
      .eq('course_id', id)
      .order('year', { ascending: false })
      .limit(1),
  ])

  if (!courseResult.data) notFound()
  const course = courseResult.data

  // Social queries — run after we know the course exists
  // rounds.user_id → auth.users, not profiles, so we join manually in two steps
  const [affiliationResult, courseRoundsResult, clubMembersResult] = await Promise.all([
    supabase
      .from('course_affiliations')
      .select('id')
      .eq('user_id', user!.id)
      .eq('course_id', id)
      .limit(1),

    supabase
      .from('rounds')
      .select('user_id, rating, note, played_at')
      .eq('course_id', id)
      .order('played_at', { ascending: false }),

    course.club
      ? adminSupabase
          .from('profiles')
          .select('full_name, handicap')
          .eq('home_club', course.club)
          .neq('id', user!.id)
          .eq('show_in_search', true)
      : Promise.resolve({ data: [] }),
  ])

  // Fetch profiles for the round authors — use admin client to bypass RLS
  const roundRows = courseRoundsResult.data ?? []

  const uniqueUserIds = [...new Set(roundRows.map(r => r.user_id as string))]
  const profilesFetch = uniqueUserIds.length > 0
    ? await adminSupabase
        .from('profiles')
        .select('id, full_name')
        .in('id', uniqueUserIds)
    : { data: [], error: null }
  const roundProfilesData = profilesFetch.data ?? []

  const ratings = (ratingsResult.data ?? []).map(r => r.rating as number)
  const avgRating = ratings.length > 0
    ? Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length)
    : null

  const userRound = (userRoundResult.data ?? [])[0] ?? null
  const top100 = (top100Result.data ?? [])[0] ?? null

  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const isAffiliated = (affiliationResult.data ?? []).length > 0

  const profileNameMap = new Map(
    roundProfilesData.map(p => [p.id, p.full_name ?? 'Anonym'])
  )

  const reviews: Review[] = roundRows.map(r => ({
    fullName: profileNameMap.get(r.user_id as string) ?? 'Anonym',
    rating: r.rating as number | null,
    note: r.note as string | null,
    playedAt: r.played_at as string | null,
  }))

  const clubMembers: ClubMember[] = (clubMembersResult.data ?? []).map(m => ({
    fullName: (m as unknown as { full_name: string; handicap: number | null }).full_name ?? 'Golfspiller',
    handicap: (m as unknown as { full_name: string; handicap: number | null }).handicap,
  }))

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  function formatDate(iso: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function stripProtocol(url: string): string {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }

  const mapsUrl = course.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(course.address)}`
    : null

  // Build info rows — only include rows with values
  const infoRows: { icon: string; label: string; content: React.ReactNode }[] = []

  if (course.address) {
    infoRows.push({
      icon: '📍',
      label: 'Adresse',
      content: (
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{course.address}</div>
          <a
            href={mapsUrl!}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: '#1a5c38', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 3 }}
          >
            Vis på Google Maps →
          </a>
        </div>
      ),
    })
  }

  if (course.website) {
    infoRows.push({
      icon: '🌐',
      label: 'Website',
      content: (
        <a
          href={course.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
        >
          {stripProtocol(course.website)}
        </a>
      ),
    })
  }

  if (course.phone) {
    infoRows.push({
      icon: '📞',
      label: 'Telefon',
      content: (
        <a
          href={`tel:${course.phone}`}
          style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}
        >
          {course.phone}
        </a>
      ),
    })
  }

  if (course.founded_year) {
    infoRows.push({
      icon: '📅',
      label: 'Grundlagt',
      content: <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{course.founded_year}</span>,
    })
  }

  if (course.holes || course.par) {
    infoRows.push({
      icon: '⛳',
      label: 'Huller / Par',
      content: (
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
          {[course.holes && `${course.holes} huller`, course.par && `Par ${course.par}`].filter(Boolean).join(' · ')}
        </span>
      ),
    })
  }

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

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

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
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                {course.name}
              </div>
              {course.club && (
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 }}>
                  {course.club}
                </div>
              )}
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 4 }}>
                {course.country} {course.flag ?? ''}
              </div>

              {/* Badges row */}
              {(course.is_major || top100) && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {course.is_major && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8,
                      background: '#c9a84c', color: '#7a5a00',
                    }}>
                      Major venue
                    </span>
                  )}
                  {top100 && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8,
                      background: 'rgba(255,255,255,0.15)', color: '#fff',
                      border: '1px solid rgba(255,255,255,0.3)',
                    }}>
                      Top 100{top100.rank ? ` · #${top100.rank}` : ''}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span style={{ fontSize: 44, flexShrink: 0 }}>{course.flag ?? '🌍'}</span>
          </div>
        </div>

        {/* Average rating */}
        {ratings.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '14px 16px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
              Anmeldelser
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 30, color: '#c9a84c', fontWeight: 700, lineHeight: 1 }}>
                {avgRating != null ? avgRating.toFixed(1) : '–'}
              </span>
              <div>
                <div style={{ fontSize: 16, color: '#c9a84c' }}>
                  {avgRating != null ? '★'.repeat(avgRating) + '☆'.repeat(5 - avgRating) : ''}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
                  baseret på {ratings.length} {ratings.length === 1 ? 'runde' : 'runder'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info card */}
        {infoRows.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {infoRows.map(({ icon, label, content }, i) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  padding: '13px 16px', gap: 12,
                  borderBottom: i < infoRows.length - 1 ? '1px solid #f3f4f6' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{label}</span>
                </div>
                <div style={{ textAlign: 'right', flex: 1 }}>{content}</div>
              </div>
            ))}
          </div>
        )}

        {/* Already-logged banner */}
        {userRound && (
          <div style={{
            background: '#e8f5ee', border: '1px solid #a7d5b8',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1a5c38' }}>Du har spillet denne bane</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {(userRound.played_at || userRound.created_at) && (
                <div style={{ fontSize: 13, color: '#2a7a4f' }}>
                  📅 {formatDate(userRound.played_at ?? userRound.created_at)}
                </div>
              )}
              {userRound.rating != null && userRound.rating > 0 && (
                <div style={{ fontSize: 13, color: '#2a7a4f' }}>
                  {'★'.repeat(userRound.rating)}{'☆'.repeat(5 - userRound.rating)}
                  <span style={{ color: '#6b7280', marginLeft: 6 }}>din rating</span>
                </div>
              )}
              {userRound.note && (
                <div style={{ fontSize: 13, color: '#374151', fontStyle: 'italic', marginTop: 2 }}>
                  "{userRound.note}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Affiliation toggle */}
        <CourseAffiliationToggle
          userId={user!.id}
          courseId={id}
          initialAffiliated={isAffiliated}
        />

        {/* Golfers who played this course */}
        <CourseReviewsAccordion reviews={reviews} />

        {/* Club members with the app */}
        {course.club && (
          <ClubMembersAccordion members={clubMembers} clubName={course.club} />
        )}

        {/* CTA button */}
        <Link
          href={`/log?course=${id}`}
          style={{
            background: '#1a5c38', color: '#fff', borderRadius: 14,
            padding: 16, fontSize: 16, fontWeight: 700,
            display: 'block', textAlign: 'center', textDecoration: 'none',
          }}
        >
          {userRound ? '⛳ Log igen / opdater anmeldelse' : '⛳ Log denne bane'}
        </Link>
      </div>
    </div>
  )
}
