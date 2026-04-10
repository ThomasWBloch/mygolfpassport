'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  userId: string
  courseId: string
  initialAffiliated: boolean
}

export default function CourseAffiliationToggle({ userId, courseId, initialAffiliated }: Props) {
  const [affiliated, setAffiliated] = useState(initialAffiliated)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function toggle() {
    setLoading(true)
    if (affiliated) {
      await supabase
        .from('course_affiliations')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId)
    } else {
      await supabase
        .from('course_affiliations')
        .insert({ user_id: userId, course_id: courseId })
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
          🏌️ I'm affiliated with this course
        </div>
        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 3 }}>
          {affiliated ? 'You are marked as a club member here' : 'Mark that you play from this club'}
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
        {affiliated ? '✓ Tilknyttet' : 'Tilknyt mig'}
      </button>
    </div>
  )
}
