import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogForm from '@/components/LogForm'
import type { PrefilledCourse, EditRound } from '@/components/LogForm'
import { computeInitials } from '@/lib/initials'
import type { CountryOption } from '@/components/CourseBrowser'
import { getComboComponentIds } from '@/lib/combo-components'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; edit?: string }>
}) {
  const { course: courseId, edit: editRoundId } = await searchParams
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

  // When ?edit=<round_id> is set, pull the round (and verify ownership)
  // so LogForm can pre-fill rating/date/note + skip the search step.
  // Synthetic loop-rounds from combo fan-out can't be directly edited;
  // we surface that as a 403-like 'edit denied' by leaving editRound null.
  const editRoundFetch = editRoundId && /^[0-9a-f-]{36}$/i.test(editRoundId)
    ? supabase
        .from('rounds')
        .select('id, user_id, rating, note, played_at, played_at_precision, parent_round_id, course_id, courses(id, name, club, country, flag, is_major)')
        .eq('id', editRoundId)
        .single()
    : Promise.resolve({ data: null })

  const [courseResult, profileResult, hiddenIds, courseCountResult, playedRoundsResult, editRoundResult] = await Promise.all([
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
    // User's already-played course IDs — used to show "✓ Played" tag on
    // search results so the user can spot rounds they've already stamped.
    // Re-stamping is still allowed (the [LOG] button stays); the tag is
    // purely a visual cue.
    supabase
      .from('rounds')
      .select('course_id')
      .eq('user_id', user!.id),

    editRoundFetch,
  ])

  // Build EditRound prop only when the round exists, belongs to the user,
  // and is a parent round (not a synthetic combo child).
  type EditRoundRow = {
    id: string
    user_id: string
    rating: number | null
    note: string | null
    played_at: string | null
    played_at_precision: 'day' | 'month' | 'year' | null
    parent_round_id: string | null
    course_id: string
    courses: {
      id: string
      name: string
      club: string | null
      country: string | null
      flag: string | null
      is_major: boolean | null
    } | null
  }
  const editRoundRow = (editRoundResult as { data: EditRoundRow | null }).data
  const editRound: EditRound | null =
    editRoundRow
      && editRoundRow.user_id === user!.id
      && editRoundRow.parent_round_id == null
      && editRoundRow.courses
      ? {
          roundId: editRoundRow.id,
          rating: editRoundRow.rating,
          note: editRoundRow.note,
          playedAt: editRoundRow.played_at,
          playedAtPrecision: editRoundRow.played_at_precision,
          course: {
            id: editRoundRow.courses.id,
            name: editRoundRow.courses.name,
            club: editRoundRow.courses.club,
            country: editRoundRow.courses.country ?? '',
            flag: editRoundRow.courses.flag,
            is_major: !!editRoundRow.courses.is_major,
          },
        }
      : null

  const courseCount = (courseCountResult as { count: number | null }).count ?? 0
  const playedIds = [...new Set((playedRoundsResult.data ?? []).map(r => r.course_id as string))]

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
      editRound={editRound}
      initials={initials}
      countries={countries}
      hiddenIds={hiddenIds}
      userHomeCountry={userHomeCountry}
      courseCount={courseCount}
      playedIds={playedIds}
    />
  )
}
