import { AgeGroup } from '../types';

/**
 * Mock yaş grubu verileri
 */
export const mockAgeGroups: AgeGroup[] = [
  {
    id: 'ag-u8',
    name: 'U8',
    description: '2018 ve sonrası doğumlu sporcular',
    coachIds: ['coach-003'],
    playerIds: ['player-010'],
    color: '#3B82F6',
  },
  {
    id: 'ag-u9',
    name: 'U9',
    description: '2017 doğumlu sporcular',
    coachIds: ['coach-003'],
    playerIds: ['player-009'],
    color: '#8B5CF6',
  },
  {
    id: 'ag-u10',
    name: 'U10',
    description: '2016 doğumlu sporcular',
    coachIds: ['coach-002'],
    playerIds: ['player-001', 'player-002', 'player-011'],
    color: '#10B981',
  },
  {
    id: 'ag-u11',
    name: 'U11',
    description: '2015 doğumlu sporcular',
    coachIds: ['coach-002'],
    playerIds: ['player-003', 'player-004', 'player-011', 'player-012'],
    color: '#F59E0B',
  },
  {
    id: 'ag-u12',
    name: 'U12',
    description: '2014 doğumlu sporcular',
    coachIds: ['coach-001'],
    playerIds: ['player-005', 'player-006'],
    color: '#EF4444',
  },
  {
    id: 'ag-u13',
    name: 'U13',
    description: '2013 doğumlu sporcular',
    coachIds: ['coach-001'],
    playerIds: ['player-007', 'player-008'],
    color: '#EC4899',
  },
];
