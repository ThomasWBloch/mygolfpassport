import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import OnboardingClient from '@/components/OnboardingClient'

export default async function OnboardingPage() {
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

  // Check if profile is already complete — if so, go home
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, handicap, home_club')
    .eq('id', user.id)
    .single()

  if (profile?.full_name && profile?.handicap != null && profile?.home_club) {
    redirect('/')
  }

  // Pre-fill name from auth metadata if available
  const initialName = profile?.full_name ?? user.user_metadata?.full_name ?? ''

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  return (
    <div style={{ minHeight: '100vh', background: '#f2f4f0', ...font }}>

      {/* Green header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d24 100%)',
        padding: '32px 24px 28px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -40, top: -40,
          width: 160, height: 160, borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
        }} />
        <div style={{ fontSize: 32, marginBottom: 8 }}>⛳</div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.6 }}>
          My Golf Passport
        </div>
      </div>

      <div style={{ maxWidth: 430, margin: '0 auto', padding: '24px 18px 48px' }}>

        {/* Welcome text */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px', lineHeight: 1.3 }}>
            Velkommen til My Golf Passport! 👋
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
            Udfyld din profil så andre golfere kan finde dig
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff', borderRadius: 14,
          border: '1px solid #e5e7eb', padding: '24px 20px',
        }}>
          <OnboardingClient userId={user.id} initialName={initialName} />
        </div>
      </div>
    </div>
  )
}
