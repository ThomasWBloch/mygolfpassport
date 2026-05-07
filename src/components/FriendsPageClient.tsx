'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import UserAvatar from '@/components/UserAvatar'
import { SYSTEM_USER_ID } from '@/lib/constants'
import { normalizeSearch } from '@/lib/search'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FriendEntry {
  friendshipId: string
  userId: string
  fullName: string
  homeClub: string | null
  country: string | null
  handicap: number | null
  courseCount: number
  avatarUrl: string | null
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
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // Section open state — expand pending by default when there are action-items
  // (audit #13: action-items must not be hidden behind a click)
  const [friendsOpen, setFriendsOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)
  const [pendingOpen, setPendingOpen] = useState(initialPending.length > 0)

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

  // Confirm-before-destroy: which friend is queued for removal, if any.
  // Pattern mirrors the Delete-account modal in ProfileEditClient — removing
  // a friend is destructive (must re-send a request to reconnect) so we never
  // execute it on the bare button click.
  const [friendToRemove, setFriendToRemove] = useState<{ friendshipId: string; fullName: string } | null>(null)

  const setLoading = (id: string, loading: boolean) => {
    setLoadingActions(prev => {
      const next = new Set(prev)
      if (loading) next.add(id)
      else next.delete(id)
      return next
    })
  }

  // ── Search ─────────────────────────────────────────────────────────────────

  const doSearch = useCallback(async () => {
    const q = query.trim()
    if (q.length < 2) return
    const qNorm = normalizeSearch(q)
    setSearching(true)
    setSearchDone(false)

    // Search profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, home_club, handicap')
      .or(`full_name_normalized.ilike.%${qNorm}%,home_club_normalized.ilike.%${qNorm}%`)
      .neq('id', currentUserId)
      .neq('id', SYSTEM_USER_ID)
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
          friendshipId: '',
          userId: targetId,
          fullName: target.fullName,
          homeClub: target.homeClub,
          direction: 'outgoing',
        }])
      }
      // Notify the target user via system message
      try {
        await fetch('/api/friend-request-notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetUserId: targetId }),
        })
      } catch {
        // Don't block UI if notification fails
      }
    }
    setLoading(targetId, false)
  }

  async function friendshipAction(friendshipId: string, action: string) {
    const res = await fetch('/api/friendships', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendshipId, action }),
    })
    return res.ok
  }

  async function acceptRequest(friendshipId: string) {
    setLoading(friendshipId, true)
    const ok = await friendshipAction(friendshipId, 'accept')
    if (ok) {
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
          avatarUrl: null,
        }])
      }
    }
    setLoading(friendshipId, false)
  }

  async function declineOrCancel(friendshipId: string) {
    setLoading(friendshipId, true)
    await friendshipAction(friendshipId, 'decline')
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
      router.push(`/messages/${data.conversationId}`)
    }
  }

  async function confirmRemoveFriend() {
    if (!friendToRemove) return
    const { friendshipId } = friendToRemove
    setFriendToRemove(null)
    setLoading(friendshipId, true)
    await friendshipAction(friendshipId, 'remove')
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
      <section style={{
        background: 'var(--color-mgp-paper)',
        borderRadius: 14,
        border: '1px solid var(--color-mgp-border-faint)',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setFriendsOpen(!friendsOpen)}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>👥</span>
            <span style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
            }}>Your Friends</span>
            <span style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10,
              letterSpacing: 1.5,
              fontWeight: 700,
              color: 'var(--color-mgp-ink-2)',
              background: 'var(--color-mgp-cream-warm)',
              border: '1px solid var(--color-mgp-border-faint)',
              borderRadius: 4,
              padding: '2px 8px',
            }}>
              {friends.length}
            </span>
          </div>
          <span style={{
            fontSize: 11,
            color: 'var(--color-mgp-ink-3)',
            display: 'inline-block',
            transform: friendsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}>▾</span>
        </button>

        {friendsOpen && (
          <div style={{ borderTop: '1px solid var(--color-mgp-border-faint)' }}>
            {friends.length === 0 ? (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>👥</div>
                <div style={{
                  fontFamily: 'var(--font-mgp-display)',
                  fontSize: 16, fontWeight: 500,
                  color: 'var(--color-mgp-ink)',
                  letterSpacing: -0.2,
                  marginBottom: 6,
                }}>
                  No friends yet
                </div>
                <div style={{
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: 'var(--color-mgp-ink-3)',
                }}>
                  Find players below to add friends
                </div>
              </div>
            ) : (
              friends.map((f, i) => (
                <div
                  key={f.friendshipId}
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < friends.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <UserAvatar name={f.fullName} avatarUrl={f.avatarUrl} />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link
                      href={`/profile/${f.userId}`}
                      style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 16, fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        textDecoration: 'none',
                        letterSpacing: -0.2,
                        display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}
                    >
                      {f.fullName}
                    </Link>
                    <div style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 10, letterSpacing: 1.2,
                      color: 'var(--color-mgp-ink-3)',
                      marginTop: 3, textTransform: 'uppercase',
                      display: 'flex', gap: 6, flexWrap: 'wrap',
                    }}>
                      {f.homeClub && <span>{f.homeClub}</span>}
                      {f.country && <span>{f.homeClub ? '·' : ''} {f.country}</span>}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontFamily: 'var(--font-mgp-stamp)',
                      fontSize: 9, letterSpacing: 1.2,
                      color: 'var(--color-mgp-ink-3)',
                      textTransform: 'uppercase',
                    }}>
                      {f.courseCount} {f.courseCount === 1 ? 'course' : 'courses'}
                      {f.handicap != null && (
                        <span style={{ color: 'var(--color-mgp-gold-dark)', fontWeight: 700 }}> · HCP {f.handicap}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 6, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => startConversation(f.userId)}
                        disabled={loadingActions.has(`msg_${f.userId}`)}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--color-mgp-border)',
                          borderRadius: 6,
                          padding: '4px 10px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: 'var(--color-mgp-ink-2)',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          opacity: loadingActions.has(`msg_${f.userId}`) ? 0.5 : 1,
                        }}
                      >
                        Message
                      </button>
                      <button
                        onClick={() => setFriendToRemove({ friendshipId: f.friendshipId, fullName: f.fullName })}
                        disabled={loadingActions.has(f.friendshipId)}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--color-mgp-border-faint)',
                          borderRadius: 6,
                          padding: '4px 10px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: 'var(--color-mgp-danger)',
                          textTransform: 'uppercase',
                          cursor: loadingActions.has(f.friendshipId) ? 'not-allowed' : 'pointer',
                          opacity: loadingActions.has(f.friendshipId) ? 0.5 : 1,
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
      </section>

      {/* ── Section 2: Find Players ─────────────────────────────────────────── */}
      <section style={{
        background: 'var(--color-mgp-paper)',
        borderRadius: 14,
        border: '1px solid var(--color-mgp-border-faint)',
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <span style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
            }}>Find Players</span>
          </div>
          <span style={{
            fontSize: 11,
            color: 'var(--color-mgp-ink-3)',
            display: 'inline-block',
            transform: searchOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}>▾</span>
        </button>

        {searchOpen && (
          <div style={{ borderTop: '1px solid var(--color-mgp-border-faint)', padding: '12px 16px' }}>
            {/* Search input */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <span style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 14, pointerEvents: 'none', color: 'var(--color-mgp-ink-3)',
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
                    border: '1px solid var(--color-mgp-border-faint)',
                    borderRadius: 10,
                    fontSize: 14,
                    color: 'var(--color-mgp-ink)',
                    background: 'var(--color-mgp-cream-warm)',
                    fontFamily: 'var(--font-mgp-body)',
                    outline: 'none',
                  }}
                />
              </div>
              <button
                onClick={doSearch}
                disabled={searching || query.trim().length < 2}
                style={{
                  background: 'var(--color-mgp-cover)',
                  color: 'var(--color-mgp-ink-inv)',
                  border: 'none',
                  borderRadius: 10, padding: '0 18px',
                  fontFamily: 'var(--font-mgp-stamp)',
                  fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  cursor: searching ? 'not-allowed' : 'pointer',
                  flexShrink: 0,
                  opacity: searching || query.trim().length < 2 ? 0.5 : 1,
                }}
              >
                {searching ? 'Searching…' : 'Search'}
              </button>
            </div>

            {/* Results */}
            {searchDone && searchResults.length === 0 && (
              <div style={{
                padding: '20px 0', textAlign: 'center',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11, letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
              }}>
                No players found for &ldquo;{query}&rdquo;
              </div>
            )}

            {searchResults.length > 0 && (
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column' }}>
                {searchResults.map((r, i) => (
                  <div
                    key={r.userId}
                    style={{
                      padding: '12px 0',
                      borderBottom: i < searchResults.length - 1
                        ? '1px solid var(--color-mgp-border-faint)'
                        : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <UserAvatar name={r.fullName} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${r.userId}`}
                        style={{
                          fontFamily: 'var(--font-mgp-display)',
                          fontSize: 16, fontWeight: 500,
                          color: 'var(--color-mgp-ink)',
                          textDecoration: 'none',
                          letterSpacing: -0.2,
                          display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}
                      >
                        {r.fullName}
                      </Link>
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 10, letterSpacing: 1.2,
                        color: 'var(--color-mgp-ink-3)',
                        marginTop: 3,
                        textTransform: 'uppercase',
                      }}>
                        {r.homeClub ?? 'No club'}
                        {' · '}{r.courseCount} {r.courseCount === 1 ? 'course' : 'courses'}
                        {' · '}{r.countryCount} {r.countryCount === 1 ? 'country' : 'countries'}
                        {r.handicap != null && (
                          <span style={{ color: 'var(--color-mgp-gold-dark)', fontWeight: 700 }}> · HCP {r.handicap}</span>
                        )}
                      </div>
                    </div>

                    <div style={{ flexShrink: 0 }}>
                      {r.status === 'friends' && (
                        <span style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: 'var(--color-mgp-cover)',
                          background: 'var(--color-mgp-cream-warm)',
                          border: '1px solid var(--color-mgp-border)',
                          borderRadius: 4, padding: '4px 10px',
                          textTransform: 'uppercase',
                        }}>
                          Friends ✓
                        </span>
                      )}
                      {r.status === 'pending_sent' && (
                        <span style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: 'var(--color-mgp-ink-2)',
                          background: 'var(--color-mgp-cream-warm)',
                          border: '1px solid var(--color-mgp-border-faint)',
                          borderRadius: 4, padding: '4px 10px',
                          textTransform: 'uppercase',
                        }}>
                          Request sent ✓
                        </span>
                      )}
                      {r.status === 'pending_received' && (
                        <span style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                          color: 'var(--color-mgp-gold-dark)',
                          background: 'var(--color-mgp-gold-faint)',
                          border: '1px solid var(--color-mgp-gold)',
                          borderRadius: 4, padding: '4px 10px',
                          textTransform: 'uppercase',
                        }}>
                          Pending
                        </span>
                      )}
                      {r.status === 'none' && (
                        <button
                          onClick={() => addFriend(r.userId)}
                          disabled={loadingActions.has(r.userId)}
                          style={{
                            background: 'var(--color-mgp-cover)',
                            color: 'var(--color-mgp-ink-inv)',
                            border: 'none',
                            borderRadius: 6, padding: '5px 12px',
                            fontFamily: 'var(--font-mgp-stamp)',
                            fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            opacity: loadingActions.has(r.userId) ? 0.6 : 1,
                          }}
                        >
                          {loadingActions.has(r.userId) ? 'Adding…' : '+ Add friend'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Section 3: Pending Requests ──────────────────────────────────────── */}
      <section style={{
        background: 'var(--color-mgp-paper)',
        borderRadius: 14,
        border: `1px solid ${totalPending > 0 ? 'var(--color-mgp-gold)' : 'var(--color-mgp-border-faint)'}`,
        overflow: 'hidden',
      }}>
        <button
          onClick={() => setPendingOpen(!pendingOpen)}
          style={{
            width: '100%', background: 'transparent', border: 'none',
            padding: '14px 16px', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 16 }}>📬</span>
            <span style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 17, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
            }}>Pending Requests</span>
            {totalPending > 0 && (
              <span style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                letterSpacing: 1.5,
                fontWeight: 700,
                color: 'var(--color-mgp-gold-dark)',
                background: 'var(--color-mgp-gold-faint)',
                border: '1px solid var(--color-mgp-gold)',
                borderRadius: 4,
                padding: '2px 8px',
              }}>
                {totalPending}
              </span>
            )}
          </div>
          <span style={{
            fontSize: 11,
            color: 'var(--color-mgp-ink-3)',
            display: 'inline-block',
            transform: pendingOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}>▾</span>
        </button>

        {pendingOpen && (
          <div style={{ borderTop: '1px solid var(--color-mgp-border-faint)' }}>
            {pendingList.length === 0 ? (
              <div style={{
                padding: '20px 16px', textAlign: 'center',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11, letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: 'var(--color-mgp-ink-3)',
              }}>
                No pending requests
              </div>
            ) : (
              <>
                {/* Incoming */}
                {incomingCount > 0 && (
                  <div style={{
                    padding: '10px 16px 6px',
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 9, fontWeight: 700,
                    color: 'var(--color-mgp-ink-3)',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  }}>
                    Incoming
                  </div>
                )}
                {pendingList.filter(p => p.direction === 'incoming').map((p, i, arr) => (
                  <div
                    key={p.friendshipId}
                    style={{
                      padding: '12px 16px',
                      borderBottom: i < arr.length - 1 || outgoingCount > 0
                        ? '1px solid var(--color-mgp-border-faint)'
                        : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <UserAvatar name={p.fullName} size={32} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${p.userId}`}
                        style={{
                          fontFamily: 'var(--font-mgp-display)',
                          fontSize: 15, fontWeight: 500,
                          color: 'var(--color-mgp-ink)',
                          textDecoration: 'none',
                          letterSpacing: -0.2,
                        }}
                      >
                        {p.fullName}
                      </Link>
                      {p.homeClub && (
                        <div style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, letterSpacing: 1.2,
                          color: 'var(--color-mgp-ink-3)',
                          marginTop: 2,
                          textTransform: 'uppercase',
                        }}>{p.homeClub}</div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <button
                        onClick={() => acceptRequest(p.friendshipId)}
                        disabled={loadingActions.has(p.friendshipId)}
                        style={{
                          background: 'var(--color-mgp-cover)',
                          color: 'var(--color-mgp-ink-inv)',
                          border: 'none',
                          borderRadius: 6, padding: '5px 12px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          opacity: loadingActions.has(p.friendshipId) ? 0.6 : 1,
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineOrCancel(p.friendshipId)}
                        disabled={loadingActions.has(p.friendshipId)}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--color-mgp-border)',
                          borderRadius: 6, padding: '5px 10px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                          color: 'var(--color-mgp-ink-2)',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
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
                  <div style={{
                    padding: '10px 16px 6px',
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 9, fontWeight: 700,
                    color: 'var(--color-mgp-ink-3)',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  }}>
                    Sent
                  </div>
                )}
                {pendingList.filter(p => p.direction === 'outgoing').map((p, i, arr) => (
                  <div
                    key={p.friendshipId}
                    style={{
                      padding: '12px 16px',
                      borderBottom: i < arr.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}
                  >
                    <UserAvatar name={p.fullName} size={32} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Link
                        href={`/profile/${p.userId}`}
                        style={{
                          fontFamily: 'var(--font-mgp-display)',
                          fontSize: 15, fontWeight: 500,
                          color: 'var(--color-mgp-ink)',
                          textDecoration: 'none',
                          letterSpacing: -0.2,
                        }}
                      >
                        {p.fullName}
                      </Link>
                      {p.homeClub && (
                        <div style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 10, letterSpacing: 1.2,
                          color: 'var(--color-mgp-ink-3)',
                          marginTop: 2,
                          textTransform: 'uppercase',
                        }}>{p.homeClub}</div>
                      )}
                    </div>
                    <button
                      onClick={() => declineOrCancel(p.friendshipId)}
                      disabled={loadingActions.has(p.friendshipId)}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--color-mgp-border-faint)',
                        borderRadius: 6, padding: '5px 10px',
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                        color: 'var(--color-mgp-danger)',
                        textTransform: 'uppercase',
                        cursor: 'pointer', flexShrink: 0,
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
      </section>

      {/* ── Remove-friend confirm overlay ─────────────────────────────────────
          Mirrors the Delete-account modal in ProfileEditClient. Removing a
          friend is destructive (must re-send a request to reconnect) so we
          never execute it on the bare button click. */}
      {friendToRemove && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,37,25,0.55)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          zIndex: 9999, padding: 16,
        }}>
          <div style={{
            background: 'var(--color-mgp-paper)',
            borderRadius: 20, padding: 24, width: '100%', maxWidth: 440,
            display: 'flex', flexDirection: 'column', gap: 14,
            border: '1px solid var(--color-mgp-border)',
          }}>
            <div style={{ fontSize: 22, textAlign: 'center' }}>👥</div>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 22, fontWeight: 500,
              color: 'var(--color-mgp-ink)', textAlign: 'center',
              letterSpacing: -0.3,
              lineHeight: 1.2,
            }}>
              Remove {friendToRemove.fullName}?
            </div>
            <div style={{
              fontSize: 13,
              color: 'var(--color-mgp-ink-2)',
              textAlign: 'center', lineHeight: 1.6,
            }}>
              You&rsquo;ll need to send a new friend request if you want to reconnect.
            </div>
            <button
              onClick={confirmRemoveFriend}
              style={{
                background: 'var(--color-mgp-danger)',
                color: 'var(--color-mgp-ink-inv)',
                border: 'none', borderRadius: 12, padding: 14,
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 13, letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Yes, remove friend
            </button>
            <button
              onClick={() => setFriendToRemove(null)}
              style={{
                background: 'var(--color-mgp-cream-warm)',
                color: 'var(--color-mgp-ink)',
                border: '1px solid var(--color-mgp-border)',
                borderRadius: 12, padding: 14,
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
