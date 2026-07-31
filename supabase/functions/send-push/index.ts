import { createClient } from "jsr:@supabase/supabase-js@2";

/**
 * send-push — generic push-notification sender, called either directly
 * (for a manual test) or from Postgres triggers via pg_net for the
 * instant-notification events, and from the daily-digest scheduled
 * function. Not meant to be called from mobile/web clients directly —
 * verify_jwt is true, and only the service_role key (itself a valid JWT
 * for this project) is ever handed out to callers, matching the
 * SECURITY DEFINER convention in AGENTS.md (grant only to service_role).
 *
 * Looks up every registered device for the given user(s) in
 * public.push_tokens and fans the message out to all of them via Expo's
 * push API (a user can have more than one device registered).
 */

interface PushRequest {
  user_id?: string;
  user_ids?: string[];
  title: string;
  body: string;
  data?: Record<string, unknown>;
}

Deno.serve(async (req: Request) => {
  try {
    const payload = (await req.json().catch(() => null)) as PushRequest | null;
    if (!payload) {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const userIds = payload.user_ids ?? (payload.user_id ? [payload.user_id] : []);
    if (userIds.length === 0 || !payload.title || !payload.body) {
      return new Response(
        JSON.stringify({ error: "Missing required field(s): user_id or user_ids, title, body" }),
        { status: 400 }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { data: tokenRows, error } = await supabase
      .from("push_tokens")
      .select("expo_push_token")
      .in("user_id", userIds);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    const tokens = (tokenRows ?? []).map((r) => r.expo_push_token as string);
    if (tokens.length === 0) {
      return new Response(JSON.stringify({ success: true, sent: 0, note: "No registered devices for given user(s)" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const messages = tokens.map((token) => ({
      to: token,
      title: payload.title,
      body: payload.body,
      data: payload.data ?? {},
    }));

    const pushRes = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(messages),
    });
    const pushResult = await pushRes.json();

    return new Response(JSON.stringify({ success: true, sent: tokens.length, result: pushResult }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500 }
    );
  }
});
