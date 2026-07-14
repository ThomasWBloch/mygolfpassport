import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import AtlasCountryListView from './AtlasCountryListView'
import type { CountryCourse } from './AtlasCountryListView'
import AtlasCountryMapView from './AtlasCountryMapView'
import type { AtlasCourseMarker } from '@/components/CountryClusterMap'
import { CONTINENT_LABELS, type ContinentKey } from '@/lib/continents'

/**
 * Atlas State 2 — single-country drill-in. List/Map toggle at the top;
 * the list is just card rows linking out to the canonical course page,
 * the map is a Leaflet cluster-map (only the cluster bit is client-side).
 *
 * URL is the canonical state — `?v=map` flips the toggle. Default (no
 * `v`) renders the list since it works without a network round-trip and
 * is the cheaper render on slow mobile connections.
 */

const SUBDIVISION_FLAG_FALLBACK: Record<string, string> = {
  England: 'ENG',
  Scotland: 'SCO',
  Wales: 'WAL',
}

function displayFlag(flag: string | null, country: string): string {
  if (country in SUBDIVISION_FLAG_FALLBACK) {
    return SUBDIVISION_FLAG_FALLBACK[country]
  }
  return flag ?? '🌍'
}

interface Props {
  country: string
  flag: string | null
  continentKey: ContinentKey
  /** When set (USA only), the page is scoped to a single US state. Drives
   *  the back-link target (state-grid instead of continent) and the
   *  headline / breadcrumb copy. */
  stateScope: string | null
  totalCount: number
  playedCount: number
  /** Alphabetised list for the list view. */
  listCourses: CountryCourse[]
  /** Subset with coordinates, for the cluster map. */
  mapCourses: AtlasCourseMarker[]
  viewMode: 'list' | 'map'
  hiddenIds: string[]
  playedIds: string[]
  userHomeCountry: string | null
}

export default function AtlasCountry({
  country,
  flag,
  continentKey,
  stateScope,
  totalCount,
  playedCount,
  listCourses,
  mapCourses,
  viewMode,
  hiddenIds,
  playedIds,
  userHomeCountry,
}: Props) {
  const continentLabel = CONTINENT_LABELS[continentKey]
  const flagLabel = displayFlag(flag, country)

  const browserCountries: CountryOption[] = [{ country, flag }]
  const restrictedCountries = [country]

  const baseHref =
    stateScope
      ? `/courses?c=${continentKey}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(stateScope)}`
      : `/courses?c=${continentKey}&country=${encodeURIComponent(country)}`
  const listHref = baseHref
  const mapHref = `${baseHref}&v=map`

  // Back-link target: from a state-scoped view go back to the USA
  // state-grid; from a country view go back to the continent.
  const backHref = stateScope
    ? `/courses?c=${continentKey}&country=${encodeURIComponent(country)}`
    : `/courses?c=${continentKey}`
  const backLabel = stateScope ? `← ${country}` : `← ${continentLabel}`

  // Breadcrumb + headline tweaks when state-scoped
  const breadcrumb = stateScope
    ? `Atlas · ${continentLabel} · ${country} · ${stateScope}`
    : `Atlas · ${continentLabel} · ${country}`
  const headlineMain = stateScope ?? country
  const headlineSub = stateScope ? country : null

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
      <Link
        href={backHref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 14,
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          textDecoration: 'none',
        }}
      >
        {backLabel}
      </Link>

      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}
      >
        {breadcrumb}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 26,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 6,
          letterSpacing: -0.3,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span aria-hidden style={{ fontSize: 28 }}>
          {flagLabel}
        </span>
        <span>{headlineMain}</span>
        {headlineSub && (
          <span
            style={{
              fontSize: 14,
              color: 'var(--color-mgp-ink-3)',
              fontWeight: 500,
              letterSpacing: 0,
            }}
          >
            · {headlineSub}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 18,
        }}
      >
        {totalCount.toLocaleString('en-US')}{' '}
        {totalCount === 1 ? 'course' : 'courses'} ·{' '}
        {playedCount.toLocaleString('en-US')} played
      </div>

      <CourseBrowser
        countries={browserCountries}
        playedIds={playedIds}
        hiddenIds={hiddenIds}
        userHomeCountry={userHomeCountry}
        restrictedCountries={restrictedCountries}
        hideEmptyState
      />

      {/* List / Map toggle — segmented pill, mirrors SubTabs styling but
          local to this section so it doesn't compete visually with the
          page-level Atlas/My Map toggle in the chrome. */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 12,
          height: 36,
          borderRadius: 18,
          background: 'var(--color-mgp-cream-cool)',
          border: '0.5px solid var(--color-mgp-gold)',
          padding: 3,
          display: 'flex',
        }}
      >
        {(
          [
            { value: 'list' as const, label: 'List', href: listHref },
            { value: 'map' as const, label: 'Map', href: mapHref },
          ]
        ).map((opt) => {
          const isActive = opt.value === viewMode
          return (
            <Link
              key={opt.value}
              href={opt.href}
              style={{
                flex: 1,
                height: 30,
                borderRadius: 15,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                fontWeight: isActive ? 700 : 500,
                background: isActive
                  ? 'var(--color-mgp-cover)'
                  : 'transparent',
                color: isActive
                  ? 'var(--color-mgp-gold)'
                  : 'var(--color-mgp-ink-3)',
              }}
            >
              {opt.label}
            </Link>
          )
        })}
      </div>

      {viewMode === 'map' ? (
        mapCourses.length === 0 ? (
          <div
            style={{
              background: 'var(--color-mgp-paper)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 12,
              padding: '32px 16px',
              textAlign: 'center',
              color: 'var(--color-mgp-ink-2)',
              fontSize: 14,
            }}
          >
            No courses with coordinates in {country} yet.
          </div>
        ) : (
          <AtlasCountryMapView courses={mapCourses} />
        )
      ) : (
        <AtlasCountryListView courses={listCourses} />
      )}
    </div>
  )
}
