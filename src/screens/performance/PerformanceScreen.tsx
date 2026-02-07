import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Avatar } from '../../components/atoms';
import { ProgressBar } from '../../components/molecules';
import { mockPlayers } from '../../mocks/players';
import { mockPerformanceReports } from '../../mocks/performance';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { useAuthStore } from '../../store';

export const PerformanceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;

  // Her oyuncunun en son raporunu grupla
  const playerPerformance = mockPlayers.map((player) => {
    const reports = mockPerformanceReports.filter((r) => r.playerId === player.id);
    const latest = reports.length > 0 ? reports[reports.length - 1] : null;
    const ageGroup = mockAgeGroups.find((ag) => ag.id === player.ageGroupId);
    return { player, latestReport: latest, ageGroup };
  });

  // Parent / player ise sadece ilgili oyuncuları göster
  const filtered =
    user?.role === 'parent'
      ? playerPerformance.filter((p) => p.player.parentId === user.id)
      : user?.role === 'player'
      ? playerPerformance.filter((p) => p.player.userId === user.id)
      : playerPerformance;

  const getOverallScore = (report: typeof mockPerformanceReports[0] | null) => {
    if (!report) return 0;
    const { technical, physical, discipline } = report;
    const techAvg = Object.values(technical).reduce((a, b) => a + b, 0) / Object.values(technical).length;
    const physAvg = Object.values(physical).reduce((a, b) => a + b, 0) / Object.values(physical).length;
    const discAvg = Object.values(discipline).reduce((a, b) => a + b, 0) / Object.values(discipline).length;
    return Math.round((techAvg + physAvg + discAvg) / 3);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.player.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const score = getOverallScore(item.latestReport);
          const color = score >= 80 ? COLORS.success : score >= 60 ? COLORS.warning : COLORS.error;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('PerformanceDetail', { playerId: item.player.id })
              }
            >
              <View style={styles.cardHeader}>
                <Avatar name={item.player.name} size="md" />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.player.name}</Text>
                  <Text style={styles.ageGroup}>{item.ageGroup?.name || '-'}</Text>
                </View>
                <View style={[styles.scoreCircle, { borderColor: color }]}>
                  <Text style={[styles.scoreText, { color }]}>{score || '-'}</Text>
                </View>
              </View>
              {item.latestReport && (
                <View style={styles.bars}>
                  <MiniBar label="Teknik" value={Object.values(item.latestReport.technical).reduce((a, b) => a + b, 0) / Object.values(item.latestReport.technical).length} />
                  <MiniBar label="Fiziksel" value={Object.values(item.latestReport.physical).reduce((a, b) => a + b, 0) / Object.values(item.latestReport.physical).length} />
                  <MiniBar label="Disiplin" value={Object.values(item.latestReport.discipline).reduce((a, b) => a + b, 0) / Object.values(item.latestReport.discipline).length} />
                </View>
              )}
              {!item.latestReport && (
                <Text style={styles.noReport}>Henüz rapor oluşturulmamış</Text>
              )}
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="analytics-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Performans verisi bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
};

const MiniBar: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <View style={miniStyles.row}>
    <Text style={miniStyles.label}>{label}</Text>
    <View style={miniStyles.barBg}>
      <View
        style={[
          miniStyles.barFill,
          {
            width: `${value}%`,
            backgroundColor:
              value >= 80 ? COLORS.success : value >= 60 ? COLORS.warning : COLORS.error,
          },
        ]}
      />
    </View>
    <Text style={miniStyles.value}>{Math.round(value)}</Text>
  </View>
);

const miniStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.xs },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, width: 50 },
  barBg: { flex: 1, height: 6, backgroundColor: COLORS.divider, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  value: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textSecondary, width: 24, textAlign: 'right' },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: 100 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginLeft: SPACING.md },
  name: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary },
  ageGroup: { fontSize: FONT_SIZES.sm, color: COLORS.textLight, marginTop: 2 },
  scoreCircle: {
    width: 48, height: 48, borderRadius: 24, borderWidth: 3,
    justifyContent: 'center', alignItems: 'center',
  },
  scoreText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.extrabold },
  bars: { marginTop: SPACING.md },
  noReport: { fontSize: FONT_SIZES.sm, color: COLORS.textLight, marginTop: SPACING.md, fontStyle: 'italic' },
  empty: { alignItems: 'center', marginTop: 100, gap: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
});
