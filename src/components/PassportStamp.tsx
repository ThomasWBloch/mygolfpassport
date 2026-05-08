/**
 * PassportStamp — the canonical "VISITED [year]" passport-stamp shape used
 * across the app. Single source of truth so a future stamp redesign (jagged
 * edges, country-subtle details, oval/rectangular variants, etc.) only
 * touches one file.
 *
 * Used on:
 *  - CourseHero — small 86px stamp in the top-right corner when played
 *  - LogForm success step — large 180px hero stamp that slams in after save
 *  - FeedCard round items — small 44px stamp on the right side (currently
 *    inlined; can be migrated when convenient)
 *
 * The "STAMP HERE +" CTA variant on CourseHero is intentionally NOT here —
 * it's a Link with different semantics (a call-to-action, not a record of
 * past action). Keep it separate.
 */

interface Props {
  /** Year to display (e.g. 2026 — printed below the VISITED label). */
  year: number
  /** Diameter in px. Defaults to 86 (CourseHero size). */
  size?: number
  /** Rotation in degrees. Defaults to -8 (slight hand-stamped tilt). */
  rotate?: number
  /** Apply slam-in animation. Used by LogForm success step. */
  animate?: boolean
  /** ARIA label override; defaults to "Visited in {year}". */
  ariaLabel?: string
}

export default function PassportStamp({
  year,
  size = 86,
  rotate = -8,
  animate = false,
  ariaLabel,
}: Props) {
  // Derive interior typography sizes from the diameter so the stamp scales
  // cleanly. The 86px reference uses 9px label / 22px year.
  const labelFontSize = Math.max(9, Math.round(size * 0.105))
  const yearFontSize = Math.max(20, Math.round(size * 0.26))
  const underlineWidth = Math.round(size * 0.55)
  const subBottomWidth = Math.round(size * 0.4)
  const borderWidth = size >= 140 ? 4 : 2

  return (
    <>
      {animate && (
        <style>{`
          @keyframes passportStampSlam {
            0%   { transform: rotate(${rotate - 18}deg) scale(2.4); opacity: 0; }
            55%  { transform: rotate(${rotate - 2}deg) scale(0.9); opacity: 1; }
            75%  { transform: rotate(${rotate + 1}deg) scale(1.05); }
            100% { transform: rotate(${rotate}deg) scale(1); opacity: 1; }
          }
          .passport-stamp-slam { animation: passportStampSlam 0.6s cubic-bezier(.34,1.56,.64,1) both; }
        `}</style>
      )}
      <div
        className={animate ? 'passport-stamp-slam' : undefined}
        aria-label={ariaLabel ?? `Visited in ${year}`}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          border: `${borderWidth}px dashed var(--color-mgp-stamp-red)`,
          transform: `rotate(${rotate}deg)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mgp-stamp)',
          color: 'var(--color-mgp-stamp-red)',
          textAlign: 'center',
          gap: Math.max(2, Math.round(size * 0.025)),
          background: 'rgba(168, 74, 44, 0.04)',
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: labelFontSize, letterSpacing: 2 }}>VISITED</div>
        <div
          style={{
            fontSize: yearFontSize,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: 1,
          }}
        >
          {year}
        </div>
        <div
          aria-hidden
          style={{
            width: underlineWidth,
            borderTop: '0.5px solid var(--color-mgp-stamp-red)',
            opacity: 0.5,
          }}
        />
        {size >= 140 && (
          <div
            aria-hidden
            style={{
              fontSize: Math.round(size * 0.06),
              letterSpacing: 2,
              opacity: 0.6,
              marginTop: 2,
              width: subBottomWidth,
              textAlign: 'center',
            }}
          >
            PASSPORT · MGP
          </div>
        )}
      </div>
    </>
  )
}
