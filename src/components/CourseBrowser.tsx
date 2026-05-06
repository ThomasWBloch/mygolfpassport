'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { normalizeSearch } from '@/lib/search'
import { buildClubHref } from '@/lib/links'
import { slugifyClub } from '@/lib/slugs'
import { isGenericCourseName } from '@/lib/course-display'

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
  // When set, clubs whose country matches are sorted to the top of results.
  // Other clubs keep their alphabetical order. Ignored if a country filter
  // is active (everything is already one country).
  userHomeCountry?: string | null
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

export default function CourseBrowser({ countries, playedIds, hiddenIds = [], mode = 'browse', onSelectCourse, userHomeCountry = null }: Props) {
  const isLog = mode === 'log'
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CourseRow[]>([])
  // Group key encodes (slug(club_normalized), country) so cross-country
  // namesakes (e.g. "Muirfield Golf Club" in SCO and AU) are kept apart.
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

    const normalized = normalizeSearch(q)

    // Fetch enough to fill 50 clubs
    let qb = supabase
      .from('courses')
      .select('id, name, club, holes, country, flag')
      .or(`name_normalized.ilike.%${normalized}%,club_normalized.ilike.%${normalized}%`)
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

    // Group by (club_normalized, country) so the same club name in different
    // countries shows up as separate rows. Use the original club label for
    // sorting/display.
    const clubMap = new Map<string, CourseRow[]>()
    for (const row of rows) {
      const label = row.club ?? row.name
      const key = `${slugifyClub(label)}|${row.country ?? ''}`
      if (!clubMap.has(key)) clubMap.set(key, [])
      clubMap.get(key)!.push(row)
    }
    // Country filter already narrows to one country, so home-country priority is a no-op then.
    const prioritizeHome = !!userHomeCountry && !country
    const sortedClubs = [...clubMap.entries()]
      .sort((a, b) => {
        if (prioritizeHome) {
          const aHome = a[1][0].country === userHomeCountry ? 0 : 1
          const bHome = b[1][0].country === userHomeCountry ? 0 : 1
          if (aHome !== bHome) return aHome - bHome
        }
        const aLabel = a[1][0].club ?? a[1][0].name
        const bLabel = b[1][0].club ?? b[1][0].name
        return aLabel.localeCompare(bLabel)
      })
      .slice(0, 50)

    // Sort courses within each club alphabetically
    for (const [, courses] of sortedClubs) {
      courses.sort((a, b) => a.name.localeCompare(b.name))
    }

    setResults(rows)
    setGroupedResults(sortedClubs)
    setSearching(false)
  }, [supabase, hiddenSet, userHomeCountry])

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
            padding: '10px 12px', borderRadius: 8,
            border: '0.5px solid var(--color-mgp-border)',
            background: 'var(--color-mgp-paper)',
            fontSize: 14, color: 'var(--color-mgp-ink)',
            fontFamily: 'var(--font-mgp-body)',
            outline: 'none', cursor: 'pointer',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%238a7d5f\' d=\'M6 8L1 3h10z\'/%3E%3C/svg%3E")',
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
            fontSize: 15, pointerEvents: 'none', color: 'var(--color-mgp-ink-3)',
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
              border: '0.5px solid var(--color-mgp-border)', borderRadius: 8,
              fontSize: 14, color: 'var(--color-mgp-ink)',
              background: 'var(--color-mgp-paper)',
              fontFamily: 'var(--font-mgp-body)', outline: 'none',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 16, color: 'var(--color-mgp-ink-3)', padding: 4,
              }}
            >✕</button>
          )}
        </div>
      </div>

      {/* Empty state — no search yet */}
      {!hasSearched && !searching && (
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 8,
          border: '0.5px solid var(--color-mgp-border)',
          padding: '40px 20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>⛳</div>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            marginBottom: 6,
          }}>
            Find a course
          </div>
          <div style={{
            fontSize: 13, color: 'var(--color-mgp-ink-2)', lineHeight: 1.5,
          }}>
            Type at least 1 character to search across {countries.length} countries
          </div>
        </div>
      )}

      {/* Searching indicator */}
      {searching && (
        <div style={{
          padding: 20, textAlign: 'center',
          color: 'var(--color-mgp-ink-2)', fontSize: 14,
        }}>
          Searching…
        </div>
      )}

      {/* Result count */}
      {hasSearched && !searching && (
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          paddingLeft: 2,
        }}>
          {groupedResults.length} {groupedResults.length === 1 ? 'club' : 'clubs'}
          {selectedCountry && ` · ${selectedCountry}`}
          {query && ` · "${query.trim()}"`}
          {groupedResults.length === 50 && ' (first 50)'}
        </div>
      )}

      {/* No results */}
      {hasSearched && !searching && groupedResults.length === 0 && (
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 8,
          border: '0.5px solid var(--color-mgp-border)',
          padding: '32px 16px', textAlign: 'center',
          color: 'var(--color-mgp-ink-2)', fontSize: 13,
        }}>
          No courses found
        </div>
      )}

      {/* Grouped course list */}
      {groupedResults.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {groupedResults.map(([groupKey, courses]) => {
            const first = courses[0]
            const clubLabel = first.club ?? first.name
            const href = buildClubHref(first.country, clubLabel)
            const headerInner = (
              <>
                <div style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 16, fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {clubLabel}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 13 }}>{displayFlag(first.flag, first.country)}</span>
                  <span style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>›</span>
                </div>
              </>
            )
            const headerStyle = {
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px', textDecoration: 'none',
              background: 'var(--color-mgp-cream-warm)',
              borderBottom: '0.5px solid var(--color-mgp-border-faint)',
            } as const
            return (
              <div key={groupKey} style={{
                background: 'var(--color-mgp-paper)',
                borderRadius: 8,
                border: '0.5px solid var(--color-mgp-border)',
                overflow: 'hidden',
              }}>
                {/* Club header */}
                {href ? (
                  <Link href={href} style={headerStyle}>{headerInner}</Link>
                ) : (
                  <div style={headerStyle}>{headerInner}</div>
                )}

                {/* Courses under this club */}
                {courses.map((course, i) => {
                  const played = playedSet.has(course.id)
                  const rowStyle = {
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px 10px 28px', gap: 12, textDecoration: 'none' as const,
                    borderBottom: i < courses.length - 1 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                    background: 'none', border: 'none', width: '100%' as const, cursor: 'pointer' as const,
                    fontFamily: 'var(--font-mgp-body)' as const,
                    textAlign: 'left' as const,
                  }
                  // When the course name is a generic placeholder ("18-hole course"),
                  // hide it — the club header above already names the place and the
                  // holes-pill carries the only useful info ("18H"). Avoids rendering
                  // a list of identical-looking "18-hole course" rows for big clubs.
                  const courseLabel = isGenericCourseName(course.name) ? null : course.name
                  const inner = (
                    <>
                      <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {courseLabel ? (
                          <span style={{
                            fontSize: 13, color: 'var(--color-mgp-ink)',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {courseLabel}
                          </span>
                        ) : (
                          <span style={{
                            fontFamily: 'var(--font-mgp-stamp)',
                            fontSize: 11, letterSpacing: 1.5,
                            color: 'var(--color-mgp-ink-3)',
                            textTransform: 'uppercase',
                          }}>
                            Main course
                          </span>
                        )}
                        {course.holes && (
                          <span style={{
                            fontFamily: 'var(--font-mgp-stamp)',
                            fontSize: 10, letterSpacing: 1,
                            color: 'var(--color-mgp-ink-3)', flexShrink: 0,
                          }}>{course.holes}H</span>
                        )}
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                        {isLog ? (
                          <span style={{
                            fontFamily: 'var(--font-mgp-stamp)',
                            fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            color: 'var(--color-mgp-ink-inv)',
                            background: 'var(--color-mgp-cover)',
                            borderRadius: 4,
                            padding: '4px 10px', whiteSpace: 'nowrap',
                          }}>Log</span>
                        ) : (
                          <>
                            {played && (
                              <span style={{
                                fontFamily: 'var(--font-mgp-stamp)',
                                fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
                                textTransform: 'uppercase',
                                color: 'var(--color-mgp-stamp-red)',
                                border: '1px dashed var(--color-mgp-stamp-red)',
                                borderRadius: 4,
                                padding: '3px 8px', whiteSpace: 'nowrap',
                              }}>✓ Played</span>
                            )}
                            <span style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>›</span>
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
