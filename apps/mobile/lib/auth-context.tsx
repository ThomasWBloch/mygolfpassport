import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';

import { fetchProfile } from './profile';
import { supabase } from './supabase';

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  // null while the profiles row hasn't been checked yet for the current
  // session (or there's no session). false means signed in but full_name is
  // still unset — RootNavigator (app/_layout.tsx) routes there to /onboarding
  // instead of (tabs). Mirrors web's proxy.ts full_name gate, since mobile
  // has no equivalent middleware to run this check per-request.
  profileComplete: boolean | null;
  markOnboarded: () => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) { setProfileComplete(null); return; }
    let cancelled = false;
    setProfileComplete(null);
    fetchProfile(userId)
      .then((p) => { if (!cancelled) setProfileComplete(!!p?.full_name); })
      // Fail open — a transient load error shouldn't trap the user on an
      // onboarding screen they can't get past.
      .catch(() => { if (!cancelled) setProfileComplete(true); });
    return () => { cancelled = true; };
  }, [session?.user.id]);

  function markOnboarded() {
    setProfileComplete(true);
  }

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp: AuthContextValue['signUp'] = async (email, password, fullName) => {
    // Without an explicit emailRedirectTo, Supabase sends the confirmation
    // link to the project's bare default Site URL instead of a route that
    // knows how to exchange the code for a session (only /auth/callback
    // does) — the link would land on the web app's home page with an
    // unprocessed `?code=` and go nowhere. Same web /auth/callback as web
    // signup, since mobile has no deep-link handler of its own; the user
    // confirms in the browser, then returns to the app to sign in.
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        ...(apiBaseUrl ? { emailRedirectTo: `${apiBaseUrl}/auth/callback?next=/email-confirmed` } : {}),
        data: { full_name: fullName },
      },
    });
    return { error: error?.message ?? null };
  };

  // Mobile has no deep-link handler for Supabase auth callbacks, so the
  // reset link hands off to the web app's own /auth/callback ->
  // /reset-password flow — the user sets their new password there, then
  // returns to the app and signs in. Outcome is deliberately not surfaced
  // (matches web's forgot-password page) to avoid leaking which emails are
  // registered.
  const resetPassword: AuthContextValue['resetPassword'] = async (email) => {
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) return { error: 'Missing EXPO_PUBLIC_API_BASE_URL' };
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${apiBaseUrl}/auth/callback?next=/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, loading, profileComplete, markOnboarded, signIn, signUp, resetPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
