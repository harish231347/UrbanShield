import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2, AlertCircle, Bell, Users } from 'lucide-react-native';
import { citizenNotifications } from '@/lib/data';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

const typeConfig: Record<string, { icon: any; colors: [string, string] }> = {
  progress: { icon: AlertCircle, colors: [Colors.primary[400], Colors.primary[600]] },
  resolved: { icon: CheckCircle2, colors: [Colors.success[400], Colors.success[600]] },
  alert: { icon: Bell, colors: [Colors.warning[400], Colors.warning[600]] },
  social: { icon: Users, colors: [Colors.accent[400], Colors.accent[600]] },
};

export default function Notifications() {
  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <Typography.h2 style={{ color: Colors.neutral[0] }}>Notifications</Typography.h2>
        <Typography.bodyS style={{ color: Colors.primary[200] }}>{citizenNotifications.length} updates</Typography.bodyS>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {citizenNotifications.map((n, i) => {
          const cfg = typeConfig[n.type];
          const Icon = cfg.icon;
          return (
            <View key={n.id} style={[styles.item, { marginTop: i === 0 ? 0 : Spacing.base }]}>
              <LinearGradient colors={cfg.colors} style={styles.icon}>
                <Icon color={Colors.neutral[0]} size={18} />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Typography.title numberOfLines={2}>{n.title}</Typography.title>
                <Typography.bodyS style={{ color: Colors.neutral[500], marginTop: 2 }}>{n.body}</Typography.bodyS>
                <Typography.caption style={{ color: Colors.neutral[400], marginTop: 4 }}>{n.time}</Typography.caption>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.xl, paddingHorizontal: Spacing.xl, borderBottomLeftRadius: Radius.xl, borderBottomRightRadius: Radius.xl },
  content: { padding: Spacing.xl, paddingBottom: 120 },
  item: { flexDirection: 'row', gap: Spacing.base, backgroundColor: Colors.neutral[0], borderRadius: Radius.lg, padding: Spacing.base },
  icon: { width: 42, height: 42, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
});
