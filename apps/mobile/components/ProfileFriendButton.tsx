import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { colors } from '@mygolfpassport/shared';

import { acceptFriendRequest, sendFriendRequest } from '@/lib/friends';
import { bodyFont } from '@/lib/fonts';
import type { FriendshipStatus } from '@/lib/public-profile';

/**
 * Ported from apps/web/src/components/ProfileFriendButton.tsx — compact
 * pill for the public profile's passport-card action slot. Four states:
 * friend (static), pending_sent (static), pending_received (tap to
 * accept), none (tap to send a request).
 */
type Props = {
  currentUserId: string;
  targetUserId: string;
  initialStatus: FriendshipStatus;
};

export default function ProfileFriendButton({ currentUserId, targetUserId, initialStatus }: Props) {
  const [status, setStatus] = useState(initialStatus.status);
  const [friendshipId, setFriendshipId] = useState(initialStatus.friendshipId);
  const [loading, setLoading] = useState(false);

  async function addFriend() {
    setLoading(true);
    try {
      await sendFriendRequest(currentUserId, targetUserId);
      setStatus('pending_sent');
    } catch {
      // no-op — status stays 'none', user can retry
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest() {
    if (!friendshipId) return;
    setLoading(true);
    try {
      await acceptFriendRequest(friendshipId);
      setStatus('friend');
    } catch {
      // no-op — status stays 'pending_received'
    } finally {
      setLoading(false);
    }
  }

  const basePill = {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  };

  if (status === 'friend') {
    return (
      <Pressable style={[basePill, { backgroundColor: colors.accent.gold, borderWidth: 1, borderColor: colors.accent.goldDark }]}>
        <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1.5, color: colors.passport.coverInk }}>
          ✓ Golf buddy
        </Text>
      </Pressable>
    );
  }

  if (status === 'pending_sent') {
    return (
      <Pressable style={[basePill, { backgroundColor: colors.paper.creamWarm, borderWidth: 1, borderColor: colors.border.paperFaint }]}>
        <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1.5, color: colors.ink.secondary }}>
          Request sent
        </Text>
      </Pressable>
    );
  }

  if (status === 'pending_received') {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={acceptRequest}
        disabled={loading}
        style={[basePill, { backgroundColor: colors.accent.gold, borderWidth: 1, borderColor: colors.accent.goldDark, opacity: loading ? 0.6 : 1 }]}
      >
        <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1.5, color: colors.passport.coverInk }}>
          {loading ? 'Accepting…' : 'Accept'}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={addFriend}
      disabled={loading}
      style={[basePill, { backgroundColor: colors.paper.white, borderWidth: 1, borderColor: colors.border.paperStrong, opacity: loading ? 0.6 : 1 }]}
    >
      <Text className="uppercase" style={{ fontFamily: bodyFont.bold, fontSize: 10, letterSpacing: 1.5, color: colors.passport.cover }}>
        {loading ? 'Adding…' : '+ Add golf buddy'}
      </Text>
    </Pressable>
  );
}
