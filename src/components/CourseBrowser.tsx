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
  hiddenIds?: string[]
  mode?: 'browse' | 'log'
  onSelectCourse?: (course: CourseRow) => void
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

export default function CourseBrowser({ countries, playedIds, hiddenIds = [], mode = 'browse', onSelectCourse }: Props) {
  const isLog = mode === 'log'
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CourseRow[]>([])
  const [groupedResults, setGroupedResults] = useState<[string, CourseRow[]][]>([])
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const playedSet = useMemo(() => new Set(playedIds), [playedIds])
  const hiddenSet = useMemo(() => new Set(hiddenIds), [hiddenIds])

  const doSearch = useCallback(async (q: string, country: string) => {
    if (q.trim().length < 1) {
      setResults([])
      setGroupedResults([])
      setHasSearched(false)
      return
    }

    setSearching(true)
    setHasSearched(true)

    const trimmed = q.trim()

    // Fetch enough to fill 50 clubs
    let qb = supabase
      .from('courses')
      .select('id, name, club, holes, country, flag')
      .or(`name.ilike.%${trimmed}%,club.ilike.%${trimmed}%`)
      .order('club')
      .order('name')
      .limit(500)

    if (country) {
      qb = qb.eq('country', country)
    }

    const { data } = await qb

    const rows: CourseRow[] = (data ?? [])
      .filter(c => !hiddenSet.has(c.id as string))
      .map(c => ({
        id: c.id as string,
        name: c.name as string,
        club: c.club as string | null,
        holes: c.holes as number | null,
        country: c.country as string | null,
        flag: c.flag as string | null,
      }))

    // Group by club, sort clubs alphabetically, limit to 50 clubs
    const clubMap = new Map<string, CourseRow[]>()
    for (const row of rows) {
      const key = row.club ?? row.name
      if (!clubMap.has(key)) clubMap.set(key, [])
      clubMap.get(key)!.push(row)
    }
    const sortedClubs = [...clubMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(0, 50)

    // Sort courses within each club alphabetically
    for (const [, courses] of sortedClubs) {
      courses.sort((a, b) => a.name.localeCompare(b.name))
    }

    setResults(rows)
    setGroupedResults(sortedClubs)
    setSearching(false)
  }, [supabase, hiddenSet])

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
          {groupedResults.length} {groupedResults.length === 1 ? 'club' : 'clubs'}
          {selectedCountry && ` in ${selectedCountry}`}
          {query && ` · "${query.trim()}"`}
          {groupedResults.length === 50 && ' (showing first 50)'}
        </div>
      )}

      {/* No results */}
      {hasSearched && !searching && groupedResults.length === 0 && (
        <div style={{
          background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb',
          padding: '32px 16px', textAlign: 'center', color: '#9ca3af', fontSize: 13,
        }}>
          No courses found
        </div>
      )}

      {/* Grouped course list */}
      {groupedResults.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {groupedResults.map(([clubName, courses]) => {
            const first = courses[0]
            return (
              <div key={clubName} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                {/* Club header */}
                <Link
                  href={`/clubs/${encodeURIComponent(clubName)}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', textDecoration: 'none',
                    background: '#f9fafb',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {clubName}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 13 }}>{displayFlag(first.flag, first.country)}</span>
                    <span style={{ fontSize: 12, color: '#d1d5db' }}>›</span>
                  </div>
                </Link>

                {/* Courses under this club */}
                {courses.map((course, i) => {
                  const played = playedSet.has(course.id)
                  const rowStyle = {
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px 10px 28px', gap: 12, textDecoration: 'none' as const,
                    borderBottom: i < courses.length - 1 ? '1px solid #f3f4f6' : 'none',
                    background: 'none', border: 'none', width: '100%' as const, cursor: 'pointer' as const,
                    fontFamily: 'inherit' as const,
                  }
                  const inner = (
                    <>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 13, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {course.name}
                        </span>
                        {course.holes && (
                          <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>{course.holes}H</span>
                        )}
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {isLog ? (
                          <span style={{
                            fontSize: 11, fontWeight: 700, color: '#fff',
                            background: '#1a5c38', borderRadius: 8,
                            padding: '3px 10px', whiteSpace: 'nowrap',
                          }}>Log</span>
                        ) : (
                          <>
                            {played && (
                              <span style={{
                                fontSize: 11, fontWeight: 700, color: '#1a5c38',
                                background: '#e8f5ee', borderRadius: 8,
                                padding: '3px 8px', whiteSpace: 'nowrap',
                              }}>✓ Played</span>
                            )}
                            <span style={{ fontSize: 12, color: '#d1d5db' }}>›</span>
                          </>
                        )}
                      </div>
                    </>
                  )
                  return isLog ? (
                    <button
                      key={course.id}
                      onClick={() => onSelectCourse?.(course)}
                      style={rowStyle}
                    >
                      {inner}
                    </button>
                  ) : (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      style={rowStyle}
                    >
                      {inner}
                    </Link>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
