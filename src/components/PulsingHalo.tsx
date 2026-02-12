import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function PulsingHalo() {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);

  useEffect(() => {
    scale.value = withRepeat(withTiming(2, { duration: 1400 }), -1, false);
    opacity.value = withRepeat(withTiming(0, { duration: 1400 }), -1, false);
  }, [opacity, scale]);

  const animated = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.halo, animated]} />;
}

const styles = StyleSheet.create({
  halo: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'rgba(244,63,94,0.35)',
  },
});
