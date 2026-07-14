import { Text, View } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

export default function CheckEmailScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();

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
      <Text
        style={{
          color: colors.ink.tertiary,
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Almost there
      </Text>
      <Text
        style={{
          color: colors.passport.cover,
          fontSize: 22,
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 12,
        }}
      >
        Check your email
      </Text>
      <Text
        style={{
          color: colors.ink.secondary,
          fontSize: 15,
          textAlign: 'center',
          lineHeight: 22,
          marginBottom: 24,
        }}
      >
        We sent a confirmation link{email ? ` to ${email}` : ''}. Tap it, then come back here and
        sign in.
      </Text>
      <Link href="/(auth)/login" style={{ color: colors.accent.goldDark, fontSize: 15, fontWeight: '600' }}>
        Back to sign in →
      </Link>
    </View>
  );
}
