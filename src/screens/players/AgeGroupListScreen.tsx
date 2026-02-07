import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator } from '../../components/atoms';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { mockPlayers, mockCoaches } from '../../mocks';

/**
 * Yaş Grubu Listesi Ekranı
 */
export const AgeGroupListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator message="Yaş grupları yükleniyor..." />;

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={mockAgeGroups}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const playerCount = mockPlayers.filter((p) => p.ageGroupIds.includes(item.id) && p.isActive).length;
        const coaches = mockCoaches.filter((c) => c.ageGroupIds.includes(item.id));

        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('AgeGroupDetail', { ageGroupId: item.id })}
            activeOpacity={0.7}
          >
            <View style={[styles.colorStrip, { backgroundColor: item.color }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.groupName}>{item.name}</Text>
                <View style={styles.countBadge}>
                  <Ionicons name="people" size={14} color={COLORS.primary} />
                  <Text style={styles.countText}>{playerCount}</Text>
                </View>
              </View>
              <Text style={styles.description}>{item.description}</Text>
              <View style={styles.coaches}>
                <Ionicons name="clipboard-outline" size={14} color={COLORS.textSecondary} />
                <Text style={styles.coachText}>
                  {coaches.map((c) => c.name).join(', ') || 'Atanmamış'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    ...SHADOWS.sm,
  },
  colorStrip: {
    width: 4,
    alignSelf: 'stretch',
  },
  cardContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  countText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.primary,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  coaches: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  coachText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
