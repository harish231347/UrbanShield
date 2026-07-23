import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';
import { RiskLevel } from '@/lib/data';

const riskConfig: Record<RiskLevel, { colors: [string, string]; bg: string; fg: string }> = {
  Low: { colors: [Colors.success[400], Colors.success[600]], bg: Colors.success[500] + '18', fg: Colors.success[600] },
  Medium: { colors: [Colors.warning[400], Colors.warning[600]], bg: Colors.warning[500] + '20', fg: Colors.warning[600] },
  High: { colors: ['#F78B4A', Colors.danger[500]], bg: Colors.danger[500] + '1A', fg: Colors.danger[600] },
  Critical: { colors: [Colors.danger[400], Colors.danger[600]], bg: Colors.danger[500] + '22', fg: Colors.danger[600] },
};

export function RiskBadge({ level, style }: { level: RiskLevel; style?: ViewStyle }) {
  const c = riskConfig[level];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }, style]}>
      <View style={styles.dot}>
        <LinearGradient colors={c.colors} style={styles.dotFill} />
      </View>
      <Typography.label style={{ color: c.fg }}>{level}</Typography.label>
    </View>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string }> = {
    Pending: { bg: Colors.warning[500] + '20', fg: Colors.warning[600] },
    'In Progress': { bg: Colors.primary[500] + '1A', fg: Colors.primary[600] },
    Resolved: { bg: Colors.success[500] + '1A', fg: Colors.success[600] },
    Rejected: { bg: Colors.neutral[300], fg: Colors.neutral[600] },
  };
  const c = map[status] ?? { bg: Colors.neutral[100], fg: Colors.neutral[600] };
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Typography.label style={{ color: c.fg }}>{status}</Typography.label>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  dot: { width: 8, height: 8, borderRadius: 4, overflow: 'hidden' },
  dotFill: { width: 8, height: 8, borderRadius: 4 },
});
