import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Settings, Bell, Shield, HelpCircle, ChevronRight, Award, FileText } from 'lucide-react-native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { citizenComplaints } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

export default function CitizenProfile() {
  const total = citizenComplaints.length;
  const resolved = citizenComplaints.filter((c) => c.status === 'Resolved').length;
  const upvotes = citizenComplaints.reduce((s, c) => s + c.upvotes, 0);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 120 }}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <FloatingOrbs />
        <View style={styles.avatar}>
          <T.h1 style={{ color: Colors.primary[600] }}>AS</T.h1>
        </View>
        <T.h2 style={{ color: Colors.neutral[0] }}>Aarav Sharma</T.h2>
        <T.bodyS style={{ color: Colors.primary[200] }}>Citizen · Ward 7 - Riverside</T.bodyS>
        <View style={styles.statRow}>
          <ProfileStat value={total} label="Reports" />
          <View style={styles.div} />
          <ProfileStat value={resolved} label="Resolved" />
          <View style={styles.div} />
          <ProfileStat value={upvotes} label="Upvotes" />
        </View>
      </LinearGradient>

      <Animated.View style={{ opacity: fade }}>
        <View style={styles.content}>
          <Card delay={0}>
            <T.title style={{ marginBottom: Spacing.base }}>Civic Score</T.title>
            <View style={styles.scoreRow}>
              <View style={styles.scoreRing}>
                <LinearGradient colors={[Colors.primary[400], Colors.accent[500]]} style={styles.scoreFill}>
                  <T.h2 style={{ color: Colors.neutral[0] }}>842</T.h2>
                  <T.caption style={{ color: Colors.primary[100] }}>points</T.caption>
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
      </Animated.View>
    </ScrollView>
  );
}

function ProfileStat({ value, label }: { value: number; label: string }) {
  const scale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }).start();
  }, [scale]);
  return (
    <Animated.View style={[styles.pStat, { transform: [{ scale }] }]}>
      <T.h2 style={{ color: Colors.neutral[0] }}>{value}</T.h2>
      <T.caption style={{ color: Colors.primary[200] }}>{label}</T.caption>
    </Animated.View>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={styles.badge}>
      {icon}
      <T.bodyS style={{ color: Colors.neutral[700] }}>{label}</T.bodyS>
    </View>
  );
}

function MenuItem({ icon, label, last }: { icon: React.ReactNode; label: string; last?: boolean }) {
  return (
    <View style={[styles.menuItem, !last && styles.menuSep]}>
      <View style={styles.menuIcon}>{icon}</View>
      <T.body style={{ flex: 1, color: Colors.neutral[800] }}>{label}</T.body>
      <ChevronRight color={Colors.neutral[300]} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { alignItems: 'center', paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl, overflow: 'hidden' },
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
