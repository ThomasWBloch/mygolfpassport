import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import CaptureRef from './CaptureRef'

/**
 * /i/[code] — referral invite landing (Model A).
 *
 * Replaces the old redirect route handler. This page exists so the invite
 * link carries rich Open Graph metadata: when shared in iMessage / WhatsApp /
 * Messenger it unfurls into a preview card built from the sibling
 * opengraph-image.tsx (a real Mapbox map of the inviter's played courses).
 *
 * A real visitor lands here, the CaptureRef client component stashes the
 * referral code in a cookie, and the CTA forwards them to /signup where the
 * "<name> invited you" banner shows and the code rides into signup metadata.
 * Attribution is written server-side in /auth/callback after confirmation.
 */

interface CardData {
  name: string
  courses: number
  countries: number
  badges: number
}

function db() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function getCard(code: string): Promise<CardData | null> {
  try {
    const { data } = await db().rpc('referral_card_data', { p_code: code })
    return data ? (data as CardData) : null
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>
}): Promise<Metadata> {
  const { code } = await params
  const card = await getCard(code)
  const name = card?.name ?? 'A golfer'
  const title = `${name} invited you to My Golf Passport`
  const description =
    'Track every course you play. Stamp the rounds, map the journey, compare with friends.'
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  const card = await getCard(code)
  const firstName = card?.name ? card.name.split(/\s+/)[0] : null

  return (
    <div style={{ background: 'var(--color-mgp-cream)', minHeight: '100vh' }}>
      <CaptureRef code={code} />

      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        {/* Brand top band */}
        <div
          style={{
            background: 'var(--color-mgp-cover)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '1.5px solid var(--color-mgp-gold)',
              color: 'var(--color-mgp-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 14,
            }}
          >
            M
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mgp-display)',
              color: 'var(--color-mgp-cream)',
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            My Golf Passport
          </span>
        </div>

        {/* Lifetime promo strip */}
        <div
          style={{
            background: 'var(--color-mgp-gold)',
            color: '#2a1e09',
            fontSize: 12,
            fontWeight: 600,
            textAlign: 'center',
            padding: '7px 12px',
          }}
        >
          The first 500 passports get lifetime premium — free
        </div>

        {/* Hero — the same rich card used in the shared preview */}
        <img
          src={`/i/${code}/hero`}
          alt={`${card?.name ?? 'A golfer'} invited you to My Golf Passport`}
          style={{ width: '100%', display: 'block' }}
        />

        <div style={{ padding: '22px 22px 40px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 27,
              fontWeight: 600,
              color: 'var(--color-mgp-ink)',
              lineHeight: 1.12,
              marginBottom: 12,
            }}
          >
            {firstName ? `${firstName} invited you to start ` : 'Start '}
            <span style={{ fontStyle: 'italic' }}>your own passport.</span>
          </div>

          <p
            style={{
              fontSize: 15,
              color: 'var(--color-mgp-ink-2)',
              lineHeight: 1.55,
              margin: '0 0 22px',
            }}
          >
            Still tracking your golf in a spreadsheet? Your passport does it for
            you — every course you&rsquo;ve played, stamped and mapped.
          </p>

          <Link
            href="/signup"
            style={{
              display: 'block',
              background: 'var(--color-mgp-gold)',
              color: 'var(--color-mgp-cover-dark)',
              textAlign: 'center',
              padding: '15px',
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 13,
              letterSpacing: 1.5,
              fontWeight: 700,
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            Get your passport →
          </Link>

          <div
            style={{
              textAlign: 'center',
              fontSize: 13,
              color: 'var(--color-mgp-ink-2)',
              marginTop: 15,
            }}
          >
            Already have one?{' '}
            <Link href="/signin" style={{ color: 'var(--color-mgp-gold-dark)' }}>
              Sign in
            </Link>
          </div>

          <div
            style={{
              textAlign: 'center',
              fontSize: 11,
              color: 'var(--color-mgp-ink-3)',
              marginTop: 16,
              letterSpacing: 0.5,
            }}
          >
            No ads · No tracking
          </div>
        </div>
      </div>
    </div>
  )
}
