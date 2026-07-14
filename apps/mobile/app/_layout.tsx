import '../global.css';

import { View } from 'react-native';
import { Stack } from 'expo-router';
import { ThemeProvider, type Theme } from '@react-navigation/native';
import { colors } from '@mygolfpassport/shared';

import { AuthProvider, useAuth } from '@/lib/auth-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// My Golf Passport uses one fixed "passport" palette — it doesn't adapt to
// the OS light/dark setting — so this is a single navigation theme, not a
// dark/light pair.
const passportTheme: Theme = {
  dark: false,
  colors: {
    primary: colors.accent.gold,
    background: colors.paper.cream,
    card: colors.passport.cover,
    text: colors.ink.primary,
    border: colors.border.paper,
    notification: colors.state.danger,
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium: { fontFamily: 'System', fontWeight: '500' },
    bold: { fontFamily: 'System', fontWeight: '700' },
    heavy: { fontFamily: 'System', fontWeight: '800' },
  },
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider value={passportTheme}>
        <RootNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}

function RootNavigator() {
  const { session, loading } = useAuth();

  // Avoid flashing the wrong screen group before the initial session check
  // resolves.
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: colors.paper.cream }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="log" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
