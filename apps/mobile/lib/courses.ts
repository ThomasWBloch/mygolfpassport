import { normalizeSearch } from './friends';
import { supabase } from './supabase';

export type Course = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  holes: number | null;
  flag: string | null;
};

const COURSE_FIELDS = 'id, name, club, country, state, holes, flag';
// Matches web's CourseBrowser: fetch a generous raw-row pool once, then
// group/paginate by club client-side (see lib/course-groups.ts and
// components/CourseGroupList.tsx) instead of re-querying per page.
const RAW_ROW_LIMIT = 2000;

export async function fetchCourses(country?: string | null): Promise<Course[]> {
  let qb = supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .order('name')
    .limit(RAW_ROW_LIMIT);

  if (country) qb = qb.eq('country', country);

  const { data, error } = await qb;
  if (error) throw error;
  return data ?? [];
}

// PostgREST's .or() filter string treats , ( ) as syntax — strip them so a
// query containing e.g. "St. Andrews (Old)" can't produce a malformed
// filter. Not a security boundary (courses is publicly readable either
// way), just avoids confusing empty-result errors.
function sanitizeForIlikeFilter(query: string): string {
  return query.replace(/[,()]/g, ' ').trim();
}

/**
 * ILIKE only matches literal substrings, and course/club names in this
 * dataset are inconsistent about abbreviation periods — e.g. "St Andrews
 * Links" (Scotland, no period) vs "Larters at St. Andrews Golf and
 * Country Club" (Canada, has one). Searching "st. andrews" only matched
 * the period-normalized column, silently missing the famous course. Try
 * the query as typed AND a period-stripped variant so either data shape
 * matches, instead of trying to normalize one canonical form.
 */
function buildSearchPatterns(query: string): string[] {
  const base = sanitizeForIlikeFilter(query);
  if (base.length === 0) return [];
  const noPeriods = base.replace(/\./g, '').replace(/\s+/g, ' ').trim();
  return noPeriods.length > 0 && noPeriods !== base ? [base, noPeriods] : [base];
}

export type CourseRatingSummary = { avgRating: number; ratingCount: number };

// One query against the course_rating_summary view (aggregated from
// public.rounds — see the 20260802 migration), keyed by course_id, so the
// browse/search list can show an average rating per row without an N+1
// query per course.
export async function fetchCourseRatingSummaries(): Promise<Map<string, CourseRatingSummary>> {
  const { data, error } = await supabase
    .from('course_rating_summary')
    .select('course_id, avg_rating, rating_count');
  if (error) throw error;

  const map = new Map<string, CourseRatingSummary>();
  for (const row of data ?? []) {
    // Postgres `numeric` comes back from PostgREST as a string, not a JSON
    // number — coerce explicitly so callers can safely call .toFixed() etc.
    map.set(row.course_id, { avgRating: Number(row.avg_rating), ratingCount: Number(row.rating_count) });
  }
  return map;
}

export async function searchCourses(query: string, country?: string | null): Promise<Course[]> {
  const patterns = buildSearchPatterns(normalizeSearch(query));
  if (patterns.length === 0) return [];

  const orClauses = patterns.flatMap((p) => [`name_normalized.ilike.%${p}%`, `club_normalized.ilike.%${p}%`]).join(',');

  let qb = supabase
    .from('courses')
    .select(COURSE_FIELDS)
    .eq('is_displayed', true)
    .or(orClauses)
    .order('name')
    .limit(RAW_ROW_LIMIT);

  if (country) qb = qb.eq('country', country);

  const { data, error } = await qb;
  if (error) throw error;
  return data ?? [];
}

export type ClubResult = {
  club: string;
  country: string | null;
  flag: string | null;
};

/**
 * Home-club autocomplete for the Edit Profile screen — same
 * club_normalized ilike + dedupe-by-club + home-country-first sort as
 * apps/web/src/components/ProfileEditClient.tsx's searchClubs.
 */
