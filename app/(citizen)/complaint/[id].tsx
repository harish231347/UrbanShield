import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Calendar, User, TrendingUp, MessageSquare } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { StatusBadge, RiskBadge } from '@/components/Badges';
import { Button } from '@/components/Button';
import { citizenComplaints, officerComplaints } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function ComplaintDetails() {
  const { id } = useLocalSearchParams();
  const complaint = [...citizenComplaints, ...officerComplaints].find((c) => c.id === id) ?? citizenComplaints[0];

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={Colors.neutral[0]} size={24} />
          </TouchableOpacity>
          <Typography.h3 style={{ color: Colors.neutral[0] }}>{complaint.id}</Typography.h3>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card delay={0} style={styles.mainCard}>
          <View style={styles.rowBetween}>
            <Typography.h2>{complaint.title}</Typography.h2>
            <RiskBadge level={complaint.priority} />
          </View>
          <View style={styles.statusRow}>
            <StatusBadge status={complaint.status} />
            <Typography.bodyS style={{ color: Colors.neutral[500] }}>{complaint.category}</Typography.bodyS>
          </View>
          <Typography.body style={{ color: Colors.neutral[600], marginTop: Spacing.base }}>{complaint.description}</Typography.body>
        </Card>

        <Card delay={100} style={styles.infoCard}>
          <InfoRow icon={<MapPin color={Colors.primary[600]} size={18} />} label="Location" value={complaint.location} />
          <View style={styles.sep} />
          <InfoRow icon={<Calendar color={Colors.primary[600]} size={18} />} label="Reported" value={`${complaint.date} · ${complaint.daysOpen} days open`} />
          {complaint.officer && (
            <>
              <View style={styles.sep} />
              <InfoRow icon={<User color={Colors.primary[600]} size={18} />} label="Officer" value={complaint.officer} />
            </>
          )}
          <View style={styles.sep} />
          <InfoRow icon={<TrendingUp color={Colors.primary[600]} size={18} />} label="Community Upvotes" value={`${complaint.upvotes} citizens`} />
        </Card>

        <Typography.title style={styles.sectionLabel}>Status Updates</Typography.title>
        <Card delay={200} style={styles.timelineCard}>
          {complaint.updates.length > 0 ? (
            complaint.updates.map((u, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={{ flex: 1 }}>
                  <Typography.label style={{ color: Colors.primary[600] }}>{u.date}</Typography.label>
                  <Typography.body style={{ color: Colors.neutral[700] }}>{u.text}</Typography.body>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyTimeline}>
              <MessageSquare color={Colors.neutral[300]} size={28} />
              <Typography.bodyS style={{ color: Colors.neutral[400] }}>No updates yet</Typography.bodyS>
            </View>
          )}
        </Card>

        <Button label="Upvote this complaint" variant="secondary" fullWidth style={{ marginTop: Spacing.lg }} />
      </ScrollView>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>{icon}</View>
      <View>
        <Typography.caption style={{ color: Colors.neutral[400] }}>{label}</Typography.caption>
        <Typography.body style={{ color: Colors.neutral[800] }}>{value}</Typography.body>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.base, paddingHorizontal: Spacing.xl },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  content: { padding: Spacing.xl, paddingBottom: 60, gap: Spacing.base },
  mainCard: { gap: Spacing.sm },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: Spacing.sm },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  infoCard: { gap: Spacing.sm },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  infoIcon: { width: 38, height: 38, borderRadius: Radius.md, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' },
  sep: { height: 1, backgroundColor: Colors.neutral[100], marginVertical: Spacing.xs },
  sectionLabel: { marginTop: Spacing.sm },
  timelineCard: { gap: Spacing.base },
  timelineItem: { flexDirection: 'row', gap: Spacing.base },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary[500], marginTop: 4 },
  emptyTimeline: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.base },
});
