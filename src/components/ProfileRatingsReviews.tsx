'use client'

import { useState } from 'react'

/**
 * ProfileRatingsReviews — two collapsible tiles for the /you Profile tab,
 * placed between the PassportCard and the Settings tile.
 *
 *  • Ratings tile  — collapses to the average + a mini distribution bar
 *    (the "total overview"); expands to the full list of every rated round,
 *    sortable high→low / low→high. Each row shows a 10-star scale + N/10.
 *  • Reviews tile  — the written notes. Shows the 3 most recent as a teaser
 *    that expands to the full text on tap; "Open all reviews" reveals the
 *    rest inline (same tab, no navigation).
 *
 * Club name renders first (house convention); the course name is shown as a
 * sub-label only when it's distinctive — generic "18-hole course" style
 * names are suppressed so the meta line stays clean.
 */

export type RatingRow = {
  club: string
  name: string
  country: string
  rating: number
  played: string
}
export type ReviewRow = RatingRow & { note: string }

const GENERIC = /^18(\s|-|$)|^par\s*3$|hole course/i
function courseTag(name: string): string {
  const n = (name ?? '').trim()
  return n && !GENERIC.test(n) ? n : ''
}
function metaLine(row: RatingRow): string {
  return [courseTag(row.name), row.country, row.played].filter(Boolean).join(' · ')
}

function Stars({ value }: { value: number }) {
  return (
    <span
      aria-label={`${value} out of 10`}
      style={{ fontSize: 15, letterSpacing: 1, whiteSpace: 'nowrap' }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{ color: i < value ? 'var(--color-mgp-gold)' : 'var(--color-mgp-border-faint)' }}
        >
          ★
        </span>
      ))}
    </span>
  )
}

function RatingValue({ value }: { value: number }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mgp-display)',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--color-mgp-gold-dark)',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
      <span style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)', fontWeight: 400 }}>/10</span>
    </span>
  )
}

const tileStyle: React.CSSProperties = {
  background: 'var(--color-mgp-paper)',
  border: '1px solid var(--color-mgp-border-faint)',
  borderRadius: 14,
  overflow: 'hidden',
}
const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-stamp)',
  fontWeight: 700,
  fontSize: 11,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  color: 'var(--color-mgp-ink-3)',
}
const clubName: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-display)',
  fontSize: 16,
  color: 'var(--color-mgp-ink)',
  lineHeight: 1.15,
  paddingRight: 10,
}
const subMeta: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-body)',
  fontSize: 12,
  color: 'var(--color-mgp-ink-3)',
  marginTop: 1,
}

// ── Ratings tile ──────────────────────────────────────────────────────────────

