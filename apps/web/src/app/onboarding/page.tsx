import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import OnboardingClient from '@/components/OnboardingClient'

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams
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
  if (!user) redirect('/welcome')

  // Check if profile is already complete — if so, go home
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, handicap, home_club')
    .eq('id', user.id)
    .single()

  if (preview !== 'true' && profile?.full_name) {
    redirect('/')
  }

  // Pre-fill name from auth metadata if available
  const initialName = profile?.full_name ?? user.user_metadata?.full_name ?? ''

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-mgp-cream)' }}>
      <div style={{ maxWidth: 460, margin: '0 auto' }}>
        <OnboardingClient userId={user.id} initialName={initialName} />
      </div>
    </div>
  )
}
