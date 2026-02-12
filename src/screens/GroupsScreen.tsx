import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function GroupsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrar grupos</Text>
      <Text style={styles.text}>Próximamente: edición completa de círculos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '800' },
  text: { color: '#6b7280', marginTop: 8 },
});
