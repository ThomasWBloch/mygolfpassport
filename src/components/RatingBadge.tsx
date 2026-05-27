/**
 * RatingBadge — shared inline rating display used across list/popup views.
 *
 * Renders the rating as plain text in the format "N ★" (single rating) or
 * "N.N ★" (average across multiple raters). No border, no background — the
 * earlier framed pill shape made the digits illegibly small in tight
 * card rows. Cormorant display font + the gold-dark token mirror the
 * action-verb stamps so the number reads as a stat, not a button.
 *
 * Only the rating-INPUT screen (LogForm) shows the full 10-star row.
 * Every display surface uses this component.
 */

interface Props {
  value: number
  /** True when the value is an average across multiple ratings (shows 1 decimal). */
  avg?: boolean
  /** Visual size. 'sm' = compact inline, 'md' = card-level. */
  size?: 'sm' | 'md'
}

export default function RatingBadge({ value, avg = false, size = 'sm' }: Props) {
  const display = avg ? value.toFixed(1) : Math.round(value).toString()
  const fontSize = size === 'md' ? 16 : 14
  const starSize = size === 'md' ? 14 : 12

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 3,
      fontFamily: 'var(--font-mgp-display)',
      fontSize,
      fontWeight: 500,
      color: 'var(--color-mgp-gold-dark)',
      letterSpacing: -0.2,
      whiteSpace: 'nowrap',
      lineHeight: 1,
    }}>
      <span>{display}</span>
      <span style={{
        fontSize: starSize,
        color: 'var(--color-mgp-gold)',
        lineHeight: 1,
      }}>★</span>
    </span>
  )
}
