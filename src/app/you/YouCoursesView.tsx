import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ProfileAccordions from '@/components/ProfileAccordions'
import type { CourseEntry, CountryEntry } from '@/components/ProfileAccordions'

/**
 * YouCoursesView — the "Courses" subtab on /you.
 *
 * Hosts the Courses + Countries accordions extracted from the old /profile
 * page. ProfileAccordions still renders all three accordions in the
 * /profile/[user_id] public friend-view; here we pass hideBadges so the
 * Badges accordion doesn't duplicate the dedicated Badges subtab.
 */

export default async function YouCoursesView() {
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
  if (!user) redirect('/welcome')

  // Synthetic loop-rounds (parent_round_id IS NOT NULL) from combo fan-out
  // are bookkeeping rows that mark loops as "played" elsewhere; they must
  // not appear as standalone entries in the user's course list or inflate
  // their played-course count. Same filter the old /profile used.
  const roundsResult = await supabase
    .from('rounds')
    .select('id, course_id, rating, played_at, created_at, courses(name, club, country, flag)')
    .eq('user_id', user.id)
    .is('parent_round_id', null)
    .order('created_at', { ascending: false })

  const rounds = roundsResult.data ?? []

  const seenCourseIds = new Set<string>()
  const courseEntries: CourseEntry[] = []
  for (const r of rounds) {
    const cid = r.course_id as string
    if (seenCourseIds.has(cid)) continue
    seenCourseIds.add(cid)
    const c = r.courses as unknown as { name: string; club: string | null; country: string | null; flag: string | null } | null
    if (!c) continue
    courseEntries.push({
      courseId: cid,
      courseName: c.name,
      clubName: c.club,
      country: c.country,
      flag: c.flag,
      rating: r.rating as number | null,
      playedAt: (r.played_at ?? r.created_at) as string | null,
      roundId: r.id as string,
    })
  }

  const countryStatsMap = new Map<string, { flag: string | null; count: number }>()
  for (const c of courseEntries) {
    if (!c.country) continue
    const e = countryStatsMap.get(c.country)
    if (e) e.count++
    else countryStatsMap.set(c.country, { flag: c.flag, count: 1 })
  }
  const countryEntries: CountryEntry[] = [...countryStatsMap.entries()]
    .map(([country, { flag, count }]) => ({ country, flag, courseCount: count }))
    .sort((a, b) => b.courseCount - a.courseCount)

  return (
    <div
      style={{
        maxWidth: 768,
        margin: '0 auto',
        padding: '16px 14px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <ProfileAccordions
        courses={courseEntries}
        countries={countryEntries}
        badges={[]}
        isOwnProfile
        hideBadges
      />
    </div>
  )
}
