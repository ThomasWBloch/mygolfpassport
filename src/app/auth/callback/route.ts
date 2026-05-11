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

  return response
}
