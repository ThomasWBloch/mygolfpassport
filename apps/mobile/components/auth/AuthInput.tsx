import { useState } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@mygolfpassport/shared';

import { bodyFont } from '@/lib/fonts';

type Props = TextInputProps & { label: string };

/**
 * Labelled text field for the auth screens. A field passed `secureTextEntry`
 * is a password field: it gets a show/hide (eye) button so people can check
 * what they typed, and autocorrect/spellcheck are turned off — on some
 * Android keyboards (Samsung especially) predictive text in a hidden field
 * drops or swaps characters.
 */
export default function AuthInput({ label, style, secureTextEntry, ...inputProps }: Props) {
  const isPassword = !!secureTextEntry;
  const [hidden, setHidden] = useState(true);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          color: colors.ink.secondary,
          fontFamily: bodyFont.semibold,
          fontSize: 12,
          letterSpacing: 0.5,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>
      <View>
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
              fontFamily: bodyFont.regular,
              fontSize: 15,
              color: colors.ink.primary,
            },
            isPassword && { paddingRight: 48 },
            style,
          ]}
          {...inputProps}
          secureTextEntry={isPassword && hidden}
          {...(isPassword ? { autoCorrect: false, spellCheck: false, autoCapitalize: 'none' as const } : {})}
        />
        {isPassword && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
            onPress={() => setHidden((h) => !h)}
            hitSlop={8}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color={colors.ink.tertiary} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
