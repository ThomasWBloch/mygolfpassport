'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface FriendRound {
  userId: string
  fullName: string
  note: string | null
  courseCount?: number
  countryCount?: number
  badgeCount?: number
  handicap?: number | null
}

interface Props {
  friends: FriendRound[]
}

export default function FriendsWhoPlayedAccordion({ friends }: Props) {
  const [open, setOpen] = useState(false)

  if (friends.length === 0) return null

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #a7d5b8', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: open ? '#e8f5ee' : '#fff',
          border: 'none',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.15s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>👥</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1a5c38' }}>
            Venner der har spillet banen
          </span>
          <span style={{
            background: '#1a5c38',
            color: '#fff',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}>
            {friends.length}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid #d1fae5' }}>
          {friends.map((f, i) => (
            <div
              key={f.userId}
              style={{
                padding: '12px 16px',
                borderBottom: i < friends.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: f.note ? 4 : 0, gap: 8 }}>
                <Link
                  href={`/profile/${f.userId}`}
                  style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}
                >
                  {f.fullName}
                </Link>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {(f.courseCount !== undefined || f.countryCount !== undefined || f.badgeCount !== undefined) && (
                    <div style={{ fontSize: 11, color: '#6b7280' }}>
                      {[
                        f.courseCount !== undefined && `${f.courseCount} baner`,
                        f.countryCount !== undefined && `${f.countryCount} lande`,
                        f.badgeCount  !== undefined && `${f.badgeCount} badges`,
                      ].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  {f.handicap != null && (
                    <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>HCP {f.handicap}</div>
                  )}
                </div>
              </div>
              {f.note && (
                <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
                  &ldquo;{f.note}&rdquo;
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
