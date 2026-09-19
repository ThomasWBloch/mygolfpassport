'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/app/lib/supabase'

/**
 * /signin — returning passport holder.
 *
 * Mockup source: design-system/auth-suite-mockup.html
 *
 * Adventure-styled sign-in form. Email + password. On success → / (proxy
 * decides where they actually go — home if profile complete, /onboarding if
 * not). On failure → inline error.
 *
 * Decor: gold "RE-ENTRY" stamp top-right. Headline italicises "you left off"
 * in stamp-red to keep the Adventure poetic feel even on a functional screen.
 */

// /auth/callback redirects here with ?error=... when a confirmation/recovery
// code was missing or already expired/consumed — previously silently
// ignored, leaving the user on a bare sign-in form with no idea why they'd
// been bounced.
const CALLBACK_ERROR_MESSAGES: Record<string, string> = {
  auth_callback_missing_code: 'That link looks incomplete — please use the link from your email directly.',
  auth_callback_failed: 'That link is invalid or has expired. Request a new one below if you were resetting your password.',
}

function SigninForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [recovering, setRecovering] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  useEffect(() => {
    // Mobile's Supabase client has no flowType override and no deep-link
    // handler to complete a PKCE exchange back on-device, so it defaults to
    // the implicit flow — its confirmation/recovery emails carry
    // access_token/refresh_token in the URL's hash fragment instead of a
    // ?code= param. /auth/callback's server route can never see a hash
    // fragment (browsers never send it to the server), so it always
    // reports missing_code and redirects here — and the browser preserves
    // the original fragment across that redirect. Recover the session
    // client-side from those tokens instead of just showing an error while
    // a perfectly valid token sits unused in the URL.
    const hash = window.location.hash
    const hashParams = hash.length > 1 ? new URLSearchParams(hash.slice(1)) : null
    const access_token = hashParams?.get('access_token')
    const refresh_token = hashParams?.get('refresh_token')
    if (access_token && refresh_token) {
      const type = hashParams!.get('type')
      setRecovering(true)
      supabase.auth.setSession({ access_token, refresh_token }).then(({ error: sessionError }) => {
        window.history.replaceState(null, '', window.location.pathname)
        if (sessionError) {
          setRecovering(false)
          setError('That link is invalid or has expired.')
          return
        }
        router.push(type === 'recovery' ? '/reset-password' : '/email-confirmed')
        router.refresh()
      })
      return
    }

    const code = searchParams.get('error')
    if (code && CALLBACK_ERROR_MESSAGES[code]) setError(CALLBACK_ERROR_MESSAGES[code])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const canSubmit = !loading && email.trim().length > 0 && password.length > 0

  if (recovering) {
    return (
      <div className="auth">
        <header className="auth-topband">
          <span className="auth-monogram">M</span>
          <span className="auth-brand-name">My Golf Passport</span>
        </header>
        <div className="auth-body">
          <div className="auth-eyebrow">One moment</div>
          <h1 className="auth-headline">Confirming your link<em>…</em></h1>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (signInError) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }

    // Proxy decides actual destination (/ or /onboarding)
    router.push('/')
    router.refresh()
  }

  return (
    <div className="auth">
      <span className="auth-decor-stamp">RE-ENTRY</span>

      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body">
        <div className="auth-eyebrow">Welcome back</div>
        <h1 className="auth-headline">Pick up where <em>you left off</em>.</h1>
        <p className="auth-sub">
          Sign in to your passport. Every stamp is still there.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              className="auth-input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="auth-input"
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={loading}
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
                  color: 'var(--color-mgp-ink-3)', fontSize: 14, fontFamily: 'inherit',
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="auth-hint">
              <Link href="/forgot-password">Forgot password?</Link>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" type="submit" disabled={!canSubmit}>
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </form>

        <div className="auth-footer-link">
          No passport yet? <Link href="/signup">Get one →</Link>
        </div>
      </div>

      <div className="auth-trust">
        <span className="check">No ads</span>
        <span className="check">No tracking</span>
      </div>
    </div>
  )
}

export default function SigninPage() {
  return (
    <Suspense fallback={null}>
      <SigninForm />
    </Suspense>
  )
}
