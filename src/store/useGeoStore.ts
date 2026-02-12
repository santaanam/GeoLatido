import { create } from 'zustand';

import { mockAlerts, mockGroups, mockLatidos, mockPois, mockUsers } from '../mock/data';
import { AlertItem, Group, Latido, LayerKey, LayerState, LatidoVisibility, POI, User } from '../models/types';

interface GeoState {
  users: User[];
  groups: Group[];
  latidos: Latido[];
  alerts: AlertItem[];
  pois: POI[];
  layers: LayerState;
  activeFeedUserId?: string;
  toggleLayer: (layer: LayerKey) => void;
  soloLayer: (layer: LayerKey) => void;
  toggleGroup: (groupId: string) => void;
  openFeed: (userId: string) => void;
  closeFeed: () => void;
  markUserLatidoSeen: (userId: string) => void;
  createLatido: (type: 'FOTO' | 'VIDEO', visibility: LatidoVisibility, groupIds?: string[], targetUserIds?: string[]) => void;
  createSosAlert: () => void;
}

const defaultLayers: LayerState = {
  FAMILIA: true,
  ALERTAS: true,
  GRUPOS: true,
  PUBLICO: true,
  COMERCIAL: false,
};

export const useGeoStore = create<GeoState>((set, get) => ({
  users: mockUsers,
  groups: mockGroups,
  latidos: mockLatidos,
  alerts: mockAlerts,
  pois: mockPois,
  layers: defaultLayers,
  toggleLayer: (layer) =>
    set((state) => {
      const next = { ...state.layers, [layer]: !state.layers[layer] };
      if (layer === 'GRUPOS' && !next.GRUPOS) {
        return { layers: next, groups: state.groups.map((g) => ({ ...g, enabled: false })) };
      }
      if (layer === 'GRUPOS' && next.GRUPOS) {
        return { layers: next, groups: state.groups.map((g) => ({ ...g, enabled: true })) };
      }
      return { layers: next };
    }),
  // Long-press shortcut: keeps only one layer ON for quick map context switches.
  soloLayer: (layer) =>
    set((state) => {
      const layers = Object.keys(state.layers).reduce((acc, key) => ({ ...acc, [key]: key === layer }), {} as LayerState);
      return {
        layers,
        groups: state.groups.map((g) => ({ ...g, enabled: layer === 'GRUPOS' })),
      };
    }),
  toggleGroup: (groupId) =>
    set((state) => {
      if (!state.layers.GRUPOS) return state;
      return { groups: state.groups.map((group) => (group.id === groupId ? { ...group, enabled: !group.enabled } : group)) };
    }),
  openFeed: (userId) => set({ activeFeedUserId: userId }),
  closeFeed: () => set({ activeFeedUserId: undefined }),
  markUserLatidoSeen: (userId) =>
    set((state) => ({
      latidos: state.latidos.map((latido) =>
        latido.userId === userId ? { ...latido, seenBy: [...new Set([...latido.seenBy, 'u0'])] } : latido,
      ),
      users: state.users.map((u) => (u.id === userId ? { ...u, hasActiveLatido: false } : u)),
    })),
  createLatido: (type, visibility, groupIds, targetUserIds) =>
    set((state) => {
      const id = `l-${Date.now()}`;
      return {
        latidos: [
          {
            id,
            userId: 'u0',
            type,
            visibility,
            groupIds,
            targetUserIds,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
            seenBy: [],
          },
          ...state.latidos,
        ],
        users: state.users.map((u) => (u.id === 'u0' ? { ...u, hasActiveLatido: true, status: 'Hace 0 min' } : u)),
      };
    }),
  createSosAlert: () => {
    const me = get().users.find((u) => u.id === 'u0');
    if (!me) return;
    set((state) => ({
      alerts: [
        { id: `a-${Date.now()}`, createdBy: 'u0', location: me.location, createdAt: new Date().toISOString(), active: true },
        ...state.alerts,
      ],
      layers: { ...state.layers, ALERTAS: true },
    }));
  },
}));
