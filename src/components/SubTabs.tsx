import Link from 'next/link'

/**
 * SubTabs — pill-style segmented control used at the top of section pages
 * to switch between sibling views (e.g. Course Atlas / My Map on /courses).
 *
 * The parent owns the outer layout (max-width, padding) — this component
 * only renders the pill container itself. getHref lets the parent decide
 * exactly how the active value is serialised into the URL.
 */

export type SubTabOption = { value: string; label: string }

interface Props {
  options: SubTabOption[]
  active: string
  getHref: (value: string) => string
}

export default function SubTabs({ options, active, getHref }: Props) {
  return (
    <div
      style={{
        height: 40,
        borderRadius: 20,
        background: 'var(--color-mgp-cream-cool)',
        border: '0.5px solid var(--color-mgp-gold)',
        padding: 4,
        display: 'flex',
      }}
    >
      {options.map((opt) => {
        const isActive = opt.value === active
        return (
          <Link
            key={opt.value}
            href={getHref(opt.value)}
            style={{
              flex: 1,
              height: 32,
              borderRadius: 16,
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              padding: '0 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              transition: 'background 0.15s',
              background: isActive ? 'var(--color-mgp-cover)' : 'transparent',
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
  )
}
