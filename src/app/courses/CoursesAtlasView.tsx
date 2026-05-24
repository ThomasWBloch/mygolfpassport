import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'

/**
 * CoursesAtlasView — the "Course Atlas" subtab on /courses.
 *
 * Server component that fetches its own data so the parent (/courses page.tsx)
 * only needs to fetch the user info required for the top-bar chrome.
 */

export default async function CoursesAtlasView() {
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

  const [profileResult, playedResult, hiddenIds] = await Promise.all([
    user
      ? supabase.from('profiles').select('home_country').eq('id', user.id).single()
      : Promise.resolve({ data: null }),

    user
      ? supabase.from('rounds').select('course_id').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),

    getComboComponentIds(supabase),
  ])

  const countries: CountryOption[] = COUNTRY_NAMES.map((name) => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  const playedIds = (playedResult.data ?? []).map((r) => r.course_id as string)
  const profile = (profileResult as { data: { home_country?: string } | null }).data
  const userHomeCountry = profile?.home_country ?? null

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
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
          marginBottom: 16,
          letterSpacing: -0.3,
        }}
      >
        All courses
      </div>

      <CourseBrowser
        countries={countries}
        playedIds={playedIds}
        hiddenIds={hiddenIds}
        userHomeCountry={userHomeCountry}
      />
    </div>
  )
}
