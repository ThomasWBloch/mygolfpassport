import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { colors } from '@mygolfpassport/shared';

import BackHeader from '@/components/BackHeader';
import Toggle from '@/components/Toggle';
import { useAuth } from '@/lib/auth-context';
import { searchClubs, type ClubResult } from '@/lib/courses';
import { COUNTRY_OPTIONS } from '@/lib/countries';
import { bodyFont } from '@/lib/fonts';
import { fetchProfile, updateProfile, updateProfileField, type Profile } from '@/lib/profile';

type PrivacyField =
  | 'allow_round_requests_friends'
  | 'allow_round_requests_strangers'
  | 'show_in_search'
  | 'show_course_count'
  | 'hide_from_feeds'
  | 'push_enabled';

const PRIVACY_ROWS: { field: PrivacyField; label: string; sub: string }[] = [
  {
    field: 'allow_round_requests_friends',
    label: 'Allow round requests from friends',
    sub: 'Friends can send you a request to play',
  },
  {
    field: 'allow_round_requests_strangers',
    label: 'Allow round requests from everyone',
    sub: 'Any user can send you a request',
  },
  {
    field: 'show_in_search',
    label: 'Show me in search results',
    sub: 'Others can find you via search',
  },
  {
    field: 'show_course_count',
    label: 'Show my course count publicly',
    sub: "Others can see how many courses you've played",
  },
  {
    field: 'hide_from_feeds',
    label: "Hide my activity from friends' feeds",
    sub: "New rounds, badges and connections won't appear in others' home feeds",
  },
  {
    field: 'push_enabled',
    label: 'Allow push notifications',
    sub: 'Friend requests, messages, and daily activity from your friends',
  },
];

const ABOUT_ROWS: { label: string; url: string }[] = [
  { label: 'Privacy policy', url: 'https://mygolfpassport.golf/legal/privacy' },
];

