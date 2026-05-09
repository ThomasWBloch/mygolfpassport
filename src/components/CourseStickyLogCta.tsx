'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  courseId: string
  /** True when the user has already logged this course at least once.
      Toggles the button copy between "Log round" and "Log new round". */
  played: boolean
}

/**
 * Floating gold pill CTA that anchors above the BottomNav and offers a
 * one-tap path to /log?course=<id> from anywhere on a course page. Hides
 * itself while the in-page #visit-block primary CTA is visible so the two
 * don't compete; reappears once the user has scrolled past it.
 *
 * Mounted near the bottom of the courses/[id] tree so the IntersectionObserver
 * can find #visit-block on first render.
 */
export default function CourseStickyLogCta({ courseId, played }: Props) {
  // Start visible until we know otherwise. If #visit-block is already on
  // screen at first render, the observer fires synchronously and flips this
  // to hidden before the browser paints.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const target = document.getElementById('visit-block')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <Link
      href={`/log?course=${courseId}`}
      style={{
        position: 'fixed',
        // BottomNav is 64px + safe-area; pad another 16px above it.
        bottom: 'calc(64px + env(safe-area-inset-bottom, 0px) + 16px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'var(--color-mgp-gold)',
        color: 'var(--color-mgp-cover)',
        borderRadius: 24,
        padding: '12px 22px',
        boxShadow: '0 6px 16px rgba(201, 168, 76, 0.35)',
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        // Sits under the BottomNav (zIndex 50) so the nav stays clickable.
        zIndex: 40,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: 'opacity 0.2s ease',
      }}
    >
      {played ? '+ Log new round' : '+ Log round'}
    </Link>
  )
}
