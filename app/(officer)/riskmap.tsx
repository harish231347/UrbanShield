import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { wards } from '@/lib/data';
import { Card } from '@/components/Card';
import { RiskBadge } from '@/components/Badges';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const riskColors: Record<string, [string, string]> = {
  Low: [Colors.success[400], Colors.success[600]],
  Medium: [Colors.warning[400], Colors.warning[600]],
  High: ['#F78B4A', Colors.danger[500]],
  Critical: [Colors.danger[400], Colors.danger[600]],
};

export default function RiskMap() {
  const fade = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1600, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [fade, pulse]);

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.4, 0, 0] });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <T.h2 style={{ color: Colors.neutral[0] }}>City Risk Map</T.h2>
        <T.bodyS style={{ color: Colors.primary[200] }}>Mock GIS · 6 wards tracked</T.bodyS>
      </LinearGradient>

      <View style={styles.mapWrap}>
        <LinearGradient colors={[Colors.neutral[100], Colors.primary[50]]} style={styles.map}>
          <View style={[styles.road, { width: '100%', height: 5, top: '25%' }]} />
          <View style={[styles.road, { width: '100%', height: 5, top: '55%' }]} />
          <View style={[styles.road, { width: '100%', height: 5, top: '80%' }]} />
          <View style={[styles.road, { width: 5, height: '100%', left: '30%' }]} />
          <View style={[styles.road, { width: 5, height: '100%', left: '60%' }]} />

          <Animated.View style={{ opacity: fade }}>
            {wards.map((w, i) => {
              const delay = i * 120;
              const markerScale = useRef(new Animated.Value(0)).current;
              useEffect(() => {
                Animated.spring(markerScale, { toValue: 1, delay, friction: 5, tension: 60, useNativeDriver: true }).start();
              }, [markerScale, delay]);
              return (
                <Animated.View key={w.id} style={[styles.wardMarker, { left: `${w.x * 100}%`, top: `${w.y * 100}%`, transform: [{ scale: markerScale }] }]}>
                  <View style={styles.pulseWrap}>
                    <Animated.View style={[styles.pulseRing, { transform: [{ scale: pulseScale }], opacity: pulseOpacity, backgroundColor: riskColors[w.risk][0] }]} />
                    <LinearGradient colors={riskColors[w.risk]} style={styles.wardDot}>
                      <T.label style={{ color: Colors.neutral[0], fontSize: 11 }}>{w.open}</T.label>
                    </LinearGradient>
                  </View>
                  <View style={styles.wardLabel}>
                    <T.caption style={{ color: Colors.neutral[700] }}>{w.name.split(' - ')[1] ?? w.name}</T.caption>
                  </View>
                </Animated.View>
              );
            })}
          </Animated.View>
        </LinearGradient>
      </View>

      <View style={styles.legend}>
        <LegendItem color={Colors.danger[500]} label="Critical" />
        <LegendItem color="#F78B4A" label="High" />
        <LegendItem color={Colors.warning[500]} label="Medium" />
        <LegendItem color={Colors.success[500]} label="Low" />
      </View>

      <View style={styles.wardList}>
        <T.title style={{ marginBottom: Spacing.base }}>Ward Breakdown</T.title>
        {wards.map((w, i) => (
          <Card key={w.id} delay={i * 60} style={styles.wardCard}>
            <View style={styles.wardTop}>
              <View style={styles.wardInfo}>
                <LinearGradient colors={riskColors[w.risk]} style={styles.wardIcon} />
                <View>
                  <T.title>{w.name}</T.title>
                  <T.bodyS style={{ color: Colors.neutral[500] }}>{w.open} open · {w.resolved} resolved</T.bodyS>
                </View>
              </View>
              <RiskBadge level={w.risk} />
            </View>
            <View style={styles.barWrap}>
              <View style={[styles.barOpen, { width: `${(w.open / (w.open + w.resolved)) * 100}%` }]} />
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <T.caption style={{ color: Colors.neutral[600] }}>{label}</T.caption>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  mapWrap: { padding: Spacing.xl },
  map: { height: 340, borderRadius: Radius.xl, position: 'relative', overflow: 'hidden' },
  road: { position: 'absolute', backgroundColor: 'rgba(21,101,216,0.1)' },
  wardMarker: { position: 'absolute', marginLeft: -24, marginTop: -24, alignItems: 'center' },
  pulseWrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  pulseRing: { position: 'absolute', width: 40, height: 40, borderRadius: 20 },
  wardDot: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.neutral[0] },
  wardLabel: { marginTop: 4, backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: Radius.sm, paddingHorizontal: 6, paddingVertical: 2 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.base, paddingVertical: Spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  wardList: { padding: Spacing.xl, gap: Spacing.base },
  wardCard: { gap: Spacing.sm },
  wardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wardInfo: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, flex: 1 },
  wardIcon: { width: 40, height: 40, borderRadius: Radius.md },
  barWrap: { height: 6, borderRadius: 3, backgroundColor: Colors.neutral[100], overflow: 'hidden' },
  barOpen: { height: 6, borderRadius: 3, backgroundColor: Colors.danger[500] },
});
