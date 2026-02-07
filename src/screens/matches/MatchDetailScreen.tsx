import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge, Button } from '../../components/atoms';
import { SectionHeader } from '../../components/molecules';
import { mockMatches } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDate, getMatchStatusText, getMatchTypeText } from '../../utils/helpers';
import { useAuthStore } from '../../store';

/**
 * Maç Detay Ekranı
 */
export const MatchDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { matchId } = route.params;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');

  const match = mockMatches.find((m) => m.id === matchId);
  const ageGroup = mockAgeGroups.find((ag) => ag.id === match?.ageGroupId);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (match?.homeScore !== undefined) setHomeScore(String(match.homeScore));
      if (match?.awayScore !== undefined) setAwayScore(String(match.awayScore));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!match) return <View style={styles.container}><Text>Maç bulunamadı</Text></View>;

  const statusVariant =
    match.status === 'completed' ? 'success' :
    match.status === 'live' ? 'error' :
    match.status === 'cancelled' ? 'warning' : 'info';

  const canEditScore = (user?.role === 'admin' || user?.role === 'coach') && match.status !== 'cancelled';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.badgeRow}>
          <Badge text={getMatchTypeText(match.type)} variant="primary" size="md" />
          <Badge text={getMatchStatusText(match.status)} variant={statusVariant} size="md" />
        </View>

        {/* Takımlar & Skor */}
        <View style={styles.matchup}>
          <View style={styles.team}>
            <Ionicons name="shield" size={48} color={COLORS.white} />
            <Text style={styles.teamName}>{match.homeTeam}</Text>
          </View>

          <View style={styles.scoreSection}>
            {match.status === 'completed' || match.status === 'live' ? (
              <Text style={styles.score}>{match.homeScore} - {match.awayScore}</Text>
            ) : (
              <Text style={styles.vs}>VS</Text>
            )}
          </View>

          <View style={styles.team}>
            <Ionicons name="shield" size={48} color={COLORS.accent} />
            <Text style={styles.teamName}>{match.awayTeam}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Maç Bilgileri */}
        <View style={styles.infoCard}>
          <InfoItem icon="calendar" label="Tarih" value={formatDate(match.date)} />
          <InfoItem icon="time" label="Saat" value={match.time} />
          <InfoItem icon="location" label="Saha" value={match.field} />
          <InfoItem icon="people" label="Yaş Grubu" value={ageGroup?.name || '-'} />
        </View>

        {/* Skor Girişi */}
        {canEditScore && match.status === 'upcoming' && (
          <>
            <SectionHeader title="Skor Girişi" />
            <View style={styles.scoreEntry}>
              <View style={styles.scoreInput}>
                <Text style={styles.scoreLabel}>Ev Sahibi</Text>
                <TextInput
                  style={styles.scoreField}
                  value={homeScore}
                  onChangeText={setHomeScore}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
              <Text style={styles.scoreDash}>-</Text>
              <View style={styles.scoreInput}>
                <Text style={styles.scoreLabel}>Deplasman</Text>
                <TextInput
                  style={styles.scoreField}
                  value={awayScore}
                  onChangeText={setAwayScore}
                  keyboardType="number-pad"
                  placeholder="0"
                  placeholderTextColor={COLORS.textLight}
                />
              </View>
            </View>
            <Button
              title="Skoru Kaydet"
              onPress={() => Alert.alert('Başarılı', `Skor: ${homeScore} - ${awayScore} kaydedildi (mock)`)}
              fullWidth
              size="lg"
            />
          </>
        )}

        {/* Antrenör Notları */}
        {match.coachNotes && (
          <>
            <SectionHeader title="Antrenör Notları" />
            <View style={styles.notesCard}>
              <Ionicons name="document-text-outline" size={20} color={COLORS.primary} />
              <Text style={styles.notesText}>{match.coachNotes}</Text>
            </View>
          </>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const InfoItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={infoStyles.item}>
    <Ionicons name={icon as any} size={20} color={COLORS.primary} />
    <View>
      <Text style={infoStyles.label}>{label}</Text>
      <Text style={infoStyles.value}>{value}</Text>
    </View>
  </View>
);

const infoStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    gap: SPACING.md,
  },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight },
  value: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium, color: COLORS.textPrimary, marginTop: 1 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
  },
  badgeRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.sm, marginBottom: SPACING.xl },
  matchup: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  team: { flex: 1, alignItems: 'center', gap: SPACING.sm },
  teamName: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.white, textAlign: 'center' },
  scoreSection: { paddingHorizontal: SPACING.lg },
  score: { fontSize: 36, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.white },
  vs: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white + '80' },
  content: { paddingHorizontal: SPACING.xl },
  infoCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg,
    marginTop: -SPACING.xl, ...SHADOWS.md,
  },
  scoreEntry: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg,
    marginBottom: SPACING.md, ...SHADOWS.sm,
  },
  scoreInput: { alignItems: 'center', flex: 1 },
  scoreLabel: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  scoreField: {
    width: 60, height: 60, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.background,
    fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, textAlign: 'center', color: COLORS.textPrimary,
  },
  scoreDash: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textLight, marginHorizontal: SPACING.lg },
  notesCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg,
    flexDirection: 'row', gap: SPACING.md, ...SHADOWS.sm,
  },
  notesText: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textSecondary, lineHeight: 22 },
});
