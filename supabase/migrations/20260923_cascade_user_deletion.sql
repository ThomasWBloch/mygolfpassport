-- Deleting an account (/api/delete-account -> auth.admin.deleteUser) always
-- failed: profiles_id_fkey was ON DELETE NO ACTION, and every user has a
-- profiles row (handle_new_user trigger). Everything hanging off profiles
-- already cascades, so cascading here removes the user's data in one go.
-- reviewed_by only records which admin handled a course-edit report; keep
-- the report, drop the pointer.

alter table public.profiles
  drop constraint profiles_id_fkey,
  add constraint profiles_id_fkey
    foreign key (id) references auth.users(id) on delete cascade;

alter table public.course_edit_submissions
  drop constraint course_edit_submissions_reviewed_by_fkey,
  add constraint course_edit_submissions_reviewed_by_fkey
    foreign key (reviewed_by) references auth.users(id) on delete set null;
