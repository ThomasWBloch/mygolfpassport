'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

/**
 * BackButton — referrer-aware back navigation.
 *
 * Uses `router.back()` when there is in-app history to return to. On a fresh
 * deep-link load (e.g. user opened the page from a notification or external
 * link, no in-app history) we fall back to the explicit `fallback` href.
 *
 * Renders as a Link to the fallback by default so the element is a real
 * anchor for accessibility / keyboard tab order; on click we hijack to the
 * back-with-fallback flow.
 *
 * Used by: /log (LogForm TopBar), /courses/[id], /profile/edit, /badges, and
 * any future sub-page that previously hardcoded a back href.
 */

interface Props {
  /** Where to go if there's no in-app history to return to. */
  fallback: string
  /** Visible label, e.g. "← Back" or "← Map" or "← Profile". */
  label?: string
  /** Optional aria-label override (defaults to label). */
  ariaLabel?: string
  /** Inline style overrides — typed as CSSProperties for safety. */
  style?: React.CSSProperties
}

export default function BackButton({
  fallback,
  label = '← Back',
  ariaLabel,
  style,
}: Props) {
  const router = useRouter()

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // window.history.length is 1 when this is the very first entry in this
    // tab's history (cold deep-link). For any in-app navigation it grows to
    // ≥ 2, so > 1 means "we have somewhere to go back to".
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  const baseStyle: React.CSSProperties = {
    color: 'var(--color-mgp-gold)',
    fontSize: 13,
    fontWeight: 500,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-mgp-body)',
    cursor: 'pointer',
  }

  return (
    <Link
      href={fallback}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      style={{ ...baseStyle, ...style }}
    >
      {label}
    </Link>
  )
}
