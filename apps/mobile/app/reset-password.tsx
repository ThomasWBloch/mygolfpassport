import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { colors } from '@mygolfpassport/shared';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';
import { supabase } from '@/lib/supabase';

/**
 * Reached from app/auth/confirm.tsx after a recovery link verifies (which
 * signs the user in). Unguarded in app/_layout.tsx — by the time it's shown
 * there's already a session, but it must stay reachable even though the
 * user is fully signed in.
 */
export default function ResetPasswordScreen() {
  const { session, profileComplete } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;
  const canSubmit = !loading && password.length >= 6 && password === confirmPassword;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    router.replace(profileComplete === false ? '/onboarding' : '/');
  }

  if (!session) {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.paper.cream }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 15, lineHeight: 22, marginBottom: 16 }}>
            This link has expired. Request a new one from the sign-in screen.
          </Text>
          <Link href="/(auth)/forgot-password" style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 15 }}>
            Request a new link →
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.paper.cream }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }} keyboardShouldPersistTaps="handled">
        <Text
          style={{
            color: colors.ink.tertiary,
            fontFamily: bodyFont.semibold,
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Fresh start
        </Text>
        <Text style={{ color: colors.passport.cover, fontFamily: displayFont.semibold, fontSize: 30, marginBottom: 24 }}>
          Choose a new password.
        </Text>

        <AuthInput
          label="New password"
          value={password}
          onChangeText={(v) => { setPassword(v); setError(''); }}
          placeholder="At least 6 characters"
          secureTextEntry
          autoComplete="new-password"
          editable={!loading}
        />
        <AuthInput
          label="Confirm new password"
          value={confirmPassword}
          onChangeText={(v) => { setConfirmPassword(v); setError(''); }}
          placeholder="Re-type your new password"
          secureTextEntry
          autoComplete="new-password"
          editable={!loading}
        />

        {!passwordsMatch && (
          <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, fontSize: 13, marginBottom: 12 }}>
            Passwords don&apos;t match yet.
          </Text>
        )}
        {error.length > 0 && (
          <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, fontSize: 13, marginBottom: 12 }}>{error}</Text>
        )}

        <AuthButton label="Update password" onPress={handleSubmit} disabled={!canSubmit} loading={loading} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
