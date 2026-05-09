'use client'

import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

interface Message {
  id: string
  senderId: string
  content: string
  createdAt: string
}

interface Props {
  conversationId: string
  currentUserId: string
  otherId: string
  otherName: string
  otherAvatarUrl: string | null
  initialMessages: Message[]
}

// Adventure stamp palette — kept in lockstep with /messages list
// (src/app/messages/page.tsx) and UserAvatar.tsx so initials-discs render
// the same colour everywhere a user appears.
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

function formatTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  if (diffDays === 0) return time
  if (diffDays === 1) return `Yesterday ${time}`
  if (diffDays < 7) return `${d.toLocaleDateString('en-GB', { weekday: 'short' })} ${time}`
  return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} ${time}`
}

export default function ChatThread({ conversationId, currentUserId, otherId, otherName, otherAvatarUrl, initialMessages }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const m = payload.new
          const newMsg: Message = {
            id: m.id,
            senderId: m.sender_id,
            content: m.content,
            createdAt: m.created_at,
          }
          setMessages(prev => {
            if (prev.some(p => p.id === newMsg.id)) return prev
            return [...prev, newMsg]
          })

          // Mark as read if from other user
          if (m.sender_id !== currentUserId) {
            supabase
              .from('messages')
              .update({ read_at: new Date().toISOString() })
              .eq('id', m.id)
              .then(() => {})
          }
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [conversationId, currentUserId, supabase])

  async function sendMessage() {
    const content = input.trim()
    if (!content || sending) return

    setSending(true)
    setInput('')

    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content,
      })

    setSending(false)
    if (error) {
      setInput(content) // restore on failure
    }
    inputRef.current?.focus()
  }

  const otherInitials = otherName.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('')

  function renderMessageContent(text: string, isMe: boolean) {
    const urlRegex = /(https?:\/\/[^\s]+|[a-zA-Z0-9][-a-zA-Z0-9]*\.[a-zA-Z]{2,}[^\s]*)/g
    const parts = text.split(urlRegex)
    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        const href = part.startsWith('http') ? part : `https://${part}`
        return (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isMe ? 'var(--color-mgp-cream-warm)' : 'var(--color-mgp-cover)',
              textDecoration: 'underline',
              wordBreak: 'break-all',
            }}
          >
            {part}
          </a>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  const font = { fontFamily: 'var(--font-mgp-body)' }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f2f4f0', ...font }}>

      {/* Row A — cover-green brand strip. Mirrors the /messages list chrome
          so the two surfaces feel like one place. BackButton uses referrer-
          aware behaviour with /messages as the cold-load fallback. */}
      <div style={{
        background: 'var(--color-mgp-cover)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
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
        <BackButton fallback="/messages" />
      </div>

      {/* Row B — persona strip. Whole row is a Link to the other user's
          profile so tapping the avatar/name jumps to /profile/[otherId]. */}
      <Link
        href={`/profile/${otherId}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 16px',
          background: 'var(--color-mgp-paper)',
          borderBottom: '1px solid var(--color-mgp-border-faint)',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        {otherAvatarUrl ? (
          <img
            src={otherAvatarUrl}
            alt=""
            style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: 42, height: 42, borderRadius: '50%',
            background: getAvatarColor(otherName),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-mgp-ink-inv)',
            fontSize: 14, fontWeight: 700, flexShrink: 0,
          }}>
            {otherInitials}
          </div>
        )}
        <span style={{
          flex: 1, minWidth: 0,
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 17, fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          letterSpacing: -0.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {otherName}
        </span>
        <span style={{
          fontSize: 14, color: 'var(--color-mgp-ink-3)', flexShrink: 0,
        }}>›</span>
      </Link>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--color-mgp-ink-3)',
            fontFamily: 'var(--font-mgp-stamp)',
            fontSize: 11,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginTop: 40,
          }}>
            Start the conversation — write the first message
          </div>
        )}

        {messages.map((m, i) => {
          const isMe = m.senderId === currentUserId
          // Show time separator if gap > 30 min from previous message
          const showTime = i === 0 || (
            new Date(m.createdAt).getTime() - new Date(messages[i - 1].createdAt).getTime() > 30 * 60 * 1000
          )

          return (
            <div key={m.id}>
              {showTime && (
                <div style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', margin: '12px 0 8px' }}>
                  {formatTime(m.createdAt)}
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: 16,
                  borderBottomRightRadius: isMe ? 4 : 16,
                  borderBottomLeftRadius: isMe ? 16 : 4,
                  background: isMe ? '#1a5c38' : '#e5e7eb',
                  color: isMe ? '#fff' : '#1a1a1a',
                  fontSize: 14, lineHeight: 1.5,
                  wordBreak: 'break-word',
                }}>
                  {renderMessageContent(m.content, isMe)}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 14px', paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        background: 'var(--color-mgp-paper)',
        borderTop: '1px solid var(--color-mgp-border-faint)',
        display: 'flex', gap: 8, flexShrink: 0,
      }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Write a message..."
          autoFocus
          style={{
            flex: 1,
            border: '1px solid var(--color-mgp-border-faint)',
            borderRadius: 20,
            padding: '10px 16px',
            fontSize: 14,
            color: 'var(--color-mgp-ink)',
            fontFamily: 'inherit',
            outline: 'none',
            background: 'var(--color-mgp-cream-warm)',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: input.trim() ? 'var(--color-mgp-cover)' : 'var(--color-mgp-cream-warm)',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            color: input.trim() ? 'var(--color-mgp-ink-inv)' : 'var(--color-mgp-ink-3)',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
