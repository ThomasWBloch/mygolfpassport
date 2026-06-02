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
 * New password + confirm password, with a show/hide toggle. A mistyped new
 * password has no recovery beyond running forgot-password again, so we double-
 * enter here and let the user reveal what they typed.
 */

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword
  const canSubmit = !loading && password.length >= 6 && password === confirmPassword

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
              <div style={{ position: 'relative' }}>
                <input
                  className="auth-input"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  disabled={loading}
                  autoFocus
                  style={{ paddingRight: 64 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: 'absolute', top: 0, right: 0, height: '100%',
                    display: 'flex', alignItems: 'center', padding: '0 12px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--color-mgp-ink-3)', fontSize: 13, fontFamily: 'inherit',
                  }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="confirmPassword">Confirm new password</label>
              <input
                className="auth-input"
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError('') }}
                placeholder="Re-type your new password"
                autoComplete="new-password"
                minLength={6}
                required
                disabled={loading}
              />
              {!passwordsMatch && (
                <div style={{ marginTop: 6, fontSize: 13, color: 'var(--color-mgp-danger)' }}>
                  Passwords don&rsquo;t match yet.
                </div>
              )}
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
