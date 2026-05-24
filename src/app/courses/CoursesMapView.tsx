import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import MapWrapper from '@/components/MapWrapper'
import CountryAccordion from '@/components/CountryAccordion'
import type { CountryGroup } from '@/lib/map-types'

/**
 * CoursesMapView — the "My Map" subtab on /courses.
 *
 * Server component that fetches the user's stamped courses (primary rounds
 * only — combo loop-rounds are bookkeeping and shouldn't render extra pins
 * or accordion rows) and renders the world map + country accordion + empty
 * state, 1:1 with the legacy /map page.
 */

export default async function CoursesMapView() {
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

  const { data: { user } } = await supabase.auth.getUser()

  const { data: rounds } = user
    ? await supabase
        .from('rounds')
        .select('course_id, rating')
        .eq('user_id', user.id)
        .is('parent_round_id', null)
    : { data: [] }

  const ratingMap = new Map<string, number[]>()
  for (const r of rounds ?? []) {
    const cid = r.course_id as string
    const rating = r.rating as number | null
    if (rating != null) {
      if (!ratingMap.has(cid)) ratingMap.set(cid, [])
      ratingMap.get(cid)!.push(rating)
    }
  }
  function avgRating(courseId: string): number | null {
    const ratings = ratingMap.get(courseId)
    if (!ratings || ratings.length === 0) return null
    return ratings.reduce((a, b) => a + b, 0) / ratings.length
  }

  const distinctCourseIds = [...new Set((rounds ?? []).map((r) => r.course_id as string))]

  const { data: courseRows } = distinctCourseIds.length > 0
    ? await supabase
        .from('courses')
        .select('id, name, club, country, flag, latitude, longitude')
        .in('id', distinctCourseIds)
    : { data: [] }

  const grouped = new Map<string, CountryGroup>()
  for (const course of courseRows ?? []) {
    if (course.latitude == null || course.longitude == null) continue
    const key = course.country
    if (!grouped.has(key)) {
      grouped.set(key, {
        country: course.country,
        flag: course.flag ?? '',
        lat: course.latitude,
        lng: course.longitude,
        count: 0,
        courses: [],
      })
    }
    const entry = grouped.get(key)!
    entry.count += 1
    entry.courses.push({
      id: course.id,
      name: course.name,
      club: course.club,
      rating: avgRating(course.id),
    })
  }

  for (const group of grouped.values()) {
    group.courses.sort((a, b) => {
      if (a.rating == null && b.rating == null) return 0
      if (a.rating == null) return 1
      if (b.rating == null) return -1
      return b.rating - a.rating
    })
  }

  const countries: CountryGroup[] = Array.from(grouped.values())
  const totalRounds = countries.reduce((sum, c) => sum + c.count, 0)
  const totalCountries = countries.length

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}
      >
        Atlas
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 24,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 4,
          letterSpacing: -0.3,
        }}
      >
        My map
      </div>
      <div
        style={{
          fontSize: 13,
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 16,
        }}
      >
        All courses you&apos;ve stamped into your passport
      </div>

      <MapWrapper
        countries={countries}
        totalRounds={totalRounds}
        totalCountries={totalCountries}
      />

      {countries.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div
            style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 10,
            }}
          >
            Countries visited
          </div>
          <CountryAccordion countries={countries} />
        </div>
      )}

      {countries.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'var(--color-mgp-paper)',
            borderRadius: 14,
            border: '1px solid var(--color-mgp-border)',
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              marginBottom: 6,
              letterSpacing: -0.2,
            }}
          >
            No courses logged yet
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 16,
            }}
          >
            Log your first course to see it on the map.
          </div>
          <Link
            href="/log"
            style={{
              background: 'var(--color-mgp-cover)',
              color: 'var(--color-mgp-ink-inv)',
              borderRadius: 12,
              padding: '12px 24px',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'inline-block',
              textDecoration: 'none',
            }}
          >
            Log course →
          </Link>
        </div>
      )}
    </div>
  )
}
