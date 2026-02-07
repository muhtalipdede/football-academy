import { Coach } from '../types';

/**
 * Mock antrenör verileri
 */
export const mockCoaches: Coach[] = [
  {
    id: 'coach-001',
    name: 'Ahmet Kaya',
    email: 'ahmet.kaya@akademi.com',
    phone: '0533 222 3344',
    specialization: 'Teknik Antrenör',
    ageGroupIds: ['ag-u12', 'ag-u13'],
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    licenseType: 'UEFA B',
    experience: 8,
  },
  {
    id: 'coach-002',
    name: 'Serkan Öztürk',
    email: 'serkan.ozturk@akademi.com',
    phone: '0534 333 4455',
    specialization: 'Kaleci Antrenörü',
    ageGroupIds: ['ag-u10', 'ag-u11'],
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    licenseType: 'UEFA A',
    experience: 12,
  },
  {
    id: 'coach-003',
    name: 'Burak Acar',
    email: 'burak.acar@akademi.com',
    phone: '0535 444 5566',
    specialization: 'Kondisyoner',
    ageGroupIds: ['ag-u8', 'ag-u9'],
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    licenseType: 'UEFA C',
    experience: 5,
  },
];
