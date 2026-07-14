import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

let totalDeleted = 0

while (true) {
  // Always fetch from page 0 since we're deleting as we go
  const { data, error } = await supabase
    .from('courses')
    .select('id')
    .ilike('name', '% + %')
    .limit(500)

  if (error) { console.error(error); process.exit(1) }
  if (!data || data.length === 0) break

  const ids = data.map(c => c.id)
  const { error: delError } = await supabase
    .from('courses')
    .delete()
    .in('id', ids)

  if (delError) { console.error(delError); process.exit(1) }

  totalDeleted += ids.length
  console.log(`Deleted ${totalDeleted} so far...`)

  if (data.length < 500) break
}

console.log(`Done. Total deleted: ${totalDeleted}`)
