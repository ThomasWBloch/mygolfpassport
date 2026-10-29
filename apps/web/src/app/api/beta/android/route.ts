import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Collects the Gmail of Android beta testers from /beta. The owners add the
// address to the Google Play test list and send the install link by hand.
// Public (no session) — proxy.ts exempts /api/ — so keep it small and quiet:
// the response never reveals whether an address was already on the list.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Honeypot: real users never see the "company" field, bots fill it in.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { error } = await supabase.from('android_beta_signups').insert({ email })
  // 23505 = already signed up. Same answer as success, on purpose.
  if (error && error.code !== '23505') {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
