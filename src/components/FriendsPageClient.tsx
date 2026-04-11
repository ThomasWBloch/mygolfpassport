'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FriendEntry {
  friendshipId: string
  userId: string
  fullName: string
  homeClub: string | null
  country: string | null
  handicap: number | null
  courseCount: number
}

export interface PendingRequest {
  friendshipId: string
  userId: string
  fullName: string
  homeClub: string | null
  direction: 'incoming' | 'outgoing'
}

interface Props {
  currentUserId: string
  friends: FriendEntry[]
  pending: PendingRequest[]
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getAvatarColor(name: string): string {
  const colors = ['#1a5c38', '#c9a84c', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#be185d', '#059669']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: getAvatarColor(name),
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.33, fontWeight: 700, flexShrink: 0,
    }}>
      {getInitials(name)}
    </div>
  )
}

// ── Search result type ───────────────────────────────────────────────────────

interface SearchResult {
  userId: string
  fullName: string
  homeClub: string | null
  handicap: number | null
  courseCount: number
  countryCount: number
  status: 'none' | 'friends' | 'pending_sent' | 'pending_received'
}

// ── Main component ───────────────────────────────────────────────────────────

export default function FriendsPageClient({ currentUserId, friends: initialFriends, pending: initialPending }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Section open state
  const [friendsOpen, setFriendsOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState(false)

  // Data state
  const [friends, setFriends] = useState(initialFriends)
  const [pendingList, setPendingList] = useState(initialPending)

  // Search state
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState(false)
  const [searchDone, setSearchDone] = useState(false)

  // Action loading states
  const [loadingActions, setLoadingActions] = useState<Set<string>>(new Set())

  const setLoading = (id: string, loading: boolean) => {
    setLoadingActions(prev => {
      const next = new Set(prev)
      loading ? next.add(id) : next.delete(id)
      return next
    })
  }

  // ── Search ─────────────────────────────────────────────────────────────────

  const doSearch = useCallback(async () => {
    const q = query.trim()
    if (q.length < 2) return
    setSearching(true)
    setSearchDone(false)

    // Search profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, home_club, handicap')
      .or(`full_name.ilike.%${q}%,home_club.ilike.%${q}%`)
      .neq('id', currentUserId)
      .limit(20)

    if (!profiles || profiles.length === 0) {
      setSearchResults([])
      setSearching(false)
      setSearchDone(true)
      return
    }

    const profileIds = profiles.map(p => p.id as string)

    // Get round counts and friendships for results
    const [roundsRes, friendshipsRes] = await Promise.all([
      supabase.from('rounds').select('user_id, course_id, courses(country)').in('user_id', profileIds),
      supabase
        .from('friendships')
        .select('id, user_id, friend_id, status')
        .or(
          profileIds.map(pid =>
            `and(user_id.eq.${currentUserId},friend_id.eq.${pid}),and(user_id.eq.${pid},friend_id.eq.${currentUserId})`
          ).join(',')
        ),
    ])

    const rounds = roundsRes.data ?? []
    const friendships = friendshipsRes.data ?? []

    const results: SearchResult[] = profiles.map(p => {
      const uid = p.id as string
      const userRounds = rounds.filter(r => r.user_id === uid)
      const courseCount = new Set(userRounds.map(r => r.course_id)).size
      const countryCount = new Set(
        userRounds.map(r => (r.courses as unknown as { country: string } | null)?.country).filter(Boolean)
      ).size

      // Determine friendship status
      const fs = friendships.find(
        f => (f.user_id === currentUserId && f.friend_id === uid) ||
             (f.user_id === uid && f.friend_id === currentUserId)
      )
      let status: SearchResult['status'] = 'none'
      if (fs) {
        if (fs.status === 'accepted') status = 'friends'
        else if (fs.user_id === currentUserId) status = 'pending_sent'
        else status = 'pending_received'
      }

      return {
        userId: uid,
        fullName: (p.full_name as string) ?? 'Golfer',
        homeClub: p.home_club as string | null,
        handicap: p.handicap as number | null,
        courseCount,
        countryCount,
        status,
      }
    })

    setSearchResults(results)
    setSearching(false)
    setSearchDone(true)
  }, [query, currentUserId, supabase])

  // ── Friend actions ─────────────────────────────────────────────────────────

  async function addFriend(targetId: string) {
    setLoading(targetId, true)
    const { error } = await supabase
      .from('friendships')
      .insert({ user_id: currentUserId, friend_id: targetId, status: 'pending' })

    if (!error) {
      setSearchResults(prev =>
        prev.map(r => r.userId === targetId ? { ...r, status: 'pending_sent' as const } : r)
      )
      // Also add to pending list
      const target = searchResults.find(r => r.userId === targetId)
      if (target) {
        setPendingList(prev => [...prev, {
          friendshipId: '', // We don't have the ID but it's fine for display
          userId: targetId,
          fullName: target.fullName,
          homeClub: target.homeClub,
          direction: 'outgoing',
        }])
      }
    }
    setLoading(targetId, false)
  }

  async function acceptRequest(friendshipId: string, userId: string) {
    setLoading(friendshipId, true)
    const { error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId)

    if (!error) {
      const req = pendingList.find(p => p.friendshipId === friendshipId)
      setPendingList(prev => prev.filter(p => p.friendshipId !== friendshipId))
      if (req) {
        setFriends(prev => [...prev, {
          friendshipId,
          userId: req.userId,
          fullName: req.fullName,
          homeClub: req.homeClub,
          country: null,
          handicap: null,
          courseCount: 0,
        }])
      }
    }
    setLoading(friendshipId, false)
  }

  async function declineOrCancel(friendshipId: string) {
    setLoading(friendshipId, true)
    await supabase.from('friendships').delete().eq('id', friendshipId)
    setPendingList(prev => prev.filter(p => p.friendshipId !== friendshipId))
    setLoading(friendshipId, false)
  }

  async function startConversation(targetId: string) {
    setLoading(`msg_${targetId}`, true)
    const res = await fetch('/api/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ otherUserId: targetId }),
    })
    const data = await res.json()
    setLoading(`msg_${targetId}`, false)
    if (data.conversationId) {
      window.location.href = `/messages/${data.conversationId}`
    }
  }

  async function removeFriend(friendshipId: string) {
    setLoading(friendshipId, true)
    await supabase.from('friendships').delete().eq('id', friendshipId)
    setFriends(prev => prev.filter(f => f.friendshipId !== friendshipId))
    setLoading(friendshipId, false)
  }

  // ── Counts ─────────────────────────────────────────────────────────────────

  const incomingCount = pendingList.filter(p => p.direction === 'incoming').length
  const outgoingCount = pendingList.filter(p => p.direction === 'outgoing').length
  const totalPending = pendingList.length

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

      {/* ── Section 1: Your Friends ─────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <button
          onClick={() => setFriendsOpen(!friendsOpen)}
          style={{
            width: '100%', background: 'none', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>👥</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>Your Friends</span>
            <span style={{
              background: '#1a5c38', color: '#fff', borderRadius: 10,
              fontSize: 11, fontWeight: 700, padding: '2px 8px',
            }}>
              {friends.length}
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{friendsOpen ? '▲' : '▼'}</span>
        </button>

        {friendsOpen && (
          <div style={{ borderTop: '1px solid #f3f4f6' }}>
            {friends.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>
                  No friends yet
                </div>
                <div style={{ fontSize: 13, color: '#9ca3af' }}>
                  Find players below to add friends
                </div>
              </div>
            ) : (
              friends.map((f, i) => (
                <div
                  key={f.friendshipId}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < friends.length - 1 ? '1px solid #f3f4f6' : 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <Avatar name={f.fullName} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/profile/${f.userId}`}
                      style={{
                        fontSize: 14, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none',
                        display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                    >
                      {f.fullName}
                    </Link>
                    <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {f.homeClub && <span>{f.homeClub}</span>}
                      {f.country && <span>{f.homeClub ? '·' : ''} {f.country}</span>}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 11, color: '#6b7280' }}>
                      {f.courseCount} {f.courseCount === 1 ? 'course' : 'courses'}
                      {f.handicap != null && (
                        <span style={{ color: '#c9a84c', fontWeight: 700 }}> · HCP {f.handicap}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => startConversation(f.userId)}
                        disabled={loadingActions.has(`msg_${f.userId}`)}
                        style={{
                          background: 'none', border: '1px solid #e5e7eb', borderRadius: 8,
                          padding: '4px 10px', fontSize: 11, fontWeight: 600, color: '#6b7280',
                          cursor: 'pointer', fontFamily: 'inherit',
                          opacity: loadingActions.has(`msg_${f.userId}`) ? 0.5 : 1,
                        }}
                      >
                        Message
                      </button>
                      <button
                        onClick={() => removeFriend(f.friendshipId)}
                        disabled={loadingActions.has(f.friendshipId)}
                        style={{
                          background: 'none', border: '1px solid #fecaca', borderRadius: 8,
                          padding: '4px 10px', fontSize: 11, fontWeight: 600, color: '#dc2626',
                          cursor: loadingActions.has(f.friendshipId) ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit', opacity: loadingActions.has(f.friendshipId) ? 0.5 : 1,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Section 2: Find Players ─────────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          style={{
            width: '100%', background: 'none', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>Find Players</span>
          </div>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{searchOpen ? '▲' : '▼'}</span>
        </button>

        {searchOpen && (
          <div style={{ borderTop: '1px solid #f3f4f6', padding: '12px 16px' }}>
            {/* Search input */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 14, pointerEvents: 'none', color: '#9ca3af',
                }}>🔍</span>
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && doSearch()}
                  placeholder="Search by name or club…"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '10px 12px 10px 36px',
                    border: '1px solid #e5e7eb', borderRadius: 10,
                    fontSize: 14, color: '#1a1a1a', background: '#fafafa',
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
              <button
                onClick={doSearch}
                disabled={searching || query.trim().length < 2}
                style={{
                  background: '#1a5c38', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '0 16px',
                  fontSize: 13, fontWeight: 700, cursor: searching ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', flexShrink: 0,
                  opacity: searching || query.trim().length < 2 ? 0.6 : 1,
                }}
              >
                {searching ? 'Searching…' : 'Search'}
              </button>
            </div>

            {/* Results */}
            {searchDone && searchResults.length === 0 && (
              <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
                No players found for &ldquo;{query}&rdquo;
              </div>
            )}

            {searchResults.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {searchResults.map((r, i) => (
                  <div
                    key={r.userId}
                    style={{
                      padding: '12px 0',
                      borderBottom: i < searchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <Avatar name={r.fullName} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${r.userId}`}
                        style={{
                          fontSize: 14, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none',
                          display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                      >
                        {r.fullName}
                      </Link>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>
                        {r.homeClub ?? 'No club'}
                        {' · '}{r.courseCount} {r.courseCount === 1 ? 'course' : 'courses'}
                        {' · '}{r.countryCount} {r.countryCount === 1 ? 'country' : 'countries'}
                        {r.handicap != null && (
                          <span style={{ color: '#c9a84c', fontWeight: 700 }}> · HCP {r.handicap}</span>
                        )}
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      {r.status === 'friends' && (
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: '#1a5c38',
                          background: '#e8f5ee', borderRadius: 8, padding: '5px 10px',
                        }}>
                          Friends ✓
                        </span>
                      )}
                      {r.status === 'pending_sent' && (
                        <span style={{
                          fontSize: 11, fontWeight: 600, color: '#6b7280',
                          background: '#f3f4f6', borderRadius: 8, padding: '5px 10px',
                        }}>
                          Request sent ✓
                        </span>
                      )}
                      {r.status === 'pending_received' && (
                        <span style={{
                          fontSize: 11, fontWeight: 600, color: '#c9a84c',
                          background: '#f5e9c8', borderRadius: 8, padding: '5px 10px',
                        }}>
                          Pending
                        </span>
                      )}
                      {r.status === 'none' && (
                        <button
                          onClick={() => addFriend(r.userId)}
                          disabled={loadingActions.has(r.userId)}
                          style={{
                            background: '#1a5c38', color: '#fff', border: 'none',
                            borderRadius: 8, padding: '5px 12px',
                            fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            fontFamily: 'inherit',
                            opacity: loadingActions.has(r.userId) ? 0.6 : 1,
                          }}
                        >
                          {loadingActions.has(r.userId) ? 'Adding…' : 'Add friend'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Section 3: Pending Requests ──────────────────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${totalPending > 0 ? '#c9a84c' : '#e5e7eb'}`, overflow: 'hidden' }}>
        <button
          onClick={() => setPendingOpen(!pendingOpen)}
          style={{
            width: '100%', background: 'none', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>📬</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>Pending Requests</span>
            {totalPending > 0 && (
              <span style={{
                background: '#c9a84c', color: '#fff', borderRadius: 10,
                fontSize: 11, fontWeight: 700, padding: '2px 8px',
              }}>
                {totalPending}
              </span>
            )}
          </div>
          <span style={{ fontSize: 12, color: '#6b7280' }}>{pendingOpen ? '▲' : '▼'}</span>
        </button>

        {pendingOpen && (
          <div style={{ borderTop: '1px solid #f3f4f6' }}>
            {pendingList.length === 0 ? (
              <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: 13, color: '#9ca3af' }}>
                No pending requests
              </div>
            ) : (
              <>
                {/* Incoming */}
                {incomingCount > 0 && (
                  <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Incoming
                  </div>
                )}
                {pendingList.filter(p => p.direction === 'incoming').map((p, i, arr) => (
                  <div
                    key={p.friendshipId}
                    style={{
                      padding: '12px 16px',
                      borderBottom: i < arr.length - 1 || outgoingCount > 0 ? '1px solid #f3f4f6' : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <Avatar name={p.fullName} size={32} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${p.userId}`}
                        style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}
                      >
                        {p.fullName}
                      </Link>
                      {p.homeClub && (
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{p.homeClub}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={() => acceptRequest(p.friendshipId, p.userId)}
                        disabled={loadingActions.has(p.friendshipId)}
                        style={{
                          background: '#1a5c38', color: '#fff', border: 'none',
                          borderRadius: 8, padding: '5px 12px',
                          fontSize: 11, fontWeight: 700, cursor: 'pointer',
                          fontFamily: 'inherit',
                          opacity: loadingActions.has(p.friendshipId) ? 0.6 : 1,
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineOrCancel(p.friendshipId)}
                        disabled={loadingActions.has(p.friendshipId)}
                        style={{
                          background: 'none', border: '1px solid #e5e7eb',
                          borderRadius: 8, padding: '5px 10px',
                          fontSize: 11, fontWeight: 600, color: '#6b7280',
                          cursor: 'pointer', fontFamily: 'inherit',
                          opacity: loadingActions.has(p.friendshipId) ? 0.6 : 1,
                        }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}

                {/* Outgoing */}
                {outgoingCount > 0 && (
                  <div style={{ padding: '8px 16px 4px', fontSize: 11, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                    Sent
                  </div>
                )}
                {pendingList.filter(p => p.direction === 'outgoing').map((p, i, arr) => (
                  <div
                    key={p.friendshipId}
                    style={{
                      padding: '12px 16px',
                      borderBottom: i < arr.length - 1 ? '1px solid #f3f4f6' : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <Avatar name={p.fullName} size={32} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${p.userId}`}
                        style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textDecoration: 'none' }}
                      >
                        {p.fullName}
                      </Link>
                      {p.homeClub && (
                        <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{p.homeClub}</div>
                      )}
                    </div>
                    <button
                      onClick={() => declineOrCancel(p.friendshipId)}
                      disabled={loadingActions.has(p.friendshipId)}
                      style={{
                        background: 'none', border: '1px solid #fecaca',
                        borderRadius: 8, padding: '5px 10px',
                        fontSize: 11, fontWeight: 600, color: '#dc2626',
                        cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                        opacity: loadingActions.has(p.friendshipId) ? 0.6 : 1,
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
