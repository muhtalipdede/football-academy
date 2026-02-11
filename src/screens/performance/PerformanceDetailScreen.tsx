import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Avatar } from '../../components/atoms';
import { SectionHeader } from '../../components/molecules';
import { mockPlayers } from '../../mocks/players';
import { mockPerformanceReports } from '../../mocks/performance';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDate } from '../../utils/helpers';

export const PerformanceDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { playerId } = route.params;
  const [loading, setLoading] = useState(true);

  const player = mockPlayers.find((p) => p.id === playerId);
  const reports = mockPerformanceReports.filter((r) => r.playerId === playerId);
  const latestReport = reports.length > 0 ? reports[reports.length - 1] : null;
  const ageGroup = mockAgeGroups.find((ag) => player?.ageGroupIds?.includes(ag.id));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!player) return <View style={styles.container}><Text>Oyuncu bulunamadı</Text></View>;

  const getAvg = (metrics: { score: number; maxScore: number }[]) =>
    metrics.reduce((sum, m) => sum + (m.score / m.maxScore) * 100, 0) / metrics.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Oyuncu Başlık */}
      <View style={styles.header}>
        <Avatar name={player.name} size={64} />
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.ageGroupText}>{ageGroup?.name || '-'} • {player.position}</Text>
        {latestReport && (
          <Text style={styles.reportDate}>Son Rapor: {formatDate(latestReport.period)}</Text>
        )}
      </View>

      {!latestReport ? (
        <View style={styles.noReport}>
          <Ionicons name="document-text-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.noReportText}>Henüz performans raporu yok</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {/* Genel Skor */}
          {(() => {
            const techAvg = getAvg(latestReport.technical);
            const physAvg = getAvg(latestReport.physical);
            const discAvg = getAvg(latestReport.discipline);
            const overall = Math.round((techAvg + physAvg + discAvg) / 3);
            const color = overall >= 80 ? COLORS.success : overall >= 60 ? COLORS.warning : COLORS.error;
            return (
              <View style={styles.overallCard}>
                <View style={[styles.overallCircle, { borderColor: color }]}>
                  <Text style={[styles.overallScore, { color }]}>{overall}</Text>
                  <Text style={styles.overallLabel}>Genel</Text>
                </View>
                <View style={styles.categoryScores}>
                  <CategoryScore label="Teknik" value={Math.round(techAvg)} />
                  <CategoryScore label="Fizik" value={Math.round(physAvg)} />
                  <CategoryScore label="Disiplin" value={Math.round(discAvg)} />
                </View>
              </View>
            );
          })()}

          {/* Teknik Yetenekler */}
          <SectionHeader title="Teknik Yetenekler" />
          <View style={styles.skillCard}>
            {latestReport.technical.map((metric) => (
              <SkillBar key={metric.category} label={metric.category} value={Math.round((metric.score / metric.maxScore) * 100)} />
            ))}
          </View>

          {/* Fiziksel Özellikler */}
          <SectionHeader title="Fiziksel Özellikler" />
          <View style={styles.skillCard}>
            {latestReport.physical.map((metric) => (
              <SkillBar key={metric.category} label={metric.category} value={Math.round((metric.score / metric.maxScore) * 100)} />
            ))}
          </View>

          {/* Disiplin */}
          <SectionHeader title="Disiplin & Davranış" />
          <View style={styles.skillCard}>
            {latestReport.discipline.map((metric) => (
              <SkillBar key={metric.category} label={metric.category} value={Math.round((metric.score / metric.maxScore) * 100)} />
            ))}
          </View>

          {/* Antrenör Yorumu */}
          {latestReport.notes && (
            <>
              <SectionHeader title="Antrenör Yorumu" />
              <View style={styles.notesCard}>
                <Text style={styles.notesText}>{latestReport.notes}</Text>
              </View>
            </>
          )}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const CategoryScore: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const color = value >= 80 ? COLORS.success : value >= 60 ? COLORS.warning : COLORS.error;
  return (
    <View style={catStyles.item}>
      <Text style={[catStyles.value, { color }]}>{value}</Text>
      <Text style={catStyles.label}>{label}</Text>
    </View>
  );
};

const catStyles = StyleSheet.create({
  item: { alignItems: 'center' },
  value: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, marginTop: 2 },
});

const SkillBar: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const color = value >= 80 ? COLORS.success : value >= 60 ? COLORS.warning : COLORS.error;
  return (
    <View style={skillStyles.row}>
      <Text style={skillStyles.label}>{label}</Text>
      <View style={skillStyles.barBg}>
        <View style={[skillStyles.barFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
      <Text style={[skillStyles.value, { color }]}>{value}</Text>
    </View>
  );
};

const skillStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md, gap: SPACING.sm },
  label: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, width: 100 },
  barBg: { flex: 1, height: 8, backgroundColor: COLORS.divider, borderRadius: 4, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 4 },
  value: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, width: 28, textAlign: 'right' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
    alignItems: 'center',
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
  },
  playerName: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, marginTop: SPACING.md },
  ageGroupText: { fontSize: FONT_SIZES.sm, color: COLORS.white + 'CC', marginTop: SPACING.xs },
  reportDate: { fontSize: FONT_SIZES.xs, color: COLORS.white + '80', marginTop: SPACING.sm },
  noReport: { alignItems: 'center', marginTop: 80, gap: SPACING.md },
  noReportText: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
  content: { paddingHorizontal: SPACING.xl },
  overallCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xl,
    marginTop: -SPACING.xl, flexDirection: 'row', alignItems: 'center',
    ...SHADOWS.md,
  },
  overallCircle: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 4,
    justifyContent: 'center', alignItems: 'center',
  },
  overallScore: { fontSize: 28, fontWeight: FONT_WEIGHTS.extrabold },
  overallLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textLight },
  categoryScores: { flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginLeft: SPACING.lg },
  skillCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg,
    marginBottom: SPACING.md, ...SHADOWS.sm,
  },
  notesCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  notesText: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, lineHeight: 22 },
});
