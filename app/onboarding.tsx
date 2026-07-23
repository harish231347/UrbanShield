import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, ScrollView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Shield, MapPin, Bell } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { Colors, Radius, Spacing} from '@/lib/theme';
import { Typography } from '@/components/Typography';

const slides = [
  {
    icon: Shield,
    title: 'Report Issues Instantly',
    body: 'Citizens can report potholes, street lights, garbage, water leaks and more in under a minute.',
    colors: [Colors.primary[500], Colors.primary[700]] as [string, string],
  },
  {
    icon: MapPin,
    title: 'Smart City Mapping',
    body: 'Track nearby issues and ward-level risk on a live mock city map with priority intelligence.',
    colors: [Colors.accent[500], Colors.primary[600]] as [string, string],
  },
  {
    icon: Bell,
    title: 'Transparent Governance',
    body: 'Get real-time updates, officer responses, and resolution status for every complaint you file.',
    colors: [Colors.warning[500], Colors.danger[500]] as [string, string],
  },
];

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const [idx, setIdx] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleDone = () => router.replace('/login');

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else handleDone();
  };

  return (
    <View style={styles.bg}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={(e) => setIdx(Math.round(e.nativeEvent.contentOffset.x / width))}>
        {slides.map((s, i) => {
          const Icon = s.icon;
          return (
            <View key={i} style={styles.slide}>
              <LinearGradient colors={s.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconWrap}>
                <Icon color={Colors.neutral[0]} size={56} strokeWidth={1.8} />
              </LinearGradient>
              <Typography.h1 style={styles.title}>{s.title}</Typography.h1>
              <Typography.body style={styles.body}>{s.body}</Typography.body>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i === idx ? Colors.primary[500] : Colors.neutral[300] },
                { width: i === idx ? 24 : 8 },
              ]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          {idx < slides.length - 1 ? (
            <Button label="Skip" variant="ghost" onPress={handleDone} />
          ) : (
            <View />
          )}
          <Button label={idx === slides.length - 1 ? 'Get Started' : 'Next'} onPress={next} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: Colors.neutral[50] },
  slide: { width, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.xxxl },
  iconWrap: { width: 130, height: 130, borderRadius: Radius.xl, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.xxxl },
  title: { textAlign: 'center', color: Colors.neutral[900] },
  body: { textAlign: 'center', color: Colors.neutral[500], marginTop: Spacing.base, paddingHorizontal: Spacing.xl },
  footer: { paddingHorizontal: Spacing.xl, paddingBottom: Spacing.xxxl, paddingTop: Spacing.lg },
  dots: { flexDirection: 'row', gap: Spacing.sm, justifyContent: 'center', marginBottom: Spacing.xl },
  dot: { height: 8, borderRadius: 4 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
