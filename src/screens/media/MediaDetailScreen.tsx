import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge } from '../../components/atoms';
import { mockMediaItems } from '../../mocks/media';
import { formatDate } from '../../utils/helpers';

const { width } = Dimensions.get('window');

export const MediaDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { mediaId } = route.params;
  const [loading, setLoading] = useState(true);

  const media = mockMediaItems.find((m) => m.id === mediaId);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!media) return <View style={styles.container}><Text>Medya bulunamadı</Text></View>;

  const typeConfig: Record<string, { icon: string; color: string; label: string }> = {
    photo: { icon: 'image', color: COLORS.primary, label: 'Fotoğraf' },
    video: { icon: 'videocam', color: COLORS.secondary, label: 'Video' },
    document: { icon: 'document', color: COLORS.info, label: 'Belge' },
  };
  const config = typeConfig[media.type] || typeConfig.photo;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Preview Area */}
      <View style={[styles.preview, { backgroundColor: config.color + '15' }]}>
        <Ionicons name={config.icon as any} size={80} color={config.color + '60'} />
        {media.type === 'video' && (
          <View style={styles.playButton}>
            <Ionicons name="play" size={32} color={COLORS.white} />
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Badge text={config.label} variant="primary" size="md" />
        </View>
        <Text style={styles.title}>{media.title}</Text>
        {media.description && (
          <Text style={styles.description}>{media.description}</Text>
        )}

        <View style={styles.metaCard}>
          <MetaRow icon="calendar-outline" label="Yükleme Tarihi" value={formatDate(media.uploadedAt)} />
          <MetaRow icon="person-outline" label="Yükleyen" value={media.uploadedBy} />
          {media.ageGroupId && (
            <MetaRow icon="people-outline" label="Yaş Grubu" value={media.ageGroupId} />
          )}
        </View>

        {/* Etiketler */}
        {media.tags && media.tags.length > 0 && (
          <View style={styles.tagsSection}>
            <Text style={styles.tagsTitle}>Etiketler</Text>
            <View style={styles.tagsRow}>
              {media.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Ionicons name="pricetag-outline" size={12} color={COLORS.primary} />
                  <Text style={styles.tagText}>{tag}</Text>
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

const MetaRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={metaStyles.row}>
    <Ionicons name={icon as any} size={18} color={COLORS.primary} />
    <View style={metaStyles.info}>
      <Text style={metaStyles.label}>{label}</Text>
      <Text style={metaStyles.value}>{value}</Text>
    </View>
  </View>
);

const metaStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider,
  },
  info: { flex: 1 },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight },
  value: { fontSize: FONT_SIZES.md, color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.medium, marginTop: 1 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  preview: {
    width: width, height: width * 0.6, justifyContent: 'center', alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: COLORS.secondary + 'CC',
    justifyContent: 'center', alignItems: 'center',
  },
  content: { paddingHorizontal: SPACING.xl },
  headerRow: { flexDirection: 'row', marginTop: SPACING.lg, marginBottom: SPACING.sm },
  title: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary, marginBottom: SPACING.sm },
  description: { fontSize: FONT_SIZES.md, color: COLORS.textSecondary, lineHeight: 22, marginBottom: SPACING.lg },
  metaCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg, ...SHADOWS.sm,
  },
  tagsSection: { marginTop: SPACING.lg },
  tagsTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.textPrimary, marginBottom: SPACING.sm },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  tag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.primary + '12',
  },
  tagText: { fontSize: FONT_SIZES.sm, color: COLORS.primary },
});
