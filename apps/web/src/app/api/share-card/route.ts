import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { buildInviteImage } from '@/lib/inviteCard'

/**
 * /api/share-card — builds the "all played courses" Facebook share-card
 * variant (as opposed to the invite card, which deliberately zooms into
 * the primary region only). Used by web's ShareCard.tsx (cookie session)
 * and the mobile app's "Show it off" button (Bearer token, since mobile
 * has no cookie session to send).
 */

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1]

  let userId: string | undefined

  if (bearerToken) {
    // Mobile: no cookie session to read, so validate the JWT the client
    // attached explicitly instead of going through createServerClient.
    const tokenSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data: { user } } = await tokenSupabase.auth.getUser(bearerToken)
    userId = user?.id
  } else {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    userId = user?.id
  }

  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: profile } = await adminSupabase
    .from('profiles')
    .select('referral_code')
    .eq('id', userId)
    .single()

  const code = profile?.referral_code as string | undefined
  if (!code) return NextResponse.json({ error: 'No referral code found' }, { status: 404 })

  return buildInviteImage(code, 1200, 630, 'share')
}
