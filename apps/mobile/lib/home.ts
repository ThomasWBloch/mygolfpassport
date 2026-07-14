import { supabase } from './supabase';

export async function fetchBadgeCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from('user_badges')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) throw error;
  return count ?? 0;
}

export type RecentRound = {
  id: string;
  played_at: string | null;
  course: { name: string; club: string | null } | null;
};

type RecentRoundRow = {
  id: string;
  played_at: string | null;
  courses: { name: string; club: string | null } | { name: string; club: string | null }[] | null;
};

export async function fetchRecentRounds(userId: string, limit = 2): Promise<RecentRound[]> {
  const { data, error } = await supabase
    .from('rounds')
    .select('id, played_at, courses(name, club)')
    .eq('user_id', userId)
    .is('parent_round_id', null)
    .order('created_at', { ascending: false })
    .limit(limit)
    .returns<RecentRoundRow[]>();

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    played_at: row.played_at,
    course: Array.isArray(row.courses) ? (row.courses[0] ?? null) : row.courses,
  }));
}
