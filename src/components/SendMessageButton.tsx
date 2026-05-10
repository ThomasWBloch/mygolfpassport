'use client'

import { useState } from 'react'

export default function SendMessageButton({ targetUserId }: { targetUserId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otherUserId: targetUserId }),
    })
    const data = await res.json()
    if (data.conversationId) {
      window.location.href = `/messages/${data.conversationId}`
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        background: 'var(--color-mgp-cover)',
        color: 'var(--color-mgp-ink-inv)',
        border: '0.5px solid var(--color-mgp-gold)',
        borderRadius: 4,
        padding: '12px 18px',
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        boxShadow: '0 2px 6px rgba(15, 37, 25, 0.15)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {loading ? 'Opening…' : '+ Message'}
    </button>
  )
}
