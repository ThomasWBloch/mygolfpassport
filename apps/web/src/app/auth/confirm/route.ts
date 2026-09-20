import { createServerClient } from '@supabase/ssr'
import type { EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * /auth/confirm — landing route for the signup-confirmation and password-
 * recovery emails.
 *
 * The Supabase email templates link straight here with a `token_hash`
 * (instead of Supabase's own hosted /auth/v1/verify link), because:
 *  - a link on OUR domain can be claimed by the mobile app as a universal
 *    link / Android app link, so tapping it on a phone opens the app;
 *    a supabase.co link can't be, and a redirect from it never hands off
 *  - verifyOtp needs no PKCE code_verifier or hash-fragment tokens, so it
 *    works no matter which device or browser the link is opened in
 *
 * When the app is installed the OS intercepts the link before it ever
 * reaches this route (see apps/mobile/app/auth/confirm.tsx); this route is
 * the web fallback for desktops and phones without the app.
 *
 * /auth/callback stays in place for links already sent in the old format.
 */

const VALID_TYPES: EmailOtpType[] = ['signup', 'recovery', 'email', 'invite', 'magiclink', 'email_change']

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const nextParam = searchParams.get('next')

  if (!tokenHash || !type || !VALID_TYPES.includes(type)) {
    return NextResponse.redirect(`${origin}/signin?error=auth_callback_missing_code`)
  }

  // Only ever redirect to a path on this site — `${origin}${next}` with a
  // next like "@evil.com" would otherwise become an open redirect.
  const safeNext = nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : null
  const next = safeNext ?? (type === 'recovery' ? '/reset-password' : '/email-confirmed')

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

  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
  if (error) {
    return NextResponse.redirect(`${origin}/signin?error=auth_callback_failed`)
  }

  // Same best-effort referral attribution as /auth/callback.
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const refCode = user?.user_metadata?.referral_code
    if (typeof refCode === 'string' && refCode.length > 0) {
      await supabase.rpc('attribute_referral', { p_code: refCode })
    }
  } catch {
    // swallow — attribution is non-critical
  }
  response.cookies.set('mgp_ref', '', { maxAge: 0, path: '/' })

  return response
}
