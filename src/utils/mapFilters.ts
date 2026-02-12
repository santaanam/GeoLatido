import { Group, LayerState, User } from '../models/types';

export const LAYER_PRIORITY = ['FAMILIA', 'ALERTAS', 'GRUPOS', 'PUBLICO', 'COMERCIAL'] as const;

// Priority rule: family wins over alerts/groups/public/commercial when a user is eligible from multiple layers.
export function getVisibleUsers(users: User[], groups: Group[], layers: LayerState): User[] {
  const activeGroupMemberIds = new Set(groups.filter((g) => g.enabled).flatMap((g) => g.memberIds));

  return users.filter((user) => {
    const fromFamily = layers.FAMILIA && user.isFamilyMember;
    const fromGroups = layers.GRUPOS && activeGroupMemberIds.has(user.id);
    const fromPublic = layers.PUBLICO && !user.isCurrentUser;
    return fromFamily || fromGroups || fromPublic || user.isCurrentUser;
  });
}

export interface ClusterBubble {
  id: string;
  latitude: number;
  longitude: number;
  count: number;
}

export function clusterByGrid(users: User[], step = 0.03): ClusterBubble[] {
  const buckets = new Map<string, { latitude: number; longitude: number; count: number }>();
  users.forEach((user) => {
    const latKey = Math.floor(user.location.latitude / step);
    const lngKey = Math.floor(user.location.longitude / step);
    const key = `${latKey}-${lngKey}`;
    const current = buckets.get(key);
    if (current) {
      current.latitude = (current.latitude * current.count + user.location.latitude) / (current.count + 1);
      current.longitude = (current.longitude * current.count + user.location.longitude) / (current.count + 1);
      current.count += 1;
    } else {
      buckets.set(key, { latitude: user.location.latitude, longitude: user.location.longitude, count: 1 });
    }
  });

  return Array.from(buckets.entries()).map(([id, value]) => ({ id, ...value }));
}
