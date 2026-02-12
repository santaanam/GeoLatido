import React, { useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';

import { CameraMockModal } from '../components/CameraMockModal';
import { GroupsBottomSheet } from '../components/GroupsBottomSheet';
import { LayerToggleRow } from '../components/LayerToggleRow';
import { MapMarkers } from '../components/MapMarkers';
import { UserFeedModal } from '../components/UserFeedModal';
import { useGeoStore } from '../store/useGeoStore';
import { getVisibleUsers } from '../utils/mapFilters';

const initialRegion: Region = {
  latitude: 19.4326,
  longitude: -99.1332,
  latitudeDelta: 0.09,
  longitudeDelta: 0.09,
};

export function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState(initialRegion);
  const [cameraOpen, setCameraOpen] = useState(false);

  const {
    users,
    groups,
    latidos,
    alerts,
    pois,
    layers,
    activeFeedUserId,
    toggleLayer,
    soloLayer,
    toggleGroup,
    openFeed,
    closeFeed,
    markUserLatidoSeen,
    createLatido,
  } = useGeoStore();

  const visibleUsers = useMemo(() => getVisibleUsers(users, groups, layers), [users, groups, layers]);
  const feedUser = users.find((user) => user.id === activeFeedUserId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>GeoLatido</Text>
        <Pressable onPress={() => Alert.alert('Capas', 'Acción placeholder del corazón')}><Text style={styles.heart}>💙</Text></Pressable>
      </View>

      <LayerToggleRow layers={layers} onToggle={toggleLayer} onSolo={soloLayer} />

      <MapView ref={mapRef} provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion} onRegionChangeComplete={setRegion}>
        <MapMarkers
          mapRef={mapRef}
          users={visibleUsers}
          alerts={alerts}
          pois={pois}
          layers={layers}
          region={region}
          onUserPress={(user) => {
            if (user.hasActiveLatido) {
              openFeed(user.id);
              markUserLatidoSeen(user.id);
            }
          }}
        />
      </MapView>

      <Pressable style={styles.fab} onPress={() => setCameraOpen(true)}>
        <Text style={styles.fabText}>📷</Text>
      </Pressable>

      <GroupsBottomSheet groups={groups} users={users} groupsMasterEnabled={layers.GRUPOS} onToggleGroup={toggleGroup} />

      <CameraMockModal
        visible={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={(type, visibility) => {
          createLatido(type, visibility);
          setCameraOpen(false);
        }}
      />

      <UserFeedModal visible={Boolean(feedUser)} user={feedUser} latidos={latidos} onClose={closeFeed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 52 },
  brand: { fontWeight: '800', fontSize: 22 },
  heart: { fontSize: 26 },
  map: { flex: 1 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 170,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { fontSize: 22, color: '#fff' },
});
