import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Settings, Bell, Shield, HelpCircle, ChevronRight, LogOut, Award, FileText } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { citizenComplaints } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function CitizenProfile() {
  const total = citizenComplaints.length;
  const resolved = citizenComplaints.filter((c) => c.status === 'Resolved').length;
  const upvotes = citizenComplaints.reduce((s, c) => s + c.upvotes, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <View style={styles.avatar}>
          <Typography.h1 style={{ color: Colors.primary[600] }}>AS</Typography.h1>
        </View>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>Aarav Sharma</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>Citizen · Ward 7 - Riverside</Typography.bodyS>
        <View style={styles.statRow}>
          <ProfileStat value={total} label="Reports" />
          <View style={styles.div} />
          <ProfileStat value={resolved} label="Resolved" />
          <View style={styles.div} />
          <ProfileStat value={upvotes} label="Upvotes" />
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Card delay={0}>
          <Typography.title style={{ marginBottom: Spacing.base }}>Civic Score</Typography.title>
          <View style={styles.scoreRow}>
            <View style={styles.scoreRing}>
              <LinearGradient colors={[Colors.primary[400], Colors.accent[500]]} style={styles.scoreFill}>
                <Typography.h2 style={{ color: Colors.neutral[0] }}>842</Typography.h2>
                <Typography.caption style={{ color: Colors.primary[100] }}>points</Typography.caption>
              </LinearGradient>
            </View>
            <View style={{ flex: 1, gap: Spacing.sm }}>
              <Badge icon={<Award color={Colors.warning[500]} size={18} />} label="Active Reporter" />
              <Badge icon={<Shield color={Colors.primary[500]} size={18} />} label="Verified Citizen" />
              <Badge icon={<FileText color={Colors.accent[500]} size={18} />} label="5+ Complaints" />
            </View>
          </View>
        </Card>

        <Card delay={100} style={styles.menuCard}>
          <MenuItem icon={<Bell color={Colors.primary[600]} size={20} />} label="Notification Preferences" />
          <MenuItem icon={<Shield color={Colors.primary[600]} size={20} />} label="Privacy & Security" />
          <MenuItem icon={<Settings color={Colors.primary[600]} size={20} />} label="App Settings" />
          <MenuItem icon={<HelpCircle color={Colors.primary[600]} size={20} />} label="Help & Support" last />
        </Card>

        <Button label="Switch Account" variant="secondary" fullWidth onPress={() => router.replace('/login')} style={{ marginTop: Spacing.lg }} />
        <Button label="Logout" variant="ghost" fullWidth onPress={() => router.replace('/login')} style={{ marginTop: Spacing.sm }} />
      </View>
    </ScrollView>
  );
}

function ProfileStat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.pStat}>
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
  pStat: { flex: 1, alignItems: 'center' },
  div: { width: 1, height: 32, backgroundColor: 'rgba(255,255,255,0.2)' },
  content: { padding: Spacing.xl, gap: Spacing.base },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  scoreRing: { width: 100, height: 100, borderRadius: 50, overflow: 'hidden' },
  scoreFill: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.neutral[50], borderRadius: Radius.md, paddingVertical: 8, paddingHorizontal: Spacing.sm },
  menuCard: { padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, padding: Spacing.base },
  menuSep: { borderBottomWidth: 1, borderBottomColor: Colors.neutral[100] },
  menuIcon: { width: 36, height: 36, borderRadius: Radius.md, backgroundColor: Colors.primary[50], alignItems: 'center', justifyContent: 'center' },
});
