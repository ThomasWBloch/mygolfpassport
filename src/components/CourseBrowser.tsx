'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

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
  playedIds: string[]
}

// Subdivision flag emojis (England, Scotland, Wales) render as black squares
// on Windows because the OS doesn't support them. Use text codes as fallback.
const SUBDIVISION_FLAG_FALLBACK: Record<string, string> = {
  England: 'ENG',
  Scotland: 'SCO',
  Wales: 'WAL',
}

function displayFlag(flag: string | null, country: string | null): string {
  if (country && country in SUBDIVISION_FLAG_FALLBACK) {
    return SUBDIVISION_FLAG_FALLBACK[country]
  }
  return flag ?? '🌍'
}

export default function CourseBrowser({ countries, playedIds }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CourseRow[]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const playedSet = useMemo(() => new Set(playedIds), [playedIds])

  const doSearch = useCallback(async (q: string, country: string) => {
    if (q.trim().length < 1) {
      setResults([])
      setHasSearched(false)
      return
    }

    setSearching(true)
    setHasSearched(true)

    const trimmed = q.trim()

    // Fetch more than we need so we can re-sort client-side
    let qb = supabase
      .from('courses')
      .select('id, name, club, holes, country, flag')
      .or(`name.ilike.%${trimmed}%,club.ilike.%${trimmed}%`)
      .order('name')
      .limit(100)

    if (country) {
      qb = qb.eq('country', country)
    }

    const { data } = await qb

    const rows: CourseRow[] = (data ?? []).map(c => ({
      id: c.id as string,
      name: c.name as string,
      club: c.club as string | null,
      holes: c.holes as number | null,
      country: c.country as string | null,
      flag: c.flag as string | null,
    }))

    // Sort: courses whose name starts with the query come first
    const lowerQ = trimmed.toLowerCase()
    rows.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(lowerQ) ? 0 : 1
      const bStarts = b.name.toLowerCase().startsWith(lowerQ) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return a.name.localeCompare(b.name)
    })

    setResults(rows.slice(0, 50))
    setSearching(false)
  }, [supabase])

  // Debounced search on query or country change
  useEffect(() => {
    const t = setTimeout(() => doSearch(query, selectedCountry), 250)
    return () => clearTimeout(t)
  }, [query, selectedCountry, doSearch])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Country dropdown + search row */}
      <div style={{ display: 'flex', gap: 8 }}>
        <select
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
          style={{
            flexShrink: 0, width: 160,
            padding: '10px 12px', borderRadius: 12,
            border: '1px solid #e5e7eb', background: '#fff',
            fontSize: 14, color: '#1a1a1a', fontFamily: 'inherit',
            outline: 'none', cursor: 'pointer',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%236b7280\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: 32,
          }}
        >
          <option value="">All countries</option>
          {countries.map(c => (
            <option key={c.country} value={c.country}>
              {displayFlag(c.flag, c.country)} {c.country}
            </option>
          ))}
        </select>

        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            fontSize: 15, pointerEvents: 'none', color: '#9ca3af',
          }}>🔍</span>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search course or club…"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 36px 10px 36px',
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
      </div>

      {/* Empty state — no search yet */}
      {!hasSearched && !searching && (
        <div style={{
          background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb',
          padding: '40px 20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⛳</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>
            Find a course
          </div>
          <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
            Type at least 1 character to search across {countries.length} countries
          </div>
        </div>
      )}

      {/* Searching indicator */}
      {searching && (
        <div style={{ padding: 20, textAlign: 'center', color: '#6b7280', fontSize: 14 }}>
          Searching…
        </div>
      )}

      {/* Result count */}
      {hasSearched && !searching && (
        <div style={{ fontSize: 12, color: '#6b7280', paddingLeft: 2 }}>
          {results.length} {results.length === 1 ? 'course' : 'courses'}
          {selectedCountry && ` in ${selectedCountry}`}
          {query && ` · "${query.trim()}"`}
          {results.length === 50 && ' (showing first 50)'}
        </div>
      )}

      {/* No results */}
      {hasSearched && !searching && results.length === 0 && (
        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13,
        }}>
          No courses found
        </div>
      )}

      {/* Course list */}
      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {results.map((course, i) => {
            const played = playedSet.has(course.id)
            return (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 16px', gap: 12, textDecoration: 'none',
                  borderBottom: i < results.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: '#fff',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {(course.flag || course.country) && <span>{displayFlag(course.flag, course.country)}</span>}
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
