import { redirect } from 'next/navigation'

/**
 * /bucket-list — legacy route, now a redirect into /you?tab=bucket.
 *
 * The placeholder card moved into src/app/you/YouBucketView.tsx as part
 * of Trin 7. This thin redirect keeps the deep-link landing site that
 * Trin 12 originally created (so future "add to bucket" buttons, native
 * push, share URLs etc. don't 404).
 */

export default function BucketListPage() {
  redirect('/you?tab=bucket')
}
