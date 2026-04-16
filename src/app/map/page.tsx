import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import MapWrapper from '@/components/MapWrapper'
import CountryAccordion from '@/components/CountryAccordion'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

export type CountryGroup = {
  country: string
  flag: string
  lat: number
  lng: number
  count: number
  courses: { id: string; name: string; club: string | null; rating: number | null }[]
}

export default async function MapPage() {
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

  const [roundsResult, profileResult] = await Promise.all([
    supabase
      .from('rounds')
      .select('course_id, rating')
      .eq('user_id', user!.id),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
  ])

  const initials = computeInitials(
    profileResult.data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  // Build average rating per course from rounds
  const rounds = roundsResult.data ?? []
  const ratingMap = new Map<string, number[]>()
  for (const r of rounds) {
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

  // Distinct course IDs this user has played
  const distinctCourseIds = [...new Set(rounds.map(r => r.course_id as string))]

  // Fetch course details in one query — guaranteed no duplicates
  const { data: courseRows } = distinctCourseIds.length > 0
    ? await supabase
        .from('courses')
        .select('id, name, club, country, flag, latitude, longitude')
        .in('id', distinctCourseIds)
    : { data: [] }

  // Group by country
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
    entry.courses.push({ id: course.id, name: course.name, club: course.club, rating: avgRating(course.id) })
  }

  // Sort courses within each country by rating (best first), unrated last
  for (const group of grouped.values()) {
    group.courses.sort((a, b) => {
      if (a.rating == null && b.rating == null) return 0
      if (a.rating == null) return 1
      if (b.rating == null) return -1
      return b.rating - a.rating
    })
  }

  const countries: CountryGroup[] = Array.from(grouped.values())
  // Distinct courses across all countries
  const totalRounds = countries.reduce((sum, c) => sum + c.count, 0)
  const totalCountries = countries.length

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }}>

      {/* Top bar — full width */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Back
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 32px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>
          🗺️ My map
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
          All courses you've played
        </div>

        <MapWrapper
          countries={countries}
          totalRounds={totalRounds}
          totalCountries={totalCountries}
        />

        {/* Country list below map */}
        {countries.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              Countries visited
            </div>
            <CountryAccordion countries={countries} />
          </div>
        )}

        {countries.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', marginTop: 16 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
              No courses logged yet
            </div>
            <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 16 }}>
              Log your first course to see it on the map.
            </div>
            <Link href="/log" style={{
              background: '#1a5c38', color: '#fff', borderRadius: 12,
              padding: '12px 24px', fontSize: 14, fontWeight: 700,
              display: 'inline-block', textDecoration: 'none',
            }}>
              Log course →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
