'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

interface Props {
  courseId: string
  alreadyAdded: boolean
}

export default function BucketListButton({ courseId, alreadyAdded }: Props) {
  const [added, setAdded] = useState(alreadyAdded)
  const [saving, setSaving] = useState(false)

  async function addToBucketList() {
    setSaving(true)
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { error } = await supabase
      .from('bucket_list')
      .insert({ course_id: courseId })
    setSaving(false)
    if (!error) setAdded(true)
  }

  if (added) {
    return (
      <div style={{
        background: 'var(--color-mgp-gold-faint)',
        border: '1px solid var(--color-mgp-gold)',
        borderRadius: 8,
        padding: '14px 18px',
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 12, fontWeight: 700,
        letterSpacing: 1.5, textTransform: 'uppercase',
        color: 'var(--color-mgp-gold-dark)',
        textAlign: 'center',
      }}>
        🔖 On your bucket list ✓
      </div>
    )
  }

  return (
    <button
      onClick={addToBucketList}
      disabled={saving}
      style={{
        width: '100%',
        background: 'var(--color-mgp-paper)',
        color: 'var(--color-mgp-cover)',
        border: '0.5px solid var(--color-mgp-border)',
        borderRadius: 8,
        padding: 16,
        fontFamily: 'var(--font-mgp-stamp)',
        fontSize: 12, fontWeight: 700,
        letterSpacing: 2, textTransform: 'uppercase',
        cursor: saving ? 'not-allowed' : 'pointer',
        opacity: saving ? 0.6 : 1,
      }}
    >
      {saving ? 'Adding…' : '🔖 Add to bucket list'}
    </button>
  )
}
