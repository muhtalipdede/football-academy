import { PerformanceReport } from '../types';

/**
 * Mock performans verileri
 */
export const mockPerformanceReports: PerformanceReport[] = [
  {
    id: 'perf-001',
    playerId: 'player-001',
    coachId: 'coach-002',
    period: '2025-2026 Güz Dönemi',
    date: '2026-01-20T00:00:00Z',
    technical: [
      { category: 'Pas Kalitesi', score: 7, maxScore: 10 },
      { category: 'Şut Tekniği', score: 8, maxScore: 10 },
      { category: 'Top Kontrolü', score: 7, maxScore: 10 },
      { category: 'Dribling', score: 6, maxScore: 10 },
      { category: 'Kafa Vuruşu', score: 5, maxScore: 10 },
    ],
    physical: [
      { category: 'Hız', score: 8, maxScore: 10 },
      { category: 'Dayanıklılık', score: 6, maxScore: 10 },
      { category: 'Güç', score: 5, maxScore: 10 },
      { category: 'Çeviklik', score: 7, maxScore: 10 },
    ],
    discipline: [
      { category: 'Devam Durumu', score: 9, maxScore: 10 },
      { category: 'Takım Uyumu', score: 8, maxScore: 10 },
      { category: 'Antrenman Disiplini', score: 7, maxScore: 10 },
    ],
    overallScore: 7.2,
    notes: 'Emre bu dönem özellikle şut tekniğinde büyük gelişme gösterdi. Hız konusunda yaş grubunun en iyilerinden.',
    recommendations: 'Dribling ve kafa vuruşu çalışmalarına ağırlık verilmeli. Dayanıklılık antrenmanları artırılmalı.',
  },
  {
    id: 'perf-002',
    playerId: 'player-002',
    coachId: 'coach-002',
    period: '2025-2026 Güz Dönemi',
    date: '2026-01-20T00:00:00Z',
    technical: [
      { category: 'Pas Kalitesi', score: 9, maxScore: 10 },
      { category: 'Şut Tekniği', score: 6, maxScore: 10 },
      { category: 'Top Kontrolü', score: 8, maxScore: 10 },
      { category: 'Dribling', score: 8, maxScore: 10 },
      { category: 'Kafa Vuruşu', score: 4, maxScore: 10 },
    ],
    physical: [
      { category: 'Hız', score: 7, maxScore: 10 },
      { category: 'Dayanıklılık', score: 7, maxScore: 10 },
      { category: 'Güç', score: 5, maxScore: 10 },
      { category: 'Çeviklik', score: 8, maxScore: 10 },
    ],
    discipline: [
      { category: 'Devam Durumu', score: 9, maxScore: 10 },
      { category: 'Takım Uyumu', score: 9, maxScore: 10 },
      { category: 'Antrenman Disiplini', score: 8, maxScore: 10 },
    ],
    overallScore: 7.5,
    notes: 'Yusuf doğal bir oyun kurucusu. Pas kalitesi mükemmel. Takım arkadaşlarıyla uyumu çok iyi.',
    recommendations: 'Şut kabiliyeti ve fiziksel güç çalışmaları ön plana çıkarılmalı.',
  },
  {
    id: 'perf-003',
    playerId: 'player-005',
    coachId: 'coach-001',
    period: '2025-2026 Güz Dönemi',
    date: '2026-01-20T00:00:00Z',
    technical: [
      { category: 'Pas Kalitesi', score: 7, maxScore: 10 },
      { category: 'Şut Tekniği', score: 9, maxScore: 10 },
      { category: 'Top Kontrolü', score: 8, maxScore: 10 },
      { category: 'Dribling', score: 7, maxScore: 10 },
      { category: 'Kafa Vuruşu', score: 8, maxScore: 10 },
    ],
    physical: [
      { category: 'Hız', score: 9, maxScore: 10 },
      { category: 'Dayanıklılık', score: 8, maxScore: 10 },
      { category: 'Güç', score: 7, maxScore: 10 },
      { category: 'Çeviklik', score: 8, maxScore: 10 },
    ],
    discipline: [
      { category: 'Devam Durumu', score: 10, maxScore: 10 },
      { category: 'Takım Uyumu', score: 8, maxScore: 10 },
      { category: 'Antrenman Disiplini', score: 9, maxScore: 10 },
    ],
    overallScore: 8.2,
    notes: 'Baran dönemin en iyi performans gösteren sporcusu. Tam katılım sağladı. Şut tekniği ve hızı ile fark yaratıyor.',
    recommendations: 'Liderlik vasıfları geliştirilmeli. Sol ayak kullanımı çalışılmalı.',
  },
];
