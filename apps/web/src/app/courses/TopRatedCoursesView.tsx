import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import TopRatedCountryFilter from '@/components/TopRatedCountryFilter'

/**
 * TopRatedCoursesView — the "Top Rated" subtab on /courses. Courses with at
 * least MIN_RATINGS logged ratings, best-rated first, optionally filtered
 * by country. course_rating_summary has no course metadata and no FK
 * PostgREST can embed through, so this is a two-step fetch: qualifying
 * summary rows first (small set — the threshold keeps it that way), then a
 * batch lookup of just those courses. Mirrors
 * apps/mobile/lib/courses.ts's fetchTopRatedCourses.
 */

const MIN_RATINGS = 5

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default async function TopRatedCoursesView({ country }: { country: string | null }) {
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

  const { data: summaryRows } = await supabase
    .from('course_rating_summary')
    .select('course_id, avg_rating, rating_count')
    .gte('rating_count', MIN_RATINGS)
    .order('avg_rating', { ascending: false })

  const courseIds = (summaryRows ?? []).map((r) => r.course_id as string)

  let courses: { id: string; name: string; club: string | null; country: string | null; flag: string | null }[] = []
  if (courseIds.length > 0) {
    let query = supabase.from('courses').select('id, name, club, country, flag').in('id', courseIds)
    if (country) query = query.eq('country', country)
    const { data } = await query
    courses = data ?? []
  }

  const courseMap = new Map(courses.map((c) => [c.id, c]))
  const ranked = (summaryRows ?? [])
    .filter((r) => courseMap.has(r.course_id as string))
    .map((r) => {
      const c = courseMap.get(r.course_id as string)!
      return {
        ...c,
        avgRating: Number(r.avg_rating),
        ratingCount: Number(r.rating_count),
      }
    })

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>
      <div style={{ marginBottom: 18 }}>
        <TopRatedCountryFilter currentCountry={country} />
      </div>

      {ranked.length === 0 ? (
        <div
          style={{
            background: 'var(--color-mgp-paper)',
            border: '1px solid var(--color-mgp-border)',
            borderRadius: 8,
            padding: 18,
            textAlign: 'center',
            color: 'var(--color-mgp-ink-3)',
            fontFamily: 'var(--font-mgp-body)',
            fontSize: 14,
          }}
        >
          No courses with at least {MIN_RATINGS} ratings yet{country ? ' in this country' : ''}. Check back as more rounds get logged.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ranked.map((c, i) => {
            const rank = i + 1
            return (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#fff',
                  border: '1px solid var(--color-mgp-border-faint)',
                  borderRadius: 8,
                  padding: 12,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div style={{ width: 28, textAlign: 'center', flexShrink: 0 }}>
                  {MEDALS[rank] ? (
                    <span style={{ fontSize: 16 }}>{MEDALS[rank]}</span>
                  ) : (
                    <span style={{ color: 'var(--color-mgp-ink-3)', fontFamily: 'var(--font-mgp-stamp)', fontSize: 13 }}>
                      {rank}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{c.flag ?? '⛳'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 16, color: 'var(--color-mgp-ink)' }}>
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 11,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-ink-3)',
                      marginTop: 3,
                    }}
                  >
                    {c.club ?? ''} {c.ratingCount} rating{c.ratingCount === 1 ? '' : 's'}
                  </div>
                </div>
                <div style={{ fontFamily: 'var(--font-mgp-stamp)', fontWeight: 700, fontSize: 16, color: 'var(--color-mgp-gold-dark)', flexShrink: 0 }}>
                  ★ {c.avgRating.toFixed(1)}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
