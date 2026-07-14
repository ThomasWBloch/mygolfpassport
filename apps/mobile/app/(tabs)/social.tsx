import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, typography } from '@mygolfpassport/shared';

import { useAuth } from '@/lib/auth-context';
import {
  acceptFriendRequest,
  fetchFriendsAndPending,
  removeFriendship,
  searchPlayers,
  sendFriendRequest,
  type FriendEntry,
  type PendingRequest,
  type SearchResult,
} from '@/lib/friends';

export default function SocialScreen() {
  const { session } = useAuth();
  const userId = session?.user.id;

  const [friends, setFriends] = useState<FriendEntry[]>([]);
  const [pending, setPending] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);

  const setBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const loadFriends = useCallback(() => {
    if (!userId) return;
    setLoading(true);
    setError('');
    fetchFriendsAndPending(userId)
      .then(({ friends: f, pending: p }) => {
        setFriends(f);
        setPending(p);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load friends.'))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    loadFriends();
  }, [loadFriends]);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!userId || debouncedQuery.length < 2) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    searchPlayers(debouncedQuery, userId)
      .then(setSearchResults)
      .catch((err) => setError(err instanceof Error ? err.message : 'Search failed.'))
      .finally(() => setSearching(false));
  }, [debouncedQuery, userId]);

  async function handleAccept(friendshipId: string) {
    setBusy(friendshipId, true);
    try {
      await acceptFriendRequest(friendshipId);
      loadFriends();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not accept request.');
    } finally {
      setBusy(friendshipId, false);
    }
  }

  async function handleDeclineOrCancel(friendshipId: string) {
    setBusy(friendshipId, true);
    try {
      await removeFriendship(friendshipId);
      setPending((prev) => prev.filter((p) => p.friendshipId !== friendshipId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update request.');
    } finally {
      setBusy(friendshipId, false);
    }
  }

  function confirmRemoveFriend(friend: FriendEntry) {
    Alert.alert(
      `Remove ${friend.fullName}?`,
      "You'll need to send a new friend request if you want to reconnect.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            setBusy(friend.friendshipId, true);
            try {
              await removeFriendship(friend.friendshipId);
              setFriends((prev) => prev.filter((f) => f.friendshipId !== friend.friendshipId));
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Could not remove friend.');
            } finally {
              setBusy(friend.friendshipId, false);
            }
          },
        },
      ]
    );
  }

  async function handleAddFriend(targetId: string) {
    if (!userId) return;
    setBusy(targetId, true);
    try {
      await sendFriendRequest(userId, targetId);
      setSearchResults((prev) =>
        prev ? prev.map((r) => (r.userId === targetId ? { ...r, status: 'pending_sent' } : r)) : prev
      );
      loadFriends();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send request.');
    } finally {
      setBusy(targetId, false);
    }
  }

  if (!userId) return null;

  const incoming = pending.filter((p) => p.direction === 'incoming');
  const outgoing = pending.filter((p) => p.direction === 'outgoing');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.paper.cream }} contentContainerStyle={{ padding: 20 }}>
      <Text
        className="uppercase"
        style={{
          color: colors.passport.cover,
          fontWeight: '700',
          fontSize: typography.size.h2,
          letterSpacing: typography.tracking.wide,
          marginBottom: 16,
        }}
      >
        Social
      </Text>

      {error.length > 0 && (
        <Text style={{ color: colors.state.danger, marginBottom: 12 }}>{error}</Text>
      )}

      {loading && (
        <View style={{ paddingVertical: 40, alignItems: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {!loading && (
        <>
          {pending.length > 0 && (
            <Section title="Pending requests" count={pending.length}>
              {incoming.length > 0 && <SubLabel>Incoming</SubLabel>}
              {incoming.map((p) => (
                <RowCard key={p.friendshipId}>
                  <RowInfo name={p.fullName} sub={p.homeClub} />
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <SmallButton
                      label="Accept"
                      filled
                      busy={busyIds.has(p.friendshipId)}
                      onPress={() => handleAccept(p.friendshipId)}
                    />
                    <SmallButton
                      label="Decline"
                      busy={busyIds.has(p.friendshipId)}
                      onPress={() => handleDeclineOrCancel(p.friendshipId)}
                    />
                  </View>
                </RowCard>
              ))}

              {outgoing.length > 0 && <SubLabel>Sent</SubLabel>}
              {outgoing.map((p) => (
                <RowCard key={p.friendshipId}>
                  <RowInfo name={p.fullName} sub={p.homeClub} />
                  <SmallButton
                    label="Cancel"
                    danger
                    busy={busyIds.has(p.friendshipId)}
                    onPress={() => handleDeclineOrCancel(p.friendshipId)}
                  />
                </RowCard>
              ))}
            </Section>
          )}

          <Section title="Your friends" count={friends.length}>
            {friends.length === 0 ? (
              <EmptyText>No friends yet. Find players below to add friends.</EmptyText>
            ) : (
              friends.map((f) => (
                <RowCard key={f.friendshipId}>
                  <RowInfo
                    name={f.fullName}
                    sub={[f.homeClub, `${f.courseCount} course${f.courseCount === 1 ? '' : 's'}`]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                  <SmallButton
                    label="Remove"
                    danger
                    busy={busyIds.has(f.friendshipId)}
                    onPress={() => confirmRemoveFriend(f)}
                  />
                </RowCard>
              ))
            )}
          </Section>

          <Section title="Find players">
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search by name or club…"
              placeholderTextColor={colors.ink.tertiary}
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: colors.border.paper,
                backgroundColor: colors.paper.white,
                borderRadius: 8,
                paddingHorizontal: 14,
                paddingVertical: 10,
                fontSize: 15,
                color: colors.ink.primary,
                marginBottom: 12,
              }}
            />

            {searching && <ActivityIndicator color={colors.accent.gold} />}

            {!searching && searchResults && searchResults.length === 0 && (
              <EmptyText>No players found for "{debouncedQuery}".</EmptyText>
            )}

            {!searching &&
              searchResults?.map((r) => (
                <RowCard key={r.userId}>
                  <RowInfo
                    name={r.fullName}
                    sub={[r.homeClub ?? 'No club', `${r.courseCount} course${r.courseCount === 1 ? '' : 's'}`]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                  <StatusOrAddButton
                    result={r}
                    busy={busyIds.has(r.userId)}
                    onAdd={() => handleAddFriend(r.userId)}
                  />
                </RowCard>
              ))}
          </Section>
        </>
      )}
    </ScrollView>
  );
}

function Section({
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
        <Text style={{ color: colors.ink.primary, fontSize: 16, fontWeight: '700' }}>{title}</Text>
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
            <Text style={{ color: colors.ink.secondary, fontSize: 11, fontWeight: '700' }}>{count}</Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="uppercase"
      style={{ color: colors.ink.tertiary, fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 6 }}
    >
      {children}
    </Text>
  );
}

function RowCard({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.paper.white,
        borderWidth: 1,
        borderColor: colors.border.paperFaint,
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

function RowInfo({ name, sub }: { name: string; sub?: string | null }) {
  return (
    <View style={{ flex: 1, minWidth: 0 }}>
      <Text style={{ color: colors.ink.primary, fontSize: 15, fontWeight: '600' }} numberOfLines={1}>
        {name}
      </Text>
      {sub && (
        <Text style={{ color: colors.ink.tertiary, fontSize: 12, marginTop: 2 }} numberOfLines={1}>
          {sub}
        </Text>
      )}
    </View>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ color: colors.ink.tertiary, fontSize: 13, textAlign: 'center', paddingVertical: 12 }}>
      {children}
    </Text>
  );
}

function SmallButton({
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
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 1,
          color: filled ? colors.ink.inverse : danger ? colors.state.danger : colors.ink.secondary,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function StatusOrAddButton({
  result,
  busy,
  onAdd,
}: {
  result: SearchResult;
  busy: boolean;
  onAdd: () => void;
}) {
  if (result.status === 'friends') return <StatusPill label="Friends ✓" tone="cover" />;
  if (result.status === 'pending_sent') return <StatusPill label="Sent ✓" tone="neutral" />;
  if (result.status === 'pending_received') return <StatusPill label="Pending" tone="gold" />;
  return <SmallButton label={busy ? 'Adding…' : '+ Add'} filled busy={busy} onPress={onAdd} />;
}

function StatusPill({ label, tone }: { label: string; tone: 'cover' | 'neutral' | 'gold' }) {
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
      <Text className="uppercase" style={{ color: toneColors.text, fontSize: 11, fontWeight: '700' }}>
        {label}
      </Text>
    </View>
  );
}
