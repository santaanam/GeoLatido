import React, { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Latido, User } from '../models/types';

interface Props {
  visible: boolean;
  user?: User;
  latidos: Latido[];
  onClose: () => void;
}

export function UserFeedModal({ visible, user, latidos, onClose }: Props) {
  const userLatidos = useMemo(() => latidos.filter((item) => item.userId === user?.id), [latidos, user?.id]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <Text style={styles.title}>Feed de {user?.name ?? 'usuario'}</Text>
          {userLatidos.length === 0 ? (
            <Text>Sin latidos activos.</Text>
          ) : (
            userLatidos.map((latido) => (
              <View key={latido.id} style={styles.item}>
                <Text>{latido.type} · {latido.visibility}</Text>
                <Text style={styles.meta}>{new Date(latido.createdAt).toLocaleString()}</Text>
              </View>
            ))
          )}
          <Pressable onPress={onClose} style={styles.closeButton}><Text style={styles.closeText}>Cerrar</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(17,24,39,0.45)', justifyContent: 'center', padding: 16 },
  box: { backgroundColor: 'white', borderRadius: 16, padding: 16, gap: 10 },
  title: { fontWeight: '700', fontSize: 18 },
  item: { padding: 10, borderRadius: 12, backgroundColor: '#f3f4f6' },
  meta: { color: '#6b7280', fontSize: 12 },
  closeButton: { alignSelf: 'flex-end' },
  closeText: { color: '#2563eb', fontWeight: '700' },
});
