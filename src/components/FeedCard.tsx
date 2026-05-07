import Link from 'next/link'
import UserAvatar from '@/components/UserAvatar'
import WaxSealBadge from '@/components/WaxSealBadge'
import type {
  FeedItem,
  FeedRoundItem,
  FeedBadgeItem,
  FeedFriendshipItem,
} from '@/lib/feed'
import { relativeTimestamp, playedAtLabel } from '@/lib/feed'
import { isGenericCourseName } from '@/lib/course-display'

/**
 * FeedCard — renders one feed item using the Adventure design tokens.
 *
 * Three variants:
 *  - round       → "Lars stamped Royal Copenhagen ★★★★ · 🇩🇰"
 *                  (or "stamped at Pebble Beach" when course-name is a generic
 *                  placeholder like "18-hole course" — common for USA imports)
 *  - badge       → "Anna earned Continental Drifter (5 countries)"
 *  - friendship  → "Your friend, Mads just connected with Peter Jensen"
 */

const CARD_BASE_STYLE: React.CSSProperties = {
  background: 'var(--color-mgp-paper)',
  border: '0.5px solid var(--color-mgp-border)',
  borderRadius: 8,
  padding: 14,
}

const STAMP_LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-mgp-stamp)',
  fontSize: 10,
  letterSpacing: 1,
  textTransform: 'uppercase',
  color: 'var(--color-mgp-ink-3)',
}

export default function FeedCard({ item }: { item: FeedItem }) {
  switch (item.type) {
    case 'round':      return <RoundCard item={item} />
    case 'badge':      return <BadgeCard item={item} />
    case 'friendship': return <FriendshipCard item={item} />
  }
}

// ── Round card ──────────────────────────────────────────────────────────────

function RoundCard({ item }: { item: FeedRoundItem }) {
  const stars = item.rating != null ? '★'.repeat(item.rating) + '☆'.repeat(Math.max(0, 5 - item.rating)) : null
  const playedYear = item.playedAt ? new Date(item.playedAt).getFullYear() : null
  // Prefer played_at as the primary date label so two rounds on the same
  // course played a year apart don't collapse to "2 WEEKS AGO" just because
  // they were logged in the same session. Fall back to created-at if missing.
  const dateLabel = playedAtLabel(item.playedAt) ?? relativeTimestamp(item.timestamp)

  // Decide the verbal frame based on whether the course-name is meaningful.
  //   generic course (e.g. "18-hole course") → "stamped at <Club>"
  //   meaningful course == club              → "stamped <Club>"
  //   meaningful course != club              → "stamped <Course> at <Club>"
  const courseIsGeneric = isGenericCourseName(item.courseName)
  const courseAndClubAreSame =
    !!item.clubName &&
    !!item.courseName &&
    item.courseName.trim().toLowerCase() === item.clubName.trim().toLowerCase()

  // The link target stays the course; only the visible label switches.
  const headlineLink = (label: string) => (
    <Link
      href={`/courses/${item.courseId}`}
      style={{ fontWeight: 500, color: 'var(--color-mgp-ink)', textDecoration: 'none' }}
    >
      {label}
    </Link>
  )

  return (
    <article style={{ ...CARD_BASE_STYLE, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <Link href={`/profile/${item.actorId}`} style={{ flexShrink: 0, textDecoration: 'none' }}>
        <UserAvatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={36} />
      </Link>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--color-mgp-ink)', lineHeight: 1.4 }}>
          <Link href={`/profile/${item.actorId}`} style={{ fontWeight: 500, color: 'var(--color-mgp-ink)', textDecoration: 'none' }}>
            {item.actorName}
          </Link>
          {courseIsGeneric && item.clubName ? (
            <>{' '}added {headlineLink(item.clubName)} to their passport</>
          ) : courseAndClubAreSame || !item.clubName ? (
            <>{' '}added {headlineLink(item.courseName)} to their passport</>
          ) : (
            <>
              {' '}added {headlineLink(item.courseName)}
              {' '}<span style={{ color: 'var(--color-mgp-ink-2)' }}>at</span>{' '}
              <Link
                href={`/courses/${item.courseId}`}
                style={{ color: 'var(--color-mgp-ink-2)', textDecoration: 'none' }}
              >
                {item.clubName}
              </Link>
              {' '}to their passport
            </>
          )}
        </div>

        {(stars || item.country) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            {stars && (
              <span style={{ color: 'var(--color-mgp-gold)', fontSize: 11, letterSpacing: 1 }}>{stars}</span>
            )}
            {item.country && (
              <span style={{ fontSize: 11, color: 'var(--color-mgp-ink-3)' }}>
                {stars ? '· ' : ''}{item.flag ?? ''} {item.country}
              </span>
            )}
          </div>
        )}

        <div style={{ ...STAMP_LABEL_STYLE, marginTop: 6 }}>
          {dateLabel}
        </div>
      </div>

      {playedYear && (
        <div
          aria-hidden
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1.5px dashed var(--color-mgp-stamp-red)',
            transform: 'rotate(-8deg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 8,
            color: 'var(--color-mgp-stamp-red)',
            lineHeight: 1,
            textAlign: 'center',
            letterSpacing: 0.5,
          }}
        >
          PLAYED<br />{playedYear}
        </div>
      )}
    </article>
  )
}

