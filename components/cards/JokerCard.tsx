// ============================================================================
// JOKER CARD - Authentic Balatro-style joker card
// ============================================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Joker } from '@/types/balatro';
import {
  BALATRO_COLORS,
  RARITY_COLORS,
  CARD_DIMENSIONS,
  SHADOWS,
} from '@/constants/balatro-theme';
import { EditionOverlay, EditionGlow } from '@/components/effects/EditionOverlay';

interface JokerCardProps {
  joker: Joker;
  index: number;
  totalCount: number;
  onRemove?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
  onCycleEdition?: () => void;
  size?: 'normal' | 'compact';
}

export function JokerCard({
  joker,
  index,
  totalCount,
  onRemove,
  onMoveLeft,
  onMoveRight,
  onCycleEdition,
  size = 'normal',
}: JokerCardProps) {
  const rarityStyle = RARITY_COLORS[joker.rarity];
  const hasEdition = joker.edition !== 'none';
  const dims = size === 'compact'
    ? { width: 95, height: 130, borderRadius: 6 }
    : CARD_DIMENSIONS.joker;

  // Get gradient colors based on rarity
  const getGradientColors = (): string[] => {
    switch (joker.rarity) {
      case 'legendary':
        return ['#3d2d14', '#2d2510', '#1a1508'];
      case 'rare':
        return ['#1a2d4d', '#162540', '#0d1a30'];
      case 'uncommon':
        return ['#1a3d2d', '#153525', '#0d251a'];
      case 'common':
      default:
        return ['#2d2d3d', '#252535', '#1a1a28'];
    }
  };

  // Get joker type icon/symbol
  const getJokerSymbol = (): string => {
    // Simple symbols based on effect type
    const effect = joker.effects[0];
    if (!effect) return '?';

    switch (effect.type) {
      case 'additive_chips':
        return '+C';
      case 'additive_mult':
        return '+M';
      case 'multiplicative_mult':
        return 'xM';
      default:
        return 'J';
    }
  };

  return (
    <EditionGlow edition={joker.edition}>
      <View style={[styles.cardContainer, { width: dims.width, height: dims.height }]}>
        {/* Card with shadow */}
        <View style={[styles.cardShadow, SHADOWS.card, { borderRadius: dims.borderRadius }]}>
          {/* Gradient background based on rarity */}
          <LinearGradient
            colors={getGradientColors()}
            style={[styles.cardBody, { borderRadius: dims.borderRadius }]}
          >
            {/* Header bar with name */}
            <View style={[styles.header, { borderColor: rarityStyle.primary }]}>
              <Text
                style={[styles.jokerName, { color: rarityStyle.primary }]}
                numberOfLines={1}
              >
                {joker.name}
              </Text>
            </View>

            {/* Art area with joker symbol */}
            <View style={styles.artArea}>
              <View style={[styles.symbolContainer, { borderColor: rarityStyle.primary }]}>
                <Text style={[styles.symbolText, { color: rarityStyle.primary }]}>
                  {getJokerSymbol()}
                </Text>
              </View>

              {/* Rarity indicator dots */}
              <View style={styles.rarityDots}>
                {joker.rarity === 'legendary' && (
                  <>
                    <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                    <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                    <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                  </>
                )}
                {joker.rarity === 'rare' && (
                  <>
                    <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                    <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                  </>
                )}
                {joker.rarity === 'uncommon' && (
                  <View style={[styles.dot, { backgroundColor: rarityStyle.primary }]} />
                )}
              </View>
            </View>

            {/* Description area */}
            <View style={styles.descriptionArea}>
              <Text style={styles.description} numberOfLines={3}>
                {joker.description}
              </Text>
            </View>

            {/* Footer with edition */}
            <TouchableOpacity
              style={styles.footer}
              onPress={onCycleEdition}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.editionBadge,
                  hasEdition && {
                    backgroundColor: joker.edition === 'foil' ? '#87ceeb' :
                                    joker.edition === 'holographic' ? '#ff69b4' : '#ffd700',
                  },
                ]}
              >
                <Text style={[styles.editionText, hasEdition && styles.editionTextActive]}>
                  {joker.edition === 'none' ? 'Base' : joker.edition}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Edition overlay effect */}
            {hasEdition && (
              <EditionOverlay
                edition={joker.edition}
                width={dims.width - 2}
                height={dims.height - 2}
                borderRadius={dims.borderRadius - 1}
              />
            )}
          </LinearGradient>
        </View>

        {/* Control buttons */}
        {onRemove && (
          <TouchableOpacity style={styles.removeBtn} onPress={onRemove}>
            <Text style={styles.removeBtnText}>x</Text>
          </TouchableOpacity>
        )}

        {/* Move buttons */}
        <View style={styles.moveButtons}>
          {index > 0 && onMoveLeft && (
            <TouchableOpacity style={styles.moveBtn} onPress={onMoveLeft}>
              <Text style={styles.moveBtnText}>{'<'}</Text>
            </TouchableOpacity>
          )}
          {index < totalCount - 1 && onMoveRight && (
            <TouchableOpacity style={styles.moveBtn} onPress={onMoveRight}>
              <Text style={styles.moveBtnText}>{'>'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </EditionGlow>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    position: 'relative',
    marginRight: 10,
  },
  cardShadow: {
    flex: 1,
  },
  cardBody: {
    flex: 1,
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
    overflow: 'hidden',
  },
  header: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  jokerName: {
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  symbolContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  symbolText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  rarityDots: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  descriptionArea: {
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  description: {
    fontSize: 9,
    color: BALATRO_COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 12,
  },
  footer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: BALATRO_COLORS.border,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
  },
  editionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: BALATRO_COLORS.surfaceDark,
  },
  editionText: {
    fontSize: 9,
    color: BALATRO_COLORS.textSecondary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  editionTextActive: {
    color: BALATRO_COLORS.textDark,
  },
  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BALATRO_COLORS.multRed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    zIndex: 10,
  },
  removeBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -1,
  },
  moveButtons: {
    position: 'absolute',
    top: -4,
    left: -4,
    flexDirection: 'row',
    gap: 2,
    zIndex: 10,
  },
  moveBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BALATRO_COLORS.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BALATRO_COLORS.border,
  },
  moveBtnText: {
    color: BALATRO_COLORS.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default JokerCard;
