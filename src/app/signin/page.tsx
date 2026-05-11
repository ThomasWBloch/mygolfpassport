'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

export default function SigninPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const canSubmit = !loading && email.trim().length > 0 && password.length > 0

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
              autoFocus
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <input
              className="auth-input"
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              disabled={loading}
            />
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
