import '../global.css';

import { Stack, ThemeProvider } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// My Golf Passport uses one fixed "passport" palette — it doesn't adapt to
// the OS light/dark setting — so this is a single navigation theme, not a
// dark/light pair.
const passportTheme: ReactNavigation.Theme = {
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
    <ThemeProvider value={passportTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="log" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
