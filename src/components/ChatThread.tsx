'use client'

import { useState, useEffect, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'

interface Message {
  id: string
  senderId: string
  content: string
  createdAt: string
}

interface Props {
  conversationId: string
  currentUserId: string
  otherName: string
  otherAvatarUrl: string | null
  initialMessages: Message[]
}

function getAvatarColor(name: string): string {
  const colors = ['#1a5c38', '#c9a84c', '#2563eb', '#7c3aed', '#dc2626', '#0891b2', '#be185d', '#059669']
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  const time = d.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })

  if (diffDays === 0) return time
  if (diffDays === 1) return `I går ${time}`
  if (diffDays < 7) return `${d.toLocaleDateString('da-DK', { weekday: 'short' })} ${time}`
  return `${d.toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })} ${time}`
}

export default function ChatThread({ conversationId, currentUserId, otherName, otherAvatarUrl, initialMessages }: Props) {
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
            style={{ color: isMe ? '#a7d5b8' : '#1a5c38', textDecoration: 'underline', wordBreak: 'break-all' }}
          >
            {part}
          </a>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  const font = { fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#f2f4f0', ...font }}>

      {/* Header */}
      <div style={{
        background: '#1a5c38', padding: '14px 18px 12px',
        display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0,
      }}>
        <Link href="/messages" style={{ color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none', flexShrink: 0 }}>
          ← Back
        </Link>
        {otherAvatarUrl ? (
          <img src={otherAvatarUrl} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        ) : (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: getAvatarColor(otherName),
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>
            {otherInitials}
          </div>
        )}
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{otherName}</span>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '16px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, marginTop: 40 }}>
            Start samtalen — skriv en besked!
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
        background: '#fff', borderTop: '1px solid #e5e7eb',
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
            flex: 1, border: '1px solid #e5e7eb', borderRadius: 20,
            padding: '10px 16px', fontSize: 14, color: '#1a1a1a',
            fontFamily: 'inherit', outline: 'none', background: '#fafafa',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || sending}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: input.trim() ? '#1a5c38' : '#e5e7eb',
            border: 'none', cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#fff', flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
