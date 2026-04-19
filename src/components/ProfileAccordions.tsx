'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
}

const TIER_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  common:    { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' },
  uncommon:  { color: '#1a5c38', bg: '#e8f5ee', border: '#a7d5b8' },
  rare:      { color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  legendary: { color: '#92400e', bg: '#f5e9c8', border: '#c9a84c' },
}

// ── Accordion wrapper ────────────────────────────────────────────────────────

function Accordion({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: '#f9fafb', border: 'none',
          padding: '14px 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{title}</span>
          <span style={{
            fontSize: 12, fontWeight: 700, color: '#1a5c38',
            background: '#e8f5ee', borderRadius: 8, padding: '2px 8px',
          }}>
            {count}
          </span>
        </div>
        <span style={{
          fontSize: 12, color: '#6b7280',
          display: 'inline-block',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid #e5e7eb' }}>
          {children}
        </div>
      )}
    </div>
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
                width: '100%', background: 'none', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', cursor: 'pointer',
                borderBottom: !isExpanded && i < countries.length - 1 ? '1px solid #f3f4f6' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{c.flag ?? '🌍'}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{c.country}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#1a5c38',
                  background: '#e8f5ee', borderRadius: 8, padding: '3px 10px',
                }}>
                  {c.courseCount} {c.courseCount === 1 ? 'course' : 'courses'}
                </span>
                <span style={{
                  fontSize: 11, color: '#9ca3af',
                  display: 'inline-block',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}>
                  ▼
                </span>
              </div>
            </button>

            {isExpanded && (
              <div style={{
                background: '#f9fafb',
                borderTop: '1px solid #e5e7eb',
                borderBottom: i < countries.length - 1 ? '1px solid #f3f4f6' : 'none',
                padding: '4px 0',
              }}>
                {countryCourses.map((cr, j) => (
                  <Link
                    key={cr.courseId}
                    href={`/courses/${cr.courseId}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 16px 10px 24px', textDecoration: 'none',
                      borderBottom: j < countryCourses.length - 1 ? '1px solid #f0f0f0' : 'none',
                    }}
                  >
                    <div style={{ width: 60, flexShrink: 0, fontSize: 12, color: '#c9a84c', lineHeight: 1 }}>
                      {cr.rating != null && cr.rating > 0
                        ? '★'.repeat(cr.rating) + '☆'.repeat(5 - cr.rating)
                        : <span style={{ color: '#d1d5db' }}>—</span>
                      }
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {cr.courseName}
                      </div>
                      {cr.clubName && (
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {cr.clubName}
                        </div>
                      )}
                    </div>
                    {cr.playedAt && (
                      <div style={{ fontSize: 10, color: '#9ca3af', flexShrink: 0 }}>
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

// ── Main component ───────────────────────────────────────────────────────────

export default function ProfileAccordions({ courses, countries, badges, isOwnProfile = false }: Props) {
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

      {/* Courses */}
      <Accordion title="Courses" count={courses.length}>
        {courses.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            No courses logged yet
          </div>
        ) : (
          <div>
            {courses.map((c, i) => {
              const showDelete = isOwnProfile && !!c.roundId
              const isDeleting = deletingRoundId === c.roundId
              return (
                <div
                  key={c.courseId + i}
                  style={{
                    display: 'flex', alignItems: 'center',
                    borderBottom: i < courses.length - 1 ? '1px solid #f3f4f6' : 'none',
                  }}
                >
                  <Link
                    href={`/courses/${c.courseId}`}
                    style={{
                      flex: 1, minWidth: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 16px', gap: 10, textDecoration: 'none',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.flag && <span style={{ marginRight: 6 }}>{c.flag}</span>}
                        {c.courseName}
                      </div>
                      {c.clubName && (
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.clubName}
                        </div>
                      )}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      {c.rating != null && c.rating > 0 && (
                        <div style={{ fontSize: 13, color: '#c9a84c', lineHeight: 1 }}>
                          {'★'.repeat(c.rating)}{'☆'.repeat(5 - c.rating)}
                        </div>
                      )}
                    </div>
                  </Link>
                  {showDelete && (
                    <button
                      onClick={() => handleDeleteRound(c)}
                      disabled={isDeleting}
                      aria-label={`Delete round on ${c.courseName}`}
                      style={{
                        background: 'none', border: 'none',
                        padding: '0 14px', marginRight: 2,
                        fontSize: 16, lineHeight: 1,
                        color: '#9ca3af',
                        cursor: isDeleting ? 'not-allowed' : 'pointer',
                        opacity: isDeleting ? 0.4 : 1,
                        fontFamily: 'inherit',
                      }}
                    >
                      {isDeleting ? '…' : '🗑'}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Accordion>

      {/* Countries */}
      <Accordion title="Countries" count={countries.length}>
        {countries.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            No countries yet
          </div>
        ) : (
          <CountryList countries={countries} courses={courses} />
        )}
      </Accordion>

      {/* Badges */}
      <Accordion title="Badges" count={badges.length}>
        {badges.length === 0 ? (
          <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
            No badges earned yet
          </div>
        ) : (
          <div style={{ padding: '8px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {badges.map(b => {
              const ts = TIER_STYLES[b.tier] ?? TIER_STYLES.common
              const isGold = b.tier === 'rare' || b.tier === 'legendary'
              return (
                <div key={b.name} style={{
                  background: isGold ? '#fffbeb' : '#f9fafb',
                  border: `1px solid ${ts.border}`,
                  borderRadius: 10, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{b.description}</div>
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                    color: ts.color, background: ts.bg,
                    border: `1px solid ${ts.border}`,
                    borderRadius: 5, padding: '2px 6px', flexShrink: 0,
                  }}>
                    {b.tier}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </Accordion>
    </div>
  )
}
