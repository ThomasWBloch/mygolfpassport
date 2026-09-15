import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '@mygolfpassport/shared';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import { useAuth } from '@/lib/auth-context';
import { bodyFont, displayFont } from '@/lib/fonts';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit =
    !loading && name.trim().length > 0 && email.trim().length > 0 && password.length >= 6;

  async function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    const { error: signUpError } = await signUp(email.trim(), password, name.trim());
    setLoading(false);
    if (signUpError) {
      setError(signUpError);
      return;
    }
    router.push({ pathname: '/(auth)/check-email', params: { email: email.trim() } });
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
          Get your passport
        </Text>
        <Text
          style={{
            color: colors.passport.cover,
            fontFamily: displayFont.semibold,
            fontSize: 30,
            marginBottom: 24,
          }}
        >
          Your passport is being issued.
        </Text>

        <AuthInput
          label="Full name"
          value={name}
          onChangeText={(v) => { setName(v); setError(''); }}
          placeholder="Thomas Bloch"
          autoComplete="name"
          editable={!loading}
        />
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
          placeholder="At least 6 characters"
          secureTextEntry
          autoComplete="new-password"
          editable={!loading}
        />

        {error.length > 0 && (
          <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, fontSize: 13, marginBottom: 12 }}>
            {error}
          </Text>
        )}

        <AuthButton label="Issue my passport" onPress={handleSubmit} disabled={!canSubmit} loading={loading} />

        <Pressable
          onPress={() => WebBrowser.openBrowserAsync('https://mygolfpassport.golf/legal/privacy')}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, fontSize: 12.5, textAlign: 'center' }}>
            By creating a passport, you agree to our{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Privacy Policy</Text>.
          </Text>
        </Pressable>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Link
            href="/(auth)/login"
            style={{ color: colors.accent.goldDark, fontFamily: bodyFont.medium, fontSize: 14 }}
          >
            Already have one? Sign in →
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
