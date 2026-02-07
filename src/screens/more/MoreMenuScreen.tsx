import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { useAuthStore } from '../../store';

interface MenuItem {
  icon: string;
  label: string;
  screen: string;
  color: string;
  description: string;
  roles: string[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    icon: 'megaphone',
    label: 'Duyurular',
    screen: 'Announcements',
    color: COLORS.primary,
    description: 'Akademi duyuruları ve haberleri',
    roles: ['admin', 'coach', 'parent', 'player'],
  },
  {
    icon: 'analytics',
    label: 'Performans',
    screen: 'Performance',
    color: COLORS.accent,
    description: 'Oyuncu performans raporları',
    roles: ['admin', 'coach', 'parent', 'player'],
  },
  {
    icon: 'card',
    label: 'Ödemeler',
    screen: 'Payments',
    color: COLORS.success,
    description: 'Aidat ve ödeme takibi',
    roles: ['admin', 'coach', 'parent'],
  },
  {
    icon: 'images',
    label: 'Medya',
    screen: 'Media',
    color: COLORS.info,
    description: 'Fotoğraf, video ve belgeler',
    roles: ['admin', 'coach', 'parent', 'player'],
  },
  {
    icon: 'person-circle',
    label: 'Profil',
    screen: 'Profile',
    color: COLORS.textSecondary,
    description: 'Kişisel bilgiler ve ayarlar',
    roles: ['admin', 'coach', 'parent', 'player'],
  },
  {
    icon: 'settings',
    label: 'Ayarlar',
    screen: 'Settings',
    color: COLORS.textLight,
    description: 'Bildirim ve uygulama ayarları',
    roles: ['admin', 'coach', 'parent', 'player'],
  },
];

export const MoreMenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuthStore();

  const visibleItems = MENU_ITEMS.filter((item) => item.roles.includes(user?.role || ''));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.grid}>
        {visibleItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.card}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg,
    gap: SPACING.md,
  },
  card: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.sm,
  },
  iconCircle: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary, textAlign: 'center',
  },
  description: {
    fontSize: FONT_SIZES.xs, color: COLORS.textLight,
    textAlign: 'center', marginTop: SPACING.xs,
  },
});
