import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { priorityQueue } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

const riskOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 } as const;
const sorted = [...priorityQueue].sort((a, b) => riskOrder[a.priority] - riskOrder[b.priority]);

export default function PriorityQueue() {
  const [selected, setSelected] = useState<typeof priorityQueue[0] | null>(null);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>AI Priority Queue</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>{sorted.length} cases ranked by urgency & impact</Typography.bodyS>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {sorted.map((c, i) => (
          <Card key={c.id} delay={i * 70} onPress={() => setSelected(c)} style={styles.card}>
            <View style={styles.top}>
              <LinearGradient
                colors={c.priority === 'Critical' ? [Colors.danger[400], Colors.danger[600]] : c.priority === 'High' ? ['#F78B4A', Colors.danger[500]] : [Colors.warning[400], Colors.warning[600]]}
                style={styles.rankBox}>
                <Typography.h2 style={{ color: Colors.neutral[0] }}>#{i + 1}</Typography.h2>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Typography.title numberOfLines={1}>{c.title}</Typography.title>
                <Typography.bodyS style={{ color: Colors.neutral[500] }}>{c.ward}</Typography.bodyS>
                <View style={styles.metaRow}>
                  <Clock color={Colors.neutral[400]} size={12} />
                  <Typography.caption style={{ color: Colors.neutral[400] }}>{c.daysOpen}d open</Typography.caption>
                  <TrendingUp color={Colors.primary[500]} size={12} />
                  <Typography.caption style={{ color: Colors.primary[600] }}>{c.upvotes} upvotes</Typography.caption>
                </View>
              </View>
              <RiskBadge level={c.priority} />
            </View>
            <View style={styles.footer}>
              <StatusBadge status={c.status} />
              <Typography.bodyS style={{ color: Colors.primary[600] }}>Assign →</Typography.bodyS>
            </View>
          </Card>
        ))}
      </ScrollView>

      <BottomSheet visible={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <View style={styles.sheetContent}>
            <View style={styles.sheetHead}>
              <RiskBadge level={selected.priority} />
              <StatusBadge status={selected.status} />
            </View>
            <Typography.h2>{selected.title}</Typography.h2>
            <Typography.body style={{ color: Colors.neutral[600] }}>{selected.description}</Typography.body>
            <View style={styles.sheetInfo}>
              <View style={styles.sheetInfoItem}>
                <Typography.caption style={{ color: Colors.neutral[400] }}>Ward</Typography.caption>
                <Typography.body>{selected.ward}</Typography.body>
              </View>
              <View style={styles.sheetInfoItem}>
                <Typography.caption style={{ color: Colors.neutral[400] }}>Upvotes</Typography.caption>
                <Typography.body>{selected.upvotes}</Typography.body>
              </View>
            </View>
            <View style={styles.sheetActions}>
              <Button label="Assign to team" fullWidth onPress={() => setSelected(null)} />
              <Button label="View details" variant="secondary" fullWidth onPress={() => { setSelected(null); router.push(`/complaint/${selected.id}`); }} style={{ marginTop: Spacing.sm }} />
            </View>
          </View>
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  content: { padding: Spacing.xl, paddingBottom: 120, gap: Spacing.base },
  card: { gap: Spacing.sm },
  top: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  rankBox: { width: 48, height: 48, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.neutral[100] },
  sheetContent: { gap: Spacing.base, paddingBottom: Spacing.xl },
  sheetHead: { flexDirection: 'row', gap: Spacing.sm },
  sheetInfo: { flexDirection: 'row', gap: Spacing.xl, paddingVertical: Spacing.base },
  sheetInfoItem: { gap: 2 },
  sheetActions: { marginTop: Spacing.sm },
});