export async function searchClubs(query: string, homeCountry: string | null): Promise<ClubResult[]> {
  const normalized = normalizeSearch(query);
  if (normalized.length < 2) return [];

  // Same period-inconsistency issue as searchCourses — try both the typed
  // query and a period-stripped variant against club_normalized.
  const noPeriods = normalized.replace(/\./g, '').replace(/\s+/g, ' ').trim();
  const clubPatterns = noPeriods.length > 0 && noPeriods !== normalized ? [normalized, noPeriods] : [normalized];
  const orClauses = clubPatterns.map((p) => `club_normalized.ilike.%${p}%`).join(',');

  const { data, error } = await supabase
    .from('courses')
    .select('club, country, flag')
    .or(orClauses)
    .not('club', 'is', null)
    .not('is_displayed', 'is', false)
    .order('club')
    .limit(100);

  if (error) throw error;

  const seen = new Set<string>();
  const unique: ClubResult[] = [];
  for (const row of data ?? []) {
    if (!row.club) continue;
    const key = row.club.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push({ club: row.club, country: row.country, flag: row.flag });
  }

  unique.sort((a, b) => {
    if (homeCountry) {
      const aHome = a.country === homeCountry ? 0 : 1;
      const bHome = b.country === homeCountry ? 0 : 1;
      if (aHome !== bHome) return aHome - bHome;
    }
    const aStarts = normalizeSearch(a.club).startsWith(normalized) ? 0 : 1;
    const bStarts = normalizeSearch(b.club).startsWith(normalized) ? 0 : 1;
    if (aStarts !== bStarts) return aStarts - bStarts;
    return a.club.localeCompare(b.club);
  });

  return unique.slice(0, 8);
}

type PlayedCourseRow = { courses: Course | Course[] | null };

/**
 * Same rounds+courses join shape as fetchPlayedCoursesCount in
 * lib/profile.ts (parent_round_id IS NULL, dedupe by course_id) — this
 * version selects the full course row instead of just counting.
 */
export async function fetchPlayedCourses(userId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('rounds')
    .select(`courses(${COURSE_FIELDS})`)
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .returns<PlayedCourseRow[]>();

  if (error) throw error;

  const seen = new Set<string>();
  const courses: Course[] = [];
  for (const row of data ?? []) {
    const course = Array.isArray(row.courses) ? row.courses[0] : row.courses;
    if (course && !seen.has(course.id)) {
      seen.add(course.id);
      courses.push(course);
    }
  }
  return courses.sort((a, b) => a.name.localeCompare(b.name));
}

export type NearbyCourse = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  flag: string | null;
  distanceKm: number;
  played: boolean;
  latitude: number;
  longitude: number;
};

// Same haversine formula as apps/web/src/app/api/courses/nearby/route.ts.
function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type NearbyRow = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  flag: string | null;
  latitude: number | null;
  longitude: number | null;
};

/**
 * Web's version is a Next.js API route reading cookie-based auth; mobile
 * has no server route to call, so this ports the same bounding-box +
 * haversine + played-exclusion logic directly against Supabase.
 */
export async function fetchNearbyCourses(
  userId: string,
  lat: number,
  lng: number,
  limit = 5,
  includePlayed = false
): Promise<NearbyCourse[]> {
  const latDelta = 1.0; // ~111km
  const lngDelta = 2.0; // ~111km * cos(lat), generous for northern Europe

  const [{ data: nearby, error }, { data: playedRows, error: playedError }] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, state, flag, latitude, longitude')
      .eq('is_displayed', true)
      .gte('latitude', lat - latDelta)
      .lte('latitude', lat + latDelta)
      .gte('longitude', lng - lngDelta)
      .lte('longitude', lng + lngDelta)
      .limit(500)
      .returns<NearbyRow[]>(),
    supabase.from('rounds').select('course_id').eq('user_id', userId),
  ]);
  if (error) throw error;
  if (playedError) throw playedError;

  const playedIds = new Set((playedRows ?? []).map((r) => r.course_id as string));

  return (nearby ?? [])
    .filter((c) => c.latitude != null && c.longitude != null)
    .filter((c) => includePlayed || !playedIds.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      club: c.club,
      country: c.country,
      state: c.state,
      flag: c.flag,
      distanceKm: Math.round(haversineKm(lat, lng, c.latitude as number, c.longitude as number) * 10) / 10,
      played: playedIds.has(c.id),
      latitude: c.latitude as number,
      longitude: c.longitude as number,
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}

