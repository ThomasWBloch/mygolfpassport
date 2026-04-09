import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogForm from '@/components/LogForm'
import type { PrefilledCourse } from '@/components/LogForm'

export default async function LogPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>
}) {
  const { course: courseId } = await searchParams

  let prefilledCourse: PrefilledCourse | null = null

  if (courseId) {
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
    const { data } = await supabase
      .from('courses')
      .select('id, name, club, country, flag, is_major')
      .eq('id', courseId)
      .single()

    prefilledCourse = data
  }

  return <LogForm prefilledCourse={prefilledCourse} />
}
