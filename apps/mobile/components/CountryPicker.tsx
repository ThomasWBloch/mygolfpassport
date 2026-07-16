import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { COUNTRY_OPTIONS } from '@/lib/countries';
import { bodyFont } from '@/lib/fonts';

/**
 * Mobile equivalent of CourseBrowser.tsx's country <select> — a chip that
 * opens a searchable bottom sheet over all 149 COUNTRY_OPTIONS, since RN
 * has no native <select>. `value: null` means "All countries", matching
 * web's default option.
 */
type Props = {
  value: string | null;
  onChange: (country: string | null) => void;
};

export default function CountryPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = value ? COUNTRY_OPTIONS.find((c) => c.value === value) : null;
  const filtered =
    query.trim().length > 0
      ? COUNTRY_OPTIONS.filter((c) => c.label.toLowerCase().includes(query.trim().toLowerCase()))
      : COUNTRY_OPTIONS;

  function select(country: string | null) {
    onChange(country);
    setOpen(false);
    setQuery('');
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        style={{
          flexShrink: 0,
          maxWidth: 128,
          borderWidth: 1,
          borderColor: colors.border.paper,
          backgroundColor: colors.paper.white,
          borderRadius: 8,
          paddingHorizontal: 12,
          justifyContent: 'center',
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: bodyFont.regular,
            fontSize: 14,
            color: selected ? colors.ink.primary : colors.ink.tertiary,
          }}
        >
          {selected ? selected.label : 'All countries'}
        </Text>
      </Pressable>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={() => setOpen(false)} />
          <View
            style={{
              backgroundColor: colors.paper.cream,
              maxHeight: '70%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 16,
              paddingBottom: 24,
            }}
          >
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search country…"
              placeholderTextColor={colors.ink.tertiary}
              autoCapitalize="none"
              autoFocus
              style={{
                borderWidth: 1,
                borderColor: colors.border.paper,
                backgroundColor: colors.paper.white,
                borderRadius: 8,
                paddingHorizontal: 14,
                paddingVertical: 10,
                fontFamily: bodyFont.regular,
                fontSize: 15,
                color: colors.ink.primary,
                marginBottom: 10,
              }}
            />
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.value}
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={
                query.trim().length === 0 ? (
                  <Pressable
                    onPress={() => select(null)}
                    style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border.paperFaint }}
                  >
                    <Text style={{ fontFamily: bodyFont.semibold, fontSize: 15, color: colors.accent.goldDark }}>
                      All countries
                    </Text>
                  </Pressable>
                ) : null
              }
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => select(item.value)}
                  style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border.paperFaint }}
                >
                  <Text style={{ fontFamily: bodyFont.regular, fontSize: 15, color: colors.ink.primary }}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
