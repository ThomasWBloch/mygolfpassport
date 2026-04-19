'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import UserAvatar from '@/components/UserAvatar'

export interface LeaderboardUser {
  userId: string
  fullName: string
  homeClub: string | null
  courseCount: number
  countryCount: number
  avatarUrl: string | null
  isFriend: boolean
  friendshipStatus: 'friend' | 'pending_sent' | 'pending_received' | 'none'
  friendshipId: string | null
  sameClub: boolean
  sameCountry: boolean
  sameContinent: boolean
}

interface Props {
  users: LeaderboardUser[]
  currentUserId: string
  hasHomeClub: boolean
  hasCountry: boolean
}

type Tab = 'friends' | 'country' | 'continent' | 'world' | 'club'

const TABS: { key: Tab; label: string }[] = [
  { key: 'friends',   label: 'Friends' },
  { key: 'country',   label: 'Country' },
  { key: 'continent', label: 'Continent' },
  { key: 'world',     label: 'World' },
  { key: 'club',      label: 'Club' },
]

function getMedal(rank: number): string {
  if (rank === 1) return '\u{1F947}'
  if (rank === 2) return '\u{1F948}'
  if (rank === 3) return '\u{1F949}'
  return ''
}

function getAvatarColor(name: string): string {
  const colors = ['#1a5c38', '#c9a84c', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#be185d', '#059669']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

export default function LeaderboardTabs({ users: initialUsers, currentUserId, hasHomeClub, hasCountry }: Props) {
  const [tab, setTab] = useState<Tab>('friends')
  const [users, setUsers] = useState(initialUsers)
  const [loadingUserIds, setLoadingUserIds] = useState<Set<string>>(new Set())

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  function updateUser(userId: string, patch: Partial<LeaderboardUser>) {
    setUsers(prev => prev.map(u => u.userId === userId ? { ...u, ...patch } : u))
  }

  function setLoading(userId: string, loading: boolean) {
    setLoadingUserIds(prev => {
      const next = new Set(prev)
      if (loading) next.add(userId); else next.delete(userId)
      return next
    })
  }

  async function addFriend(targetId: string) {
    setLoading(targetId, true)
    // Optimistic update — show "Request sent" immediately
    const prevStatus = users.find(u => u.userId === targetId)?.friendshipStatus
    updateUser(targetId, { friendshipStatus: 'pending_sent' })

    const { data, error } = await supabase
      .from('friendships')
      .insert({ user_id: currentUserId, friend_id: targetId, status: 'pending' })
      .select('id')
      .single()

    if (error || !data) {
      // Rollback
      updateUser(targetId, { friendshipStatus: prevStatus ?? 'none', friendshipId: null })
      setLoading(targetId, false)
      return
    }

    updateUser(targetId, { friendshipId: data.id as string })

    // Fire-and-forget notification
    fetch('/api/friend-request-notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetUserId: targetId }),
    }).catch(() => {})

    setLoading(targetId, false)
  }

  async function acceptRequest(targetId: string, friendshipId: string) {
    setLoading(targetId, true)
    // Optimistic — flip to friend immediately
    updateUser(targetId, { friendshipStatus: 'friend', isFriend: true })

    const res = await fetch('/api/friendships', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendshipId, action: 'accept' }),
    })

    if (!res.ok) {
      // Rollback
      updateUser(targetId, { friendshipStatus: 'pending_received', isFriend: false })
    }
    setLoading(targetId, false)
  }

  const filtered = useMemo(() => {
    let list: LeaderboardUser[]
    switch (tab) {
      case 'friends':
        list = users.filter(u => u.isFriend || u.userId === currentUserId)
        break
      case 'country':
        list = users.filter(u => u.sameCountry)
        break
      case 'continent':
        list = users.filter(u => u.sameContinent)
        break
      case 'world':
        list = users
        break
      case 'club':
        list = users.filter(u => u.sameClub)
        break
      default:
        list = users
    }
    return [...list].sort((a, b) => b.courseCount - a.courseCount || b.countryCount - a.countryCount)
  }, [users, tab, currentUserId])

  const currentUserRank = filtered.findIndex(u => u.userId === currentUserId) + 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
        scrollbarWidth: 'none',
      }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flexShrink: 0,
              padding: '8px 14px',
              borderRadius: 20,
              border: '1px solid',
              borderColor: tab === t.key ? '#1a5c38' : '#e5e7eb',
              background: tab === t.key ? '#1a5c38' : '#fff',
              color: tab === t.key ? '#fff' : '#374151',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Empty states */}
      {tab === 'club' && !hasHomeClub && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            Set your home club in <Link href="/profile" style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>your profile</Link> to see club rankings.
          </div>
        </div>
      )}

      {tab === 'country' && !hasCountry && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            Set your home club in <Link href="/profile" style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>your profile</Link> to see country rankings.
          </div>
        </div>
      )}

      {tab === 'continent' && !hasCountry && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>
            Set your home club in <Link href="/profile" style={{ color: '#1a5c38', fontWeight: 600, textDecoration: 'none' }}>your profile</Link> to see continent rankings.
          </div>
        </div>
      )}

      {filtered.length === 0 && (tab === 'friends' || ((tab === 'club' && hasHomeClub) || (tab === 'country' && hasCountry) || (tab === 'continent' && hasCountry) || tab === 'world')) && (
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#9ca3af' }}>No golfers found for this tab.</div>
        </div>
      )}

      {/* Your position banner */}
      {currentUserRank > 0 && filtered.length > 1 && (
        <div style={{
          background: '#e8f5ee', border: '1px solid #a7d5b8', borderRadius: 12,
          padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1a5c38' }}>
            Your position
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#1a5c38' }}>
            #{currentUserRank} <span style={{ fontWeight: 500, fontSize: 12, color: '#6b7280' }}>of {filtered.length}</span>
          </span>
        </div>
      )}

      {/* Leaderboard list */}
      {filtered.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          {filtered.map((u, i) => {
            const rank = i + 1
            const medal = getMedal(rank)
            const isMe = u.userId === currentUserId
            const initials = u.fullName
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map(w => w[0]?.toUpperCase() ?? '')
              .join('')

            return (
              <div
                key={u.userId}
                style={{
                  padding: '12px 14px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: isMe ? '#f0fdf4' : 'transparent',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 28, textAlign: 'center', flexShrink: 0,
                  fontSize: medal ? 18 : 14,
                  fontWeight: 800,
                  color: medal ? undefined : '#6b7280',
                }}>
                  {medal || `#${rank}`}
                </div>

                {/* Avatar */}
                <UserAvatar name={u.fullName} avatarUrl={u.avatarUrl} size={36} />

                {/* Name + club */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link
                    href={`/profile/${u.userId}`}
                    style={{
                      fontSize: 14, fontWeight: 700,
                      color: isMe ? '#1a5c38' : '#1a1a1a',
                      textDecoration: 'none',
                      display: 'block',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}
                  >
                    {u.fullName}{isMe ? ' (you)' : ''}
                  </Link>
                  {u.homeClub && (
                    <div style={{
                      fontSize: 11, color: '#9ca3af', marginTop: 1,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {u.homeClub}
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#1a5c38', lineHeight: 1 }}>{u.courseCount}</div>
                      <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>courses</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#1a5c38', lineHeight: 1 }}>{u.countryCount}</div>
                      <div style={{ fontSize: 9, color: '#9ca3af', marginTop: 2 }}>countries</div>
                    </div>
                  </div>
                </div>

                {/* Add friend button (not on Friends tab) */}
                {tab !== 'friends' && (
                  <div style={{ flexShrink: 0, minWidth: 108, display: 'flex', justifyContent: 'flex-end' }}>
                    {!isMe && u.friendshipStatus === 'none' && (
                      <button
                        onClick={() => addFriend(u.userId)}
                        disabled={loadingUserIds.has(u.userId)}
                        style={{
                          background: '#1a5c38', color: '#fff', border: 'none',
                          borderRadius: 8, padding: '7px 14px',
                          fontSize: 12, fontWeight: 600,
                          cursor: loadingUserIds.has(u.userId) ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit', whiteSpace: 'nowrap',
                          opacity: loadingUserIds.has(u.userId) ? 0.6 : 1,
                        }}
                      >
                        + Add friend
                      </button>
                    )}
                    {!isMe && u.friendshipStatus === 'pending_sent' && (
                      <span style={{
                        background: '#f3f4f6', color: '#6b7280',
                        borderRadius: 8, padding: '7px 14px',
                        fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                      }}>
                        Request sent
                      </span>
                    )}
                    {!isMe && u.friendshipStatus === 'pending_received' && u.friendshipId && (
                      <button
                        onClick={() => acceptRequest(u.userId, u.friendshipId!)}
                        disabled={loadingUserIds.has(u.userId)}
                        style={{
                          background: '#1a5c38', color: '#fff', border: 'none',
                          borderRadius: 8, padding: '7px 14px',
                          fontSize: 12, fontWeight: 600,
                          cursor: loadingUserIds.has(u.userId) ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit', whiteSpace: 'nowrap',
                          opacity: loadingUserIds.has(u.userId) ? 0.6 : 1,
                        }}
                      >
                        Accept
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
