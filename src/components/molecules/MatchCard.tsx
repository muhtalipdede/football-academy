import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../../constants/theme';
import { Badge } from '../atoms/Badge';
import { getMatchStatusText, getMatchTypeText } from '../../utils/helpers';

/**
 * Molecule: MatchCard - Maç kart bileşeni
 */
interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  field: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  type: string;
  homeScore?: number;
  awayScore?: number;
  onPress?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  homeTeam,
  awayTeam,
  date,
  time,
  field,
  status,
  type,
  homeScore,
  awayScore,
  onPress,
}) => {
  const statusVariant =
    status === 'completed' ? 'success' :
    status === 'live' ? 'error' :
    status === 'cancelled' ? 'warning' : 'info';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Badge text={getMatchTypeText(type)} variant="primary" />
        <Badge text={getMatchStatusText(status)} variant={statusVariant} />
      </View>

      <View style={styles.teams}>
        <View style={styles.team}>
          <Ionicons name="shield" size={28} color={COLORS.primary} />
          <Text style={styles.teamName} numberOfLines={2}>{homeTeam}</Text>
        </View>

        <View style={styles.scoreContainer}>
          {status === 'completed' || status === 'live' ? (
            <Text style={styles.score}>
              {homeScore} - {awayScore}
            </Text>
          ) : (
            <Text style={styles.vs}>VS</Text>
          )}
        </View>

        <View style={styles.team}>
          <Ionicons name="shield" size={28} color={COLORS.secondary} />
          <Text style={styles.teamName} numberOfLines={2}>{awayTeam}</Text>
        </View>
      </View>

      <View style={styles.footer}>
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
    marginBottom: SPACING.lg,
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  team: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  teamName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  scoreContainer: {
    paddingHorizontal: SPACING.lg,
  },
  score: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.extrabold,
    color: COLORS.textPrimary,
  },
  vs: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textLight,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.md,
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
