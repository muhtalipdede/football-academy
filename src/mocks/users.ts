import { User } from '../types';

/**
 * Mock kullanıcı verileri
 * Her rol için örnek kullanıcılar
 */
export const mockUsers: User[] = [
  {
    id: 'user-admin-001',
    name: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@akademi.com',
    phone: '0532 111 2233',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-coach-001',
    name: 'Ahmet Kaya',
    email: 'ahmet.kaya@akademi.com',
    phone: '0533 222 3344',
    role: 'coach',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'user-coach-002',
    name: 'Serkan Öztürk',
    email: 'serkan.ozturk@akademi.com',
    phone: '0534 333 4455',
    role: 'coach',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'user-parent-001',
    name: 'Ali Demir',
    email: 'ali.demir@email.com',
    phone: '0535 444 5566',
    role: 'parent',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'user-parent-002',
    name: 'Fatma Çelik',
    email: 'fatma.celik@email.com',
    phone: '0536 555 6677',
    role: 'parent',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    createdAt: '2024-03-05T10:00:00Z',
  },
  {
    id: 'user-player-001',
    name: 'Emre Demir',
    email: 'emre.demir@email.com',
    phone: '0537 666 7788',
    role: 'player',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    createdAt: '2024-03-10T10:00:00Z',
  },
];
