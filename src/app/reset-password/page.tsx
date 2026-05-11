'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase'

/**
 * /reset-password — set a new password (post link-click).
 *
 * Mockup source: design-system/auth-suite-mockup.html (5th screen)
 *
 * The browser client auto-detects the recovery tokens in the URL and fires
 * a PASSWORD_RECOVERY event. Subscribing isn't strictly required — we just
 * wait for a session to exist before allowing submit. If the user lands here
 * without a valid reset link, supabase.auth.updateUser returns an error.
 *
 * Single password field (no confirm) — matches signup pattern. Password
 * managers + the show-typed-password browser UX cover most typo risk; if
 * a user lands locked-out, the forgot-password flow takes them back.
 */

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Subscription ensures the client processes the URL hash on mount.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {})
    return () => subscription.unsubscribe()
  }, [supabase])

  const canSubmit = !loading && password.length >= 6

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')

    const { error: updateErr } = await supabase.auth.updateUser({ password })
    if (updateErr) {
      setError(updateErr.message)
      setLoading(false)
      return
    }

    setDone(true)
    // Auto-redirect to home after a short moment
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 1200)
  }

  return (
    <div className="auth">
      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body">
        <div className="auth-eyebrow">Fresh start</div>
        <h1 className="auth-headline">Choose a <em>new password</em>.</h1>
        <p className="auth-sub">
          Make it something you&rsquo;ll remember this time.
        </p>

        {done ? (
          <div className="auth-success">
            Password updated. Taking you to your passport…
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="password">New password</label>
              <input
                className="auth-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
                required
                disabled={loading}
                autoFocus
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-btn" type="submit" disabled={!canSubmit}>
              {loading ? 'Updating…' : 'Update password →'}
            </button>
          </form>
        )}

        <div className="auth-footer-link">
          Changed your mind? <Link href="/signin">Back to sign in</Link>
        </div>
      </div>

      <div className="auth-trust">
        <span>You&rsquo;ll be signed in automatically</span>
      </div>
    </div>
  )
}
