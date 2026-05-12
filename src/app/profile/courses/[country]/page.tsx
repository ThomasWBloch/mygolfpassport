import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect, notFound } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import BackButton from '@/components/BackButton'
import { computeInitials } from '@/lib/initials'
import CountryCourseList from '@/components/CountryCourseList'

export default async function CountryCoursesPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: rawCountry } = await params
  const country = decodeURIComponent(rawCountry)
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

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/welcome')

  // Fetch user's primary rounds in this country + course details. Synthetic
  // loop-rounds from combo fan-out aren't standalone visits — they exist to
  // mark the loop as played elsewhere — so they're filtered out here to
  // avoid duplicating each combo as three entries (combo + two loops).
  const { data: rounds } = await supabase
    .from('rounds')
    .select('id, course_id, rating, note, played_at, courses(id, name, club, flag, country)')
    .eq('user_id', user.id)
    .is('parent_round_id', null)
    .order('played_at', { ascending: false })

  // Filter to this country's rounds
  const countryRounds = (rounds ?? []).filter(r => {
    const c = r.courses as unknown as { country: string } | null
    return c?.country === country
  })

  if (countryRounds.length === 0) notFound()

  // Get flag from first round
  const flag = (countryRounds[0].courses as unknown as { flag: string | null })?.flag ?? ''

  // Deduplicate courses and compute user's average rating per course
  const courseMap = new Map<string, {
    id: string
    name: string
    club: string | null
    ratings: number[]
    notes: string[]
    playedAt: string | null
  }>()

  for (const r of countryRounds) {
    const c = r.courses as unknown as { id: string; name: string; club: string | null }
    if (!courseMap.has(c.id)) {
      courseMap.set(c.id, { id: c.id, name: c.name, club: c.club, ratings: [], notes: [], playedAt: null })
    }
    const entry = courseMap.get(c.id)!
    if (r.rating != null) entry.ratings.push(r.rating as number)
    if (r.note) entry.notes.push(r.note as string)
    if (!entry.playedAt || (r.played_at as string) > entry.playedAt) {
      entry.playedAt = r.played_at as string | null
    }
  }

  // Fetch global average rating for all courses in this country that the user has played
  const courseIds = [...courseMap.keys()]
  const { data: allRatings } = await adminSupabase
    .from('rounds')
    .select('course_id, rating')
    .in('course_id', courseIds)
    .not('rating', 'is', null)

  // Global avg per course
  const globalRatingMap = new Map<string, number[]>()
  for (const r of allRatings ?? []) {
    const cid = r.course_id as string
    if (!globalRatingMap.has(cid)) globalRatingMap.set(cid, [])
    globalRatingMap.get(cid)!.push(r.rating as number)
  }

  // Build course list
  type CourseItem = {
    id: string
    name: string
    club: string | null
    userRating: number | null
    globalRating: number | null
    note: string | null
    playedAt: string | null
  }

  const courses: CourseItem[] = [...courseMap.values()].map(c => {
    const userAvg = c.ratings.length > 0 ? c.ratings.reduce((a, b) => a + b, 0) / c.ratings.length : null
    const globalRatings = globalRatingMap.get(c.id)
    const globalAvg = globalRatings && globalRatings.length > 0
      ? globalRatings.reduce((a, b) => a + b, 0) / globalRatings.length
      : null
    return {
      id: c.id,
      name: c.name,
      club: c.club,
      userRating: userAvg,
      globalRating: globalAvg,
      note: c.notes.length > 0 ? c.notes[0] : null,
      playedAt: c.playedAt,
    }
  })

  // Sort by user rating descending, unrated last
  courses.sort((a, b) => {
    if (a.userRating == null && b.userRating == null) return 0
    if (a.userRating == null) return 1
    if (b.userRating == null) return -1
    return b.userRating - a.userRating
  })

  // Overall average for this country
  const allUserRatings = courses.filter(c => c.userRating != null).map(c => c.userRating!)
  const countryAvg = allUserRatings.length > 0
    ? (allUserRatings.reduce((a, b) => a + b, 0) / allUserRatings.length).toFixed(1)
    : null

  const profileResult = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar — Adventure chrome, mirrors /messages and friends list */}
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
          <BackButton fallback="/map" />
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>

        {/* Header — eyebrow + Cormorant headline + stamp stat-line */}
        <div style={{ marginBottom: 18 }}>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 6,
          }}>
            My atlas
          </div>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 28, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.3,
            display: 'flex', alignItems: 'center', gap: 10,
            marginBottom: 8,
          }}>
            <span style={{ fontSize: 26 }}>{flag}</span>
            <span>{country}</span>
          </div>
          <div style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11, letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
          }}>
            <span>{courses.length} {courses.length === 1 ? 'course' : 'courses'} played</span>
            {countryAvg && (
              <>
                <span style={{ margin: '0 8px' }}>·</span>
                <span>Avg {countryAvg}</span>
              </>
            )}
          </div>
        </div>

        {/* Course list — client component for expandable notes */}
        <CountryCourseList courses={courses} />

      </div>
    </div>
  )
}
