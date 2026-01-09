// ============================================================================
// ENHANCEMENT BADGE - Visual stamp showing card enhancements
// ============================================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Enhancement } from '@/types/balatro';
import { ENHANCEMENT_COLORS } from '@/constants/balatro-theme';

interface EnhancementBadgeProps {
  enhancement: Enhancement;
  size?: 'small' | 'medium';
}

const ENHANCEMENT_LABELS: Record<Enhancement, string> = {
  none: '',
  bonus: 'B',
  mult: 'M',
  wild: 'W',
  glass: 'G',
  steel: 'S',
  stone: 'ST',
  gold: '$',
  lucky: 'L',
};

const ENHANCEMENT_NAMES: Record<Enhancement, string> = {
  none: '',
  bonus: 'Bonus',
  mult: 'Mult',
  wild: 'Wild',
  glass: 'Glass',
  steel: 'Steel',
  stone: 'Stone',
  gold: 'Gold',
  lucky: 'Lucky',
};

export function EnhancementBadge({ enhancement, size = 'small' }: EnhancementBadgeProps) {
  if (enhancement === 'none') return null;

  const colors = ENHANCEMENT_COLORS[enhancement];
  const isSmall = size === 'small';

  return (
    <View
      style={[
        styles.badge,
        isSmall ? styles.badgeSmall : styles.badgeMedium,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isSmall ? styles.textSmall : styles.textMedium,
          { color: colors.text },
        ]}
      >
        {ENHANCEMENT_LABELS[enhancement]}
      </Text>
    </View>
  );
}

// Full enhancement tag with name
export function EnhancementTag({ enhancement }: { enhancement: Enhancement }) {
  if (enhancement === 'none') return null;

  const colors = ENHANCEMENT_COLORS[enhancement];

  return (
    <View style={[styles.tag, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.tagText, { color: colors.text }]}>
        {ENHANCEMENT_NAMES[enhancement]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSmall: {
    width: 16,
    height: 16,
    borderRadius: 3,
  },
  badgeMedium: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  badgeText: {
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 9,
  },
  textMedium: {
    fontSize: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
  },
});

export default EnhancementBadge;
