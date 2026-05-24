/**
 * Small uppercase stamp-typography eyebrow used above each band on the home
 * page and the Social feed. Pure presentational — works in any tree.
 */

export default function SectionEyebrow({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        color: 'var(--color-mgp-ink-3)',
      }}
    >
      {children}
    </div>
  )
}
