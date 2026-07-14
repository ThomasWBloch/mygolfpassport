import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

// Font files to hand to useFonts() in app/_layout.tsx.
export const fontsToLoad = {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
};

// Weight -> loaded PostScript name. Mirrors design-tokens.ts's
// typography.family: "display" (Cormorant Garamond, headlines/names —
// apps/web's --font-mgp-display) and "body" (Inter — apps/web's
// --font-mgp-body AND --font-mgp-stamp, since "stamp" on web is just the
// body font with uppercase + wide letter-spacing, not a separate face).
export const displayFont = {
  regular: 'CormorantGaramond_400Regular',
  regularItalic: 'CormorantGaramond_400Regular_Italic',
  medium: 'CormorantGaramond_500Medium',
  semibold: 'CormorantGaramond_600SemiBold',
  bold: 'CormorantGaramond_700Bold',
} as const;

export const bodyFont = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;
