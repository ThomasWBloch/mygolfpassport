import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import AtlasMapWrapper from '@/components/AtlasMapWrapper'
import AtlasContinentPills from './AtlasContinentPills'
import type { CountryGroup } from '@/lib/map-types'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'
import {
  CONTINENT_BOUNDS,
  countryContinent,
  type ContinentKey,
} from '@/lib/continents'

/**
 * CoursesAtlasView — the "Course Atlas" subtab on /courses.
 *
 * Trin A: world Leaflet map with one marker per country (centroid of the
 * country's displayable courses), continent pills above it, and the full
 * CourseBrowser autocomplete on top. ?c=<continent> zooms to that
 * continent and filters markers; clicking the active pill clears scope.
 * The card-list Atlas is parked under [?view=list-preview](page.tsx) for
 * side-by-side review and will be deleted once the map is the picked
 * direction.
 */

type CourseRow = {
  id: string
  name: string
  club: string | null
  country: string
  flag: string | null
  latitude: number
  longitude: number
}

interface Props {
  continent: ContinentKey | null
}

export default async function CoursesAtlasView({ continent }: Props) {
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

  // Paginated fetch of every displayable course row that has coordinates.
  // is_displayed=false hides combo-component duplicates, federation
  // pollution, and generic-name dupes (see [combo-components.ts](../../lib/combo-components.ts));
  // is_displayed=null is treated as displayed so freshly-imported rows
  // still surface.
  async function fetchAllDisplayableCourses(): Promise<CourseRow[]> {
    const rows: CourseRow[] = []
    let offset = 0
    const PAGE = 1000
    while (true) {
      const { data, error } = await supabase
        .from('courses')
        .select('id, name, club, country, flag, latitude, longitude')
        .not('is_displayed', 'is', false)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('country', { ascending: true })
        .order('name', { ascending: true })
        .range(offset, offset + PAGE - 1)
      if (error || !data || data.length === 0) break
      for (const r of data) {
        rows.push(r as CourseRow)
      }
      if (data.length < PAGE) break
      offset += PAGE
    }
    return rows
  }

  const [profileResult, playedResult, hiddenIds, courseRows] =
    await Promise.all([
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

      fetchAllDisplayableCourses(),
    ])

  const browserCountries: CountryOption[] = COUNTRY_NAMES.map((name) => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  const playedIds = (playedResult.data ?? []).map((r) => r.course_id as string)
  const profile = (profileResult as { data: { home_country?: string } | null })
    .data
  const userHomeCountry = profile?.home_country ?? null

  // Aggregate per-country: centroid (mean lat/lng) + first 5 courses
  // (already alphabetised by the .order('name')) + total count.
  const byCountry = new Map<
    string,
    {
      country: string
      flag: string
      latSum: number
      lngSum: number
      count: number
      courses: { id: string; name: string; club: string | null; rating: null }[]
    }
  >()
  for (const row of courseRows) {
    const country = row.country
    if (!country) continue
    let entry = byCountry.get(country)
    if (!entry) {
      entry = {
        country,
        flag: row.flag ?? '',
        latSum: 0,
        lngSum: 0,
        count: 0,
        courses: [],
      }
      byCountry.set(country, entry)
    }
    entry.latSum += row.latitude
    entry.lngSum += row.longitude
    entry.count += 1
    if (entry.courses.length < 5) {
      entry.courses.push({
        id: row.id,
        name: row.name,
        club: row.club,
        rating: null,
      })
    }
  }

  const allCountries: CountryGroup[] = []
  for (const entry of byCountry.values()) {
    allCountries.push({
      country: entry.country,
      flag: entry.flag,
      lat: entry.latSum / entry.count,
      lng: entry.lngSum / entry.count,
      count: entry.count,
      courses: entry.courses,
    })
  }
  allCountries.sort((a, b) => a.country.localeCompare(b.country))

  // World-level continent counts (built from the unfiltered set so pills
  // always show the global total, not the currently-scoped subset).
  const continentCounts: Record<ContinentKey, number> = {
    na: 0,
    sa: 0,
    eu: 0,
    af: 0,
    as: 0,
    oc: 0,
  }
  for (const c of allCountries) {
    const key = countryContinent(c.country)
    if (key) continentCounts[key] += c.count
  }

  const visibleCountries = continent
    ? allCountries.filter((c) => countryContinent(c.country) === continent)
    : allCountries

  const totalRounds = visibleCountries.reduce((sum, c) => sum + c.count, 0)
  const totalCountries = visibleCountries.length
  const bounds = continent ? CONTINENT_BOUNDS[continent] : null

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
        Explore courses
      </div>

      <CourseBrowser
        countries={browserCountries}
        playedIds={playedIds}
        hiddenIds={hiddenIds}
        userHomeCountry={userHomeCountry}
      />

      <div style={{ marginTop: 20, marginBottom: 12 }}>
        <AtlasContinentPills active={continent} counts={continentCounts} />
      </div>

      <AtlasMapWrapper
        countries={visibleCountries}
        totalRounds={totalRounds}
        totalCountries={totalCountries}
        activeContinent={continent}
        bounds={bounds}
      />

      <div
        style={{
          marginTop: 18,
          textAlign: 'center',
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
        }}
      >
        Prefer a list view?{' '}
        <Link
          href="/courses?view=list-preview"
          style={{
            color: 'var(--color-mgp-gold-dark)',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          See the list preview →
        </Link>
      </div>
    </div>
  )
}
