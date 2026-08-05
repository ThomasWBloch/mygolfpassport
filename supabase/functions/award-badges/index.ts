// supabase/functions/award-badges/index.ts
//
// Awards XP and any newly-earned badges after the calling user logs a
// round. Ported from apps/web/src/lib/badges.ts (awardXP/awardCourseXP/
// checkAndAwardBadges/fetchUserData/evaluateCriteria) + apps/web/src/lib/
// continents.ts (getContinent) — deployed as an Edge Function (not a
// plpgsql RPC) for the same reason as delete-round: this business logic
// needed to be ported near-verbatim from TypeScript, not re-implemented
// in SQL, to avoid silently diverging from web's behavior.
//
// Why this exists: web's LogForm.tsx calls checkAndAwardBadges directly
// after logging a round, but mobile's log flow never did — mobile users
// were logging rounds without ever earning badges or XP. Discovered
// 2026-08-02 checking a tester's account (13 countries + 2 US states
// played, zero badges earned since well before that data existed).
//
// Deployed to the twqsuitdrczohozgpdlr project via the Supabase MCP's
// deploy_edge_function tool — this file is kept in the repo for version
// control; re-deploy by pushing its contents again if it ever drifts.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Continents (ported from apps/web/src/lib/continents.ts) ────────────────

type ContinentKey = "na" | "sa" | "eu" | "af" | "as" | "oc";

const CONTINENT_LABELS: Record<ContinentKey, string> = {
  na: "North America",
  sa: "South America",
  eu: "Europe",
  af: "Africa",
  as: "Asia",
  oc: "Oceania",
};

const COUNTRY_TO_CONTINENT: Record<string, ContinentKey> = {
  Algeria: "af", Angola: "af", Benin: "af", Botswana: "af", Burundi: "af", Cameroon: "af", Chad: "af",
  Egypt: "af", "Equatorial Guinea": "af", Ethiopia: "af", Ghana: "af", Kenya: "af", Madagascar: "af",
  Malawi: "af", Mauritius: "af", Morocco: "af", Mozambique: "af", Namibia: "af", Nigeria: "af",
  Rwanda: "af", Senegal: "af", Seychelles: "af", "Sierra Leone": "af", "South Africa": "af",
  Tanzania: "af", Togo: "af", Tunisia: "af", Uganda: "af", Zambia: "af", Zimbabwe: "af",

  Afghanistan: "as", Azerbaijan: "as", Bahrain: "as", Bangladesh: "as", Bhutan: "as", Brunei: "as",
  Cambodia: "as", China: "as", Georgia: "as", "Hong Kong": "as", India: "as", Indonesia: "as",
  Iran: "as", Israel: "as", Japan: "as", Jordan: "as", Kazakhstan: "as", Kuwait: "as", Laos: "as",
  Lebanon: "as", Macau: "as", Malaysia: "as", Maldives: "as", Myanmar: "as", Oman: "as", Pakistan: "as",
  Philippines: "as", Qatar: "as", "Saudi Arabia": "as", Singapore: "as", "South Korea": "as",
  "Sri Lanka": "as", Taiwan: "as", Thailand: "as", Turkey: "as", "United Arab Emirates": "as",
  Uzbekistan: "as", Vietnam: "as",

  Albania: "eu", Andorra: "eu", Austria: "eu", Belarus: "eu", Belgium: "eu", Bulgaria: "eu",
  Croatia: "eu", Cyprus: "eu", "Czech Republic": "eu", Denmark: "eu", England: "eu", Estonia: "eu",
  Finland: "eu", France: "eu", Germany: "eu", Greece: "eu", Hungary: "eu", Iceland: "eu", Ireland: "eu",
  Italy: "eu", Latvia: "eu", Lithuania: "eu", Luxembourg: "eu", Malta: "eu", Netherlands: "eu",
  "Northern Ireland": "eu", Norway: "eu", Poland: "eu", Portugal: "eu", Romania: "eu", Russia: "eu",
  Scotland: "eu", Serbia: "eu", Slovakia: "eu", Slovenia: "eu", Spain: "eu", Sweden: "eu",
  Switzerland: "eu", Ukraine: "eu", Wales: "eu",

  Bahamas: "na", Barbados: "na", Belize: "na", Bermuda: "na", Canada: "na", "Cayman Islands": "na",
  "Costa Rica": "na", Cuba: "na", Curacao: "na", "Dominican Republic": "na", "El Salvador": "na",
  Guatemala: "na", Haiti: "na", Honduras: "na", Jamaica: "na", Mexico: "na", Nicaragua: "na",
  Panama: "na", "Puerto Rico": "na", "Saint Kitts and Nevis": "na", "Saint Lucia": "na", USA: "na",

  Argentina: "sa", Bolivia: "sa", Brazil: "sa", Chile: "sa", Colombia: "sa", Ecuador: "sa",
  Guyana: "sa", Paraguay: "sa", Peru: "sa", Suriname: "sa", "Trinidad and Tobago": "sa", Uruguay: "sa",
  Venezuela: "sa",

  Australia: "oc", Fiji: "oc", "New Zealand": "oc", "Papua New Guinea": "oc", Samoa: "oc",
  "Solomon Islands": "oc", Vanuatu: "oc",
};

