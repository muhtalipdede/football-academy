import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';

export const SettingsScreen: React.FC = () => {
  const [trainingNotif, setTrainingNotif] = useState(true);
  const [matchNotif, setMatchNotif] = useState(true);
  const [announcementNotif, setAnnouncementNotif] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [performanceNotif, setPerformanceNotif] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
        <View style={styles.card}>
          <SettingRow
            icon="fitness-outline"
            label="Antrenman Bildirimleri"
            description="Antrenman hatırlatmaları ve değişiklikler"
            value={trainingNotif}
            onToggle={setTrainingNotif}
          />
          <SettingRow
            icon="football-outline"
            label="Maç Bildirimleri"
            description="Maç hatırlatmaları ve sonuçlar"
            value={matchNotif}
            onToggle={setMatchNotif}
          />
          <SettingRow
            icon="megaphone-outline"
            label="Duyuru Bildirimleri"
            description="Akademi duyuruları"
            value={announcementNotif}
            onToggle={setAnnouncementNotif}
          />
          <SettingRow
            icon="card-outline"
            label="Ödeme Bildirimleri"
            description="Ödeme hatırlatmaları"
            value={paymentNotif}
            onToggle={setPaymentNotif}
          />
          <SettingRow
            icon="analytics-outline"
            label="Performans Bildirimleri"
            description="Performans raporu güncellemeleri"
            value={performanceNotif}
            onToggle={setPerformanceNotif}
            isLast
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uygulama</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={22} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Versiyon</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

interface SettingRowProps {
  icon: string;
  label: string;
  description: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  isLast?: boolean;
}

const SettingRow: React.FC<SettingRowProps> = ({ icon, label, description, value, onToggle, isLast }) => (
  <View style={[settingStyles.row, !isLast && settingStyles.border]}>
    <Ionicons name={icon as any} size={22} color={COLORS.primary} />
    <View style={settingStyles.info}>
      <Text style={settingStyles.label}>{label}</Text>
      <Text style={settingStyles.description}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      trackColor={{ false: COLORS.divider, true: COLORS.primary + '60' }}
      thumbColor={value ? COLORS.primary : COLORS.textLight}
    />
  </View>
);

const settingStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg, gap: SPACING.md,
  },
  border: { borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  info: { flex: 1 },
  label: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.medium, color: COLORS.textPrimary },
  description: { fontSize: FONT_SIZES.xs, color: COLORS.textLight, marginTop: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  section: { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl },
  sectionTitle: {
    fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, ...SHADOWS.sm,
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg, gap: SPACING.md,
  },
  infoLabel: { flex: 1, fontSize: FONT_SIZES.md, color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.medium },
  infoValue: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
});
