import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { buildInviteImage } from '@/lib/inviteCard'
import { getRequestUserId } from '@/lib/request-user'

/**
 * /api/share-card — builds the "all played courses" Facebook share-card
 * variant (as opposed to the invite card, which deliberately zooms into
 * the primary region only). Used by web's ShareCard.tsx (cookie session)
 * and the mobile app's "Show it off" button (Bearer token).
 */

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const userId = await getRequestUserId(request)
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
