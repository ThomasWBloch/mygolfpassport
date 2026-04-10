'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export interface CourseRow {
  id: string
  name: string
  club: string | null
  holes: number | null
  country: string | null
  flag: string | null
}

export interface CountryOption {
  country: string
  flag: string | null
}

interface Props {
  countries: CountryOption[]
  courses: CourseRow[]
  playedIds: string[]
}

export default function CourseBrowser({ countries, courses, playedIds }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const playedSet = useMemo(() => new Set(playedIds), [playedIds])

  const filtered = useMemo(() => {
    let list = courses
    if (selectedCountry) list = list.filter(c => c.country === selectedCountry)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.club ?? '').toLowerCase().includes(q)
      )
    }
    return list
  }, [courses, selectedCountry, query])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Country filter */}
      <div style={{
        display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
        scrollbarWidth: 'none',
      }}>
        <button
          onClick={() => setSelectedCountry(null)}
          style={{
            flexShrink: 0,
            padding: '7px 14px',
            borderRadius: 20,
            border: '1px solid',
            borderColor: selectedCountry === null ? '#1a5c38' : '#e5e7eb',
            background: selectedCountry === null ? '#1a5c38' : '#fff',
            color: selectedCountry === null ? '#fff' : '#374151',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}
        >
          All countries
        </button>
        {countries.map(c => (
          <button
            key={c.country}
            onClick={() => setSelectedCountry(prev => prev === c.country ? null : c.country)}
            style={{
              flexShrink: 0,
              padding: '7px 12px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: selectedCountry === c.country ? '#1a5c38' : '#e5e7eb',
              background: selectedCountry === c.country ? '#1a5c38' : '#fff',
              color: selectedCountry === c.country ? '#fff' : '#374151',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
            }}
          >
            <span style={{ fontSize: 16 }}>{c.flag ?? '🌍'}</span>
            <span>{c.country}</span>
          </button>
        ))}
      </div>

      {/* Search field */}
      <div style={{ position: 'relative' }}>
        <span style={{
          position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
          fontSize: 15, pointerEvents: 'none', color: '#9ca3af',
        }}>🔍</span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search course or club…"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 12px 11px 36px',
            border: '1px solid #e5e7eb', borderRadius: 12,
            fontSize: 14, color: '#1a1a1a', background: '#fff',
            fontFamily: 'inherit', outline: 'none',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 16, color: '#9ca3af', padding: 4,
            }}
          >✕</button>
        )}
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: '#6b7280', paddingLeft: 2 }}>
        {filtered.length} {filtered.length === 1 ? 'course' : 'courses'}
        {selectedCountry && ` in ${selectedCountry}`}
        {query && ` · "${query}"`}
      </div>

      {/* Course list */}
      {filtered.length === 0 ? (
        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13,
        }}>
          No courses found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {filtered.map((course, i) => {
            const played = playedSet.has(course.id)
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 16px', gap: 12, textDecoration: 'none',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: '#fff',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {course.flag && <span>{course.flag}</span>}
                    {course.club && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.club}</span>}
                    {course.holes && (
                      <span style={{ flexShrink: 0 }}>· {course.holes}H</span>
                    )}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {played && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: '#1a5c38',
                      background: '#e8f5ee', borderRadius: 8,
                      padding: '3px 8px', whiteSpace: 'nowrap',
                    }}>✓ Played</span>
                  )}
                  <span style={{ fontSize: 12, color: '#d1d5db' }}>›</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
