import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { computeInitials } from '@/lib/initials'

/**
 * SocialMessagesView — the "Messages" subtab on /social.
 *
 * Data fetch + presentation copied 1:1 from /messages/page.tsx (the inbox
 * list view; individual threads at /messages/[conversation_id] still
 * route to the dedicated full-screen page). Top-bar / outer wrapper are
 * owned by /social/page.tsx; the "Correspondence / Messages" eyebrow+title
 * block is dropped because the SubTab already names the section.
 */

export default async function SocialMessagesView() {
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

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const adminSupabase = serviceKey
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } })
    : supabase

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/welcome')

  const { data: convosData } = await supabase
    .from('conversations')
    .select('id, participant_1, participant_2, created_at')
    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
    .order('created_at', { ascending: false })

  const convos = convosData ?? []

  const otherIds = [...new Set(convos.map((c) =>
    c.participant_1 === user.id ? c.participant_2 : c.participant_1
  ))] as string[]
  const convoIds = convos.map((c) => c.id as string)

  const [profileRowsResult, messagesResult] = await Promise.all([
    otherIds.length > 0
      ? adminSupabase.from('profiles').select('id, full_name, avatar_url').in('id', otherIds)
      : Promise.resolve({ data: [] }),
    convoIds.length > 0
      ? supabase
          .from('messages')
          .select('id, conversation_id, sender_id, content, created_at, read_at')
          .in('conversation_id', convoIds)
          .order('created_at', { ascending: false })
      : Promise.resolve({ data: [] }),
  ])

  const profileMap = new Map(
    (profileRowsResult.data ?? []).map((p) => [p.id as string, {
      name: (p.full_name as string) ?? 'Golfer',
      avatarUrl: (p.avatar_url as string) ?? null,
    }])
  )

  const msgs = messagesResult.data ?? []

  const convoData = convos.map((c) => {
    const cId = c.id as string
    const otherId = (c.participant_1 === user.id ? c.participant_2 : c.participant_1) as string
    const convoMsgs = msgs.filter((m) => m.conversation_id === cId)
    const lastMsg = convoMsgs[0] ?? null
    const unreadCount = convoMsgs.filter((m) => m.sender_id !== user.id && !m.read_at).length

    const otherProfile = profileMap.get(otherId)
    return {
      id: cId,
      otherName: otherProfile?.name ?? 'Golfer',
      otherInitials: computeInitials(otherProfile?.name ?? 'Golfer', undefined),
      otherAvatarUrl: otherProfile?.avatarUrl ?? null,
      lastMessage: lastMsg?.content as string | null,
      lastMessageTime: lastMsg?.created_at as string | null,
      lastSenderIsMe: lastMsg?.sender_id === user.id,
      unreadCount,
    }
  }).sort((a, b) => {
    const ta = a.lastMessageTime ?? ''
    const tb = b.lastMessageTime ?? ''
    return tb.localeCompare(ta)
  })

  // eslint-disable-next-line react-hooks/purity
  const nowMs = Date.now()

  function timeAgo(iso: string | null): string {
    if (!iso) return ''
    const diff = nowMs - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Now'
    if (mins < 60) return `${mins}m`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d`
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  function getAvatarColor(name: string): string {
    const colors = [
      'var(--color-mgp-stamp-red)',
      'var(--color-mgp-stamp-blue)',
      'var(--color-mgp-stamp-purple)',
      'var(--color-mgp-success)',
      'var(--color-mgp-gold-dark)',
      'var(--color-mgp-cover-light)',
      'var(--color-mgp-ink-2)',
      'var(--color-mgp-cover)',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
  }

  return (
    <div style={{ maxWidth: 768, margin: '0 auto', padding: '20px 16px 48px' }}>
      {convoData.length === 0 ? (
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 14,
          border: '1px solid var(--color-mgp-border)',
          padding: '40px 20px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <div style={{
            fontFamily: 'var(--font-mgp-display)',
            fontSize: 20, fontWeight: 500,
            color: 'var(--color-mgp-ink)',
            marginBottom: 6,
            letterSpacing: -0.2,
          }}>
            No messages yet
          </div>
          <div style={{
            fontSize: 14,
            color: 'var(--color-mgp-ink-3)',
            lineHeight: 1.5,
          }}>
            Find a golfer and start a conversation!
          </div>
          <Link href="/social?tab=friends" style={{
            display: 'inline-block', marginTop: 16,
            background: 'var(--color-mgp-cover)',
            color: 'var(--color-mgp-ink-inv)',
            borderRadius: 10,
            padding: '10px 20px',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 12, letterSpacing: 1.5,
            textTransform: 'uppercase',
            fontWeight: 700,
            textDecoration: 'none',
          }}>
            Find friends →
          </Link>
        </div>
      ) : (
        <div style={{
          background: 'var(--color-mgp-paper)',
          borderRadius: 14,
          border: '1px solid var(--color-mgp-border)',
          overflow: 'hidden',
        }}>
          {convoData.map((c, i) => (
            <Link
              key={c.id}
              href={`/messages/${c.id}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', textDecoration: 'none',
                borderBottom: i < convoData.length - 1 ? '1px solid var(--color-mgp-border-faint)' : 'none',
                background: c.unreadCount > 0 ? 'var(--color-mgp-cream-warm)' : 'transparent',
              }}
            >
              {c.otherAvatarUrl ? (
                <img src={c.otherAvatarUrl} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: getAvatarColor(c.otherName),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-mgp-ink-inv)',
                  fontSize: 15, fontWeight: 700, flexShrink: 0,
                }}>
                  {c.otherInitials}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    fontSize: 15, fontWeight: c.unreadCount > 0 ? 700 : 600,
                    color: 'var(--color-mgp-ink)',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {c.otherName}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontWeight: 600,
                    fontSize: 11, letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-ink-3)',
                    flexShrink: 0,
                  }}>
                    {timeAgo(c.lastMessageTime)}
                  </span>
                </div>
                <div style={{
                  fontSize: 14,
                  color: c.unreadCount > 0 ? 'var(--color-mgp-ink)' : 'var(--color-mgp-ink-3)',
                  fontWeight: c.unreadCount > 0 ? 600 : 400,
                  marginTop: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {c.lastMessage
                    ? `${c.lastSenderIsMe ? 'You: ' : ''}${c.lastMessage}`
                    : 'No messages yet'}
                </div>
              </div>

              {c.unreadCount > 0 && (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--color-mgp-cover)',
                  color: 'var(--color-mgp-ink-inv)',
                  fontSize: 13, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {c.unreadCount}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
