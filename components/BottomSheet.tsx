import React from 'react';
import { Animated, Dimensions, Modal, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';
import { Colors, Radius, Spacing } from '@/lib/theme';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
}

const SHEET_HEIGHT = Dimensions.get('window').height * 0.6;

export function BottomSheet({ visible, onClose, children, style }: BottomSheetProps) {
  const slide = React.useRef(new Animated.Value(SHEET_HEIGHT)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slide, { toValue: 0, duration: 320, useNativeDriver: true }).start();
    } else {
      Animated.timing(slide, { toValue: SHEET_HEIGHT, duration: 280, useNativeDriver: true }).start();
    }
  }, [visible, slide]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slide }] }, style]}>
          <View style={styles.handle} />
          <View style={styles.closeRow}>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <X color={Colors.neutral[500]} size={20} />
            </Pressable>
          </View>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.4)' },
  sheet: {
    backgroundColor: Colors.neutral[0],
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
    maxHeight: SHEET_HEIGHT,
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: Colors.neutral[300],
    alignSelf: 'center',
    marginBottom: Spacing.base,
  },
  closeRow: { alignItems: 'flex-end' },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
