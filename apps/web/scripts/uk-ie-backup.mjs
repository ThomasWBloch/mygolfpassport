import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const all = []
for (const country of ['England','Scotland','Wales','Ireland','Northern Ireland']) {
  let from = 0
  while (true) {
    const { data } = await sb.from('courses').select('*').eq('country', country).range(from, from+999)
    all.push(...data)
    if (data.length < 1000) break
    from += 1000
  }
}
const out = '/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/courses-backup-uk-ie-pre-pass2b-2026-05-12.json'
fs.writeFileSync(out, JSON.stringify(all, null, 2))
console.log('Backed up ' + all.length + ' rows to ' + out)
