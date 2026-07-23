import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';

export function useEntrance(delay = 0) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 420,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 420,
        delay,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, opacity, translateY]);

  return { opacity, translateY };
}

export function useScalePress() {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.timing(scale, { toValue: 0.96, duration: 120, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.timing(scale, { toValue: 1, duration: 160, useNativeDriver: true }).start();
  return { scale, onPressIn, onPressOut };
}

export function usePulse(min = 0.85, max = 1, duration = 1400) {
  const scale = useRef(new Animated.Value(min)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: max, duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(scale, { toValue: min, duration, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [scale, min, max, duration]);
  return scale;
}

export function useFloating(amplitude = 6, duration = 2800) {
  const translateY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: -amplitude, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();
  }, [translateY, amplitude, duration]);
  return translateY;
}

export function useShimmer() {
  const shimmer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    ).start();
  }, [shimmer]);
  return shimmer;
}

export function useCountUp(target: number, duration = 900, delay = 0) {
  const value = useRef(new Animated.Value(0)).current;
  const display = useRef({ val: '0' });

  useEffect(() => {
    const listener = value.addListener((v) => {
      display.current.val = String(Math.round(v.value));
    });
    Animated.timing(value, { toValue: target, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => value.removeListener(listener);
  }, [target, duration, delay, value]);

  return { value, display };
}

export function useStaggeredEntrance(count: number, baseDelay = 0, stepDelay = 70) {
  const values = useRef(Array.from({ length: count }, () => new Animated.Value(0))).current;
  const translateYs = useRef(Array.from({ length: count }, () => new Animated.Value(20))).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];
    values.forEach((v, i) => {
      animations.push(
        Animated.parallel([
          Animated.timing(v, { toValue: 1, duration: 400, delay: baseDelay + i * stepDelay, easing: Easing.out(Easing.ease), useNativeDriver: true }),
          Animated.timing(translateYs[i], { toValue: 0, duration: 400, delay: baseDelay + i * stepDelay, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        ])
      );
    });
    Animated.parallel(animations).start();
  }, [values, translateYs, baseDelay, stepDelay, count]);

  return { values, translateYs };
}

export function useGradientShift() {
  const shift = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(shift, { toValue: 1, duration: 5000, easing: Easing.inOut(Easing.sin), useNativeDriver: false })
    ).start();
  }, [shift]);
  return shift;
}
