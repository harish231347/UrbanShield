import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { User, ShieldCheck } from 'lucide-react-native';
import { Logo } from '@/components/Logo';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

export default function Login() {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 500, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();
  }, []);

  const goCitizen = () => router.replace('/(citizen)');
  const goOfficer = () => router.replace('/(officer)');

  return (
    <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.bg}>
      <View style={styles.top}>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Logo size={72} />
        </Animated.View>
        <Animated.View style={{ opacity, transform: [{ translateY }] }}>
          <Typography.h1 style={styles.title}>UrbanShield AI</Typography.h1>
          <Typography.body style={styles.subtitle}>Choose your login to continue</Typography.body>
        </Animated.View>
      </View>

      <Animated.View style={[styles.cards, { opacity, transform: [{ translateY }] }]}>
        <LoginCard
          icon={<User color={Colors.primary[600]} size={30} strokeWidth={2} />}
          title="Citizen Login"
          subtitle="Report issues and track complaints"
          onPress={goCitizen}
        />
        <LoginCard
          icon={<ShieldCheck color={Colors.neutral[0]} size={30} strokeWidth={2} />}
          title="Officer Login"
          subtitle="Manage cases and city risk"
          dark
          onPress={goOfficer}
        />
      </Animated.View>

      <Typography.caption style={styles.gov}>Government of Smart City · Demo Build</Typography.caption>
    </LinearGradient>
  );
}

function LoginCard({
  icon,
  title,
  subtitle,
  onPress,
  dark,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  dark?: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn = () => Animated.timing(scale, { toValue: 0.97, duration: 120, useNativeDriver: true }).start();
  const pressOut = () => Animated.timing(scale, { toValue: 1, duration: 160, useNativeDriver: true }).start();

  return (
    <Animated.View style={{ transform: [{ scale }], borderRadius: Radius.lg }}>
      <LinearGradient
        colors={dark ? [Colors.primary[500], Colors.primary[700]] : [Colors.neutral[0], Colors.neutral[0]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} style={styles.cardInner}>
          <View style={[styles.iconBox, { backgroundColor: dark ? 'rgba(255,255,255,0.18)' : Colors.primary[50] }]}>{icon}</View>
          <View style={{ flex: 1 }}>
            <Typography.h3 style={{ color: dark ? Colors.neutral[0] : Colors.neutral[900] }}>{title}</Typography.h3>
            <Typography.bodyS style={{ color: dark ? Colors.primary[100] : Colors.neutral[500] }}>{subtitle}</Typography.bodyS>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing.xxxl * 1.5 },
  top: { alignItems: 'center', gap: Spacing.base, marginBottom: Spacing.xxxl },
  title: { color: Colors.neutral[0], letterSpacing: 0.5 },
  subtitle: { color: Colors.primary[100] },
  cards: { gap: Spacing.lg },
  card: { borderRadius: Radius.lg, padding: Spacing.lg },
  cardInner: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  iconBox: { width: 56, height: 56, borderRadius: Radius.md, alignItems: 'center', justifyContent: 'center' },
  gov: { color: Colors.primary[200], textAlign: 'center', marginTop: Spacing.xxxl },
});
