import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, DonutChart } from '@/components/Charts';
import { Card } from '@/components/Card';
import { officerStats, weeklyTrend } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function Reports() {
  const totalReports = weeklyTrend.reduce((s, d) => s + d.reports, 0);
  const totalResolved = weeklyTrend.reduce((s, d) => s + d.resolved, 0);
  const rate = Math.round((totalResolved / totalReports) * 100);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>Reports & Analytics</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>Zone A · Last 7 days</Typography.bodyS>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.kpiRow}>
          <KpiCard label="Resolution Rate" value={`${rate}%`} colors={[Colors.success[400], Colors.success[600]]} delay={0} />
          <KpiCard label="Avg Response" value={officerStats.avgResponse} colors={[Colors.primary[400], Colors.primary[600]]} delay={80} />
          <KpiCard label="Satisfaction" value={officerStats.satisfaction} colors={[Colors.accent[400], Colors.accent[600]]} delay={160} />
        </View>

        <Card delay={240} style={styles.chartCard}>
          <Typography.title style={{ marginBottom: Spacing.base }}>Weekly Reports vs Resolved</Typography.title>
          <BarChart />
        </Card>

        <Card delay={320} style={styles.chartCard}>
          <Typography.title style={{ marginBottom: Spacing.base }}>Category Breakdown</Typography.title>
          <DonutChart />
        </Card>

        <Card delay={400} style={styles.summaryCard}>
          <Typography.title style={{ marginBottom: Spacing.base }}>Zone Summary</Typography.title>
          <SummaryRow label="Total Reports (7d)" value={String(totalReports)} />
          <SummaryRow label="Total Resolved (7d)" value={String(totalResolved)} />
          <SummaryRow label="Pending Cases" value={String(officerStats.pendingCases)} />
          <SummaryRow label="High Risk Areas" value={String(officerStats.highRiskAreas)} last />
        </Card>
      </View>
    </ScrollView>
  );
}

function KpiCard({ label, value, colors, delay }: { label: string; value: string; colors: [string, string]; delay: number }) {
  return (
    <Card delay={delay} style={styles.kpiCard}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.kpiIcon} />
      <Typography.h2 style={{ marginTop: Spacing.sm }}>{value}</Typography.h2>
      <Typography.bodyS style={{ color: Colors.neutral[500] }}>{label}</Typography.bodyS>
    </Card>
  );
}

function SummaryRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.summaryRow, !last && styles.summarySep]}>
      <Typography.body style={{ color: Colors.neutral[600] }}>{label}</Typography.body>
      <Typography.title style={{ color: Colors.primary[600] }}>{value}</Typography.title>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  content: { padding: Spacing.xl, gap: Spacing.base },
  kpiRow: { flexDirection: 'row', gap: Spacing.base },
  kpiCard: { flex: 1, padding: Spacing.base },
  kpiIcon: { width: 40, height: 40, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  chartCard: { gap: Spacing.sm },
  summaryCard: { gap: Spacing.sm },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: Spacing.sm },
  summarySep: { borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
});
