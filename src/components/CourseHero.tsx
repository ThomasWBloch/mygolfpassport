import Link from 'next/link'
import { buildClubHref } from '@/lib/links'

/**
 * CourseHero — illustrative passport-style hero for /courses/[id].
 *
 * Adventure design system. No course photo — instead we lean into the
 * passport metaphor: large flag as background watermark, Cormorant display
 * type for the name, stamp-typography for stats, and a passport stamp on the
 * right that either records the user's visit or invites them to set one.
 *
 * Layout (mobile, ~398px wide):
 *   ┌─────────────────────────────────────┐
 *   │                                  🇩🇰 │  ← flag watermark
 *   │  COURSE NAME (Cormorant)            │
 *   │  Club name →                        │
 *   │                          ┌────────┐ │
 *   │  18 HOLES · PAR 72 ·     │ STAMP  │ │
 *   │  FOUNDED 1850            │  zone  │ │
 *   │  [Major venue] [Top 100] └────────┘ │
 *   └─────────────────────────────────────┘
 */

interface Props {
  courseId: string
  courseName: string
  club: string | null
  country: string | null
  flag: string | null
  holes: number | null
  par: number | null
  foundedYear: number | null
  isMajor: boolean
  top100Rank: number | null
  top100ListName: string | null
  /** ISO date string when the user played this course; null if not played yet. */
  playedAt: string | null
}

export default function CourseHero({
  courseId,
  courseName,
  club,
  country,
  flag,
  holes,
  par,
  foundedYear,
  isMajor,
  top100Rank,
  top100ListName,
  playedAt,
}: Props) {
  const clubHref = buildClubHref(country, club)
  const playedYear = playedAt ? new Date(playedAt).getFullYear() : null

  // Stats line in stamp typography
  const stats = [
    holes && `${holes} HOLES`,
    par && `PAR ${par}`,
    foundedYear && `EST. ${foundedYear}`,
  ].filter(Boolean) as string[]

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--color-mgp-cream-warm)',
        borderTop: '1.5px solid var(--color-mgp-border-strong)',
        borderBottom: '1.5px solid var(--color-mgp-border-strong)',
        overflow: 'hidden',
      }}
    >
      {/* Perforated tear-edge — purely decorative top strip evoking a passport page */}
      <PerforatedEdge position="top" />

      <div
        style={{
          position: 'relative',
          padding: '24px 18px 22px',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        {/* ── Left: text content ─────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Eyebrow: country */}
          {country && (
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
              {flag ? `${flag} ` : ''}{country}
            </div>
          )}

          {/* Course name */}
          <h1
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 26,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              margin: 0,
              lineHeight: 1.15,
              letterSpacing: -0.3,
            }}
          >
            {courseName}
          </h1>

          {/* Club */}
          {club && (
            <div style={{ marginTop: 6 }}>
              {clubHref ? (
                <Link
                  href={clubHref}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--color-mgp-ink-2)',
                    textDecoration: 'none',
                  }}
                >
                  {club} ›
                </Link>
              ) : (
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-mgp-ink-2)' }}>
                  {club}
                </span>
              )}
            </div>
          )}

          {/* Stats row */}
          {stats.length > 0 && (
            <div
              style={{
                marginTop: 14,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11,
                letterSpacing: 1.5,
                color: 'var(--color-mgp-ink-2)',
                lineHeight: 1.6,
              }}
            >
              {stats.join(' · ')}
            </div>
          )}

          {/* Wax-seal style accolades */}
          {(isMajor || top100Rank != null) && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {isMajor && (
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 10,
                    letterSpacing: 1.5,
                    padding: '4px 10px',
                    background: 'var(--color-mgp-gold)',
                    color: 'var(--color-mgp-cover-ink)',
                    borderRadius: 2,
                    border: '0.5px solid var(--color-mgp-gold-dark)',
                  }}
                >
                  MAJOR VENUE
                </span>
              )}
              {top100Rank != null && (
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 10,
                    letterSpacing: 1.5,
                    padding: '4px 10px',
                    background: 'transparent',
                    color: 'var(--color-mgp-ink)',
                    border: '1px solid var(--color-mgp-border-strong)',
                    borderRadius: 2,
                  }}
                >
                  TOP {top100ListName ?? '100'}{top100Rank ? ` · #${top100Rank}` : ''}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ── Right: stamp overlay ────────────────────────────────────── */}
        <div style={{ flexShrink: 0, paddingTop: 8 }}>
          {playedAt ? (
            <PlayedStamp year={playedYear ?? new Date().getFullYear()} />
          ) : (
            <StampHereCta courseId={courseId} />
          )}
        </div>
      </div>

      {/* Perforated tear-edge — bottom strip */}
      <PerforatedEdge position="bottom" />
    </section>
  )
}

// ── Stamp variants ───────────────────────────────────────────────────────────

function PlayedStamp({ year }: { year: number }) {
  return (
    <div
      aria-label={`Played in ${year}`}
      style={{
        width: 86,
        height: 86,
        borderRadius: '50%',
        border: '2px dashed var(--color-mgp-stamp-red)',
        transform: 'rotate(-8deg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mgp-stamp)',
        color: 'var(--color-mgp-stamp-red)',
        textAlign: 'center',
        gap: 2,
        background: 'rgba(168, 74, 44, 0.04)',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: 2 }}>VISITED</div>
      <div style={{ fontSize: 22, fontWeight: 400, lineHeight: 1, letterSpacing: 1 }}>{year}</div>
      <div style={{
        width: 48,
        borderTop: '0.5px solid var(--color-mgp-stamp-red)',
        opacity: 0.5,
      }} />
    </div>
  )
}

function StampHereCta({ courseId }: { courseId: string }) {
  return (
    <Link
      href={`/log?course=${courseId}`}
      aria-label="Stamp this course"
      style={{
        textDecoration: 'none',
        width: 86,
        height: 86,
        borderRadius: '50%',
        border: '2px dashed var(--color-mgp-ink-3)',
        transform: 'rotate(-4deg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mgp-stamp)',
        color: 'var(--color-mgp-ink-2)',
        textAlign: 'center',
        gap: 3,
        background: 'rgba(31, 58, 46, 0.03)',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: 2 }}>STAMP</div>
      <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1, letterSpacing: 1 }}>HERE</div>
      <div style={{ fontSize: 16, lineHeight: 1, marginTop: 2 }}>+</div>
    </Link>
  )
}

// ── Decorative edges ────────────────────────────────────────────────────────

/**
 * Perforated edge — a row of small circular punches that evoke a passport
 * page or ticket stub. Pure CSS, no SVG asset.
 */
function PerforatedEdge({ position }: { position: 'top' | 'bottom' }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: -4,
        height: 8,
        backgroundImage:
          'radial-gradient(circle, var(--color-mgp-cream) 3px, transparent 3.5px)',
        backgroundSize: '14px 8px',
        backgroundPosition: '7px 50%',
        backgroundRepeat: 'repeat-x',
        zIndex: 1,
      }}
    />
  )
}
