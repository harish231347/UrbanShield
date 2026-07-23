import React, { useState, useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, Camera, MapPin, Check } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { BottomSheet } from '@/components/BottomSheet';
import { FloatingOrbs } from '@/components/AnimatedBackground';
import { categories } from '@/lib/data';
import { Colors, Radius, Spacing } from '@/lib/theme';
import { Typography as T } from '@/components/Typography';

export default function ReportIssue() {
  const [selected, setSelected] = useState<string | null>(null);
  const [desc, setDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fade]);

  useEffect(() => {
    if (submitted) {
      Animated.spring(successScale, { toValue: 1, friction: 5, tension: 60, useNativeDriver: true }).start();
    } else {
      successScale.setValue(0);
    }
  }, [submitted, successScale]);

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[Colors.primary[700], Colors.primary[900]]} style={styles.header}>
        <FloatingOrbs />
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color={Colors.neutral[0]} size={24} />
          </TouchableOpacity>
          <T.h2 style={{ color: Colors.neutral[0] }}>Report an Issue</T.h2>
          <View style={{ width: 24 }} />
        </View>
      </LinearGradient>

      <Animated.View style={{ opacity: fade, flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <T.title style={styles.label}>Issue Category</T.title>
          <View style={styles.catGrid}>
            {categories.map((c, i) => {
              const active = selected === c.id;
              const catScale = useRef(new Animated.Value(0)).current;
              useEffect(() => {
                Animated.spring(catScale, { toValue: 1, delay: i * 50, friction: 6, tension: 60, useNativeDriver: true }).start();
              }, [catScale, i]);
              return (
                <Animated.View key={c.id} style={[styles.catItem, { transform: [{ scale: catScale }] }]}>
                  <TouchableOpacity activeOpacity={0.85} onPress={() => setSelected(c.id)}>
                    <LinearGradient
                      colors={active ? [Colors.primary[500], Colors.primary[600]] : [Colors.neutral[0], Colors.neutral[0]]}
                      style={styles.catCard}>
                      <View style={styles.catInner}>
                        <View style={[styles.catIcon, { backgroundColor: active ? 'rgba(255,255,255,0.2)' : Colors.primary[50] }]}>
                          <View style={[styles.catDot, active && styles.catDotActive]} />
                        </View>
                        <T.bodyS style={{ color: active ? Colors.neutral[0] : Colors.neutral[700], textAlign: 'center' }}>
                          {c.label}
                        </T.bodyS>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>

          <T.title style={styles.label}>Photo</T.title>
          <View style={styles.photoBox}>
            <View style={styles.photoIcon}>
              <Camera color={Colors.neutral[400]} size={32} />
            </View>
            <T.bodyS style={{ color: Colors.neutral[500] }}>Tap to add a photo</T.bodyS>
          </View>

          <T.title style={styles.label}>Location</T.title>
          <View style={styles.locBox}>
            <MapPin color={Colors.primary[600]} size={20} />
            <T.body style={{ color: Colors.neutral[700], flex: 1 }}>Use current location</T.body>
            <View style={styles.locChip}>
              <T.label style={{ color: Colors.primary[600] }}>Auto</T.label>
            </View>
          </View>

          <T.title style={styles.label}>Description</T.title>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Describe the issue in detail..."
            placeholderTextColor={Colors.neutral[400]}
            value={desc}
            onChangeText={setDesc}
          />

          <Button label="Submit Complaint" fullWidth onPress={() => setSubmitted(true)} style={{ marginTop: Spacing.xl }} />
        </ScrollView>
      </Animated.View>

      <BottomSheet visible={submitted} onClose={() => { setSubmitted(false); router.back(); }}>
        <View style={styles.sheetContent}>
          <Animated.View style={{ transform: [{ scale: successScale }] }}>
            <View style={styles.successIcon}>
              <Check color={Colors.neutral[0]} size={40} strokeWidth={2.5} />
            </View>
          </Animated.View>
          <T.h2 style={{ textAlign: 'center' }}>Complaint Filed!</T.h2>
          <T.body style={{ color: Colors.neutral[500], textAlign: 'center' }}>
            Your complaint has been registered as URB-2051 and assigned to your ward team.
          </T.body>
          <Button label="Done" fullWidth onPress={() => { setSubmitted(false); router.back(); }} style={{ marginTop: Spacing.xl }} />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.neutral[50] },
  header: { paddingTop: 56, paddingBottom: Spacing.base, paddingHorizontal: Spacing.xl, overflow: 'hidden' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  content: { padding: Spacing.xl, paddingBottom: 60 },
  label: { marginTop: Spacing.lg, marginBottom: Spacing.sm },
  catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.base },
  catItem: { width: '31%' },
  catCard: { borderRadius: Radius.md, padding: Spacing.sm },
  catInner: { alignItems: 'center', gap: Spacing.xs },
  catIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  catDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.neutral[400] },
  catDotActive: { backgroundColor: Colors.neutral[0] },
  photoBox: { height: 160, borderRadius: Radius.lg, borderWidth: 2, borderStyle: 'dashed', borderColor: Colors.neutral[300], alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
  photoIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.neutral[100], alignItems: 'center', justifyContent: 'center' },
  locBox: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.neutral[0], borderRadius: Radius.md, padding: Spacing.base, ...{ shadowColor: Colors.neutral[900], shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 } },
  locChip: { backgroundColor: Colors.primary[50], borderRadius: Radius.pill, paddingVertical: 4, paddingHorizontal: Spacing.sm },
  input: { minHeight: 100, backgroundColor: Colors.neutral[0], borderRadius: Radius.md, padding: Spacing.base, fontFamily: 'Inter-Regular', fontSize: 15, color: Colors.neutral[800], textAlignVertical: 'top' },
  sheetContent: { alignItems: 'center', gap: Spacing.base, paddingBottom: Spacing.xl },
  successIcon: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.success[500], alignItems: 'center', justifyContent: 'center' },
});
