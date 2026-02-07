import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator } from '../../components/atoms';
import { PlayerCard, SectionHeader, AnnouncementCard } from '../../components/molecules';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { mockPlayers, mockCoaches, mockAnnouncements } from '../../mocks';

/**
 * Yaş Grubu Detay Ekranı
 */
export const AgeGroupDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { ageGroupId } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const ageGroup = mockAgeGroups.find((ag) => ag.id === ageGroupId);
  const players = mockPlayers.filter((p) => p.ageGroupIds.includes(ageGroupId) && p.isActive);
  const coaches = mockCoaches.filter((c) => c.ageGroupIds.includes(ageGroupId));
  const announcements = mockAnnouncements.filter(
    (a) => a.ageGroupIds.includes(ageGroupId) || a.ageGroupIds.length === 0
  ).slice(0, 3);

  if (loading) return <LoadingIndicator />;
  if (!ageGroup) return <View style={styles.container}><Text>Yaş grubu bulunamadı</Text></View>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: ageGroup.color }]}>
        <Text style={styles.groupName}>{ageGroup.name}</Text>
        <Text style={styles.description}>{ageGroup.description}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{players.length}</Text>
            <Text style={styles.statLabel}>Sporcu</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{coaches.length}</Text>
            <Text style={styles.statLabel}>Antrenör</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Antrenörler */}
        <SectionHeader title="Antrenörler" />
        {coaches.map((coach) => (
          <View key={coach.id} style={styles.coachCard}>
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{coach.name}</Text>
              <Text style={styles.coachSpec}>{coach.specialization} • {coach.licenseType}</Text>
            </View>
          </View>
        ))}

        {/* Sporcular */}
        <SectionHeader title="Sporcular" />
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            name={player.name}
            position={player.position}
            jerseyNumber={player.jerseyNumber}
            ageGroup={ageGroup.name}
            onPress={() => navigation.navigate('PlayerDetail', { playerId: player.id })}
          />
        ))}

        {/* Grup Duyuruları */}
        <SectionHeader title="Duyurular" />
        {announcements.map((ann) => (
          <AnnouncementCard
            key={ann.id}
            title={ann.title}
            content={ann.content}
            date={ann.date}
            authorName={ann.authorName}
            priority={ann.priority}
            isRead={ann.isRead}
          />
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
    alignItems: 'center',
  },
  groupName: {
    fontSize: 48,
    fontWeight: FONT_WEIGHTS.extrabold,
    color: COLORS.white,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white + 'CC',
    marginTop: SPACING.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.xxxl,
    marginTop: SPACING.xl,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.white + 'CC',
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  coachCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  coachInfo: {},
  coachName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  coachSpec: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
