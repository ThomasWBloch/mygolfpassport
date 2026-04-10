import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import CourseReviewsAccordion from '@/components/CourseReviewsAccordion'
import type { Review } from '@/components/CourseReviewsAccordion'
import FriendsWhoPlayedAccordion from '@/components/FriendsWhoPlayedAccordion'
import type { FriendRound } from '@/components/FriendsWhoPlayedAccordion'
import GolfersListAccordion from '@/components/GolfersListAccordion'
import type { GolferEntry } from '@/components/GolfersListAccordion'
import CollapsibleCard from '@/components/CollapsibleCard'

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

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )
    : supabase

  const { data: { user } } = await supabase.auth.getUser()

  // ── Batch 1: course + user-specific data ─────────────────────────────────
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

  // ── Batch 2: social data ──────────────────────────────────────────────────
  const [affiliationsResult, courseRoundsResult, friendshipsResult] = await Promise.all([
    // Users affiliated with this specific course
    supabase
      .from('course_affiliations')
      .select('user_id')
      .eq('course_id', id),

    // All rounds on this course (for "Andre der har spillet" + friends filter)
    supabase
      .from('rounds')
      .select('user_id, rating, note, played_at')
      .eq('course_id', id)
      .order('played_at', { ascending: false }),

    // Accepted friendships
    supabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${user!.id},friend_id.eq.${user!.id}`)
      .eq('status', 'accepted'),
  ])

  // ── Fetch profiles for all social sections in one admin call ─────────────
  const affiliateIds = (affiliationsResult.data ?? []).map(a => a.user_id as string)
  const roundRows    = courseRoundsResult.data ?? []
  const roundUserIds = roundRows.map(r => r.user_id as string)
  const allUserIds   = [...new Set([...affiliateIds, ...roundUserIds])]

  const { data: profileRows } = allUserIds.length > 0
    ? await adminSupabase
        .from('profiles')
        .select('id, full_name, handicap')
        .in('id', allUserIds)
    : { data: [] }

  const profileMap = new Map(
    (profileRows ?? []).map(p => [
      p.id,
      { fullName: (p.full_name as string | null) ?? 'Anonym', handicap: p.handicap as number | null },
    ])
  )

  // ── Derived values ────────────────────────────────────────────────────────
  const rawRatings  = (ratingsResult.data ?? []).map(r => r.rating as number)
  const avgRatingFloat = rawRatings.length > 0
    ? rawRatings.reduce((a, b) => a + b, 0) / rawRatings.length
    : null
  const avgRatingRounded = avgRatingFloat != null ? Math.round(avgRatingFloat) : null

  const userRound = (userRoundResult.data ?? [])[0] ?? null
  const top100    = (top100Result.data ?? [])[0] ?? null

  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const friendIds = new Set(
    (friendshipsResult.data ?? []).map(f =>
      f.user_id === user!.id ? f.friend_id : f.user_id
    )
  )

  // "Kender du et medlem?" — affiliates excluding current user
  const courseMembers: GolferEntry[] = affiliateIds
    .filter(uid => uid !== user!.id)
    .map(uid => ({ userId: uid, ...(profileMap.get(uid) ?? { fullName: 'Anonym', handicap: null }) }))

  // "Venner der har spillet"
  const friendRounds: FriendRound[] = roundRows
    .filter(r => friendIds.has(r.user_id as string))
    .map(r => ({
      userId:   r.user_id as string,
      fullName: profileMap.get(r.user_id as string)?.fullName ?? 'Ven',
      rating:   r.rating as number | null,
      note:     r.note as string | null,
      playedAt: r.played_at as string | null,
    }))

  // "Andre der har spillet" — everyone except current user
  const reviews: Review[] = roundRows
    .filter(r => (r.user_id as string) !== user!.id)
    .map(r => ({
      userId:   r.user_id as string,
      fullName: profileMap.get(r.user_id as string)?.fullName ?? 'Anonym',
      rating:   r.rating as number | null,
      note:     r.note as string | null,
      playedAt: r.played_at as string | null,
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

  const hasClubInfo = !!(course.address || course.website || course.phone || course.founded_year)

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

        {/* 1. Header card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
          borderRadius: 14, padding: 20, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
                {course.name}
              </div>

              {course.club && (
                <div style={{ marginTop: 5 }}>
                  <Link
                    href={`/clubs/${encodeURIComponent(course.club)}`}
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  >
                    {course.club} →
                  </Link>
                </div>
              )}

              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 4 }}>
                {[course.country, course.holes && `${course.holes} huller`, course.par && `Par ${course.par}`]
                  .filter(Boolean).join(' · ')}
                {course.flag && ` ${course.flag}`}
              </div>

              {(course.is_major || top100) && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                  {course.is_major && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: '#c9a84c', color: '#7a5a00' }}>
                      Major venue
                    </span>
                  )}
                  {top100 && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
                      Top 100{top100.rank ? ` · #${top100.rank}` : ''}
                    </span>
                  )}
                </div>
              )}
            </div>
            <span style={{ fontSize: 44, flexShrink: 0 }}>{course.flag ?? '🌍'}</span>
          </div>
        </div>

        {/* 2. Rating */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '16px 18px' }}>
          {rawRatings.length > 0 ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: '#c9a84c', lineHeight: 1 }}>
                  {avgRatingFloat!.toFixed(1)}
                </span>
                <div>
                  <div style={{ fontSize: 20, color: '#c9a84c', lineHeight: 1 }}>
                    {'★'.repeat(avgRatingRounded!)}{'☆'.repeat(5 - avgRatingRounded!)}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                    {rawRatings.length} {rawRatings.length === 1 ? 'anmeldelse' : 'anmeldelser'}
                  </div>
                </div>
              </div>

              {userRound?.rating != null && userRound.rating > 0 && (
                <div style={{ marginTop: 12, background: '#e8f5ee', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: '#c9a84c' }}>
                    {'★'.repeat(userRound.rating)}{'☆'.repeat(5 - userRound.rating)}
                  </span>
                  <span style={{ fontSize: 12, color: '#2a7a4f', fontWeight: 600 }}>Din rating</span>
                  {userRound.note && (
                    <span style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic', marginLeft: 4 }}>
                      &ldquo;{userRound.note}&rdquo;
                    </span>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ color: '#9ca3af', fontSize: 13 }}>Ingen anmeldelser endnu</div>
          )}
        </div>

        {/* 3. Log / already-played */}
        {userRound ? (
          <div style={{ background: '#e8f5ee', border: '1px solid #a7d5b8', borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1a5c38' }}>Du har spillet denne bane</span>
            </div>
            {(userRound.played_at || userRound.created_at) && (
              <div style={{ fontSize: 13, color: '#2a7a4f', marginBottom: 10 }}>
                📅 {formatDate(userRound.played_at ?? userRound.created_at)}
              </div>
            )}
            <Link
              href={`/log?course=${id}`}
              style={{
                display: 'block', textAlign: 'center',
                background: '#1a5c38', color: '#fff',
                borderRadius: 12, padding: '12px 0',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
              }}
            >
              Opdater anmeldelse →
            </Link>
          </div>
        ) : (
          <Link
            href={`/log?course=${id}`}
            style={{
              background: '#1a5c38', color: '#fff', borderRadius: 14,
              padding: 16, fontSize: 16, fontWeight: 700,
              display: 'block', textAlign: 'center', textDecoration: 'none',
            }}
          >
            ⛳ Log denne bane
          </Link>
        )}

        {/* 4. Kender du et medlem? */}
        <GolfersListAccordion
          title="Kender du et medlem?"
          emoji="🏠"
          golfers={courseMembers}
          accentColor="#c9a84c"
          accentText="#7a5a00"
          borderColor="#e5e7eb"
        />

        {/* 5. Venner der har spillet */}
        <FriendsWhoPlayedAccordion friends={friendRounds} />

        {/* 6. Andre der har spillet */}
        <CourseReviewsAccordion reviews={reviews} />

        {/* 7. Klubinfo — collapsed by default */}
        {hasClubInfo && (
          <CollapsibleCard title="ℹ️ Klubinfo">
            <div>
              {course.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '13px 16px', borderBottom: '1px solid #f3f4f6', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span>📍</span>
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Adresse</span>
                  </div>
                  <div style={{ textAlign: 'right', flex: 1 }}>
                    <div style={{ fontSize: 13, color: '#1a1a1a', fontWeight: 500 }}>{course.address}</div>
                    <a href={mapsUrl!} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#1a5c38', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: 3 }}>
                      Vis på Google Maps →
                    </a>
                  </div>
                </div>
              )}
              {course.website && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: '1px solid #f3f4f6', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🌐</span>
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Website</span>
                  </div>
                  <a href={course.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>
                    {stripProtocol(course.website)}
                  </a>
                </div>
              )}
              {course.phone && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: '1px solid #f3f4f6', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📞</span>
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Telefon</span>
                  </div>
                  <a href={`tel:${course.phone}`} style={{ fontSize: 13, color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>
                    {course.phone}
                  </a>
                </div>
              )}
              {course.founded_year && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: (course.holes || course.par) ? '1px solid #f3f4f6' : 'none', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📅</span>
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Grundlagt</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{course.founded_year}</span>
                </div>
              )}
              {(course.holes || course.par) && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>⛳</span>
                    <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>Huller / Par</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                    {[course.holes && `${course.holes} huller`, course.par && `Par ${course.par}`].filter(Boolean).join(' · ')}
                  </span>
                </div>
              )}
            </div>
          </CollapsibleCard>
        )}

      </div>
    </div>
  )
}
