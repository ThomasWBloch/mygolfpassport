'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase'

/**
 * /signup — new passport holder.
 *
 * Mockup source: design-system/auth-suite-mockup.html
 *
 * Three fields: full name, email, password. No confirm-password field
 * (per audit recommendation — password-managers handle typos, and the
 * forgot-password flow covers honest mistakes).
 *
 * On submit:
 *  1. supabase.auth.signUp with emailRedirectTo = /auth/callback
 *  2. Push to /signup/check-email?email=<email> to show the wait-screen
 *
 * Supabase sends the confirmation email; clicking the link in the email
 * eventually calls /auth/callback which exchanges the code for a session.
 */

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const canSubmit =
    !loading &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.length >= 6

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { full_name: name.trim() },
      },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    if (!data.user) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    // Off to the wait-screen — pass email so we can show it back
    router.push(`/signup/check-email?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="auth">
      <span className="auth-decor-stamp red">⚐ NEW ISSUE</span>

      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body">
        <div className="auth-eyebrow">Get your passport</div>
        <h1 className="auth-headline">Your passport is <em>being issued</em>.</h1>
        <p className="auth-sub">
          Three fields. Free to start. No card required.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="name">Full name</label>
            <input
              className="auth-input"
              id="name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder="Thomas Bloch"
              autoComplete="name"
              required
              disabled={loading}
              autoFocus
            />
          </div>
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
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-btn" type="submit" disabled={!canSubmit}>
            {loading ? 'Issuing…' : 'Issue my passport →'}
          </button>
        </form>

        <div className="auth-footer-link">
          Already have one? <Link href="/signin">Sign in →</Link>
        </div>
      </div>

      <div className="auth-trust">
        <span className="check">No ads</span>
        <span className="check">No tracking</span>
      </div>
    </div>
  )
}
