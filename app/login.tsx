import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { User, ShieldCheck, ArrowRight } from 'lucide-react-native';
import { Logo } from '@/components/Logo';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const { width } = Dimensions.get('window');

export default function Login() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const card1Slide = useRef(new Animated.Value(40)).current;
  const card2Slide = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
    Animated.timing(card1Slide, { toValue: 0, duration: 500, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    Animated.timing(card2Slide, { toValue: 0, duration: 500, delay: 350, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, []);

  return (
    <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.bg}>
      <FloatingOrbs />
      <View style={styles.top}>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Logo size={72} />
        </Animated.View>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <T.h1 style={styles.title}>UrbanShield AI</T.h1>
          <T.body style={styles.subtitle}>Choose your login to continue</T.body>
        </Animated.View>
      </View>

      <View style={styles.cards}>
        <LoginCard
          icon={<User color={Colors.primary[600]} size={28} strokeWidth={2} />}
          title="Citizen Login"
          subtitle="Report issues and track complaints"
          slide={card1Slide}
          onPress={() => router.replace('/(citizen)')}
        />
        <LoginCard
          icon={<ShieldCheck color={Colors.neutral[0]} size={28} strokeWidth={2} />}
          title="Officer Login"
          subtitle="Manage cases and city risk"
          dark
          slide={card2Slide}
          onPress={() => router.replace('/(officer)')}
        />
      </View>

      <T.caption style={styles.gov}>Government of Smart City · Demo Build</T.caption>
    </LinearGradient>
  );
}

function LoginCard({
  icon,
  title,
  subtitle,
  onPress,
  dark,
  slide,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  dark?: boolean;
  slide: Animated.Value;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.timing(scale, { toValue: 0.96, duration: 120, useNativeDriver: true }).start();
  const pressOut = () => Animated.timing(scale, { toValue: 1, duration: 160, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ translateY: slide }, { scale }], borderRadius: Radius.lg }}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} onPressIn={pressIn} onPressOut={pressOut}>
        <LinearGradient
          colors={dark ? [Colors.primary[500], Colors.primary[700]] : [Colors.neutral[0], Colors.neutral[0]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: dark ? 'rgba(255,255,255,0.18)' : Colors.primary[50] }]}>{icon}</View>
          <View style={{ flex: 1 }}>
            <T.h3 style={{ color: dark ? Colors.neutral[0] : Colors.neutral[900] }}>{title}</T.h3>
            <T.bodyS style={{ color: dark ? Colors.primary[100] : Colors.neutral[500] }}>{subtitle}</T.bodyS>
          </View>
          <View style={[styles.arrow, { backgroundColor: dark ? 'rgba(255,255,255,0.2)' : Colors.primary[50] }]}>
            <ArrowRight color={dark ? Colors.neutral[0] : Colors.primary[600]} size={18} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing.xxxl * 1.5 },
  top: { alignItems: 'center', gap: Spacing.base, marginBottom: Spacing.xxxl },
  title: { color: Colors.neutral[0], letterSpacing: 0.5 },
  subtitle: { color: Colors.primary[100] },
  cards: { gap: Spacing.lg },
  card: { borderRadius: Radius.lg, padding: Spacing.lg, flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  iconBox: { width: 56, height: 56, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  arrow: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  gov: { color: Colors.primary[200], textAlign: 'center', marginTop: Spacing.xxxl },
});
