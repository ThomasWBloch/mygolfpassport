'use client'

import { useState } from 'react'

export interface GolferEntry {
  fullName: string
  handicap?: number | null
}

interface Props {
  title: string
  emoji: string
  golfers: GolferEntry[]
  accentColor?: string   // badge background
  accentText?: string    // badge text colour
  borderColor?: string   // card border
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
              key={i}
              style={{
                padding: '11px 16px',
                borderBottom: i < golfers.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{g.fullName}</span>
              {g.handicap != null && (
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                  HCP <span style={{ color: '#c9a84c', fontWeight: 700 }}>{g.handicap}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
