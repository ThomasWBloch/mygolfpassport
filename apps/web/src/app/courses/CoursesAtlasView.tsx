import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import AtlasOverview from './AtlasOverview'
import AtlasContinent from './AtlasContinent'
import type { CountryStat } from './AtlasContinent'
import AtlasCountry from './AtlasCountry'
import AtlasUsaStateGrid from './AtlasUsaStateGrid'
import type { UsaStateStat } from './AtlasUsaStateGrid'
import type { CountryCourse } from './AtlasCountryListView'
import type { AtlasCourseMarker } from '@/components/CountryClusterMap'
import type { CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'
import { fetchRoundsForCourseCounts } from '@/lib/counts'
import {
  COUNTRY_TO_CONTINENT,
  countryContinent,
  isContinentKey,
  type ContinentKey,
} from '@/lib/continents'

/**
 * CoursesAtlasView — the Atlas dispatcher. Parses `?c`, `?country`,
 * `?state`, `?v` from the URL and routes to one of four render states:
 *
 *   • State 0 (overview)     — six continent cards + global search
 *   • State 1 (continent)    — flag grid + scoped search
 *   • State 2a (USA states)  — state grid (USA-only drill-in level,
 *                              splits 19,583 US courses into 50 + DC + PR
 *                              + GU buckets so the country map isn't a
 *                              blob of markers)
 *   • State 2  (country)     — list / map toggle + scoped search
 *                              For USA, the scope is country + state.
 *
 * Country + state aggregates come from the country_rollup and
 * usa_state_rollup views — a 50-row fetch replaces what used to be a
 * 20K-row paginated scan in State 0 / 1. State 2 still pulls the full
 * row set for one country (or country + state) because the list/map
 * needs every course.
 */

const COUNTRY_HARD_CAP = 25000

interface Props {
  continent: ContinentKey | null
  country: string | null
  state: string | null
  viewMode: 'list' | 'map'
}

export default async function CoursesAtlasView({
  continent,
  country,
  state,
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

  // playedRoundsResult now carries country + state alongside course_id so
  // we can compute per-country and per-state played counts without a
  // second pass over the (large) courses table.
  const [profileResult, playedRoundsResult, hiddenIds] = await Promise.all([
    user
      ? supabase
          .from('profiles')
          .select('home_country')
          .eq('id', user.id)
          .single()
      : Promise.resolve({ data: null }),

    user
      ? fetchRoundsForCourseCounts(supabase, [user.id])
      : Promise.resolve({ data: [] }),

    getComboComponentIds(supabase),
  ])

  const profile = (profileResult as { data: { home_country?: string } | null })
    .data
  const userHomeCountry = profile?.home_country ?? null

  type PlayedRow = {
    course_id: string
    courses: { country: string | null; state: string | null } | null
  }
  const playedRows = (playedRoundsResult.data ?? []) as unknown as PlayedRow[]
  const playedIds = playedRows.map((r) => r.course_id)
  const playedSet = new Set(playedIds)

  const playedByCountry = new Map<string, number>()
  const playedByUsaState = new Map<string, number>()
  for (const row of playedRows) {
    const c = row.courses?.country ?? null
    if (c) {
      playedByCountry.set(c, (playedByCountry.get(c) ?? 0) + 1)
      if (c === 'USA') {
        const s = row.courses?.state ?? 'Unknown state'
        playedByUsaState.set(s, (playedByUsaState.get(s) ?? 0) + 1)
      }
    }
  }

  const allCountries: CountryOption[] = COUNTRY_NAMES.map((name) => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  // ── State 2 ─ Country (with optional state scope for USA) ─────────
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

      // USA without ?state → render the state-grid (State 2a) so we
      // don't dump 19,583 courses into a single list/map.
      const isUsa = country === 'USA'
      if (isUsa && !state) {
        const { data: stateRows } = await supabase
          .from('usa_state_rollup')
          .select('state, course_count')
          .order('course_count', { ascending: false })

        const stateStats: UsaStateStat[] = (stateRows ?? []).map((r) => ({
          state: r.state as string,
          count: r.course_count as number,
          playedCount: playedByUsaState.get(r.state as string) ?? 0,
        }))

        const usaTotal = stateStats.reduce((s, st) => s + st.count, 0)
        const usaPlayed = stateStats.reduce((s, st) => s + st.playedCount, 0)

        return (
          <AtlasUsaStateGrid
            continentKey={effectiveContinent}
            stateStats={stateStats}
            totalCount={usaTotal}
            playedCount={usaPlayed}
            hiddenIds={hiddenIds}
            playedIds={playedIds}
            userHomeCountry={userHomeCountry}
          />
        )
      }

      // Pull every displayable course in this country (and state, if set).
      // PostgREST caps any single response at db-max-rows (1000 on
      // Supabase hosted), so we paginate even though COUNTRY_HARD_CAP is
      // much higher — .range(0, 24999) on its own silently truncates to
      // 1000. The hard cap is still enforced as the outer break to bound
      // the worst case (USA ≈ 19.6k without state filter, ~2k with one).
      const safeRows: {
        id: string
        name: string
        club: string | null
        holes: number | null
        latitude: number | null
        longitude: number | null
      }[] = []
      {
        let offset = 0
        const PAGE = 1000
        while (offset < COUNTRY_HARD_CAP) {
          const upper = Math.min(offset + PAGE, COUNTRY_HARD_CAP) - 1
          let q = supabase
            .from('courses')
            .select('id, name, club, holes, latitude, longitude')
            .eq('country', country)
            .not('is_displayed', 'is', false)
            .order('club', { ascending: true })
            .order('name', { ascending: true })
            .range(offset, upper)
          if (isUsa && state) {
            // Treat the synthetic 'Unknown state' bucket as state IS NULL
            // so the URL ?state=unknown-state stays stable while the data
            // is the natural "we couldn't parse this one" group.
            if (state === 'Unknown state') {
              q = q.is('state', null)
            } else {
              q = q.eq('state', state)
            }
          }
          const { data, error } = await q
          if (error) {
            console.error('[atlas-country] fetch error', error)
            break
          }
          if (!data || data.length === 0) break
          for (const r of data) {
            safeRows.push({
              id: r.id as string,
              name: r.name as string,
              club: (r.club as string | null) ?? null,
              holes: (r.holes as number | null) ?? null,
              latitude: (r.latitude as number | null) ?? null,
              longitude: (r.longitude as number | null) ?? null,
            })
          }
          if (data.length < PAGE) break
          offset += PAGE
        }
      }

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

      const playedInScope = listCourses.filter((c) => c.played).length

      return (
        <AtlasCountry
          country={country}
          flag={COUNTRY_FLAGS[country] ?? null}
          continentKey={effectiveContinent}
          stateScope={isUsa ? state : null}
          totalCount={listCourses.length}
          playedCount={playedInScope}
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

    // Tiny payload now — one row per country in the continent (typically
    // 5-50 rows) instead of 11-25K id+country rows.
    const { data: rollupRows } = await supabase
      .from('country_rollup')
      .select('country, course_count')
      .in('country', continentCountryNames)

    const rollupByCountry = new Map<string, number>()
    for (const r of rollupRows ?? []) {
      rollupByCountry.set(r.country as string, r.course_count as number)
    }

    const countriesInContinent: CountryStat[] = continentCountryNames
      .map((name) => ({
        country: name,
        flag: COUNTRY_FLAGS[name] ?? null,
        count: rollupByCountry.get(name) ?? 0,
        playedCount: playedByCountry.get(name) ?? 0,
      }))
      .filter((c) => c.count > 0)
      .sort((a, b) => a.country.localeCompare(b.country))

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
  // Per-continent course totals derived from the country_rollup view
  // (~100 rows) instead of paginating the full courses table.
  const { data: rollupRows } = await supabase
    .from('country_rollup')
    .select('country, course_count')

  const continentCounts: Record<ContinentKey, number> = {
    na: 0,
    sa: 0,
    eu: 0,
    af: 0,
    as: 0,
    oc: 0,
  }
  for (const row of rollupRows ?? []) {
    const key = countryContinent(row.country as string)
    if (key) continentCounts[key] += row.course_count as number
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
