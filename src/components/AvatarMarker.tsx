import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { User } from '../models/types';
import { PulsingHalo } from './PulsingHalo';

interface Props {
  user: User;
  onPress: () => void;
}

export function AvatarMarker({ user, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {user.hasActiveLatido && <PulsingHalo />}
      <View style={styles.avatar}>
        <Text style={styles.initials}>{user.initials}</Text>
      </View>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{user.status}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: { color: 'white', fontWeight: '700', fontSize: 12 },
  tag: { marginTop: 2, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: 'white', borderRadius: 8 },
  tagText: { fontSize: 10, color: '#111' },
});
