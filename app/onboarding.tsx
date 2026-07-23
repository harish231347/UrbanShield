import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Shield, MapPin, Bell } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

const slides = [
  {
    icon: Shield,
    title: 'Report Issues Instantly',
    body: 'Citizens can report potholes, street lights, garbage, water leaks and more in under a minute.',
    colors: [Colors.primary[500], Colors.primary[700]] as [string, string],
    accent: Colors.primary[300],
  },
  {
    icon: MapPin,
    title: 'Smart City Mapping',
    body: 'Track nearby issues and ward-level risk on a live mock city map with priority intelligence.',
    colors: [Colors.accent[500], Colors.primary[600]] as [string, string],
    accent: Colors.accent[400],
  },
  {
    icon: Bell,
    title: 'Transparent Governance',
    body: 'Get real-time updates, officer responses, and resolution status for every complaint you file.',
    colors: [Colors.warning[500], Colors.danger[500]] as [string, string],
    accent: Colors.warning[400],
  },
];

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const [idx, setIdx] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, [float]);

  const floatY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });

  const handleDone = () => router.replace('/login');
  const next = () => (idx < slides.length - 1 ? setIdx(idx + 1) : handleDone());

  return (
    <View style={styles.bg}>
      <View style={styles.topBar}>
        {idx < slides.length - 1 && (
          <T.bodyS style={{ color: Colors.neutral[400] }} onPress={handleDone}>Skip</T.bodyS>
        )}
      </View>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={(e) => setIdx(Math.round(e.nativeEvent.contentOffset.x / width))}>
        {slides.map((s, i) => {
          const Icon = s.icon;
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({ inputRange, outputRange: [0.6, 1, 0.6], extrapolate: 'clamp' });
          const opacity = scrollX.interpolate({ inputRange, outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' });
          const translateX = scrollX.interpolate({ inputRange, outputRange: [width * 0.25, 0, -width * 0.25], extrapolate: 'clamp' });

          return (
            <View key={i} style={styles.slide}>
              <Animated.View style={{ transform: [{ scale }, { translateX }, { translateY: floatY }], opacity }}>
                <LinearGradient colors={s.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconWrap}>
                  <Icon color={Colors.neutral[0]} size={60} strokeWidth={1.6} />
                </LinearGradient>
              </Animated.View>
              <Animated.View style={{ opacity, paddingHorizontal: Spacing.xxxl }}>
                <T.h1 style={styles.title}>{s.title}</T.h1>
                <T.body style={styles.body}>{s.body}</T.body>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === idx ? Colors.primary[500] : Colors.neutral[300] },
                { width: i === idx ? 28 : 8 },
              ]}
            />
          ))}
        </View>
        <Button label={idx === slides.length - 1 ? 'Get Started' : 'Next'} onPress={next} style={{ minWidth: 180 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: Colors.neutral[50] },
  topBar: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: Spacing.xl, paddingTop: Spacing.xxxl },
  slide: { width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxxl },
  iconWrap: { width: 140, height: 140, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxxl },
  title: { textAlign: 'center', color: Colors.neutral[900] },
  body: { textAlign: 'center', color: Colors.neutral[500], marginTop: Spacing.base, paddingHorizontal: Spacing.xl },
  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl, paddingTop: Spacing.lg, alignItems: 'center', gap: Spacing.xl },
  dots: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center' },
  dot: { height: 8, borderRadius: 4 },
});
