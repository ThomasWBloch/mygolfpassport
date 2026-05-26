import Link from 'next/link'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import {
  CONTINENT_KEYS,
  CONTINENT_LABELS,
  type ContinentKey,
} from '@/lib/continents'

/**
 * Atlas State 0 — entry point of the drill-in flow. Six continent cards
 * in a 2-column grid plus the global CourseBrowser autocomplete. Clicking
 * a card drills into State 1 (continent), where you can pick a country to
 * reach State 2 (country, list or cluster-map).
 *
 * The biggest-by-count continent (typically NA in the global dataset)
 * gets the dark-cover treatment as a visual anchor; the other five stay
 * cream so the hierarchy reads from a thumbnail.
 */

interface Props {
  countries: CountryOption[]
  playedIds: string[]
  hiddenIds: string[]
  userHomeCountry: string | null
  continentCounts: Record<ContinentKey, number>
}

export default function AtlasOverview({
  countries,
  playedIds,
  hiddenIds,
  userHomeCountry,
  continentCounts,
}: Props) {
  // Find the largest continent so we can give it the dark anchor card.
  // Ties resolve by key-order — deterministic enough; the visual lead is
  // just a hint, not a ranking.
  let anchorKey: ContinentKey = CONTINENT_KEYS[0]
  for (const key of CONTINENT_KEYS) {
    if (continentCounts[key] > continentCounts[anchorKey]) anchorKey = key
  }

  return (
    <div style={{ padding: '20px 16px 48px', maxWidth: 768, margin: '0 auto' }}>
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
        Explore by continent
      </div>

      <CourseBrowser
        countries={countries}
        playedIds={playedIds}
        hiddenIds={hiddenIds}
        userHomeCountry={userHomeCountry}
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
          margin: '24px 0 10px',
        }}
      >
        Continents
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
        }}
      >
        {CONTINENT_KEYS.map((key) => {
          const isAnchor = key === anchorKey
          const count = continentCounts[key] ?? 0
          return (
            <Link
              key={key}
              href={`/courses?c=${key}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 18,
                padding: '16px 14px',
                borderRadius: 12,
                textDecoration: 'none',
                minHeight: 100,
                background: isAnchor
                  ? 'var(--color-mgp-cover)'
                  : 'var(--color-mgp-cream-warm)',
                border: isAnchor
                  ? '1px solid var(--color-mgp-gold)'
                  : '0.5px solid var(--color-mgp-border)',
                color: isAnchor
                  ? 'var(--color-mgp-ink-inv)'
                  : 'var(--color-mgp-ink)',
                boxShadow: isAnchor
                  ? '0 2px 6px rgba(15, 37, 25, 0.18)'
                  : 'none',
                transition: 'transform 0.15s',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 19,
                  fontWeight: 500,
                  letterSpacing: -0.2,
                  lineHeight: 1.15,
                  color: isAnchor
                    ? 'var(--color-mgp-gold)'
                    : 'var(--color-mgp-ink)',
                }}
              >
                {CONTINENT_LABELS[key]}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
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
                    color: isAnchor
                      ? 'var(--color-mgp-cream)'
                      : 'var(--color-mgp-ink-3)',
                  }}
                >
                  {count === 1 ? 'course' : 'courses'}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-display)',
                    fontSize: 18,
                    fontWeight: 500,
                    color: isAnchor
                      ? 'var(--color-mgp-ink-inv)'
                      : 'var(--color-mgp-ink)',
                  }}
                >
                  {count.toLocaleString('en-US')}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div
        style={{
          marginTop: 22,
          textAlign: 'center',
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
        }}
      >
        Or view{' '}
        <Link
          href="/courses?view=map"
          style={{
            color: 'var(--color-mgp-gold-dark)',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          My Map →
        </Link>
      </div>
    </div>
  )
}
