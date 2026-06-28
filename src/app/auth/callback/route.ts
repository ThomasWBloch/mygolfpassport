import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * /auth/callback — server-side handler for Supabase email-confirmation links.
 *
 * The email link sent by Supabase points here with a `?code=` query param
 * (PKCE flow). We:
 *  1. Exchange the code for a session (sets session cookies).
 *  2. Redirect to the destination (default: `/`). Proxy then routes to
 *     `/onboarding` for new users with empty profile, or `/` for returning.
 *
 * On error (invalid/expired code, supabase outage, etc.) we redirect to
 * `/signin?error=auth_callback_failed` so the user can retry. We do not
 * surface the underlying error message to the UI.
 */

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/signin?error=auth_callback_missing_code`)
  }

  const cookieStore = await cookies()
  const response = NextResponse.redirect(`${origin}${next}`)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    return NextResponse.redirect(`${origin}/signin?error=auth_callback_failed`)
  }

  // Referral attribution (Model A): if this user signed up via an invite link,
  // the referrer's code rode along in their auth metadata. Claim it server-side
  // — the RPC blocks self-referral and is idempotent (unique invitee). This is
  // best-effort and must never break the auth flow, so it's fully guarded.
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const refCode = user?.user_metadata?.referral_code
    if (typeof refCode === 'string' && refCode.length > 0) {
      await supabase.rpc('attribute_referral', { p_code: refCode })
    }
  } catch {
    // swallow — attribution is non-critical
  }
  // Clear the referral cookie now that it's been consumed.
  response.cookies.set('mgp_ref', '', { maxAge: 0, path: '/' })

  return response
}
