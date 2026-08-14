import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';
import {
  daysInMonth,
  decodePlayedDate,
  encodePlayedDate,
  formatPlayedDate,
  isDaySelectable,
  isMonthSelectable,
  isYearSelectable,
  type PlayedDateValue,
} from '@/lib/played-date';

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MIN_YEAR_OFFSET = 75;

type Stage = 'closed' | 'year' | 'month' | 'day';

type Props = {
  value: PlayedDateValue;
  onChange: (value: PlayedDateValue) => void;
  maxDate?: Date;
};

/**
 * Stepped year → month → day picker, replacing the old single spinner
 * DateTimePicker. Nothing is ever pre-selected on a fresh round; editing an
 * existing round opens at the year step with its known year marked (and
 * carries month/day forward too, if known) so the user sees what's already
 * saved instead of starting blank — see the approved mockup / plan.
 */
export default function PlayedDatePicker({ value, onChange, maxDate = new Date() }: Props) {
  const [stage, setStage] = useState<Stage>('closed');
  const [pendingYear, setPendingYear] = useState<number | null>(null);
  const [pendingMonth, setPendingMonth] = useState<number | null>(null);

  function open() {
    if (value.playedAt && value.precision) {
      const { year, month, day } = decodePlayedDate(value.playedAt);
      setPendingYear(year);
      setPendingMonth(value.precision !== 'year' ? month : null);
    } else {
      setPendingYear(null);
      setPendingMonth(null);
    }
    setStage('year');
  }

  function close() {
    setStage('closed');
  }

  function finish(year: number | null, month: number | null, day: number | null) {
    onChange(encodePlayedDate(year, month, day));
    close();
  }

  function selectYear(year: number) {
    if (year !== pendingYear) setPendingMonth(null);
    setPendingYear(year);
    setStage('month');
  }

  function selectMonth(month: number) {
    setPendingMonth(month);
    setStage('day');
  }

  const label = formatPlayedDate(value.playedAt, value.precision, 'long');
  const currentYear = maxDate.getFullYear();
  const years = Array.from({ length: MIN_YEAR_OFFSET + 1 }, (_, i) => currentYear - i);

  return (
    <>
      <Pressable
        accessibilityRole="button"
        onPress={open}
        style={{
          borderWidth: 1,
          borderColor: colors.border.paperFaint,
          backgroundColor: colors.paper.creamWarm,
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }}
      >
        <Text style={{ fontFamily: bodyFont.regular, fontSize: 15, color: label ? colors.ink.primary : colors.ink.tertiary }}>
          {label ?? 'Select date'}
        </Text>
      </Pressable>

      <Modal visible={stage !== 'closed'} animationType="slide" transparent onRequestClose={close}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Pressable style={{ flex: 1, backgroundColor: 'rgba(15, 37, 25, 0.4)' }} onPress={close} />
          <View
            style={{
              backgroundColor: colors.paper.cream,
              maxHeight: '80%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 18,
              paddingBottom: 28,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              {stage !== 'year' ? (
                <Pressable onPress={() => setStage(stage === 'day' ? 'month' : 'year')} hitSlop={10}>
                  <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.5 }}>
                    ← Back
                  </Text>
                </Pressable>
              ) : (
                <View />
              )}
              <Pressable accessibilityRole="button" onPress={close} hitSlop={10}>
                <Text style={{ fontSize: 22, color: colors.ink.tertiary, lineHeight: 22 }}>×</Text>
              </Pressable>
            </View>

            <Text style={{ fontFamily: displayFont.medium, fontSize: 20, color: colors.ink.primary, marginBottom: 4 }}>
              {stage === 'year' && 'When did you play here?'}
              {stage === 'month' && `Which month, ${pendingYear}?`}
              {stage === 'day' && `Which day in ${MONTH_LABELS[pendingMonth ?? 0]} ${pendingYear}?`}
            </Text>
            <Text style={{ fontSize: 13, color: colors.ink.tertiary, marginBottom: 16 }}>
              Will be saved as: {formatPlayedDate(
                encodePlayedDate(pendingYear, pendingMonth, null).playedAt,
                pendingMonth != null ? 'month' : pendingYear != null ? 'year' : null,
                'long'
              ) ?? 'No date — not chosen yet'}
            </Text>

            <ScrollView keyboardShouldPersistTaps="handled">
              {stage === 'year' && (
                <>
                  <Pressable
                    onPress={() => finish(null, null, null)}
                    style={{
                      width: '100%',
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors.accent.gold,
                      backgroundColor: colors.accent.goldFaint,
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 13 }}>
                      I don't remember at all
                    </Text>
                  </Pressable>
                  <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                    Or pick a year
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {years.map((y) => {
                      const disabled = !isYearSelectable(y, maxDate);
                      const marked = y === pendingYear;
                      return (
                        <Pressable
                          key={y}
                          disabled={disabled}
                          onPress={() => selectYear(y)}
                          style={{
                            width: '22%',
                            paddingVertical: 10,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: marked ? colors.passport.cover : colors.border.paper,
                            backgroundColor: marked ? colors.passport.cover : colors.paper.white,
                            alignItems: 'center',
                            opacity: disabled ? 0.35 : 1,
                          }}
                        >
                          <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: marked ? colors.ink.inverse : colors.ink.primary }}>
                            {y}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              )}

              {stage === 'month' && pendingYear != null && (
                <>
                  <Pressable
                    onPress={() => finish(pendingYear, null, null)}
                    style={{
                      width: '100%',
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors.accent.gold,
                      backgroundColor: colors.accent.goldFaint,
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 13 }}>
                      I don't remember the month
                    </Text>
                  </Pressable>
                  <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                    Or pick a month
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                    {MONTH_LABELS.map((label, m) => {
                      const disabled = !isMonthSelectable(pendingYear, m, maxDate);
                      const marked = m === pendingMonth;
                      return (
                        <Pressable
                          key={label}
                          disabled={disabled}
                          onPress={() => selectMonth(m)}
                          style={{
                            width: '22%',
                            paddingVertical: 10,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: marked ? colors.passport.cover : colors.border.paper,
                            backgroundColor: marked ? colors.passport.cover : colors.paper.white,
                            alignItems: 'center',
                            opacity: disabled ? 0.35 : 1,
                          }}
                        >
                          <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: marked ? colors.ink.inverse : colors.ink.primary }}>
                            {label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              )}

              {stage === 'day' && pendingYear != null && pendingMonth != null && (
                <>
                  <Pressable
                    onPress={() => finish(pendingYear, pendingMonth, null)}
                    style={{
                      width: '100%',
                      paddingVertical: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: colors.accent.gold,
                      backgroundColor: colors.accent.goldFaint,
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold, fontSize: 13 }}>
                      I don't remember the day
                    </Text>
                  </Pressable>
                  <Text className="uppercase" style={{ color: colors.ink.tertiary, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, marginBottom: 8 }}>
                    Or pick a day
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                    {Array.from({ length: daysInMonth(pendingYear, pendingMonth) }, (_, i) => i + 1).map((d) => {
                      const disabled = !isDaySelectable(pendingYear, pendingMonth, d, maxDate);
                      return (
                        <Pressable
                          key={d}
                          disabled={disabled}
                          onPress={() => finish(pendingYear, pendingMonth, d)}
                          style={{
                            width: '13%',
                            paddingVertical: 8,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: colors.border.paper,
                            backgroundColor: colors.paper.white,
                            alignItems: 'center',
                            opacity: disabled ? 0.35 : 1,
                          }}
                        >
                          <Text style={{ fontFamily: bodyFont.regular, fontSize: 13, color: colors.ink.primary }}>{d}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
