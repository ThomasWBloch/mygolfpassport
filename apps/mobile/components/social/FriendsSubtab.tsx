import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@mygolfpassport/shared';

import Avatar from '@/components/Avatar';
import { useAuth } from '@/lib/auth-context';
import { bodyFont } from '@/lib/fonts';
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
import { findOrCreateConversation } from '@/lib/messages';
import { EmptyText, RowCard, RowInfo, Section, SmallButton, StatusPill, SubLabel } from './shared';

export default function FriendsSubtab() {
  const { session } = useAuth();
  const userId = session?.user.id;
  const router = useRouter();
  const [messagingIds, setMessagingIds] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!userId || debouncedQuery.length < 2) {
      setSearchResults(null);
      return;
    }
    let cancelled = false;
    setSearching(true);
    searchPlayers(debouncedQuery, userId)
      .then((result) => { if (!cancelled) setSearchResults(result); })
      .catch((err) => { if (!cancelled) setError(err instanceof Error ? err.message : 'Search failed.'); })
      .finally(() => { if (!cancelled) setSearching(false); });
    return () => { cancelled = true; };
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

  async function handleMessage(otherUserId: string) {
    if (!userId) return;
    setMessagingIds((prev) => new Set(prev).add(otherUserId));
    try {
      const conversationId = await findOrCreateConversation(userId, otherUserId);
      router.push(`/messages/${conversationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start conversation.');
    } finally {
      setMessagingIds((prev) => {
        const next = new Set(prev);
        next.delete(otherUserId);
        return next;
      });
    }
  }

  if (!userId) return null;

  const incoming = pending.filter((p) => p.direction === 'incoming');
  const outgoing = pending.filter((p) => p.direction === 'outgoing');

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {error.length > 0 && (
        <EmptyText>{error}</EmptyText>
      )}

      {loading ? (
        <ActivityIndicator color={colors.accent.gold} style={{ marginTop: 40 }} />
      ) : (
        <>
          {pending.length > 0 && (
            <Section title="Pending requests" count={pending.length}>
              {incoming.length > 0 && <SubLabel>Incoming</SubLabel>}
              {incoming.map((p) => (
                <RowCard key={p.friendshipId}>
                  <Avatar name={p.fullName} avatarUrl={p.avatarUrl} size={32} />
                  <RowInfo name={p.fullName} club={p.homeClub} />
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
                </RowCard>
              ))}

              {outgoing.length > 0 && <SubLabel>Sent</SubLabel>}
              {outgoing.map((p) => (
                <RowCard key={p.friendshipId}>
                  <Avatar name={p.fullName} avatarUrl={p.avatarUrl} size={32} />
                  <RowInfo name={p.fullName} club={p.homeClub} />
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
                  <Avatar name={f.fullName} avatarUrl={f.avatarUrl} size={36} />
                  <RowInfo name={f.fullName} club={[f.homeClub, f.homeCountry].filter(Boolean).join(' · ')} />
                  <View style={{ alignItems: 'flex-end', gap: 6 }}>
                    <Text style={{ color: colors.ink.tertiary, fontFamily: bodyFont.semibold, fontSize: 12 }}>
                      {f.courseCount} course{f.courseCount === 1 ? '' : 's'}
                      {f.handicap != null && (
                        <Text style={{ color: colors.accent.goldDark, fontFamily: bodyFont.bold }}> · HCP {f.handicap}</Text>
                      )}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      <SmallButton
                        label="Message"
                        busy={messagingIds.has(f.userId)}
                        onPress={() => handleMessage(f.userId)}
                      />
                      <SmallButton
                        label="Remove"
                        danger
                        busy={busyIds.has(f.friendshipId)}
                        onPress={() => confirmRemoveFriend(f)}
                      />
                    </View>
                  </View>
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
                fontFamily: bodyFont.regular,
                fontSize: 15,
                color: colors.ink.primary,
                marginBottom: 12,
              }}
            />

            {searching && <ActivityIndicator color={colors.accent.gold} />}

            {!searching && searchResults && searchResults.length === 0 && (
              <EmptyText>No players found for &quot;{debouncedQuery}&quot;.</EmptyText>
            )}

            {!searching &&
              searchResults?.map((r) => (
                <RowCard key={r.userId}>
                  <Avatar name={r.fullName} avatarUrl={r.avatarUrl} size={36} />
                  <RowInfo
                    name={r.fullName}
                    club={[
                      r.homeClub ?? 'No club',
                      `${r.courseCount} course${r.courseCount === 1 ? '' : 's'}`,
                      `${r.countryCount} ${r.countryCount === 1 ? 'country' : 'countries'}`,
                      r.handicap != null ? `HCP ${r.handicap}` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                  {r.status === 'friends' && <StatusPill label="Friends ✓" tone="cover" />}
                  {r.status === 'pending_sent' && <StatusPill label="Sent ✓" tone="neutral" />}
                  {r.status === 'pending_received' && <StatusPill label="Pending" tone="gold" />}
                  {r.status === 'none' && (
                    <SmallButton
                      label={busyIds.has(r.userId) ? 'Adding…' : '+ Add'}
                      filled
                      busy={busyIds.has(r.userId)}
                      onPress={() => handleAddFriend(r.userId)}
                    />
                  )}
                </RowCard>
              ))}
          </Section>
        </>
      )}
    </ScrollView>
  );
}
