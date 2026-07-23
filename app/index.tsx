import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Logo } from '@/components/Logo';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { Colors, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

export default function Splash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.6)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 700, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
    ]).start();
    Animated.timing(textOpacity, { toValue: 1, duration: 600, delay: 400, useNativeDriver: true }).start();
    Animated.timing(barWidth, { toValue: 1, duration: 1400, delay: 600, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();

    const t = setTimeout(() => router.replace('/onboarding'), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.bg}>
      <FloatingOrbs />
      <View style={styles.center}>
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <Logo size={92} />
        </Animated.View>
        <Animated.View style={{ opacity: textOpacity, marginTop: Spacing.xl, alignItems: 'center' }}>
          <T.h1 style={styles.title}>UrbanShield AI</T.h1>
          <T.body style={styles.subtitle}>Smart City Governance Platform</T.body>
        </Animated.View>
      </View>

      <Animated.View style={{ opacity: textOpacity, paddingHorizontal: Spacing.xxxl, paddingBottom: Spacing.xxxl, alignItems: 'center' }}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, { width: barWidth.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) }]} />
        </View>
        <T.caption style={styles.gov}>Government of Smart City · Public Works Dept.</T.caption>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: Colors.neutral[0], letterSpacing: 0.5 },
  subtitle: { color: Colors.primary[100], marginTop: 6 },
  gov: { color: Colors.primary[200], textAlign: 'center', marginTop: Spacing.base },
  barTrack: { width: 160, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden', marginBottom: Spacing.base },
  barFill: { height: 4, borderRadius: 2, backgroundColor: Colors.primary[200] },
});
