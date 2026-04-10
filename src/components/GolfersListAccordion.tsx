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
  accentColor = '#1a5c38',
  accentText = '#fff',
  borderColor = '#e5e7eb',
}: Props) {
  const [open, setOpen] = useState(false)

  if (golfers.length === 0) return null

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>{emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{title}</span>
          <span style={{
            background: accentColor,
            color: accentText,
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}>
            {golfers.length}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid #f3f4f6' }}>
          {golfers.map((g, i) => (
            <div
              key={g.userId}
              style={{
                padding: '11px 16px',
                borderBottom: i < golfers.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <Link
                href={`/profile/${g.userId}`}
                style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', textDecoration: 'none' }}
              >
                {g.fullName}
              </Link>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                {(g.courseCount !== undefined || g.countryCount !== undefined || g.badgeCount !== undefined) && (
                  <div style={{ fontSize: 11, color: '#6b7280' }}>
                    {[
                      g.courseCount !== undefined && `${g.courseCount} courses`,
                      g.countryCount !== undefined && `${g.countryCount} countries`,
                      g.badgeCount  !== undefined && `${g.badgeCount} badges`,
                    ].filter(Boolean).join(' · ')}
                  </div>
                )}
                {g.handicap != null && (
                  <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>HCP {g.handicap}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
