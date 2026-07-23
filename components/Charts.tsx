import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';
import { weeklyTrend } from '@/lib/data';

export function BarChart() {
  const max = Math.max(...weeklyTrend.map((d) => d.reports));
  const anim = useRef(weeklyTrend.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = anim.map((a, i) =>
      Animated.timing(a, { toValue: 1, duration: 700, delay: i * 80, useNativeDriver: false })
    );
    Animated.parallel(animations).start();
  }, [anim]);

  return (
    <View style={styles.wrap}>
      {weeklyTrend.map((d, i) => {
        const h = (d.reports / max) * 120;
        const h2 = (d.resolved / max) * 120;
        return (
          <View key={i} style={styles.col}>
            <View style={styles.bars}>
              <Animated.View style={[styles.bar, { backgroundColor: Colors.primary[500], height: anim[i].interpolate({ inputRange: [0, 1], outputRange: [0, h] }) }]} />
              <Animated.View style={[styles.bar, { backgroundColor: Colors.accent[500], height: anim[i].interpolate({ inputRange: [0, 1], outputRange: [0, h2] }) }]} />
            </View>
            <T.caption style={styles.label}>{d.day}</T.caption>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, paddingVertical: 8 },
  col: { alignItems: 'center', flex: 1 },
  bars: { flexDirection: 'row', gap: 4, alignItems: 'flex-end', height: 130 },
  bar: { width: 8, borderRadius: 4 },
  label: { marginTop: 6, color: Colors.neutral[500] },
});

export function DonutChart() {
  const total = 32 + 24 + 18 + 14 + 12;
  const data = [
    { label: 'Potholes', value: 32, color: '#1565D8' },
    { label: 'Garbage', value: 24, color: '#0FB890' },
    { label: 'Street Light', value: 18, color: '#F0A030' },
    { label: 'Water', value: 14, color: '#5AA3FF' },
    { label: 'Other', value: 12, color: '#94A3B8' },
  ];
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(spin, { toValue: 1, duration: 900, useNativeDriver: true }).start();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles2.wrap}>
      <Animated.View style={[styles2.donut, { transform: [{ rotate }] }]}>
        {data.map((d, i) => {
          const pct = (d.value / total) * 360;
          const startAngle = data.slice(0, i).reduce((s, x) => s + (x.value / total) * 360, 0);
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: 70,
                borderWidth: 16,
                borderColor: d.color,
                transform: [{ rotate: `${startAngle}deg` }],
                opacity: 0.9,
              }}
            />
          );
        })}
        <View style={styles2.hole}>
          <T.h3>{total}</T.h3>
          <T.caption style={{ color: Colors.neutral[500] }}>Total</T.caption>
        </View>
      </Animated.View>
      <View style={styles2.legend}>
        {data.map((d, i) => (
          <View key={i} style={styles2.legItem}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: d.color }} />
            <T.bodyS style={{ color: Colors.neutral[600] }}>{d.label}</T.bodyS>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles2 = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  donut: { width: 140, height: 140, justifyContent: 'center', alignItems: 'center' },
  hole: { width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.neutral[0], justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  legend: { flex: 1, gap: 8 },
  legItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
