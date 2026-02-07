import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../../constants/theme';
import { Badge } from '../atoms/Badge';
import { getPriorityText, formatDateShort } from '../../utils/helpers';

/**
 * Molecule: AnnouncementCard - Duyuru kart bileşeni
 */
interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  authorName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead?: boolean;
  onPress?: () => void;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  content,
  date,
  authorName,
  priority,
  isRead = false,
  onPress,
}) => {
  const priorityVariant =
    priority === 'urgent' ? 'error' :
    priority === 'high' ? 'warning' :
    priority === 'medium' ? 'info' : 'default';

  return (
    <TouchableOpacity
      style={[styles.container, !isRead && styles.unread]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {!isRead && <View style={styles.unreadDot} />}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Badge text={getPriorityText(priority)} variant={priorityVariant} size="sm" />
      </View>
      <Text style={styles.content} numberOfLines={2}>{content}</Text>
      <View style={styles.footer}>
        <View style={styles.author}>
          <Ionicons name="person-outline" size={12} color={COLORS.textLight} />
          <Text style={styles.footerText}>{authorName}</Text>
        </View>
        <Text style={styles.footerText}>{formatDateShort(date)}</Text>
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
  unread: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
  },
  unreadDot: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginRight: SPACING.sm,
  },
  content: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SPACING.sm,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  footerText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
});
