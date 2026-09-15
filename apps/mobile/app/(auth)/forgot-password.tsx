import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { colors } from '@mygolfpassport/shared';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const canSubmit = !loading && email.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    await resetPassword(email.trim());
    setLoading(false);
    // Fire-and-forget — don't surface whether the email exists.
    setSent(true);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.paper.cream }}
      behavior="padding"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
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
          Lost the key
        </Text>
        <Text
          style={{
            color: colors.passport.cover,
            fontFamily: displayFont.semibold,
            fontSize: 30,
            marginBottom: 24,
          }}
        >
          Reset your password.
        </Text>

        {sent ? (
          <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 15, lineHeight: 22 }}>
            Check your email for a reset link. It opens in your browser — set a new password there,
            then come back here and sign in. It may take a minute to arrive; check spam if you don't
            see it.
          </Text>
        ) : (
          <>
            <AuthInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              editable={!loading}
            />

            <AuthButton label="Send reset link" onPress={handleSubmit} disabled={!canSubmit} loading={loading} />
          </>
        )}

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Link
            href="/(auth)/login"
            style={{ color: colors.accent.goldDark, fontFamily: bodyFont.medium, fontSize: 14 }}
          >
            Remembered it? Sign in →
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