type LastRoundCourseRow = { latitude: number | null; longitude: number | null };
type LastRoundRow = { courses: LastRoundCourseRow | LastRoundCourseRow[] | null };

/**
 * Fallback reference point for "Courses near you" when device geolocation
 * is denied/unavailable. Intentionally native-only — see memory
 * project_log_nearby_fallback: web deliberately has no fallback because
 * browser geolocation denial is a much weaker signal than a native permission
 * denial, but this was always meant to ship on the native build once built.
 */
export async function fetchLastRoundCoords(userId: string): Promise<{ lat: number; lng: number } | null> {
  const { data, error } = await supabase
    .from('rounds')
    .select('created_at, courses(latitude, longitude)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .returns<LastRoundRow[]>();
  if (error) throw error;

  const row = data?.[0];
  const course = Array.isArray(row?.courses) ? row?.courses[0] : row?.courses;
  if (!course?.latitude || !course?.longitude) return null;
  return { lat: course.latitude, lng: course.longitude };
}

/** Lightweight single-course fetch — used by the Log flow to prefill a
 * course when arriving via `/log?course=<id>` (e.g. from the course detail
 * screen's "Log new round" / "Stamp here" actions). */
export async function fetchCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase.from('courses').select(COURSE_FIELDS).eq('id', id).maybeSingle();
  if (error) throw error;
  return data;
}

export type CourseDetail = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  state: string | null;
  flag: string | null;
  holes: number | null;
  par: number | null;
  website: string | null;
  phone: string | null;
  address: string | null;
  foundedYear: number | null;
  isMajor: boolean;
  latitude: number | null;
  longitude: number | null;
};

export type CourseVisit = {
  hasAnyRound: boolean;
  roundCount: number;
  latestPlayedAt: string | null;
  earliestPlayedAt: string | null;
  userRating: number | null;
  userNote: string | null;
  /** The most recent top-level round's id — lets the course-detail screen
   * link straight to editing it, instead of only being reachable via the
   * You tab's Courses accordion. Null when the user hasn't played here. */
  roundId: string | null;
};

export type CourseReview = {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
  rating: number | null;
  note: string | null;
  playedAt: string | null;
};

export type CourseDetailResult = {
  course: CourseDetail;
  avgRating: number | null;
  ratingCount: number;
  visit: CourseVisit;
  reviews: CourseReview[];
  top100: { rank: number; listName: string | null } | null;
};

type UserRoundRow = { id: string; rating: number | null; note: string | null; played_at: string | null; created_at: string; parent_round_id: string | null };
type ReviewRoundRow = { user_id: string; rating: number | null; note: string | null; played_at: string | null };

/**
 * Ported from apps/web/src/app/courses/[id]/page.tsx — course hero data,
 * rating summary, the viewer's own visit/stamp status, and reviews from
 * other users. Club-members / friends-who-played / others-who-played
 * accordions are deliberately not ported yet (bigger social-list feature,
 * see apps/mobile/STATUS.md).
 */
