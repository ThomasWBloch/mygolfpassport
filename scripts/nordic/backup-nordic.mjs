import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const all = []
for (const country of ['Denmark','Iceland','Norway','Sweden']) {
  let from = 0
  while (true) {
    const { data, error } = await sb.from('courses').select('*').eq('country', country).range(from, from+999)
    if (error) throw error
    all.push(...data)
    if (data.length < 1000) break
    from += 1000
  }
}
const ts = new Date().toISOString().slice(0,10)
const out = `/sessions/vibrant-busy-mendel/mnt/mygolfpassport/scripts/nordic/courses-backup-nordic-pre-pass2b-${ts}.json`
fs.writeFileSync(out, JSON.stringify(all, null, 2))
console.log(`Backed up ${all.length} rows to ${out}`)
