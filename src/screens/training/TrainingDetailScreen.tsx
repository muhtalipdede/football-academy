import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge, Button } from '../../components/atoms';
import { SectionHeader } from '../../components/molecules';
import { mockTrainings, mockCoaches } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDate, getTrainingStatusText } from '../../utils/helpers';
import { useAuthStore } from '../../store';

/**
 * Antrenman Detay Ekranı
 */
export const TrainingDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { trainingId } = route.params;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const training = mockTrainings.find((t) => t.id === trainingId);
  const coach = mockCoaches.find((c) => c.id === training?.coachId);
  const ageGroup = mockAgeGroups.find((ag) => ag.id === training?.ageGroupId);

  if (loading) return <LoadingIndicator />;
  if (!training) return <View style={styles.container}><Text>Antrenman bulunamadı</Text></View>;

  const statusVariant = training.status === 'completed' ? 'success' : training.status === 'cancelled' ? 'error' : 'info';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Badge text={getTrainingStatusText(training.status)} variant={statusVariant} size="md" />
        <Text style={styles.title}>{training.title}</Text>
        {ageGroup && (
          <View style={[styles.ageGroupBadge, { backgroundColor: ageGroup.color + '30' }]}>
            <Text style={[styles.ageGroupText, { color: ageGroup.color }]}>{ageGroup.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Bilgiler */}
        <View style={styles.infoCard}>
          <InfoItem icon="calendar" label="Tarih" value={formatDate(training.date)} />
          <InfoItem icon="time" label="Saat" value={`${training.startTime} - ${training.endTime}`} />
          <InfoItem icon="location" label="Saha" value={training.field} />
          <InfoItem icon="person" label="Antrenör" value={coach?.name || '-'} />
        </View>

        {/* Açıklama */}
        <SectionHeader title="Açıklama" />
        <View style={styles.descCard}>
          <Text style={styles.description}>{training.description}</Text>
        </View>

        {/* Çalışmalar */}
        {training.drills.length > 0 && (
          <>
            <SectionHeader title="Çalışma Programı" />
            <View style={styles.drillsCard}>
              {training.drills.map((drill, index) => (
                <View key={index} style={styles.drillItem}>
                  <View style={styles.drillNumber}>
                    <Text style={styles.drillNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.drillText}>{drill}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Aksiyonlar */}
        {(user?.role === 'admin' || user?.role === 'coach') && training.status === 'planned' && (
          <View style={styles.actions}>
            <Button
              title="Yoklama Al"
              variant="primary"
              fullWidth
              size="lg"
              icon={<Ionicons name="checkbox-outline" size={20} color={COLORS.white} />}
              onPress={() => navigation.navigate('Attendance', { trainingId: training.id })}
            />
            <View style={styles.actionRow}>
              <Button
                title="İptal Et"
                variant="danger"
                onPress={() => Alert.alert('Antrenman İptal', 'Bu antrenmanı iptal etmek istediğinize emin misiniz?', [
                  { text: 'Hayır' },
                  { text: 'Evet', style: 'destructive', onPress: () => Alert.alert('Bilgi', 'Antrenman iptal edildi (mock)') },
                ])}
              />
              <Button
                title="Saat Değiştir"
                variant="outline"
                onPress={() => Alert.alert('Bilgi', 'Saat değişikliği - Firebase entegrasyonu ile aktif olacak')}
              />
            </View>
          </View>
        )}

        {training.status === 'completed' && (user?.role === 'admin' || user?.role === 'coach') && (
          <Button
            title="Yoklamayı Görüntüle"
            variant="outline"
            fullWidth
            size="lg"
            style={{ marginTop: SPACING.lg }}
            onPress={() => navigation.navigate('Attendance', { trainingId: training.id })}
          />
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const InfoItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={infoStyles.item}>
    <Ionicons name={icon as any} size={20} color={COLORS.primary} />
    <View style={infoStyles.textContainer}>
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
  textContainer: {},
  label: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  value: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textPrimary,
    marginTop: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  ageGroupBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  ageGroupText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginTop: -SPACING.xl,
    ...SHADOWS.md,
  },
  descCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  drillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.sm,
  },
  drillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  drillNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drillNumberText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  drillText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  actions: {
    marginTop: SPACING.xl,
    gap: SPACING.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
});
