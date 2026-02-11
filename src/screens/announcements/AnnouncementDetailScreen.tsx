import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge } from '../../components/atoms';
import { mockAnnouncements } from '../../mocks';
import { formatDate, getPriorityText } from '../../utils/helpers';

export const AnnouncementDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { announcementId } = route.params;
  const [loading, setLoading] = useState(true);

  const announcement = mockAnnouncements.find((a) => a.id === announcementId);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!announcement) return <View style={styles.container}><Text>Duyuru bulunamadı</Text></View>;

  const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
    general: { icon: 'megaphone', color: COLORS.primary, label: 'Genel' },
    training: { icon: 'fitness', color: COLORS.info, label: 'Antrenman' },
    match: { icon: 'football', color: COLORS.secondary, label: 'Maç' },
    payment: { icon: 'card', color: COLORS.warning, label: 'Ödeme' },
  };

  const config = typeConfig.general;

  const priorityColors: Record<string, string> = {
    high: COLORS.error,
    medium: COLORS.warning,
    low: COLORS.success,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Üst Alan */}
      <View style={[styles.header, { backgroundColor: config.color }]}>
        <Ionicons name={config.icon as any} size={48} color={COLORS.white + '40'} style={styles.headerIcon} />
        <View style={styles.headerBadges}>
          <Badge text={config.label} variant="primary" size="md" />
          <Badge
            text={getPriorityText(announcement.priority)}
            variant={announcement.priority === 'high' ? 'error' : announcement.priority === 'medium' ? 'warning' : 'success'}
            size="md"
          />
        </View>
        <Text style={styles.title}>{announcement.title}</Text>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={14} color={COLORS.white + 'CC'} />
            <Text style={styles.metaText}>{announcement.authorName}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.white + 'CC'} />
            <Text style={styles.metaText}>{formatDate(announcement.date)}</Text>
          </View>
        </View>
      </View>

      {/* İçerik */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.body}>{announcement.content}</Text>
        </View>

        {/* Hedef Kitle */}
        {announcement.ageGroupIds && announcement.ageGroupIds.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Hedef Yaş Grupları</Text>
            <View style={styles.tagRow}>
              {announcement.ageGroupIds.map((group: string) => (
                <View key={group} style={styles.tag}>
                  <Text style={styles.tagText}>{group}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
    overflow: 'hidden',
  },
  headerIcon: { position: 'absolute', top: SPACING.lg, right: SPACING.lg },
  headerBadges: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  meta: { flexDirection: 'row', gap: SPACING.lg },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: FONT_SIZES.sm, color: COLORS.white + 'CC' },
  content: { paddingHorizontal: SPACING.xl, marginTop: -SPACING.lg },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.sm,
  },
  body: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  tag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary + '15',
  },
  tagText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, fontWeight: FONT_WEIGHTS.medium },
});
