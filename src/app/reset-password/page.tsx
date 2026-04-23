'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // The browser client auto-detects the recovery tokens in the URL and fires
  // a PASSWORD_RECOVERY event. Subscribing isn't strictly required — we just
  // wait for a session to exist before allowing submit. If the user lands here
  // without a valid reset link, supabase.auth.updateUser will return an error
  // that we surface.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // No-op — subscription ensures the client processes the URL hash on mount.
    })
    return () => subscription.unsubscribe()
  }, [supabase])

  const passwordsMismatch =
    password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
  const canSubmit =
    !loading &&
    password.length >= 6 &&
    confirmPassword.length >= 6 &&
    password === confirmPassword

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
    setTimeout(() => {
      router.push('/')
      router.refresh()
    }, 1500)
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

      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>⛳</div>
        <div style={{ color: '#fff', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          My Golf Passport
        </div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '6px' }}>
          Set a new password
        </div>
      </div>

      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '20px',
        padding: '28px 24px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
      }}>
        {done ? (
          <div style={{
            background: 'rgba(74,222,128,0.15)',
            border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: '10px',
            padding: '14px 16px',
            color: '#4ade80',
            fontSize: '14px',
            lineHeight: 1.5,
          }}>
            Password updated. Redirecting you to the app…
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoFocus
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

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Confirm new password
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

            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: '100%',
                padding: '15px',
                background: !canSubmit ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #f5d070)',
                border: 'none',
                borderRadius: '12px',
                color: '#7a5a00',
                fontSize: '16px',
                fontWeight: '800',
                cursor: !canSubmit ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.2px',
                boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
                marginBottom: '14px',
              }}
            >
              {loading ? '⏳ Updating...' : '🔒 Update password'}
            </button>

            <Link
              href="/login"
              style={{
                display: 'block',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              ← Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
