import { Pressable, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

// Ported from apps/web/src/components/ProfileEditClient.tsx's Toggle —
// a pill switch, not a native Switch, to match the Adventure design system.
export default function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked }}
      onPress={() => onChange(!checked)}
      style={{
        width: 46,
        height: 26,
        borderRadius: 13,
        backgroundColor: checked ? colors.passport.cover : colors.border.paper,
        padding: 3,
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: colors.paper.cream,
          alignSelf: checked ? 'flex-end' : 'flex-start',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 2,
        }}
      />
    </Pressable>
  );
}
