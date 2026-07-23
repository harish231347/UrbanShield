import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FileText, Clock, AlertTriangle, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { FAB } from '@/components/FAB';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { BarChart } from '@/components/Charts';
import { SkeletonCard } from '@/components/Skeleton';
import { officerStats, priorityQueue, weeklyTrend } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function OfficerDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Typography.bodyS style={{ color: Colors.primary[200] }}>Officer Console</Typography.bodyS>
            <Typography.h2 style={{ color: Colors.neutral[0] }}>Insp. R. Mehta</Typography.h2>
          </View>
          <View style={styles.rankBadge}>
            <Typography.label style={{ color: Colors.primary[600] }}>Zone A</Typography.label>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dashGrid}>
          <DashCard icon={<FileText color={Colors.primary[600]} size={22} />} value={officerStats.todayReports} label="Today's Reports" colors={[Colors.primary[400], Colors.primary[600]]} delay={0} />
          <DashCard icon={<Clock color={Colors.warning[500]} size={22} />} value={officerStats.pendingCases} label="Pending Cases" colors={[Colors.warning[400], Colors.warning[600]]} delay={80} />
          <DashCard icon={<AlertTriangle color={Colors.danger[500]} size={22} />} value={officerStats.highRiskAreas} label="High Risk Areas" colors={[Colors.danger[400], Colors.danger[600]]} delay={160} />
          <DashCard icon={<CheckCircle2 color={Colors.success[500]} size={22} />} value={officerStats.resolvedCases} label="Resolved Cases" colors={[Colors.success[400], Colors.success[600]]} delay={240} />
        </View>

        <Card delay={300} style={styles.chartCard}>
          <View style={styles.cardHead}>
            <Typography.title>Weekly Trend</Typography.title>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary[500] }]} />
              <Typography.caption style={{ color: Colors.neutral[500] }}>Reports</Typography.caption>
              <View style={[styles.legendDot, { backgroundColor: Colors.accent[500] }]} />
              <Typography.caption style={{ color: Colors.neutral[500] }}>Resolved</Typography.caption>
            </View>
          </View>
          <BarChart />
        </Card>

        <View style={styles.sectionHead}>
          <Typography.h3>AI Priority Queue</Typography.h3>
          <Typography.bodyS style={{ color: Colors.primary[600] }} onPress={() => router.push('/(officer)/queue')}>View all</Typography.bodyS>
        </View>

        {loading ? (
          <SkeletonCard />
        ) : (
          priorityQueue.slice(0, 3).map((c, i) => (
            <Card key={c.id} delay={i * 70} onPress={() => router.push(`/complaint/${c.id}`)} style={styles.queueCard}>
              <View style={styles.queueTop}>
                <View style={styles.priorityNum}>
                  <Typography.h3 style={{ color: Colors.neutral[0] }}>{i + 1}</Typography.h3>
                </View>
                <View style={{ flex: 1 }}>
                  <Typography.title numberOfLines={1}>{c.title}</Typography.title>
                  <Typography.bodyS style={{ color: Colors.neutral[500] }}>{c.ward}</Typography.bodyS>
                </View>
                <RiskBadge level={c.priority} />
              </View>
              <View style={styles.queueFooter}>
                <StatusBadge status={c.status} />
                <View style={styles.upvoteRow}>
                  <TrendingUp color={Colors.primary[500]} size={14} />
                  <Typography.label style={{ color: Colors.primary[600] }}>{c.upvotes}</Typography.label>
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      <FAB onPress={() => router.push('/(officer)/queue')} />
    </View>
  );
}

function DashCard({ icon, value, label, colors, delay }: { icon: React.ReactNode; value: number; label: string; colors: [string, string]; delay: number }) {
  return (
    <Card delay={delay} style={styles.dashCard}>
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.dashIcon}>
        {icon}
      </LinearGradient>
      <Typography.h1 style={{ marginTop: Spacing.sm }}>{value}</Typography.h1>
      <Typography.bodyS style={{ color: Colors.neutral[500] }}>{label}</Typography.bodyS>
    </Card>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rankBadge: { backgroundColor: Colors.neutral[0], borderRadius: Radius.pill, paddingVertical: 6, paddingHorizontal: Spacing.base },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  dashGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.base },
  dashCard: { width: '48%', padding: Spacing.base },
  dashIcon: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  chartCard: { gap: Spacing.sm },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.base },
  queueCard: { gap: Spacing.sm },
  queueTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  priorityNum: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  queueFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  upvoteRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
