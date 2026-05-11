import Link from 'next/link'

/**
 * /signup/check-email — post-signup wait screen.
 *
 * Mockup source: design-system/auth-suite-mockup.html (3rd screen)
 *
 * Shown after a successful signUp. Tells the user a confirmation email is
 * on its way. Includes resend + "wrong email" links.
 *
 * The big "IN TRANSIT" passport visual is the centerpiece — gives the
 * signup moment the dramatic stamp-metaphor weight that previous "check
 * your email" string never had.
 *
 * Email comes via ?email= query param (passed by /signup on submit).
 */

interface Props {
  searchParams: Promise<{ email?: string }>
}

export default async function CheckEmailPage({ searchParams }: Props) {
  const { email } = await searchParams
  const displayEmail = email && email.length > 0 ? email : 'your inbox'

  return (
    <div className="auth">
      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body" style={{ alignItems: 'center', textAlign: 'center' }}>

        <div className="auth-transit">
          <span className="auth-transit-stamp">In transit</span>
          <div className="auth-transit-eye">Passport No. — pending</div>
          <div className="auth-transit-name">Activation pending</div>
          <div className="auth-transit-meta">
            Sent to<br />
            <b>{displayEmail}</b>
          </div>
        </div>

        <div className="auth-eyebrow" style={{ marginTop: 12 }}>Almost aboard</div>
        <h1 className="auth-headline" style={{ textAlign: 'center' }}>
          Check your <em>inbox</em>.
        </h1>
        <p className="auth-sub" style={{ textAlign: 'center', maxWidth: 280, margin: '0 auto' }}>
          We&rsquo;ve sent a confirmation link. Click it and your passport
          is activated.
        </p>

        <div className="auth-resend">
          Didn&rsquo;t get it?{' '}
          <Link href="/signup">Try again →</Link>
        </div>

        <div className="auth-footer-link" style={{ marginTop: 14 }}>
          Wrong email? <Link href="/signup">Edit →</Link>
        </div>
      </div>

      <div className="auth-trust">
        <span>Typically arrives in 30 seconds</span>
      </div>
    </div>
  )
}