const COUNTRY_ALIASES: Record<string, ContinentKey> = {
  Czechia: "eu", UK: "eu", "United Kingdom": "eu", "United States": "na", UAE: "as",
  Danmark: "eu", Sverige: "eu", Skotland: "eu", Irland: "eu", Frankrig: "eu", Tyskland: "eu",
  Spanien: "eu", Italien: "eu", Holland: "eu", Norge: "eu", Belgien: "eu", Schweiz: "eu",
  Østrig: "eu", Polen: "eu", Tjekkiet: "eu", Grækenland: "eu", Tyrkiet: "as",
};

const EUROPEAN_COUNTRIES = new Set([
  "Denmark", "Sverige", "Danmark", "Sweden", "Scotland", "Skotland", "Ireland", "Irland", "Wales",
  "England", "France", "Frankrig", "Germany", "Tyskland", "Netherlands", "Holland", "Norway",
  "Norge", "Finland",
]);

function getContinent(country: string): string {
  const key = COUNTRY_TO_CONTINENT[country] ?? COUNTRY_ALIASES[country];
  return key ? CONTINENT_LABELS[key] : "Other";
}

// ── Badge criteria evaluation (ported from apps/web/src/lib/badges.ts) ─────

type Badge = {
  id: string;
  key: string;
  name: string;
  emoji: string;
  description: string;
  tier: string;
  criteria_type: string;
  criteria_value: Record<string, unknown>;
  xp_reward: number;
};

type AwardedBadge = {
  key: string;
  name: string;
  emoji: string;
  description: string;
  tier: string;
  xp_reward: number;
};

type UserData = {
  courseCount: number;
  countries: string[];
  countryCount: number;
  majorCount: number;
  top100Count: number;
  europeanCountryCount: number;
  continentCount: number;
  countryCounts: Map<string, number>;
  usaStates: string[];
  roundsWithDates: { courseId: string; club: string | null; country: string | null; createdAt: string }[];
  clubCaps: Map<string, number>;
};

