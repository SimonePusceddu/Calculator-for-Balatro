// ============================================================================
// EDITION OVERLAY - Animated effects for Foil, Holographic, Polychrome
// ============================================================================

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Edition } from '@/types/balatro';
import { EDITION_STYLES } from '@/constants/balatro-theme';

interface EditionOverlayProps {
  edition: Edition;
  width: number;
  height: number;
  borderRadius?: number;
}

export function EditionOverlay({ edition, width, height, borderRadius = 6 }: EditionOverlayProps) {
  if (edition === 'none') return null;

  switch (edition) {
    case 'foil':
      return <FoilOverlay width={width} height={height} borderRadius={borderRadius} />;
    case 'holographic':
      return <HolographicOverlay width={width} height={height} borderRadius={borderRadius} />;
    case 'polychrome':
      return <PolychromeOverlay width={width} height={height} borderRadius={borderRadius} />;
    default:
      return null;
  }
}

// Foil effect - shimmer sweep
function FoilOverlay({ width, height, borderRadius }: { width: number; height: number; borderRadius: number }) {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width * 2, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={[styles.overlay, { width, height, borderRadius }]}>
      <Animated.View style={[styles.shimmer, { height }, animatedStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.4)', 'rgba(200,230,255,0.5)', 'rgba(255,255,255,0.4)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
    </View>
  );
}

// Holographic effect - rainbow gradient shift
function HolographicOverlay({ width, height, borderRadius }: { width: number; height: number; borderRadius: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = `${progress.value * 360}deg`;
    return {
      transform: [{ rotate }],
    };
  });

  return (
    <View style={[styles.overlay, { width, height, borderRadius }]}>
      <Animated.View style={[styles.holoContainer, animatedStyle]}>
        <LinearGradient
          colors={[
            'rgba(255,107,107,0.3)',
            'rgba(255,167,38,0.3)',
            'rgba(255,215,0,0.3)',
            'rgba(123,201,111,0.3)',
            'rgba(77,166,255,0.3)',
            'rgba(155,89,182,0.3)',
            'rgba(255,107,107,0.3)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.holoGradient, { width: width * 2, height: height * 2 }]}
        />
      </Animated.View>
    </View>
  );
}

// Polychrome effect - color pulse
function PolychromeOverlay({ width, height, borderRadius }: { width: number; height: number; borderRadius: number }) {
  const colorProgress = useSharedValue(0);

  useEffect(() => {
    colorProgress.value = withRepeat(
      withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      colorProgress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        'rgba(255,107,107,0.25)',
        'rgba(255,215,0,0.25)',
        'rgba(77,166,255,0.25)',
        'rgba(123,201,111,0.25)',
        'rgba(255,107,107,0.25)',
      ]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        styles.polyOverlay,
        { width, height, borderRadius },
        animatedStyle,
      ]}
    />
  );
}

// Edition glow effect for card border
export function EditionGlow({ edition, children }: { edition: Edition; children: React.ReactNode }) {
  if (edition === 'none') return <>{children}</>;

  const glowColor = EDITION_STYLES[edition].glow;

  return (
    <View style={[styles.glowContainer, { shadowColor: glowColor.replace(/[\d.]+\)$/, '1)') }]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  shimmer: {
    width: 60,
    position: 'absolute',
    top: 0,
  },
  shimmerGradient: {
    flex: 1,
    width: 60,
  },
  holoContainer: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
  },
  holoGradient: {
    opacity: 0.5,
  },
  polyOverlay: {
    opacity: 0.6,
  },
  glowContainer: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default EditionOverlay;
