'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import WaxSealBadge from '@/components/WaxSealBadge'
import RatingBadge from '@/components/RatingBadge'
import { isGenericCourseName } from '@/lib/course-display'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CourseEntry {
  courseId: string
  courseName: string
  clubName: string | null
  country: string | null
  flag: string | null
  rating: number | null
  playedAt: string | null
  // Only populated on own-profile views so the user can delete a round.
  // Represents the most recent round this user has on this course.
  roundId?: string | null
}

export interface CountryEntry {
  country: string
  flag: string | null
  courseCount: number
}

export interface BadgeEntry {
  emoji: string
  name: string
  description: string
  tier: string
  earnedAt: string
}

interface Props {
  courses: CourseEntry[]
  countries: CountryEntry[]
  badges: BadgeEntry[]
  // When true, show a trash button on each Courses row allowing the viewer
  // to delete their own round. Must be false on public profile views.
  isOwnProfile?: boolean
  // When true, skip the Badges accordion entirely. Used on /you?tab=courses
  // where badges live in their own sibling subtab and would be duplicated.
  hideBadges?: boolean
}

// ── Accordion wrapper ────────────────────────────────────────────────────────

function Accordion({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <section style={{
      background: 'var(--color-mgp-paper)',
      borderRadius: 14,
      border: '1px solid var(--color-mgp-border-faint)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 17,
            fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.2,
          }}>
            {title}
          </span>
          <span style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            letterSpacing: 1.5,
            fontWeight: 700,
            color: 'var(--color-mgp-ink-2)',
            background: 'var(--color-mgp-cream-warm)',
            border: '1px solid var(--color-mgp-border-faint)',
            borderRadius: 4,
            padding: '2px 8px',
          }}>
            {count}
          </span>
        </div>
        <span style={{
          fontSize: 13,
          color: 'var(--color-mgp-ink-3)',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▾
        </span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--color-mgp-border-faint)' }}>
          {children}
        </div>
      )}
    </section>
  )
}

// ── Country list with expandable rows ─────────────────────────────────────────

