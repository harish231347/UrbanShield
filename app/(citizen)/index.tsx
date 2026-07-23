import React, { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, FileText, Clock, CheckCircle2, MapPin, TrendingUp } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { FAB } from '@/components/FAB';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { SkeletonCard } from '@/components/Skeleton';
import { citizenComplaints } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function CitizenHome() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const active = citizenComplaints.filter((c) => c.status !== 'Resolved').length;
  const resolved = citizenComplaints.filter((c) => c.status === 'Resolved').length;

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Typography.bodyS style={{ color: Colors.primary[200] }}>Welcome back</Typography.bodyS>
            <Typography.h2 style={{ color: Colors.neutral[0] }}>Aarav Sharma</Typography.h2>
          </View>
          <View style={styles.avatar}>
            <Typography.h3 style={{ color: Colors.primary[600] }}>AS</Typography.h3>
          </View>
        </View>
        <View style={styles.statsRow}>
          <MiniStat label="Active" value={active} />
          <View style={styles.divider} />
          <MiniStat label="Resolved" value={resolved} />
          <View style={styles.divider} />
          <MiniStat label="Upvotes" value={citizenComplaints.reduce((s, c) => s + c.upvotes, 0)} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHead}>
          <Typography.h3>Recent Complaints</Typography.h3>
        </View>

        {loading ? (
          <View style={{ gap: Spacing.base }}>
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          citizenComplaints.slice(0, 3).map((c, i) => (
            <Card key={c.id} delay={i * 80} onPress={() => router.push(`/complaint/${c.id}`)} style={styles.complaintCard}>
              <View style={styles.cardTop}>
                <View style={styles.cardLeft}>
                  <View style={[styles.catIcon, { backgroundColor: Colors.primary[50] }]}>
                    <FileText color={Colors.primary[600]} size={20} />
                  </View>
                  <View>
                    <Typography.title numberOfLines={1}>{c.title}</Typography.title>
                    <Typography.bodyS style={{ color: Colors.neutral[500] }}>{c.id} · {c.category}</Typography.bodyS>
                  </View>
                </View>
                <StatusBadge status={c.status} />
              </View>
              <View style={styles.cardMeta}>
                <MapPin color={Colors.neutral[400]} size={14} />
                <Typography.bodyS style={{ color: Colors.neutral[500] }}>{c.location}</Typography.bodyS>
              </View>
              <View style={styles.cardFooter}>
                <RiskBadge level={c.priority} />
                <View style={styles.upvoteRow}>
                  <TrendingUp color={Colors.primary[500]} size={14} />
                  <Typography.label style={{ color: Colors.primary[600] }}>{c.upvotes}</Typography.label>
                </View>
              </View>
            </Card>
          ))
        )}

        <Card delay={300} variant="glass" style={styles.glassCard}>
          <View style={styles.glassRow}>
            <View style={styles.glassIcon}>
              <CheckCircle2 color={Colors.neutral[0]} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Typography.title style={{ color: Colors.neutral[0] }}>Track your complaints</Typography.title>
              <Typography.bodyS style={{ color: Colors.primary[100] }}>See updates, upvotes and officer responses</Typography.bodyS>
            </View>
            <ArrowRight color={Colors.neutral[0]} size={20} />
          </View>
        </Card>
      </ScrollView>

      <FAB onPress={() => router.push('/report')} />
    </View>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.miniStat}>
      <Typography.h2 style={{ color: Colors.neutral[0] }}>{value}</Typography.h2>
      <Typography.caption style={{ color: Colors.primary[200] }}>{label}</Typography.caption>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.neutral[0], alignItems: 'center', justifyContent: 'center' },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xl },
  miniStat: { flex: 1, alignItems: 'center' },
  divider: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: Spacing.base },
  complaintCard: { gap: Spacing.sm },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, flex: 1 },
  catIcon: { width: 40, height: 40, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, paddingLeft: 56 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  upvoteRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  glassCard: { marginTop: Spacing.lg, backgroundColor: Colors.primary[500] },
  glassRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  glassIcon: { width: 44, height: 44, borderRadius: Radius.md, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
});
