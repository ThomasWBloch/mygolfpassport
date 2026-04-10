'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  userId: string
  // We affiliate the user with every course in the club
  courseIds: string[]
  initialAffiliated: boolean
}

export default function ClubAffiliationToggle({ userId, courseIds, initialAffiliated }: Props) {
  const [affiliated, setAffiliated] = useState(initialAffiliated)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function toggle() {
    if (courseIds.length === 0) return
    setLoading(true)
    if (affiliated) {
      await supabase
        .from('course_affiliations')
        .delete()
        .eq('user_id', userId)
        .in('course_id', courseIds)
    } else {
      const rows = courseIds.map(course_id => ({ user_id: userId, course_id }))
      await supabase
        .from('course_affiliations')
        .upsert(rows, { onConflict: 'user_id,course_id', ignoreDuplicates: true })
    }
    setAffiliated(!affiliated)
    setLoading(false)
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: `1px solid ${affiliated ? '#a7d5b8' : '#e5e7eb'}`,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>
          🏌️ Jeg er medlem af denne klub
        </div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
          {affiliated ? 'Du fremgår som klubmedlem' : 'Marker at du spiller fra denne klub'}
        </div>
      </div>
      <button
        onClick={toggle}
        disabled={loading}
        style={{
          background: affiliated ? '#1a5c38' : '#f3f4f6',
          border: 'none',
          borderRadius: 20,
          padding: '8px 16px',
          fontSize: 13,
          fontWeight: 700,
          color: affiliated ? '#fff' : '#374151',
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
          flexShrink: 0,
          transition: 'background 0.15s',
        }}
      >
        {affiliated ? '✓ Medlem' : 'Tilmeld mig'}
      </button>
    </div>
  )
}
