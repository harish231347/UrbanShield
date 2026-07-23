import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';
import { weeklyTrend } from '@/lib/data';

export function BarChart() {
  const max = Math.max(...weeklyTrend.map((d) => d.reports));
  return (
    <View style={styles.wrap}>
      {weeklyTrend.map((d, i) => {
        const h = (d.reports / max) * 120;
        const h2 = (d.resolved / max) * 120;
        return (
          <View key={i} style={styles.col}>
            <View style={styles.bars}>
              <View style={[styles.bar, { height: h, backgroundColor: Colors.primary[500] }]} />
              <View style={[styles.bar, { height: h2, backgroundColor: Colors.accent[500] }]} />
            </View>
            <Typography.caption style={styles.label}>{d.day}</Typography.caption>
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
  let acc = 0;
  return (
    <View style={styles2.wrap}>
      <View style={styles2.donut}>
        {data.map((d, i) => {
          const pct = (d.value / total) * 360;
          const seg = (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: 70,
                borderWidth: 16,
                borderColor: d.color,
                borderStyle: 'solid',
                transform: [{ rotate: `${acc}deg` }],
                opacity: 0.9,
              }}
            />
          );
          acc += pct;
          return seg;
        })}
        <View style={styles2.hole}>
          <Typography.h3>{total}</Typography.h3>
          <Typography.caption style={{ color: Colors.neutral[500] }}>Total</Typography.caption>
        </View>
      </View>
      <View style={styles2.legend}>
        {data.map((d, i) => (
          <View key={i} style={styles2.legItem}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: d.color }} />
            <Typography.bodyS style={{ color: Colors.neutral[600] }}>{d.label}</Typography.bodyS>
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
