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
        background: '#1a5c38', color: '#fff', border: 'none',
        borderRadius: 10, padding: '10px 20px',
        fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit', opacity: loading ? 0.6 : 1,
        display: 'flex', alignItems: 'center', gap: 6,
      }}
    >
      💬 {loading ? 'Opening...' : 'Send message'}
    </button>
  )
}
