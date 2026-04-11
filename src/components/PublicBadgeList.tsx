'use client'

import { useState } from 'react'

const TIER_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  common:    { color: '#6b7280', bg: '#f3f4f6', border: '#d1d5db' },
  uncommon:  { color: '#1a5c38', bg: '#e8f5ee', border: '#a7d5b8' },
  rare:      { color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  legendary: { color: '#92400e', bg: '#f5e9c8', border: '#c9a84c' },
}

interface Badge {
  emoji: string
  name: string
  description: string
  tier: string
  earnedAt: string
}

export default function PublicBadgeList({ badges }: { badges: Badge[] }) {
  const [showAll, setShowAll] = useState(false)

  const rarePlus = badges.filter(b => b.tier === 'rare' || b.tier === 'legendary')
  const commonUncommon = badges.filter(b => b.tier === 'common' || b.tier === 'uncommon')
  const visible = showAll ? badges : rarePlus
  const hasHidden = commonUncommon.length > 0

  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      <div style={{ padding: '12px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Badges ({badges.length})
        </span>
        {hasHidden && (
          <button
            onClick={() => setShowAll(v => !v)}
            style={{
              background: 'none', border: 'none', fontSize: 12,
              fontWeight: 600, color: '#1a5c38', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0,
            }}
          >
            {showAll ? 'Show fewer' : `Show all ${badges.length}`}
          </button>
        )}
      </div>

      {visible.length === 0 && !showAll ? (
        <div style={{ padding: '12px 16px 16px', fontSize: 13, color: '#9ca3af' }}>
          No rare or legendary badges yet
        </div>
      ) : (
        <div style={{ padding: '0 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {visible.map(b => {
            const ts = TIER_STYLES[b.tier] ?? TIER_STYLES.common
            const isGold = b.tier === 'rare' || b.tier === 'legendary'
            return (
              <div key={b.name} style={{
                background: isGold ? '#fffbeb' : '#f9fafb',
                border: `1px solid ${ts.border}`,
                borderRadius: 10, padding: '10px 12px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{b.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: '#6b7280', marginTop: 1 }}>{b.description}</div>
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
                  color: ts.color, background: ts.bg,
                  border: `1px solid ${ts.border}`,
                  borderRadius: 5, padding: '2px 6px', flexShrink: 0,
                }}>
                  {b.tier}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
