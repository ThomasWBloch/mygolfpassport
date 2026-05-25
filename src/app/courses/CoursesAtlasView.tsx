import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AtlasOverview from './AtlasOverview'
import AtlasContinent from './AtlasContinent'
import type { CountryStat } from './AtlasContinent'
import AtlasCountry from './AtlasCountry'
import type { CountryCourse } from './AtlasCountryListView'
import type { AtlasCourseMarker } from '@/components/CountryClusterMap'
import type { CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'
import {
  COUNTRY_TO_CONTINENT,
  countryContinent,
  isContinentKey,
  type ContinentKey,
} from '@/lib/continents'

/**
 * CoursesAtlasView — the Atlas dispatcher. Parses `?c`, `?country`,
 * `?v` from the URL and routes to one of three render states:
 *
 *   • State 0 (overview)   — six continent cards + global search
 *   • State 1 (continent)  — flag grid + scoped search
 *   • State 2 (country)    — list / map toggle + scoped search
 *
 * Each state fetches only what it needs. Overview gets per-continent
 * aggregates (one paginated pass over the courses table, then bucketed).
 * Continent state narrows the same query with `country in (…)`. Country
 * state pulls the full row set for one country, capped at COUNTRY_HARD_CAP
 * to keep payload bounded.
 */

const COUNTRY_HARD_CAP = 25000

interface Props {
  continent: ContinentKey | null
  country: string | null
  viewMode: 'list' | 'map'
}

export default async function CoursesAtlasView({
  continent,
  country,
  viewMode,
}: Props) {
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

  const [profileResult, playedRoundsResult, hiddenIds] = await Promise.all([
    user
      ? supabase
          .from('profiles')
          .select('home_country')
          .eq('id', user.id)
          .single()
      : Promise.resolve({ data: null }),

    user
      ? supabase
          .from('rounds')
          .select('course_id')
          .eq('user_id', user.id)
      : Promise.resolve({ data: [] }),

    getComboComponentIds(supabase),
  ])

  const profile = (profileResult as { data: { home_country?: string } | null })
    .data
  const userHomeCountry = profile?.home_country ?? null
  const playedIds = (playedRoundsResult.data ?? []).map(
    (r) => r.course_id as string,
  )
  const playedSet = new Set(playedIds)

  const allCountries: CountryOption[] = COUNTRY_NAMES.map((name) => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  // ── State 2 ─ Country ─────────────────────────────────────────────
  // A valid country must (a) be in our canonical names list and (b)
  // belong to the declared continent — otherwise we strip the param and
  // fall through to a lower state.
  if (country) {
    const continentForCountry = COUNTRY_TO_CONTINENT[country] ?? null
    const countryIsValid =
      COUNTRY_NAMES.includes(country) &&
      continentForCountry !== null &&
      (continent === null || continent === continentForCountry)

    if (countryIsValid) {
      const effectiveContinent =
        continent ?? (continentForCountry as ContinentKey)

      // Pull every displayable course in this country. Capped at
      // COUNTRY_HARD_CAP — no country today is anywhere close, but the
      // cap protects us if the courses table balloons.
      const { data: rows, error } = await supabase
        .from('courses')
        .select('id, name, club, holes, latitude, longitude')
        .eq('country', country)
        .not('is_displayed', 'is', false)
        .order('club', { ascending: true })
        .order('name', { ascending: true })
        .range(0, COUNTRY_HARD_CAP - 1)

      if (error) {
        console.error('[atlas-country] fetch error', error)
      }

      const safeRows = (rows ?? []) as {
        id: string
        name: string
        club: string | null
        holes: number | null
        latitude: number | null
        longitude: number | null
      }[]

      const listCourses: CountryCourse[] = safeRows.map((r) => ({
        id: r.id,
        name: r.name,
        club: r.club,
        holes: r.holes,
        played: playedSet.has(r.id),
      }))

      const mapCourses: AtlasCourseMarker[] = safeRows
        .filter((r) => r.latitude != null && r.longitude != null)
        .map((r) => ({
          id: r.id,
          name: r.name,
          club: r.club,
          holes: r.holes,
          latitude: r.latitude as number,
          longitude: r.longitude as number,
          played: playedSet.has(r.id),
        }))

      const playedInCountry = listCourses.filter((c) => c.played).length

      return (
        <AtlasCountry
          country={country}
          flag={COUNTRY_FLAGS[country] ?? null}
          continentKey={effectiveContinent}
          totalCount={listCourses.length}
          playedCount={playedInCountry}
          listCourses={listCourses}
          mapCourses={mapCourses}
          viewMode={viewMode}
          hiddenIds={hiddenIds}
          playedIds={playedIds}
          userHomeCountry={userHomeCountry}
        />
      )
    }
    // Invalid country param — fall through to State 1 / 0 below.
  }

  // ── State 1 ─ Continent ───────────────────────────────────────────
  if (continent && isContinentKey(continent)) {
    const continentCountryNames = Object.entries(COUNTRY_TO_CONTINENT)
      .filter(([, key]) => key === continent)
      .map(([name]) => name)

    // Paginated fetch of every displayable course in the continent.
    // Selecting only `id, country` so the payload is one column wider
    // than necessary for `country` + the id (id is needed to count
    // played-overlap accurately).
    const rows: { id: string; country: string }[] = []
    {
      let offset = 0
      const PAGE = 1000
      while (true) {
        const { data, error } = await supabase
          .from('courses')
          .select('id, country')
          .in('country', continentCountryNames)
          .not('is_displayed', 'is', false)
          .range(offset, offset + PAGE - 1)
        if (error || !data || data.length === 0) break
        for (const r of data) {
          rows.push({ id: r.id as string, country: r.country as string })
        }
        if (data.length < PAGE) break
        offset += PAGE
      }
    }

    const perCountry = new Map<
      string,
      { count: number; playedCount: number }
    >()
    for (const name of continentCountryNames) {
      perCountry.set(name, { count: 0, playedCount: 0 })
    }
    for (const row of rows) {
      const entry = perCountry.get(row.country)
      if (!entry) continue
      entry.count += 1
      if (playedSet.has(row.id)) entry.playedCount += 1
    }

    const countriesInContinent: CountryStat[] = [...perCountry.entries()]
      .filter(([, stat]) => stat.count > 0)
      .map(([name, stat]) => ({
        country: name,
        flag: COUNTRY_FLAGS[name] ?? null,
        count: stat.count,
        playedCount: stat.playedCount,
      }))
      .sort((a, b) => {
        if (a.playedCount !== b.playedCount) return b.playedCount - a.playedCount
        if (a.count !== b.count) return b.count - a.count
        return a.country.localeCompare(b.country)
      })

    const continentCount = countriesInContinent.reduce(
      (s, c) => s + c.count,
      0,
    )
    const continentPlayed = countriesInContinent.reduce(
      (s, c) => s + c.playedCount,
      0,
    )

    return (
      <AtlasContinent
        continentKey={continent}
        countriesInContinent={countriesInContinent}
        continentCount={continentCount}
        continentPlayed={continentPlayed}
        hiddenIds={hiddenIds}
        playedIds={playedIds}
        userHomeCountry={userHomeCountry}
      />
    )
  }

  // ── State 0 ─ Overview ────────────────────────────────────────────
  // Per-continent course totals. Same paginated pattern as Trin A but
  // we only carry `country` through — id/lat/lng aren't needed for the
  // overview aggregate.
  const overviewRows: { country: string }[] = []
  {
    let offset = 0
    const PAGE = 1000
    while (true) {
      const { data, error } = await supabase
        .from('courses')
        .select('country')
        .not('is_displayed', 'is', false)
        .range(offset, offset + PAGE - 1)
      if (error || !data || data.length === 0) break
      for (const r of data) {
        overviewRows.push({ country: r.country as string })
      }
      if (data.length < PAGE) break
      offset += PAGE
    }
  }

  const continentCounts: Record<ContinentKey, number> = {
    na: 0,
    sa: 0,
    eu: 0,
    af: 0,
    as: 0,
    oc: 0,
  }
  for (const row of overviewRows) {
    if (!row.country) continue
    const key = countryContinent(row.country)
    if (key) continentCounts[key] += 1
  }

  return (
    <AtlasOverview
      countries={allCountries}
      playedIds={playedIds}
      hiddenIds={hiddenIds}
      userHomeCountry={userHomeCountry}
      continentCounts={continentCounts}
    />
  )
}