function CountryList({ countries, courses }: { countries: CountryEntry[]; courses: CourseEntry[] }) {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)

  function formatDate(iso: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div>
      {countries.map((c, i) => {
        const isExpanded = expandedCountry === c.country
        const countryCourses = courses.filter(cr => cr.country === c.country)

        return (
          <div key={c.country}>
            <button
              onClick={() => setExpandedCountry(isExpanded ? null : c.country)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: !isExpanded && i < countries.length - 1
                  ? '1px solid var(--color-mgp-border-faint)'
                  : 'none',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{c.flag ?? '🌍'}</span>
                <span style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                }}>
                  {c.country}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: 'var(--color-mgp-ink-2)',
                  background: 'var(--color-mgp-cream-warm)',
                  border: '1px solid var(--color-mgp-border-faint)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                }}>
                  {c.courseCount} {c.courseCount === 1 ? 'course' : 'courses'}
                </span>
                <span style={{
                  fontSize: 13,
                  color: 'var(--color-mgp-ink-3)',
                  display: 'inline-block',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▾
                </span>
              </div>
            </button>

            {isExpanded && (
              <div style={{
                background: 'var(--color-mgp-cream-warm)',
                borderTop: '1px solid var(--color-mgp-border-faint)',
                borderBottom: i < countries.length - 1
                  ? '1px solid var(--color-mgp-border-faint)'
                  : 'none',
                padding: '4px 0',
              }}>
                {countryCourses.map((cr, j) => (
                  <Link
                    key={cr.courseId}
                    href={`/courses/${cr.courseId}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 16px 10px 24px',
                      textDecoration: 'none',
                      borderBottom: j < countryCourses.length - 1
                        ? '1px solid var(--color-mgp-border-faint)'
                        : 'none',
                    }}
                  >
                    <div style={{
                      width: 60,
                      flexShrink: 0,
                      lineHeight: 1,
                    }}>
                      {cr.rating != null && cr.rating > 0
                        ? <RatingBadge value={cr.rating} />
                        : <span style={{ color: 'var(--color-mgp-border-faint)', fontSize: 13 }}>—</span>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        letterSpacing: -0.2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {cr.clubName ?? cr.courseName}
                      </div>
                      {cr.clubName
                        && cr.courseName
                        && cr.courseName !== cr.clubName
                        && !isGenericCourseName(cr.courseName) && (
                        <div style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: 1.2,
                          color: 'var(--color-mgp-ink-3)',
                          marginTop: 2,
                          textTransform: 'uppercase',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}>
                          {cr.courseName}
                        </div>
                      )}
                    </div>
                    {cr.playedAt && (
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontWeight: 600,
                        fontSize: 11,
                        letterSpacing: 1.2,
                        color: 'var(--color-mgp-ink-3)',
                        flexShrink: 0,
                        textTransform: 'uppercase',
                      }}>
                        {formatDate(cr.playedAt)}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Courses-by-country (Profile Courses fold-per-land) ──────────────────────

/** Renders the Courses-accordion contents grouped by country. Each country
 *  is its own collapsible sub-row with a flag + name + round-count header;
 *  expanding reveals the same round-row layout (link → rating → trash) the
 *  flat list used. Countries sort by round-count DESC so the most-played
 *  country sits at the top. Default state: all collapsed. */
function CoursesByCountry({
  courses,
  isOwnProfile,
  deletingRoundId,
  onDelete,
}: {
  courses: CourseEntry[]
  isOwnProfile: boolean
  deletingRoundId: string | null
  onDelete: (c: CourseEntry) => void
}) {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null)

  type Group = { country: string; flag: string | null; rounds: CourseEntry[] }
  const groups: Group[] = (() => {
    const map = new Map<string, Group>()
    for (const c of courses) {
      const key = c.country ?? '__unknown__'
      if (!map.has(key)) {
        map.set(key, {
          country: c.country ?? 'Unknown location',
          flag: c.flag ?? null,
          rounds: [],
        })
      }
      map.get(key)!.rounds.push(c)
    }
    return [...map.values()].sort((a, b) => b.rounds.length - a.rounds.length)
  })()

  return (
    <div>
      {groups.map((g, gi) => {
        const isOpen = expandedCountry === g.country
        return (
          <div key={g.country}>
            <button
              onClick={() => setExpandedCountry(isOpen ? null : g.country)}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: !isOpen && gi < groups.length - 1
                  ? '1px solid var(--color-mgp-border-faint)'
                  : 'none',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{g.flag ?? '🌍'}</span>
                <span style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                }}>
                  {g.country}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  letterSpacing: 1.5,
                  fontWeight: 700,
                  color: 'var(--color-mgp-ink-2)',
                  background: 'var(--color-mgp-cream-warm)',
                  border: '1px solid var(--color-mgp-border-faint)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                }}>
                  {g.rounds.length} {g.rounds.length === 1 ? 'round' : 'rounds'}
                </span>
                <span style={{
                  fontSize: 13,
                  color: 'var(--color-mgp-ink-3)',
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▾
                </span>
              </div>
            </button>

            {isOpen && (
              <div style={{
                background: 'var(--color-mgp-cream-warm)',
                borderTop: '1px solid var(--color-mgp-border-faint)',
                borderBottom: gi < groups.length - 1
                  ? '1px solid var(--color-mgp-border-faint)'
                  : 'none',
              }}>
                {g.rounds.map((c, ri) => {
                  const showDelete = isOwnProfile && !!c.roundId
                  const isDeleting = deletingRoundId === c.roundId
                  return (
                    <div
                      key={c.courseId + ri}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: ri < g.rounds.length - 1
                          ? '1px solid var(--color-mgp-border-faint)'
                          : 'none',
                      }}
                    >
                      <Link
                        href={`/courses/${c.courseId}`}
                        style={{
                          flex: 1,
                          minWidth: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          gap: 10,
                          textDecoration: 'none',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontFamily: 'var(--font-mgp-display)',
                            fontSize: 15,
                            fontWeight: 500,
                            color: 'var(--color-mgp-ink)',
                            letterSpacing: -0.2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}>
                            {c.clubName ?? c.courseName}
                          </div>
                          {c.clubName
                            && c.courseName
                            && c.courseName !== c.clubName
                            && !isGenericCourseName(c.courseName) && (
                            <div style={{
                              fontFamily: 'var(--font-mgp-stamp)',
                              fontWeight: 600,
                              fontSize: 11,
                              letterSpacing: 1.2,
                              color: 'var(--color-mgp-ink-3)',
                              marginTop: 3,
                              textTransform: 'uppercase',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}>
                              {c.courseName}
                            </div>
                          )}
                        </div>
                        <div style={{ flexShrink: 0, textAlign: 'right' }}>
                          {c.rating != null && c.rating > 0 && (
                            <RatingBadge value={c.rating} />
                          )}
                        </div>
                      </Link>
                      {showDelete && (
                        <Link
                          href={`/log?edit=${c.roundId}`}
                          aria-label={`Edit round on ${c.courseName}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 12px',
                            lineHeight: 1,
                            color: 'var(--color-mgp-ink-3)',
                            cursor: 'pointer',
                            opacity: 0.7,
                            fontFamily: 'inherit',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                          >
                            <path d="M16.5 3.5l4 4-12 12H4.5v-4z" />
                            <path d="M14 6l4 4" />
                          </svg>
                        </Link>
                      )}
                      {showDelete && (
                        <button
                          onClick={() => onDelete(c)}
                          disabled={isDeleting}
                          aria-label={`Delete round on ${c.courseName}`}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 12px',
                            marginRight: 2,
                            lineHeight: 1,
                            color: 'var(--color-mgp-ink-3)',
                            cursor: isDeleting ? 'not-allowed' : 'pointer',
                            opacity: isDeleting ? 0.4 : 0.7,
                            fontFamily: 'inherit',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {isDeleting ? (
                            <span style={{ fontSize: 18 }}>…</span>
                          ) : (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden
                            >
                              <path d="M4 7h16" />
                              <path d="M10 11v6" />
                              <path d="M14 11v6" />
                              <path d="M5 7l1 13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-13" />
                              <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function ProfileAccordions({ courses, countries, badges, isOwnProfile = false, hideBadges = false }: Props) {
  const router = useRouter()
  const [deletingRoundId, setDeletingRoundId] = useState<string | null>(null)

  function formatDate(iso: string | null): string {
    if (!iso) return 'unknown date'
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  async function handleDeleteRound(c: CourseEntry) {
    if (!c.roundId) return
    const ok = window.confirm(
      `Delete this round? ${c.courseName} on ${formatDate(c.playedAt)}. This cannot be undone.`
    )
    if (!ok) return

    setDeletingRoundId(c.roundId)
    try {
      const res = await fetch('/api/rounds/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round_id: c.roundId }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.success) {
        window.alert(data?.error ?? 'Could not delete the round. Please try again.')
        return
      }
      const removed: string[] = data.removed_badges ?? []
      if (removed.length > 0) {
        const names = removed.join(', ')
        window.alert(`Round deleted. Badge ${names} has also been removed.`)
      }
      router.refresh()
    } finally {
      setDeletingRoundId(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* Courses — grouped by country with collapsible sections. Country
           headers sort by round-count DESC so the most-played country is
           at the top. Each row preserves the rating + trash treatment from
           the flat view; only the wrapper changes. */}
      <Accordion title="Courses" count={courses.length}>
        {courses.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            textAlign: 'center',
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
          }}>
            No courses logged yet
          </div>
        ) : (
          <CoursesByCountry
            courses={courses}
            isOwnProfile={isOwnProfile}
            deletingRoundId={deletingRoundId}
            onDelete={handleDeleteRound}
          />
        )}
      </Accordion>

      {/* Countries */}
      <Accordion title="Countries" count={countries.length}>
        {countries.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            textAlign: 'center',
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
          }}>
            No countries yet
          </div>
        ) : (
          <CountryList countries={countries} courses={courses} />
        )}
      </Accordion>

      {/* Badges — skipped when /you?tab=courses renders this component
          because Badges has its own sibling subtab and the accordion would
          duplicate that surface. */}
      {!hideBadges && (
      <Accordion title="Badges" count={badges.length}>
        {badges.length === 0 ? (
          <div style={{
            padding: '20px 16px',
            textAlign: 'center',
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
          }}>
            No badges earned yet
          </div>
        ) : (
          <div style={{ padding: '8px 0' }}>
            {badges.map((b, i) => (
              <div
                key={b.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 14px',
                  borderBottom: i < badges.length - 1
                    ? '1px solid var(--color-mgp-border-faint)'
                    : 'none',
                }}
              >
                <WaxSealBadge
                  name={b.name}
                  tier={b.tier}
                  emoji={b.emoji}
                  size={56}
                  rotation={(b.name.charCodeAt(0) % 5) - 2}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-mgp-display)',
                    fontSize: 17,
                    fontWeight: 500,
                    color: 'var(--color-mgp-ink)',
                    letterSpacing: -0.2,
                    lineHeight: 1.2,
                  }}>
                    {b.name}
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: 'var(--color-mgp-ink-3)',
                    marginTop: 2,
                    lineHeight: 1.4,
                  }}>
                    {b.description}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                  flexShrink: 0,
                }}>
                  {b.tier}
                </div>
              </div>
            ))}

            {/* Footer link to /badges (own profile only — visiting someone
                else's profile shouldn't redirect viewers to their OWN trophy
                room) */}
            {isOwnProfile && (
              <Link
                href="/you?tab=badges"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  marginTop: 4,
                  borderTop: '0.5px solid var(--color-mgp-border)',
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-cover)',
                  textDecoration: 'none',
                  fontWeight: 700,
                }}
              >
                <span>View full trophy room</span>
                <span aria-hidden style={{ fontSize: 15, color: 'var(--color-mgp-ink-3)' }}>›</span>
              </Link>
            )}
          </div>
        )}
      </Accordion>
      )}
    </div>
  )
}
