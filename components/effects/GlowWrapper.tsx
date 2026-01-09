// ============================================================================
// GLOW WRAPPER - Adds glow effect to child elements
// ============================================================================

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BALATRO_COLORS } from '@/constants/balatro-theme';

type GlowColor = 'blue' | 'red' | 'gold' | 'white' | 'green';

interface GlowWrapperProps {
  children: React.ReactNode;
  color?: GlowColor;
  intensity?: 'low' | 'medium' | 'high';
  style?: ViewStyle;
}

const GLOW_COLORS: Record<GlowColor, string> = {
  blue: BALATRO_COLORS.chipBlue,
  red: BALATRO_COLORS.multRed,
  gold: BALATRO_COLORS.goldAccent,
  white: '#ffffff',
  green: '#59cd90',
};

const INTENSITY_RADIUS: Record<GlowWrapperProps['intensity'] & string, number> = {
  low: 4,
  medium: 8,
  high: 14,
};

export function GlowWrapper({
  children,
  color = 'gold',
  intensity = 'medium',
  style,
}: GlowWrapperProps) {
  const glowColor = GLOW_COLORS[color];
  const radius = INTENSITY_RADIUS[intensity];

  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: glowColor,
          shadowRadius: radius,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Preset glow components for common use cases
export function ChipGlow({ children }: { children: React.ReactNode }) {
  return <GlowWrapper color="blue" intensity="medium">{children}</GlowWrapper>;
}

export function MultGlow({ children }: { children: React.ReactNode }) {
  return <GlowWrapper color="red" intensity="medium">{children}</GlowWrapper>;
}

export function ScoreGlow({ children }: { children: React.ReactNode }) {
  return <GlowWrapper color="gold" intensity="high">{children}</GlowWrapper>;
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    elevation: 8,
  },
});

export default GlowWrapper;
