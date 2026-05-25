import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import { CONTINENT_LABELS, type ContinentKey } from '@/lib/continents'

/**
 * Atlas State 1 — drill-down for a single continent. Renders a flag grid
 * of the countries inside the continent (sorted by played-count then
 * total count) on top of a CourseBrowser that's scoped to those
 * countries' rows only.
 *
 * Countries the user has played at render in full opacity; un-played
 * countries dim to 0.65 so the played footprint stands out at a glance.
 */

// Subdivision flag emojis (England/Scotland/Wales) render as black boxes
// on Windows; the rest of the app uses the same text fallback.
const SUBDIVISION_FLAG_FALLBACK: Record<string, string> = {
  England: 'ENG',
  Scotland: 'SCO',
  Wales: 'WAL',
}

function displayFlag(flag: string | null, country: string | null): string {
  if (country && country in SUBDIVISION_FLAG_FALLBACK) {
    return SUBDIVISION_FLAG_FALLBACK[country]
  }
  return flag ?? '🌍'
}

export interface CountryStat {
  country: string
  flag: string | null
  count: number
  playedCount: number
}

interface Props {
  continentKey: ContinentKey
  countriesInContinent: CountryStat[]
  /** Total displayable course count in the continent. */
  continentCount: number
  /** How many of the user's played rounds fall in this continent. */
  continentPlayed: number
  /** Hidden-from-UI course ids (combo-component noise). */
  hiddenIds: string[]
  /** User's played course ids — passed straight through to CourseBrowser. */
  playedIds: string[]
  userHomeCountry: string | null
}

export default function AtlasContinent({
  continentKey,
  countriesInContinent,
  continentCount,
  continentPlayed,
  hiddenIds,
  playedIds,
  userHomeCountry,
}: Props) {
  const label = CONTINENT_LABELS[continentKey]
  const totalCountries = countriesInContinent.length

  const browserCountries: CountryOption[] = countriesInContinent.map((c) => ({
    country: c.country,
    flag: c.flag,
  }))
  const restrictedCountries = countriesInContinent.map((c) => c.country)

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
      <Link
        href="/courses"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 14,
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          textDecoration: 'none',
        }}
      >
        ← All continents
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
        Atlas · {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 26,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 6,
          letterSpacing: -0.3,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 18,
        }}
      >
        {continentCount.toLocaleString('en-US')}{' '}
        {continentCount === 1 ? 'course' : 'courses'} ·{' '}
        {totalCountries.toLocaleString('en-US')}{' '}
        {totalCountries === 1 ? 'country' : 'countries'} ·{' '}
        {continentPlayed.toLocaleString('en-US')} played
      </div>

      <CourseBrowser
        countries={browserCountries}
        playedIds={playedIds}
        hiddenIds={hiddenIds}
        userHomeCountry={userHomeCountry}
        restrictedCountries={restrictedCountries}
        hideEmptyState
      />

      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          margin: '22px 0 10px',
        }}
      >
        Countries
      </div>

      {countriesInContinent.length === 0 ? (
        <div
          style={{
            background: 'var(--color-mgp-paper)',
            border: '0.5px solid var(--color-mgp-border)',
            borderRadius: 8,
            padding: '24px 16px',
            textAlign: 'center',
            color: 'var(--color-mgp-ink-2)',
            fontSize: 13,
          }}
        >
          No courses with coordinates in this continent yet.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 8,
          }}
        >
          {countriesInContinent.map((c) => {
            const hasPlayed = c.playedCount > 0
            return (
              <Link
                key={c.country}
                href={`/courses?c=${continentKey}&country=${encodeURIComponent(c.country)}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  padding: '12px 12px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  background: 'var(--color-mgp-paper)',
                  border: '0.5px solid var(--color-mgp-border)',
                  opacity: hasPlayed ? 1 : 0.65,
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>
                    {displayFlag(c.flag, c.country)}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mgp-display)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--color-mgp-ink)',
                      letterSpacing: -0.2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.country}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 9,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-ink-3)',
                    }}
                  >
                    {c.count.toLocaleString('en-US')}{' '}
                    {c.count === 1 ? 'course' : 'courses'}
                  </span>
                  {hasPlayed && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                        color: 'var(--color-mgp-stamp-red)',
                        border: '1px dashed var(--color-mgp-stamp-red)',
                        borderRadius: 4,
                        padding: '2px 6px',
                      }}
                    >
                      ✓ {c.playedCount}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
