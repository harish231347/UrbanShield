import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '@/lib/theme';

export function Logo({ size = 56 }: { size?: number }) {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[Colors.primary[400], Colors.primary[600]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.box, { width: size, height: size, borderRadius: size * 0.28 }]}>
        <Shield color={Colors.neutral[0]} size={size * 0.5} strokeWidth={2.2} />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  box: { alignItems: 'center', justifyContent: 'center' },
});
