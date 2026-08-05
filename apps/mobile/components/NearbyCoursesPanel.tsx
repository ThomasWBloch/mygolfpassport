import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import { usStateSuffix } from '@/lib/course-display';
import { fetchLastRoundCoords, fetchNearbyCourses, type NearbyCourse } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';

/**
 * Ported from apps/web/src/components/NearbyCoursesPanel.tsx — an
 * always-visible discovery panel at the top of the Courses tab, not
 * gated behind the Log flow. "Hide played" defaults on (discovery mode)
 * and persists via AsyncStorage (web uses localStorage).
 *
 * When device geolocation is denied, falls back to the user's last-round
 * coordinates instead of a dead-end error (native-only per memory
 * project_log_nearby_fallback — web deliberately has no such fallback).
 *
 * `compact` renders the smaller "Courses near you" preview used at the top
 * of Home: a fixed 3-result list, no collapse chevron, no hide-played
 * toggle, and a "See all" link (via `onSeeAll`) instead of "See more
 * nearby" — full control still lives on the Courses tab's copy of this
 * panel.
 */
const STORAGE_KEY_HIDE_PLAYED = 'mgp:nearby:hidePlayed';
const INITIAL_LIMIT = 5;
const EXPANDED_LIMIT = 20;
const COMPACT_LIMIT = 3;

type Status = 'idle' | 'asking' | 'loading' | 'ready' | 'denied' | 'error' | 'empty';

