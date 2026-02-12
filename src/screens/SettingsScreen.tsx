import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <Text style={styles.text}>Preferencias de privacidad y notificaciones (mock).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  text: { color: '#6b7280', marginTop: 8 },
});
