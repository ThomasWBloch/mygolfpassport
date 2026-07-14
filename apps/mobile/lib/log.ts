import { supabase } from './supabase';

export async function logRound(params: {
  userId: string;
  courseId: string;
  rating: number | null;
  note: string | null;
  playedAt: string;
}): Promise<void> {
  const { error } = await supabase.from('rounds').insert({
    user_id: params.userId,
    course_id: params.courseId,
    rating: params.rating,
    note: params.note,
    played_at: params.playedAt,
  });
  if (error) throw error;
}
