import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// GET /api/courses/nearby?course_id=X
export async function GET(request: NextRequest) {
  const courseId = request.nextUrl.searchParams.get('course_id')
  if (!courseId) return NextResponse.json({ error: 'Missing course_id' }, { status: 400 })

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
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Get the reference course's coordinates
  const { data: refCourse } = await supabase
    .from('courses')
    .select('latitude, longitude')
    .eq('id', courseId)
    .single()

  if (!refCourse?.latitude || !refCourse?.longitude) {
    return NextResponse.json({ courses: [] })
  }

  const refLat = refCourse.latitude as number
  const refLng = refCourse.longitude as number

  // Get user's played course IDs
  const { data: playedRows } = await supabase
    .from('rounds')
    .select('course_id')
    .eq('user_id', user.id)

  const playedIds = new Set((playedRows ?? []).map(r => r.course_id as string))

  // Fetch courses in a rough bounding box (~100km) to limit results
  const latDelta = 1.0 // ~111km
  const lngDelta = 2.0 // ~111km * cos(lat), generous for northern Europe
  const { data: nearbyCourses } = await supabase
    .from('courses')
    .select('id, name, club, country, flag, latitude, longitude')
    .gte('latitude', refLat - latDelta)
    .lte('latitude', refLat + latDelta)
    .gte('longitude', refLng - lngDelta)
    .lte('longitude', refLng + lngDelta)
    .neq('id', courseId)
    .limit(500)

  if (!nearbyCourses || nearbyCourses.length === 0) {
    return NextResponse.json({ courses: [] })
  }

  // Calculate distance, filter out played, sort, take top 5
  const results = nearbyCourses
    .filter(c => c.latitude && c.longitude && !playedIds.has(c.id as string))
    .map(c => ({
      id: c.id as string,
      name: c.name as string,
      club: c.club as string | null,
      country: c.country as string | null,
      flag: c.flag as string | null,
      distanceKm: parseFloat(haversineKm(refLat, refLng, c.latitude as number, c.longitude as number).toFixed(1)),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 5)

  return NextResponse.json({ courses: results })
}
