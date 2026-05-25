import Link from 'next/link'

/**
 * YouBucketView — the "Bucket list" subtab on /you.
 *
 * Placeholder until the bucket-list feature ships (no table, no "save
 * course" affordance on /courses yet). Mirrors the card from the
 * standalone /bucket-list page which now redirects to /you?tab=bucket.
 *
 * No auth check — the parent /you/page.tsx already enforces redirect to
 * /welcome before any subview renders.
 */

export default function YouBucketView() {
  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>
      <div
        style={{
          background: 'var(--color-mgp-paper)',
          border: '1px solid var(--color-mgp-border-faint)',
          borderRadius: 14,
          padding: '32px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }} aria-hidden>🎯</div>
        <div
          style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 22,
            fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            marginBottom: 8,
            letterSpacing: -0.2,
          }}
        >
          Coming soon
        </div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--color-mgp-ink-3)',
            lineHeight: 1.5,
            maxWidth: 320,
            margin: '0 auto',
          }}
        >
          Save courses you&apos;d love to play, then check them off as you stamp them into your passport. We&apos;re building it now.
        </div>
        <Link
          href="/courses"
          style={{
            display: 'inline-block',
            marginTop: 16,
            background: 'var(--color-mgp-cover)',
            color: 'var(--color-mgp-ink-inv)',
            borderRadius: 12,
            padding: '12px 24px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Browse courses ›
        </Link>
      </div>
    </div>
  )
}
