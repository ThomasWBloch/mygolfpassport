import Link from 'next/link'

/**
 * /email-confirmed — landed on after /auth/confirm verifies a signup-
 * confirmation link in a browser (desktop, or a phone without the app —
 * with the app installed the link opens the app instead). The user is
 * already signed in on this browser at this point.
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