async function fetchUserData(userId: string, supabase: SupabaseClient): Promise<UserData> {
  const { data: rounds } = await supabase
    .from("rounds")
    .select("course_id, played_at, created_at, courses(name, club, country, state, holes, is_combo, is_major)")
    .eq("user_id", userId)
    .is("parent_round_id", null);

  type RoundRow = {
    course_id: string;
    played_at: string | null;
    created_at: string;
    courses: {
      name: string; club: string | null; country: string | null; state: string | null;
      holes: number | null; is_combo: boolean; is_major: boolean;
    } | null;
  };
  const rows = (rounds ?? []) as unknown as RoundRow[];

  const clubKey = (club: string, country: string) => `${club}|||${country}`;
  const playedClubs = new Map<string, { club: string; country: string }>();
  for (const r of rows) {
    const c = r.courses;
    if (c?.club && c?.country) {
      const k = clubKey(c.club, c.country);
      if (!playedClubs.has(k)) playedClubs.set(k, { club: c.club, country: c.country });
    }
  }

  type ClubCourseRow = { club: string; country: string; name: string; holes: number | null; is_combo: boolean };
  const allClubCourses: ClubCourseRow[] = [];
  if (playedClubs.size > 0) {
    const clubList = [...playedClubs.values()];
    const BATCH = 100;
    for (let i = 0; i < clubList.length; i += BATCH) {
      const batch = clubList.slice(i, i + BATCH);
      const clubsBatch = [...new Set(batch.map((c) => c.club))];
      const countriesBatch = [...new Set(batch.map((c) => c.country))];
      const { data: batchData } = await supabase
        .from("courses")
        .select("club, country, name, holes, is_combo")
        .in("club", clubsBatch)
        .in("country", countriesBatch);
      for (const c of (batchData ?? []) as ClubCourseRow[]) {
        if (playedClubs.has(clubKey(c.club, c.country))) allClubCourses.push(c);
      }
    }
  }

  type ClubMeta = { totalHoles: number; cap: number; has18: boolean };
  const clubMeta = new Map<string, ClubMeta>();
  const courseRowsByClub = new Map<string, ClubCourseRow[]>();
  for (const c of allClubCourses) {
    const k = clubKey(c.club, c.country);
    if (!courseRowsByClub.has(k)) courseRowsByClub.set(k, []);
    courseRowsByClub.get(k)!.push(c);
  }
  for (const [k, courses] of courseRowsByClub) {
    let has18 = false;
    const loopNames = new Set<string>();
    const holesByName = new Map<string, number>();
    for (const c of courses) {
      const h = c.holes ?? 0;
      if (h >= 18) has18 = true;
      if (c.is_combo) {
        if (c.name) {
          const parts = c.name.split(" + ").map((s) => s.trim()).filter(Boolean);
          if (parts.length === 2) for (const p of parts) loopNames.add(p);
        }
      } else if (c.name) {
        const prev = holesByName.get(c.name) ?? 0;
        if (h > prev) holesByName.set(c.name, h);
      }
    }
    const fromCombos = loopNames.size * 9;
    let fromDistinctCourses = 0;
    for (const h of holesByName.values()) fromDistinctCourses += h;
    const totalHoles = Math.max(fromCombos, fromDistinctCourses);
    const cap = Math.max(1, Math.ceil(totalHoles / 18));
    clubMeta.set(k, { totalHoles, cap, has18 });
  }

  type Creditable = { courseId: string; club: string; country: string; state: string | null; createdAt: string; isMajor: boolean };
  const creditableRounds: Creditable[] = [];
  for (const r of rows) {
    const c = r.courses;
    if (!c?.club || !c?.country) continue;
    const k = clubKey(c.club, c.country);
    const meta = clubMeta.get(k);
    if (!meta) continue;
    const holes = c.holes ?? 0;
    const isCreditable = holes >= 18 || !meta.has18;
    if (!isCreditable) continue;
    creditableRounds.push({
      courseId: r.course_id, club: c.club, country: c.country, state: c.state ?? null,
      createdAt: r.created_at, isMajor: c.is_major,
    });
  }

  const creditableByClub = new Map<string, Set<string>>();
  for (const cr of creditableRounds) {
    const k = clubKey(cr.club, cr.country);
    if (!creditableByClub.has(k)) creditableByClub.set(k, new Set());
    creditableByClub.get(k)!.add(cr.courseId);
  }
  let courseCount = 0;
  const countryCounts = new Map<string, number>();
  const creditedCountries = new Set<string>();
  for (const [k, courseSet] of creditableByClub) {
    const meta = clubMeta.get(k);
    if (!meta) continue;
    const credit = Math.min(courseSet.size, meta.cap);
    if (credit <= 0) continue;
    courseCount += credit;
    const country = k.split("|||")[1];
    countryCounts.set(country, (countryCounts.get(country) ?? 0) + credit);
    creditedCountries.add(country);
  }

  const countries = [...creditedCountries];
  const countryCount = countries.length;

  const usaStateSet = new Set<string>();
  for (const cr of creditableRounds) {
    if (cr.country === "USA" && cr.state && cr.state !== "Unknown state") usaStateSet.add(cr.state);
  }
  const usaStates = [...usaStateSet];

  const majorCourseIds = new Set(creditableRounds.filter((r) => r.isMajor).map((r) => r.courseId));
  const majorCount = majorCourseIds.size;

  const creditableCourseIds = [...new Set(creditableRounds.map((r) => r.courseId))];
  let top100Count = 0;
  if (creditableCourseIds.length > 0) {
    const { count } = await supabase
      .from("top100_rankings")
      .select("course_id", { count: "exact", head: true })
      .in("course_id", creditableCourseIds);
    top100Count = count ?? 0;
  }

  const europeanCountryCount = countries.filter((c) => EUROPEAN_COUNTRIES.has(c)).length;
  const continents = new Set(countries.map((c) => getContinent(c)));
  const continentCount = continents.size;

  const roundsWithDates = creditableRounds.map((r) => ({
    courseId: r.courseId, club: r.club, country: r.country, createdAt: r.createdAt,
  }));

  const clubCaps = new Map<string, number>();
  for (const [k, meta] of clubMeta) clubCaps.set(k, meta.cap);

  return {
    courseCount, countries, countryCount, majorCount, top100Count,
    europeanCountryCount, continentCount, countryCounts, usaStates, roundsWithDates, clubCaps,
  };
}