export async function fetchCourseDetail(courseId: string, userId: string): Promise<CourseDetailResult> {
  const [courseRes, ratingsRes, userRoundsRes, top100Res, courseRoundsRes] = await Promise.all([
    supabase
      .from('courses')
      .select('id, name, club, country, state, flag, is_major, holes, par, website, phone, address, founded_year, latitude, longitude')
      .eq('id', courseId)
      .single(),
    supabase.from('rounds').select('rating').eq('course_id', courseId).not('rating', 'is', null),
    supabase
      .from('rounds')
      .select('id, rating, note, played_at, created_at, parent_round_id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false })
      .returns<UserRoundRow[]>(),
    supabase.from('top100_rankings').select('rank, list_name').eq('course_id', courseId).order('year', { ascending: false }).limit(1),
    supabase
      .from('rounds')
      .select('user_id, rating, note, played_at')
      .eq('course_id', courseId)
      .is('parent_round_id', null)
      .order('played_at', { ascending: false })
      .returns<ReviewRoundRow[]>(),
  ]);
  if (courseRes.error) throw courseRes.error;
  const c = courseRes.data;

  const rawRatings = (ratingsRes.data ?? []).map((r) => r.rating as number);
  const avgRating = rawRatings.length > 0 ? rawRatings.reduce((a, b) => a + b, 0) / rawRatings.length : null;

  const userAnyRounds = userRoundsRes.data ?? [];
  const userPrimaryRounds = userAnyRounds.filter((r) => r.parent_round_id == null);
  const latestAnyRound = userAnyRounds[0] ?? null;
  const earliestAnyRound = userAnyRounds[userAnyRounds.length - 1] ?? null;

  const visit: CourseVisit = {
    hasAnyRound: userAnyRounds.length > 0,
    roundCount: userPrimaryRounds.length,
    latestPlayedAt: latestAnyRound ? (latestAnyRound.played_at ?? latestAnyRound.created_at) : null,
    earliestPlayedAt: earliestAnyRound ? (earliestAnyRound.played_at ?? earliestAnyRound.created_at) : null,
    userRating: userPrimaryRounds[0]?.rating ?? null,
    userNote: userPrimaryRounds[0]?.note ?? null,
    roundId: userPrimaryRounds[0]?.id ?? null,
  };

  // Reviews: everyone but the viewer, with a rating or a note, deduped to
  // one row per user (latest visit kept — courseRoundsRes is played_at desc).
  const seenReviewers = new Set<string>();
  const roundRows = (courseRoundsRes.data ?? []).filter((r) => {
    if (r.user_id === userId) return false;
    if (r.rating == null && r.note == null) return false;
    if (seenReviewers.has(r.user_id)) return false;
    seenReviewers.add(r.user_id);
    return true;
  });

  const reviewerIds = roundRows.map((r) => r.user_id);
  const profilesRes =
    reviewerIds.length > 0
      ? await supabase.from('profiles').select('id, full_name, avatar_url').in('id', reviewerIds)
      : { data: [] as { id: string; full_name: string | null; avatar_url: string | null }[] };

  const profileMap = new Map(
    (profilesRes.data ?? []).map((p) => [p.id, { fullName: p.full_name ?? 'Golfer', avatarUrl: p.avatar_url ?? null }])
  );

  const reviews: CourseReview[] = roundRows.map((r) => ({
    userId: r.user_id,
    fullName: profileMap.get(r.user_id)?.fullName ?? 'Golfer',
    avatarUrl: profileMap.get(r.user_id)?.avatarUrl ?? null,
    rating: r.rating,
    note: r.note,
    playedAt: r.played_at,
  }));

  const top100Row = (top100Res.data ?? [])[0] ?? null;

  return {
    course: {
      id: c.id,
      name: c.name,
      club: c.club,
      country: c.country,
      state: c.state,
      flag: c.flag,
      holes: c.holes,
      par: c.par,
      website: c.website,
      phone: c.phone,
      address: c.address,
      foundedYear: c.founded_year,
      isMajor: !!c.is_major,
      latitude: c.latitude,
      longitude: c.longitude,
    },
    avgRating,
    ratingCount: rawRatings.length,
    visit,
    reviews,
    top100: top100Row ? { rank: top100Row.rank, listName: top100Row.list_name } : null,
  };
}

export const REPORT_TYPE_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'name', label: 'Name is wrong / misspelled' },
  { value: 'website', label: 'Website is wrong / outdated' },
  { value: 'phone', label: 'Phone is wrong' },
  { value: 'address', label: 'Address / location is wrong' },
  { value: 'location', label: 'Location of club is wrong (map pin)' },
  { value: 'holes_par', label: 'Holes or par is wrong' },
  { value: 'duplicate', label: 'This is a duplicate of another course' },
  { value: 'other', label: 'Something else' },
];

const REPORT_MAX_MESSAGE_LEN = 500;
const REPORT_URL_REGEX = /^https?:\/\/[^\s]{3,}$/i;

