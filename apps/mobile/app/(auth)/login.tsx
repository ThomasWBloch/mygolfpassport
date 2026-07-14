import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import { useAuth } from '@/lib/auth-context';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = !loading && email.trim().length > 0 && password.length > 0;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    const { error: signInError } = await signIn(email.trim(), password);
    setLoading(false);
    if (signInError) setError('Incorrect email or password.');
    // On success, Stack.Protected in app/_layout.tsx swaps to (tabs) automatically.
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.paper.cream }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <Text
          style={{
            color: colors.ink.tertiary,
            fontSize: 12,
            fontWeight: '600',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Welcome back
        </Text>
        <Text
          style={{
            color: colors.passport.cover,
            fontSize: 26,
            fontWeight: '700',
            marginBottom: 24,
          }}
        >
          Pick up where you left off.
        </Text>

        <AuthInput
          label="Email"
          value={email}
          onChangeText={(v) => { setEmail(v); setError(''); }}
          placeholder="you@example.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          editable={!loading}
        />
        <AuthInput
          label="Password"
          value={password}
          onChangeText={(v) => { setPassword(v); setError(''); }}
          placeholder="••••••••"
          secureTextEntry
          autoComplete="password"
          editable={!loading}
        />

        {error.length > 0 && (
          <Text style={{ color: colors.state.danger, fontSize: 13, marginBottom: 12 }}>
            {error}
          </Text>
        )}

        <AuthButton label="Sign in" onPress={handleSubmit} disabled={!canSubmit} loading={loading} />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Link href="/(auth)/signup" style={{ color: colors.accent.goldDark, fontSize: 14 }}>
            No passport yet? Get one →
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
