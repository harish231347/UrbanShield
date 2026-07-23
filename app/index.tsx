import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Logo } from '@/components/Logo';
import { Colors, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function Splash() {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }),
    ]).start();
    Animated.timing(textOpacity, { toValue: 1, duration: 500, delay: 350, useNativeDriver: true }).start();

    const t = setTimeout(() => router.replace('/onboarding'), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.bg}>
      <View style={styles.center}>
        <Animated.View style={{ opacity, transform: [{ scale }] }}>
          <Logo size={88} />
        </Animated.View>
        <Animated.View style={{ opacity: textOpacity, marginTop: Spacing.xl }}>
          <Typography.h1 style={styles.title}>UrbanShield AI</Typography.h1>
          <Typography.body style={styles.subtitle}>Smart City Governance</Typography.body>
        </Animated.View>
      </View>
      <Animated.View style={{ opacity: textOpacity, paddingBottom: Spacing.xxxl }}>
        <Typography.caption style={styles.gov}>Government of Smart City · Public Works</Typography.caption>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { color: Colors.neutral[0], letterSpacing: 0.5 },
  subtitle: { color: Colors.primary[100], marginTop: 4 },
  gov: { color: Colors.primary[200], textAlign: 'center' },
});