/**
 * Ported from apps/web/src/app/api/courses/[id]/report/route.ts. Web calls
 * this via a Next.js API route wrapping the user's cookie session; mobile
 * has no server route, so this calls the same submit_course_edit() RPC
 * directly with the client's authenticated session — identical auth/rate
 * limit enforcement happens server-side inside the RPC either way. Never
 * touches the courses table directly, only inserts into
 * public.course_edit_submissions via the RPC.
 */
export async function submitCourseEdit(
  courseId: string,
  type: string,
  message: string,
  sourceUrl: string | null
): Promise<void> {
  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) throw new Error('Please describe what should change.');
  if (trimmedMessage.length > REPORT_MAX_MESSAGE_LEN) {
    throw new Error(`Message is too long (max ${REPORT_MAX_MESSAGE_LEN} characters).`);
  }
  const trimmedUrl = sourceUrl?.trim() || null;
  if (trimmedUrl !== null && !REPORT_URL_REGEX.test(trimmedUrl)) {
    throw new Error('Source URL must start with http:// or https://');
  }

  const { error } = await supabase.rpc('submit_course_edit', {
    p_course_id: courseId,
    p_type: type,
    p_message: trimmedMessage,
    p_source_url: trimmedUrl,
  });

  if (error) {
    if (error.message.includes('rate_limit_user')) {
      throw new Error("You've submitted the limit (5) of edit suggestions in the last 24 hours. Please try again tomorrow.");
    }
    if (error.message.includes('rate_limit_course')) {
      throw new Error('This course has reached its daily submission limit. Please try again tomorrow.');
    }
    if (error.message.includes('unauthorized')) {
      throw new Error('Unauthorized');
    }
    throw new Error('Could not submit. Please try again.');
  }
}

// ── Course social sections: club members / friends played / others played ──

export type GolferEntry = {
  userId: string;
  fullName: string;
  handicap: number | null;
  courseCount: number;
  countryCount: number;
  badgeCount: number;
};

type ClubMemberRow = { id: string; full_name: string | null; handicap: number | null };
type CourseRoundRow = { user_id: string; played_at: string | null };
type ProfileLiteRow = { id: string; full_name: string | null; handicap: number | null };
type FriendshipIdsRow = { user_id: string; friend_id: string };
type UserAllRoundRow = {
  user_id: string;
  course_id: string;
  courses: { country: string | null; is_major: boolean } | { country: string | null; is_major: boolean }[] | null;
};

/**
 * Ported from apps/web/src/app/courses/[id]/page.tsx (single course) and
 * apps/web/src/app/clubs/[country]/[club]/page.tsx (all of a club's
 * courses) — "Members of {club}" (home_club-based), "Friends who've
 * played" and "Others who've played" (everyone else, both deduped to one
 * row per user, latest visit kept). badgeCount here is the same crude
 * course/country/major/top100 threshold heuristic the web pages use
 * inline (not a real user_badges query) so the two apps show identical
 * numbers on this list.
 */
