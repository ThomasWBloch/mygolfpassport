import { supabase } from './supabase';

export type Course = {
  id: string;
  name: string;
  club: string | null;
  country: string | null;
  holes: number | null;
};

const COURSE_LIST_LIMIT = 100;

export async function fetchCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('id, name, club, country, holes')
    .eq('is_displayed', true)
    .order('name')
    .limit(COURSE_LIST_LIMIT);

  if (error) throw error;
  return data ?? [];
}
