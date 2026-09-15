import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@mygolfpassport/shared';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import Toggle from '@/components/Toggle';
import { useAuth } from '@/lib/auth-context';
import { COUNTRY_OPTIONS } from '@/lib/countries';
import { searchClubs, type ClubResult } from '@/lib/courses';
import { bodyFont, displayFont } from '@/lib/fonts';
import { updateProfile } from '@/lib/profile';

/**
 * Shown once, right after first sign-in, whenever profiles.full_name is
 * still unset (see profileComplete in lib/auth-context.tsx and the
 * Stack.Protected gate in app/_layout.tsx). Mobile previously had no
 * onboarding step at all — signup already collects full_name into
 * auth.users' metadata, but nothing ever copied it into the profiles row,
 * so mobile users landed straight in the app with an empty profile and no
 * chance to fill in home club / handicap. Same fields and same "home
 * club/handicap are optional" rule as web's /onboarding.
 */
export default function OnboardingScreen() {
  const { session, markOnboarded } = useAuth();
  const userId = session?.user.id;

  const [fullName, setFullName] = useState((session?.user.user_metadata?.full_name as string | undefined) ?? '');
  const [homeCountry, setHomeCountry] = useState('');
  const [countryQuery, setCountryQuery] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [homeClub, setHomeClub] = useState('');
  const [clubOpen, setClubOpen] = useState(false);
  const [clubResults, setClubResults] = useState<ClubResult[]>([]);
  const [handicap, setHandicap] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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

  const canSubmit = !saving && fullName.trim().length > 0;

  async function handleSubmit() {
    if (!canSubmit || !userId) return;
    setSaving(true);
    setError('');
    try {
      await updateProfile(userId, {
        full_name: fullName.trim(),
        handicap: handicap !== '' ? parseFloat(handicap) : null,
        home_club: homeClub.trim() || null,
        home_country: homeCountry || null,
        ...(marketingOptIn ? { marketing_opt_in: true, marketing_opt_in_at: new Date().toISOString() } : {}),
      });
      markOnboarded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save your profile.');
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.paper.cream }} behavior="padding">
      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60 }} keyboardShouldPersistTaps="handled">
        <Text
          style={{
            color: colors.ink.tertiary,
            fontFamily: bodyFont.semibold,
            fontSize: 12,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 6,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            color: colors.passport.cover,
            fontFamily: displayFont.semibold,
            fontSize: 28,
            marginBottom: 8,
          }}
        >
          Set up your passport.
        </Text>
        <Text style={{ color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 14, lineHeight: 20, marginBottom: 24 }}>
          Home club and handicap are optional — you can always add them later from Edit profile.
        </Text>

        <AuthInput
          label="Full name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your name"
          autoCapitalize="words"
        />

        <View style={{ marginBottom: 16 }}>
          <AuthInput
            label="Home country (optional)"
            value={countryOpen ? countryQuery : homeCountry}
            onChangeText={(v) => { setCountryQuery(v); setCountryOpen(true); }}
            onFocus={() => { setCountryQuery(''); setCountryOpen(true); }}
            placeholder="Search country…"
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
                  <Text style={{ fontFamily: bodyFont.regular, fontSize: 14, color: colors.ink.primary }}>{c.label}</Text>
                </Pressable>
              ))}
            </View>
          )}
          {countryOpen && (
            <Pressable onPress={() => setCountryOpen(false)} style={{ marginTop: 6 }}>
              <Text style={{ fontFamily: bodyFont.semibold, fontSize: 12, color: colors.accent.goldDark }}>Done</Text>
            </Pressable>
          )}
        </View>

        <View style={{ marginBottom: 16 }}>
          <AuthInput
            label="Home club (optional)"
            value={homeClub}
            onChangeText={(v) => { setHomeClub(v); setClubOpen(true); }}
            onFocus={() => setClubOpen(true)}
            placeholder="Search club…"
            autoCapitalize="none"
          />
          {clubOpen && clubResults.length > 0 && (
            <View style={dropdownStyle}>
              {clubResults.map((c) => (
                <Pressable key={c.club} onPress={() => { setHomeClub(c.club); setClubOpen(false); }} style={dropdownRowStyle}>
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
              <Text style={{ fontFamily: bodyFont.semibold, fontSize: 12, color: colors.accent.goldDark }}>Done</Text>
            </Pressable>
          )}
        </View>

        <AuthInput
          label="Handicap (optional)"
          value={handicap}
          onChangeText={setHandicap}
          placeholder="e.g. 12.4"
          keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'numeric'}
        />

        <Pressable
          onPress={() => setMarketingOptIn((v) => !v)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            backgroundColor: colors.paper.creamWarm,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.border.paperStrong,
            borderRadius: 10,
            padding: 14,
            marginBottom: 20,
          }}
        >
          <Text style={{ flex: 1, color: colors.ink.secondary, fontFamily: bodyFont.regular, fontSize: 13.5 }}>
            Yes, send me news and offers from My Golf Passport.
          </Text>
          <Toggle checked={marketingOptIn} onChange={setMarketingOptIn} />
        </Pressable>

        {error.length > 0 && (
          <Text style={{ color: colors.state.danger, fontFamily: bodyFont.regular, fontSize: 13, marginBottom: 12 }}>{error}</Text>
        )}

        <AuthButton label="Issue my passport" onPress={handleSubmit} disabled={!canSubmit} loading={saving} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

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
