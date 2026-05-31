'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usStateSuffix } from '@/lib/course-display'

/**
 * NearbyCoursesPanel — Adventure-flavoured discovery surface at the top of
 * /courses Atlas overview.
 *
 * Mount behaviour, driven by navigator.permissions.query (with a Safari
 * fallback to the button-gated path):
 *   • granted  → auto-fetch immediately, user lands on 5 nearby courses
 *                with zero clicks
 *   • prompt   → show 'Find courses near me' button (no surprise prompt
 *                on page-load)
 *   • denied   → show the denied state directly with hint to re-enable
 *                in browser settings (not a stum button that does nothing)
 *
 * A 'Hide played' toggle in the section header lets the user filter played
 * courses out of the list. Default is ON — discovery-mode by default since
 * the panel exists to surface new courses, not to recap stamps. The choice
 * is persisted to localStorage so the user's preference rides between
 * visits without re-prompting. Toggling refetches against the same coords
 * so the API can pull a wider radius to fill the slot count when filtering
 * is on.
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
const STORAGE_KEY_HIDE_PLAYED = 'mgp:nearby:hidePlayed'

export default function NearbyCoursesPanel() {
  const [status, setStatus] = useState<'idle' | 'asking' | 'loading' | 'ready' | 'denied' | 'error' | 'empty'>('idle')
  const [errorText, setErrorText] = useState('')
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [results, setResults] = useState<NearbyCourse[]>([])
  const [expanded, setExpanded] = useState(false)
  // Default true — discovery-mode by default. Read from localStorage on
  // mount so the user's choice rides between visits without a flash of
  // the wrong state on hydration.
  const [hidePlayed, setHidePlayed] = useState<boolean>(true)
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY_HIDE_PLAYED)
      if (v === '0') setHidePlayed(false)
    } catch {
      // ignore — localStorage may be unavailable in sandboxed contexts
    }
  }, [])

  // Auto-open on mount when the browser already has geolocation permission.
  // We don't want the page-load to *trigger* a permission prompt (that
  // belongs to the button click), so we strictly read the existing state
  // via the Permissions API. Safari historically didn't support querying
  // 'geolocation' through this API in all versions — the try/catch keeps
  // it harmless when feature-detection fails, falling back to the
  // button-gated flow.
  useEffect(() => {
    let cancelled = false
    async function autoOpen() {
      if (typeof navigator === 'undefined' || !('geolocation' in navigator)) return
      const perms = (navigator as Navigator & { permissions?: Permissions }).permissions
      if (!perms || typeof perms.query !== 'function') return
      try {
        const status = await perms.query({ name: 'geolocation' as PermissionName })
        if (cancelled) return
        if (status.state === 'granted') {
          // Read the freshly-mounted hidePlayed via localStorage so we
          // don't race the state-init useEffect above.
          let hp = true
          try {
            const v = window.localStorage.getItem(STORAGE_KEY_HIDE_PLAYED)
            if (v === '0') hp = false
          } catch {
            // ignore
          }
          setStatus('asking')
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              if (cancelled) return
              const c = { lat: pos.coords.latitude, lng: pos.coords.longitude }
              setCoords(c)
              loadFromCoords(c.lat, c.lng, INITIAL_LIMIT, hp)
            },
            () => {
              if (cancelled) return
              // Permission granted but lookup failed (e.g., timeout) —
              // fall back to the button UI so the user can retry.
              setStatus('idle')
            },
            { timeout: 10_000, maximumAge: 60_000 },
          )
        } else if (status.state === 'denied') {
          setStatus('denied')
          setErrorText('Location permission denied. Enable it in your browser settings.')
        }
        // 'prompt' → stay in idle and let the button drive the flow
      } catch {
        // Feature detection failed — silently fall back to button-gated flow.
      }
    }
    autoOpen()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadFromCoords(lat: number, lng: number, limit: number, hidePlayedNow: boolean) {
    setStatus('loading')
    const includePlayed = hidePlayedNow ? '0' : '1'
    try {
      const res = await fetch(`/api/courses/nearby?lat=${lat}&lng=${lng}&include_played=${includePlayed}&limit=${limit}`)
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
        loadFromCoords(c.lat, c.lng, INITIAL_LIMIT, hidePlayed)
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
    loadFromCoords(coords.lat, coords.lng, EXPANDED_LIMIT, hidePlayed)
  }

  function handleToggleHidePlayed() {
    const next = !hidePlayed
    setHidePlayed(next)
    try {
      window.localStorage.setItem(STORAGE_KEY_HIDE_PLAYED, next ? '1' : '0')
    } catch {
      // ignore
    }
    // Refetch only when we already have coords; otherwise the next
    // 'Find courses near me' click will pick up the new pref.
    if (coords) {
      const limit = expanded ? EXPANDED_LIMIT : INITIAL_LIMIT
      loadFromCoords(coords.lat, coords.lng, limit, next)
    }
  }

  // Header row — title on the left, 'Hide played' toggle pill on the right.
  // Active state (hidePlayed=true) is gold; inactive is muted ink.
  const renderHeader = () => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 10,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
        }}
      >
        📍 Nearby courses
      </span>
      <button
        type="button"
        onClick={handleToggleHidePlayed}
        aria-pressed={hidePlayed}
        style={{
          background: 'transparent',
          border: `0.5px solid ${hidePlayed ? 'var(--color-mgp-gold-dark)' : 'var(--color-mgp-border)'}`,
          borderRadius: 14,
          padding: '4px 10px',
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 10,
          letterSpacing: 1,
          textTransform: 'uppercase',
          color: hidePlayed ? 'var(--color-mgp-gold-dark)' : 'var(--color-mgp-ink-3)',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-block',
            width: 22,
            height: 12,
            background: hidePlayed ? 'var(--color-mgp-gold-dark)' : 'var(--color-mgp-border-strong)',
            borderRadius: 6,
            position: 'relative',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 1,
              left: hidePlayed ? 11 : 1,
              width: 10,
              height: 10,
              background: 'white',
              borderRadius: '50%',
              transition: 'left 0.15s',
            }}
          />
        </span>
        Hide played
      </button>
    </div>
  )

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
        {renderHeader()}
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
        {renderHeader()}
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
        {renderHeader()}
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
      {renderHeader()}

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
