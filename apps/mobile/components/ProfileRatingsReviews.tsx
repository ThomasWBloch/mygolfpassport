import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { bodyFont, displayFont } from '@/lib/fonts';
import type { RatingRow, ReviewRow } from '@/lib/you';

/**
 * Ported from apps/web/src/components/ProfileRatingsReviews.tsx — two
 * collapsible tiles for the You > Profile subtab: a Ratings tile
 * (average + distribution bar, expands to every rated round, sortable) and
 * a Reviews tile (written notes, teaser text that expands on tap, "open all
 * reviews" reveals the rest inline).
 */
const GENERIC = /^18(\s|-|$)|^par\s*3$|hole course/i;
function courseTag(name: string): string {
  const n = (name ?? '').trim();
  return n && !GENERIC.test(n) ? n : '';
}
function metaLine(row: RatingRow): string {
  return [courseTag(row.name), row.country, row.played].filter(Boolean).join(' · ');
}

function Stars({ value }: { value: number }) {
  return (
    <Text style={{ fontSize: 13, letterSpacing: 1 }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Text key={i} style={{ color: i < value ? colors.accent.gold : colors.border.paperFaint }}>
          ★
        </Text>
      ))}
    </Text>
  );
}

function RatingValue({ value }: { value: number }) {
  return (
    <Text style={{ fontFamily: displayFont.bold, fontSize: 17, color: colors.accent.goldDark }}>
      {value}
      <Text style={{ fontSize: 12, color: colors.ink.tertiary, fontFamily: bodyFont.regular }}>/10</Text>
    </Text>
  );
}

const tileStyle = {
  backgroundColor: colors.paper.white,
  borderWidth: 1,
  borderColor: colors.border.paperFaint,
  borderRadius: 14,
  overflow: 'hidden' as const,
};
const eyebrowStyle = {
  fontFamily: bodyFont.bold,
  fontSize: 11,
  letterSpacing: 1.5,
  color: colors.ink.tertiary,
};
const clubNameStyle = { fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary, flexShrink: 1 };
const subMetaStyle = { fontFamily: bodyFont.regular, fontSize: 12, color: colors.ink.tertiary, marginTop: 1 };

