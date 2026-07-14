// Re-assign UK courses without coordinates based on city/town names
// Run with: node --env-file=.env.local scripts/fix-uk-by-city.mjs

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const SCOTTISH = [
  'St Andrews', 'Edinburgh', 'Glasgow', 'Aberdeen', 'Inverness',
  'Dundee', 'Perth', 'Stirling', 'Fife', 'Ayrshire', 'Argyll',
  'Highlands', 'Moray', 'Angus', 'Lothian', 'Lanarkshire',
  'Renfrewshire', 'Dumfries', 'Galloway', 'Borders', 'Carnoustie',
  'Turnberry', 'Muirfield', 'Troon', 'Prestwick',
]

const WELSH = [
  'Cardiff', 'Swansea', 'Newport', 'Wrexham', 'Aberystwyth',
  'Pembroke', 'Gwynedd', 'Conwy', 'Anglesey', 'Powys',
  'Glamorgan', 'Monmouth', 'Carmarthen', 'Ceredigion', 'Porthcawl',
]

const FLAGS = {
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
}

// Fetch all England courses without coordinates
console.log('Fetching England courses without coordinates...')
const courses = []
let offset = 0
while (true) {
  const { data } = await supabase
    .from('courses')
    .select('id, name, club, address')
    .eq('country', 'England')
    .is('latitude', null)
    .range(offset, offset + 999)
  if (!data || data.length === 0) break
  courses.push(...data)
  offset += data.length
  if (data.length < 1000) break
}

console.log(`  ${courses.length} courses without coordinates\n`)

// Match against city names
const scotlandIds = []
const walesIds = []
const scotlandMatches = []
const walesMatches = []

for (const c of courses) {
  const searchText = [c.name, c.club, c.address].filter(Boolean).join(' ').toLowerCase()

  let matched = false

  for (const town of SCOTTISH) {
    if (searchText.includes(town.toLowerCase())) {
      scotlandIds.push(c.id)
      scotlandMatches.push({ name: c.name, club: c.club, matched: town })
      matched = true
      break
    }
  }

  if (matched) continue

  for (const town of WELSH) {
    if (searchText.includes(town.toLowerCase())) {
      walesIds.push(c.id)
      walesMatches.push({ name: c.name, club: c.club, matched: town })
      matched = true
      break
    }
  }
}

// Print matches
console.log(`Scotland matches (${scotlandIds.length}):`)
for (const m of scotlandMatches) {
  console.log(`  "${m.name}" [${m.club}] — matched "${m.matched}"`)
}

console.log(`\nWales matches (${walesIds.length}):`)
for (const m of walesMatches) {
  console.log(`  "${m.name}" [${m.club}] — matched "${m.matched}"`)
}

// Update Scotland
if (scotlandIds.length > 0) {
  console.log(`\nUpdating ${scotlandIds.length} courses to Scotland...`)
  for (let i = 0; i < scotlandIds.length; i += 500) {
    const batch = scotlandIds.slice(i, i + 500)
    const { error } = await supabase
      .from('courses')
      .update({ country: 'Scotland', flag: FLAGS.Scotland })
      .in('id', batch)
    if (error) console.error('  Error:', error.message)
  }
  console.log('  Done')
}

// Update Wales
if (walesIds.length > 0) {
  console.log(`\nUpdating ${walesIds.length} courses to Wales...`)
  for (let i = 0; i < walesIds.length; i += 500) {
    const batch = walesIds.slice(i, i + 500)
    const { error } = await supabase
      .from('courses')
      .update({ country: 'Wales', flag: FLAGS.Wales })
      .in('id', batch)
    if (error) console.error('  Error:', error.message)
  }
  console.log('  Done')
}

console.log(`\n${'─'.repeat(45)}`)
console.log(`Summary:`)
console.log(`  Scotland:      ${scotlandIds.length} reassigned`)
console.log(`  Wales:         ${walesIds.length} reassigned`)
console.log(`  Still England: ${courses.length - scotlandIds.length - walesIds.length}`)
