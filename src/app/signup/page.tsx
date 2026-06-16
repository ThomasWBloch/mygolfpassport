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
 * Fields: full name, email, confirm email, password. No confirm-password
 * field (per audit recommendation — password-managers handle typos, and the
 * forgot-password flow covers honest mistakes). Email IS double-entered +
 * has a "did you mean?" domain-typo suggester, because a mistyped email has
 * no recovery path: the confirmation link goes nowhere and the account can
 * never be activated.
 *
 * On submit:
 *  1. supabase.auth.signUp with emailRedirectTo = /auth/callback
 *  2. Push to /signup/check-email?email=<email> to show the wait-screen
 *
 * Supabase sends the confirmation email; clicking the link in the email
 * eventually calls /auth/callback which exchanges the code for a session.
 */

// ── Common email domains for the "did you mean?" suggester ────────────────────
const COMMON_DOMAINS = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.uk', 'ymail.com',
  'hotmail.com', 'hotmail.co.uk', 'hotmail.dk', 'outlook.com', 'outlook.dk',
  'live.com', 'live.dk', 'msn.com', 'icloud.com', 'me.com', 'mac.com',
  'aol.com', 'protonmail.com', 'proton.me', 'gmx.com', 'gmx.de', 'mail.com',
  'zoho.com', 'yahoo.dk',
]

// Levenshtein edit distance (small strings — fine to compute inline)
function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    }
  }
  return dp[m][n]
}

/**
 * Returns a corrected email suggestion when the domain looks like a typo of a
 * common provider, otherwise null. Only fires when there's a full domain and
 * it isn't already an exact known domain.
 */
function suggestEmail(email: string): string | null {
  const at = email.lastIndexOf('@')
  if (at < 1) return null
  const local = email.slice(0, at)
  const domain = email.slice(at + 1).toLowerCase().trim()
  if (!domain.includes('.')) return null
  if (COMMON_DOMAINS.includes(domain)) return null

  let best: string | null = null
  let bestDist = 3 // only accept distance 1 or 2
  for (const cand of COMMON_DOMAINS) {
    const d = editDistance(domain, cand)
    if (d < bestDist) { bestDist = d; best = cand }
  }
  if (!best) return null
  return `${local}@${best}`
}

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const emailsMatch =
    confirmEmail.length === 0 ||
    email.trim().toLowerCase() === confirmEmail.trim().toLowerCase()

  const canSubmit =
    !loading &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    confirmEmail.trim().length > 0 &&
    email.trim().toLowerCase() === confirmEmail.trim().toLowerCase() &&
    password.length >= 6

  function applySuggestion() {
    if (!suggestion) return
    setEmail(suggestion)
    setConfirmEmail(suggestion)
    setSuggestion(null)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading || name.trim().length === 0 || password.length < 6) return
    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setError('The two email addresses don’t match.')
      return
    }
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
          Get your free passport. No credit card required.
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
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              className="auth-input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
                setSuggestion(suggestEmail(e.target.value))
              }}
              onBlur={() => setSuggestion(suggestEmail(email))}
              placeholder="you@example.com"
              autoComplete="email"
              required
              disabled={loading}
            />
            {suggestion && (
              <button
                type="button"
                onClick={applySuggestion}
                style={{
                  display: 'block', marginTop: 6,
                  background: 'none', border: 'none', padding: 0,
                  color: 'var(--color-mgp-gold-dark)',
                  fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left',
                }}
              >
                Did you mean <u>{suggestion}</u>?
              </button>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="confirmEmail">Confirm email</label>
            <input
              className="auth-input"
              id="confirmEmail"
              type="email"
              value={confirmEmail}
              onChange={(e) => { setConfirmEmail(e.target.value); setError('') }}
              placeholder="Re-type your email"
              autoComplete="email"
              required
              disabled={loading}
            />
            {!emailsMatch && (
              <div style={{ marginTop: 6, fontSize: 14, color: 'var(--color-mgp-danger)' }}>
                Emails don&rsquo;t match yet.
              </div>
            )}
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
                placeholder="At least 6 characters"
                autoComplete="new-password"
                minLength={6}
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
