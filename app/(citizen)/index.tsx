import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View, TouchableOpacity, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, FileText, Clock, CheckCircle2, MapPin, TrendingUp, Sparkles } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { FAB } from '@/components/FAB';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { SkeletonCard } from '@/components/Skeleton';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { citizenComplaints } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

export default function CitizenHome() {
  const [loading, setLoading] = useState(true);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
    return () => clearTimeout(t);
  }, []);

  const active = citizenComplaints.filter((c) => c.status !== 'Resolved').length;
  const resolved = citizenComplaints.filter((c) => c.status === 'Resolved').length;
  const totalUpvotes = citizenComplaints.reduce((s, c) => s + c.upvotes, 0);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <FloatingOrbs />
        <View style={styles.headerTop}>
          <View>
            <T.bodyS style={{ color: Colors.primary[200] }}>Welcome back</T.bodyS>
            <T.h2 style={{ color: Colors.neutral[0] }}>Aarav Sharma</T.h2>
          </View>
          <View style={styles.avatar}>
            <T.h3 style={{ color: Colors.primary[600] }}>AS</T.h3>
          </View>
        </View>
        <View style={styles.glassStats}>
          <MiniStat label="Active" value={active} delay={0} />
          <View style={styles.divider} />
          <MiniStat label="Resolved" value={resolved} delay={150} />
          <View style={styles.divider} />
          <MiniStat label="Upvotes" value={totalUpvotes} delay={300} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHead}>
          <T.h3>Recent Complaints</T.h3>
          <T.bodyS style={{ color: Colors.primary[600] }} onPress={() => router.push('/complaints')}>View all</T.bodyS>
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
                    <T.title numberOfLines={1}>{c.title}</T.title>
                    <T.bodyS style={{ color: Colors.neutral[500] }}>{c.id} · {c.category}</T.bodyS>
                  </View>
                </View>
                <StatusBadge status={c.status} />
              </View>
              <View style={styles.cardMeta}>
                <MapPin color={Colors.neutral[400]} size={14} />
                <T.bodyS style={{ color: Colors.neutral[500] }}>{c.location}</T.bodyS>
              </View>
              <View style={styles.cardFooter}>
                <RiskBadge level={c.priority} />
                <View style={styles.upvoteRow}>
                  <TrendingUp color={Colors.primary[500]} size={14} />
                  <T.label style={{ color: Colors.primary[600] }}>{c.upvotes}</T.label>
                </View>
              </View>
            </Card>
          ))
        )}

        <Card delay={300} style={styles.glassCard}>
          <LinearGradient colors={[Colors.primary[500], Colors.primary[700]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.glassGradient}>
            <View style={styles.glassRow}>
              <View style={styles.glassIcon}>
                <Sparkles color={Colors.neutral[0]} size={22} />
              </View>
              <View style={{ flex: 1 }}>
                <T.title style={{ color: Colors.neutral[0] }}>Track your complaints</T.title>
                <T.bodyS style={{ color: Colors.primary[100] }}>See updates, upvotes and officer responses</T.bodyS>
              </View>
              <ArrowRight color={Colors.neutral[0]} size={20} />
            </View>
          </LinearGradient>
        </Card>
      </ScrollView>

      <FAB onPress={() => router.push('/report')} />
    </View>
  );
}

function MiniStat({ label, value, delay }: { label: string; value: number; delay: number }) {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, delay, friction: 6, tension: 60, useNativeDriver: true }).start();
  }, [delay, scale]);

  return (
    <Animated.View style={[styles.miniStat, { transform: [{ scale }] }]}>
      <T.h2 style={{ color: Colors.neutral[0] }}>{value}</T.h2>
      <T.caption style={{ color: Colors.primary[200] }}>{label}</T.caption>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl, overflow: 'hidden' },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.neutral[0], alignItems: 'center', justifyContent: 'center' },
  glassStats: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xl, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: Radius.lg, paddingVertical: Spacing.base, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
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
  glassCard: { marginTop: Spacing.lg, padding: 0, overflow: 'hidden' },
  glassGradient: { padding: Spacing.lg, borderRadius: Radius.lg },
  glassRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  glassIcon: { width: 44, height: 44, borderRadius: Radius.md, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
});
