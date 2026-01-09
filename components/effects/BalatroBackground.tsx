// ============================================================================
// BALATRO BACKGROUND - Signature dark gradient background
// ============================================================================

import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BALATRO_COLORS } from '@/constants/balatro-theme';

interface BalatroBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'darker' | 'purple';
}

export function BalatroBackground({ children, variant = 'default' }: BalatroBackgroundProps) {
  const getColors = (): string[] => {
    switch (variant) {
      case 'darker':
        return ['#080810', '#0f0f1a', '#151525'];
      case 'purple':
        return ['#1a0f2e', '#150d24', '#0f0818'];
      case 'default':
      default:
        return [
          BALATRO_COLORS.backgroundDark,
          BALATRO_COLORS.backgroundMid,
          BALATRO_COLORS.backgroundLight,
        ];
    }
  };

  return (
    <LinearGradient
      colors={getColors()}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default BalatroBackground;
