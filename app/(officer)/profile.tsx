import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Award, Shield, Settings, Bell, HelpCircle, ChevronRight, LogOut, Star } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { officerStats } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function OfficerProfile() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <View style={styles.avatar}>
          <Typography.h1 style={{ color: Colors.primary[600] }}>RM</Typography.h1>
        </View>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>Insp. R. Mehta</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>Senior Officer · Zone A · Badge #4172</Typography.bodyS>
        <View style={styles.statRow}>
          <OStat value={officerStats.resolvedCases} label="Resolved" />
          <View style={styles.div} />
          <OStat value={officerStats.pendingCases} label="Pending" />
          <View style={styles.div} />
          <OStat value={officerStats.satisfaction} label="Satisfaction" />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Card delay={0}>
          <Typography.title style={{ marginBottom: Spacing.base }}>Performance</Typography.title>
          <View style={styles.perfRow}>
            <View style={styles.perfRing}>
              <LinearGradient colors={[Colors.primary[400], Colors.accent[500]]} style={styles.perfFill}>
                <Typography.h2 style={{ color: Colors.neutral[0] }}>A+</Typography.h2>
              </LinearGradient>
            </View>
            <View style={{ flex: 1, gap: Spacing.sm }}>
              <Badge icon={<Award color={Colors.warning[500]} size={18} />} label="Top Performer" />
              <Badge icon={<Shield color={Colors.primary[500]} size={18} />} label="10+ Years Service" />
              <Badge icon={<Star color={Colors.accent[500]} size={18} />} label="92% Satisfaction" />
            </View>
          </View>
        </Card>

        <Card delay={100} style={styles.menuCard}>
          <MenuItem icon={<Bell color={Colors.primary[600]} size={20} />} label="Alert Preferences" />
          <MenuItem icon={<Settings color={Colors.primary[600]} size={20} />} label="App Settings" />
          <MenuItem icon={<HelpCircle color={Colors.primary[600]} size={20} />} label="Help & Support" last />
        </Card>

        <Button label="Switch Account" variant="secondary" fullWidth onPress={() => router.replace('/login')} style={{ marginTop: Spacing.lg }} />
        <Button label="Logout" variant="ghost" fullWidth onPress={() => router.replace('/login')} style={{ marginTop: Spacing.sm }} />
      </View>
    </ScrollView>
  );
}

function OStat({ value, label }: { value: number | string; label: string }) {
  return (
    <View style={styles.oStat}>
      <Typography.h2 style={{ color: Colors.neutral[0] }}>{value}</Typography.h2>
      <Typography.caption style={{ color: Colors.primary[200] }}>{label}</Typography.caption>
    </View>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.badge}>
      {icon}
      <Typography.bodyS style={{ color: Colors.neutral[700] }}>{label}</Typography.bodyS>
    </View>
  );
}

function MenuItem({ icon, label, last }: { icon: React.ReactNode; label: string; last?: boolean }) {
  return (
    <View style={[styles.menuItem, !last && styles.menuSep]}>
      <View style={styles.menuIcon}>{icon}</View>
      <Typography.body style={{ flex: 1, color: Colors.neutral[800] }}>{label}</Typography.body>
      <ChevronRight color={Colors.neutral[300]} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { alignItems: 'center', paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: Colors.neutral[0], alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.base },
  statRow: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xl, gap: Spacing.sm },
  oStat: { flex: 1, alignItems: 'center' },
  div: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { padding: Spacing.xl, gap: Spacing.base },
  perfRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  perfRing: { width: 100, height: 100, borderRadius: 50, overflow: 'hidden' },
  perfFill: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.neutral[50], borderRadius: Radius.md, paddingVertical: 8, paddingHorizontal: Spacing.sm },
  menuCard: { padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, padding: Spacing.base },
  menuSep: { borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  menuIcon: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' },
});
