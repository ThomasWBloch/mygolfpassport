'use client'

import { useState } from 'react'

export interface Review {
  fullName: string
  rating: number | null
  note: string | null
  playedAt: string | null
}

interface Props {
  reviews: Review[]
}

function formatDate(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' })
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
                ⛳ Golfere der har spillet banen
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
                  key={i}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < visible.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{r.fullName}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {r.rating != null && r.rating > 0 && (
                        <span style={{ fontSize: 13, color: '#c9a84c' }}>
                          {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                        </span>
                      )}
                      {r.playedAt && (
                        <span style={{ fontSize: 11, color: '#9ca3af' }}>{formatDate(r.playedAt)}</span>
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
                  Se alle {reviews.length} anmeldelser
                </button>
              )}
            </div>
          )}
    </div>
  )
}
