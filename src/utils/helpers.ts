/**
 * Yardımcı fonksiyonlar
 */

/** Tarih formatlama */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/** Kısa tarih formatlama */
export const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
  });
};

/** Saat formatlama */
export const formatTime = (timeStr: string): string => {
  return timeStr;
};

/** Para birimi formatlama */
export const formatCurrency = (amount: number, currency: string = 'TRY'): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

/** Yaş hesaplama */
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

/** Katılım oranı renklendirme */
export const getAttendanceColor = (rate: number): string => {
  if (rate >= 90) return '#10B981';
  if (rate >= 75) return '#F59E0B';
  return '#EF4444';
};

/** Ödeme durumu Türkçe metin */
export const getPaymentStatusText = (status: string): string => {
  switch (status) {
    case 'paid': return 'Ödendi';
    case 'pending': return 'Bekliyor';
    case 'overdue': return 'Gecikmiş';
    default: return status;
  }
};

/** Yoklama durumu Türkçe metin */
export const getAttendanceStatusText = (status: string): string => {
  switch (status) {
    case 'present': return 'Katıldı';
    case 'late': return 'Geç Kaldı';
    case 'absent': return 'Katılmadı';
    default: return status;
  }
};

/** Maç durumu Türkçe metin */
export const getMatchStatusText = (status: string): string => {
  switch (status) {
    case 'upcoming': return 'Yaklaşan';
    case 'live': return 'Canlı';
    case 'completed': return 'Tamamlandı';
    case 'cancelled': return 'İptal';
    default: return status;
  }
};

/** Maç tipi Türkçe metin */
export const getMatchTypeText = (type: string): string => {
  switch (type) {
    case 'league': return 'Lig';
    case 'friendly': return 'Hazırlık';
    case 'tournament': return 'Turnuva';
    case 'cup': return 'Kupa';
    default: return type;
  }
};

/** İlk harfleri al (avatar) */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/** Antrenman durumu Türkçe metin */
export const getTrainingStatusText = (status: string): string => {
  switch (status) {
    case 'planned': return 'Planlandı';
    case 'completed': return 'Tamamlandı';
    case 'cancelled': return 'İptal';
    default: return status;
  }
};

/** Öncelik Türkçe metin */
export const getPriorityText = (priority: string): string => {
  switch (priority) {
    case 'low': return 'Düşük';
    case 'medium': return 'Orta';
    case 'high': return 'Yüksek';
    case 'urgent': return 'Acil';
    default: return priority;
  }
};
