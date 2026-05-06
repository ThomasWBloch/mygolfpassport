'use client'

import { useState } from 'react'

interface Props {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function CollapsibleCard({ title, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div style={{
      background: 'var(--color-mgp-paper)',
      borderRadius: 8,
      border: '0.5px solid var(--color-mgp-border)',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-mgp-body)',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mgp-display)',
          fontSize: 16, fontWeight: 500,
          color: 'var(--color-mgp-ink)',
          letterSpacing: -0.2,
        }}>{title}</span>
        <span style={{ fontSize: 12, color: 'var(--color-mgp-ink-3)' }}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={{ borderTop: '0.5px solid var(--color-mgp-border-faint)' }}>
          {children}
        </div>
      )}
    </div>
  )
}
