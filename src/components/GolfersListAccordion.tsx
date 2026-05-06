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
}

interface Props {
  title: string
  emoji: string
  golfers: GolferEntry[]
  accentColor?: string
  accentText?: string
  borderColor?: string
}

export default function GolfersListAccordion({
  title,
  emoji,
  golfers,
  accentColor = 'var(--color-mgp-cover)',
  accentText = 'var(--color-mgp-ink-inv)',
  borderColor = 'var(--color-mgp-border)',
}: Props) {
  const [open, setOpen] = useState(false)

  if (golfers.length === 0) return null

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
          <span style={{ fontSize: 16 }}>{emoji}</span>
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
          {golfers.map((g, i) => (
            <div
              key={g.userId}
              style={{
                padding: '11px 16px',
                borderBottom: i < golfers.length - 1 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
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
                {(g.courseCount !== undefined || g.countryCount !== undefined || g.badgeCount !== undefined) && (
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
          ))}
        </div>
      )}
    </div>
  )
}
