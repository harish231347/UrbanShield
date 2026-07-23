import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FileText, Clock, AlertTriangle, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { FAB } from '@/components/FAB';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { BarChart } from '@/components/Charts';
import { SkeletonCard } from '@/components/Skeleton';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { officerStats, priorityQueue } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

export default function OfficerDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <FloatingOrbs />
        <View style={styles.headerTop}>
          <View>
            <T.bodyS style={{ color: Colors.primary[200] }}>Officer Console</T.bodyS>
            <T.h2 style={{ color: Colors.neutral[0] }}>Insp. R. Mehta</T.h2>
          </View>
          <View style={styles.rankBadge}>
            <T.label style={{ color: Colors.primary[600] }}>Zone A</T.label>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dashGrid}>
          <DashCard icon={<FileText color={Colors.neutral[0]} size={22} />} value={officerStats.todayReports} label="Today's Reports" colors={[Colors.primary[400], Colors.primary[600]]} delay={0} />
          <DashCard icon={<Clock color={Colors.neutral[0]} size={22} />} value={officerStats.pendingCases} label="Pending Cases" colors={[Colors.warning[400], Colors.warning[600]]} delay={80} />
          <DashCard icon={<AlertTriangle color={Colors.neutral[0]} size={22} />} value={officerStats.highRiskAreas} label="High Risk Areas" colors={[Colors.danger[400], Colors.danger[600]]} delay={160} />
          <DashCard icon={<CheckCircle2 color={Colors.neutral[0]} size={22} />} value={officerStats.resolvedCases} label="Resolved Cases" colors={[Colors.success[400], Colors.success[600]]} delay={240} />
        </View>

        <Card delay={300} style={styles.chartCard}>
          <View style={styles.cardHead}>
            <T.title>Weekly Trend</T.title>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: Colors.primary[500] }]} />
              <T.caption style={{ color: Colors.neutral[500] }}>Reports</T.caption>
              <View style={[styles.legendDot, { backgroundColor: Colors.accent[500] }]} />
              <T.caption style={{ color: Colors.neutral[500] }}>Resolved</T.caption>
            </View>
          </View>
          <BarChart />
        </Card>

        <View style={styles.sectionHead}>
          <View style={styles.sectionTitleRow}>
            <Sparkles color={Colors.primary[600]} size={18} />
            <T.h3>AI Priority Queue</T.h3>
          </View>
          <T.bodyS style={{ color: Colors.primary[600] }} onPress={() => router.push('/(officer)/queue')}>View all</T.bodyS>
        </View>

        {loading ? (
          <SkeletonCard />
        ) : (
          priorityQueue.slice(0, 3).map((c, i) => (
            <Card key={c.id} delay={i * 70} onPress={() => router.push(`/complaint/${c.id}`)} style={styles.queueCard}>
              <View style={styles.queueTop}>
                <View style={styles.priorityNum}>
                  <T.h3 style={{ color: Colors.neutral[0] }}>{i + 1}</T.h3>
                </View>
                <View style={{ flex: 1 }}>
                  <T.title numberOfLines={1}>{c.title}</T.title>
                  <T.bodyS style={{ color: Colors.neutral[500] }}>{c.ward}</T.bodyS>
                </View>
                <RiskBadge level={c.priority} />
              </View>
              <View style={styles.queueFooter}>
                <StatusBadge status={c.status} />
                <View style={styles.upvoteRow}>
                  <TrendingUp color={Colors.primary[500]} size={14} />
                  <T.label style={{ color: Colors.primary[600] }}>{c.upvotes}</T.label>
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
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, delay, friction: 6, tension: 60, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, [delay, scale, opacity]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }], width: '48%' }}>
      <Card style={styles.dashCard}>
        <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.dashIcon}>
          {icon}
        </LinearGradient>
        <T.h1 style={{ marginTop: Spacing.sm }}>{value}</T.h1>
        <T.bodyS style={{ color: Colors.neutral[500] }}>{label}</T.bodyS>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl, overflow: 'hidden' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rankBadge: { backgroundColor: Colors.neutral[0], borderRadius: Radius.pill, paddingVertical: 6, paddingHorizontal: Spacing.base },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  dashGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.base },
  dashCard: { padding: Spacing.base },
  dashIcon: { width: 44, height: 44, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  chartCard: { gap: Spacing.sm },
  cardHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xl, marginBottom: Spacing.base },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  queueCard: { gap: Spacing.sm },
  queueTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  priorityNum: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.primary[600], alignItems: 'center', justifyContent: 'center' },
  queueFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  upvoteRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
