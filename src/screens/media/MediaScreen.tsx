import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge } from '../../components/atoms';
import { mockMediaItems } from '../../mocks/media';
import { formatDateShort } from '../../utils/helpers';

const { width } = Dimensions.get('window');
const GRID_SPACING = SPACING.sm;
const GRID_COLUMNS = 3;
const ITEM_SIZE = (width - SPACING.lg * 2 - GRID_SPACING * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

type FilterType = 'all' | 'photo' | 'video' | 'document';

const FILTERS: { key: FilterType; label: string; icon: string }[] = [
  { key: 'all', label: 'Tümü', icon: 'apps' },
  { key: 'photo', label: 'Fotoğraf', icon: 'image' },
  { key: 'video', label: 'Video', icon: 'videocam' },
  { key: 'document', label: 'Belge', icon: 'document' },
];

export const MediaScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return mockMediaItems;
    return mockMediaItems.filter((m) => m.type === filter);
  }, [filter]);

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      {/* Filtreler */}
      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterChip, isActive && styles.filterActive]}
              onPress={() => setFilter(f.key)}
            >
              <Ionicons
                name={f.icon as any}
                size={16}
                color={isActive ? COLORS.white : COLORS.textSecondary}
              />
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={GRID_COLUMNS}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate('MediaDetail', { mediaId: item.id })}
          >
            <View style={styles.thumbnail}>
              {item.type === 'photo' ? (
                <View style={[styles.placeholderBg, { backgroundColor: COLORS.primary + '20' }]}>
                  <Ionicons name="image" size={32} color={COLORS.primary} />
                </View>
              ) : item.type === 'video' ? (
                <View style={[styles.placeholderBg, { backgroundColor: COLORS.secondary + '20' }]}>
                  <Ionicons name="play-circle" size={36} color={COLORS.secondary} />
                </View>
              ) : (
                <View style={[styles.placeholderBg, { backgroundColor: COLORS.info + '20' }]}>
                  <Ionicons name="document" size={32} color={COLORS.info} />
                </View>
              )}
              {item.type === 'video' && (
                <View style={styles.videoOverlay}>
                  <Ionicons name="play" size={14} color={COLORS.white} />
                </View>
              )}
            </View>
            <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.itemDate}>{formatDateShort(item.uploadedAt)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="images-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Medya bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  filterRow: {
    flexDirection: 'row', paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md, gap: SPACING.sm,
  },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl, backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: FONT_WEIGHTS.medium },
  filterTextActive: { color: COLORS.white },
  grid: { paddingHorizontal: SPACING.lg, paddingBottom: 100 },
  gridRow: { gap: GRID_SPACING, marginBottom: GRID_SPACING },
  gridItem: { width: ITEM_SIZE },
  thumbnail: {
    width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: BORDER_RADIUS.md,
    overflow: 'hidden', backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  placeholderBg: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  videoOverlay: {
    position: 'absolute', bottom: 6, right: 6,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: COLORS.secondary, justifyContent: 'center', alignItems: 'center',
  },
  itemTitle: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.medium, color: COLORS.textPrimary, marginTop: SPACING.xs },
  itemDate: { fontSize: 10, color: COLORS.textLight },
  empty: { alignItems: 'center', marginTop: 100, gap: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
});
