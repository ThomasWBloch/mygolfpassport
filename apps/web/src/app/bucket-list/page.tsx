import { redirect } from 'next/navigation'

/**
 * /bucket-list — legacy route. The bucket-list tab was removed (half-built,
 * not shipping v1); this thin redirect just keeps the old deep-link from
 * 404ing.
 */

export default function BucketListPage() {
  redirect('/you')
}
