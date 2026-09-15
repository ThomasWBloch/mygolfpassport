import '../global.css';

import { useEffect } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider, type Theme } from '@react-navigation/native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { colors } from '@mygolfpassport/shared';

import { AuthProvider, useAuth } from '@/lib/auth-context';
import { bodyFont, fontsToLoad } from '@/lib/fonts';
import { registerForPushNotifications } from '@/lib/push';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

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
    regular: { fontFamily: bodyFont.regular, fontWeight: '400' },
    medium: { fontFamily: bodyFont.medium, fontWeight: '500' },
    bold: { fontFamily: bodyFont.bold, fontWeight: '700' },
    heavy: { fontFamily: bodyFont.bold, fontWeight: '800' },
  },
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontsToLoad);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <KeyboardProvider>
      <AuthProvider>
        <ThemeProvider value={passportTheme}>
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </KeyboardProvider>
  );
}

function RootNavigator() {
  const { session, loading, profileComplete } = useAuth();

  useEffect(() => {
    if (session?.user.id) registerForPushNotifications(session.user.id);
  }, [session?.user.id]);

  // Avoid flashing the wrong screen group before the initial session check
  // (and, once signed in, the profile-completeness check) resolves.
  if (loading || (session && profileComplete === null)) {
    return <View style={{ flex: 1, backgroundColor: colors.paper.cream }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && profileComplete === false}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
      <Stack.Protected guard={!!session && profileComplete === true}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="log" options={{ presentation: 'modal' }} />
        <Stack.Screen name="messages/[conversationId]" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="courses/[id]" />
        <Stack.Screen name="clubs/[country]/[club]" />
        <Stack.Screen name="profile/[userId]" />
        <Stack.Screen name="map" />
      </Stack.Protected>
    </Stack>
  );
}
