-- messages had a single FOR ALL policy scoped only by conversation
-- membership, so a participant could insert messages with any sender_id
-- (impersonating the other person, or the system user) and edit/delete
-- the other person's messages. Split it: read as a participant, send only
-- as yourself, and only mark the other person's messages as read.
--
-- conversations: the FOR ALL policy also let a participant UPDATE
-- participant_1/participant_2, i.e. move a conversation to a third person
-- and expose the other participant's message history to them. No client
-- ever updates conversations, so clients lose UPDATE entirely.

drop policy if exists "Users can see messages in their conversations" on public.messages;

create policy "Participants read messages"
  on public.messages for select to authenticated
  using (conversation_id in (
    select id from public.conversations
    where participant_1 = auth.uid() or participant_2 = auth.uid()
  ));

create policy "Participants send messages as themselves"
  on public.messages for insert to authenticated
  with check (
    sender_id = auth.uid()
    and conversation_id in (
      select id from public.conversations
      where participant_1 = auth.uid() or participant_2 = auth.uid()
    )
  );

create policy "Recipients mark messages read"
  on public.messages for update to authenticated
  using (
    sender_id <> auth.uid()
    and conversation_id in (
      select id from public.conversations
      where participant_1 = auth.uid() or participant_2 = auth.uid()
    )
  )
  with check (sender_id <> auth.uid());

revoke update on public.messages from anon, authenticated;
grant update (read_at) on public.messages to authenticated;

revoke update on public.conversations from anon, authenticated;