function evaluateCriteria(badge: Badge, data: UserData): boolean {
  const cv = badge.criteria_value;
  const type = badge.criteria_type;

  switch (type) {
    case "course_count":
      return data.courseCount >= (cv.count as number);
    case "country_count":
      return data.countryCount >= (cv.count as number);
    case "major_count":
      return data.majorCount >= (cv.count as number);
    case "top100_count":
      return data.top100Count >= (cv.count as number);
    case "european_country_count":
      return data.europeanCountryCount >= (cv.count as number);
    case "continent_count":
      return data.continentCount >= (cv.count as number);
    case "country_courses": {
      const country = cv.country as string;
      const needed = cv.count as number;
      return (data.countryCounts.get(country) ?? 0) >= needed;
    }
    case "courses_in_days": {
      const days = cv.days as number;
      const needed = cv.count as number;
      const cutoff = Date.now() - days * 86400000;
      const recent = data.roundsWithDates.filter((r) => new Date(r.createdAt).getTime() >= cutoff);
      const byClub = new Map<string, Set<string>>();
      for (const r of recent) {
        if (!r.club || !r.country) continue;
        const k = `${r.club}|||${r.country}`;
        if (!byClub.has(k)) byClub.set(k, new Set());
        byClub.get(k)!.add(r.courseId);
      }
      let credits = 0;
      for (const [k, courseSet] of byClub) {
        const cap = data.clubCaps.get(k) ?? 1;
        credits += Math.min(courseSet.size, cap);
      }
      return credits >= needed;
    }
    case "year_rounder": {
      const yearQuarters = new Map<number, Set<number>>();
      for (const r of data.roundsWithDates) {
        const d = new Date(r.createdAt);
        const year = d.getFullYear();
        const quarter = Math.floor(d.getMonth() / 3) + 1;
        const set = yearQuarters.get(year) ?? new Set();
        set.add(quarter);
        yearQuarters.set(year, set);
      }
      for (const quarters of yearQuarters.values()) {
        if (quarters.size === 4) return true;
      }
      return false;
    }
    case "grand_slam": {
      const requiredCountries = cv.countries as string[];
      const userCountrySet = new Set(data.countries);
      return requiredCountries.every((c) => userCountrySet.has(c));
    }
    case "us_state_count":
      return data.usaStates.length >= (cv.count as number);
    case "us_states_region": {
      const userStates = new Set(data.usaStates);
      if (Array.isArray(cv.required)) {
        return (cv.required as string[]).every((s) => userStates.has(s));
      }
      if (Array.isArray(cv.pool) && typeof cv.count === "number") {
        const pool = cv.pool as string[];
        const hit = pool.filter((s) => userStates.has(s)).length;
        return hit >= (cv.count as number);
      }
      return false;
    }
    default:
      return false;
  }
}

