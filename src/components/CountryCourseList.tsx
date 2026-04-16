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

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating)
  return (
    <span style={{ color: '#c9a84c', letterSpacing: 1, fontSize: 14 }}>
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  )
}

function NoteText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = text.length > 100

  return (
    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6, lineHeight: 1.5 }}>
      {expanded || !isLong ? text : text.slice(0, 100) + '...'}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#1a5c38', fontWeight: 600, fontSize: 12, padding: '0 4px',
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
            background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
            padding: '14px 16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
            <Link
              href={`/courses/${course.id}`}
              style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {course.club ?? course.name}
              </div>
              {course.club && course.club !== course.name && (
                <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>
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
            <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 4 }}>
              Global avg: {course.globalRating.toFixed(1)} ⭐
            </div>
          )}

          {course.note && <NoteText text={course.note} />}
        </div>
      ))}
    </div>
  )
}
