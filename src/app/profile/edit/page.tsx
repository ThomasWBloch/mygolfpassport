import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import ProfileEditClient from '@/components/ProfileEditClient'
import { computeInitials } from '@/lib/initials'

export default async function ProfileEditPage() {
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
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, handicap, home_club, home_country, allow_round_requests_friends, allow_round_requests_strangers, show_in_search, show_course_count, hide_from_feeds')
    .eq('id', user.id)
    .single()

  const fullName =
    profile?.full_name ??
    user.user_metadata?.full_name ??
    user.email?.split('@')[0] ??
    'Golfer'

  const initials = computeInitials(fullName, user.email)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-mgp-cream)',
      fontFamily: 'var(--font-mgp-body)',
    }}>

      {/* Top bar — Adventure chrome with "← Profile" back link */}
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
          <Link href="/profile" style={{
            color: 'var(--color-mgp-gold)',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>
            ← Profile
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>

        {/* Atlas-style eyebrow + display title */}
        <div style={{
          fontFamily: 'var(--font-mgp-stamp)',
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'var(--color-mgp-ink-3)',
          marginBottom: 6,
        }}>
          Settings
        </div>
        <div style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 24,
          fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          marginBottom: 24,
          letterSpacing: -0.3,
        }}>
          Edit profile
        </div>

        <ProfileEditClient
          userId={user.id}
          email={user.email ?? ''}
          fullName={fullName}
          handicap={profile?.handicap ?? null}
          homeClub={profile?.home_club ?? null}
          homeCountry={(profile?.home_country as string) ?? null}
          allowFriends={profile?.allow_round_requests_friends ?? true}
          allowStrangers={profile?.allow_round_requests_strangers ?? false}
          showInSearch={profile?.show_in_search ?? true}
          showCourseCount={profile?.show_course_count ?? true}
          hideFromFeeds={profile?.hide_from_feeds ?? false}
        />
      </div>
    </div>
  )
}
