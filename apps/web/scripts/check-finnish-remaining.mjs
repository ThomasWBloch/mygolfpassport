import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const nonSglClubs = [
  'Bogey Kouvolan Golfkeskus', 'Holiday Club Kuusamon Golf', 'Koillisgolf',
  'Kotka Golf, P&P Koivulankenttä', 'Ladun maja', 'Lillmärsän C',
  'Parkkivuoren Golf', 'Pellonnokka Golf&Country Club', 'Peltola Golf',
  'Puijo', 'Punkalaitumen Golf ry', 'Puumala Golf', 'Rantalinna Golf',
  'Ranua Golf', 'Season Golf', 'Suomen HCP Golf', 'Suomussalmi',
  'Terola Club', 'Valkjärvi Golf Club', 'Vantaan Golfpuisto',
  'Vihajärvi Country Club', 'Viisari', 'Väntti Golf', 'W-golf mäntsälä',
  'Wenoxa golf',
]

let withCoord = 0, withoutCoord = []
for (const name of nonSglClubs) {
  const { data } = await supabase.from('courses')
    .select('id, name, latitude, longitude, address')
    .eq('country', 'Finland').eq('club', name)
  const hasAll = data.length > 0 && data.every(r => r.latitude && r.longitude)
  if (hasAll) withCoord += data.length
  else withoutCoord.push({ club: name, rows: data })
}

console.log(`Courses with coords: ${withCoord}`)
console.log(`Clubs missing coords on at least one row: ${withoutCoord.length}`)
for (const x of withoutCoord) {
  console.log(`  "${x.club}":`)
  x.rows.forEach(r => console.log(`    • ${r.name}  lat=${r.latitude}  lng=${r.longitude}  addr="${r.address||''}"`))
}
