'use client'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'

/**
 * SharePassport — "share my passport" surface on /you (Model A referral).
 *
 * Renders a tap target plus an off-screen, self-contained passport card that
 * we rasterise with html-to-image and hand to the native share sheet (Web
 * Share API, files variant). The user then sends it through their OWN channels
 * — mail, WhatsApp, Messages — so the invite is person-to-person and we never
 * collect anything about the recipient (GDPR-clean, see referral notes).
 *
 * The shared text carries the user's neutral invite link
 * (<origin>/i/<referralCode>); attribution is written server-side when the
 * friend signs up through it.
 *
 * The capture card is intentionally NOT the live PassportCard (which contains
 * <Link>s and interactive stats). It's a static, link-free render sized for a
 * social post.
 */

interface Props {
  fullName: string
  initials: string
  homeClub: string | null
  homeCountry: string | null
  handicap: number | null
  roundCount: number
  countryCount: number
  badgeCount: number
  referralCode: string | null
}

export default function SharePassport({
  fullName,
  initials,
  homeClub,
  homeCountry,
  handicap,
  roundCount,
  countryCount,
  badgeCount,
  referralCode,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState<string | null>(null)

  const inviteUrl =
    referralCode && typeof window !== 'undefined'
      ? `${window.location.origin}/i/${referralCode}`
      : null

  const shareText = inviteUrl
    ? `Join me on My Golf Passport — track every course you play. ${inviteUrl}`
    : 'Join me on My Golf Passport — track every course you play.'

  async function handleShare() {
    if (!cardRef.current || busy) return
    setBusy(true)
    setNote(null)
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: '#f4ecd8',
      })
      const blob = await (await fetch(dataUrl)).blob()
      const file = new File([blob], 'my-golf-passport.png', { type: 'image/png' })

      const nav = navigator as Navigator & {
        canShare?: (d: ShareData) => boolean
      }

      if (nav.canShare && nav.canShare({ files: [file] })) {
        await nav.share({
          files: [file],
          title: 'My Golf Passport',
          text: shareText,
        })
      } else {
        // Fallback (mostly desktop): download the image and copy the link.
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = 'my-golf-passport.png'
        a.click()
        if (inviteUrl && navigator.clipboard) {
          try {
            await navigator.clipboard.writeText(inviteUrl)
            setNote('Image saved and invite link copied to clipboard.')
          } catch {
            setNote('Image saved. Share your link: ' + inviteUrl)
          }
        } else {
          setNote('Image saved to your device.')
        }
      }
    } catch {
      setNote('Could not generate the image. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const country = (homeCountry ?? '').toUpperCase()
  const meta = [country || null, handicap != null ? `HCP ${handicap}` : null]
    .filter(Boolean)
    .join('  ·  ')

  return (
    <>
      {/* ── Tap target (matches the Settings / Feedback tiles) ─────────────── */}
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
            {busy ? 'Preparing your passport…' : 'Share my passport'}
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
          }}
        >
          {note}
        </div>
      )}

      {/* ── Off-screen capture card (rendered, not display:none) ───────────── */}
      <div
        aria-hidden
        style={{ position: 'fixed', left: -99999, top: 0, pointerEvents: 'none' }}
      >
        <div
          ref={cardRef}
          style={{
            width: 540,
            boxSizing: 'border-box',
            padding: '40px 40px 34px',
            background: '#f4ecd8',
            fontFamily: 'var(--font-mgp-body), Inter, sans-serif',
            color: '#23241f',
            borderTop: '3px double #c9a84c',
            borderBottom: '3px double #c9a84c',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mgp-stamp), monospace',
              fontSize: 12,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#1f3a2e',
              marginBottom: 22,
            }}
          >
            ✦ My Golf Passport
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginBottom: 26 }}>
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: '50%',
                background: '#1f3a2e',
                color: '#c9a84c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mgp-display), Georgia, serif',
                fontSize: 34,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-mgp-display), Georgia, serif',
                  fontSize: 30,
                  fontWeight: 600,
                  lineHeight: 1.05,
                  color: '#23241f',
                }}
              >
                {fullName}
              </div>
              {homeClub && (
                <div style={{ fontSize: 15, color: '#3a3a3a', marginTop: 4 }}>{homeClub}</div>
              )}
              {meta && (
                <div
                  style={{
                    fontFamily: 'var(--font-mgp-stamp), monospace',
                    fontSize: 11,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#6b6b5e',
                    marginTop: 6,
                  }}
                >
                  {meta}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 26 }}>
            {[
              { n: roundCount, l: 'Courses' },
              { n: countryCount, l: 'Countries' },
              { n: badgeCount, l: 'Badges' },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  background: '#fdf9ed',
                  border: '1px solid #e3d8b8',
                  padding: '16px 6px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mgp-display), Georgia, serif',
                    fontSize: 30,
                    fontWeight: 600,
                    color: '#1f3a2e',
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mgp-stamp), monospace',
                    fontSize: 10,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: '#6b6b5e',
                    marginTop: 7,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: '1px dashed #c9a84c',
              paddingTop: 16,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mgp-display), Georgia, serif',
                fontSize: 16,
                fontStyle: 'italic',
                color: '#23241f',
              }}
            >
              Join me — start your own passport.
            </span>
            {inviteUrl && (
              <span
                style={{
                  fontFamily: 'var(--font-mgp-stamp), monospace',
                  fontSize: 11,
                  letterSpacing: 1,
                  color: '#1f3a2e',
                }}
              >
                {inviteUrl.replace(/^https?:\/\//, '')}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
