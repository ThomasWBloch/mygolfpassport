import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import { useAuth } from '@/lib/auth-context';
import { bodyFont } from '@/lib/fonts';
import { sendFriendRequest } from '@/lib/friends';
import { fetchLeaderboard, type LeaderboardUser } from '@/lib/leaderboard';
import { EmptyText, RowCard, RowInfo, SmallButton, StatusPill } from './shared';

type FilterTab = 'friends' | 'club' | 'country' | 'continent' | 'world';

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'friends', label: 'Friends' },
  { key: 'club', label: 'Club' },
  { key: 'country', label: 'Country' },
  { key: 'continent', label: 'Continent' },
  { key: 'world', label: 'World' },
];

const MEDALS: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function LeaderboardSubtab() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [filter, setFilter] = useState<FilterTab>('world');
  const [users, setUsers] = useState<LeaderboardUser[] | null>(null);
  const [error, setError] = useState('');
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) return;
    fetchLeaderboard(userId)
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load leaderboard.'));
  }, [userId]);

  const filtered = useMemo(() => {
    if (!users) return [];
    switch (filter) {
      case 'friends':
        return users.filter((u) => u.friendshipStatus === 'friend');
      case 'club':
        return users.filter((u) => u.sameClub);
      case 'country':
        return users.filter((u) => u.sameCountry);
      case 'continent':
        return users.filter((u) => u.sameContinent);
      default:
        return users;
    }
  }, [users, filter]);

  async function handleAdd(targetId: string) {
    if (!userId) return;
    setBusyIds((prev) => new Set(prev).add(targetId));
    try {
      await sendFriendRequest(userId, targetId);
      setUsers((prev) =>
        prev
          ? prev.map((u) => (u.userId === targetId ? { ...u, friendshipStatus: 'pending_sent' } : u))
          : prev
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send request.');
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev);
        next.delete(targetId);
        return next;
      });
    }
  }

  if (!userId) return null;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {FILTER_TABS.map((t) => (
            <Pressable
              key={t.key}
              accessibilityRole="button"
              onPress={() => setFilter(t.key)}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                backgroundColor: filter === t.key ? colors.passport.cover : colors.paper.white,
                borderWidth: 1,
                borderColor: filter === t.key ? colors.passport.cover : colors.border.paper,
              }}
            >
              <Text
                style={{
                  color: filter === t.key ? colors.ink.inverse : colors.ink.secondary,
                  fontFamily: bodyFont.semibold,
                  fontSize: 12,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, paddingHorizontal: 20 }}>
          {error}
        </Text>
      )}

      {!users && error.length === 0 && (
        <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 40 }} />
      )}

      {users && filtered.length === 0 && (
        <View style={{ paddingHorizontal: 20 }}>
          <EmptyText>
            {filter === 'friends'
              ? 'Add some friends to see them here.'
              : 'No players found for this filter.'}
          </EmptyText>
        </View>
      )}

      {users && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.userId}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          renderItem={({ item, index }) => {
            const rank = index + 1;
            const isMe = item.userId === userId;
            return (
              <RowCard highlighted={isMe}>
                <View style={{ width: 28, alignItems: 'center' }}>
                  {MEDALS[rank] ? (
                    <Text style={{ fontSize: 16 }}>{MEDALS[rank]}</Text>
                  ) : (
                    <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 13 }}>
                      {rank}
                    </Text>
                  )}
                </View>
                <Avatar name={item.fullName} avatarUrl={item.avatarUrl} size={36} />
                <RowInfo
                  name={isMe ? `${item.fullName} (You)` : item.fullName}
                  club={item.homeClub ?? 'No home club'}
                  meta={`${item.courseCount} course${item.courseCount === 1 ? '' : 's'} · ${item.countryCount} ${item.countryCount === 1 ? 'country' : 'countries'}`}
                />
                {!isMe && (
                  <>
                    {item.friendshipStatus === 'friend' && <StatusPill label="Friends ✓" tone="cover" />}
                    {item.friendshipStatus === 'pending_sent' && <StatusPill label="Sent ✓" tone="neutral" />}
                    {item.friendshipStatus === 'pending_received' && <StatusPill label="Pending" tone="gold" />}
                    {item.friendshipStatus === 'none' && (
                      <SmallButton
                        label={busyIds.has(item.userId) ? 'Adding…' : '+ Add'}
                        filled
                        busy={busyIds.has(item.userId)}
                        onPress={() => handleAdd(item.userId)}
                      />
                    )}
                  </>
                )}
              </RowCard>
            );
          }}
        />
      )}
    </View>
  );
}
