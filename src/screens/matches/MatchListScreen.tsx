import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS } from '../../constants/theme';
import { MatchCard } from '../../components/molecules';
import { LoadingIndicator, EmptyState } from '../../components/atoms';
import { mockMatches } from '../../mocks';
import { formatDateShort } from '../../utils/helpers';

/**
 * Maç Listesi Ekranı
 */
export const MatchListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredMatches = filter === 'all'
    ? mockMatches
    : mockMatches.filter((m) => m.status === filter);

  if (loading) return <LoadingIndicator message="Maçlar yükleniyor..." />;

  const filters = [
    { key: 'all', label: 'Tümü' },
    { key: 'upcoming', label: 'Yaklaşan' },
    { key: 'completed', label: 'Tamamlanan' },
  ] as const;

  return (
    <View style={styles.container}>
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
        data={filteredMatches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <MatchCard
            homeTeam={item.homeTeam}
            awayTeam={item.awayTeam}
            date={formatDateShort(item.date)}
            time={item.time}
            field={item.field}
            status={item.status}
            type={item.type}
            homeScore={item.homeScore}
            awayScore={item.awayScore}
            onPress={() => navigation.navigate('MatchDetail', { matchId: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyState icon="football-outline" title="Maç bulunamadı" />}
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
