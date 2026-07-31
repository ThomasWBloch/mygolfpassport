import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

import { supabase } from './supabase';

// Without this, iOS silently drops the visible banner/sound for a push
// that arrives while the app is in the foreground — it still gets
// delivered (and would show once backgrounded), but nothing appears on
// screen. Call once at module load so it's in effect before any push
// could possibly arrive.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Registers this device for push notifications: requests permission, gets
 * an Expo push token, and upserts it into public.push_tokens (one row per
 * device, keyed by the token itself — see the migration's unique
 * constraint). Called once per app session after the user is authenticated
 * (see app/_layout.tsx's RootNavigator).
 *
 * Push only works on a physical device with a custom dev-client/production
 * build — Expo Go dropped remote push support entirely — and requires the
 * EAS project id (baked into app.json's extra.eas.projectId by `eas init`)
 * to mint a token scoped to this project. getExpoPushTokenAsync itself
 * rejects on a simulator, so that's the only "are we on real hardware"
 * guard needed — no reason to pull in expo-device just for that check.
 */
export async function registerForPushNotifications(userId: string): Promise<void> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  if (!projectId) return;

  try {
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({ projectId });
    await supabase.from('push_tokens').upsert(
      { user_id: userId, expo_push_token: expoPushToken },
      { onConflict: 'expo_push_token' }
    );
  } catch {
    // Simulator, or push unavailable for some other reason — not fatal.
  }
}
