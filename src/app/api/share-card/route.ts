import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { buildInviteImage } from '@/lib/inviteCard'

/**
 * /api/share-card — test endpoint for the "all played courses" Facebook
 * share-card variant (as opposed to the invite card, which deliberately
 * zooms into the primary region only). No UI entry point yet; visit while
 * logged in to preview.
 */

export const runtime = 'nodejs'

export async function GET() {
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
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: profile } = await adminSupabase
    .from('profiles')
    .select('referral_code')
    .eq('id', user.id)
    .single()

  const code = profile?.referral_code as string | undefined
  if (!code) return NextResponse.json({ error: 'No referral code found' }, { status: 404 })

  return buildInviteImage(code, 1200, 630, 'share')
}
