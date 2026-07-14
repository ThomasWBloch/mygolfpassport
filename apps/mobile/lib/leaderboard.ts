import { SYSTEM_USER_ID } from './friends';
import { getContinent } from './continents';
import { supabase } from './supabase';

export type LeaderboardUser = {
  userId: string;
  fullName: string;
  homeClub: string | null;
  homeCountry: string | null;
  courseCount: number;
  countryCount: number;
  friendshipStatus: 'friend' | 'pending_sent' | 'pending_received' | 'none';
  friendshipId: string | null;
  sameClub: boolean;
  sameCountry: boolean;
  sameContinent: boolean;
};

type RoundCountryRow = {
  user_id: string;
  course_id: string;
  courses: { country: string | null } | { country: string | null }[] | null;
};

async function fetchRoundsWithCountry(
  userIds: string[]
): Promise<{ user_id: string; course_id: string; country: string | null }[]> {
  if (userIds.length === 0) return [];
  const { data, error } = await supabase
    .from('rounds')
    .select('user_id, course_id, courses(country)')
    .in('user_id', userIds)
    .is('parent_round_id', null)
    .returns<RoundCountryRow[]>();
  if (error) throw error;

  return (data ?? []).map((r) => ({
    user_id: r.user_id,
    course_id: r.course_id,
    country: Array.isArray(r.courses) ? (r.courses[0]?.country ?? null) : (r.courses?.country ?? null),
  }));
}

export async function fetchLeaderboard(currentUserId: string): Promise<LeaderboardUser[]> {
  const [myProfileRes, acceptedRes, pendingRes, allProfilesRes] = await Promise.all([
    supabase.from('profiles').select('home_club, home_country').eq('id', currentUserId).single(),
    supabase
      .from('friendships')
      .select('user_id, friend_id')
      .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`)
      .eq('status', 'accepted'),
    supabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`)
      .eq('status', 'pending'),
    supabase.from('profiles').select('id, full_name, home_club, home_country').neq('id', SYSTEM_USER_ID),
  ]);
  if (acceptedRes.error) throw acceptedRes.error;
  if (pendingRes.error) throw pendingRes.error;
  if (allProfilesRes.error) throw allProfilesRes.error;

  const myProfile = myProfileRes.data;
  const myHomeClub = myProfile?.home_club ?? null;
  const myCountry = myProfile?.home_country ?? null;
  const myContinent = myCountry ? getContinent(myCountry) : null;

  const friendIds = new Set(
    (acceptedRes.data ?? []).map((f) => (f.user_id === currentUserId ? f.friend_id : f.user_id))
  );

  const pendingMap = new Map<string, { friendshipId: string; direction: 'sent' | 'received' }>();
  for (const f of pendingRes.data ?? []) {
    const isSent = f.user_id === currentUserId;
    const otherId = isSent ? f.friend_id : f.user_id;
    pendingMap.set(otherId, { friendshipId: f.id, direction: isSent ? 'sent' : 'received' });
  }

  const allProfiles = allProfilesRes.data ?? [];
  const allProfileIds = allProfiles.map((p) => p.id);
  const rounds = await fetchRoundsWithCountry(allProfileIds);

  const statsByUser = new Map<string, { courseIds: Set<string>; countries: Set<string> }>();
  for (const r of rounds) {
    const entry = statsByUser.get(r.user_id) ?? { courseIds: new Set<string>(), countries: new Set<string>() };
    entry.courseIds.add(r.course_id);
    if (r.country) entry.countries.add(r.country);
    statsByUser.set(r.user_id, entry);
  }

  const users: LeaderboardUser[] = allProfiles.map((p) => {
    const stats = statsByUser.get(p.id);
    const userClub = p.home_club;
    const userCountry = p.home_country;
    const userContinent = userCountry ? getContinent(userCountry) : null;
    const pending = pendingMap.get(p.id) ?? null;
    const isFriend = friendIds.has(p.id);

    let friendshipStatus: LeaderboardUser['friendshipStatus'] = 'none';
    if (isFriend) friendshipStatus = 'friend';
    else if (pending?.direction === 'sent') friendshipStatus = 'pending_sent';
    else if (pending?.direction === 'received') friendshipStatus = 'pending_received';

    return {
      userId: p.id,
      fullName: p.full_name ?? 'Golfer',
      homeClub: userClub,
      homeCountry: userCountry,
      courseCount: stats?.courseIds.size ?? 0,
      countryCount: stats?.countries.size ?? 0,
      friendshipStatus,
      friendshipId: pending?.friendshipId ?? null,
      sameClub: myHomeClub != null && userClub === myHomeClub,
      sameCountry: myCountry != null && userCountry === myCountry,
      sameContinent: myContinent != null && userContinent === myContinent,
    };
  });

  return users.sort((a, b) => b.courseCount - a.courseCount);
}
