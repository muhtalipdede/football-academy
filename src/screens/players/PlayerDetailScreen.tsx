import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { Avatar, Badge, LoadingIndicator, Button } from '../../components/atoms';
import { ProgressBar, SectionHeader } from '../../components/molecules';
import { mockPlayers, mockParents, mockAttendanceSummaries, mockPerformanceReports } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDate, calculateAge, getAttendanceColor } from '../../utils/helpers';
import { useAuthStore } from '../../store';

/**
 * Sporcu Detay Ekranı
 */
export const PlayerDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { playerId } = route.params;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const player = mockPlayers.find((p) => p.id === playerId);
  const parent = mockParents.find((p) => p.id === player?.parentId);
  const attendance = mockAttendanceSummaries.find((a) => a.playerId === playerId);
  const performance = mockPerformanceReports.find((p) => p.playerId === playerId);
  const ageGroups = player?.ageGroupIds.map((id) => mockAgeGroups.find((ag) => ag.id === id)).filter(Boolean) || [];

  if (loading) return <LoadingIndicator />;
  if (!player) return <View style={styles.container}><Text>Sporcu bulunamadı</Text></View>;

  const age = calculateAge(player.birthDate);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <Avatar name={player.name} size={80} backgroundColor={COLORS.secondary} />
        <Text style={styles.name}>{player.name}</Text>
        <Text style={styles.position}>{player.position} • #{player.jerseyNumber}</Text>
        <View style={styles.badges}>
          {ageGroups.map((ag) => ag && (
            <Badge key={ag.id} text={ag.name} variant="primary" size="md" />
          ))}
          <Badge text={player.isActive ? 'Aktif' : 'Pasif'} variant={player.isActive ? 'success' : 'error'} size="md" />
        </View>
      </View>

      {/* Kişisel Bilgiler */}
      <View style={styles.section}>
        <SectionHeader title="Kişisel Bilgiler" />
        <View style={styles.infoCard}>
          <InfoRow icon="calendar" label="Doğum Tarihi" value={formatDate(player.birthDate)} />
          <InfoRow icon="resize" label="Yaş" value={`${age} yaşında`} />
          <InfoRow icon="body" label="Boy / Kilo" value={`${player.height} cm / ${player.weight} kg`} />
          <InfoRow icon="football" label="Ayak" value={player.foot} />
          <InfoRow icon="log-in" label="Katılım Tarihi" value={formatDate(player.joinDate)} />
        </View>
      </View>

      {/* Veli Bilgileri */}
      {parent && (
        <View style={styles.section}>
          <SectionHeader title="Veli Bilgileri" />
          <View style={styles.infoCard}>
            <InfoRow icon="person" label="Veli Adı" value={parent.name} />
            <InfoRow icon="call" label="Telefon" value={parent.phone} />
            <InfoRow icon="mail" label="E-posta" value={parent.email} />
            <InfoRow icon="location" label="Adres" value={parent.address} />
          </View>
        </View>
      )}

      {/* Devam Durumu */}
      {attendance && (
        <View style={styles.section}>
          <SectionHeader title="Devam Durumu" />
          <View style={styles.infoCard}>
            <View style={styles.attendanceStats}>
              <View style={styles.attendanceStat}>
                <Text style={[styles.attendanceValue, { color: COLORS.success }]}>{attendance.present}</Text>
                <Text style={styles.attendanceLabel}>Katıldı</Text>
              </View>
              <View style={styles.attendanceStat}>
                <Text style={[styles.attendanceValue, { color: COLORS.warning }]}>{attendance.late}</Text>
                <Text style={styles.attendanceLabel}>Geç</Text>
              </View>
              <View style={styles.attendanceStat}>
                <Text style={[styles.attendanceValue, { color: COLORS.error }]}>{attendance.absent}</Text>
                <Text style={styles.attendanceLabel}>Katılmadı</Text>
              </View>
            </View>
            <ProgressBar
              label="Devam Oranı"
              value={attendance.attendanceRate}
              maxValue={100}
              color={getAttendanceColor(attendance.attendanceRate)}
            />
          </View>
        </View>
      )}

      {/* Performans Özeti */}
      {performance && (
        <View style={styles.section}>
          <SectionHeader
            title="Performans"
            actionText="Detay"
            onAction={() => navigation.navigate('More', { screen: 'PerformanceDetail', params: { playerId } })}
          />
          <View style={styles.infoCard}>
            <View style={styles.overallScore}>
              <Text style={styles.overallScoreValue}>{performance.overallScore}</Text>
              <Text style={styles.overallScoreLabel}>/ 10 Genel Puan</Text>
            </View>
            {performance.technical.slice(0, 3).map((metric) => (
              <ProgressBar
                key={metric.category}
                label={metric.category}
                value={metric.score}
                maxValue={metric.maxScore}
                color={COLORS.primary}
                showPercentage={false}
              />
            ))}
          </View>
        </View>
      )}

      {/* Aksiyonlar */}
      {(user?.role === 'admin' || user?.role === 'coach') && (
        <View style={styles.section}>
          <View style={styles.actions}>
            <Button
              title="Düzenle"
              variant="outline"
              icon={<Ionicons name="create-outline" size={18} color={COLORS.primary} />}
              onPress={() => Alert.alert('Bilgi', 'Düzenleme ekranı - Firebase entegrasyonu ile aktif olacak')}
            />
            <Button
              title="Çıkar"
              variant="danger"
              icon={<Ionicons name="trash-outline" size={18} color={COLORS.white} />}
              onPress={() => Alert.alert('Onay', 'Bu sporcuyu çıkarmak istediğinize emin misiniz?', [
                { text: 'İptal' },
                { text: 'Evet', style: 'destructive' },
              ])}
            />
          </View>
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

/** Bilgi satırı yardımcı bileşeni */
const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={infoRowStyles.row}>
    <Ionicons name={icon as any} size={18} color={COLORS.textLight} />
    <Text style={infoRowStyles.label}>{label}</Text>
    <Text style={infoRowStyles.value}>{value}</Text>
  </View>
);

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  label: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginLeft: SPACING.md,
  },
  value: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerCard: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
  },
  name: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginTop: SPACING.md,
  },
  position: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white + 'CC',
    marginTop: SPACING.xs,
  },
  badges: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  section: {
    paddingHorizontal: SPACING.xl,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  attendanceStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  attendanceStat: {
    alignItems: 'center',
  },
  attendanceValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
  },
  attendanceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  overallScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.lg,
  },
  overallScoreValue: {
    fontSize: 36,
    fontWeight: FONT_WEIGHTS.extrabold,
    color: COLORS.primary,
  },
  overallScoreLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
});
