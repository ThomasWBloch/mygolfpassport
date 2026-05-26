/**
 * RatingBadge — shared numeric rating display used across list/popup views.
 *
 * The 1-10 rating scale is too wide to show as star icons in a row on
 * narrow card layouts, so list views render the rating as a compact
 * "N/10" badge instead. Only the course-detail page (/courses/[id])
 * keeps the full stars-row treatment for the headline rating.
 *
 * `value` accepts integers (a single user's rating) or floats (averages
 * across multiple raters). Pass `avg=true` for averages to format with
 * one decimal place, `avg=false` (default) for an integer rating.
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
  const fontSize = size === 'md' ? 14 : 12
  const padding = size === 'md' ? '4px 10px' : '2px 8px'

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 2,
      padding,
      borderRadius: 6,
      background: 'var(--color-mgp-cream-warm)',
      border: '0.5px solid var(--color-mgp-gold)',
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
        fontSize: fontSize - 3,
        color: 'var(--color-mgp-ink-3)',
        fontWeight: 400,
      }}>
        /10
      </span>
    </span>
  )
}
