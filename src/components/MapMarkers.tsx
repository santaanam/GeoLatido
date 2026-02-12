import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { AlertItem, LayerState, POI, User } from '../models/types';
import { clusterByGrid } from '../utils/mapFilters';
import { AvatarMarker } from './AvatarMarker';

interface Props {
  mapRef: React.RefObject<MapView>;
  users: User[];
  alerts: AlertItem[];
  pois: POI[];
  layers: LayerState;
  region: Region;
  onUserPress: (user: User) => void;
}

export function MapMarkers({ mapRef, users, alerts, pois, layers, region, onUserPress }: Props) {
  const isFarZoom = region.latitudeDelta > 0.08;
  const clusters = useMemo(() => clusterByGrid(users), [users]);

  return (
    <>
      {isFarZoom
        ? clusters.map((cluster) => (
            <Marker key={cluster.id} coordinate={{ latitude: cluster.latitude, longitude: cluster.longitude }}>
              <View style={styles.cluster}>
                <Text style={styles.clusterText}>{cluster.count}</Text>
              </View>
            </Marker>
          ))
        : users.map((user) => (
            <Marker key={user.id} coordinate={user.location} onPress={() => onUserPress(user)}>
              <AvatarMarker user={user} onPress={() => onUserPress(user)} />
            </Marker>
          ))}

      {layers.ALERTAS &&
        alerts.map((alert) => (
          <Marker key={alert.id} coordinate={alert.location} pinColor="#eab308" title="SOS activa" description={alert.createdAt} />
        ))}

      {layers.COMERCIAL &&
        pois.map((poi) => <Marker key={poi.id} coordinate={poi.location} pinColor="#6366f1" title={poi.name} />)}

      <Marker coordinate={users.find((u) => u.isCurrentUser)?.location ?? region} pinColor="#ef4444" title="Tu ubicación" />
    </>
  );
}

const styles = StyleSheet.create({
  cluster: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(14,116,144,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
  },
  clusterText: { color: 'white', fontWeight: '700' },
});