function RatingsTile({ ratings }: { ratings: RatingRow[] }) {
  const [open, setOpen] = useState(false)
  const [dir, setDir] = useState<'desc' | 'asc'>('desc')

  const count = ratings.length
  const avg = count ? (ratings.reduce((s, r) => s + r.rating, 0) / count) : 0

  const dist: number[] = Array.from({ length: 11 }, () => 0)
  for (const r of ratings) dist[r.rating] = (dist[r.rating] ?? 0) + 1
  const distMax = Math.max(1, ...dist.slice(1))

  const sorted = [...ratings].sort((a, b) => (dir === 'asc' ? a.rating - b.rating : b.rating - a.rating))

  return (
    <section style={tileStyle}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%', boxSizing: 'border-box', padding: '14px 16px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={eyebrow}>Ratings</span>
          <span style={{ color: 'var(--color-mgp-gold-dark)', fontSize: 13 }}>{open ? '▴' : '▾'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 8 }}>
          <span style={{ fontFamily: 'var(--font-mgp-display)', fontWeight: 700, fontSize: 40, lineHeight: 1, color: 'var(--color-mgp-ink)' }}>
            {count ? avg.toFixed(1) : '–'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingBottom: 5 }}>
            <span style={{ fontFamily: 'var(--font-mgp-body)', fontSize: 12, color: 'var(--color-mgp-ink-2)' }}>
              {count} {count === 1 ? 'rating' : 'ratings'} · average
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 22 }} aria-hidden>
              {Array.from({ length: 9 }, (_, k) => {
                const v = dist[k + 2] ?? 0
                const h = v ? Math.max(2, Math.round((v / distMax) * 22)) : 2
                return (
                  <div
                    key={k}
                    style={{
                      width: 7,
                      height: h,
                      borderRadius: 1,
                      background: v === distMax ? 'var(--color-mgp-gold-dark)' : v ? 'var(--color-mgp-gold)' : 'var(--color-mgp-border-faint)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--color-mgp-border-faint)', padding: '10px 16px 14px' }}>
          {count === 0 ? (
            <div style={{ padding: '12px 0', fontFamily: 'var(--font-mgp-body)', fontSize: 13, color: 'var(--color-mgp-ink-3)' }}>
              No ratings yet.
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                {(['desc', 'asc'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDir(d)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 11,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      borderRadius: 6,
                      padding: '5px 10px',
                      color: dir === d ? 'var(--color-mgp-cover-ink)' : 'var(--color-mgp-ink-2)',
                      background: dir === d ? 'var(--color-mgp-gold)' : 'var(--color-mgp-cream-cool)',
                    }}
                  >
                    {d === 'desc' ? 'High → low' : 'Low → high'}
                  </button>
                ))}
              </div>
              {sorted.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '7px 0',
                    borderBottom: i < sorted.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <span style={clubName}>{r.club}</span>
                    <RatingValue value={r.rating} />
                  </div>
                  {metaLine(r) && <div style={subMeta}>{metaLine(r)}</div>}
                  <div style={{ marginTop: 3 }}><Stars value={r.rating} /></div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </section>
  )
}

// ── Reviews tile ──────────────────────────────────────────────────────────────

function ReviewsTile({ reviews }: { reviews: ReviewRow[] }) {
  const [showAll, setShowAll] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  if (reviews.length === 0) return null

  const visible = showAll ? reviews : reviews.slice(0, 1)
  const toggle = (i: number) =>
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  const TEASER = 90

  return (
    <section style={tileStyle}>
      <div style={{ padding: '14px 16px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={eyebrow}>Recent reviews</span>
        <span style={{ fontFamily: 'var(--font-mgp-body)', fontSize: 11, color: 'var(--color-mgp-ink-3)' }}>
          {reviews.length} written
        </span>
      </div>

      <div style={{ padding: '4px 16px 4px' }}>
        {visible.map((r, i) => {
          const long = r.note.length > TEASER
          const isOpen = expanded.has(i)
          const text = !long || isOpen ? r.note : r.note.slice(0, TEASER).trimEnd() + '…'
          return (
            <div
              key={i}
              style={{ padding: '9px 0', borderBottom: i < visible.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={clubName}>{r.club}</span>
                {r.rating > 0 && <RatingValue value={r.rating} />}
              </div>
              {metaLine(r) && <div style={subMeta}>{metaLine(r)}</div>}
              {r.rating > 0 && <div style={{ marginTop: 3 }}><Stars value={r.rating} /></div>}
              <div style={{ fontFamily: 'var(--font-mgp-body)', fontSize: 12, color: 'var(--color-mgp-ink-2)', marginTop: 4, lineHeight: 1.45 }}>
                “{text}”
                {long && (
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    style={{ all: 'unset', cursor: 'pointer', color: 'var(--color-mgp-gold-dark)', fontWeight: 600, marginLeft: 4 }}
                  >
                    {isOpen ? 'less' : 'more ›'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {reviews.length > 1 && (
        <button
          type="button"
          onClick={() => setShowAll(s => !s)}
          style={{
            all: 'unset',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            textAlign: 'center',
            borderTop: '1px solid var(--color-mgp-border-faint)',
            padding: 12,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            letterSpacing: 1,
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'var(--color-mgp-gold-dark)',
          }}
        >
          {showAll ? 'Show fewer ▴' : `Open all reviews (${reviews.length}) ▾`}
        </button>
      )}
    </section>
  )
}

export default function ProfileRatingsReviews({ ratings, reviews }: { ratings: RatingRow[]; reviews: ReviewRow[] }) {
  if (ratings.length === 0 && reviews.length === 0) return null
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <RatingsTile ratings={ratings} />
      <ReviewsTile reviews={reviews} />
    </div>
  )
}
