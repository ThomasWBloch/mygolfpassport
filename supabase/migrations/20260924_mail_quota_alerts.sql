-- Resend mail-quota alerts. The check-mail-quota Edge Function counts sent
-- mails and pushes a warning to the admin at 25/50/75/90 of 100 per UTC day
-- and 50%/80% of 3,000 per month. This table remembers which thresholds
-- already alerted in a period so each fires once.
--
-- Needs: Vault secrets 'service_role_key_for_push' + 'admin_user_id' (both
-- already set) and the RESEND_API_KEY Edge Function secret.

-- Service-role-only table: RLS on with no policies, and no anon/authenticated
-- grants (revoked explicitly because default privileges still auto-grant).
create table public.mail_quota_alerts (
  period text not null,       -- 'd:YYYY-MM-DD' (UTC day) or 'm:YYYY-MM'
  threshold int not null,
  created_at timestamptz not null default now(),
  primary key (period, threshold)
);

revoke all on public.mail_quota_alerts from anon, authenticated;
grant select, insert, update, delete on public.mail_quota_alerts to service_role;
alter table public.mail_quota_alerts enable row level security;

create or replace function private.run_mail_quota_check(p_scope text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_service_role_key text;
  v_admin_id text;
begin
  select decrypted_secret into v_service_role_key
  from vault.decrypted_secrets where name = 'service_role_key_for_push';
  select decrypted_secret into v_admin_id
  from vault.decrypted_secrets where name = 'admin_user_id';

  if v_service_role_key is null or v_admin_id is null then
    return;
  end if;

  perform net.http_post(
    url := 'https://twqsuitdrczohozgpdlr.supabase.co/functions/v1/check-mail-quota',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || v_service_role_key
    ),
    body := jsonb_build_object('scope', p_scope, 'admin_user_id', v_admin_id)
  );
end;
$$;

-- Old alert rows are only ever read for the current period.
create or replace function private.prune_mail_quota_alerts()
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.mail_quota_alerts where created_at < now() - interval '90 days';
$$;

select cron.schedule('mail-quota-daily', '*/10 * * * *', $$select private.run_mail_quota_check('daily');$$);
select cron.schedule('mail-quota-monthly', '5 * * * *', $$select private.run_mail_quota_check('monthly');$$);
select cron.schedule('mail-quota-prune', '30 3 * * *', $$select private.prune_mail_quota_alerts();$$);
