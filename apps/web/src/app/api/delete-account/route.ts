import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { getRequestUserId } from '@/lib/request-user'

/**
 * POST /api/delete-account — deletes the caller's account and, via FK
 * cascades from auth.users/profiles, all of their data. Called by web
 * (cookie session) and the mobile app (Bearer token).
 */
export async function POST(request: Request) {
  const userId = await getRequestUserId(request)
  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const admin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { error } = await admin.auth.admin.deleteUser(userId)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
