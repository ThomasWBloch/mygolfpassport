import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogForm from '@/components/LogForm'
import type { PrefilledCourse } from '@/components/LogForm'
import { computeInitials } from '@/lib/initials'
import type { CountryOption } from '@/components/CourseBrowser'
import { getComboComponentIds } from '@/lib/combo-components'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>
}) {
  const { course: courseId } = await searchParams
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

  const [courseResult, profileResult, hiddenIds, courseCountResult] = await Promise.all([
    courseId
      ? supabase.from('courses').select('id, name, club, country, flag, is_major').eq('id', courseId).single()
      : Promise.resolve({ data: null }),
    supabase.from('profiles').select('full_name, home_country').eq('id', user!.id).single(),
    getComboComponentIds(supabase),
    // Live displayable-course count for the empty-state copy. is_displayed
    // hides combo-component rows from the user-facing UI; treat NULL as
    // displayed so newly-imported rows that haven't been flagged still count.
    supabase
      .from('courses')
      .select('id', { count: 'exact', head: true })
      .not('is_displayed', 'is', false),
  ])

  const courseCount = (courseCountResult as { count: number | null }).count ?? 0

  // Audit #4 — country dropdown is now driven by COUNTRY_NAMES (149) so /log
  // matches /courses. Previously this page hardcoded a 17-country list and
  // ran one .single() query per country to fetch the flag — both stale and
  // wasteful. Flags come from COUNTRY_FLAGS (sourced from the same DISTINCT
  // courses query that produces /courses).
  const countries: CountryOption[] = COUNTRY_NAMES.map(name => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  const fullName =
    profileResult.data?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    ''

  const initials = computeInitials(fullName, user?.email)
  const userHomeCountry = (profileResult.data?.home_country as string | undefined) ?? null

  return (
    <LogForm
      prefilledCourse={courseResult.data as PrefilledCourse | null}
      initials={initials}
      countries={countries}
      hiddenIds={hiddenIds}
      userHomeCountry={userHomeCountry}
      courseCount={courseCount}
    />
  )
}
