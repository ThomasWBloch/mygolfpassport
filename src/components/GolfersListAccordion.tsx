'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface GolferEntry {
  userId: string
  fullName: string
  handicap?: number | null
  courseCount?: number
  countryCount?: number
  badgeCount?: number
  note?: string | null
}

interface Props {
  title: string
  golfers: GolferEntry[]
  accentColor?: string
  accentText?: string
  borderColor?: string
  /** When set, only the first N entries render until the user clicks
      "See all". Omit to always render every entry. */
  pageSize?: number
}

export default function GolfersListAccordion({
  title,
  golfers,
  accentColor = 'var(--color-mgp-cover)',
  accentText = 'var(--color-mgp-ink-inv)',
  borderColor = 'var(--color-mgp-border)',
  pageSize,
}: Props) {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  if (golfers.length === 0) return null

  const visible = !pageSize || showAll ? golfers : golfers.slice(0, pageSize)
  const showSeeAll = !!pageSize && !showAll && golfers.length > pageSize

  return (
    <div style={{
      background: 'var(--color-mgp-paper)',
      borderRadius: 8,
      border: `0.5px solid ${borderColor}`,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-mgp-body)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 16, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.2,
          }}>{title}</span>
          <span style={{
            background: accentColor,
            color: accentText,
            borderRadius: 4,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, fontWeight: 700, letterSpacing: 1,
            padding: '3px 8px',
          }}>
            {golfers.length}
          </span>
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '0.5px solid var(--color-mgp-border-faint)' }}>
          {visible.map((g, i) => {
            const isLast = i === visible.length - 1
            const hasStats = g.courseCount !== undefined || g.countryCount !== undefined || g.badgeCount !== undefined
            return (
              <div
                key={g.userId}
                style={{
                  padding: '11px 16px',
                  borderBottom: !isLast || showSeeAll ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}>
                  <Link
                    href={`/profile/${g.userId}`}
                    style={{
                      fontSize: 14, fontWeight: 500,
                      color: 'var(--color-mgp-ink)',
                      textDecoration: 'none',
                    }}
                  >
                    {g.fullName}
                  </Link>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    {hasStats && (
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 10, letterSpacing: 1,
                        color: 'var(--color-mgp-ink-3)',
                      }}>
                        {[
                          g.courseCount !== undefined && `${g.courseCount} courses`,
                          g.countryCount !== undefined && `${g.countryCount} countries`,
                          g.badgeCount  !== undefined && `${g.badgeCount} badges`,
                        ].filter(Boolean).join(' · ')}
                      </div>
                    )}
                    {g.handicap != null && (
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                        color: 'var(--color-mgp-gold-dark)',
                        marginTop: 2,
                      }}>HCP {g.handicap}</div>
                    )}
                  </div>
                </div>
                {g.note && (
                  <div style={{
                    marginTop: 6,
                    fontFamily: 'var(--font-mgp-display)',
                    fontSize: 14,
                    fontStyle: 'italic',
                    color: 'var(--color-mgp-ink-2)',
                    lineHeight: 1.5,
                  }}>
                    {'“'}{g.note}{'”'}
                  </div>
                )}
              </div>
            )
          })}

          {showSeeAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderTop: '0.5px solid var(--color-mgp-border-faint)',
                padding: '12px 16px',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-cover)',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              See all {golfers.length} entries
            </button>
          )}
        </div>
      )}
    </div>
  )
}
