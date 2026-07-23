import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Navigation } from 'lucide-react-native';
import { nearbyIssues } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const riskColors: Record<string, [string, string]> = {
  Low: [Colors.success[400], Colors.success[600]],
  Medium: [Colors.warning[400], Colors.warning[600]],
  High: ['#F78B4A', Colors.danger[500]],
  Critical: [Colors.danger[400], Colors.danger[600]],
};

export default function Nearby() {
  const fade = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [fade, pulse]);

  const youPulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.5] });
  const youPulseOpacity = pulse.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0, 0] });

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <T.h2 style={{ color: Colors.neutral[0] }}>Nearby Issues</T.h2>
        <T.bodyS style={{ color: Colors.primary[200] }}>Live mock city map · Ward 7 area</T.bodyS>
      </LinearGradient>

      <View style={styles.mapWrap}>
        <LinearGradient colors={[Colors.neutral[100], Colors.primary[50]]} style={styles.map}>
          <View style={[styles.road, { width: '100%', height: 4, top: '30%' }]} />
          <View style={[styles.road, { width: '100%', height: 4, top: '65%' }]} />
          <View style={[styles.road, { width: 4, height: '100%', left: '35%' }]} />
          <View style={[styles.road, { width: 4, height: '100%', left: '70%' }]} />

          <View style={[styles.you, { left: '48%', top: '48%' }]}>
            <Animated.View style={[styles.youPulse, { transform: [{ scale: youPulseScale }], opacity: youPulseOpacity }]} />
            <View style={styles.youDot} />
          </View>

          <Animated.View style={{ opacity: fade }}>
            {nearbyIssues.map((n, i) => {
              const delay = i * 100;
              const markerScale = useRef(new Animated.Value(0)).current;
              useEffect(() => {
                Animated.spring(markerScale, { toValue: 1, delay, friction: 5, tension: 60, useNativeDriver: true }).start();
              }, [markerScale, delay]);
              return (
                <Animated.View key={n.id} style={[styles.marker, { left: `${n.x * 100}%`, top: `${n.y * 100}%`, transform: [{ scale: markerScale }] }]}>
                  <LinearGradient colors={riskColors[n.risk]} style={styles.markerDot}>
                    <T.label style={{ color: Colors.neutral[0], fontSize: 10 }}>{n.reports}</T.label>
                  </LinearGradient>
                </Animated.View>
              );
            })}
          </Animated.View>
        </LinearGradient>
      </View>

      <View style={styles.list}>
        <T.title style={{ marginBottom: Spacing.base }}>Issues near you</T.title>
        {nearbyIssues.map((n, i) => (
          <View key={n.id} style={styles.item}>
            <LinearGradient colors={riskColors[n.risk]} style={styles.itemIcon}>
              <MapPin color={Colors.neutral[0]} size={16} />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <T.title>{n.title}</T.title>
              <T.bodyS style={{ color: Colors.neutral[500] }}>{n.ward} · {n.category}</T.bodyS>
            </View>
            <View style={styles.dist}>
              <Navigation color={Colors.primary[500]} size={12} />
              <T.label style={{ color: Colors.primary[600] }}>{n.distance}</T.label>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  mapWrap: { padding: Spacing.xl },
  map: { height: 320, borderRadius: Radius.xl, position: 'relative', overflow: 'hidden' },
  road: { position: 'absolute', backgroundColor: 'rgba(21,101,216,0.12)' },
  you: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  youPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(21,101,216,0.3)' },
  youDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.primary[600], borderWidth: 3, borderColor: Colors.neutral[0] },
  marker: { position: 'absolute', marginLeft: -16, marginTop: -16 },
  markerDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.neutral[0] },
  list: { padding: Spacing.xl, gap: Spacing.base },
  item: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, backgroundColor: Colors.neutral[0], borderRadius: Radius.lg, padding: Spacing.base },
  itemIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dist: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary[50], borderRadius: Radius.pill, paddingVertical: 4, paddingHorizontal: Spacing.sm },
});
