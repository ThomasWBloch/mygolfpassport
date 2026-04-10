'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface Review {
  userId: string
  fullName: string
  note: string | null
  courseCount?: number
  countryCount?: number
  badgeCount?: number
  handicap?: number | null
}

interface Props {
  reviews: Review[]
}

export default function CourseReviewsAccordion({ reviews }: Props) {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? reviews : reviews.slice(0, 5)

  if (reviews.length === 0) return null

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
            ⛳ Others who've played this course
          </span>
          <span style={{
            marginLeft: 8,
            background: '#1a5c38',
            color: '#fff',
            borderRadius: 10,
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
          }}>
            {reviews.length}
          </span>
        </div>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid #f3f4f6' }}>
          {visible.map((r, i) => (
            <div
              key={r.userId + i}
              style={{
                padding: '12px 16px',
                borderBottom: i < visible.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: r.note ? 4 : 0, gap: 8 }}>
                <Link
                  href={`/profile/${r.userId}`}
                  style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}
                >
                  {r.fullName}
                </Link>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  {(r.courseCount !== undefined || r.countryCount !== undefined || r.badgeCount !== undefined) && (
                    <div style={{ fontSize: 11, color: '#6b7280' }}>
                      {[
                        r.courseCount !== undefined && `${r.courseCount} courses`,
                        r.countryCount !== undefined && `${r.countryCount} countries`,
                        r.badgeCount  !== undefined && `${r.badgeCount} badges`,
                      ].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  {r.handicap != null && (
                    <div style={{ fontSize: 11, color: '#c9a84c', fontWeight: 700 }}>HCP {r.handicap}</div>
                  )}
                </div>
              </div>
              {r.note && (
                <div style={{ fontSize: 12, color: '#6b7280', fontStyle: 'italic' }}>
                  &ldquo;{r.note}&rdquo;
                </div>
              )}
            </div>
          ))}

          {reviews.length > 5 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderTop: '1px solid #f3f4f6',
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 600,
                color: '#1a5c38',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              See all {reviews.length} reviews
            </button>
          )}
        </div>
      )}
    </div>
  )
}