export default function EditProfileScreen() {
  const { session, signOut } = useAuth();
  const userId = session?.user.id;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadError, setLoadError] = useState('');

  const [fullName, setFullName] = useState('');
  const [handicap, setHandicap] = useState('');
  const [homeClub, setHomeClub] = useState('');
  const [homeCountry, setHomeCountry] = useState('');

  const [countryQuery, setCountryQuery] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);

  const [clubOpen, setClubOpen] = useState(false);
  const [clubResults, setClubResults] = useState<ClubResult[]>([]);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetchProfile(userId)
      .then((p) => {
        setProfile(p);
        setFullName(p?.full_name ?? '');
        setHandicap(p?.handicap != null ? String(p.handicap) : '');
        setHomeClub(p?.home_club ?? '');
        setHomeCountry(p?.home_country ?? '');
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : 'Failed to load profile.'));
  }, [userId]);

  // Debounced club search
  useEffect(() => {
    if (!clubOpen) return;
    let cancelled = false;
    const t = setTimeout(() => {
      searchClubs(homeClub, homeCountry || null)
        .then((results) => { if (!cancelled) setClubResults(results); })
        .catch(() => { if (!cancelled) setClubResults([]); });
    }, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, [homeClub, homeCountry, clubOpen]);

  const filteredCountries = countryQuery.trim().length > 0
    ? COUNTRY_OPTIONS.filter((c) => c.label.toLowerCase().includes(countryQuery.trim().toLowerCase())).slice(0, 8)
    : [];

  async function handleSave() {
    if (!userId) return;
    setSaving(true);
    setSaveError('');
    setSaved(false);
    try {
      await updateProfile(userId, {
        full_name: fullName.trim() || null,
        handicap: handicap !== '' ? parseFloat(handicap) : null,
        home_club: homeClub.trim() || null,
        home_country: homeCountry || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(field: PrivacyField, value: boolean) {
    if (!userId || !profile) return;
    setProfile({ ...profile, [field]: value });
    try {
      await updateProfileField(userId, field, value);
    } catch {
      // Revert on failure
      setProfile((prev) => (prev ? { ...prev, [field]: !value } : prev));
    }
  }

  if (!userId) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.paper.cream }}>
      <BackHeader label="Edit profile" />

      {!profile && !loadError && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.accent.gold} />
        </View>
      )}

      {loadError.length > 0 && (
        <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, padding: 16 }}>{loadError}</Text>
      )}

      {profile && (
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <SectionHeader>Editable profile</SectionHeader>
          <Card>
            <Field label="Full name">
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your name"
                style={inputStyle}
                placeholderTextColor={colors.ink.tertiary}
              />
            </Field>

            <Field label="Home country">
              <TextInput
                value={countryOpen ? countryQuery : homeCountry}
                onChangeText={(v) => { setCountryQuery(v); setCountryOpen(true); }}
                onFocus={() => { setCountryQuery(''); setCountryOpen(true); }}
                placeholder="Search country…"
                style={inputStyle}
                placeholderTextColor={colors.ink.tertiary}
                autoCapitalize="none"
              />
              {countryOpen && filteredCountries.length > 0 && (
                <View style={dropdownStyle}>
                  {filteredCountries.map((c) => (
                    <Pressable
                      key={c.value}
                      onPress={() => { setHomeCountry(c.value); setCountryOpen(false); setCountryQuery(''); }}
                      style={dropdownRowStyle}
                    >
                      <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: colors.ink.primary }}>
                        {c.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
              {countryOpen && (
                <Pressable onPress={() => setCountryOpen(false)} style={{ marginTop: 6 }}>
                  <Text style={{ fontFamily: bodyFont.semibold, fontSize: 12, color: colors.accent.goldDark }}>
                    Done
                  </Text>
                </Pressable>
              )}
            </Field>

            <Field label="Home club">
              <TextInput
                value={homeClub}
                onChangeText={(v) => { setHomeClub(v); setClubOpen(true); }}
                onFocus={() => setClubOpen(true)}
                placeholder="Search club…"
                style={inputStyle}
                placeholderTextColor={colors.ink.tertiary}
                autoCapitalize="none"
              />
              {clubOpen && clubResults.length > 0 && (
                <View style={dropdownStyle}>
                  {clubResults.map((c) => (
                    <Pressable
                      key={c.club}
                      onPress={() => { setHomeClub(c.club); setClubOpen(false); }}
                      style={dropdownRowStyle}
                    >
                      <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: colors.ink.primary }}>
                        {c.flag ? `${c.flag} ` : ''}{c.club}
                        {c.country ? <Text style={{ color: colors.ink.tertiary }}>{'  ' + c.country}</Text> : null}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
              {clubOpen && (
                <Pressable onPress={() => setClubOpen(false)} style={{ marginTop: 6 }}>
                  <Text style={{ fontFamily: bodyFont.semibold, fontSize: 12, color: colors.accent.goldDark }}>
                    Done
                  </Text>
                </Pressable>
              )}
            </Field>

            <Field label="Handicap" last>
              <TextInput
                value={handicap}
                onChangeText={setHandicap}
                placeholder="e.g. 12.4"
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                style={inputStyle}
                placeholderTextColor={colors.ink.tertiary}
              />
            </Field>

            <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: colors.border.paperFaint }}>
              {saveError.length > 0 && (
                <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, fontSize: 13, marginBottom: 8 }}>
                  {saveError}
                </Text>
              )}
              {saved && (
                <Text
                  className="uppercase"
                  style={{ color: colors.state.success, fontFamily: bodyFont.semibold, fontSize: 12, letterSpacing: 1.5, marginBottom: 8 }}
                >
                  ✓ Saved
                </Text>
              )}
              <Pressable
                accessibilityRole="button"
                onPress={handleSave}
                disabled={saving}
                style={{
                  backgroundColor: colors.passport.cover,
                  borderRadius: 10,
                  paddingVertical: 13,
                  alignItems: 'center',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? (
                  <ActivityIndicator color={colors.ink.inverse} />
                ) : (
                  <Text className="uppercase" style={{ color: colors.ink.inverse, fontFamily: bodyFont.bold, fontSize: 13, letterSpacing: 1.5 }}>
                    Save changes
                  </Text>
                )}
              </Pressable>
            </View>
          </Card>

          <SectionHeader style={{ marginTop: 24 }}>Privacy &amp; social</SectionHeader>
          <Card>
            {PRIVACY_ROWS.map((row, i) => (
              <View
                key={row.field}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: 14,
                  borderBottomWidth: i < PRIVACY_ROWS.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border.paperFaint,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: bodyFont.semibold, fontSize: 15, color: colors.ink.primary }}>
                    {row.label}
                  </Text>
                  <Text style={{ fontFamily: bodyFont.regular, fontSize: 13, color: colors.ink.tertiary, marginTop: 2 }}>
                    {row.sub}
                  </Text>
                </View>
                <Toggle checked={!!profile[row.field]} onChange={(v) => handleToggle(row.field, v)} />
              </View>
            ))}
          </Card>

          <SectionHeader style={{ marginTop: 24 }}>About</SectionHeader>
          <Card>
            {ABOUT_ROWS.map((row, i) => (
              <Pressable
                key={row.label}
                accessibilityRole="link"
                onPress={() => WebBrowser.openBrowserAsync(row.url)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 14,
                  borderBottomWidth: i < ABOUT_ROWS.length - 1 ? 1 : 0,
                  borderBottomColor: colors.border.paperFaint,
                }}
              >
                <Text style={{ fontFamily: bodyFont.semibold, fontSize: 15, color: colors.ink.primary }}>
                  {row.label}
                </Text>
                <Text style={{ color: colors.ink.tertiary, fontSize: 16 }}>›</Text>
              </Pressable>
            ))}
          </Card>

          <Pressable
            accessibilityRole="button"
            onPress={() => signOut()}
            style={{
              borderWidth: 1,
              borderColor: colors.border.paperStrong,
              borderRadius: 10,
              paddingVertical: 13,
              alignItems: 'center',
              marginTop: 24,
            }}
          >
            <Text style={{ color: colors.state.danger, fontFamily: bodyFont.semibold, fontSize: 14 }}>
              Sign out
            </Text>
          </Pressable>
        </ScrollView>
      )}
    </View>
  );
}

function SectionHeader({ children, style }: { children: React.ReactNode; style?: object }) {
  return (
    <Text
      className="uppercase"
      style={[
        { fontFamily: bodyFont.semibold, fontSize: 11, letterSpacing: 2, color: colors.ink.tertiary, marginBottom: 10 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        backgroundColor: colors.paper.white,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border.paper,
        overflow: 'hidden',
      }}
    >
      {children}
    </View>
  );
}

function Field({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <View style={{ padding: 16, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.border.paperFaint }}>
      <Text
        className="uppercase"
        style={{ fontFamily: bodyFont.semibold, fontSize: 10, letterSpacing: 1.5, color: colors.ink.tertiary, marginBottom: 6 }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: colors.border.paper,
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 9,
  fontFamily: bodyFont.regular,
  fontSize: 15,
  color: colors.ink.primary,
  backgroundColor: colors.paper.creamWarm,
};

const dropdownStyle = {
  marginTop: 6,
  borderWidth: 1,
  borderColor: colors.border.paper,
  borderRadius: 8,
  backgroundColor: colors.paper.white,
  maxHeight: 220,
  overflow: 'hidden' as const,
};

const dropdownRowStyle = {
  paddingHorizontal: 12,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: colors.border.paperFaint,
};
