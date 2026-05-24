import Link from 'next/link'
import FeedCard from '@/components/FeedCard'
import SectionEyebrow from '@/components/SectionEyebrow'
import type { FeedItem } from '@/lib/feed'

/**
 * Friends' activity — list of feed items. Used on both the home page (where
 * it shows a 2-item preview) and the Social feed subtab (where it shows the
 * full pageful). Pure presentational — the data fetch lives in the caller.
 *
 * Empty states:
 *   - No friends yet → "Find your golf circle" CTA → /friends (Social tab
 *     once that route ships)
 *   - Has friends but nothing logged → "Quiet on the green" notice
 */

interface Props {
  items: FeedItem[]
  hasFriends: boolean
}

export default function FriendsActivitySection({ items, hasFriends }: Props) {
  if (!hasFriends) {
    return (
      <section>
        <div style={{ padding: '20px 16px 8px' }}>
          <SectionEyebrow>Friends&apos; activity</SectionEyebrow>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div
            style={{
              background: 'var(--color-mgp-cream-warm)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 8,
              padding: 18,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 18,
                color: 'var(--color-mgp-ink)',
                marginBottom: 4,
              }}
            >
              Find your golf circle
            </div>
            <div
              style={{
                fontSize: 12,
                color: 'var(--color-mgp-ink-2)',
                lineHeight: 1.5,
                marginBottom: 12,
              }}
            >
              Add a friend or two — their stamps, badges, and new connections show up here.
            </div>
            <Link
              href="/friends"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mgp-stamp)',
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--color-mgp-ink-inv)',
                background: 'var(--color-mgp-cover)',
                padding: '10px 18px',
                borderRadius: 4,
                textDecoration: 'none',
              }}
            >
              FIND FRIENDS →
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div style={{ padding: '20px 16px 8px' }}>
        <SectionEyebrow>Friends&apos; activity</SectionEyebrow>
      </div>

      {items.length === 0 ? (
        <div style={{ padding: '0 16px' }}>
          <div
            style={{
              background: 'var(--color-mgp-paper)',
              border: '0.5px solid var(--color-mgp-border)',
              borderRadius: 8,
              padding: 18,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mgp-display)',
                fontSize: 17,
                color: 'var(--color-mgp-ink)',
                marginBottom: 4,
              }}
            >
              Quiet on the green
            </div>
            <div style={{ fontSize: 12, color: 'var(--color-mgp-ink-2)', lineHeight: 1.5 }}>
              None of your friends have stamped a course yet. When they do, it shows up here.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 16px' }}>
          {items.map((item) => (
            <FeedCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </section>
  )
}
