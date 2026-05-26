'use client'

import { useState } from 'react'
import Link from 'next/link'
import RatingBadge from '@/components/RatingBadge'

interface CourseItem {
  id: string
  name: string
  club: string | null
  userRating: number | null
  globalRating: number | null
  note: string | null
  playedAt: string | null
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
            fontSize: 11, letterSpacing: 1.5, fontWeight: 700,
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
                  fontWeight: 600,
                  fontSize: 11, letterSpacing: 1.2,
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
                <RatingBadge value={course.userRating} />
              </div>
            )}
          </div>

          {course.globalRating != null && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 6,
            }}>
              <span style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontWeight: 600,
                fontSize: 11, letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
              }}>
                Global avg
              </span>
              <RatingBadge value={course.globalRating} avg />
            </div>
          )}

          {course.note && <NoteText text={course.note} />}
        </div>
      ))}
    </div>
  )
}
