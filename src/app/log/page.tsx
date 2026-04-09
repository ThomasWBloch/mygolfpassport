import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogForm from '@/components/LogForm'
import type { PrefilledCourse } from '@/components/LogForm'
import { computeInitials } from '@/lib/initials'

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>
}) {
  const { course: courseId } = await searchParams
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

  const [courseResult, profileResult] = await Promise.all([
    courseId
      ? supabase.from('courses').select('id, name, club, country, flag, is_major').eq('id', courseId).single()
      : Promise.resolve({ data: null }),
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
  ])

  const fullName =
    profileResult.data?.full_name ??
    user?.user_metadata?.full_name ??
    user?.email?.split('@')[0] ??
    ''

  const initials = computeInitials(fullName, user?.email)

  return (
    <LogForm
      prefilledCourse={courseResult.data as PrefilledCourse | null}
      initials={initials}
    />
  )
}
