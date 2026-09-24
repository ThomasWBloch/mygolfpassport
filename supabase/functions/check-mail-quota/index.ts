import { createClient } from "jsr:@supabase/supabase-js@2";

/**
 * check-mail-quota — counts emails sent through Resend (the Supabase Auth
 * SMTP provider) and pushes a warning to the admin when a usage threshold is
 * crossed. Called by pg_cron via private.run_mail_quota_check() with the
 * service_role key; body: { scope: "daily" | "monthly", admin_user_id }.
 *
 * Resend free plan: 100 emails per UTC calendar day and 3,000 per month, each
 * To/CC/BCC recipient counting separately. Each threshold alerts once per
 * period (public.mail_quota_alerts), so the 10-minute cron doesn't repeat it.
 * Needs the RESEND_API_KEY function secret (a key that may list emails).
 */

const DAILY_LIMIT = 100;
const MONTHLY_LIMIT = 3000;
const DAILY_THRESHOLDS = [25, 50, 75, 90];
const MONTHLY_THRESHOLDS = [1500, 2400]; // 50% and 80%
const MAX_PAGES = 40;

interface ResendEmail {
  id: string;
  created_at: string;
  to?: string[] | null;
  cc?: string[] | null;
  bcc?: string[] | null;
}

// Resend returns e.g. "2026-09-24 08:09:11.123+00" — not valid ISO as-is.
function parseCreatedAt(s: string): number {
  let iso = s.replace(" ", "T");
  if (/[+-]\d\d$/.test(iso)) iso += ":00";
  return new Date(iso).getTime();
}

async function countRecipientsSince(apiKey: string, sinceMs: number): Promise<number> {
  let total = 0;
  let after: string | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL("https://api.resend.com/emails");
    url.searchParams.set("limit", "100");
    if (after) url.searchParams.set("after", after);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
    const body = (await res.json()) as { data: ResendEmail[]; has_more: boolean };

    for (const email of body.data) {
      if (parseCreatedAt(email.created_at) < sinceMs) return total;
      total += (email.to?.length ?? 0) + (email.cc?.length ?? 0) + (email.bcc?.length ?? 0);
    }
    if (!body.has_more || body.data.length === 0) break;
    after = body.data[body.data.length - 1].id;
  }
  return total;
}

Deno.serve(async (req: Request) => {
  try {
    const payload = (await req.json().catch(() => null)) as
      | { scope?: string; admin_user_id?: string }
      | null;
    const scope = payload?.scope;
    const adminId = payload?.admin_user_id;
    if ((scope !== "daily" && scope !== "monthly") || !adminId) {
      return Response.json({ error: "Body needs scope (daily|monthly) and admin_user_id" }, { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return Response.json({ error: "RESEND_API_KEY is not set" }, { status: 500 });

    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    const isDaily = scope === "daily";
    const sinceMs = isDaily ? Date.UTC(y, m, now.getUTCDate()) : Date.UTC(y, m, 1);
    const period = isDaily
      ? `d:${now.toISOString().slice(0, 10)}`
      : `m:${now.toISOString().slice(0, 7)}`;
    const limit = isDaily ? DAILY_LIMIT : MONTHLY_LIMIT;
    const thresholds = isDaily ? DAILY_THRESHOLDS : MONTHLY_THRESHOLDS;

    const count = await countRecipientsSince(apiKey, sinceMs);
    const crossed = thresholds.filter((t) => count >= t);
    if (crossed.length === 0) return Response.json({ scope, period, count, alerted: null });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Record every crossed threshold; only the ones that are new count as
    // "not yet alerted". If several are new at once (a burst of signups),
    // one push for the highest is enough.
    const { data: inserted, error } = await supabase
      .from("mail_quota_alerts")
      .upsert(crossed.map((threshold) => ({ period, threshold })), {
        onConflict: "period,threshold",
        ignoreDuplicates: true,
      })
      .select("threshold");
    if (error) return Response.json({ error: error.message }, { status: 500 });

    const fresh = (inserted ?? []).map((r) => r.threshold as number);
    if (fresh.length === 0) return Response.json({ scope, period, count, alerted: null });

    const top = Math.max(...fresh);
    const label = isDaily ? "i dag (UTC)" : "denne måned";
    const pushRes = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        user_id: adminId,
        title: "Resend mail-grænse",
        body: `${count} af ${limit} mails brugt ${label} (grænse ${top} nået)`,
      }),
    });

    return Response.json({ scope, period, count, alerted: top, push_status: pushRes.status });
  } catch (err) {
    return Response.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 500 });
  }
});
