'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export interface LeaderboardUser {
  userId: string
  fullName: string
  homeClub: string | null
  courseCount: number
  countryCount: number
  isFriend: boolean
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

function getLevel(courses: number): { label: string; color: string; bg: string } {
  if (courses >= 100) return { label: 'Platinum', color: '#4a5568', bg: '#e2e8f0' }
  if (courses >= 50)  return { label: 'Gold',     color: '#7a5a00', bg: '#f5e9c8' }
  if (courses >= 25)  return { label: 'Silver',   color: '#4a5568', bg: '#f1f1f1' }
  return                      { label: 'Explorer', color: '#1a5c38', bg: '#e8f5ee' }
}

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

export default function LeaderboardTabs({ users, currentUserId, hasHomeClub, hasCountry }: Props) {
  const [tab, setTab] = useState<Tab>('friends')

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
            const level = getLevel(u.courseCount)
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
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: getAvatarColor(u.fullName),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0,
                }}>
                  {initials}
                </div>

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
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a5c38', lineHeight: 1 }}>
                    {u.courseCount}
                  </div>
                  <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>
                    {u.courseCount === 1 ? 'course' : 'courses'} · {u.countryCount} {u.countryCount === 1 ? 'country' : 'countries'}
                  </div>
                  <div style={{
                    display: 'inline-block', marginTop: 3,
                    fontSize: 9, fontWeight: 700,
                    color: level.color, background: level.bg,
                    borderRadius: 6, padding: '2px 6px',
                  }}>
                    {level.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
