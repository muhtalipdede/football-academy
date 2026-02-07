import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { Avatar, Button } from '../../components/atoms';
import { useAuthStore } from '../../store';

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const roleLabels: Record<string, string> = {
    admin: 'Yönetici',
    coach: 'Antrenör',
    parent: 'Veli',
    player: 'Oyuncu',
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Kişisel Bilgiler', onPress: () => {} },
    { icon: 'lock-closed-outline', label: 'Şifre Değiştir', onPress: () => {} },
    { icon: 'notifications-outline', label: 'Bildirim Ayarları', onPress: () => navigation.navigate('Settings') },
    { icon: 'help-circle-outline', label: 'Yardım & Destek', onPress: () => {} },
    { icon: 'information-circle-outline', label: 'Hakkında', onPress: () => Alert.alert('Futbol Akademisi', 'Versiyon 1.0.0\n© 2025 Futbol Akademisi') },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <Avatar name={user.name} size="lg" />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{roleLabels[user.role]}</Text>
        <Text style={styles.email}>{user.email}</Text>
        {user.phone && <Text style={styles.phone}>{user.phone}</Text>}
      </View>

      {/* Menü */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Çıkış Butonu */}
      <View style={styles.logoutSection}>
        <Button
          title="Çıkış Yap"
          variant="outline"
          onPress={() => {
            Alert.alert('Çıkış Yap', 'Çıkış yapmak istediğinizden emin misiniz?', [
              { text: 'İptal', style: 'cancel' },
              { text: 'Çıkış Yap', style: 'destructive', onPress: logout },
            ]);
          }}
          icon={<Ionicons name="log-out-outline" size={20} color={COLORS.secondary} />}
          fullWidth
          size="lg"
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xxl,
    paddingBottom: SPACING.xxxl,
    alignItems: 'center',
    borderBottomLeftRadius: BORDER_RADIUS.xxl,
    borderBottomRightRadius: BORDER_RADIUS.xxl,
  },
  name: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.white, marginTop: SPACING.md },
  role: {
    fontSize: FONT_SIZES.sm, color: COLORS.accent, fontWeight: FONT_WEIGHTS.semibold,
    marginTop: SPACING.xs,
  },
  email: { fontSize: FONT_SIZES.sm, color: COLORS.white + 'CC', marginTop: SPACING.xs },
  phone: { fontSize: FONT_SIZES.sm, color: COLORS.white + '99', marginTop: 2 },
  menu: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.xl, marginTop: -SPACING.lg,
    ...SHADOWS.md,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg, borderBottomWidth: 1, borderBottomColor: COLORS.divider,
  },
  menuLabel: {
    flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textPrimary,
    fontWeight: FONT_WEIGHTS.medium, marginLeft: SPACING.md,
  },
  logoutSection: { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },
});
