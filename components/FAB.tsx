import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus } from 'lucide-react-native';
import { Colors, Radius, Shadows } from '@/lib/theme';

interface FABProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

export function FAB({ onPress, icon, label }: FABProps) {
  const scale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 6, tension: 80, useNativeDriver: true }).start();
  }, [scale]);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
      <Pressable onPress={onPress} style={styles.press}>
        <LinearGradient
          colors={[Colors.primary[400], Colors.primary[600]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fab}>
          {icon ?? <Plus color={Colors.neutral[0]} size={26} strokeWidth={2.4} />}
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 22,
    right: 20,
    borderRadius: Radius.pill,
    ...Shadows.brand,
  },
  press: { borderRadius: Radius.pill },
  fab: {
    width: 58,
    height: 58,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
