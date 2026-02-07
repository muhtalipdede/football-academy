import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, SHADOWS, FONT_WEIGHTS } from '../../constants/theme';
import { UserRole } from '../../types';
import { useAuthStore } from '../../store';

/**
 * Rol Seçici Ekranı - Mock giriş için
 */
const roles: { role: UserRole; title: string; description: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
  {
    role: 'admin',
    title: 'Yönetici',
    description: 'Tüm kulüp yönetimi, sporcu ve antrenör atama, ödeme takibi',
    icon: 'shield-checkmark',
    color: '#E63946',
  },
  {
    role: 'coach',
    title: 'Antrenör',
    description: 'Antrenman planlama, yoklama, performans değerlendirme',
    icon: 'clipboard',
    color: '#1B2A4A',
  },
  {
    role: 'parent',
    title: 'Veli',
    description: 'Çocuk takibi, ödeme, duyurular ve performans görüntüleme',
    icon: 'people',
    color: '#10B981',
  },
  {
    role: 'player',
    title: 'Sporcu',
    description: 'Antrenman ve maç takvimi, performans raporu (salt okunur)',
    icon: 'football',
    color: '#F59E0B',
  },
];

export const RoleSelectorScreen: React.FC = () => {
  const { loginWithRole } = useAuthStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="football" size={40} color={COLORS.white} />
        <Text style={styles.title}>Rol Seçin</Text>
        <Text style={styles.subtitle}>Mock giriş için bir rol seçin</Text>
      </View>

      <ScrollView style={styles.roleList} contentContainerStyle={styles.roleListContent}>
        {roles.map((item) => (
          <TouchableOpacity
            key={item.role}
            style={styles.roleCard}
            onPress={() => loginWithRole(item.role)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={32} color={item.color} />
            </View>
            <View style={styles.roleInfo}>
              <Text style={styles.roleTitle}>{item.title}</Text>
              <Text style={styles.roleDescription}>{item.description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: SPACING.xxl,
    gap: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.white + 'CC',
  },
  roleList: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xxl,
    borderTopRightRadius: BORDER_RADIUS.xxl,
  },
  roleListContent: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    ...SHADOWS.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleInfo: {
    flex: 1,
    marginLeft: SPACING.lg,
    marginRight: SPACING.sm,
  },
  roleTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  roleDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});
