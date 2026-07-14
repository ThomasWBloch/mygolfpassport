import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors } from '@mygolfpassport/shared';

type Props = TextInputProps & { label: string };

export default function AuthInput({ label, style, ...inputProps }: Props) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: colors.ink.secondary,
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 0.5,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        placeholderTextColor={colors.ink.tertiary}
        style={[
          {
            borderWidth: 1,
            borderColor: colors.border.paper,
            backgroundColor: colors.paper.white,
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingVertical: 12,
            fontSize: 15,
            color: colors.ink.primary,
          },
          style,
        ]}
        {...inputProps}
      />
    </View>
  );
}
