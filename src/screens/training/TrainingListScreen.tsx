import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS } from '../../constants/theme';
import { TrainingCard } from '../../components/molecules';
import { LoadingIndicator, EmptyState } from '../../components/atoms';
import { mockTrainings } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDateShort } from '../../utils/helpers';

/**
 * Antrenman Listesi Ekranı
 */
export const TrainingListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'planned' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredTrainings = filter === 'all'
    ? mockTrainings
    : mockTrainings.filter((t) => t.status === filter);

  const getAgeGroupName = (id: string) => mockAgeGroups.find((ag) => ag.id === id)?.name || '';

  if (loading) return <LoadingIndicator message="Antrenmanlar yükleniyor..." />;

  const filters = [
    { key: 'all', label: 'Tümü' },
    { key: 'planned', label: 'Planlandı' },
    { key: 'completed', label: 'Tamamlandı' },
    { key: 'cancelled', label: 'İptal' },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Filtre */}
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTrainings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TrainingCard
            title={item.title}
            date={formatDateShort(item.date)}
            time={`${item.startTime} - ${item.endTime}`}
            field={item.field}
            status={item.status}
            ageGroup={getAgeGroupName(item.ageGroupId)}
            onPress={() => navigation.navigate('TrainingDetail', { trainingId: item.id })}
          />
        )}
        ListEmptyComponent={
          <EmptyState icon="barbell-outline" title="Antrenman bulunamadı" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterRow: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHTS.medium,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});
