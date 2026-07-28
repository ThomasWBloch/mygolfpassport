import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * POST /api/courses/[id]/report
 * Body: { type: string, message: string, source_url?: string | null }
 *
 * Submits a correction proposal to public.course_edit_submissions via the
 * submit_course_edit() RPC. All validation lives server-side + in the RPC's
 * CHECK constraints — the client cannot bypass length, type, or rate limits.
 *
 * Auth required. No anonymous submissions.
 */

const ALLOWED_TYPES = new Set([
  'name', 'website', 'phone', 'address', 'location', 'holes_par',
  'duplicate', 'other',
])

const MAX_MESSAGE_LEN = 500
const URL_REGEX = /^https?:\/\/[^\s]{3,}$/i

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: courseId } = await params

  if (!courseId || !/^[0-9a-f-]{36}$/i.test(courseId)) {
    return NextResponse.json({ error: 'Invalid course id' }, { status: 400 })
  }

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
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => null) as {
    type?: unknown
    message?: unknown
    source_url?: unknown
  } | null

  if (!body) {
    return NextResponse.json({ error: 'Missing body' }, { status: 400 })
  }

  const type = typeof body.type === 'string' ? body.type.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const sourceUrlRaw = typeof body.source_url === 'string' ? body.source_url.trim() : ''
  const sourceUrl = sourceUrlRaw === '' ? null : sourceUrlRaw

  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }
  if (message.length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({
      error: `Message exceeds ${MAX_MESSAGE_LEN} characters`,
    }, { status: 400 })
  }
  if (sourceUrl !== null && !URL_REGEX.test(sourceUrl)) {
    return NextResponse.json({
      error: 'Source URL must start with http:// or https://',
    }, { status: 400 })
  }

  // Call the RPC with the user's authenticated session so auth.uid() resolves
  // inside the function. The RPC enforces rate limits and inserts the row.
  const { data, error } = await supabase.rpc('submit_course_edit', {
    p_course_id: courseId,
    p_type: type,
    p_message: message,
    p_source_url: sourceUrl,
  })

  if (error) {
    // Map known SQLSTATE errors to friendly responses.
    if (error.message.includes('rate_limit_user')) {
      return NextResponse.json({
        error: "You've submitted the limit (5) of edit suggestions in the last 24 hours. Please try again tomorrow.",
      }, { status: 429 })
    }
    if (error.message.includes('rate_limit_course')) {
      return NextResponse.json({
        error: 'This course has reached its daily submission limit. Please try again tomorrow.',
      }, { status: 429 })
    }
    if (error.message.includes('unauthorized')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[courses/report] RPC failed:', error)
    return NextResponse.json({ error: 'Could not submit. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ success: true, submission_id: data })
}
