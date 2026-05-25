import Link from 'next/link'
import {
  CONTINENT_KEYS,
  CONTINENT_LABELS,
  type ContinentKey,
} from '@/lib/continents'

/**
 * Horizontal scrolling row of six continent pills sitting just above the
 * Atlas map. Clicking an inactive pill sets ?c=<key>; clicking the active
 * pill clears the scope back to world view.
 */

interface Props {
  active: ContinentKey | null
  counts: Record<ContinentKey, number>
}

export default function AtlasContinentPills({ active, counts }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        padding: '0 14px',
        margin: '0 -14px',
        scrollbarWidth: 'none',
      }}
      className="atlas-pill-row"
    >
      <style>{`.atlas-pill-row::-webkit-scrollbar { display: none; }`}</style>
      {CONTINENT_KEYS.map((key) => {
        const isActive = active === key
        const count = counts[key] ?? 0
        const href = isActive ? '/courses' : `/courses?c=${key}`
        return (
          <Link
            key={key}
            href={href}
            style={{
              flex: '0 0 auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              borderRadius: 999,
              border: isActive
                ? '1px solid var(--color-mgp-gold)'
                : '0.5px solid var(--color-mgp-border)',
              background: isActive
                ? 'var(--color-mgp-cream-warm)'
                : 'var(--color-mgp-cream)',
              color: 'var(--color-mgp-ink)',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 11,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s, border-color 0.15s',
            }}
          >
            <span>{CONTINENT_LABELS[key]}</span>
            <span
              style={{
                fontFamily: 'var(--font-mgp-body)',
                fontSize: 11,
                letterSpacing: 0,
                textTransform: 'none',
                color: isActive
                  ? 'var(--color-mgp-ink-2)'
                  : 'var(--color-mgp-ink-3)',
                fontWeight: 500,
              }}
            >
              {count.toLocaleString('en-US')}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
