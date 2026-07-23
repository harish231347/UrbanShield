import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { useScalePress } from '@/lib/animations';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: React.ReactNode;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({ label, onPress, variant = 'primary', icon, style, fullWidth }: ButtonProps) {
  const { scale, onPressIn, onPressOut } = useScalePress();

  if (variant === 'primary') {
    return (
      <Animated.View style={{ transform: [{ scale }], borderRadius: Radius.base, ...style }}>
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
          <LinearGradient
            colors={[Colors.primary[500], Colors.primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primary}>
            {icon}
            <Animated.Text style={styles.primaryLabel}>{label}</Animated.Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const bg =
    variant === 'secondary'
      ? Colors.primary[50]
      : variant === 'danger'
      ? Colors.danger[400]
      : 'transparent';
  const fg =
    variant === 'secondary'
      ? Colors.primary[600]
      : variant === 'danger'
      ? Colors.danger[600]
      : Colors.neutral[600];

  return (
    <Animated.View style={{ transform: [{ scale }], borderRadius: Radius.base, ...style }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[styles.solid, { backgroundColor: bg, width: fullWidth ? '100%' : undefined }]}>
        {icon}
        <Animated.Text style={[styles.solidLabel, { color: fg }]}>{label}</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.base,
  },
  primaryLabel: {
    color: Colors.neutral[0],
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  solid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.base,
  },
  solidLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