export async function fetchCourseSocial(
  courseIds: string[],
  userId: string,
  courseClub: string | null
): Promise<{ clubMembers: GolferEntry[]; friendRounds: GolferEntry[]; others: GolferEntry[] }> {
  const [clubMembersRes, courseRoundsRes, friendshipsRes] = await Promise.all([
    courseClub
      ? supabase.from('profiles').select('id, full_name, handicap').ilike('home_club', courseClub).eq('show_in_search', true).returns<ClubMemberRow[]>()
      : Promise.resolve({ data: [] as ClubMemberRow[], error: null }),
    supabase
      .from('rounds')
      .select('user_id, played_at')
      .in('course_id', courseIds)
      .is('parent_round_id', null)
      .order('played_at', { ascending: false })
      .returns<CourseRoundRow[]>(),
    supabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${userId},friend_id.eq.${userId}`)
      .eq('status', 'accepted')
      .returns<FriendshipIdsRow[]>(),
  ]);
  if (clubMembersRes.error) throw clubMembersRes.error;
  if (courseRoundsRes.error) throw courseRoundsRes.error;
  if (friendshipsRes.error) throw friendshipsRes.error;

  const seenRoundUsers = new Set<string>();
  const roundRows = (courseRoundsRes.data ?? []).filter((r) => {
    if (seenRoundUsers.has(r.user_id)) return false;
    seenRoundUsers.add(r.user_id);
    return true;
  });
  const roundUserIds = roundRows.map((r) => r.user_id);

  const clubMemberRows = (clubMembersRes.data ?? []).filter((p) => p.id !== userId);
  const clubMemberIds = clubMemberRows.map((p) => p.id);

  const allUserIds = [...new Set([...roundUserIds, ...clubMemberIds])];

  const [profileRowsRes, userAllRoundsRes] = await Promise.all([
    allUserIds.length > 0
      ? supabase.from('profiles').select('id, full_name, handicap').in('id', allUserIds).returns<ProfileLiteRow[]>()
      : Promise.resolve({ data: [] as ProfileLiteRow[], error: null }),
    allUserIds.length > 0
      ? supabase
          .from('rounds')
          .select('user_id, course_id, courses(country, is_major)')
          .in('user_id', allUserIds)
          .is('parent_round_id', null)
          .returns<UserAllRoundRow[]>()
      : Promise.resolve({ data: [] as UserAllRoundRow[], error: null }),
  ]);
  if (profileRowsRes.error) throw profileRowsRes.error;
  if (userAllRoundsRes.error) throw userAllRoundsRes.error;

  const profileMap = new Map((profileRowsRes.data ?? []).map((p) => [p.id, { fullName: p.full_name ?? 'Anonym', handicap: p.handicap }]));

  const userAllRounds = userAllRoundsRes.data ?? [];
  const allPlayedCourseIds = [...new Set(userAllRounds.map((r) => r.course_id))];
  const top100SocialRes =
    allPlayedCourseIds.length > 0
      ? await supabase.from('top100_rankings').select('course_id').in('course_id', allPlayedCourseIds)
      : { data: [] as { course_id: string }[] };
  const top100SocialSet = new Set((top100SocialRes.data ?? []).map((r) => r.course_id));

  function computeUserStats(uid: string) {
    const rounds = userAllRounds.filter((r) => r.user_id === uid);
    const cIds = [...new Set(rounds.map((r) => r.course_id))];
    const courseCount = cIds.length;
    const countryCount = new Set(
      rounds.map((r) => (Array.isArray(r.courses) ? r.courses[0]?.country : r.courses?.country)).filter(Boolean)
    ).size;
    const hasPlayedMajor = rounds.some((r) => (Array.isArray(r.courses) ? r.courses[0]?.is_major : r.courses?.is_major));
    const hasTop100 = cIds.some((cid) => top100SocialSet.has(cid));
    let badgeCount = 0;
    if (courseCount >= 1) badgeCount++;
    if (countryCount >= 2) badgeCount++;
    if (courseCount >= 10) badgeCount++;
    if (countryCount >= 5) badgeCount++;
    if (courseCount >= 50) badgeCount++;
    if (courseCount >= 100) badgeCount++;
    if (hasPlayedMajor) badgeCount++;
    if (hasTop100) badgeCount++;
    return { courseCount, countryCount, badgeCount };
  }

  const friendIds = new Set((friendshipsRes.data ?? []).map((f) => (f.user_id === userId ? f.friend_id : f.user_id)));

  const clubMembers: GolferEntry[] = clubMemberIds.map((uid) => {
    const p = profileMap.get(uid) ?? { fullName: 'Anonym', handicap: null };
    return { userId: uid, ...p, ...computeUserStats(uid) };
  });

  const friendRounds: GolferEntry[] = roundRows
    .filter((r) => friendIds.has(r.user_id))
    .map((r) => {
      const uid = r.user_id;
      const p = profileMap.get(uid) ?? { fullName: 'Friend', handicap: null };
      return { userId: uid, ...p, ...computeUserStats(uid) };
    });

  const others: GolferEntry[] = roundRows
    .filter((r) => r.user_id !== userId && !friendIds.has(r.user_id))
    .map((r) => {
      const uid = r.user_id;
      const p = profileMap.get(uid) ?? { fullName: 'Anonym', handicap: null };
      return { userId: uid, ...p, ...computeUserStats(uid) };
    });

  return { clubMembers, friendRounds, others };
}
