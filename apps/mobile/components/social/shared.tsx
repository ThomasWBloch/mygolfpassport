import { Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';

export function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Text style={{ color: colors.ink.primary, fontFamily: displayFont.medium, fontSize: 18 }}>
          {title}
        </Text>
        {count != null && (
          <View
            style={{
              backgroundColor: colors.paper.creamWarm,
              borderWidth: 1,
              borderColor: colors.border.paperFaint,
              borderRadius: 4,
              paddingHorizontal: 6,
              paddingVertical: 1,
            }}
          >
            <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.bold, fontSize: 11 }}>
              {count}
            </Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}

export function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="uppercase"
      style={{
        color: colors.ink.tertiary,
        fontFamily: bodyFont.bold,
        fontSize: 11,
        letterSpacing: 1.5,
        marginBottom: 6,
      }}
    >
      {children}
    </Text>
  );
}

export function RowCard({ children, highlighted }: { children: React.ReactNode; highlighted?: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: highlighted ? colors.accent.goldFaint : colors.paper.white,
        borderWidth: 1,
        borderColor: highlighted ? colors.accent.gold : colors.border.paperFaint,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        gap: 10,
      }}
    >
      {children}
    </View>
  );
}

// `club` and `meta` render on separate lines (rather than one joined,
// single-line-truncated string) so a long club name can't push the course
// count off the end and hide it.
export function RowInfo({
  name,
  club,
  meta,
}: {
  name: string;
  club?: string | null;
  meta?: string | null;
}) {
  const subStyle = {
    color: colors.ink.tertiary,
    fontFamily: bodyFont.semibold,
    fontSize: 11,
    letterSpacing: 1,
    marginTop: 3,
  };
  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      <Text style={{ color: colors.ink.primary, fontFamily: displayFont.medium, fontSize: 16 }} numberOfLines={1}>
        {name}
      </Text>
      {club && (
        <Text className="uppercase" style={subStyle} numberOfLines={1}>
          {club}
        </Text>
      )}
      {meta && (
        <Text className="uppercase" style={subStyle} numberOfLines={1}>
          {meta}
        </Text>
      )}
    </View>
  );
}

export function EmptyText({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{ color: colors.ink.tertiary, fontFamily: bodyFont.regular, fontSize: 13, textAlign: 'center', paddingVertical: 12 }}
    >
      {children}
    </Text>
  );
}

export function SmallButton({
  label,
  onPress,
  busy,
  filled,
  danger,
}: {
  label: string;
  onPress: () => void;
  busy?: boolean;
  filled?: boolean;
  danger?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={busy}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: filled ? colors.passport.cover : 'transparent',
        borderWidth: filled ? 0 : 1,
        borderColor: danger ? colors.border.paperFaint : colors.border.paper,
        opacity: busy ? 0.5 : 1,
      }}
    >
      <Text
        className="uppercase"
        style={{
          fontFamily: bodyFont.bold,
          fontSize: 11,
          letterSpacing: 1,
          color: filled ? colors.ink.inverse : danger ? colors.state.danger : colors.ink.secondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function StatusPill({ label, tone }: { label: string; tone: 'cover' | 'neutral' | 'gold' }) {
  const toneColors = {
    cover: { bg: colors.paper.creamWarm, border: colors.border.paper, text: colors.passport.cover },
    neutral: { bg: colors.paper.creamWarm, border: colors.border.paperFaint, text: colors.ink.secondary },
    gold: { bg: colors.accent.goldFaint, border: colors.accent.gold, text: colors.accent.goldDark },
  }[tone];

  return (
    <View
      style={{
        backgroundColor: toneColors.bg,
        borderWidth: 1,
        borderColor: toneColors.border,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text className="uppercase" style={{ color: toneColors.text, fontFamily: bodyFont.bold, fontSize: 11 }}>
        {label}
      </Text>
    </View>
  );
}
