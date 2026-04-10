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
        background: '#f5e9c8', border: '1px solid #c9a84c', borderRadius: 14,
        padding: '14px 18px', fontSize: 14, fontWeight: 600, color: '#7a5a00',
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
        background: '#fff', color: '#1a5c38',
        border: '1px solid #a7d5b8', borderRadius: 14,
        padding: 16, fontSize: 16, fontWeight: 700,
        cursor: saving ? 'not-allowed' : 'pointer',
        opacity: saving ? 0.7 : 1,
        fontFamily: 'inherit',
      }}
    >
      {saving ? 'Adding…' : '🔖 Add to bucket list'}
    </button>
  )
}
