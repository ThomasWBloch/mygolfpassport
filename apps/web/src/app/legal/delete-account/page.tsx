import Link from 'next/link'

/**
 * Public "delete your account" page. Google Play's Data safety form asks for a
 * web address where users can request deletion of their account and data; it
 * must name the app/developer, say what the user does, and say what is deleted
 * or kept. Keep it in step with /api/delete-account and the FK cascades (see
 * supabase/migrations/20260923_cascade_user_deletion.sql). No auth check — it
 * must be reachable logged out (proxy.ts exempts /legal/).
 */
export const metadata = {
  title: 'Delete your account — My Golf Passport',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 20, fontWeight: 500, color: 'var(--color-mgp-ink)', marginBottom: 10 }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-mgp-ink-2)' }}>{children}</div>
    </section>
  )
}

const mail = <a href="mailto:feedback@mygolfpassport.golf" style={{ color: 'var(--color-mgp-cover)' }}>feedback@mygolfpassport.golf</a>

export default function DeleteAccountPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', fontFamily: 'var(--font-mgp-body)' }}>
      <div style={{ background: 'var(--color-mgp-cover)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 19, fontWeight: 500, color: 'var(--color-mgp-ink-inv)', letterSpacing: 0.5 }}>
            My Golf Passport
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 30, fontWeight: 500, color: 'var(--color-mgp-ink)', marginBottom: 6 }}>
          Delete your account
        </h1>
        <p style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)', marginBottom: 20 }}>Last updated: October 30, 2026</p>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-mgp-ink-2)' }}>
          My Golf Passport is made by Thomas Vennekilde &amp; Thomas Bloch. You can delete your My Golf Passport account and the
          data linked to it at any time.
        </p>

        <Section title="In the app">
          <ol style={{ paddingLeft: 20, margin: 0 }}>
            <li>Open My Golf Passport and sign in.</li>
            <li style={{ marginTop: 6 }}>Go to <strong>You → Edit profile &amp; settings</strong>.</li>
            <li style={{ marginTop: 6 }}>Scroll to the bottom and tap <strong>Delete account</strong>.</li>
            <li style={{ marginTop: 6 }}>Confirm when asked. Your account is deleted straight away.</li>
          </ol>
        </Section>

        <Section title="By email">
          <p>
            If you can&apos;t use the app, email {mail}{' '}
            from the address you registered with and ask us to delete your account. We&apos;ll confirm once it is done.
          </p>
        </Section>

        <Section title="What we delete">
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>Your login (email and password) and active sessions.</li>
            <li style={{ marginTop: 6 }}>Your profile, including name, home club and handicap.</li>
            <li style={{ marginTop: 6 }}>Every round you logged, with your ratings, reviews and notes.</li>
            <li style={{ marginTop: 6 }}>Your badges and bucket list.</li>
            <li style={{ marginTop: 6 }}>Your friend connections.</li>
            <li style={{ marginTop: 6 }}>Your messages. Conversations you were part of are removed for the other person as well.</li>
            <li style={{ marginTop: 6 }}>Your push notification token and any referral records tied to your account.</li>
          </ul>
        </Section>

        <Section title="What we keep">
          <p>
            Nothing that identifies you. A few records, such as answers to a past survey, are kept without any link to you.
          </p>
        </Section>

        <Section title="How long it takes">
          <p>Deletion from our live system is immediate and cannot be undone.</p>
        </Section>

        <Section title="Questions">
          <p>
            Write to {mail}. See also our <Link href="/legal/privacy" style={{ color: 'var(--color-mgp-cover)' }}>Privacy Policy</Link>.
          </p>
        </Section>
      </div>
    </div>
  )
}
