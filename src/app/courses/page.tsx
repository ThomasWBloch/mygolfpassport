import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'
import CourseBrowser from '@/components/CourseBrowser'
import type { CountryOption } from '@/components/CourseBrowser'
import { COUNTRY_NAMES, COUNTRY_FLAGS } from '@/lib/countries'
import { getComboComponentIds } from '@/lib/combo-components'

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

  const [profileResult, playedResult, hiddenIds] = await Promise.all([
    user
      ? supabase.from('profiles').select('full_name, home_country').eq('id', user.id).single()
      : Promise.resolve({ data: null }),

    user
      ? supabase.from('rounds').select('course_id').eq('user_id', user.id)
      : Promise.resolve({ data: [] }),

    getComboComponentIds(supabase),
  ])

  const countries: CountryOption[] = COUNTRY_NAMES.map(name => ({
    country: name,
    flag: COUNTRY_FLAGS[name] ?? null,
  }))

  const playedIds = (playedResult.data ?? []).map(r => r.course_id as string)

  const profile = (profileResult as { data: { full_name?: string; home_country?: string } | null }).data
  const initials = computeInitials(
    profile?.full_name ?? user?.user_metadata?.full_name,
    user?.email
  )
  const userHomeCountry = profile?.home_country ?? null

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)', fontFamily: 'var(--font-mgp-body)' }}>

      {/* Top bar — Adventure chrome */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '1.5px solid var(--color-mgp-gold)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-gold)',
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 14,
          }}>M</span>
          <span style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 18, fontWeight: 500,
            color: 'var(--color-mgp-ink-inv)',
            letterSpacing: 0.5,
          }}>My Golf Passport</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Link href="/map" style={{
            color: 'var(--color-mgp-gold)',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>
            Map
          </Link>
          {user && <ProfileButton initials={initials} />}
        </div>
      </div>

      <div style={{ padding: '20px 16px 48px' }}>
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}>
          Atlas
        </div>
        <div style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 24,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 16,
          letterSpacing: -0.3,
        }}>
          All courses
        </div>

        <CourseBrowser
          countries={countries}
          playedIds={playedIds}
          hiddenIds={hiddenIds}
          userHomeCountry={userHomeCountry}
        />
      </div>
    </div>
  )
}
