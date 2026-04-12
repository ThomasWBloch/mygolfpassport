import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'

export default async function CoursesPage() {
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

  const [countriesResult, profileResult, playedResult] = await Promise.all([
    // Distinct countries with flags — lightweight query
    supabase
      .from('courses')
      .select('country, flag')
      .not('country', 'is', null)
      .order('country')
      .limit(10000),

    user
      ? supabase.from('profiles').select('full_name').eq('id', user.id).single()
      : Promise.resolve({ data: null }),

    user
      ? supabase.from('rounds').select('course_id').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),
  ])

  // Deduplicate countries
  const countryMap = new Map<string, string | null>()
  for (const c of countriesResult.data ?? []) {
    const country = c.country as string
    if (!countryMap.has(country)) countryMap.set(country, c.flag as string | null)
  }
  const countries: CountryOption[] = [...countryMap.entries()]
    .map(([country, flag]) => ({ country, flag }))
    .sort((a, b) => a.country.localeCompare(b.country))

  const playedIds = (playedResult.data ?? []).map(r => r.course_id as string)

  const initials = computeInitials(
    (profileResult as { data: { full_name?: string } | null }).data?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', ...font }}>

      {/* Top bar */}
      <div style={{ background: '#1a5c38', padding: '14px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 22 }}>⛳</span>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/map" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            Map
          </Link>
          {user && <ProfileButton initials={initials} />}
        </div>
      </div>

      <div style={{ padding: '16px 14px 48px' }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>
          🌍 All courses
        </div>

        <CourseBrowser
          countries={countries}
          playedIds={playedIds}
        />
      </div>
    </div>
  )
}
