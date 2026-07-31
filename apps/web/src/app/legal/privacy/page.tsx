import Link from 'next/link'

/**
 * Public privacy policy — linked from ProfileEditClient.tsx's "About"
 * section (web) and mobile's Edit Profile screen. Content sourced from
 * "My Golf Passport - build project/privacy-policy.md"; kept in sync
 * manually since that file isn't part of the app build. No auth check —
 * this must be reachable by logged-out visitors too (exempted in
 * proxy.ts's isPublicPage).
 */
export const metadata = {
  title: 'Privacy Policy — My Golf Passport',
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

const mail = <a href="mailto:hello@mygolfpassport.golf" style={{ color: 'var(--color-mgp-cover)' }}>hello@mygolfpassport.golf</a>

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', fontFamily: 'var(--font-mgp-body)' }}>
      <div
        style={{
          background: 'var(--color-mgp-cover)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span aria-hidden style={{ display: 'inline-flex', color: 'var(--color-mgp-gold)', lineHeight: 0 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M3 10 L11 3 L19 10 L19 18 L13.5 18 L13.5 12.5 L8.5 12.5 L8.5 18 L3 18 Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 19, fontWeight: 500, color: 'var(--color-mgp-ink-inv)', letterSpacing: 0.5 }}>
            My Golf Passport
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-mgp-display)', fontSize: 30, fontWeight: 500, color: 'var(--color-mgp-ink)', marginBottom: 6 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 13, color: 'var(--color-mgp-ink-3)', marginBottom: 20 }}>Last updated: July 31, 2026</p>

        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-mgp-ink-2)' }}>
          My Golf Passport (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) lets you log the golf courses you&apos;ve played,
          track your progress, and connect with other golfers. This policy explains what personal data we collect, why, and
          what rights you have over it.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--color-mgp-ink-2)', marginTop: 10 }}>
          If you have questions, contact us at {mail}.
        </p>

        <Section title="1. Who we are">
          <p>My Golf Passport is operated by Thomas Bloch, based in Denmark. Our database is hosted in the EU (Ireland), via Supabase.</p>
        </Section>

        <Section title="2. Data we collect">
          <p><strong>Account information:</strong> email address, full name, home club, home country, handicap.</p>
          <p style={{ marginTop: 10 }}><strong>Profile photo:</strong> if you upload one, stored as an image file linked to your account.</p>
          <p style={{ marginTop: 10 }}>
            <strong>Activity data:</strong> every round you log — course, date, your rating, and any notes — plus badges
            earned, XP, and your friend connections. Because rounds are tied to courses and dates, this data can reveal
            where you were and when, over time.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Location (temporary):</strong> if you use the &ldquo;Nearby courses&rdquo; feature, we ask your device
            for your current location to find courses close to you. This is used only in the moment to run that search —
            we do not store your device location.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Communications:</strong> messages you send to other users through the app, and any feedback you submit
            through in-app surveys.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Referral data:</strong> if you invite someone, we store the referral relationship and the invitee&apos;s
            email address so we can send the invite and credit the referral.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Marketing preference:</strong> whether you&apos;ve opted in to receive news and offers from us, and when.
          </p>
          <p style={{ marginTop: 10 }}>
            We do not collect payment card details, government ID numbers, or precise device-level advertising identifiers.
          </p>
        </Section>

        <Section title="3. Why we use it">
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            <li>To provide the core service: your profile, your logged rounds, badges, and social features.</li>
            <li style={{ marginTop: 6 }}>To let you connect and communicate with friends on the platform.</li>
            <li style={{ marginTop: 6 }}>To send you service emails (confirmations, password resets, referral invites).</li>
            <li style={{ marginTop: 6 }}>
              To send you news and offers, <strong>only</strong> if you&apos;ve actively opted in during onboarding. You can
              withdraw this consent at any time in your profile settings.
            </li>
            <li style={{ marginTop: 6 }}>To improve the app based on survey feedback you choose to give.</li>
            <li style={{ marginTop: 6 }}>To keep the service secure and prevent abuse.</li>
          </ul>
        </Section>

        <Section title="4. Who we share it with">
          <p>
            We don&apos;t sell your data. We share it only with the service providers who help us run the app, and only to
            the extent needed for them to do their job:
          </p>
          <ul style={{ paddingLeft: 20, margin: '10px 0 0' }}>
            <li><strong>Supabase</strong> — our database, authentication, and file storage provider (EU region).</li>
            <li style={{ marginTop: 6 }}><strong>Resend</strong> — sends transactional and opt-in marketing emails on our behalf.</li>
            <li style={{ marginTop: 6 }}>
              <strong>Mapbox</strong> — renders map tiles used in the app (e.g., course locations, invite cards). Loading a
              map tile can share your IP address with Mapbox.
            </li>
            <li style={{ marginTop: 6 }}><strong>Vercel</strong> — hosts our website.</li>
            <li style={{ marginTop: 6 }}>
              <strong>Apple / Expo</strong> — delivers push notifications to your device; no additional personal data is
              shared beyond what&apos;s needed to route a notification to your device.
            </li>
          </ul>
          <p style={{ marginTop: 10 }}>
            <strong>Other users:</strong> your profile (name, home club, handicap if you choose to show it, course count)
            is visible to other users depending on your privacy settings. Messages you send are visible to the recipient.
          </p>
          <p style={{ marginTop: 10 }}>
            <strong>Booking links:</strong> we may include links to third-party golf course booking or tee-time services.
            If you follow one of these links and book, that service&apos;s own privacy policy applies to any information
            you give them — we do not pass your account data to them automatically.
          </p>
          <p style={{ marginTop: 10 }}>We may disclose data if required by law, or to protect our rights, users, or the public.</p>
        </Section>

        <Section title="5. International data transfer">
          <p>
            Our database is hosted in the EU. Some of our service providers (e.g., Mapbox, Vercel) may process data outside
            the EU/EEA as part of their infrastructure. Where that happens, we rely on their standard contractual
            safeguards for cross-border transfer.
          </p>
        </Section>

        <Section title="6. How long we keep your data">
          <p>
            We keep your account and activity data for as long as your account is active. If you delete your account, we
            delete your personal data, except where we&apos;re required to retain limited records for legal or security
            purposes.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>If you&apos;re in the EU/EEA or UK, under GDPR you have the right to:</p>
          <ul style={{ paddingLeft: 20, margin: '10px 0 0' }}>
            <li>Access the personal data we hold about you.</li>
            <li style={{ marginTop: 6 }}>Correct inaccurate data.</li>
            <li style={{ marginTop: 6 }}>Delete your data (&ldquo;right to be forgotten&rdquo;).</li>
            <li style={{ marginTop: 6 }}>Restrict or object to certain processing.</li>
            <li style={{ marginTop: 6 }}>Receive your data in a portable format.</li>
            <li style={{ marginTop: 6 }}>Withdraw consent (e.g., marketing) at any time, without affecting past processing.</li>
          </ul>
          <p style={{ marginTop: 10 }}>
            To exercise any of these rights, email {mail}. You can delete your own rounds, edit your profile, and manage
            your marketing preference directly in the app; for full account deletion, contact us.
          </p>
          <p style={{ marginTop: 10 }}>You also have the right to lodge a complaint with your local data protection authority.</p>
        </Section>

        <Section title="8. Children's privacy">
          <p>
            My Golf Passport is not directed at children under 16, and we don&apos;t knowingly collect personal data from
            them. If you believe a child has provided us with personal data, contact us and we&apos;ll remove it.
          </p>
        </Section>

        <Section title="9. Security">
          <p>
            We use industry-standard measures (encrypted connections, access controls, row-level security on our
            database) to protect your data. No system is 100% secure, and we can&apos;t guarantee absolute security.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this policy as the app evolves — for example, when we add new features. We&apos;ll update the
            &ldquo;last updated&rdquo; date above when we do. Significant changes will be communicated in-app.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>Questions, requests, or concerns about this policy or your data: {mail}.</p>
        </Section>
      </div>
    </div>
  )
}
