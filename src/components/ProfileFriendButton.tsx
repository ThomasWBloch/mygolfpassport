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
    setStatus('pending_sent')  // optimistic

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
    setStatus('friend')  // optimistic

    const res = await fetch('/api/friendships', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendshipId, action: 'accept' }),
    })
    if (!res.ok) setStatus('pending_received')
    setLoading(false)
  }

  const baseBtn = {
    borderRadius: 10, padding: '10px 20px',
    fontSize: 13, fontWeight: 700, fontFamily: 'inherit',
    display: 'flex', alignItems: 'center', gap: 6,
    whiteSpace: 'nowrap' as const,
  }

  if (status === 'friend') {
    return (
      <div style={{
        ...baseBtn,
        background: '#e8f5ee', color: '#1a5c38',
        border: '1px solid #a7d5b8',
      }}>
        ⛳ Golf buddy
      </div>
    )
  }

  if (status === 'pending_sent') {
    return (
      <div style={{
        ...baseBtn,
        background: '#f3f4f6', color: '#6b7280',
        border: '1px solid #e5e7eb',
      }}>
        Request sent
      </div>
    )
  }

  if (status === 'pending_received') {
    return (
      <button
        onClick={acceptRequest}
        disabled={loading}
        style={{
          ...baseBtn,
          background: '#1a5c38', color: '#fff', border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Accepting…' : 'Accept friend request'}
      </button>
    )
  }

  // none
  return (
    <button
      onClick={addFriend}
      disabled={loading}
      style={{
        ...baseBtn,
        background: '#1a5c38', color: '#fff', border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? 'Adding…' : '+ Add friend'}
    </button>
  )
}
