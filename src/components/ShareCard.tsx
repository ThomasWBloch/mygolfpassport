"use client"

import { useState } from 'react'

/**
 * ShareCard — "share your card" action on /you.
 *
 * Downloads the all-dots Facebook share-card image from /api/share-card
 * (built server-side from the logged-in user's own referral_code — no props
 * needed) and hands it to the native share sheet when available, so it can
 * be posted straight to Facebook/Instagram/etc. Falls back to a plain file
 * download when Web Share's file support isn't there (most desktop browsers).
 */

export default function ShareCard() {
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  async function handleShare() {
    if (busy) return
    setBusy(true)
    setNote(null)
    try {
      const res = await fetch('/api/share-card')
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        setNote(body?.error ?? 'Could not build your share card.')
        return
      }

      const blob = await res.blob()
      const file = new File([blob], 'my-golf-passport.png', { type: 'image/png' })

      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean
        share?: (data: { files: File[]; title: string }) => Promise<void>
      }

      // navigator.share with a file works fine on mobile, but on desktop
      // (confirmed on Windows/Outlook) the OS share dialog shows the file
      // while the receiving app gets an empty attachment. Restrict the
      // native-share attempt to mobile and always fall through to a direct
      // download on desktop.
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      if (isMobile && typeof nav.canShare === 'function' && nav.canShare({ files: [file] }) && nav.share) {
        await nav.share({ files: [file], title: 'My Golf Passport' })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'my-golf-passport.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
    } catch {
      // user dismissed the share sheet — no-op
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <button
        onClick={handleShare}
        disabled={busy}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'var(--color-mgp-cover)',
          border: 'none',
          borderRadius: 14,
          padding: '14px 16px',
          textAlign: 'left',
          cursor: busy ? 'wait' : 'pointer',
          marginTop: 6,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-gold)',
              marginBottom: 3,
            }}
          >
            Show it off
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17,
              fontWeight: 500,
              color: 'var(--color-mgp-cream)',
              letterSpacing: -0.2,
              lineHeight: 1.15,
            }}
          >
            {busy ? 'Preparing…' : 'Download your passport card'}
          </div>
        </div>
        <span style={{ color: 'var(--color-mgp-gold)', fontSize: 18 }}>↗</span>
      </button>

      {note && (
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mgp-ink-2)',
            padding: '2px 4px',
            lineHeight: 1.4,
            wordBreak: 'break-all',
          }}
        >
          {note}
        </div>
      )}
    </>
  )
}
