import { redirect } from 'next/navigation'

/**
 * /login — legacy route, now redirects to /signin.
 *
 * Kept as a redirect (rather than deleted) so old bookmarks / emailed links
 * still work. ?mode=signup deep-link is also preserved: it routes to /signup
 * instead.
 */

interface Props {
  searchParams: Promise<{ mode?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { mode } = await searchParams
  redirect(mode === 'signup' ? '/signup' : '/signin')
}
