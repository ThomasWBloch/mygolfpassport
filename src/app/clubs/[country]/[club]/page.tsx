import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import { countryFromSlug, slugifyClub } from '@/lib/slugs'
import { isGenericCourseName } from '@/lib/course-display'
import GolfersListAccordion from '@/components/GolfersListAccordion'
import type { GolferEntry } from '@/components/GolfersListAccordion'
import BackButton from '@/components/BackButton'
import { getComboComponentIds } from '@/lib/combo-components'

const STAR = '★'
const EMPTY = '☆'

function stars(avg: number | null): string {
  if (avg == null) return ''
  const r = Math.round(avg)
  return STAR.repeat(r) + EMPTY.repeat(5 - r)
}

export default async function ClubPage({ params }: { params: Promise<{ country: string; club: string }> }) {
  const { country: countrySlug, club: clubSlug } = await params

  const country = countryFromSlug(countrySlug)
  if (!country) notFound()

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

  // ── Step 1: fetch courses for this (country, club) ───────────────────────
  // club_normalized is lowercase + accent-stripped but keeps original spaces
  // and hyphens. URL slug replaces those (and any other non-alphanum) with
  // hyphens. Match in DB with hyphens-as-wildcards, then verify exactly in JS.
  const clubLikePattern = clubSlug.replace(/-/g, '%')

  const [{ data: candidateRows }, hiddenIds] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, holes, par, country, flag, club_normalized')
      .ilike('country', country)
      .ilike('club_normalized', clubLikePattern)
      .order('name'),
    // Same combo-component filter used by /log search and /api/courses/nearby:
    // hides 9-hole loops that are halves of an 18-hole combo at this club, plus
    // self-pair noise and non-canonical reverse-order combos.
    getComboComponentIds(supabase),
  ])
  const hiddenSet = new Set(hiddenIds)

  const courseRows = (candidateRows ?? [])
    .filter(c =>
      slugifyClub((c.club_normalized as string) ?? (c.club as string) ?? '') === clubSlug
    )
    .filter(c => !hiddenSet.has(c.id as string))

  if (courseRows.length === 0) notFound()

  const courseIds = courseRows.map(c => c.id as string)
  const representative = courseRows[0]
  const clubName = (representative.club as string) ?? clubSlug

  // ── Step 2: parallel social + stat queries ───────────────────────────────
  // Members source: profiles whose home_club ilike matches this club AND
  // who've opted into search visibility. Replaces the old course_affiliations
  // join — privacy-respecting and independent of round history.
  const [
    ratingsResult,
    userPlayedResult,
    clubMembersResult,
    clubRoundsResult,
    friendshipsResult,
    profileResult,
  ] = await Promise.all([
    supabase
      .from('rounds')
      .select('course_id, rating')
      .in('course_id', courseIds)
      .not('rating', 'is', null),

    supabase
      .from('rounds')
      .select('course_id')
      .eq('user_id', user!.id)
      .in('course_id', courseIds),

    adminSupabase
      .from('profiles')
      .select('id, full_name, handicap')
      .ilike('home_club', clubName)
      .eq('show_in_search', true),

    supabase
      .from('rounds')
      .select('user_id')
      .in('course_id', courseIds),

    supabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${user!.id},friend_id.eq.${user!.id}`)
      .eq('status', 'accepted'),

    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user!.id)
      .single(),
  ])

  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const ratingsByCourse = new Map<string, number[]>()
  for (const r of ratingsResult.data ?? []) {
    const arr = ratingsByCourse.get(r.course_id) ?? []
    arr.push(r.rating as number)
    ratingsByCourse.set(r.course_id, arr)
  }

  const userPlayedIds = new Set((userPlayedResult.data ?? []).map(r => r.course_id as string))

  const clubMemberRows = clubMembersResult.data ?? []
  const clubMemberIds  = clubMemberRows.map(p => p.id as string)
  const golferUserIds  = [...new Set((clubRoundsResult.data ?? []).map(r => r.user_id as string).filter(id => id !== user!.id))]
  const allProfileIds  = [...new Set([...clubMemberIds, ...golferUserIds])]

  const [profileRowsResult, userAllRoundsResult] = await Promise.all([
    allProfileIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, handicap').in('id', allProfileIds)
      : Promise.resolve({ data: [] }),
    allProfileIds.length > 0
      ? adminSupabase.from('rounds').select('user_id, course_id, courses(country, is_major)').in('user_id', allProfileIds)
      : Promise.resolve({ data: [] }),
  ])

  const profileMap = new Map(
    (profileRowsResult.data ?? []).map(p => [p.id, { fullName: p.full_name ?? 'Anonym', handicap: p.handicap as number | null }])
  )

  const userAllRounds = userAllRoundsResult.data ?? []
  const allPlayedCourseIds = [...new Set(userAllRounds.map(r => r.course_id as string))]
  const { data: top100Social } = allPlayedCourseIds.length > 0
    ? await adminSupabase.from('top100_rankings').select('course_id').in('course_id', allPlayedCourseIds)
    : { data: [] }
  const top100SocialSet = new Set((top100Social ?? []).map(r => r.course_id as string))

  function computeUserStats(uid: string) {
    const rounds = userAllRounds.filter(r => r.user_id === uid)
    const cIds = [...new Set(rounds.map(r => r.course_id as string))]
    const courseCount = cIds.length
    const countryCount = new Set(rounds.map(r => (r.courses as unknown as { country: string } | null)?.country).filter(Boolean)).size
    const hasPlayedMajor = rounds.some(r => (r.courses as unknown as { is_major: boolean } | null)?.is_major)
    const hasTop100 = cIds.some(cid => top100SocialSet.has(cid))
    let badgeCount = 0
    if (courseCount >= 1)   badgeCount++
    if (countryCount >= 2)  badgeCount++
    if (courseCount >= 10)  badgeCount++
    if (countryCount >= 5)  badgeCount++
    if (courseCount >= 50)  badgeCount++
    if (courseCount >= 100) badgeCount++
    if (hasPlayedMajor)     badgeCount++
    if (hasTop100)          badgeCount++
    return { courseCount, countryCount, badgeCount }
  }

  const friendIds = new Set(
    (friendshipsResult.data ?? []).map(f =>
      f.user_id === user!.id ? f.friend_id : f.user_id
    )
  )

  const members: GolferEntry[] = clubMemberIds
    .filter(id => id !== user!.id)
    .map(id => {
      const p = profileMap.get(id) ?? { fullName: 'Anonym', handicap: null }
      return { userId: id, ...p, ...computeUserStats(id) }
    })

  const allGolfers: GolferEntry[] = golferUserIds
    .map(id => {
      const p = profileMap.get(id) ?? { fullName: 'Anonym', handicap: null }
      return { userId: id, ...p, ...computeUserStats(id) }
    })

  const friendGolfers: GolferEntry[] = golferUserIds
    .filter(id => friendIds.has(id))
    .map(id => {
      const p = profileMap.get(id) ?? { fullName: 'Anonym', handicap: null }
      return { userId: id, ...p, ...computeUserStats(id) }
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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)', fontSize: 14,
          }}>M</span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BackButton fallback="/map" label="← Back" />
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Hero card — passport cover panel */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-mgp-cover-light) 0%, var(--color-mgp-cover-dark) 100%)',
          borderRadius: 8,
          border: '0.5px solid var(--color-mgp-cover-ink)',
          padding: 24, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', right: -30, top: -30,
            width: 130, height: 130, borderRadius: '50%',
            background: 'rgba(244,236,216,0.06)',
          }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, position: 'relative' }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, fontWeight: 700, letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-gold)',
                marginBottom: 6,
              }}>
                Club
              </div>
              <div style={{
                fontFamily: 'var(--font-mgp-display)',
                color: 'var(--color-mgp-ink-inv)',
                fontSize: 26, fontWeight: 500,
                letterSpacing: -0.3,
                lineHeight: 1.15,
              }}>
                {clubName}
              </div>
              <div style={{
                color: 'var(--color-mgp-ink-inv)', opacity: 0.8,
                fontSize: 13, marginTop: 8,
              }}>
                {representative.country as string} {(representative.flag as string) ?? ''}
              </div>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, letterSpacing: 1.5,
                color: 'var(--color-mgp-ink-inv)', opacity: 0.6,
                marginTop: 6, textTransform: 'uppercase',
              }}>
                {courseRows.length} {courseRows.length === 1 ? 'course' : 'courses'}
              </div>
            </div>
            <span style={{ fontSize: 44, flexShrink: 0 }}>{(representative.flag as string) ?? '🏌️'}</span>
          </div>
        </div>

        {/* Courses list */}
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 8,
          border: '0.5px solid var(--color-mgp-border)',
          overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 16px 10px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, fontWeight: 700,
            color: 'var(--color-mgp-ink-3)',
            textTransform: 'uppercase',
            letterSpacing: 2,
          }}>
            Courses
          </div>
          {courseRows.map((c, i) => {
            const ratings = ratingsByCourse.get(c.id as string) ?? []
            const avg = ratings.length > 0
              ? ratings.reduce((a, b) => a + b, 0) / ratings.length
              : null
            const played = userPlayedIds.has(c.id as string)

            return (
              <div
                key={c.id as string}
                style={{
                  padding: '12px 16px',
                  borderTop: i === 0 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                  borderBottom: i < courseRows.length - 1 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={`/courses/${c.id as string}`}
                    style={{
                      fontFamily: 'var(--font-mgp-display)',
                      fontSize: 17, fontWeight: 500,
                      color: 'var(--color-mgp-cover)',
                      textDecoration: 'none',
                      letterSpacing: -0.2,
                    }}
                  >
                    {isGenericCourseName(c.name as string) ? 'Main course' : (c.name as string)}
                  </Link>
                  <div style={{
                    fontSize: 12, color: 'var(--color-mgp-ink-2)',
                    marginTop: 4, display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    {[c.holes && `${c.holes} holes`, c.par && `Par ${c.par}`].filter(Boolean).join(' · ')}
                    {avg != null && (
                      <span style={{ color: 'var(--color-mgp-gold)', fontSize: 11 }}>{stars(avg)}</span>
                    )}
                    {avg != null && (
                      <span style={{ color: 'var(--color-mgp-ink-3)', fontSize: 11 }}>({ratings.length})</span>
                    )}
                  </div>
                </div>
                {played ? (
                  <span style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-stamp-red)',
                    border: '1px dashed var(--color-mgp-stamp-red)',
                    borderRadius: 4,
                    padding: '3px 8px',
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                  }}>✓ Visited</span>
                ) : (
                  <Link
                    href={`/courses/${c.id as string}`}
                    style={{
                      background: 'var(--color-mgp-cover)',
                      color: 'var(--color-mgp-ink-inv)',
                      borderRadius: 4,
                      padding: '5px 10px',
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    View →
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Social accordions — pass Adventure tokens */}
        <GolfersListAccordion
          title="Club members"
          golfers={members}
          accentColor="var(--color-mgp-gold)"
          accentText="var(--color-mgp-cover-ink)"
          borderColor="var(--color-mgp-border)"
        />

        <GolfersListAccordion
          title="Golfers who've played"
          golfers={allGolfers}
          accentColor="var(--color-mgp-cover)"
          accentText="var(--color-mgp-ink-inv)"
          borderColor="var(--color-mgp-border)"
        />

        <GolfersListAccordion
          title="Friends who've played"
          golfers={friendGolfers}
          accentColor="var(--color-mgp-cover)"
          accentText="var(--color-mgp-ink-inv)"
          borderColor="var(--color-mgp-cover-light)"
        />

      </div>
    </div>
  )
}
