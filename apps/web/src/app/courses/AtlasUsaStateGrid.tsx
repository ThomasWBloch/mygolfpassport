import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import { CONTINENT_LABELS, type ContinentKey } from '@/lib/continents'

/**
 * Atlas State 2a — USA state-grid drill-in. Without this layer, /courses?
 * country=USA dumped all 19,583 US courses into a single list/map, which
 * was incoherent on the country map (overlapping markers everywhere).
 *
 * Each state-card behaves like AtlasContinent's country cards: dim
 * un-played, full opacity once you've stamped any course there, and a
 * red checkmark badge with the played count. Clicking drills into
 * /courses?country=USA&state={state} which renders the existing
 * list/map view scoped to that one state.
 *
 * The 'Unknown state' bucket holds ~1,800 US courses whose state we
 * couldn't parse from their address. It's rendered last in the grid as
 * a visible reminder that the data needs a polygon-lookup pass.
 */

export interface UsaStateStat {
  state: string
  count: number
  playedCount: number
}

interface Props {
  continentKey: ContinentKey
  stateStats: UsaStateStat[]
  /** Total displayable course count in USA. */
  totalCount: number
  /** How many of the user's played rounds fall in USA. */
  playedCount: number
  hiddenIds: string[]
  playedIds: string[]
  userHomeCountry: string | null
}

export default function AtlasUsaStateGrid({
  continentKey,
  stateStats,
  totalCount,
  playedCount,
  hiddenIds,
  playedIds,
  userHomeCountry,
}: Props) {
  const continentLabel = CONTINENT_LABELS[continentKey]
  const stateCount = stateStats.length

  // Alphabetical so a 50-state grid is navigable like a phonebook — the
  // earlier sort-by-played-then-count made the same state jump position
  // every time the user's footprint changed. 'Unknown state' bucket
  // stays pinned to the end as a data-quality marker, not content.
  const known = stateStats
    .filter((s) => s.state !== 'Unknown state')
    .sort((a, b) => a.state.localeCompare(b.state))
  const unknown = stateStats.find((s) => s.state === 'Unknown state')
  const ordered = unknown ? [...known, unknown] : known

  const browserCountries: CountryOption[] = [{ country: 'USA', flag: '🇺🇸' }]
  const restrictedCountries = ['USA']

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
      <Link
        href={`/courses?c=${continentKey}`}
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
        ← {continentLabel}
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
        Atlas · {continentLabel} · USA
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
          🇺🇸
        </span>
        <span>United States</span>
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
        {stateCount.toLocaleString('en-US')}{' '}
        {stateCount === 1 ? 'state' : 'states'} ·{' '}
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

      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          margin: '22px 0 10px',
        }}
      >
        States
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 8,
        }}
      >
        {ordered.map((s) => {
          const hasPlayed = s.playedCount > 0
          const isUnknown = s.state === 'Unknown state'
          return (
            <Link
              key={s.state}
              href={`/courses?c=${continentKey}&country=USA&state=${encodeURIComponent(s.state)}`}
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
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: isUnknown
                    ? 'var(--color-mgp-ink-3)'
                    : 'var(--color-mgp-ink)',
                  fontStyle: isUnknown ? 'italic' : 'normal',
                  letterSpacing: -0.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {s.state}
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
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-ink-3)',
                  }}
                >
                  {s.count.toLocaleString('en-US')}{' '}
                  {s.count === 1 ? 'course' : 'courses'}
                </span>
                {hasPlayed && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-stamp-red)',
                      border: '1px dashed var(--color-mgp-stamp-red)',
                      borderRadius: 4,
                      padding: '2px 6px',
                    }}
                  >
                    ✓ {s.playedCount}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
