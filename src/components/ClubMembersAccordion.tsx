'use client'

import { useState } from 'react'

export interface ClubMember {
  fullName: string
  handicap: number | null
}

interface Props {
  members: ClubMember[]
  clubName: string
}

export default function ClubMembersAccordion({ members, clubName }: Props) {
  const [open, setOpen] = useState(false)

  if (members.length === 0) return null

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
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
        <div>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>
            👥 Klubmedlemmer med appen
          </span>
          <span style={{
            marginLeft: 8,
            background: '#c9a84c',
            color: '#7a5a00',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}>
            {members.length}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid #f3f4f6' }}>
          {members.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '12px 16px',
                borderBottom: i < members.length - 1 ? '1px solid #f3f4f6' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{m.fullName}</span>
              {m.handicap != null && (
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                  HCP <span style={{ color: '#c9a84c', fontWeight: 700 }}>{m.handicap}</span>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
