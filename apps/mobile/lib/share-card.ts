import { Directory, File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { supabase } from './supabase';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

/**
 * Ported from apps/web/src/components/ShareCard.tsx — downloads the
 * all-dots passport share-card PNG (built server-side by
 * apps/web/src/app/api/share-card, same Mapbox renderer as the invite
 * card) and hands it to the native share sheet. Mobile has no cookie
 * session to send, so the route was extended to also accept a Bearer
 * token; web's Web-Share-vs-download fallback logic doesn't apply here
 * since expo-sharing always opens a native share sheet.
 */
export async function shareCard(): Promise<void> {
  if (!API_BASE_URL) throw new Error('Missing EXPO_PUBLIC_API_BASE_URL');

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('Not signed in');

  const destination = new Directory(Paths.cache);
  const file = await File.downloadFileAsync(`${API_BASE_URL}/api/share-card`, destination, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (!(await Sharing.isAvailableAsync())) throw new Error('Sharing is not available on this device');
  await Sharing.shareAsync(file.uri, { mimeType: 'image/png', UTI: 'public.png' });
}
