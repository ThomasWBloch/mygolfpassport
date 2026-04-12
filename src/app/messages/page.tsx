import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import ProfileButton from '@/components/ProfileButton'
import { computeInitials } from '@/lib/initials'

export default async function MessagesPage() {
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
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single()
  const initials = computeInitials(profile?.full_name ?? user.user_metadata?.full_name, user.email)

  // Fetch all conversations for this user
  const { data: conversations } = await supabase
    .from('conversations')
    .select('id, participant_1, participant_2, created_at')
    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
    .order('created_at', { ascending: false })

  const convos = conversations ?? []

  // Get all other participant IDs
  const otherIds = [...new Set(convos.map(c =>
    c.participant_1 === user.id ? c.participant_2 : c.participant_1
  ))] as string[]

  // Fetch profiles for other participants
  const { data: profileRows } = otherIds.length > 0
    ? await adminSupabase.from('profiles').select('id, full_name, avatar_url').in('id', otherIds)
    : { data: [] }

  const profileMap = new Map(
    (profileRows ?? []).map(p => [p.id as string, {
      name: (p.full_name as string) ?? 'Golfer',
      avatarUrl: (p.avatar_url as string) ?? null,
    }])
  )

  // Fetch last message + unread count for each conversation
  const convoIds = convos.map(c => c.id as string)
  const { data: allMessages } = convoIds.length > 0
    ? await supabase
        .from('messages')
        .select('id, conversation_id, sender_id, content, created_at, read_at')
        .in('conversation_id', convoIds)
        .order('created_at', { ascending: false })
    : { data: [] }

  const msgs = allMessages ?? []

  // Build per-conversation data
  const convoData = convos.map(c => {
    const cId = c.id as string
    const otherId = (c.participant_1 === user.id ? c.participant_2 : c.participant_1) as string
    const convoMsgs = msgs.filter(m => m.conversation_id === cId)
    const lastMsg = convoMsgs[0] ?? null
    const unreadCount = convoMsgs.filter(m => m.sender_id !== user.id && !m.read_at).length

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
    // Sort by last message time, newest first
    const ta = a.lastMessageTime ?? ''
    const tb = b.lastMessageTime ?? ''
    return tb.localeCompare(ta)
  })

  function timeAgo(iso: string | null): string {
    if (!iso) return ''
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return 'Nu'
    if (mins < 60) return `${mins}m`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}t`
    const days = Math.floor(hours / 24)
    if (days < 7) return `${days}d`
    return new Date(iso).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })
  }

  function getAvatarColor(name: string): string {
    const colors = ['#1a5c38', '#c9a84c', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#be185d', '#059669']
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
  }

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
          <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Home
          </Link>
          <ProfileButton initials={initials} />
        </div>
      </div>

      <div style={{ maxWidth: 768, margin: '0 auto', padding: '16px 14px 48px' }}>

        <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 14 }}>
          💬 Messages
        </div>

        {convoData.length === 0 ? (
          <div style={{
            background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb',
            padding: '40px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 6 }}>
              Du har ingen beskeder endnu
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5 }}>
              Find en golfspiller og start en samtale!
            </div>
            <Link href="/friends" style={{
              display: 'inline-block', marginTop: 16,
              background: '#1a5c38', color: '#fff', borderRadius: 10,
              padding: '10px 20px', fontSize: 13, fontWeight: 700,
              textDecoration: 'none',
            }}>
              Find venner →
            </Link>
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            {convoData.map((c, i) => (
              <Link
                key={c.id}
                href={`/messages/${c.id}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', textDecoration: 'none',
                  borderBottom: i < convoData.length - 1 ? '1px solid #f3f4f6' : 'none',
                  background: c.unreadCount > 0 ? '#f0fdf4' : 'transparent',
                }}
              >
                {/* Avatar */}
                {c.otherAvatarUrl ? (
                  <img src={c.otherAvatarUrl} alt="" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%',
                    background: getAvatarColor(c.otherName),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0,
                  }}>
                    {c.otherInitials}
                  </div>
                )}

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <span style={{
                      fontSize: 14, fontWeight: c.unreadCount > 0 ? 700 : 600,
                      color: '#1a1a1a',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {c.otherName}
                    </span>
                    <span style={{ fontSize: 11, color: '#9ca3af', flexShrink: 0 }}>
                      {timeAgo(c.lastMessageTime)}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 13,
                    color: c.unreadCount > 0 ? '#1a1a1a' : '#9ca3af',
                    fontWeight: c.unreadCount > 0 ? 600 : 400,
                    marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {c.lastMessage
                      ? `${c.lastSenderIsMe ? 'Dig: ' : ''}${c.lastMessage}`
                      : 'Ingen beskeder endnu'}
                  </div>
                </div>

                {/* Unread badge */}
                {c.unreadCount > 0 && (
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: '#1a5c38', color: '#fff',
                    fontSize: 11, fontWeight: 700,
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
    </div>
  )
}
