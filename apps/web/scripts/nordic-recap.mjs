import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

for (const country of ['Norway', 'Sweden', 'Finland']) {
  const { data } = await supabase.from('courses')
    .select('id, club, address, website, latitude, longitude')
    .eq('country', country)
  const total = data.length
  const clubs = new Set(data.map(r => r.club)).size
  const addr = data.filter(r => r.address && r.address.trim()).length
  const web = data.filter(r => r.website && r.website.trim()).length
  const coord = data.filter(r => r.latitude && r.longitude).length
  console.log(`${country}: ${total} courses, ${clubs} clubs, ${addr} addr, ${web} web, ${coord} coord`)
}
