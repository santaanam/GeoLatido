import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { LayerKey, LayerState } from '../models/types';

const LAYERS: LayerKey[] = ['FAMILIA', 'ALERTAS', 'GRUPOS', 'PUBLICO', 'COMERCIAL'];

interface Props {
  layers: LayerState;
  onToggle: (layer: LayerKey) => void;
  onSolo: (layer: LayerKey) => void;
}

export function LayerToggleRow({ layers, onToggle, onSolo }: Props) {
  return (
    <View style={styles.row}>
      {LAYERS.map((layer) => (
        <Pressable key={layer} onPress={() => onToggle(layer)} onLongPress={() => onSolo(layer)} style={styles.item}>
          <Text style={[styles.text, !layers[layer] && styles.textOff]}>{layer}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, paddingHorizontal: 14, paddingVertical: 10 },
  item: { paddingHorizontal: 4 },
  text: { fontWeight: '700', color: '#111827', letterSpacing: 0.5 },
  textOff: { opacity: 0.35 },
});
