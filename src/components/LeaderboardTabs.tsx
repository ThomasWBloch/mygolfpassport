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

// ── Empty-state card — paper bg with stamp-uppercase prose ──────────────────
function EmptyCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--color-mgp-paper)',
      borderRadius: 12,
      border: '1px solid var(--color-mgp-border-faint)',
      padding: '24px 16px',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 11,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        color: 'var(--color-mgp-ink-3)',
        lineHeight: 1.6,
      }}>
        {children}
      </div>
    </div>
  )
}

// Inline link inside EmptyCard prose — gold stamp tone, underline-on-hover
function ProfileLink({ children }: { children: React.ReactNode }) {
  return (
    <Link
      href="/profile"
      style={{
        color: 'var(--color-mgp-cover)',
        fontWeight: 700,
        textDecoration: 'underline',
        textDecorationThickness: '0.5px',
        textUnderlineOffset: 3,
      }}
    >
      {children}
    </Link>
  )
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

  // Solo-self states: filtered contains only the current user. On Friends /
  // Country / Continent / Club tabs this means there's nobody to compete with,
  // so showing a "#1 🥇" badge is misleading. Replace the list with a
  // contextual onboarding card. World tab keeps solo-self (it's just early-DB
  // honesty, not a missing connection).
  const isSoloSelf =
    filtered.length === 1 && filtered[0]?.userId === currentUserId

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
        scrollbarWidth: 'none',
      }}>
        {TABS.map(t => {
          const active = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flexShrink: 0,
                padding: '7px 14px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: active ? 'var(--color-mgp-cover)' : 'var(--color-mgp-border-faint)',
                background: active ? 'var(--color-mgp-cover)' : 'var(--color-mgp-paper)',
                color: active ? 'var(--color-mgp-ink-inv)' : 'var(--color-mgp-ink-2)',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Empty states — shared Adventure card pattern */}
      {tab === 'club' && !hasHomeClub && (
        <EmptyCard>
          Set your home club in <ProfileLink>your profile</ProfileLink> to see club rankings.
        </EmptyCard>
      )}

      {tab === 'country' && !hasCountry && (
        <EmptyCard>
          Set your home club in <ProfileLink>your profile</ProfileLink> to see country rankings.
        </EmptyCard>
      )}

      {tab === 'continent' && !hasCountry && (
        <EmptyCard>
          Set your home club in <ProfileLink>your profile</ProfileLink> to see continent rankings.
        </EmptyCard>
      )}

      {filtered.length === 0 && (tab === 'friends' || ((tab === 'club' && hasHomeClub) || (tab === 'country' && hasCountry) || (tab === 'continent' && hasCountry) || tab === 'world')) && (
        <EmptyCard>No golfers found for this tab.</EmptyCard>
      )}

      {/* Solo-self onboarding — friends/country/continent/club only.
          Hides the misleading #1-medal solo-list, swaps in a CTA. */}
      {isSoloSelf && tab === 'friends' && (
        <EmptyCard>
          Add friends to see how your travel diary stacks up against theirs. Find players in{' '}
          <Link
            href="/friends"
            style={{
              color: 'var(--color-mgp-cover)',
              fontWeight: 700,
              textDecoration: 'underline',
              textDecorationThickness: '0.5px',
              textUnderlineOffset: 3,
            }}
          >
            Friends
          </Link>
          .
        </EmptyCard>
      )}

      {isSoloSelf && tab === 'country' && hasCountry && (
        <EmptyCard>
          You&rsquo;re the only player on file from your country so far. Invite a golfing friend to start a rivalry.
        </EmptyCard>
      )}

      {isSoloSelf && tab === 'continent' && hasCountry && (
        <EmptyCard>
          No other players on your continent yet. Early-beta perk: you&rsquo;ll start at the top.
        </EmptyCard>
      )}

      {isSoloSelf && tab === 'club' && hasHomeClub && (
        <EmptyCard>
          You&rsquo;re the only member of your home club here. Invite clubmates to climb the local table.
        </EmptyCard>
      )}

      {/* Your position banner — suppressed on solo-self for non-world tabs
          (the empty-card already explains the situation; #1 of 1 looks silly) */}
      {currentUserRank > 0 && filtered.length > 1 && !(isSoloSelf && tab !== 'world') && (
        <div style={{
          background: 'var(--color-mgp-cream-warm)',
          border: '1px solid var(--color-mgp-gold)',
          borderRadius: 12,
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-gold-dark)',
          }}>
            Your position
          </span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 20, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            letterSpacing: -0.3,
          }}>
            #{currentUserRank}
            <span style={{
              fontFamily: 'var(--font-mgp-stamp)',
              fontWeight: 700, fontSize: 10, letterSpacing: 1.5,
              color: 'var(--color-mgp-ink-3)',
              marginLeft: 6,
              textTransform: 'uppercase',
            }}>
              of {filtered.length}
            </span>
          </span>
        </div>
      )}

      {/* Leaderboard list — hidden on solo-self for non-world tabs (empty-card
          stands alone in those cases) */}
      {filtered.length > 0 && !(isSoloSelf && tab !== 'world') && (
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 14,
          border: '1px solid var(--color-mgp-border-faint)',
          overflow: 'hidden',
        }}>

          {/* Column headers — stamp-typography labels with sort indicator on
              the primary sort column (Courses DESC, Countries DESC tiebreak).
              Matches the row layout below for clean column alignment. */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            borderBottom: '1px solid var(--color-mgp-border-faint)',
            background: 'var(--color-mgp-cream-warm)',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 9,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-ink-3)',
            fontWeight: 700,
          }}>
            {/* Rank space */}
            <div style={{ width: 28, flexShrink: 0 }} />
            {/* Avatar space */}
            <div style={{ width: 36, flexShrink: 0 }} />
            {/* Player */}
            <div style={{ flex: 1, minWidth: 0 }}>Player</div>
            {/* Stats columns */}
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <div style={{ width: 44, textAlign: 'center' }}>
                Courses{' '}
                <span aria-hidden style={{ fontSize: 8, color: 'var(--color-mgp-ink-2)' }}>▼</span>
              </div>
              <div style={{ width: 44, textAlign: 'center' }}>Countries</div>
            </div>
            {/* Action button is on row 2 below; no header placeholder needed. */}
          </div>

          {filtered.map((u, i) => {
            const rank = i + 1
            const medal = getMedal(rank)
            const isMe = u.userId === currentUserId
            // Decide whether the row gets a 2nd line for the action button.
            // 'pending_received' without a friendshipId can't be acted on
            // (Accept requires the id), so we treat it as no-action and skip
            // the extra row rather than rendering an empty bottom strip.
            const hasAction =
              tab !== 'friends' && !isMe && (
                u.friendshipStatus === 'none' ||
                u.friendshipStatus === 'pending_sent' ||
                (u.friendshipStatus === 'pending_received' && !!u.friendshipId)
              )

            return (
              <div
                key={u.userId}
                style={{
                  padding: '12px 14px',
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: isMe ? 'var(--color-mgp-gold-faint)' : 'transparent',
                }}
              >
                {/* Top row — rank + avatar + name/club + stats. Action lives
                    on row 2 below so the name has room to wrap on narrow
                    viewports instead of ellipsing to "Peter B…". */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  {/* Rank */}
                  <div style={{
                    width: 28, textAlign: 'center', flexShrink: 0,
                    fontFamily: medal ? 'inherit' : 'var(--font-mgp-stamp)',
                    fontSize: medal ? 18 : 11,
                    fontWeight: 700,
                    letterSpacing: medal ? 0 : 1,
                    color: medal ? undefined : 'var(--color-mgp-ink-3)',
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
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 16, fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        letterSpacing: -0.2,
                        textDecoration: 'none',
                        // -webkit-box + line-clamp lets long names wrap to
                        // 2 lines and then ellipse, instead of truncating
                        // mid-word on a single line.
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        wordBreak: 'break-word',
                      }}
                    >
                      {u.fullName}
                      {isMe && (
                        <span style={{
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                          color: 'var(--color-mgp-gold-dark)',
                          textTransform: 'uppercase',
                          marginLeft: 6,
                        }}>
                          (you)
                        </span>
                      )}
                    </Link>
                    {u.homeClub && (
                      <div style={{
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 10, letterSpacing: 1.2,
                        color: 'var(--color-mgp-ink-3)',
                        marginTop: 2,
                        textTransform: 'uppercase',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {u.homeClub}
                      </div>
                    )}
                  </div>

                  {/* Stats — Cormorant numerals; column widths match header row */}
                  <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                    <div style={{ width: 44, textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 22, fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        lineHeight: 1, letterSpacing: -0.5,
                      }}>{u.courseCount}</div>
                    </div>
                    <div style={{ width: 44, textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'var(--font-mgp-display)',
                        fontSize: 22, fontWeight: 500,
                        color: 'var(--color-mgp-ink)',
                        lineHeight: 1, letterSpacing: -0.5,
                      }}>{u.countryCount}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom row — action button right-flushed. Rendered only
                    when there's actually something to render so rows that
                    don't need it stay single-line tall. */}
                {hasAction && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 8,
                  }}>
                    {u.friendshipStatus === 'none' && (
                      <button
                        onClick={() => addFriend(u.userId)}
                        disabled={loadingUserIds.has(u.userId)}
                        style={{
                          background: 'var(--color-mgp-cover)',
                          color: 'var(--color-mgp-ink-inv)',
                          border: 'none',
                          borderRadius: 6, padding: '6px 12px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          cursor: loadingUserIds.has(u.userId) ? 'not-allowed' : 'pointer',
                          whiteSpace: 'nowrap',
                          opacity: loadingUserIds.has(u.userId) ? 0.6 : 1,
                        }}
                      >
                        + Add friend
                      </button>
                    )}
                    {u.friendshipStatus === 'pending_sent' && (
                      <span style={{
                        background: 'var(--color-mgp-cream-warm)',
                        color: 'var(--color-mgp-ink-2)',
                        border: '1px solid var(--color-mgp-border-faint)',
                        borderRadius: 6, padding: '5px 12px',
                        fontFamily: 'var(--font-mgp-stamp)',
                        fontSize: 10, fontWeight: 700, letterSpacing: 1.2,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}>
                        Request sent
                      </span>
                    )}
                    {u.friendshipStatus === 'pending_received' && u.friendshipId && (
                      <button
                        onClick={() => acceptRequest(u.userId, u.friendshipId!)}
                        disabled={loadingUserIds.has(u.userId)}
                        style={{
                          background: 'var(--color-mgp-cover)',
                          color: 'var(--color-mgp-ink-inv)',
                          border: 'none',
                          borderRadius: 6, padding: '6px 12px',
                          fontFamily: 'var(--font-mgp-stamp)',
                          fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
                          textTransform: 'uppercase',
                          cursor: loadingUserIds.has(u.userId) ? 'not-allowed' : 'pointer',
                          whiteSpace: 'nowrap',
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
