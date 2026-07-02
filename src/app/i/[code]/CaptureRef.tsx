'use client'

import { useEffect } from 'react'

/**
 * Sets the referral cookie client-side when a visitor lands on /i/<code>.
 * (Server components can't set cookies during render, and crawlers/unfurlers
 * don't need it — only a real visitor who'll click through to signup does.)
 */
export default function CaptureRef({ code }: { code: string }) {
  useEffect(() => {
    if (!/^[A-Z0-9]{4,12}$/.test(code)) return
    document.cookie = `mgp_ref=${code}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`
  }, [code])
  return null
}
