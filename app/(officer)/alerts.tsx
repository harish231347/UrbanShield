import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Siren, AlertTriangle, Clock } from 'lucide-react-native';
import { emergencyAlerts } from '@/lib/data';
import { Card } from '@/components/Card';
import { RiskBadge } from '@/components/Badges';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

const sevColors: Record<string, [string, string]> = {
  Critical: [Colors.danger[400], Colors.danger[600]],
  High: ['#F78B4A', Colors.danger[500]],
  Medium: [Colors.warning[400], Colors.warning[600]],
};

export default function EmergencyAlerts() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.danger[500], Colors.danger[600]]} style={styles.header}>
        <View style={styles.headerRow}>
          <Siren color={Colors.neutral[0]} size={28} />
          <View>
            <Typography.h2 style={{ color: Colors.neutral[0] }}>Emergency Alerts</Typography.h2>
            <Typography.bodyS style={{ color: Colors.danger[200] }}>{emergencyAlerts.length} active alerts</Typography.bodyS>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {emergencyAlerts.map((a, i) => {
          const colors = sevColors[a.severity];
          return (
            <Card key={a.id} delay={i * 80} style={styles.alertCard}>
              <View style={styles.alertTop}>
                <LinearGradient colors={colors} style={styles.alertIcon}>
                  <AlertTriangle color={Colors.neutral[0]} size={20} />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Typography.title>{a.title}</Typography.title>
                  <Typography.bodyS style={{ color: Colors.neutral[500] }}>{a.area}</Typography.bodyS>
                </View>
                <RiskBadge level={a.severity} />
              </View>
              <Typography.body style={{ color: Colors.neutral[600] }}>{a.body}</Typography.body>
              <View style={styles.timeRow}>
                <Clock color={Colors.neutral[400]} size={14} />
                <Typography.caption style={{ color: Colors.neutral[400] }}>{a.time}</Typography.caption>
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  content: { padding: Spacing.xl, gap: Spacing.base },
  alertCard: { gap: Spacing.sm },
  alertTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  alertIcon: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
});
