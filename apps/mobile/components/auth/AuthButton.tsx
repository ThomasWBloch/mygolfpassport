import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '@mygolfpassport/shared';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function AuthButton({ label, onPress, disabled, loading }: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={{
        backgroundColor: colors.accent.gold,
        opacity: isDisabled ? 0.5 : 1,
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.passport.coverInk} />
      ) : (
        <Text style={{ color: colors.passport.coverInk, fontWeight: '700', fontSize: 15 }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