function RatingsTile({ ratings, onPressCourse }: { ratings: RatingRow[]; onPressCourse?: (courseId: string) => void }) {
  const [open, setOpen] = useState(false);
  const [dir, setDir] = useState<'desc' | 'asc'>('desc');

  const count = ratings.length;
  const avg = count ? ratings.reduce((s, r) => s + r.rating, 0) / count : 0;

  const dist: number[] = Array.from({ length: 11 }, () => 0);
  for (const r of ratings) dist[r.rating] = (dist[r.rating] ?? 0) + 1;
  const distMax = Math.max(1, ...dist.slice(1));

  const sorted = [...ratings].sort((a, b) => (dir === 'asc' ? a.rating - b.rating : b.rating - a.rating));

  return (
    <View style={tileStyle}>
      <Pressable accessibilityRole="button" onPress={() => setOpen((o) => !o)} style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text className="uppercase" style={eyebrowStyle}>Ratings</Text>
          <Text style={{ color: colors.accent.goldDark, fontSize: 13 }}>{open ? '▴' : '▾'}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 14, marginTop: 8 }}>
          <Text style={{ fontFamily: displayFont.bold, fontSize: 36, lineHeight: 38, color: colors.ink.primary }}>
            {count ? avg.toFixed(1) : '–'}
          </Text>
          <View style={{ gap: 4, paddingBottom: 5 }}>
            <Text style={{ fontFamily: bodyFont.regular, fontSize: 12, color: colors.ink.secondary }}>
              {count} {count === 1 ? 'rating' : 'ratings'} · average
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 22 }}>
              {Array.from({ length: 9 }, (_, k) => {
                const v = dist[k + 2] ?? 0;
                const h = v ? Math.max(2, Math.round((v / distMax) * 22)) : 2;
                return (
                  <View
                    key={k}
                    style={{
                      width: 7,
                      height: h,
                      borderRadius: 1,
                      backgroundColor:
                        v === distMax ? colors.accent.goldDark : v ? colors.accent.gold : colors.border.paperFaint,
                    }}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </Pressable>

      {open && (
        <View style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint, padding: 14, paddingTop: 10 }}>
          {count === 0 ? (
            <Text style={{ fontFamily: bodyFont.regular, fontSize: 13, color: colors.ink.tertiary, paddingVertical: 12 }}>
              No ratings yet.
            </Text>
          ) : (
            <>
              <View style={{ flexDirection: 'row', gap: 6, marginBottom: 10 }}>
                {(['desc', 'asc'] as const).map((d) => (
                  <Pressable
                    key={d}
                    accessibilityRole="button"
                    onPress={() => setDir(d)}
                    style={{
                      borderRadius: 6,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: dir === d ? colors.accent.gold : colors.paper.creamWarm,
                    }}
                  >
                    <Text
                      className="uppercase"
                      style={{
                        fontFamily: bodyFont.bold,
                        fontSize: 11,
                        color: dir === d ? colors.passport.coverInk : colors.ink.secondary,
                      }}
                    >
                      {d === 'desc' ? 'High → low' : 'Low → high'}
                    </Text>
                  </Pressable>
                ))}
              </View>
              {sorted.map((r, i) => (
                <Pressable
                  key={i}
                  onPress={onPressCourse ? () => onPressCourse(r.courseId) : undefined}
                  style={{
                    paddingVertical: 7,
                    borderBottomWidth: i < sorted.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border.paperFaint,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                    <Text numberOfLines={1} style={clubNameStyle}>{r.club}</Text>
                    <RatingValue value={r.rating} />
                  </View>
                  {metaLine(r).length > 0 && <Text style={subMetaStyle}>{metaLine(r)}</Text>}
                  <View style={{ marginTop: 3 }}>
                    <Stars value={r.rating} />
                  </View>
                </Pressable>
              ))}
            </>
          )}
        </View>
      )}
    </View>
  );
}

function ReviewsTile({ reviews, onPressCourse }: { reviews: ReviewRow[]; onPressCourse?: (courseId: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  if (reviews.length === 0) return null;

  const visible = showAll ? reviews : reviews.slice(0, 1);
  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const TEASER = 90;

  return (
    <View style={tileStyle}>
      <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text className="uppercase" style={eyebrowStyle}>Recent reviews</Text>
        <Text style={{ fontFamily: bodyFont.regular, fontSize: 11, color: colors.ink.tertiary }}>
          {reviews.length} written
        </Text>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        {visible.map((r, i) => {
          const long = r.note.length > TEASER;
          const isOpen = expanded.has(i);
          const text = !long || isOpen ? r.note : `${r.note.slice(0, TEASER).trimEnd()}…`;
          return (
            <Pressable
              key={i}
              onPress={onPressCourse ? () => onPressCourse(r.courseId) : undefined}
              style={{ paddingVertical: 9, borderBottomWidth: i < visible.length - 1 ? 1 : 0, borderBottomColor: colors.border.paperFaint }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <Text numberOfLines={1} style={clubNameStyle}>{r.club}</Text>
                {r.rating > 0 && <RatingValue value={r.rating} />}
              </View>
              {metaLine(r).length > 0 && <Text style={subMetaStyle}>{metaLine(r)}</Text>}
              {r.rating > 0 && (
                <View style={{ marginTop: 3 }}>
                  <Stars value={r.rating} />
                </View>
              )}
              <Text style={{ fontFamily: bodyFont.regular, fontSize: 13, color: colors.ink.secondary, marginTop: 4, lineHeight: 18 }}>
                “{text}”
                {long && (
                  <Text onPress={() => toggle(i)} style={{ color: colors.accent.goldDark, fontFamily: bodyFont.semibold }}>
                    {'  '}{isOpen ? 'less' : 'more ›'}
                  </Text>
                )}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {reviews.length > 1 && (
        <Pressable
          accessibilityRole="button"
          onPress={() => setShowAll((s) => !s)}
          style={{ borderTopWidth: 1, borderTopColor: colors.border.paperFaint, paddingVertical: 12, alignItems: 'center' }}
        >
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: colors.accent.goldDark }}>
            {showAll ? 'Show fewer ▴' : `Open all reviews (${reviews.length}) ▾`}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

export default function ProfileRatingsReviews({
  ratings,
  reviews,
  onPressCourse,
}: {
  ratings: RatingRow[];
  reviews: ReviewRow[];
  onPressCourse?: (courseId: string) => void;
}) {
  if (ratings.length === 0 && reviews.length === 0) return null;
  return (
    <View style={{ gap: 14 }}>
      <RatingsTile ratings={ratings} onPressCourse={onPressCourse} />
      <ReviewsTile reviews={reviews} onPressCourse={onPressCourse} />
    </View>
  );
}
