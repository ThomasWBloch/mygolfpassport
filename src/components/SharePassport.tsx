"use client"

import { useState } from 'react'

/**
 * SharePassport — "invite a friend" action on /you (Model A referral).
 *
 * Shares the user's invite LINK (<origin>/i/<referralCode>). Because that link
 * carries rich Open Graph metadata (a real Mapbox map of the user's played
 * courses, built in /i/[code]/opengraph-image.tsx), it unfurls into a preview
 * card in iMessage / WhatsApp / Messenger / RCS — one rich message instead of
 * a flat image plus a separate bare link. On desktop (no Web Share) we copy
 * the link to the clipboard.
 *
 * Props keep the old passport fields for call-site compatibility, but only
 * referralCode is used now that the visual lives in the unfurled card.
 */

interface Props {
  fullName?: string
  initials?: string
  homeClub?: string | null
  homeCountry?: string | null
  handicap?: number | null
  roundCount?: number
  countryCount?: number
  badgeCount?: number
  referralCode: string | null
}

export default function SharePassport({ referralCode }: Props) {
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  const inviteUrl =
    referralCode && typeof window !== 'undefined'
      ? `${window.location.origin}/i/${referralCode}`
      : null

  const shareText =
    'Join me on My Golf Passport — track every course you play.'

  async function handleShare() {
    if (!inviteUrl || busy) return
    setBusy(true)
    setNote(null)
    try {
      const nav = navigator as Navigator
      if (typeof nav.share === 'function') {
        await nav.share({ title: 'My Golf Passport', text: shareText, url: inviteUrl })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(inviteUrl)
        setNote('Invite link copied to clipboard.')
      } else {
        setNote(inviteUrl)
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
        disabled={busy || !inviteUrl}
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
            Invite a friend
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
            {busy ? 'Opening share…' : 'Share your invite link'}
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
