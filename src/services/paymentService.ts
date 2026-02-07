import { Payment } from '../types';
import { mockPayments } from '../mocks';

/**
 * Ödeme Servisi
 */
export const paymentService = {
  getAll: async (): Promise<Payment[]> => {
    await new Promise((r) => setTimeout(r, 500));
    return mockPayments;
  },

  getByParent: async (parentId: string): Promise<Payment[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPayments.filter((p) => p.parentId === parentId);
  },

  getByPlayer: async (playerId: string): Promise<Payment[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPayments.filter((p) => p.playerId === playerId);
  },

  getOverdue: async (): Promise<Payment[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPayments.filter((p) => p.status === 'overdue');
  },

  getPending: async (): Promise<Payment[]> => {
    await new Promise((r) => setTimeout(r, 400));
    return mockPayments.filter((p) => p.status === 'pending');
  },

  getById: async (id: string): Promise<Payment | undefined> => {
    await new Promise((r) => setTimeout(r, 300));
    return mockPayments.find((p) => p.id === id);
  },

  markAsPaid: async (id: string): Promise<Payment> => {
    await new Promise((r) => setTimeout(r, 500));
    const payment = mockPayments.find((p) => p.id === id);
    if (!payment) throw new Error('Ödeme bulunamadı');
    return { ...payment, status: 'paid', paidDate: new Date().toISOString() };
  },
};
