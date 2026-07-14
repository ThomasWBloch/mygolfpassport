import { readFileSync } from 'node:fs'
const clubs = JSON.parse(readFileSync('scripts/finnish-clubs-golffi.json', 'utf8'))
const names = ['Aavasaksa Golf', 'Pitkäjärvi Golf Club']
for (const c of clubs) {
  if (names.includes(c.name)) console.log(JSON.stringify(c, null, 2))
}
