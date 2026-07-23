import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Siren, AlertTriangle, Clock } from 'lucide-react-native';
import { emergencyAlerts } from '@/lib/data';
import { Card } from '@/components/Card';
import { RiskBadge } from '@/components/Badges';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const sevColors: Record<string, [string, string]> = {
  Critical: [Colors.danger[400], Colors.danger[600]],
  High: ['#F78B4A', Colors.danger[500]],
  Medium: [Colors.warning[400], Colors.warning[600]],
};

export default function EmergencyAlerts() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.danger[500], Colors.danger[600]]} style={styles.header}>
        <FloatingOrbs />
        <View style={styles.headerRow}>
          <Siren color={Colors.neutral[0]} size={28} />
          <View>
            <T.h2 style={{ color: Colors.neutral[0] }}>Emergency Alerts</T.h2>
            <T.bodyS style={{ color: Colors.danger[200] }}>{emergencyAlerts.length} active alerts</T.bodyS>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {emergencyAlerts.map((a, i) => {
          const colors = sevColors[a.severity];
          const slide = useRef(new Animated.Value(30)).current;
          const opacity = useRef(new Animated.Value(0)).current;
          useEffect(() => {
            Animated.parallel([
              Animated.timing(opacity, { toValue: 1, duration: 450, delay: i * 100, useNativeDriver: true }),
              Animated.timing(slide, { toValue: 0, duration: 450, delay: i * 100, useNativeDriver: true }),
            ]).start();
          }, [i, opacity, slide]);
          return (
            <Animated.View key={a.id} style={{ opacity, transform: [{ translateY: slide }], marginBottom: Spacing.base }}>
              <Card style={styles.alertCard}>
                <View style={styles.alertTop}>
                  <LinearGradient colors={colors} style={styles.alertIcon}>
                    <AlertTriangle color={Colors.neutral[0]} size={20} />
                  </LinearGradient>
                  <View style={{ flex: 1 }}>
                    <T.title>{a.title}</T.title>
                    <T.bodyS style={{ color: Colors.neutral[500] }}>{a.area}</T.bodyS>
                  </View>
                  <RiskBadge level={a.severity} />
                </View>
                <T.body style={{ color: Colors.neutral[600] }}>{a.body}</T.body>
                <View style={styles.timeRow}>
                  <Clock color={Colors.neutral[400]} size={14} />
                  <T.caption style={{ color: Colors.neutral[400] }}>{a.time}</T.caption>
                </View>
              </Card>
            </Animated.View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  content: { padding: Spacing.xl },
  alertCard: { gap: Spacing.sm },
  alertTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  alertIcon: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
});
