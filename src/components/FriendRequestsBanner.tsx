'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import UserAvatar from '@/components/UserAvatar'
import type { PendingRequest } from '@/components/FriendsPageClient'

/**
 * FriendRequestsBanner — surfaces the user's pending friend requests at
 * the top of /social?tab=friends and on the home page (/), where they're
 * impossible to miss vs the previous accordion-tucked-at-bottom UX.
 *
 * Visual contract:
 *   - One headline row showing the FIRST request (incoming preferred, then
 *     outgoing) with the appropriate action buttons inline.
 *   - If there are more than one, a "N more ›" link to /social?tab=friends
 *     where the full Pending Requests accordion in FriendsPageClient
 *     handles the rest.
 *   - Renders nothing when both incoming and outgoing are empty — no
 *     "0 pending requests" placeholder.
 *
 * Action buttons hit the same /api/friendships PATCH endpoint that
 * FriendsPageClient uses, so accept/decline/cancel behaviour stays
 * consistent across the banner and the in-page accordion.
 */

interface Props {
  incoming: PendingRequest[]
  outgoing: PendingRequest[]
}

export default function FriendRequestsBanner({ incoming, outgoing }: Props) {
  const router = useRouter()
  const [busyId, setBusyId] = useState<string | null>(null)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set())

  // Filter out anything we've optimistically removed this render cycle.
  const liveIncoming = incoming.filter((r) => !hiddenIds.has(r.friendshipId))
  const liveOutgoing = outgoing.filter((r) => !hiddenIds.has(r.friendshipId))

  const totalCount = liveIncoming.length + liveOutgoing.length
  if (totalCount === 0) return null

  // Headline request: prefer incoming (they need YOUR attention), then
  // fall back to outgoing if nothing's waiting on you.
  const headline: PendingRequest =
    liveIncoming[0] ?? liveOutgoing[0]

  const moreCount = totalCount - 1

  async function act(friendshipId: string, action: 'accept' | 'decline') {
    setBusyId(friendshipId)
    const res = await fetch('/api/friendships', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ friendshipId, action }),
    })
    setBusyId(null)
    if (!res.ok) return
    setHiddenIds((prev) => {
      const next = new Set(prev)
      next.add(friendshipId)
      return next
    })
    // Refresh so the underlying page re-fetches and stays in sync with
    // any other surface (Friends accordion, friend-count badges, etc.)
    router.refresh()
  }

  const isBusy = busyId === headline.friendshipId
  const isIncoming = headline.direction === 'incoming'

  return (
    <section
      style={{
        background: 'var(--color-mgp-gold-faint)',
        border: '1px solid var(--color-mgp-gold)',
        borderRadius: 14,
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      aria-label={isIncoming ? 'Incoming friend request' : 'Outgoing friend request'}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-gold-dark)',
          fontWeight: 700,
        }}
      >
        {isIncoming ? 'Friend request' : 'Awaiting reply'}
      </div>

      {/* Headline row: avatar + name + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link
          href={`/profile/${headline.userId}`}
          style={{ textDecoration: 'none', flexShrink: 0 }}
        >
          <UserAvatar
            name={headline.fullName}
            avatarUrl={null}
            size={40}
            border="1.5px solid var(--color-mgp-gold)"
          />
        </Link>

        <div style={{ flex: 1, minWidth: 0 }}>
          <Link
            href={`/profile/${headline.userId}`}
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
              lineHeight: 1.2,
              textDecoration: 'none',
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {headline.fullName}
          </Link>
          {headline.homeClub && (
            <div
              style={{
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                letterSpacing: 1.2,
                color: 'var(--color-mgp-ink-3)',
                marginTop: 2,
                textTransform: 'uppercase',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {headline.homeClub}
            </div>
          )}
        </div>

        {/* Action buttons — incoming gets Accept (primary) + Decline,
            outgoing gets Cancel only since they can't accept their own request. */}
        {isIncoming ? (
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => act(headline.friendshipId, 'accept')}
              disabled={isBusy}
              style={{
                background: 'var(--color-mgp-cover)',
                color: 'var(--color-mgp-ink-inv)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: isBusy ? 'not-allowed' : 'pointer',
                opacity: isBusy ? 0.5 : 1,
              }}
            >
              {isBusy ? '…' : 'Accept'}
            </button>
            <button
              type="button"
              onClick={() => act(headline.friendshipId, 'decline')}
              disabled={isBusy}
              style={{
                background: 'transparent',
                color: 'var(--color-mgp-ink-3)',
                border: '1px solid var(--color-mgp-border)',
                borderRadius: 8,
                padding: '8px 12px',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 10,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: isBusy ? 'not-allowed' : 'pointer',
                opacity: isBusy ? 0.5 : 1,
              }}
            >
              Decline
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => act(headline.friendshipId, 'decline')}
            disabled={isBusy}
            style={{
              background: 'transparent',
              color: 'var(--color-mgp-ink-3)',
              border: '1px solid var(--color-mgp-border)',
              borderRadius: 8,
              padding: '8px 12px',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: isBusy ? 'not-allowed' : 'pointer',
              opacity: isBusy ? 0.5 : 1,
              flexShrink: 0,
            }}
          >
            {isBusy ? '…' : 'Cancel'}
          </button>
        )}
      </div>

      {/* "N more ›" link — only if there's overflow. Lands on Friends
          subtab where the full Pending accordion is auto-expanded when
          requests exist. */}
      {moreCount > 0 && (
        <Link
          href="/social?tab=friends"
          style={{
            alignSelf: 'flex-end',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            color: 'var(--color-mgp-gold-dark)',
            textDecoration: 'none',
            fontWeight: 700,
          }}
        >
          {moreCount} more ›
        </Link>
      )}
    </section>
  )
}
