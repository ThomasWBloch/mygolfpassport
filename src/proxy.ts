import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  // Unauthenticated users → login (except /login itself)
  if (!user && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Authenticated users on /login → home
  if (user && path === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (user) {
    // Ensure a profiles row exists (once per session via cookie)
    const syncCookie = `profile_synced_${user.id}`
    if (!request.cookies.has(syncCookie)) {
      await supabase
        .from('profiles')
        .upsert({ id: user.id }, { onConflict: 'id', ignoreDuplicates: true })

      response.cookies.set(syncCookie, '1', {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      })
    }

    // Onboarding redirect (skip for /onboarding, /api, /login)
    // Use a cookie so we only check the DB once — cleared when onboarding completes
    const onboardedCookie = `onboarded_${user.id}`
    if (path !== '/onboarding' && !path.startsWith('/api/') && !request.cookies.has(onboardedCookie)) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, handicap, home_club')
        .eq('id', user.id)
        .single()

      if (!profile?.full_name || profile?.handicap == null || !profile?.home_club) {
        return NextResponse.redirect(new URL('/onboarding', request.url))
      }

      // Profile is complete — set cookie so we don't check again
      response.cookies.set(onboardedCookie, '1', {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
      })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
