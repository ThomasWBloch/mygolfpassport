'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { normalizeSearch } from '@/lib/search'
import { buildClubHref } from '@/lib/links'
import { slugifyClub } from '@/lib/slugs'
import { isGenericCourseName } from '@/lib/course-display'
import { clubKey, formatClubLabel } from '@/lib/club-display'

export interface CourseRow {
  id: string
  name: string
  club: string | null
  holes: number | null
  country: string | null
  flag: string | null
  // address is only used for namesake disambiguation in the club header
  // (state suffix). Not displayed otherwise. Kept optional so existing
  // callers that build CourseRow without it still type-check.
  address?: string | null
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
  // Total displayable course count, used in the empty-state copy. Server-
  // rendered live so it doesn't go stale.
  courseCount?: number
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

export default function CourseBrowser({ countries, playedIds, hiddenIds = [], mode = 'browse', onSelectCourse, userHomeCountry = null, courseCount = 0 }: Props) {
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
  // Namesake disambiguation: keys (via clubKey()) of (club, country) pairs
  // that share their text name with at least one other physically separate
  // club. Used to decide whether to append " (TX)"-style state suffixes in
  // the club header. Populated by a follow-up query in doSearch.
  const [namesakeKeys, setNamesakeKeys] = useState<Set<string>>(new Set())
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
  // Set true only when the /api/courses/nearby fetch itself fails (network or
  // non-2xx). Geolocation-permission-denied is a legitimate "no message" case
  // and must not flip this on — we just silently fall back to the static
  // empty-state in that branch below.
  const [nearbyError, setNearbyError] = useState(false)

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
      .select('id, name, club, holes, country, flag, address')
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
        address: (c as { address?: string | null }).address ?? null,
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

    // Sort courses within each club: combos / 18-hole courses first, then
    // shorter loops. Within each holes-tier, alphabetical. This puts the
    // full 18-hole experience at the top of a club like Furesø (3 combos)
    // and lists the standalone 9-hole loops (Farum, Hestkøb, Parkvej, Par 3)
    // underneath as alternative shorter rounds.
    for (const [, courses] of sortedClubs) {
      courses.sort((a, b) => {
        const ah = a.holes ?? 0
        const bh = b.holes ?? 0
        if (ah !== bh) return bh - ah
        return a.name.localeCompare(b.name)
      })
    }

    setResults(rows)
    setAllGroupedResults(sortedClubs)

    // ── Namesake detection ──────────────────────────────────────────────
    // For each unique (club, country) in the results, check globally
    // whether the same text-name maps to >= 2 physical locations (= a
    // namesake conflict). Only USA clubs use a state suffix in the UI
    // today, so we limit the lookup to USA to keep the IN-list small.
    // See lib/club-display.ts for the rendering rules.
    const usaClubs = sortedClubs
      .map(([, courses]) => courses[0])
      .filter(r => r.country === 'USA' && r.club)
    if (usaClubs.length > 0) {
      const usaClubNames = [...new Set(usaClubs.map(r => r.club as string))]
      const { data: nsRows } = await supabase
        .from('courses')
        .select('club, country, latitude, longitude')
        .eq('country', 'USA')
        .in('club', usaClubNames)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
      // Group coords per (club, country) and flag clubs with 2+ distinct
      // ~100m-rounded locations as namesakes.
      const coordsByKey = new Map<string, Set<string>>()
      for (const r of (nsRows ?? []) as Array<{ club: string; country: string; latitude: number; longitude: number }>) {
        const k = clubKey(r.club, r.country)
        if (!coordsByKey.has(k)) coordsByKey.set(k, new Set())
        const coordHash = `${Math.round(r.latitude * 1000)}_${Math.round(r.longitude * 1000)}`
        coordsByKey.get(k)!.add(coordHash)
      }
      const newNamesakes = new Set<string>()
      for (const [k, coords] of coordsByKey) {
        if (coords.size >= 2) newNamesakes.add(k)
      }
      setNamesakeKeys(newNamesakes)
    } else {
      setNamesakeKeys(new Set())
    }

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
          .then(r => {
            if (!r.ok) {
              setNearbyError(true)
              return { courses: [] }
            }
            return r.json()
          })
          .then(data => setNearbyCourses(data.courses ?? []))
          .catch(() => {
            setNearbyError(true)
            setNearbyCourses([])
          })
      },
      () => {
        // Denied or unavailable — flip to [] so the "Looking around you…"
        // copy clears and the empty-state illustration stands alone. NOT a
        // fetch failure, so we leave nearbyError untouched.
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
              Type at least 1 character to search across{' '}
              {courseCount > 0
                ? <>{courseCount.toLocaleString('en-US')} golf courses in {countries.length} countries</>
                : <>{countries.length} countries</>}
            </div>
            {isLog && nearbyCourses === null && !nearbyError && (
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
            {isLog && nearbyError && (
              <div style={{
                marginTop: 12,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10, letterSpacing: 1.5,
                color: 'var(--color-mgp-stamp-red)',
                textTransform: 'uppercase',
              }}>
                ⚠ Couldn&rsquo;t load nearby courses
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
            const rawClubLabel = first.club ?? first.name
            const href = buildClubHref(first.country, rawClubLabel)
            // Disambiguate namesake USA clubs by appending state — e.g.
            // "Rolling Hills Country Club (TX)". formatClubLabel returns
            // the raw label unchanged when the club is unique or when the
            // address can't be parsed.
            const clubLabel = formatClubLabel({
              clubLabel: rawClubLabel,
              country: first.country,
              address: first.address,
              isNamesake: namesakeKeys.has(clubKey(first.club, first.country)),
            })
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
                        {/* Played indicator — same dashed-red stamp in both modes.
                            In log mode it sits next to the [Log] button so the user
                            can see they've stamped this course before but still log
                            another round. */}
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
                          <span style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>›</span>
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

// ── Empty-state illustration ────────────────────────────────────────────────
// Top-down passport-page sketch of a golf hole: rough → fairway → bunkers →
// green with flag, and a dashed-red flight line tracing the shot from tee
// to pin. A small "1" stamp sits in the corner like a hand-drawn page mark.
// Pure CSS-vars so it stays in step with the Adventure tokens.
function AtlasIllustration() {
  return (
    <svg
      role="img"
      aria-label="Top-down sketch of a golf hole, tee to green"
      width="170"
      height="110"
      viewBox="0 0 170 110"
      style={{ display: 'inline-block' }}
    >
      {/* Paper background tone */}
      <rect x="0" y="0" width="170" height="110" fill="var(--color-mgp-cream-warm)" />

      {/* Rough — outer green wash */}
      <path d="M 20 90 Q 35 50 70 38 Q 105 28 140 24 Q 152 22 152 36 Q 154 56 134 70 Q 110 86 78 92 Q 40 100 20 90 Z"
        fill="var(--color-mgp-success)" opacity="0.42" />

      {/* Fairway — inner lighter strip */}
      <path d="M 28 86 Q 42 56 72 46 Q 100 38 132 36 Q 144 35 144 44 Q 144 60 130 70 Q 106 82 78 86 Q 48 90 28 86 Z"
        fill="var(--color-mgp-success)" opacity="0.55" />

      {/* Tee box marker (bottom-left) */}
      <rect x="26" y="82" width="10" height="6"
        fill="var(--color-mgp-paper)"
        stroke="var(--color-mgp-gold-dark)"
        strokeWidth="0.6" />
      <circle cx="31" cy="85" r="1.3" fill="var(--color-mgp-stamp-red)" />

      {/* Bunkers — cream-cool sand */}
      <ellipse cx="86" cy="62" rx="8" ry="4.5"
        fill="var(--color-mgp-cream-cool)"
        stroke="var(--color-mgp-border-strong)"
        strokeWidth="0.5" />
      <ellipse cx="118" cy="50" rx="6" ry="3.5"
        fill="var(--color-mgp-cream-cool)"
        stroke="var(--color-mgp-border-strong)"
        strokeWidth="0.5" />

      {/* Putting green */}
      <ellipse cx="132" cy="38" rx="13" ry="9" fill="var(--color-mgp-success)" opacity="0.85" />
      <ellipse cx="132" cy="38" rx="11" ry="7" fill="var(--color-mgp-success)" opacity="0.4" />

      {/* Pin */}
      <line x1="132" y1="38" x2="132" y2="22"
        stroke="var(--color-mgp-cover)"
        strokeWidth="0.8"
        strokeLinecap="round" />
      <path d="M 132 22 L 142 25 L 132 28 Z" fill="var(--color-mgp-stamp-red)" />
      <circle cx="132" cy="38" r="1.2" fill="var(--color-mgp-cover)" />

      {/* Dashed flight line — tee to flag */}
      <path d="M 31 85 Q 80 30 132 38"
        fill="none"
        stroke="var(--color-mgp-stamp-red)"
        strokeWidth="0.8"
        strokeDasharray="2 1.8"
        strokeLinecap="round"
        opacity="0.7" />

      {/* Hole-number stamp — subtle "1" in the corner */}
      <g transform="translate(150,18) rotate(-8)">
        <circle r="10"
          fill="none"
          stroke="var(--color-mgp-stamp-red)"
          strokeWidth="1.2"
          strokeDasharray="1.5 1" />
        <text x="0" y="3"
          textAnchor="middle"
          fontFamily="var(--font-mgp-stamp)"
          fontSize="10"
          fill="var(--color-mgp-stamp-red)"
          fontWeight="700">1</text>
      </g>
    </svg>
  )
}
