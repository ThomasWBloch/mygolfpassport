import Link from 'next/link'

/**
 * /email-confirmed — landed on after /auth/callback successfully exchanges
 * a signup-confirmation code for a session (see auth/callback/route.ts's
 * `next=/email-confirmed`, set by both web signup and mobile signUp).
 *
 * Previously the callback route redirected straight to `/` with no
 * acknowledgement at all — confusing for mobile users in particular, since
 * confirming always opens this in a browser, not the app itself (mobile has
 * no deep-link handler for the callback), so there was nothing telling them
 * they could stop there and go sign in in the app.
 */
export default function EmailConfirmedPage() {
  return (
    <div className="auth">
      <header className="auth-topband">
        <span className="auth-monogram">M</span>
        <span className="auth-brand-name">My Golf Passport</span>
      </header>

      <div className="auth-body">
        <div className="auth-eyebrow">You&rsquo;re in</div>
        <h1 className="auth-headline">Email <em>confirmed</em>.</h1>
        <p className="auth-sub">
          Using the app? Close this page and go back — sign in there with your email and password.
          On the web, sign in below.
        </p>

        <div className="auth-footer-link">
          <Link href="/signin">Sign in →</Link>
        </div>
      </div>
    </div>
  )
}
