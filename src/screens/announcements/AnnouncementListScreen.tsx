import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge } from '../../components/atoms';
import { AnnouncementCard, SectionHeader } from '../../components/molecules';
import { mockAnnouncements } from '../../mocks';
import { useAuthStore } from '../../store';

type FilterType = 'all' | 'general' | 'training' | 'match' | 'payment';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'general', label: 'Genel' },
  { key: 'training', label: 'Antrenman' },
  { key: 'match', label: 'Maç' },
  { key: 'payment', label: 'Ödeme' },
];

export const AnnouncementListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return mockAnnouncements;
    return mockAnnouncements.filter((a) => a.type === filter);
  }, [filter]);

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      {/* Filtreler */}
      <View style={styles.filterRow}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.filterContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterChip, filter === item.key && styles.filterActive]}
              onPress={() => setFilter(item.key)}
            >
              <Text style={[styles.filterText, filter === item.key && styles.filterTextActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Duyuru Listesi */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AnnouncementCard
            announcement={item}
            onPress={() => navigation.navigate('AnnouncementDetail', { announcementId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="megaphone-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Duyuru bulunamadı</Text>
          </View>
        }
      />

      {/* Admin: Duyuru Ekle */}
      {user?.role === 'admin' && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {}}
        >
          <Ionicons name="add" size={28} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  filterRow: { paddingVertical: SPACING.sm },
  filterContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  filterChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.white,
    ...SHADOWS.sm,
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: FONT_WEIGHTS.medium },
  filterTextActive: { color: COLORS.white },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 100 },
  empty: { alignItems: 'center', marginTop: 100, gap: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
  fab: {
    position: 'absolute', bottom: 24, right: 24,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center',
    ...SHADOWS.lg,
  },
});
