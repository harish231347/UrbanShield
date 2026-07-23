import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Radius } from '@/lib/theme';

export function Skeleton({ width, height, style }: { width?: number | string; height?: number; style?: any }) {
  const opacity = React.useRef(new Animated.Value(0.35)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.35, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[{ width, height, backgroundColor: Colors.neutral[200], borderRadius: Radius.md, opacity }, style]}
    />
  );
}

export function SkeletonCard() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Skeleton width={44} height={44} style={{ borderRadius: 22 }} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="70%" height={14} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton width="90%" height={12} style={{ marginTop: 12 }} />
      <View style={styles.rowBetween}>
        <Skeleton width={70} height={24} style={{ borderRadius: 12 }} />
        <Skeleton width={50} height={24} style={{ borderRadius: 12 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.neutral[0],
    borderRadius: Radius.lg,
    padding: 16,
    gap: 8,
  },
  row: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
});
