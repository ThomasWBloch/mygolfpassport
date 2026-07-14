import { supabase } from './supabase';

// Excluded from friend search/lists — mirrors apps/web/src/lib/constants.ts.
export const SYSTEM_USER_ID = '042f06f7-96fa-48b5-89da-a3907fa463b7';

// Mirrors apps/web/src/lib/search.ts.
export function normalizeSearch(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/ß/g, 'ss')
    .replace(/ð/g, 'd')
    .replace(/þ/g, 'th')
    .replace(/ł/g, 'l');
}

export type FriendEntry = {
  friendshipId: string;
  userId: string;
  fullName: string;
  homeClub: string | null;
  handicap: number | null;
  courseCount: number;
};

export type PendingRequest = {
  friendshipId: string;
  userId: string;
  fullName: string;
  homeClub: string | null;
  direction: 'incoming' | 'outgoing';
};

export type SearchResult = {
  userId: string;
  fullName: string;
  homeClub: string | null;
  handicap: number | null;
  courseCount: number;
  status: 'none' | 'friends' | 'pending_sent' | 'pending_received';
};

type FriendshipRow = { id: string; user_id: string; friend_id: string };
type ProfileRow = { id: string; full_name: string | null; home_club: string | null; handicap: number | null };

async function fetchProfilesById(userIds: string[]): Promise<Map<string, ProfileRow>> {
  if (userIds.length === 0) return new Map();
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, home_club, handicap')
    .in('id', userIds);
  if (error) throw error;
  return new Map((data ?? []).map((p) => [p.id, p]));
}

async function fetchCourseCountsByUser(userIds: string[]): Promise<Map<string, number>> {
  if (userIds.length === 0) return new Map();
  const { data, error } = await supabase
    .from('rounds')
    .select('user_id, course_id')
    .in('user_id', userIds)
    .is('parent_round_id', null);
  if (error) throw error;

  const byUser = new Map<string, Set<string>>();
  for (const row of data ?? []) {
    const set = byUser.get(row.user_id) ?? new Set<string>();
    set.add(row.course_id);
    byUser.set(row.user_id, set);
  }
  return new Map([...byUser].map(([userId, set]) => [userId, set.size]));
}

export async function fetchFriendsAndPending(
  currentUserId: string
): Promise<{ friends: FriendEntry[]; pending: PendingRequest[] }> {
  const [acceptedRes, pendingRes] = await Promise.all([
    supabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`)
      .eq('status', 'accepted')
      .returns<FriendshipRow[]>(),
    supabase
      .from('friendships')
      .select('id, user_id, friend_id')
      .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`)
      .eq('status', 'pending')
      .returns<FriendshipRow[]>(),
  ]);
  if (acceptedRes.error) throw acceptedRes.error;
  if (pendingRes.error) throw pendingRes.error;

  const isNonSystem = (f: FriendshipRow) =>
    f.user_id !== SYSTEM_USER_ID && f.friend_id !== SYSTEM_USER_ID;
  const acceptedRows = (acceptedRes.data ?? []).filter(isNonSystem);
  const pendingRows = (pendingRes.data ?? []).filter(isNonSystem);

  const otherId = (f: FriendshipRow) => (f.user_id === currentUserId ? f.friend_id : f.user_id);
  const allUserIds = [...new Set([...acceptedRows, ...pendingRows].map(otherId))];

  const [profiles, courseCounts] = await Promise.all([
    fetchProfilesById(allUserIds),
    fetchCourseCountsByUser(allUserIds),
  ]);

  const friends: FriendEntry[] = acceptedRows.map((f) => {
    const uid = otherId(f);
    const p = profiles.get(uid);
    return {
      friendshipId: f.id,
      userId: uid,
      fullName: p?.full_name ?? 'Golfer',
      homeClub: p?.home_club ?? null,
      handicap: p?.handicap ?? null,
      courseCount: courseCounts.get(uid) ?? 0,
    };
  });

  const pending: PendingRequest[] = pendingRows.map((f) => {
    const isOutgoing = f.user_id === currentUserId;
    const uid = otherId(f);
    const p = profiles.get(uid);
    return {
      friendshipId: f.id,
      userId: uid,
      fullName: p?.full_name ?? 'Golfer',
      homeClub: p?.home_club ?? null,
      direction: isOutgoing ? 'outgoing' : 'incoming',
    };
  });

  return { friends, pending };
}

export async function searchPlayers(query: string, currentUserId: string): Promise<SearchResult[]> {
  const normalized = normalizeSearch(query).replace(/[,()]/g, ' ').trim();
  if (normalized.length < 2) return [];

  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, full_name, home_club, handicap')
    .or(`full_name_normalized.ilike.%${normalized}%,home_club_normalized.ilike.%${normalized}%`)
    .neq('id', currentUserId)
    .neq('id', SYSTEM_USER_ID)
    .limit(20);
  if (profilesError) throw profilesError;
  if (!profiles || profiles.length === 0) return [];

  const profileIds = profiles.map((p) => p.id);

  const [courseCounts, friendshipsRes] = await Promise.all([
    fetchCourseCountsByUser(profileIds),
    supabase
      .from('friendships')
      .select('id, user_id, friend_id, status')
      .or(`user_id.eq.${currentUserId},friend_id.eq.${currentUserId}`),
  ]);
  if (friendshipsRes.error) throw friendshipsRes.error;
  const friendships = friendshipsRes.data ?? [];

  return profiles.map((p) => {
    const fs = friendships.find(
      (f) =>
        (f.user_id === currentUserId && f.friend_id === p.id) ||
        (f.user_id === p.id && f.friend_id === currentUserId)
    );
    let status: SearchResult['status'] = 'none';
    if (fs) {
      if (fs.status === 'accepted') status = 'friends';
      else status = fs.user_id === currentUserId ? 'pending_sent' : 'pending_received';
    }

    return {
      userId: p.id,
      fullName: p.full_name ?? 'Golfer',
      homeClub: p.home_club,
      handicap: p.handicap,
      courseCount: courseCounts.get(p.id) ?? 0,
      status,
    };
  });
}

export async function sendFriendRequest(currentUserId: string, targetId: string): Promise<void> {
  const { error } = await supabase
    .from('friendships')
    .insert({ user_id: currentUserId, friend_id: targetId, status: 'pending' });
  if (error) throw error;
}

export async function acceptFriendRequest(friendshipId: string): Promise<void> {
  const { error } = await supabase
    .from('friendships')
    .update({ status: 'accepted' })
    .eq('id', friendshipId);
  if (error) throw error;
}

export async function removeFriendship(friendshipId: string): Promise<void> {
  const { error } = await supabase.from('friendships').delete().eq('id', friendshipId);
  if (error) throw error;
}
