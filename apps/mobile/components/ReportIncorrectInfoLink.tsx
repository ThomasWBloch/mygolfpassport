import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { REPORT_TYPE_OPTIONS, submitCourseEdit } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/ReportIncorrectInfoLink.tsx — a
 * low-visibility link that opens a form for proposing a correction to a
 * course/club's metadata. Always rendered here since the course detail
 * screen already requires a signed-in session (web hides it entirely for
 * signed-out viewers).
 */
export default function ReportIncorrectInfoLink({ courseId }: { courseId: string }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(REPORT_TYPE_OPTIONS[0].value);
  const [message, setMessage] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  function reset() {
    setType(REPORT_TYPE_OPTIONS[0].value);
    setMessage('');
    setSourceUrl('');
    setStatus('idle');
    setErrorText('');
  }

  async function handleSubmit() {
    if (submitting) return;
    setSubmitting(true);
    setStatus('idle');
    setErrorText('');
    try {
      await submitCourseEdit(courseId, type, message, sourceUrl || null);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorText(err instanceof Error ? err.message : 'Could not submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const trimmedLen = message.trim().length;
  const canSubmit = !submitting && trimmedLen > 0 && trimmedLen <= 500;

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={() => { reset(); setOpen(true); }}
        style={{ paddingVertical: 12 }}
      >
        <Text
          className="uppercase"
          style={{
            textAlign: 'center',
            fontFamily: bodyFont.semibold,
            fontSize: 11,
            letterSpacing: 1.5,
            color: colors.ink.tertiary,
            textDecorationLine: 'underline',
          }}
        >
          Report incorrect info ›
        </Text>
      </Pressable>

      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Pressable style={{ flex: 1, backgroundColor: 'rgba(15, 37, 25, 0.4)' }} onPress={() => setOpen(false)} />
          <View
            style={{
              backgroundColor: colors.paper.cream,
              maxHeight: '85%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 18,
              paddingBottom: 28,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <Text style={{ fontFamily: displayFont.medium, fontSize: 20, color: colors.ink.primary }}>
                Suggest a correction
              </Text>
              <Pressable accessibilityRole="button" onPress={() => setOpen(false)} hitSlop={10}>
                <Text style={{ fontSize: 22, color: colors.ink.tertiary, lineHeight: 22 }}>×</Text>
              </Pressable>
            </View>

            {status === 'success' ? (
              <View>
                <Text style={{ fontFamily: displayFont.medium, fontSize: 16, color: colors.ink.primary, marginBottom: 6 }}>
                  Thanks — your suggestion was logged.
                </Text>
                <Text style={{ fontSize: 14, color: colors.ink.secondary, lineHeight: 20 }}>
                  Someone on the My Golf Passport team will review it. No need to do anything else.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => setOpen(false)}
                  style={{ marginTop: 16, backgroundColor: colors.passport.cover, borderRadius: 6, paddingVertical: 12, alignItems: 'center' }}
                >
                  <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}>
                    Close
                  </Text>
                </Pressable>
              </View>
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets>
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary, marginBottom: 8 }}
                >
                  What's wrong?
                </Text>
                <View style={{ borderWidth: 1, borderColor: colors.border.paperFaint, borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
                  {REPORT_TYPE_OPTIONS.map((o, i) => (
                    <Pressable
                      key={o.value}
                      onPress={() => setType(o.value)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        paddingHorizontal: 12,
                        paddingVertical: 12,
                        backgroundColor: type === o.value ? colors.paper.creamWarm : colors.paper.white,
                        borderTopWidth: i === 0 ? 0 : 1,
                        borderTopColor: colors.border.paperFaint,
                      }}
                    >
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          borderWidth: 1.5,
                          borderColor: type === o.value ? colors.accent.goldDark : colors.border.paperStrong,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {type === o.value && (
                          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent.goldDark }} />
                        )}
                      </View>
                      <Text style={{ flex: 1, fontSize: 14, color: colors.ink.primary }}>{o.label}</Text>
                    </Pressable>
                  ))}
                </View>

                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary, marginBottom: 8 }}
                >
                  Details
                </Text>
                <TextInput
                  value={message}
                  onChangeText={setMessage}
                  editable={!submitting}
                  placeholder="What should the correct value be? Any details that help us verify the change."
                  placeholderTextColor={colors.ink.tertiary}
                  multiline
                  numberOfLines={4}
                  maxLength={500}
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border.paperFaint,
                    backgroundColor: colors.paper.creamWarm,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 15,
                    color: colors.ink.primary,
                    minHeight: 90,
                    textAlignVertical: 'top',
                  }}
                />
                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1.2, color: colors.ink.tertiary, textAlign: 'right', marginTop: 4, marginBottom: 14 }}
                >
                  {message.length} / 500
                </Text>

                <Text
                  className="uppercase"
                  style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary, marginBottom: 8 }}
                >
                  Source (optional)
                </Text>
                <TextInput
                  value={sourceUrl}
                  onChangeText={setSourceUrl}
                  editable={!submitting}
                  placeholder="https://example.com — a link that supports your suggestion"
                  placeholderTextColor={colors.ink.tertiary}
                  autoCapitalize="none"
                  keyboardType="url"
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border.paperFaint,
                    backgroundColor: colors.paper.creamWarm,
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    fontSize: 15,
                    color: colors.ink.primary,
                    marginBottom: 16,
                  }}
                />

                {status === 'error' && errorText.length > 0 && (
                  <View
                    style={{
                      backgroundColor: colors.paper.creamWarm,
                      borderWidth: 1,
                      borderColor: colors.stamp.red,
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 12,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: colors.stamp.red, lineHeight: 19 }}>{errorText}</Text>
                  </View>
                )}

                <Pressable
                  accessibilityRole="button"
                  onPress={handleSubmit}
                  disabled={!canSubmit}
                  style={{
                    backgroundColor: colors.passport.cover,
                    borderRadius: 6,
                    paddingVertical: 12,
                    alignItems: 'center',
                    opacity: canSubmit ? 1 : 0.5,
                  }}
                >
                  <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}>
                    {submitting ? 'Submitting…' : 'Submit suggestion'}
                  </Text>
                </Pressable>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
