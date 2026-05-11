'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase'

/**
 * /forgot-password — request a password reset email.
 *
 * Mockup source: design-system/auth-suite-mockup.html (4th screen)
 *
 * Adventure redesign of the old dark-glass version. Single email field;
 * sends a reset link to that address. Outcome is intentionally not surfaced
 * (no "user not found" vs "email sent" distinction) to avoid leaking which
 * email addresses are registered.
 */

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  const canSubmit = !loading && email.trim().length > 0

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)

    // Fire-and-forget; do NOT surface whether the email exists.
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="auth">
      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body">
        <div className="auth-eyebrow">Lost the key</div>
        <h1 className="auth-headline">Reset your <em>password</em>.</h1>
        <p className="auth-sub">
          Tell us your email and we&rsquo;ll send a reset link.
        </p>

        {sent ? (
          <div className="auth-success">
            Check your email for a reset link. It may take a minute to arrive —
            check spam if you don&rsquo;t see it.
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                className="auth-input"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <button className="auth-btn" type="submit" disabled={!canSubmit}>
              {loading ? 'Sending…' : 'Send reset link →'}
            </button>
          </form>
        )}

        <div className="auth-footer-link">
          Remembered it? <Link href="/signin">Sign in →</Link>
        </div>
      </div>

      <div className="auth-trust">
        <span>Link is valid for 1 hour</span>
      </div>
    </div>
  )
}
