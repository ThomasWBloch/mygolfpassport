import type { Metadata } from 'next'

import BetaFlow from './BetaFlow'

/**
 * /beta — mobile onboarding-style guide for beta testers.
 *
 * A short link target for Messenger / mail: explains what My Golf Passport is,
 * what testers are asked to do, and gives a one-tap install button that
 * matches their phone (TestFlight on iPhone, APK on Android). Public — see
 * src/proxy.ts. Deliberately noindex: it's for invited testers, not search.
 */

export const metadata: Metadata = {
  title: 'Join the My Golf Passport beta',
  description: 'Install the My Golf Passport beta on your phone in two minutes.',
  robots: { index: false, follow: false },
}

export default function BetaPage() {
  return <BetaFlow />
}
