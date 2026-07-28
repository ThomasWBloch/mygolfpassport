import { SYSTEM_USER_ID } from './friends';
import { supabase } from './supabase';

/**
 * Data fetchers for the public profile screen (viewing another user),
 * ported from apps/web/src/app/profile/[user_id]/page.tsx. Course/country
 * stats and earned badges reuse the same generic-over-userId functions the
 * You tab uses (fetchYouProfileStats, fetchCourseCountryEntries,
 * fetchEarnedBadgeEntries in lib/you.ts) — a public profile is just another
 * user's version of the same data.
 */
export type PublicProfileMeta = {
  fullName: string;
  homeClub: string | null;
  homeCountry: string | null;
  handicap: number | null;
  avatarUrl: string | null;
};

export async function fetchPublicProfileMeta(targetId: string): Promise<PublicProfileMeta | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, handicap, home_club, home_country, avatar_url')
    .eq('id', targetId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;

  return {
    fullName: data.full_name ?? 'Golfer',
    homeClub: data.home_club,
    homeCountry: data.home_country,
    handicap: data.handicap,
    avatarUrl: data.avatar_url,
  };
}

export type FriendshipStatus = {
  status: 'friend' | 'pending_sent' | 'pending_received' | 'none';
  friendshipId: string | null;
};

export async function fetchFriendshipStatus(currentUserId: string, targetId: string): Promise<FriendshipStatus> {
  if (currentUserId === targetId || targetId === SYSTEM_USER_ID) {
    return { status: 'none', friendshipId: null };
  }

  const { data, error } = await supabase
    .from('friendships')
    .select('id, user_id, friend_id, status')
    .or(
      `and(user_id.eq.${currentUserId},friend_id.eq.${targetId}),` +
        `and(user_id.eq.${targetId},friend_id.eq.${currentUserId})`
    )
    .maybeSingle();
  if (error) throw error;
  if (!data) return { status: 'none', friendshipId: null };

  if (data.status === 'accepted') return { status: 'friend', friendshipId: data.id };
  if (data.status === 'pending') {
    return {
      status: data.user_id === currentUserId ? 'pending_sent' : 'pending_received',
      friendshipId: data.id,
    };
  }
  return { status: 'none', friendshipId: null };
}
