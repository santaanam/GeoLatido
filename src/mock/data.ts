import { AlertItem, Group, Latido, POI, User } from '../models/types';

const baseLat = 19.4326;
const baseLng = -99.1332;

export const mockUsers: User[] = [
  { id: 'u0', name: 'Tú', initials: 'YO', location: { latitude: baseLat, longitude: baseLng }, status: 'En casa', isFamilyMember: true, groups: ['g1', 'g2'], hasActiveLatido: false, isCurrentUser: true },
  { id: 'u1', name: 'Ana López', initials: 'AL', location: { latitude: baseLat + 0.01, longitude: baseLng + 0.01 }, status: 'Hace 5 min', isFamilyMember: true, groups: ['g1'], hasActiveLatido: true },
  { id: 'u2', name: 'Bruno Díaz', initials: 'BD', location: { latitude: baseLat - 0.01, longitude: baseLng - 0.012 }, status: 'Hace 15 min', isFamilyMember: false, groups: ['g2'], hasActiveLatido: false },
  { id: 'u3', name: 'Caro Pérez', initials: 'CP', location: { latitude: baseLat + 0.02, longitude: baseLng - 0.01 }, status: 'En casa', isFamilyMember: false, groups: ['g3'], hasActiveLatido: true },
  { id: 'u4', name: 'Diego Ruiz', initials: 'DR', location: { latitude: baseLat - 0.02, longitude: baseLng + 0.012 }, status: 'Hace 2 min', isFamilyMember: true, groups: ['g1'], hasActiveLatido: false },
  { id: 'u5', name: 'Elena Mora', initials: 'EM', location: { latitude: baseLat + 0.028, longitude: baseLng + 0.018 }, status: 'Hace 30 min', isFamilyMember: false, groups: ['g2'], hasActiveLatido: true },
  { id: 'u6', name: 'Fede Neri', initials: 'FN', location: { latitude: baseLat + 0.04, longitude: baseLng - 0.02 }, status: 'En casa', isFamilyMember: false, groups: ['g3'], hasActiveLatido: false },
  { id: 'u7', name: 'Gaby Sol', initials: 'GS', location: { latitude: baseLat - 0.03, longitude: baseLng + 0.02 }, status: 'Hace 8 min', isFamilyMember: true, groups: ['g1', 'g3'], hasActiveLatido: true },
  { id: 'u8', name: 'Hugo León', initials: 'HL', location: { latitude: baseLat + 0.015, longitude: baseLng + 0.03 }, status: 'En casa', isFamilyMember: false, groups: ['g2'], hasActiveLatido: false },
  { id: 'u9', name: 'Inés Mtz', initials: 'IM', location: { latitude: baseLat - 0.012, longitude: baseLng + 0.028 }, status: 'Hace 1 min', isFamilyMember: false, groups: ['g3'], hasActiveLatido: true },
];

export const mockGroups: Group[] = [
  { id: 'g1', name: 'Círculo Familiar', memberIds: ['u0', 'u1', 'u4', 'u7'], enabled: true },
  { id: 'g2', name: 'Círculo de Amigos', memberIds: ['u0', 'u2', 'u5', 'u8'], enabled: true },
  { id: 'g3', name: 'Equipo Trabajo', memberIds: ['u3', 'u6', 'u7', 'u9'], enabled: true },
];

export const mockLatidos: Latido[] = [
  { id: 'l1', userId: 'u1', type: 'FOTO', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000).toISOString(), visibility: 'FAMILIA', seenBy: [] },
  { id: 'l2', userId: 'u3', type: 'VIDEO', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 172800000).toISOString(), visibility: 'PUBLICO', seenBy: [] },
  { id: 'l3', userId: 'u7', type: 'FOTO', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 604800000).toISOString(), visibility: 'GRUPOS', groupIds: ['g1'], seenBy: [] },
];

export const mockAlerts: AlertItem[] = [];

export const mockPois: POI[] = [
  { id: 'p1', name: 'Café Centro', location: { latitude: baseLat + 0.013, longitude: baseLng + 0.004 } },
  { id: 'p2', name: 'Farmacia Norte', location: { latitude: baseLat - 0.017, longitude: baseLng - 0.006 } },
  { id: 'p3', name: 'Tienda 24h', location: { latitude: baseLat + 0.025, longitude: baseLng - 0.018 } },
];