// ── Badge card ──────────────────────────────────────────────────────────────

function BadgeCard({ item }: { item: FeedBadgeItem }) {
  return (
    <article style={{ ...CARD_BASE_STYLE, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <Link href={`/profile/${item.actorId}`} style={{ flexShrink: 0, textDecoration: 'none' }}>
        <UserAvatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={36} />
      </Link>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, color: 'var(--color-mgp-ink)' }}>
          <Link href={`/profile/${item.actorId}`} style={{ fontWeight: 500, color: 'var(--color-mgp-ink)', textDecoration: 'none' }}>
            {item.actorName}
          </Link>
          {' '}earned a badge
        </div>

        <Link
          href={`/profile/${item.actorId}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginTop: 6, padding: '8px 12px',
            background: 'var(--color-mgp-cream-warm)',
            border: '1px solid var(--color-mgp-border-faint)',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          <WaxSealBadge
            name={item.badgeName}
            tier={item.badgeTier}
            emoji={item.badgeEmoji}
            size={36}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 15, fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              lineHeight: 1.1,
            }}>
              {item.badgeName}
            </div>
            {item.badgeDescription && (
              <div style={{
                fontSize: 11,
                color: 'var(--color-mgp-ink-2)',
                marginTop: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {item.badgeDescription}
              </div>
            )}
          </div>
        </Link>

        <div style={{ ...STAMP_LABEL_STYLE, marginTop: 8 }}>
          {relativeTimestamp(item.timestamp)}
        </div>
      </div>
    </article>
  )
}

// ── Friendship card ─────────────────────────────────────────────────────────

function FriendshipCard({ item }: { item: FeedFriendshipItem }) {
  return (
    <article style={CARD_BASE_STYLE}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
        <Link href={`/profile/${item.actorId}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <UserAvatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size={28} />
        </Link>
        <span aria-hidden style={{
          width: 16, borderTop: '0.5px dashed var(--color-mgp-border)', flexShrink: 0,
        }} />
        <Link href={`/profile/${item.otherId}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <UserAvatar name={item.otherName} avatarUrl={item.otherAvatarUrl} size={28} />
        </Link>
      </div>

      <div style={{ fontSize: 13, color: 'var(--color-mgp-ink)', lineHeight: 1.4 }}>
        Your friend,{' '}
        <Link href={`/profile/${item.actorId}`} style={{ fontWeight: 500, color: 'var(--color-mgp-ink)', textDecoration: 'none' }}>
          {item.actorName}
        </Link>
        {' '}just connected with{' '}
        <Link href={`/profile/${item.otherId}`} style={{ fontWeight: 500, color: 'var(--color-mgp-ink)', textDecoration: 'none' }}>
          {item.otherName}
        </Link>
      </div>

      {!item.otherIsFriendOfMine && (
        <Link
          href={`/profile/${item.otherId}`}
          style={{
            display: 'inline-block',
            marginTop: 8,
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 10,
            letterSpacing: 1,
            color: 'var(--color-mgp-ink-inv)',
            background: 'var(--color-mgp-cover)',
            padding: '5px 10px',
            borderRadius: 4,
            textDecoration: 'none',
          }}
        >
          VIEW PROFILE ›
        </Link>
      )}

      <div style={{ ...STAMP_LABEL_STYLE, marginTop: 8 }}>
        {relativeTimestamp(item.timestamp)}
      </div>
    </article>
  )
}
