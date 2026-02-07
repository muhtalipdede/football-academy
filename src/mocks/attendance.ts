import { AttendanceRecord, AttendanceSummary } from '../types';

/**
 * Mock yoklama verileri
 */
export const mockAttendanceRecords: AttendanceRecord[] = [
  // Training 004 (completed) - U10
  { id: 'att-001', trainingId: 'training-004', playerId: 'player-001', status: 'present', timestamp: '2026-02-05T15:00:00Z' },
  { id: 'att-002', trainingId: 'training-004', playerId: 'player-002', status: 'present', timestamp: '2026-02-05T15:00:00Z' },
  { id: 'att-003', trainingId: 'training-004', playerId: 'player-011', status: 'late', note: '15 dk geç geldi', timestamp: '2026-02-05T15:15:00Z' },

  // Training 005 (completed) - U11
  { id: 'att-004', trainingId: 'training-005', playerId: 'player-003', status: 'present', timestamp: '2026-02-06T16:00:00Z' },
  { id: 'att-005', trainingId: 'training-005', playerId: 'player-004', status: 'present', timestamp: '2026-02-06T16:00:00Z' },
  { id: 'att-006', trainingId: 'training-005', playerId: 'player-011', status: 'absent', note: 'Hastalık nedeniyle katılamadı', timestamp: '2026-02-06T16:00:00Z' },

  // Training 006 (completed) - U8
  { id: 'att-007', trainingId: 'training-006', playerId: 'player-010', status: 'present', timestamp: '2026-02-04T10:00:00Z' },
];

/**
 * Mock yoklama özetleri
 */
export const mockAttendanceSummaries: AttendanceSummary[] = [
  { playerId: 'player-001', totalSessions: 20, present: 18, late: 1, absent: 1, attendanceRate: 95 },
  { playerId: 'player-002', totalSessions: 20, present: 17, late: 2, absent: 1, attendanceRate: 95 },
  { playerId: 'player-003', totalSessions: 20, present: 19, late: 0, absent: 1, attendanceRate: 95 },
  { playerId: 'player-004', totalSessions: 20, present: 16, late: 1, absent: 3, attendanceRate: 85 },
  { playerId: 'player-005', totalSessions: 20, present: 20, late: 0, absent: 0, attendanceRate: 100 },
  { playerId: 'player-006', totalSessions: 20, present: 14, late: 3, absent: 3, attendanceRate: 85 },
  { playerId: 'player-007', totalSessions: 20, present: 18, late: 1, absent: 1, attendanceRate: 95 },
  { playerId: 'player-008', totalSessions: 20, present: 15, late: 2, absent: 3, attendanceRate: 85 },
  { playerId: 'player-009', totalSessions: 10, present: 9, late: 1, absent: 0, attendanceRate: 100 },
  { playerId: 'player-010', totalSessions: 10, present: 8, late: 1, absent: 1, attendanceRate: 90 },
  { playerId: 'player-011', totalSessions: 20, present: 13, late: 4, absent: 3, attendanceRate: 85 },
  { playerId: 'player-012', totalSessions: 5, present: 3, late: 1, absent: 1, attendanceRate: 80 },
];
