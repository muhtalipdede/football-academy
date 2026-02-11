import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, FONT_WEIGHTS, SHADOWS } from '../../constants/theme';
import { LoadingIndicator, Badge } from '../../components/atoms';
import { PaymentCard, SectionHeader } from '../../components/molecules';
import { mockPayments } from '../../mocks';
import { useAuthStore } from '../../store';
import { formatCurrency } from '../../utils/helpers';

type FilterType = 'all' | 'paid' | 'pending' | 'overdue';

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'paid', label: 'Ödendi' },
  { key: 'pending', label: 'Bekleyen' },
  { key: 'overdue', label: 'Gecikmiş' },
];

export const PaymentListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const payments = useMemo(() => {
    let list = mockPayments;
    // Parent ise sadece kendi ödemelerini göster
    if (user?.role === 'parent') {
      list = list.filter((p) => p.parentId === user.id);
    }
    if (filter !== 'all') {
      list = list.filter((p) => p.status === filter);
    }
    return list;
  }, [filter, user]);

  // Özet istatistikler
  const totalPaid = mockPayments.filter((p) => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayments.filter((p) => p.status === 'pending').reduce((s, p) => s + p.amount, 0);
  const totalOverdue = mockPayments.filter((p) => p.status === 'overdue').reduce((s, p) => s + p.amount, 0);

  if (loading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      {/* Özet Kartlar (sadece admin) */}
      {(user?.role === 'admin' || user?.role === 'coach') && (
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.success }]}>  
            <Text style={styles.summaryLabel}>Ödenen</Text>
            <Text style={[styles.summaryAmount, { color: COLORS.success }]}>{formatCurrency(totalPaid)}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.warning }]}>  
            <Text style={styles.summaryLabel}>Bekleyen</Text>
            <Text style={[styles.summaryAmount, { color: COLORS.warning }]}>{formatCurrency(totalPending)}</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: COLORS.error }]}>  
            <Text style={styles.summaryLabel}>Gecikmiş</Text>
            <Text style={[styles.summaryAmount, { color: COLORS.error }]}>{formatCurrency(totalOverdue)}</Text>
          </View>
        </View>
      )}

      {/* Filtreler */}
      <View style={styles.filterRow}>
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.filterContent}
          renderItem={({ item }) => {
            const isActive = filter === item.key;
            return (
              <TouchableOpacity
                style={[styles.filterChip, isActive && styles.filterActive]}
                onPress={() => setFilter(item.key)}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Ödeme Listesi */}
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PaymentCard
            description={item.description}
            amount={item.amount}
            currency={item.currency}
            dueDate={item.dueDate}
            status={item.status}
            onPress={() => navigation.navigate('PaymentDetail', { paymentId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="card-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Ödeme bulunamadı</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  summaryRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingTop: SPACING.md },
  summaryCard: {
    flex: 1, backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md, borderLeftWidth: 3, ...SHADOWS.sm,
  },
  summaryLabel: { fontSize: FONT_SIZES.xs, color: COLORS.textLight },
  summaryAmount: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, marginTop: 2 },
  filterRow: { paddingVertical: SPACING.sm },
  filterContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  filterChip: {
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl, backgroundColor: COLORS.white, ...SHADOWS.sm,
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, fontWeight: FONT_WEIGHTS.medium },
  filterTextActive: { color: COLORS.white },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 100 },
  empty: { alignItems: 'center', marginTop: 100, gap: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.md, color: COLORS.textLight },
});
