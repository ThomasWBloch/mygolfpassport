'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)

    // Fire the reset but ignore the specific outcome to avoid leaking which
    // email addresses are registered. Any error is swallowed here on purpose.
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    setSent(true)
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
          Reset your password
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
        {sent ? (
          <div>
            <div style={{
              background: 'rgba(74,222,128,0.15)',
              border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: '10px',
              padding: '14px 16px',
              color: '#4ade80',
              fontSize: '14px',
              marginBottom: '18px',
              lineHeight: 1.5,
            }}>
              Check your email for a reset link. It may take a minute to arrive — look in your spam folder if you don&rsquo;t see it.
            </div>
            <Link
              href="/login"
              style={{
                display: 'block',
                textAlign: 'center',
                color: '#c9a84c',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                padding: '10px',
              }}
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.5, marginBottom: '18px' }}>
              Enter the email address for your account and we&rsquo;ll send you a link to reset your password.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="thomas@example.com"
                required
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

            <button
              type="submit"
              disabled={loading || email.trim().length === 0}
              style={{
                width: '100%',
                padding: '15px',
                background: (loading || email.trim().length === 0) ? 'rgba(201,168,76,0.5)' : 'linear-gradient(135deg, #c9a84c, #f5d070)',
                border: 'none',
                borderRadius: '12px',
                color: '#7a5a00',
                fontSize: '16px',
                fontWeight: '800',
                cursor: (loading || email.trim().length === 0) ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.2px',
                boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
                marginBottom: '14px',
              }}
            >
              {loading ? '⏳ Sending...' : '✉️ Send reset link'}
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
