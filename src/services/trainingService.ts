import { Training, AttendanceRecord, AttendanceSummary } from '../types';
import { mockTrainings, mockAttendanceRecords, mockAttendanceSummaries } from '../mocks';

/**
 * Antrenman Servisi
 */
export const trainingService = {
  getAll: async (): Promise<Training[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockTrainings;
  },

  getById: async (id: string): Promise<Training | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockTrainings.find((t) => t.id === id);
  },

  getByAgeGroup: async (ageGroupId: string): Promise<Training[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockTrainings.filter((t) => t.ageGroupId === ageGroupId);
  },

  getUpcoming: async (): Promise<Training[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockTrainings.filter((t) => t.status === 'planned');
  },

  getToday: async (): Promise<Training[]> => {
    await new Promise((r) => setTimeout(r, 300));
    const today = new Date().toISOString().split('T')[0];
    return mockTrainings.filter((t) => t.date.startsWith(today));
  },
};

/**
 * Yoklama Servisi
 */
export const attendanceService = {
  getByTraining: async (trainingId: string): Promise<AttendanceRecord[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockAttendanceRecords.filter((a) => a.trainingId === trainingId);
  },

  getByPlayer: async (playerId: string): Promise<AttendanceRecord[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockAttendanceRecords.filter((a) => a.playerId === playerId);
  },

  getSummary: async (playerId: string): Promise<AttendanceSummary | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockAttendanceSummaries.find((s) => s.playerId === playerId);
  },

  getAllSummaries: async (): Promise<AttendanceSummary[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockAttendanceSummaries;
  },

  markAttendance: async (
    trainingId: string,
    playerId: string,
    status: 'present' | 'late' | 'absent',
    note?: string
  ): Promise<AttendanceRecord> => {
    await new Promise((r) => setTimeout(r, 300));
    return {
      id: `att-${Date.now()}`,
      trainingId,
      playerId,
      status,
      note,
      timestamp: new Date().toISOString(),
    };
  },
};
