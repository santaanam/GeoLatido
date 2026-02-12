import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { LatidoVisibility } from '../models/types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onCapture: (type: 'FOTO' | 'VIDEO', visibility: LatidoVisibility) => void;
}

const visibilityOptions: LatidoVisibility[] = ['PUBLICO', 'FAMILIA', 'GRUPOS', 'PERSONAS'];

export function CameraMockModal({ visible, onClose, onCapture }: Props) {
  const [mode, setMode] = useState<'FOTO' | 'VIDEO'>('FOTO');
  const [visibility, setVisibility] = useState<LatidoVisibility>('PUBLICO');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Cámara (Mock)</Text>
          <View style={styles.row}>
            <Pressable onPress={() => setMode('FOTO')} style={[styles.pill, mode === 'FOTO' && styles.pillActive]}><Text>Foto</Text></Pressable>
            <Pressable onPress={() => setMode('VIDEO')} style={[styles.pill, mode === 'VIDEO' && styles.pillActive]}><Text>Video</Text></Pressable>
            <Pressable style={styles.flash}><Text>⚡</Text></Pressable>
          </View>
          <View style={styles.rowWrap}>
            {visibilityOptions.map((item) => (
              <Pressable key={item} onPress={() => setVisibility(item)} style={[styles.visibilityPill, visibility === item && styles.pillActive]}>
                <Text>{item}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.shutter} onPress={() => onCapture(mode, visibility)}>
            <Text style={styles.shutterText}>Capturar</Text>
          </Pressable>
          <Pressable onPress={onClose}><Text style={styles.close}>Cerrar</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  container: { backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, gap: 12 },
  title: { fontWeight: '700', fontSize: 18 },
  row: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  visibilityPill: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pillActive: { backgroundColor: '#dbeafe' },
  flash: { marginLeft: 'auto' },
  shutter: { marginTop: 8, backgroundColor: '#111827', borderRadius: 999, alignItems: 'center', paddingVertical: 12 },
  shutterText: { color: 'white', fontWeight: '700' },
  close: { textAlign: 'center', color: '#4b5563', marginBottom: 10 },
});