export default function NearbyCoursesPanel({
  onSelectCourse,
  compact,
  onSeeAll,
}: {
  onSelectCourse?: (course: NearbyCourse) => void;
  compact?: boolean;
  onSeeAll?: () => void;
}) {
  const { session } = useAuth();
  const userId = session?.user.id;

  const initialLimit = compact ? COMPACT_LIMIT : INITIAL_LIMIT;

  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [results, setResults] = useState<NearbyCourse[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [hidePlayed, setHidePlayed] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY_HIDE_PLAYED).then((v) => {
      if (v === '0') setHidePlayed(false);
    });
  }, []);

  async function loadFromCoords(lat: number, lng: number, limit: number, hidePlayedNow: boolean) {
    if (!userId) return;
    setStatus('loading');
    try {
      const nearby = await fetchNearbyCourses(userId, lat, lng, limit, !hidePlayedNow);
      setResults(nearby);
      setStatus(nearby.length === 0 ? 'empty' : 'ready');
    } catch {
      setStatus('error');
      setErrorText('Could not load nearby courses.');
    }
  }

  // Auto-open only when permission is already granted, so mounting this
  // panel never itself triggers a surprise OS permission dialog.
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      const { status: permStatus } = await Location.getForegroundPermissionsAsync();
      if (cancelled) return;

      if (permStatus === 'granted') {
        setStatus('asking');
        try {
          const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
          if (cancelled) return;
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(c);
          await loadFromCoords(c.lat, c.lng, initialLimit, hidePlayed);
        } catch {
          if (!cancelled) setStatus('idle');
        }
      } else if (permStatus === 'denied') {
        const fallback = await fetchLastRoundCoords(userId);
        if (cancelled) return;
        if (fallback) {
          setCoords(fallback);
          await loadFromCoords(fallback.lat, fallback.lng, initialLimit, hidePlayed);
        } else {
          setStatus('denied');
          setErrorText('Location permission denied. Enable it in your device settings.');
        }
      }
      // 'undetermined' → stay idle, let the button drive the flow
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function handleFindNearby() {
    if (!userId) return;
    setStatus('asking');
    try {
      const { status: permStatus } = await Location.requestForegroundPermissionsAsync();
      if (permStatus !== 'granted') {
        const fallback = await fetchLastRoundCoords(userId);
        if (fallback) {
          setCoords(fallback);
          await loadFromCoords(fallback.lat, fallback.lng, initialLimit, hidePlayed);
        } else {
          setStatus('denied');
          setErrorText('Location permission denied. Enable it in your device settings.');
        }
        return;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setCoords(c);
      await loadFromCoords(c.lat, c.lng, initialLimit, hidePlayed);
    } catch {
      setStatus('error');
      setErrorText('Could not get your location. Please try again.');
    }
  }

  function handleSeeMore() {
    if (!coords) return;
    setExpanded(true);
    loadFromCoords(coords.lat, coords.lng, EXPANDED_LIMIT, hidePlayed);
  }

  function handleToggleHidePlayed() {
    const next = !hidePlayed;
    setHidePlayed(next);
    AsyncStorage.setItem(STORAGE_KEY_HIDE_PLAYED, next ? '1' : '0');
    if (coords) loadFromCoords(coords.lat, coords.lng, expanded ? EXPANDED_LIMIT : initialLimit, next);
  }

  const hidePlayedToggle = (
    <Pressable
      accessibilityRole="button"
      onPress={handleToggleHidePlayed}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderWidth: 1,
        borderColor: hidePlayed ? colors.accent.goldDark : colors.border.paper,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <View
        style={{
          width: 22,
          height: 12,
          borderRadius: 6,
          backgroundColor: hidePlayed ? colors.accent.goldDark : colors.border.paperStrong,
          justifyContent: 'center',
          paddingHorizontal: 1,
          alignItems: hidePlayed ? 'flex-end' : 'flex-start',
        }}
      >
        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' }} />
      </View>
      <Text
        className="uppercase"
        style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1, color: hidePlayed ? colors.accent.goldDark : colors.ink.tertiary }}
      >
        Hide played
      </Text>
    </Pressable>
  );

  const header = (
    <View style={{ gap: collapsed ? 0 : 8, marginBottom: collapsed ? 0 : 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setCollapsed((c) => !c)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}
        >
          <Text className="uppercase" style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary }}>
            📍 {compact ? 'Courses near you' : 'Nearby courses'}
          </Text>
          <Text style={{ fontSize: 22, fontWeight: '700', color: colors.accent.goldDark }}>{collapsed ? '▸' : '▾'}</Text>
        </Pressable>
        {compact
          ? onSeeAll && (
              <Pressable accessibilityRole="button" onPress={onSeeAll}>
                <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: colors.accent.goldDark }}>
                  See all ›
                </Text>
              </Pressable>
            )
          : hidePlayedToggle}
      </View>
      {compact && !collapsed && <View style={{ alignSelf: 'flex-start' }}>{hidePlayedToggle}</View>}
    </View>
  );

  const shellStyle = {
    backgroundColor: colors.paper.creamWarm,
    borderWidth: 1,
    borderColor: colors.border.paper,
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
  };

  if (status === 'idle' || status === 'asking' || status === 'denied' || status === 'error') {
    return (
      <View style={shellStyle}>
        {header}
        {!collapsed && (
          <>
            <Pressable
              accessibilityRole="button"
              onPress={handleFindNearby}
              disabled={status === 'asking'}
              style={{
                backgroundColor: colors.passport.cover,
                borderRadius: 6,
                paddingVertical: 10,
                paddingHorizontal: 16,
                alignSelf: 'flex-start',
                opacity: status === 'asking' ? 0.6 : 1,
              }}
            >
              <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5 }}>
                {status === 'asking' ? 'Locating…' : 'Find courses near me →'}
              </Text>
            </Pressable>
            {(status === 'denied' || status === 'error') && errorText.length > 0 && (
              <Text style={{ marginTop: 8, fontSize: 13, color: colors.stamp.red, fontFamily: bodyFont.regular }}>{errorText}</Text>
            )}
          </>
        )}
      </View>
    );
  }

  if (status === 'loading') {
    return (
      <View style={shellStyle}>
        {header}
        {!collapsed && <ActivityIndicator color={colors.accent.gold} style={{ alignSelf: 'flex-start' }} />}
      </View>
    );
  }

  if (status === 'empty') {
    return (
      <View style={shellStyle}>
        {header}
        {!collapsed && (
          <Text style={{ fontSize: 14, color: colors.ink.secondary, fontFamily: bodyFont.regular }}>
            No courses within range. Browse the continents below instead.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={shellStyle}>
      {header}
      {!collapsed && (
      <>
      <View style={{ backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paper, borderRadius: 8, overflow: 'hidden' }}>
        {results.map((c, i) => {
          const primary = c.club ?? c.name;
          const showSubline = !!c.club && c.club !== c.name;
          return (
            <Pressable
              key={c.id}
              onPress={() => onSelectCourse?.(c)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                padding: 14,
                borderBottomWidth: i < results.length - 1 ? 1 : 0,
                borderBottomColor: colors.border.paperFaint,
              }}
            >
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text numberOfLines={1} style={{ fontFamily: displayFont.medium, fontSize: 15, color: colors.ink.primary }}>
                  {c.flag ? `${c.flag} ` : ''}{primary}{usStateSuffix(c.country, c.state)}
                </Text>
                {showSubline && (
                  <Text
                    className="uppercase"
                    numberOfLines={1}
                    style={{ fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 1.2, color: colors.ink.tertiary, marginTop: 2 }}
                  >
                    {c.name}
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {c.played && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderStyle: 'dashed',
                      borderColor: colors.stamp.red,
                      borderRadius: 4,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                    }}
                  >
                    <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1.5, color: colors.stamp.red }}>
                      ✓ Played
                    </Text>
                  </View>
                )}
                <Text style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1, color: colors.ink.secondary }}>
                  {c.distanceKm < 1 ? '< 1 km' : `${c.distanceKm} km`}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {!compact && !expanded && results.length === INITIAL_LIMIT && (
        <Pressable
          onPress={handleSeeMore}
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderColor: colors.border.paper,
            borderRadius: 8,
            paddingVertical: 9,
            alignItems: 'center',
          }}
        >
          <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 11, letterSpacing: 1.5, color: colors.ink.secondary }}>
            See more nearby ›
          </Text>
        </Pressable>
      )}
      </>
      )}
    </View>
  );
}
