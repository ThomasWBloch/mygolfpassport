import { buildInviteImage } from '@/lib/inviteCard'

export const runtime = 'nodejs'
export const revalidate = 60
export const alt = 'You have been invited to My Golf Passport'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = await params
  return buildInviteImage(code, size.width, size.height)
}
