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
  // All grouped clubs from the latest search, before display-limit slicing.
  // Group key encodes (slug(club_normalized), country) so cross-country
  // namesakes (e.g. "Muirfield Golf Club" in SCO and AU) are kept apart.
  const [allGroupedResults, setAllGroupedResults] = useState<[string, CourseRow[]][]>([])
  // How many clubs to render right now. Bumps in CLUBS_PAGE_SIZE chunks via
  // the Load-more button; resets to CLUBS_PAGE_SIZE on every new search.
  const CLUBS_PAGE_SIZE = 50
  const [displayLimit, setDisplayLimit] = useState(CLUBS_PAGE_SIZE)
  const [searching, setSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Geolocation-based "Courses near you" — only attempted in log mode when
  // the empty-state is shown. `null` means the lookup is still pending (or
  // not yet attempted); `[]` means we tried but got nothing back (denied,
  // no nearby unplayed courses, or no geolocation API). The "Looking around
  // you…" copy is derived from `isLog && nearbyCourses === null`.
  type NearbyCourse = { id: string; name: string; club: string | null; country: string | null; flag: string | null; distanceKm: number }
  const [nearbyCourses, setNearbyCourses] = useState<NearbyCourse[] | null>(null)

  const groupedResults = useMemo(
    () => allGroupedResults.slice(0, displayLimit),
    [allGroupedResults, displayLimit]
  )

  const playedSet = useMemo(() => new Set(playedIds), [playedIds])
  const hiddenSet = useMemo(() => new Set(hiddenIds), [hiddenIds])

  const doSearch = useCallback(async (q: string, country: string) => {
    if (q.trim().length < 1) {
      setResults([])
      setAllGroupedResults([])
      setDisplayLimit(CLUBS_PAGE_SIZE)
      setHasSearched(false)
      return
    }

    setSearching(true)
    setHasSearched(true)
    // Reset paging on every new query/country so the user always starts at
    // page 1 — without this, narrowing a search would keep stale "Load more"
    // state and might overflow the new (smaller) result set.
    setDisplayLimit(CLUBS_PAGE_SIZE)

    const normalized = normalizeSearch(q)

    // 2000 raw rows lets us group up to ~hundreds of clubs without re-fetching.
    // Each Load-more click reveals 50 more from this same pool client-side.
    let qb = supabase
      .from('courses')
      .select('id, name, club, holes, country, flag')
      .or(`name_normalized.ilike.%${normalized}%,club_normalized.ilike.%${normalized}%`)
      .order('club')
      .order('name')
      .limit(2000)

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
    // Keep the FULL sorted list — slicing now happens at render time via
    // displayLimit, so Load-more is a free client-side bump.
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

    // Sort courses within each club alphabetically
    for (const [, courses] of sortedClubs) {
      courses.sort((a, b) => a.name.localeCompare(b.name))
    }

    setResults(rows)
    setAllGroupedResults(sortedClubs)
    setSearching(false)
  }, [supabase, hiddenSet, userHomeCountry])

  // Debounced search on query or country change
  useEffect(() => {
    const t = setTimeout(() => doSearch(query, selectedCountry), 250)
    return () => clearTimeout(t)
  }, [query, selectedCountry, doSearch])

  // Request geolocation once on mount when in log mode — used to auto-show
  // "Courses near you" in the empty state. Never blocks the rest of the UI;
  // if the user denies or the device has no GPS, we silently fall back to
  // the static empty-state copy.
  useEffect(() => {
    if (!isLog) return
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      // No geolocation API — flip out of pending on the next tick so we
      // don't trigger the cascading-render lint by setting state inside
      // the effect body itself.
      const id = setTimeout(() => setNearbyCourses([]), 0)
      return () => clearTimeout(id)
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        fetch(`/api/courses/nearby?lat=${latitude}&lng=${longitude}`)
          .then(r => r.ok ? r.json() : { courses: [] })
          .then(data => setNearbyCourses(data.courses ?? []))
          .catch(() => setNearbyCourses([]))
      },
      () => {
        // Denied or unavailable — flip to [] so the "Looking around you…"
        // copy clears and the empty-state illustration stands alone.
        setNearbyCourses([])
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600_000 }
    )
  }, [isLog])

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
        <>
          <div style={{
            background: 'var(--color-mgp-paper)',
            borderRadius: 8,
            border: '0.5px solid var(--color-mgp-border)',
            padding: '32px 20px 28px', textAlign: 'center',
          }}>
            <AtlasIllustration />
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 20, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              marginTop: 14, marginBottom: 6,
            }}>
              Find a course
            </div>
            <div style={{
              fontSize: 13, color: 'var(--color-mgp-ink-2)', lineHeight: 1.5,
            }}>
              Type at least 1 character to search across {countries.length} countries
            </div>
            {isLog && nearbyCourses === null && (
              <div style={{
                marginTop: 12,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, letterSpacing: 1.5,
                color: 'var(--color-mgp-ink-3)',
                textTransform: 'uppercase',
              }}>
                Looking around you…
              </div>
            )}
          </div>

          {/* Geolocation-based discovery — only visible in log mode after the
              browser returns coords AND we got at least one unplayed match. */}
          {isLog && nearbyCourses && nearbyCourses.length > 0 && (
            <div style={{ marginTop: 4 }}>
              <div style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
                padding: '4px 2px 8px',
              }}>
                Courses near you
              </div>
              <div style={{
                background: 'var(--color-mgp-paper)',
                border: '0.5px solid var(--color-mgp-border)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                {nearbyCourses.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCourse?.({
                      id: c.id,
                      name: c.name,
                      club: c.club,
                      holes: null,
                      country: c.country,
                      flag: c.flag,
                    })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      width: '100%',
                      textAlign: 'left',
                      padding: '11px 14px',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: i < nearbyCourses.length - 1
                        ? '0.5px solid var(--color-mgp-border-faint)'
                        : 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-mgp-body)',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 15, fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {c.flag && <span style={{ marginRight: 5 }}>{displayFlag(c.flag, c.country)}</span>}
                        {c.club ?? c.name}
                      </div>
                      {c.club && c.club !== c.name && (
                        <div style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 9, letterSpacing: 1.5,
                          color: 'var(--color-mgp-ink-3)',
                          textTransform: 'uppercase',
                          marginTop: 2,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                          {c.name}
                        </div>
                      )}
                    </div>
                    <div style={{
                      flexShrink: 0,
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 10, letterSpacing: 1,
                      color: 'var(--color-mgp-ink-2)',
                      fontWeight: 700,
                    }}>
                      {c.distanceKm} km
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
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

      {/* Result count — shows "X of Y" while there are more clubs to load,
          collapses to "X" once everything is rendered. */}
      {hasSearched && !searching && (
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          paddingLeft: 2,
        }}>
          {groupedResults.length < allGroupedResults.length
            ? `${groupedResults.length} of ${allGroupedResults.length}`
            : `${groupedResults.length}`}
          {' '}
          {allGroupedResults.length === 1 ? 'club' : 'clubs'}
          {selectedCountry && ` · ${selectedCountry}`}
          {query && ` · "${query.trim()}"`}
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

      {/* Load-more — paper button stamped with the next batch size. Hidden
          when everything is already rendered or while a search is in flight. */}
      {hasSearched && !searching && allGroupedResults.length > displayLimit && (
        <button
          onClick={() => setDisplayLimit(n => n + CLUBS_PAGE_SIZE)}
          style={{
            background: 'var(--color-mgp-paper)',
            border: '0.5px dashed var(--color-mgp-border)',
            borderRadius: 8,
            padding: '12px 16px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-cover)',
            marginTop: 4,
          }}
        >
          Load more
          <span style={{
            color: 'var(--color-mgp-ink-3)',
            fontWeight: 500,
            marginLeft: 8,
          }}>
            +{Math.min(CLUBS_PAGE_SIZE, allGroupedResults.length - displayLimit)}
          </span>
        </button>
      )}
    </div>
  )
}

