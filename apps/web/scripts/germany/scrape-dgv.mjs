// DGV GraphQL scrape — Tyskland
// Schema: Relay-style with first/after pagination

import fs from 'fs'

const ENDPOINT = 'https://api.golf.de/data/v1/graphql'
const PAGE_SIZE = 50

const QUERY = `
query Clubs($first: Int!, $after: String) {
  clubs(first: $first, after: $after) {
    pageInfo { endCursor hasNextPage }
    nodes {
      id clubNumber shortName longName
      houseAddressStreet houseAddressZipCode houseAddressCity houseAddressCountry
      email1 email2 phone1 phone2 website
      countryCode golfdeUrl
    }
  }
}`

async function fetchPage(after) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'mygolfpassport/1.0' },
    body: JSON.stringify({ query: QUERY, variables: { first: PAGE_SIZE, after } }),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  const j = await r.json()
  if (j.errors) throw new Error(JSON.stringify(j.errors))
  return j.data.clubs
}

const all = []
let cursor = null
while (true) {
  const page = await fetchPage(cursor)
  all.push(...page.nodes)
  if (all.length % 250 === 0 || !page.pageInfo.hasNextPage) console.log(`  fetched ${all.length}`)
  if (!page.pageInfo.hasNextPage) break
  cursor = page.pageInfo.endCursor
  await new Promise(r => setTimeout(r, 100))
}

const out = '/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/germany/dgv-clubs-2026-05-12.json'
fs.writeFileSync(out, JSON.stringify(all, null, 2))
console.log(`\nSaved ${all.length} clubs to ${out}`)
console.log('\nSample[0]:')
console.log(JSON.stringify(all[0], null, 2))
