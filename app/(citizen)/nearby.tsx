import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Navigation } from 'lucide-react-native';
import { nearbyIssues } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

const riskColors: Record<string, [string, string]> = {
  Low: [Colors.success[400], Colors.success[600]],
  Medium: [Colors.warning[400], Colors.warning[600]],
  High: ['#F78B4A', Colors.danger[500]],
  Critical: [Colors.danger[400], Colors.danger[600]],
};

export default function Nearby() {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>Nearby Issues</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>Live mock city map · Ward 7 area</Typography.bodyS>
      </LinearGradient>

      <View style={styles.mapWrap}>
        <LinearGradient colors={[Colors.neutral[100], Colors.primary[50]]} style={styles.map}>
          {/* mock roads */}
          <View style={[styles.road, { width: '100%', height: 4, top: '30%' }]} />
          <View style={[styles.road, { width: '100%', height: 4, top: '65%' }]} />
          <View style={[styles.road, { width: 4, height: '100%', left: '35%' }]} />
          <View style={[styles.road, { width: 4, height: '100%', left: '70%' }]} />

          {/* you marker */}
          <View style={[styles.you, { left: '48%', top: '48%' }]}>
            <View style={styles.youPulse} />
            <View style={styles.youDot} />
          </View>

          {/* issue markers */}
          {nearbyIssues.map((n) => (
            <View key={n.id} style={[styles.marker, { left: `${n.x * 100}%`, top: `${n.y * 100}%` }]}>
              <LinearGradient colors={riskColors[n.risk]} style={styles.markerDot}>
                <Typography.label style={{ color: Colors.neutral[0], fontSize: 10 }}>{n.reports}</Typography.label>
              </LinearGradient>
            </View>
          ))}
        </LinearGradient>
      </View>

      <View style={styles.list}>
        <Typography.title style={{ marginBottom: Spacing.base }}>Issues near you</Typography.title>
        {nearbyIssues.map((n) => (
          <View key={n.id} style={styles.item}>
            <LinearGradient colors={riskColors[n.risk]} style={styles.itemIcon}>
              <MapPin color={Colors.neutral[0]} size={16} />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Typography.title>{n.title}</Typography.title>
              <Typography.bodyS style={{ color: Colors.neutral[500] }}>{n.ward} · {n.category}</Typography.bodyS>
            </View>
            <View style={styles.dist}>
              <Navigation color={Colors.primary[500]} size={12} />
              <Typography.label style={{ color: Colors.primary[600] }}>{n.distance}</Typography.label>
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
  youPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(21,101,216,0.2)' },
  youDot: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.primary[600], borderWidth: 3, borderColor: Colors.neutral[0] },
  marker: { position: 'absolute', marginLeft: -16, marginTop: -16 },
  markerDot: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.neutral[0] },
  list: { padding: Spacing.xl, gap: Spacing.base },
  item: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, backgroundColor: Colors.neutral[0], borderRadius: Radius.lg, padding: Spacing.base },
  itemIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  dist: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: Colors.primary[50], borderRadius: Radius.pill, paddingVertical: 4, paddingHorizontal: Spacing.sm },
});