// ── Atlas illustration ──────────────────────────────────────────────────────
// Small inline SVG used in the empty-state. A stylised passport-page snippet:
// a couple of land-mass blobs in cream-cool, a curved dashed cover-grøn route,
// a small gold wax-seal pin marking the destination, and a tiny compass rose.
// Pure CSS-vars so it stays in step with the Adventure tokens.
function AtlasIllustration() {
  return (
    <svg
      role="img"
      aria-label="A small map showing a charted route with a wax-seal pin"
      width="140"
      height="92"
      viewBox="0 0 140 92"
      style={{ display: 'inline-block' }}
    >
      {/* Page background — faint paper tone */}
      <rect x="2" y="2" width="136" height="88" rx="2"
        fill="var(--color-mgp-cream-warm)"
        stroke="var(--color-mgp-border-faint)"
        strokeWidth="0.5" />

      {/* Land mass blobs — abstract, low-saturation */}
      <path d="M 14 56 Q 22 42 36 44 Q 50 46 54 56 Q 58 66 46 70 Q 30 74 22 68 Q 12 62 14 56 Z"
        fill="var(--color-mgp-cream-cool)" opacity="0.95" />
      <path d="M 70 22 Q 84 18 96 26 Q 108 32 110 44 Q 112 56 102 60 Q 90 64 80 58 Q 68 50 68 38 Q 66 28 70 22 Z"
        fill="var(--color-mgp-cream-cool)" opacity="0.95" />

      {/* Dashed travel route — curves from origin pin to destination wax-seal */}
      <path d="M 26 58 Q 50 30 90 36"
        fill="none"
        stroke="var(--color-mgp-cover)"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
        strokeLinecap="round" />

      {/* Origin marker — small dashed-red ring */}
      <circle cx="26" cy="58" r="3.5"
        fill="none"
        stroke="var(--color-mgp-stamp-red)"
        strokeWidth="1"
        strokeDasharray="1.5 1" />
      <circle cx="26" cy="58" r="1.2"
        fill="var(--color-mgp-stamp-red)" />

      {/* Destination — gold wax-seal pin (radial-ish via two stops) */}
      <g transform="translate(90,36)">
        <circle r="6.5" fill="var(--color-mgp-gold-light)" />
        <circle r="5.5" fill="var(--color-mgp-gold)" />
        <circle r="3.5" fill="var(--color-mgp-gold-dark)" opacity="0.55" />
        <circle cx="-1.5" cy="-1.8" r="1.3" fill="var(--color-mgp-gold-light)" opacity="0.85" />
      </g>

      {/* Compass rose — top-left corner, subtle */}
      <g transform="translate(118,18)" opacity="0.65">
        <circle r="7"
          fill="none"
          stroke="var(--color-mgp-ink-3)"
          strokeWidth="0.5" />
        <path d="M 0 -7 L 1.4 0 L 0 7 L -1.4 0 Z" fill="var(--color-mgp-ink-2)" />
        <path d="M -7 0 L 0 1.4 L 7 0 L 0 -1.4 Z" fill="var(--color-mgp-ink-3)" opacity="0.7" />
        <text x="0" y="-9" textAnchor="middle"
          fontFamily="var(--font-mgp-stamp)"
          fontSize="4"
          fill="var(--color-mgp-ink-3)"
          letterSpacing="0.5">N</text>
      </g>
    </svg>
  )
}
