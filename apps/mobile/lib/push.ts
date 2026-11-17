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
 * Records why registration stopped without saving a token, in
 * public.push_registration_log (insert-only for clients). Best effort —
 * never throws.
 */
async function logRegistrationFailure(userId: string, step: string, detail?: unknown): Promise<void> {
  try {
    const text =
      detail instanceof Error ? `${detail.name}: ${detail.message}` : detail == null ? null : String(detail);
    await supabase.from('push_registration_log').insert({
      user_id: userId,
      platform: `${Platform.OS} ${Platform.Version}`,
      app_version: Constants.expoConfig?.version ?? null,
      step,
      detail: text ? text.slice(0, 1000) : null,
    });
  } catch {
    // Diagnostics only.
  }
}

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
 * to mint a token scoped to this project.
 *
 * Android 13+: the notification channel must exist BEFORE permission is
 * requested, otherwise the system permission prompt may never appear and
 * the status comes back denied — so the channel is created first.
 *
 * Any early exit is written to push_registration_log so a device that
 * never shows up in push_tokens can be diagnosed from the server.
 */
export async function registerForPushNotifications(userId: string): Promise<void> {
  let step = 'channel';
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    step = 'permission';
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      await logRegistrationFailure(userId, 'permission', `existing=${existingStatus} final=${finalStatus}`);
      return;
    }

    step = 'project_id';
    const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    if (!projectId) {
      await logRegistrationFailure(userId, 'project_id', 'missing EAS projectId');
      return;
    }

    step = 'token';
    const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({ projectId });

    step = 'upsert';
    const { error } = await supabase
      .from('push_tokens')
      .upsert({ user_id: userId, expo_push_token: expoPushToken }, { onConflict: 'expo_push_token' });
    if (error) await logRegistrationFailure(userId, 'upsert', `${error.code}: ${error.message}`);
  } catch (err) {
    // Simulator (token fetch rejects there), or push unavailable for some
    // other reason — not fatal for the app, but logged.
    await logRegistrationFailure(userId, step, err);
  }
}
