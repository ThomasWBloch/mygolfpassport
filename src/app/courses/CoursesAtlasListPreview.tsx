import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'

/**
 * CoursesAtlasListPreview — the legacy card-list Atlas view, parked
 * behind ?view=list-preview so it can be A/B compared with the new map
 * Atlas. Identical data fetching to the original CoursesAtlasView; the
 * only addition is a banner that links back to /courses.
 *
 * Slated for deletion once the map Atlas is the confirmed direction.
 */
export default async function CoursesAtlasListPreview() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {},
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [profileResult, playedResult, hiddenIds] = await Promise.all([
    user
      ? supabase
          .from('profiles')
          .select('home_country')
          .eq('id', user.id)
          .single()
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
  const profile = (profileResult as { data: { home_country?: string } | null })
    .data
  const userHomeCountry = profile?.home_country ?? null

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
      <Link
        href="/courses"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 16,
          padding: '10px 14px',
          background: 'var(--color-mgp-paper)',
          border: '0.5px solid var(--color-mgp-gold)',
          borderRadius: 10,
          textDecoration: 'none',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-2)',
        }}
      >
        <span>List preview — open Course Atlas to compare with map view</span>
        <span style={{ color: 'var(--color-mgp-gold-dark)', fontWeight: 700 }}>
          ›
        </span>
      </Link>

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
