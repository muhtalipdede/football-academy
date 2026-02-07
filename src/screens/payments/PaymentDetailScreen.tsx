import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge, Button } from '../../components/atoms';
import { mockPayments } from '../../mocks';
import { mockPlayers } from '../../mocks/players';
import { formatDate, formatCurrency, getPaymentStatusText } from '../../utils/helpers';
import { useAuthStore } from '../../store';

export const PaymentDetailScreen: React.FC<{ route: any }> = ({ route }) => {
  const { paymentId } = route.params;
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const payment = mockPayments.find((p) => p.id === paymentId);
  const player = mockPlayers.find((p) => p.id === payment?.playerId);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingIndicator />;
  if (!payment) return <View style={styles.container}><Text>Ödeme bulunamadı</Text></View>;

  const statusConfig: Record<string, { color: string; icon: string; bg: string }> = {
    paid: { color: COLORS.success, icon: 'checkmark-circle', bg: COLORS.success + '15' },
    pending: { color: COLORS.warning, icon: 'time', bg: COLORS.warning + '15' },
    overdue: { color: COLORS.error, icon: 'alert-circle', bg: COLORS.error + '15' },
  };

  const config = statusConfig[payment.status] || statusConfig.pending;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Durum Kartı */}
      <View style={[styles.statusCard, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon as any} size={48} color={config.color} />
        <Text style={[styles.statusText, { color: config.color }]}>{getPaymentStatusText(payment.status)}</Text>
        <Text style={[styles.amount, { color: config.color }]}>{formatCurrency(payment.amount)}</Text>
      </View>

      {/* Detay Bilgileri */}
      <View style={styles.detailCard}>
        <DetailRow icon="person" label="Oyuncu" value={player?.name || '-'} />
        <DetailRow icon="document-text" label="Açıklama" value={payment.description} />
        <DetailRow icon="calendar" label="Son Ödeme Tarihi" value={formatDate(payment.dueDate)} />
        {payment.paidDate && (
          <DetailRow icon="checkmark-done" label="Ödeme Tarihi" value={formatDate(payment.paidDate)} />
        )}
        <DetailRow icon="pricetag" label="Dönem" value={payment.period} />
      </View>

      {/* Gecikmiş Uyarısı */}
      {payment.status === 'overdue' && (
        <View style={styles.warningCard}>
          <Ionicons name="warning" size={24} color={COLORS.error} />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Gecikmiş Ödeme!</Text>
            <Text style={styles.warningText}>
              Bu ödeme son ödeme tarihini geçmiştir. Lütfen en kısa sürede ödeme yapınız.
            </Text>
          </View>
        </View>
      )}

      {/* Ödeme Butonu (parent için) */}
      {(user?.role === 'parent' || user?.role === 'admin') && payment.status !== 'paid' && (
        <View style={styles.actionSection}>
          <Button
            title="Online Ödeme Yap"
            onPress={() => Alert.alert('Bilgi', 'Online ödeme entegrasyonu yakında aktif olacaktır.')}
            icon={<Ionicons name="card" size={20} color={COLORS.white} />}
            fullWidth
            size="lg"
          />
          {user?.role === 'admin' && (
            <Button
              title="Manuel Ödendi Olarak İşaretle"
              variant="outline"
              onPress={() => Alert.alert('Başarılı', 'Ödeme durumu güncellendi (mock)')}
              fullWidth
              size="lg"
            />
          )}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const DetailRow: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={detailStyles.row}>
    <Ionicons name={icon as any} size={20} color={COLORS.primary} />
    <View style={detailStyles.info}>
      <Text style={detailStyles.label}>{label}</Text>
      <Text style={detailStyles.value}>{value}</Text>
    </View>
  </View>
);

const detailStyles = StyleSheet.create({
  row: {
    flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md,
    paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.divider,
  },
  info: { flex: 1 },
  label: { fontSize: FONT_SIZES.xs, color: COLORS.textLight },
  value: { fontSize: FONT_SIZES.md, color: COLORS.textPrimary, fontWeight: FONT_WEIGHTS.medium, marginTop: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  statusCard: {
    margin: SPACING.xl, borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl, alignItems: 'center', gap: SPACING.sm,
  },
  statusText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.semibold },
  amount: { fontSize: 36, fontWeight: FONT_WEIGHTS.extrabold },
  detailCard: {
    backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.xl, padding: SPACING.lg, ...SHADOWS.sm,
  },
  warningCard: {
    flexDirection: 'row', gap: SPACING.md,
    backgroundColor: COLORS.error + '10', borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.xl, marginTop: SPACING.md, padding: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.error + '30',
  },
  warningContent: { flex: 1 },
  warningTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.error },
  warningText: { fontSize: FONT_SIZES.sm, color: COLORS.error + 'CC', marginTop: SPACING.xs, lineHeight: 20 },
  actionSection: { paddingHorizontal: SPACING.xl, marginTop: SPACING.xl, gap: SPACING.md },
});
