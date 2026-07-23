import React, { useState, useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { FileText, MapPin, TrendingUp, Search } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { officerComplaints } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const filters = ['All', 'Pending', 'In Progress', 'Resolved'] as const;

export default function ComplaintManagement() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const list = officerComplaints.filter((c) => (filter === 'All' ? true : c.status === filter));
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <T.h2 style={{ color: Colors.neutral[0] }}>Complaint Management</T.h2>
        <T.bodyS style={{ color: Colors.primary[200] }}>{officerComplaints.length} cases under your zone</T.bodyS>
      </LinearGradient>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Search color={Colors.neutral[400]} size={18} />
          <T.body style={{ color: Colors.neutral[400] }}>Search by ID, ward, category...</T.body>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filters.map((f) => (
          <View key={f} style={[styles.filterChip, filter === f && styles.filterActive]}>
            <T.label style={{ color: filter === f ? Colors.neutral[0] : Colors.neutral[500] }}>{f}</T.label>
          </View>
        ))}
      </View>

      <Animated.View style={{ opacity: fade, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {list.map((c, i) => (
            <Card key={c.id} delay={i * 70} onPress={() => router.push(`/complaint/${c.id}`)} style={styles.card}>
              <View style={styles.top}>
                <View style={styles.left}>
                  <View style={styles.iconBox}>
                    <FileText color={Colors.primary[600]} size={20} />
                  </View>
                  <View>
                    <T.title numberOfLines={1}>{c.title}</T.title>
                    <T.bodyS style={{ color: Colors.neutral[500] }}>{c.id} · {c.date}</T.bodyS>
                  </View>
                </View>
                <StatusBadge status={c.status} />
              </View>
              <View style={styles.meta}>
                <MapPin color={Colors.neutral[400]} size={14} />
                <T.bodyS style={{ color: Colors.neutral[500] }}>{c.ward}</T.bodyS>
              </View>
              <View style={styles.footer}>
                <RiskBadge level={c.priority} />
                <View style={styles.upvote}>
                  <TrendingUp color={Colors.primary[500]} size={14} />
                  <T.label style={{ color: Colors.primary[600] }}>{c.upvotes}</T.label>
                </View>
              </View>
            </Card>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  searchRow: { paddingHorizontal: Spacing.xl, paddingTop: Spacing.base },
  searchBox: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.neutral[0], borderRadius: Radius.md, padding: Spacing.base },
  filterRow: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.xl, paddingVertical: Spacing.base },
  filterChip: { paddingVertical: 6, paddingHorizontal: Spacing.base, borderRadius: Radius.pill, backgroundColor: Colors.neutral[0] },
  filterActive: { backgroundColor: Colors.primary[600] },
  content: { padding: Spacing.xl, paddingBottom: 120, gap: Spacing.base },
  card: { gap: Spacing.sm },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  left: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: Radius.md, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, paddingLeft: 56 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  upvote: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
