import { NextResponse } from 'next/server'

/**
 * /i/[code] — referral invite link.
 *
 * Model A (user-initiated sharing): a passport holder shares their own link
 * (mygolfpassport.golf/i/<code>) through their own channels. We collect NO
 * data about the invited person here — we only stash the referrer's code in a
 * short-lived cookie and send the visitor to signup. Attribution is written
 * server-side after the new account is confirmed (see /auth/callback +
 * the attribute_referral RPC).
 *
 * The cookie is readable by client JS (not httpOnly) so the signup form can
 * forward the code into the new user's auth metadata.
 */

const CODE_RE = /^[A-Z0-9]{4,12}$/
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: raw } = await params
  const code = (raw ?? '').toUpperCase().trim()

  const origin = new URL(_request.url).origin
  const response = NextResponse.redirect(`${origin}/signup`)

  // Only set the cookie for plausibly-valid codes; bad links still land on
  // signup, just without attribution.
  if (CODE_RE.test(code)) {
    response.cookies.set('mgp_ref', code, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      httpOnly: false,
      secure: true,
    })
  }

  return response
}
