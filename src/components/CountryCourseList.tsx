'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CourseItem {
  id: string
  name: string
  club: string | null
  userRating: number | null
  globalRating: number | null
  note: string | null
  playedAt: string | null
}

// Stamp-style 5-star row — gold-dark filled vs border-faint empty,
// matches the WorldMap popup pattern so ratings read as one motif app-wide.
function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span style={{ fontSize: 14, letterSpacing: 2 }}>
      <span style={{ color: 'var(--color-mgp-gold-dark)' }}>{'★'.repeat(full)}</span>
      <span style={{ color: 'var(--color-mgp-border-faint)' }}>{'★'.repeat(5 - full)}</span>
    </span>
  )
}

function NoteText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 100

  return (
    <div style={{
      fontFamily: 'var(--font-mgp-body)',
      fontSize: 13,
      color: 'var(--color-mgp-ink-2)',
      marginTop: 8,
      lineHeight: 1.5,
    }}>
      {expanded || !isLong ? text : text.slice(0, 100) + '...'}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, letterSpacing: 1.5, fontWeight: 700,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-gold-dark)',
            padding: '4px 0',
            marginLeft: 4,
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export default function CountryCourseList({ courses }: { courses: CourseItem[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {courses.map(course => (
        <div
          key={course.id}
          style={{
            background: 'var(--color-mgp-paper)',
            border: '0.5px solid var(--color-mgp-border-faint)',
            borderRadius: 8,
            padding: '14px 16px',
            boxShadow: '0 1px 3px rgba(15, 37, 25, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <Link
              href={`/courses/${course.id}`}
              style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}
            >
              <div style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 17, fontWeight: 500,
                color: 'var(--color-mgp-ink)',
                letterSpacing: -0.2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {course.club ?? course.name}
              </div>
              {course.club && course.club !== course.name && (
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10, letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                  marginTop: 3,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {course.name}
                </div>
              )}
            </Link>
            {course.userRating != null && (
              <div style={{ flexShrink: 0 }}>
                <Stars rating={course.userRating} />
              </div>
            )}
          </div>

          {course.globalRating != null && (
            <div style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10, letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginTop: 6,
            }}>
              Global avg · {course.globalRating.toFixed(1)}{' '}
              <span style={{ color: 'var(--color-mgp-gold-dark)' }}>★</span>
            </div>
          )}

          {course.note && <NoteText text={course.note} />}
        </div>
      ))}
    </div>
  )
}
