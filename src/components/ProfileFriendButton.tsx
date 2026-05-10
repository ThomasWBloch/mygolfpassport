'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

type Status = 'friend' | 'pending_sent' | 'pending_received' | 'none'

interface Props {
  currentUserId: string
  targetUserId: string
  initialStatus: Status
  initialFriendshipId: string | null
}

// Compact pill, styled for the dark green passport card background.
export default function ProfileFriendButton({
  currentUserId, targetUserId, initialStatus, initialFriendshipId,
}: Props) {
  const [status, setStatus] = useState<Status>(initialStatus)
  const [friendshipId, setFriendshipId] = useState<string | null>(initialFriendshipId)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function addFriend() {
    setLoading(true)
    const prev = status
    setStatus('pending_sent')

    const { data, error } = await supabase
      .from('friendships')
      .insert({ user_id: currentUserId, friend_id: targetUserId, status: 'pending' })
      .select('id')
      .single()

    if (error || !data) {
      setStatus(prev)
      setLoading(false)
      return
    }
    setFriendshipId(data.id as string)

    fetch('/api/friend-request-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUserId }),
    }).catch(() => {})

    setLoading(false)
  }

  async function acceptRequest() {
    if (!friendshipId) return
    setLoading(true)
    setStatus('friend')

    const res = await fetch('/api/friendships', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendshipId, action: 'accept' }),
    })
    if (!res.ok) setStatus('pending_received')
    setLoading(false)
  }

  const basePill = {
    borderRadius: 4,
    padding: '6px 12px',
    fontFamily: 'var(--font-mgp-stamp)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    lineHeight: 1.2,
  }

  if (status === 'friend') {
    return (
      <span style={{
        ...basePill,
        background: 'var(--color-mgp-gold)',
        color: 'var(--color-mgp-cover-ink)',
        border: '0.5px solid var(--color-mgp-gold-dark)',
      }}>
        ✓ Golf buddy
      </span>
    )
  }

  if (status === 'pending_sent') {
    return (
      <span style={{
        ...basePill,
        background: 'var(--color-mgp-cream-warm)',
        color: 'var(--color-mgp-ink-2)',
        border: '0.5px solid var(--color-mgp-border-faint)',
      }}>
        Request sent
      </span>
    )
  }

  if (status === 'pending_received') {
    return (
      <button
        onClick={acceptRequest}
        disabled={loading}
        style={{
          ...basePill,
          background: 'var(--color-mgp-gold)',
          color: 'var(--color-mgp-cover-ink)',
          border: '0.5px solid var(--color-mgp-gold-dark)',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Accepting…' : 'Accept'}
      </button>
    )
  }

  return (
    <button
      onClick={addFriend}
      disabled={loading}
      style={{
        ...basePill,
        background: 'var(--color-mgp-paper)',
        color: 'var(--color-mgp-cover)',
        border: '0.5px solid var(--color-mgp-border-strong)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? 'Adding…' : '+ Add golf buddy'}
    </button>
  )
}
