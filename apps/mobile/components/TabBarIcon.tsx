import { View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

/**
 * Wraps a tab icon with the gold underline bar web shows above the active
 * tab (BottomNav.tsx's NavItem) — React Navigation's default tab bar only
 * changes icon/label color for the active state, so this bar was missing.
 */
export default function TabBarIcon({ focused, children }: { focused: boolean; children: React.ReactNode }) {
  return (
    <View style={{ alignItems: 'center', width: 40 }}>
      {focused && (
        <View
          style={{
            position: 'absolute',
            top: -8,
            width: 40,
            height: 3,
            borderRadius: 1.5,
            backgroundColor: colors.accent.goldLight,
          }}
        />
      )}
      {children}
    </View>
  );
}
