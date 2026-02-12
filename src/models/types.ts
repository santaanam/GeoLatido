export type LayerKey = 'FAMILIA' | 'ALERTAS' | 'GRUPOS' | 'PUBLICO' | 'COMERCIAL';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  location: GeoPoint;
  status: string;
  isFamilyMember: boolean;
  groups: string[];
  hasActiveLatido: boolean;
  isCurrentUser?: boolean;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  enabled: boolean;
}

export type LatidoVisibility = 'PUBLICO' | 'FAMILIA' | 'GRUPOS' | 'PERSONAS';

export interface Latido {
  id: string;
  userId: string;
  type: 'FOTO' | 'VIDEO';
  createdAt: string;
  expiresAt: string;
  visibility: LatidoVisibility;
  groupIds?: string[];
  targetUserIds?: string[];
  seenBy: string[];
}

export interface AlertItem {
  id: string;
  createdBy: string;
  location: GeoPoint;
  createdAt: string;
  active: boolean;
}

export interface POI {
  id: string;
  name: string;
  location: GeoPoint;
}

export type LayerState = Record<LayerKey, boolean>;
