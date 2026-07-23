import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/lib/theme';

const { width } = Dimensions.get('window');

interface AnimatedGradientProps {
  colors?: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function AnimatedGradient({ colors = [Colors.primary[700], Colors.primary[900]], style, children }: AnimatedGradientProps) {
  const shift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shift, { toValue: 1, duration: 6000, easing: Easing.inOut(Easing.sin), useNativeDriver: false })
    ).start();
  }, [shift]);

  const color1 = shift.interpolate({ inputRange: [0, 0.5, 1], outputRange: [colors[0], Colors.primary[600], colors[0]] });
  const color2 = shift.interpolate({ inputRange: [0, 0.5, 1], outputRange: [colors[1] ?? colors[0], Colors.primary[800], colors[1] ?? colors[0]] });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={{ flex: 1 }}>
        <LinearGradient colors={[colors[0], colors[1] ?? colors[0]]} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.03)' }]} />
        {children}
      </Animated.View>
    </View>
  );
}

export function FloatingOrbs({ style }: { style?: ViewStyle }) {
  const orb1 = useRef(new Animated.Value(0)).current;
  const orb2 = useRef(new Animated.Value(0)).current;
  const orb3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(orb1, { toValue: 1, duration: 4000, easing: Easing.inOut(Easing.sin), useNativeDriver: true })).start();
    Animated.loop(Animated.timing(orb2, { toValue: 1, duration: 5500, easing: Easing.inOut(Easing.sin), useNativeDriver: true })).start();
    Animated.loop(Animated.timing(orb3, { toValue: 1, duration: 7000, easing: Easing.inOut(Easing.sin), useNativeDriver: true })).start();
  }, [orb1, orb2, orb3]);

  const y1 = orb1.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
  const y2 = orb2.interpolate({ inputRange: [0, 1], outputRange: [0, 25] });
  const y3 = orb3.interpolate({ inputRange: [0, 1], outputRange: [0, -15] });

  return (
    <View style={[StyleSheet.absoluteFill, style]} pointerEvents="none">
      <Animated.View style={[styles.orb, styles.orb1, { transform: [{ translateY: y1 }] }]} />
      <Animated.View style={[styles.orb, styles.orb2, { transform: [{ translateY: y2 }] }]} />
      <Animated.View style={[styles.orb, styles.orb3, { transform: [{ translateY: y3 }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  orb: { position: 'absolute', borderRadius: 999 },
  orb1: { width: 200, height: 200, top: '10%', left: -60, backgroundColor: 'rgba(90,163,255,0.12)' },
  orb2: { width: 160, height: 160, top: '45%', right: -40, backgroundColor: 'rgba(34,193,160,0.10)' },
  orb3: { width: 120, height: 120, bottom: '15%', left: '30%', backgroundColor: 'rgba(247,185,85,0.08)' },
});
