import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogForm from '@/components/LogForm'
import type { PrefilledCourse } from '@/components/LogForm'
import { computeInitials } from '@/lib/initials'
import type { CountryOption } from '@/components/CourseBrowser'

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

  const knownCountries = [
    'Denmark', 'Sweden', 'Scotland', 'Ireland', 'Wales',
    'England', 'France', 'Germany', 'Netherlands', 'Norway', 'Finland',
    'USA', 'Canada', 'Australia', 'Spain', 'Portugal', 'Italy',
  ]

  const [courseResult, profileResult, ...countriesResults] = await Promise.all([
    courseId
      ? supabase.from('courses').select('id, name, club, country, flag, is_major').eq('id', courseId).single()
      : Promise.resolve({ data: null }),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    ...knownCountries.map(c =>
      supabase.from('courses').select('country, flag').eq('country', c).limit(1).single()
    ),
  ])

  const countries: CountryOption[] = countriesResults
    .filter(r => r.data)
    .map(r => ({ country: r.data!.country as string, flag: r.data!.flag as string | null }))
    .sort((a, b) => a.country.localeCompare(b.country))

  const fullName =
    profileResult.data?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    ''

  const initials = computeInitials(fullName, user?.email)

  return (
    <LogForm
      prefilledCourse={courseResult.data as PrefilledCourse | null}
      initials={initials}
      countries={countries}
    />
  )
}
