import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useGeoStore } from '../store/useGeoStore';

export function SOSScreen() {
  const createSosAlert = useGeoStore((s) => s.createSosAlert);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          createSosAlert();
          Alert.alert('SOS enviada', 'Se creó una alerta local (mock).');
        }}
      >
        <Text style={styles.label}>SOS</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { width: 220, height: 220, borderRadius: 110, backgroundColor: '#dc2626', alignItems: 'center', justifyContent: 'center' },
  label: { color: 'white', fontWeight: '900', fontSize: 48 },
});
