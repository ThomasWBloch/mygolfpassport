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
  if (diffDays === 1) return `Yesterday · ${time}`
  if (diffDays < 7) return `${d.toLocaleDateString('en-GB', { weekday: 'short' })} · ${time}`
  return `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · ${time}`
}

// ── Empty-state illustration ────────────────────────────────────────────────
// Tilted postcard: paper body with a faint address-rule pattern, dashed-red
// stamp square in the top-right corner, and a stamp-blue cancellation mark.
function PostcardIllustration() {
  return (
    <svg
      role="img"
      aria-label="Tilted postcard with stamp and cancellation mark"
      width="80"
      height="60"
      viewBox="0 0 80 60"
      style={{ display: 'inline-block' }}
    >
      <g transform="translate(40 30) rotate(-3) translate(-40 -30)">
        {/* Postcard body */}
        <rect
          x="8" y="10" width="64" height="40"
          rx="1.5"
          fill="var(--color-mgp-paper)"
          stroke="var(--color-mgp-border-faint)"
          strokeWidth="0.8"
        />

        {/* Vertical centre divider */}
        <line
          x1="40" y1="14" x2="40" y2="46"
          stroke="var(--color-mgp-border-faint)"
          strokeWidth="0.4"
          strokeDasharray="1.5 1.2"
        />

        {/* Address rules — right-half writing lines */}
        <line x1="46" y1="22" x2="68" y2="22" stroke="var(--color-mgp-border-faint)" strokeWidth="0.4" />
        <line x1="46" y1="28" x2="68" y2="28" stroke="var(--color-mgp-border-faint)" strokeWidth="0.4" />
        <line x1="46" y1="34" x2="64" y2="34" stroke="var(--color-mgp-border-faint)" strokeWidth="0.4" />
        <line x1="46" y1="40" x2="60" y2="40" stroke="var(--color-mgp-border-faint)" strokeWidth="0.4" />

        {/* Squiggle on left half — handwritten message lines */}
        <path d="M 12 18 Q 18 17 24 18 T 36 18" stroke="var(--color-mgp-ink-3)" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 12 24 Q 18 23 24 24 T 34 24" stroke="var(--color-mgp-ink-3)" strokeWidth="0.5" fill="none" strokeLinecap="round" />
        <path d="M 12 30 Q 18 29 24 30 T 36 30" stroke="var(--color-mgp-ink-3)" strokeWidth="0.5" fill="none" strokeLinecap="round" />

        {/* Stamp square — top-right corner */}
        <rect
          x="58" y="14" width="12" height="14"
          fill="var(--color-mgp-cream-warm)"
          stroke="var(--color-mgp-stamp-red)"
          strokeWidth="0.7"
          strokeDasharray="1.2 0.9"
        />
        <text
          x="64" y="23"
          textAnchor="middle"
          fontFamily="var(--font-mgp-stamp)"
          fontSize="6"
          fill="var(--color-mgp-stamp-red)"
          fontWeight="700"
        >M</text>

        {/* Cancellation circle — overlapping the stamp */}
        <circle
          cx="56" cy="26" r="6"
          fill="none"
          stroke="var(--color-mgp-stamp-blue)"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <circle
          cx="56" cy="26" r="4"
          fill="none"
          stroke="var(--color-mgp-stamp-blue)"
          strokeWidth="0.5"
          opacity="0.6"
        />
      </g>
    </svg>
  )
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
  const otherFirstName = otherName.split(' ').filter(Boolean)[0] ?? otherName

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
  const hasInput = !!input.trim()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-mgp-cream)', ...font }}>

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

      {/* Messages — scrapbook-page surface. overflowX hidden so the rotated
          postcard bubbles below don't poke out and force horizontal scroll. */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
        background: 'var(--color-mgp-cream)',
      }}>
        {messages.length === 0 && (
          <div style={{
            margin: '40px auto 0',
            maxWidth: 320,
            background: 'var(--color-mgp-paper)',
            border: '0.5px solid var(--color-mgp-border-faint)',
            borderRadius: 8,
            padding: '32px 20px 28px',
            textAlign: 'center',
          }}>
            <PostcardIllustration />
            <div style={{
              marginTop: 14,
              fontFamily: 'var(--font-mgp-stamp)',
              fontSize: 9,
              letterSpacing: 2,
              textTransform: 'uppercase',
              color: 'var(--color-mgp-ink-3)',
              marginBottom: 6,
            }}>
              Begin your correspondence
            </div>
            <div style={{
              fontFamily: 'var(--font-mgp-display)',
              fontSize: 20,
              fontWeight: 500,
              color: 'var(--color-mgp-ink)',
              letterSpacing: -0.2,
              marginBottom: 8,
            }}>
              Send your first message
            </div>
            <div style={{
              fontSize: 13,
              color: 'var(--color-mgp-ink-2)',
              lineHeight: 1.5,
            }}>
              Type below to begin chatting with {otherFirstName}.
            </div>
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  margin: '18px 0',
                }}>
                  <div style={{
                    flex: 1,
                    height: 0,
                    borderTop: '1px dashed var(--color-mgp-border-faint)',
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-mgp-stamp)',
                    fontSize: 9,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    color: 'var(--color-mgp-ink-3)',
                    whiteSpace: 'nowrap',
                  }}>
                    {formatTime(m.createdAt)}
                  </span>
                  <div style={{
                    flex: 1,
                    height: 0,
                    borderTop: '1px dashed var(--color-mgp-border-faint)',
                  }} />
                </div>
              )}
              <div style={{
                display: 'flex',
                justifyContent: isMe ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: 4,
                  boxShadow: '0 2px 6px rgba(15, 37, 25, 0.08)',
                  background: isMe ? 'var(--color-mgp-cover)' : 'var(--color-mgp-paper)',
                  color: isMe ? 'var(--color-mgp-cream-warm)' : 'var(--color-mgp-ink)',
                  border: isMe
                    ? '1px dashed var(--color-mgp-gold)'
                    : '0.5px solid var(--color-mgp-border-faint)',
                  transform: isMe ? 'rotate(0.8deg)' : 'rotate(-0.8deg)',
                  fontFamily: 'var(--font-mgp-body)',
                  fontSize: 14,
                  lineHeight: 1.5,
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
          disabled={!hasInput || sending}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: hasInput ? 'var(--color-mgp-gold)' : 'var(--color-mgp-cream-warm)',
            border: 'none',
            cursor: hasInput ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: hasInput ? 'var(--color-mgp-cover)' : 'var(--color-mgp-ink-3)',
            flexShrink: 0,
            boxShadow: hasInput ? '0 4px 12px rgba(201, 168, 76, 0.4)' : 'none',
            transition: 'background 0.15s, box-shadow 0.15s',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
