import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../../constants/theme';
import { Badge } from '../atoms/Badge';
import { getTrainingStatusText } from '../../utils/helpers';

/**
 * Molecule: TrainingCard - Antrenman kart bileşeni
 */
interface TrainingCardProps {
  title: string;
  date: string;
  time: string;
  field: string;
  status: 'planned' | 'completed' | 'cancelled';
  ageGroup: string;
  onPress?: () => void;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({
  title,
  date,
  time,
  field,
  status,
  ageGroup,
  onPress,
}) => {
  const statusVariant = status === 'completed' ? 'success' : status === 'cancelled' ? 'error' : 'info';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Badge text={getTrainingStatusText(status)} variant={statusVariant} />
        </View>
        <View style={styles.ageGroupBadge}>
          <Text style={styles.ageGroupText}>{ageGroup}</Text>
        </View>
      </View>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>{field}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  titleRow: {
    flex: 1,
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  ageGroupBadge: {
    backgroundColor: COLORS.secondary + '15',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.full,
  },
  ageGroupText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.secondary,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});
