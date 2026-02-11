import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { useAuthStore } from '../../store';
import { StatCard, QuickActionCard, SectionHeader, TrainingCard, MatchCard, AnnouncementCard } from '../../components/molecules';
import { LoadingIndicator } from '../../components/atoms';
import { mockPlayers, mockTrainings, mockMatches, mockAnnouncements, mockPayments } from '../../mocks';
import { mockAgeGroups } from '../../mocks/ageGroups';
import { formatDateShort } from '../../utils/helpers';

/**
 * Dashboard Ekranı - Role göre farklı içerik
 */
export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1000));
    setRefreshing(false);
  };

  if (loading) return <LoadingIndicator message="Dashboard yükleniyor..." />;

  const todayTrainings = mockTrainings.filter((t) => t.status === 'planned').slice(0, 2);
  const upcomingMatches = mockMatches.filter((m) => m.status === 'upcoming').slice(0, 1);
  const recentAnnouncements = mockAnnouncements.slice(0, 3);
  const overduePayments = mockPayments.filter((p) => p.status === 'overdue');
  const activePlayers = mockPlayers.filter((p) => p.isActive);

  const getAgeGroupName = (id: string) => mockAgeGroups.find((ag) => ag.id === id)?.name || '';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi Günler';
    return 'İyi Akşamlar';
  };

  const getRoleTitle = () => {
    switch (user?.role) {
      case 'admin': return 'Yönetici';
      case 'coach': return 'Antrenör';
      case 'parent': return 'Veli';
      case 'player': return 'Sporcu';
      default: return '';
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}, 👋</Text>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.roleText}>{getRoleTitle()}</Text>
          </View>
          <View style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>3</Text>
            </View>
          </View>
        </View>
      </View>

      {/* İstatistikler */}
      {(user?.role === 'admin' || user?.role === 'coach') && (
        <View style={styles.statsRow}>
          <StatCard
            title="Sporcu"
            value={activePlayers.length}
            icon="people"
            color={COLORS.primary}
            onPress={() => navigation.navigate('Players')}
          />
          <StatCard
            title="Yaş Grubu"
            value={mockAgeGroups.length}
            icon="layers"
            color={COLORS.info}
          />
        </View>
      )}

      {user?.role === 'admin' && (
        <View style={styles.statsRow}>
          <StatCard
            title="Geciken Ödeme"
            value={overduePayments.length}
            icon="alert-circle"
            color={COLORS.error}
            onPress={() => navigation.navigate('More', { screen: 'Payments' })}
          />
          <StatCard
            title="Bu Ay Maç"
            value={upcomingMatches.length}
            icon="football"
            color={COLORS.success}
            onPress={() => navigation.navigate('Matches')}
          />
        </View>
      )}

      {/* Veli - Ödeme Durumu */}
      {user?.role === 'parent' && (
        <View style={styles.paymentAlert}>
          <Ionicons name="card-outline" size={24} color={COLORS.warning} />
          <View style={styles.paymentAlertInfo}>
            <Text style={styles.paymentAlertTitle}>Ödeme Durumu</Text>
            <Text style={styles.paymentAlertText}>2 bekleyen ödemeniz var</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </View>
      )}

      {/* Hızlı Aksiyonlar */}
      <View style={styles.section}>
        <SectionHeader title="Hızlı Aksiyonlar" />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
        {user?.role === 'admin' && (
          <>
            <QuickActionCard title="Sporcu Ekle" icon="person-add" color={COLORS.primary} onPress={() => {}} />
            <QuickActionCard title="Duyuru Yaz" icon="megaphone" color={COLORS.secondary} onPress={() => navigation.navigate('More', { screen: 'Announcements' })} />
            <QuickActionCard title="Ödeme Takip" icon="card" color={COLORS.success} onPress={() => navigation.navigate('More', { screen: 'Payments' })} />
            <QuickActionCard title="Maç Planla" icon="football" color={COLORS.warning} onPress={() => navigation.navigate('Matches')} />
          </>
        )}
        {user?.role === 'coach' && (
          <>
            <QuickActionCard title="Yoklama Al" icon="checkbox" color={COLORS.primary} onPress={() => navigation.navigate('Training')} />
            <QuickActionCard title="Antrenman" icon="barbell" color={COLORS.secondary} onPress={() => navigation.navigate('Training')} />
            <QuickActionCard title="Performans" icon="stats-chart" color={COLORS.success} onPress={() => navigation.navigate('More', { screen: 'Performance' })} />
            <QuickActionCard title="Duyurular" icon="megaphone" color={COLORS.warning} onPress={() => navigation.navigate('More', { screen: 'Announcements' })} />
          </>
        )}
        {user?.role === 'parent' && (
          <>
            <QuickActionCard title="Çocuğum" icon="person" color={COLORS.primary} onPress={() => navigation.navigate('Players')} />
            <QuickActionCard title="Ödemeler" icon="card" color={COLORS.secondary} onPress={() => navigation.navigate('More', { screen: 'Payments' })} />
            <QuickActionCard title="Duyurular" icon="megaphone" color={COLORS.success} onPress={() => navigation.navigate('More', { screen: 'Announcements' })} />
            <QuickActionCard title="Gelişim" icon="trending-up" color={COLORS.warning} onPress={() => navigation.navigate('More', { screen: 'Performance' })} />
          </>
        )}
        {user?.role === 'player' && (
          <>
            <QuickActionCard title="Takvim" icon="calendar" color={COLORS.primary} onPress={() => navigation.navigate('Training')} />
            <QuickActionCard title="Maçlar" icon="football" color={COLORS.secondary} onPress={() => navigation.navigate('Matches')} />
            <QuickActionCard title="Performans" icon="stats-chart" color={COLORS.success} onPress={() => navigation.navigate('More', { screen: 'Performance' })} />
            <QuickActionCard title="Medya" icon="images" color={COLORS.warning} onPress={() => navigation.navigate('More', { screen: 'Media' })} />
          </>
        )}
      </ScrollView>

      {/* Günün Antrenmanı */}
      <View style={styles.section}>
        <SectionHeader
          title="Yaklaşan Antrenmanlar"
          actionText="Tümü"
          onAction={() => navigation.navigate('Training')}
        />
        {todayTrainings.map((training) => (
          <TrainingCard
            key={training.id}
            title={training.title}
            date={formatDateShort(training.date)}
            time={`${training.startTime} - ${training.endTime}`}
            field={training.field}
            status={training.status}
            ageGroup={getAgeGroupName(training.ageGroupId)}
            onPress={() => navigation.navigate('Training', { screen: 'TrainingDetail', params: { trainingId: training.id } })}
          />
        ))}
      </View>

      {/* Yaklaşan Maç */}
      <View style={styles.section}>
        <SectionHeader
          title="Yaklaşan Maçlar"
          actionText="Tümü"
          onAction={() => navigation.navigate('Matches')}
        />
        {upcomingMatches.map((match) => (
          <MatchCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            date={formatDateShort(match.date)}
            time={match.time}
            field={match.field}
            status={match.status}
            type={match.type}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            onPress={() => navigation.navigate('Matches', { screen: 'MatchDetail', params: { matchId: match.id } })}
          />
        ))}
      </View>

      {/* Son Duyurular */}
      <View style={styles.section}>
        <SectionHeader
          title="Son Duyurular"
          actionText="Tümü"
          onAction={() => navigation.navigate('More', { screen: 'Announcements' })}
        />
        {recentAnnouncements.map((ann) => (
          <AnnouncementCard
            key={ann.id}
            title={ann.title}
            content={ann.content}
            date={ann.date}
            authorName={ann.authorName}
            priority={ann.priority}
            isRead={ann.isRead}
            onPress={() => navigation.navigate('More', { screen: 'AnnouncementDetail', params: { announcementId: ann.id } })}
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
  content: {
    paddingBottom: SPACING.xxl,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 60,
    paddingBottom: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white + 'CC',
  },
  userName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
    marginTop: SPACING.xs,
  },
  roleText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.accent,
    fontWeight: FONT_WEIGHTS.medium,
    marginTop: 2,
  },
  notificationBtn: {
    position: 'relative',
    padding: SPACING.sm,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    fontSize: 10,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
  },
  paymentAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.warningLight,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  paymentAlertInfo: {
    flex: 1,
  },
  paymentAlertTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  paymentAlertText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  section: {
    paddingHorizontal: SPACING.xl,
  },
  quickActions: {
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.sm,
  },
});
