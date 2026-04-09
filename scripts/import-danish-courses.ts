/**
 * import-danish-courses.ts
 *
 * Fetches all Danish golf courses from GolfCourseAPI.com and upserts
 * them into the Supabase `courses` table.
 *
 * Required env vars in .env.local:
 *   GOLF_COURSE_API_KEY          – your GolfCourseAPI.com key
 *   NEXT_PUBLIC_SUPABASE_URL     – Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY    – service role key (bypasses RLS)
 *
 * Run: npx tsx scripts/import-danish-courses.ts
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@supabase/supabase-js'

// ── Load .env.local ──────────────────────────────────────────────────────────
function loadEnv(): Record<string, string> {
  const envPath = join(process.cwd(), '.env.local')
  try {
    const lines = readFileSync(envPath, 'utf-8').split('\n')
    const env: Record<string, string> = {}
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim()
    }
    return env
  } catch {
    console.error('Could not read .env.local')
    process.exit(1)
  }
}

const env = loadEnv()

const API_KEY = env['GOLF_COURSE_API_KEY']
const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL']
const SERVICE_ROLE_KEY = env['SUPABASE_SERVICE_ROLE_KEY']

if (!API_KEY) {
  console.error('❌  GOLF_COURSE_API_KEY is missing from .env.local')
  process.exit(1)
}
if (!SUPABASE_URL) {
  console.error('❌  NEXT_PUBLIC_SUPABASE_URL is missing from .env.local')
  process.exit(1)
}
if (!SERVICE_ROLE_KEY) {
  console.error('❌  SUPABASE_SERVICE_ROLE_KEY is missing from .env.local')
  console.error('   Find it in Supabase Dashboard → Project Settings → API → service_role key')
  process.exit(1)
}

// ── API types ────────────────────────────────────────────────────────────────
type ApiCourse = {
  // GolfCourseAPI.com field names (logged on first page so you can verify)
  id?: number
  club_name?: string
  course_name?: string
  name?: string
  location?: string
  address?: string
  city?: string
  state?: string
  country?: string
  country_code?: string
  latitude?: number | string
  longitude?: number | string
  lat?: number | string
  lng?: number | string
  holes?: number
  par?: number
  website?: string
  phone?: string
  phone_number?: string
  year_founded?: number
  founded?: number
  [key: string]: unknown
}

type ApiResponse = {
  courses?: ApiCourse[]
  data?: ApiCourse[]
  results?: ApiCourse[]
  total?: number
  total_count?: number
  count?: number
  page?: number
  per_page?: number
  has_more?: boolean
}

// ── Supabase row ─────────────────────────────────────────────────────────────
type CourseRow = {
  name: string
  club: string | null
  country: string
  flag: string
  address: string | null
  latitude: number | null
  longitude: number | null
  holes: number | null
  par: number | null
  website: string | null
  phone: string | null
  founded_year: number | null
  is_major: boolean
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const API_BASE = 'https://api.golfcourseapi.com/v1'
const HEADERS = { 'Authorization': `Key ${API_KEY}` }
const PER_PAGE = 50

async function fetchPage(page: number): Promise<ApiResponse> {
  const url = `${API_BASE}/courses?country=DK&per_page=${PER_PAGE}&page=${page}`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API error ${res.status}: ${body}`)
  }
  return res.json() as Promise<ApiResponse>
}

function parseCourse(c: ApiCourse): CourseRow | null {
  // Prefer course_name, fall back to name
  const name = (c.course_name ?? c.name ?? '').trim()
  if (!name) return null

  const lat = parseFloat(String(c.latitude ?? c.lat ?? ''))
  const lng = parseFloat(String(c.longitude ?? c.lng ?? ''))

  return {
    name,
    club: (c.club_name ?? null) ? (c.club_name as string).trim() : null,
    country: 'Danmark',
    flag: '🇩🇰',
    address: [c.address, c.city].filter(Boolean).join(', ') || null,
    latitude: isNaN(lat) ? null : lat,
    longitude: isNaN(lng) ? null : lng,
    holes: c.holes ?? null,
    par: c.par ?? null,
    website: c.website ?? null,
    phone: (c.phone ?? c.phone_number ?? null),
    founded_year: c.year_founded ?? c.founded ?? null,
    is_major: false,
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  console.log('🏌️  Fetching Danish golf courses from GolfCourseAPI.com...\n')

  // Fetch first page to inspect structure and get total count
  const firstPage = await fetchPage(1)

  console.log('📄 Raw first-page response keys:', Object.keys(firstPage))

  const courses: ApiCourse[] = firstPage.courses ?? firstPage.data ?? firstPage.results ?? []

  if (courses.length > 0) {
    console.log('📋 Sample course fields:', Object.keys(courses[0]))
    console.log('📋 Sample course data:', JSON.stringify(courses[0], null, 2))
  } else {
    console.error('❌ No courses array found in response. Full response:')
    console.error(JSON.stringify(firstPage, null, 2))
    process.exit(1)
  }

  const total = firstPage.total ?? firstPage.total_count ?? firstPage.count ?? courses.length
  const totalPages = Math.ceil(total / PER_PAGE)
  console.log(`\n✅ Found ${total} Danish courses across ${totalPages} page(s)\n`)

  // Collect all courses
  const allCourses: ApiCourse[] = [...courses]

  for (let page = 2; page <= totalPages; page++) {
    console.log(`   Fetching page ${page}/${totalPages}...`)
    const pageData = await fetchPage(page)
    const pageCourses = pageData.courses ?? pageData.data ?? pageData.results ?? []
    allCourses.push(...pageCourses)
    // Be polite to the API
    await new Promise(r => setTimeout(r, 200))
  }

  console.log(`\n📥 Total fetched: ${allCourses.length} courses`)

  // Map to Supabase rows
  const rows: CourseRow[] = []
  let skipped = 0
  for (const c of allCourses) {
    const row = parseCourse(c)
    if (row) rows.push(row)
    else skipped++
  }
  if (skipped > 0) console.log(`⚠️  Skipped ${skipped} courses with no name`)

  // Upsert in batches of 50 (idempotent — safe to re-run)
  const BATCH = 50
  let inserted = 0
  let errors = 0

  console.log(`\n📤 Upserting ${rows.length} rows into Supabase courses table...\n`)

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH)
    const { error } = await supabase
      .from('courses')
      .upsert(batch, { onConflict: 'name,country', ignoreDuplicates: false })

    if (error) {
      console.error(`   ❌ Batch ${Math.floor(i / BATCH) + 1} error:`, error.message)
      if (error.details) console.error('      Details:', error.details)
      errors++
    } else {
      inserted += batch.length
      console.log(`   ✅ Batch ${Math.floor(i / BATCH) + 1}: ${batch.length} rows upserted`)
    }
  }

  console.log('\n─────────────────────────────────────')
  console.log(`✅ Done. ${inserted} courses upserted, ${errors} batch error(s).`)
  if (errors > 0) {
    console.log('\n💡 If you see RLS errors, make sure SUPABASE_SERVICE_ROLE_KEY is set correctly.')
  }
}

main().catch(err => {
  console.error('\n❌ Fatal error:', err.message)
  process.exit(1)
})
