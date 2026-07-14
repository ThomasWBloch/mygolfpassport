import { buildInviteImage } from '@/lib/inviteCard'

/**
 * /i/[code]/hero — a TALLER crop of the invite card for the landing-page
 * hero. The social OG unfurl stays at the standard 1200×630 (opengraph-image);
 * the landing gets a portrait framing so the map reads bigger on screen.
 */

export const runtime = 'nodejs'
export const revalidate = 60

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  return buildInviteImage(code, 1080, 1080)
}
