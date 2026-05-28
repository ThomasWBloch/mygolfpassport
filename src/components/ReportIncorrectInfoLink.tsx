'use client'

import { useState } from 'react'

/**
 * ReportIncorrectInfoLink — a small grey link that opens a modal form for
 * proposing a correction to a course or club's metadata. Submissions go to
 * public.course_edit_submissions via the submit_course_edit() RPC; nothing
 * touches the canonical courses table directly.
 *
 * Designed for low-friction reporting:
 *   • Auth required (link tells you so before opening the modal if signed out)
 *   • Type dropdown + 500-char message + optional source URL
 *   • Server-side validation + per-user + per-course rate limits
 *
 * Surfaced at the bottom of the Club info collapsible on /courses/[id] and
 * the clubs detail page. Intentionally low-visibility — fixing data should
 * feel like a discreet good deed, not a primary CTA.
 */

const TYPE_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'name',       label: 'Name is wrong / misspelled' },
  { value: 'website',    label: 'Website is wrong / outdated' },
  { value: 'phone',      label: 'Phone is wrong' },
  { value: 'address',    label: 'Address / location is wrong' },
  { value: 'holes_par',  label: 'Holes or par is wrong' },
  { value: 'duplicate',  label: 'This is a duplicate of another course' },
  { value: 'other',      label: 'Something else' },
]

export default function ReportIncorrectInfoLink({
  courseId,
  signedIn,
}: {
  courseId: string
  signedIn: boolean
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(TYPE_OPTIONS[0].value)
  const [message, setMessage] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorText, setErrorText] = useState('')

  const reset = () => {
    setType(TYPE_OPTIONS[0].value)
    setMessage('')
    setSourceUrl('')
    setStatus('idle')
    setErrorText('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submitting) return

    const trimmed = message.trim()
    if (trimmed.length === 0) {
      setStatus('error')
      setErrorText('Please describe what should change.')
      return
    }
    if (trimmed.length > 500) {
      setStatus('error')
      setErrorText('Message is too long (max 500 characters).')
      return
    }

    setSubmitting(true)
    setStatus('idle')
    setErrorText('')

    try {
      const res = await fetch(`/api/courses/${courseId}/report`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          type,
          message: trimmed,
          source_url: sourceUrl.trim() || null,
        }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setErrorText(json?.error ?? 'Could not submit. Please try again.')
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
      setErrorText('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!signedIn) {
    // Show nothing for signed-out viewers; the action is auth-only.
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { reset(); setOpen(true) }}
        style={{
          background: 'none',
          border: 'none',
          padding: '12px 16px',
          margin: 0,
          fontFamily: 'var(--font-mgp-stamp)',
          fontWeight: 600,
          fontSize: 11,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          cursor: 'pointer',
          display: 'block',
          width: '100%',
          textAlign: 'center',
          textDecoration: 'underline',
          textUnderlineOffset: 3,
        }}
      >
        Report incorrect info ›
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 37, 25, 0.4)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 100,
            padding: 12,
          }}
        >
          <div
            style={{
              background: 'var(--color-mgp-paper)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 12,
              padding: 18,
              width: '100%',
              maxWidth: 480,
              boxShadow: '0 8px 32px rgba(15, 37, 25, 0.18)',
              fontFamily: 'var(--font-mgp-body)',
              maxHeight: '88vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2
                id="report-modal-title"
                style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                  margin: 0,
                }}
              >
                Suggest a correction
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 22,
                  color: 'var(--color-mgp-ink-3)',
                  cursor: 'pointer',
                  padding: 4,
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {status === 'success' ? (
              <div>
                <div style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 17,
                  color: 'var(--color-mgp-ink)',
                  marginBottom: 6,
                }}>
                  Thanks — your suggestion was logged.
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-mgp-ink-2)', lineHeight: 1.5 }}>
                  Someone on the My Golf Passport team will review it. No need to do anything else.
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    marginTop: 16,
                    width: '100%',
                    background: 'var(--color-mgp-cover)',
                    color: 'var(--color-mgp-ink-inv)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-2)',
                  marginBottom: 6,
                }}>
                  What's wrong?
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--color-mgp-cream-warm)',
                    border: '1px solid var(--color-mgp-border-faint)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mgp-body)',
                    fontSize: 14,
                    color: 'var(--color-mgp-ink)',
                    marginBottom: 14,
                  }}
                >
                  {TYPE_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>

                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-2)',
                  marginBottom: 6,
                }}>
                  Details
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  disabled={submitting}
                  placeholder="What should the correct value be? Any details that help us verify the change."
                  rows={4}
                  maxLength={500}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--color-mgp-cream-warm)',
                    border: '1px solid var(--color-mgp-border-faint)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mgp-body)',
                    fontSize: 14,
                    color: 'var(--color-mgp-ink)',
                    resize: 'vertical',
                    marginBottom: 4,
                    boxSizing: 'border-box',
                  }}
                />
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 10,
                  letterSpacing: 1.2,
                  color: 'var(--color-mgp-ink-3)',
                  marginBottom: 14,
                  textAlign: 'right',
                }}>
                  {message.length} / 500
                </div>

                <label style={{
                  display: 'block',
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-2)',
                  marginBottom: 6,
                }}>
                  Source <span style={{ color: 'var(--color-mgp-ink-3)', letterSpacing: 0.5, fontSize: 10 }}>(optional)</span>
                </label>
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={e => setSourceUrl(e.target.value)}
                  disabled={submitting}
                  placeholder="https://example.com — a link that supports your suggestion"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'var(--color-mgp-cream-warm)',
                    border: '1px solid var(--color-mgp-border-faint)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mgp-body)',
                    fontSize: 14,
                    color: 'var(--color-mgp-ink)',
                    marginBottom: 16,
                    boxSizing: 'border-box',
                  }}
                />

                {status === 'error' && errorText && (
                  <div style={{
                    background: 'var(--color-mgp-cream-warm)',
                    border: '1px solid var(--color-mgp-stamp-red)',
                    borderRadius: 6,
                    padding: '10px 12px',
                    fontSize: 13,
                    color: 'var(--color-mgp-stamp-red)',
                    marginBottom: 12,
                    lineHeight: 1.4,
                  }}>
                    {errorText}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || message.trim().length === 0}
                  style={{
                    width: '100%',
                    background: 'var(--color-mgp-cover)',
                    color: 'var(--color-mgp-ink-inv)',
                    border: 'none',
                    borderRadius: 6,
                    padding: '12px 16px',
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    cursor: submitting || message.trim().length === 0 ? 'not-allowed' : 'pointer',
                    opacity: submitting || message.trim().length === 0 ? 0.5 : 1,
                  }}
                >
                  {submitting ? 'Submitting…' : 'Submit suggestion'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
