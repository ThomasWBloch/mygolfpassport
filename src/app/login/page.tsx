'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // Signup-only: show inline mismatch once the user has started typing both fields.
  const passwordsMismatch =
    mode === 'signup' &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password !== confirmPassword

  // Block submit for signup until name is filled, password ≥ 6 chars, and fields match.
  const signupInvalid =
    mode === 'signup' &&
    (name.trim().length === 0 ||
      password.length < 6 ||
      confirmPassword.length === 0 ||
      password !== confirmPassword)
  const submitDisabled = loading || signupInvalid

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Defensive — button should already be disabled, but don't trust the DOM.
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'signup') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      })
      if (signUpError) {
        setError(signUpError.message)
      } else if (data.user) {
        setSuccess('Check your email to confirm your account, then sign in.')
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) {
        setError('Incorrect email or password.')
      } else {
        router.push('/')
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a2518 0%, #0f3d24 40%, #1a5c38 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative background circles */}
      <div style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(201,168,76,0.06)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)', pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>⛳</div>
        <div style={{ color: '#fff', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          My Golf Passport
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '6px' }}>
          Track your courses. Share your journey.
        </div>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '28px 24px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
      }}>
        {/* Toggle */}
        <div style={{
          display: 'flex',
          background: 'rgba(0,0,0,0.25)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px',
        }}>
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setSuccess(''); setConfirmPassword('') }}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                background: mode === m ? '#fff' : 'transparent',
                color: mode === m ? '#0f3d24' : 'rgba(255,255,255,0.6)',
                boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {m === 'login' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Thomas Bloch"
                required
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '11px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="thomas@example.com"
              required
              style={{
                width: '100%',
                padding: '13px 14px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '11px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: mode === 'signup' ? '14px' : '20px' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '13px 14px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '11px',
                color: '#fff',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {mode === 'signup' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
                minLength={6}
                style={{
                  width: '100%',
                  padding: '13px 14px',
                  background: 'rgba(255,255,255,0.08)',
                  border: `1px solid ${passwordsMismatch ? 'rgba(232,92,92,0.5)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: '11px',
                  color: '#fff',
                  fontSize: '15px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {passwordsMismatch && (
                <div style={{ color: '#ffaaaa', fontSize: '12px', marginTop: '6px' }}>
                  Passwords do not match.
                </div>
              )}
            </div>
          )}

          {mode === 'login' && (
            <div style={{ textAlign: 'right', marginBottom: '14px', marginTop: '-8px' }}>
              <Link
                href="/forgot-password"
                style={{ color: '#c9a84c', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}
              >
                Forgot password?
              </Link>
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(232,92,92,0.15)',
              border: '1px solid rgba(232,92,92,0.3)',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#ffaaaa',
              fontSize: '13px',
              marginBottom: '14px',
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              background: 'rgba(74,222,128,0.15)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '10px',
              padding: '10px 14px',
              color: '#4ade80',
              fontSize: '13px',
              marginBottom: '14px',
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={submitDisabled}
            style={{
              width: '100%',
              padding: '15px',
              background: submitDisabled ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #f5d070)',
              border: 'none',
              borderRadius: '12px',
              color: '#7a5a00',
              fontSize: '16px',
              fontWeight: '800',
              cursor: submitDisabled ? 'not-allowed' : 'pointer',
              letterSpacing: '-0.2px',
              boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
            }}
          >
            {loading ? '⏳ Please wait...' : mode === 'login' ? '⛳ Sign in' : '🚀 Create account'}
          </button>
        </form>

        {mode === 'signup' && (
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', textAlign: 'center', marginTop: '16px', lineHeight: '1.5' }}>
            By creating an account you agree to our terms and privacy policy.
          </p>
        )}
      </div>

      {/* Social proof */}
      <div style={{
        marginTop: '28px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        {[
          { val: '80+', lbl: 'Courses tracked' },
          { val: '9', lbl: 'Countries' },
          { val: '14', lbl: 'Badges' },
        ].map((s) => (
          <div key={s.lbl} style={{ textAlign: 'center' }}>
            <div style={{ color: '#c9a84c', fontSize: '18px', fontWeight: '800' }}>{s.val}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '2px' }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
