import { redirect } from 'next/navigation'

/**
 * /messages — preserved as a redirect into /social?tab=messages so existing
 * deep-links keep working after Phase 2 Trin 8 folded the inbox into the
 * /social shell. Individual conversation threads at
 * /messages/[conversation_id] remain a standalone full-screen route.
 */

export default function MessagesPage() {
  redirect('/social?tab=messages')
}
