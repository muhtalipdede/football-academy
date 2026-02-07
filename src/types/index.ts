/**
 * TypeScript tip tanımlamaları
 * Uygulamadaki tüm veri modelleri burada tanımlıdır.
 */

// ==================== ROL & AUTH ====================

export type UserRole = 'admin' | 'coach' | 'parent' | 'player';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ==================== SPORCU ====================

export type Position = 'Kaleci' | 'Defans' | 'Orta Saha' | 'Forvet';

export interface Player {
  id: string;
  name: string;
  birthDate: string;
  position: Position;
  jerseyNumber: number;
  ageGroupIds: string[];
  parentId: string;
  avatar?: string;
  height?: number;
  weight?: number;
  foot: 'Sağ' | 'Sol' | 'Her İkisi';
  joinDate: string;
  isActive: boolean;
}

// ==================== VELİ ====================

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  playerIds: string[];
  avatar?: string;
}

// ==================== YAŞ GRUBU ====================

export interface AgeGroup {
  id: string;
  name: string; // U8, U9, U10, U11, U12, U13
  description: string;
  coachIds: string[];
  playerIds: string[];
  color: string;
}

// ==================== ANTRENÖR ====================

export interface Coach {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  ageGroupIds: string[];
  avatar?: string;
  licenseType: string;
  experience: number; // yıl
}

// ==================== ANTRENMAN ====================

export type TrainingStatus = 'planned' | 'completed' | 'cancelled';

export interface Training {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  field: string;
  ageGroupId: string;
  coachId: string;
  description: string;
  status: TrainingStatus;
  drills: string[];
}

// ==================== YOKLAMA ====================

export type AttendanceStatus = 'present' | 'late' | 'absent';

export interface AttendanceRecord {
  id: string;
  trainingId: string;
  playerId: string;
  status: AttendanceStatus;
  note?: string;
  timestamp: string;
}

export interface AttendanceSummary {
  playerId: string;
  totalSessions: number;
  present: number;
  late: number;
  absent: number;
  attendanceRate: number;
}

// ==================== MAÇ ====================

export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'cancelled';
export type MatchType = 'league' | 'friendly' | 'tournament' | 'cup';

export interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  field: string;
  ageGroupId: string;
  type: MatchType;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  coachNotes?: string;
  lineup?: string[];
}

// ==================== DUYURU ====================

export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  authorId: string;
  authorName: string;
  ageGroupIds: string[]; // boş ise genel duyuru
  priority: AnnouncementPriority;
  isRead?: boolean;
}

// ==================== PERFORMANS ====================

export interface PerformanceMetric {
  category: string;
  score: number; // 1-10
  maxScore: number;
}

export interface PerformanceReport {
  id: string;
  playerId: string;
  coachId: string;
  period: string; // "2025-2026 Güz Dönemi"
  date: string;
  technical: PerformanceMetric[];
  physical: PerformanceMetric[];
  discipline: PerformanceMetric[];
  overallScore: number;
  notes: string;
  recommendations: string;
}

// ==================== ÖDEME ====================

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface Payment {
  id: string;
  parentId: string;
  playerId: string;
  amount: number;
  currency: string;
  description: string;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  month: string;
  year: number;
}

// ==================== MEDYA ====================

export type MediaType = 'photo' | 'video' | 'document';

export interface MediaItem {
  id: string;
  type: MediaType;
  title: string;
  url: string;
  thumbnailUrl?: string;
  uploadDate: string;
  uploadedBy: string;
  ageGroupIds: string[];
  description?: string;
  fileSize?: string;
  mimeType?: string;
}

// ==================== BİLDİRİM ====================

export interface Notification {
  id: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  type: 'announcement' | 'training' | 'match' | 'payment' | 'general';
  targetId?: string;
}

// ==================== NAVİGASYON ====================

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  RoleSelector: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Players: undefined;
  Training: undefined;
  Matches: undefined;
  More: undefined;
};

export type PlayersStackParamList = {
  PlayerList: undefined;
  PlayerDetail: { playerId: string };
  AgeGroupList: undefined;
  AgeGroupDetail: { ageGroupId: string };
};

export type TrainingStackParamList = {
  TrainingList: undefined;
  TrainingDetail: { trainingId: string };
  Attendance: { trainingId: string };
};

export type MatchesStackParamList = {
  MatchList: undefined;
  MatchDetail: { matchId: string };
};

export type MoreStackParamList = {
  MoreMenu: undefined;
  Announcements: undefined;
  AnnouncementDetail: { announcementId: string };
  Performance: undefined;
  PerformanceDetail: { playerId: string };
  Payments: undefined;
  PaymentDetail: { paymentId: string };
  Media: undefined;
  MediaDetail: { mediaId: string };
  Profile: undefined;
  Settings: undefined;
};
