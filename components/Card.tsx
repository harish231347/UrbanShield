import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '@/lib/theme';
import { useScalePress } from '@/lib/animations';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'glass' | 'gradient';
  onPress?: () => void;
  delay?: number;
}

export function Card({ children, style, variant = 'default', onPress, delay = 0 }: CardProps) {
  const { scale, onPressIn, onPressOut } = useScalePress();
  const opacity = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(14)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, [delay, opacity, translateY]);

  const bg =
    variant === 'glass' ? Colors.glass : variant === 'gradient' ? Colors.primary[500] : Colors.neutral[0];

  const content = (
    <Animated.View
      style={[
        styles.card,
        { opacity, transform: [{ translateY }, { scale }] },
        { backgroundColor: bg },
        variant === 'glass' && styles.glass,
        style,
      ]}>
      {children}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ borderRadius: Radius.lg }}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.neutral[0],
    ...Shadows.md,
  },
  glass: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    ...Shadows.lg,
  },
});