// ── XP (ported from apps/web/src/lib/badges.ts) ─────────────────────────────

async function awardXP(userId: string, amount: number, reason: string, supabase: SupabaseClient) {
  await supabase.from("xp_events").insert({ user_id: userId, xp_amount: amount, reason });

  const { data: profile } = await supabase
    .from("profiles")
    .select("total_xp")
    .eq("id", userId)
    .single();

  const currentXP = (profile?.total_xp as number) ?? 0;
  const newTotal = currentXP + amount;
  const newLevel = Math.floor(newTotal / 500) + 1;

  await supabase
    .from("profiles")
    .update({ total_xp: newTotal, level: newLevel })
    .eq("id", userId);
}

async function awardCourseXP(userId: string, isNewCountry: boolean, supabase: SupabaseClient) {
  await awardXP(userId, 100, "new_course", supabase);
  if (isNewCountry) {
    await awardXP(userId, 500, "new_country", supabase);
  }
}

async function checkAndAwardBadges(userId: string, supabase: SupabaseClient): Promise<AwardedBadge[]> {
  const { data: allBadges } = await supabase
    .from("badges")
    .select("id, key, name, emoji, description, tier, criteria_type, criteria_value, xp_reward");

  if (!allBadges || allBadges.length === 0) return [];

  const { data: earnedRows } = await supabase
    .from("user_badges")
    .select("badge_id")
    .eq("user_id", userId);

  const earnedIds = new Set((earnedRows ?? []).map((r) => r.badge_id as string));
  const unearnedBadges = (allBadges as Badge[]).filter((b) => !earnedIds.has(b.id));
  if (unearnedBadges.length === 0) return [];

  const userData = await fetchUserData(userId, supabase);
  const newlyAwarded: AwardedBadge[] = [];

  for (const badge of unearnedBadges) {
    if (!evaluateCriteria(badge, userData)) continue;

    const { error } = await supabase.from("user_badges").insert({ user_id: userId, badge_id: badge.id });
    if (error) continue; // skip if insert fails (e.g. duplicate)

    newlyAwarded.push({
      key: badge.key,
      name: badge.name,
      emoji: badge.emoji,
      description: badge.description ?? "",
      tier: badge.tier,
      xp_reward: badge.xp_reward,
    });
  }

  return newlyAwarded;
}

// ── HTTP handler ─────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const bearerToken = authHeader.replace(/^Bearer\s+/i, "");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const body = await req.json().catch(() => null) as
      { is_new_country?: boolean; user_id?: string } | null;
    const isNewCountry = body?.is_new_country ?? false;

    // service role: profiles/xp_events/user_badges writes aren't all open to
    // authenticated clients directly, and this keeps the same trust model as
    // delete-round (client identifies who's asking, service role does the writes).
    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      serviceRoleKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Two ways to identify the target user:
    //  - normal client calls: a user JWT, identifies the caller themselves.
    //  - one-off admin backfill (e.g. re-running for rounds logged before
    //    this function existed): the service-role key itself + an explicit
    //    user_id in the body. Only usable by whoever holds the service-role
    //    secret, same trust boundary as any other admin script.
    let userId: string;
    let isAdminBackfill = false;
    if (bearerToken === serviceRoleKey && body?.user_id) {
      userId = body.user_id;
      isAdminBackfill = true;
    } else {
      const callerSupabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user }, error: authError } = await callerSupabase.auth.getUser();
      if (authError || !user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      userId = user.id;
    }

    // Admin backfill re-evaluates badges for existing rounds only — it
    // didn't "just log a course", so it must not also grant course/country XP.
    if (!isAdminBackfill) {
      await awardCourseXP(userId, isNewCountry, adminSupabase);
    }
    const newlyAwarded = await checkAndAwardBadges(userId, adminSupabase);

    return new Response(JSON.stringify({ success: true, awarded_badges: newlyAwarded }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
