import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import type { EmailOtpType } from '@supabase/supabase-js';
import { colors } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { supabase } from '@/lib/supabase';

/**
 * Opened by the OS (universal link on iOS / app link on Android) when a
 * signup-confirmation or password-recovery email link is tapped on a phone
 * that has the app installed — the emails link to
 * https://mygolfpassport.golf/auth/confirm?token_hash=...&type=... (see
 * apps/web/src/app/auth/confirm/route.ts for the web fallback).
 *
 * Verifying the token signs the user in, so unlike the old flow there's no
 * "go back to the app and sign in" step. Lives outside the Stack.Protected
 * groups in app/_layout.tsx because it has to be reachable both signed out
 * (fresh signup) and signed in (already-open app).
 */

// The token is single-use, and RootNavigator unmounts the whole Stack while
// the profile check runs right after sign-in — so this screen remounts
// mid-flow. Sharing one in-flight verification per token keeps the remount
// from firing a second verifyOtp that would fail as already-used.
const verifications = new Map<string, Promise<boolean>>();

function verifyOnce(tokenHash: string, type: EmailOtpType): Promise<boolean> {
  let attempt = verifications.get(tokenHash);
  if (!attempt) {
    attempt = supabase.auth.verifyOtp({ type, token_hash: tokenHash }).then(({ data, error }) => {
      if (error) return false;
      // Same best-effort referral attribution as web's /auth/confirm — a
      // user invited via a web /i/<code> link can sign up on web and then
      // confirm on a phone, where the app (not the web route) handles it.
      const refCode = data.user?.user_metadata?.referral_code;
      if (typeof refCode === 'string' && refCode.length > 0) {
        supabase.rpc('attribute_referral', { p_code: refCode }).then(() => {}, () => {});
      }
      return true;
    });
    verifications.set(tokenHash, attempt);
  }
  return attempt;
}

export default function ConfirmScreen() {
  const { token_hash: tokenHash, type } = useLocalSearchParams<{ token_hash?: string; type?: string }>();
  const { session, profileComplete } = useAuth();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!tokenHash || !type) {
      setFailed(true);
      return;
    }
    let cancelled = false;
    verifyOnce(tokenHash, type as EmailOtpType).then((ok) => {
      if (cancelled) return;
      if (ok) setVerified(true);
      else setFailed(true);
    });
    return () => { cancelled = true; };
  }, [tokenHash, type]);

  // Only navigate once the session and profile check have settled, so the
  // guarded destination screen is actually available.
  useEffect(() => {
    if (!verified || !session) return;
    if (type === 'recovery') {
      router.replace('/reset-password');
      return;
    }
    if (profileComplete === null) return;
    router.replace(profileComplete ? '/' : '/onboarding');
  }, [verified, session, profileComplete, type, router]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: colors.paper.cream,
      }}
    >
      {failed ? (
        <>
          <Text style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 24, textAlign: 'center', marginBottom: 12 }}>
            That link didn&apos;t work
          </Text>
          <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 24 }}>
            It may have expired or already been used. Try signing in, or request a new link.
          </Text>
          <Link
            href="/(auth)/login"
            style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 15 }}
          >
            Go to sign in →
          </Link>
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.accent.gold} />
          <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 14, marginTop: 16 }}>
            Confirming your link…
          </Text>
        </>
      )}
    </View>
  );
}
