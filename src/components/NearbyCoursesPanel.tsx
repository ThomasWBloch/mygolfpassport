'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usStateSuffix } from '@/lib/course-display'

/**
 * NearbyCoursesPanel — Adventure-flavoured discovery surface at the top of
 * /courses Atlas overview. Geolocation is gated behind a button click so the
 * page-load doesn't pop the browser permission prompt for users who just
 * wanted to browse continents. Once the user grants location the panel
 * renders the closest 5 courses (played and unplayed) with a PLAYED stamp
 * on rows the user has already stamped. A 'See more' button bumps the
 * limit to 20 for users who want to scroll further.
 *
 * Intentionally light on persisted state — the geo grant is remembered by
 * the browser, so revisiting the page only requires re-clicking the find
 * button (one tap). When/if we want zero-tap behavior, swap in
 * navigator.permissions.query at mount and auto-fetch when state === 'granted'.
 */

interface NearbyCourse {
  id: string
  name: string
  club: string | null
  country: string | null
  state: string | null
  flag: string | null
  distanceKm: number
  played: boolean
}

const INITIAL_LIMIT = 5
const EXPANDED_LIMIT = 20

export default function NearbyCoursesPanel() {
  const [status, setStatus] = useState<'idle' | 'asking' | 'loading' | 'ready' | 'denied' | 'error' | 'empty'>('idle')
  const [errorText, setErrorText] = useState('')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [results, setResults] = useState<NearbyCourse[]>([])
  const [expanded, setExpanded] = useState(false)

  async function loadFromCoords(lat: number, lng: number, limit: number) {
    setStatus('loading')
    try {
      const res = await fetch(`/api/courses/nearby?lat=${lat}&lng=${lng}&include_played=1&limit=${limit}`)
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrorText(json?.error ?? 'Could not load nearby courses.')
        return
      }
      const list = (json?.courses ?? []) as NearbyCourse[]
      setResults(list)
      setStatus(list.length === 0 ? 'empty' : 'ready')
    } catch {
      setStatus('error')
      setErrorText('Network error. Please try again.')
    }
  }

  function handleFindNearby() {
    if (!('geolocation' in navigator)) {
      setStatus('denied')
      setErrorText('Your browser does not support location.')
      return
    }
    setStatus('asking')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
        setCoords(c)
        loadFromCoords(c.lat, c.lng, INITIAL_LIMIT)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus('denied')
          setErrorText('Location permission denied. Enable it in your browser settings.')
        } else {
          setStatus('error')
          setErrorText('Could not get your location. Please try again.')
        }
      },
      { timeout: 10_000, maximumAge: 60_000 },
    )
  }

  function handleSeeMore() {
    if (!coords) return
    setExpanded(true)
    loadFromCoords(coords.lat, coords.lng, EXPANDED_LIMIT)
  }

  // ── Empty / idle button card ────────────────────────────────────────────
  if (status === 'idle' || status === 'asking' || status === 'denied' || status === 'error') {
    return (
      <section
        style={{
          background: 'var(--color-mgp-cream-warm)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 8,
          }}
        >
          📍 Nearby courses
        </div>
        <button
          type="button"
          onClick={handleFindNearby}
          disabled={status === 'asking'}
          style={{
            background: 'var(--color-mgp-cover)',
            color: 'var(--color-mgp-ink-inv)',
            border: 'none',
            borderRadius: 6,
            padding: '10px 16px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            cursor: status === 'asking' ? 'not-allowed' : 'pointer',
            opacity: status === 'asking' ? 0.6 : 1,
          }}
        >
          {status === 'asking' ? 'Locating…' : 'Find courses near me →'}
        </button>
        {(status === 'denied' || status === 'error') && errorText && (
          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              color: 'var(--color-mgp-stamp-red)',
              fontFamily: 'var(--font-mgp-body)',
            }}
          >
            {errorText}
          </div>
        )}
      </section>
    )
  }

  // ── Loading state — keep the same shell so the panel doesn't jump ───────
  if (status === 'loading') {
    return (
      <section
        style={{
          background: 'var(--color-mgp-cream-warm)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 8,
          }}
        >
          📍 Nearby courses
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mgp-ink-3)',
            fontFamily: 'var(--font-mgp-body)',
          }}
        >
          Loading nearest courses…
        </div>
      </section>
    )
  }

  // ── Empty result ────────────────────────────────────────────────────────
  if (status === 'empty') {
    return (
      <section
        style={{
          background: 'var(--color-mgp-cream-warm)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 12,
          padding: '14px 16px',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            marginBottom: 6,
          }}
        >
          📍 Nearby courses
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mgp-ink-2)',
            fontFamily: 'var(--font-mgp-body)',
          }}
        >
          No courses within range. Use the continent grid below to drill into a country.
        </div>
      </section>
    )
  }

  // ── Ready: list of nearby courses ──────────────────────────────────────
  return (
    <section
      style={{
        background: 'var(--color-mgp-cream-warm)',
        border: '0.5px solid var(--color-mgp-border)',
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span>📍 Nearby courses</span>
        <span
          style={{
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: 1.2,
            color: 'var(--color-mgp-ink-3)',
          }}
        >
          {results.length} within {Math.ceil(Math.max(...results.map((r) => r.distanceKm), 0))} km
        </span>
      </div>

      <div
        style={{
          background: 'var(--color-mgp-paper)',
          border: '0.5px solid var(--color-mgp-border)',
          borderRadius: 8,
          overflow: 'hidden',
        }}
      >
        {results.map((c, i) => {
          const primary = c.club ?? c.name
          const showSubline = !!c.club && c.club !== c.name
          return (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: '11px 14px',
                borderBottom: i < results.length - 1 ? '0.5px solid var(--color-mgp-border-faint)' : 'none',
                textDecoration: 'none',
                fontFamily: 'var(--font-mgp-body)',
                background: 'transparent',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mgp-display)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--color-mgp-ink)',
                    letterSpacing: -0.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.flag && <span style={{ marginRight: 5 }}>{c.flag}</span>}
                  {primary}
                  {usStateSuffix(c.country, c.state)}
                </div>
                {showSubline && (
                  <div
                    style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: 1.2,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-ink-3)',
                      marginTop: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.name}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                {c.played && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: 'var(--color-mgp-stamp-red)',
                      border: '1px dashed var(--color-mgp-stamp-red)',
                      borderRadius: 4,
                      padding: '2px 6px',
                    }}
                  >
                    ✓ Played
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 1,
                    color: 'var(--color-mgp-ink-2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c.distanceKm < 1 ? '< 1 km' : `${c.distanceKm} km`}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {!expanded && results.length === INITIAL_LIMIT && (
        <button
          type="button"
          onClick={handleSeeMore}
          style={{
            marginTop: 10,
            width: '100%',
            background: 'none',
            border: '0.5px solid var(--color-mgp-border)',
            borderRadius: 6,
            padding: '9px 12px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-2)',
            cursor: 'pointer',
          }}
        >
          See more nearby ›
        </button>
      )}
    </section>
  )
}
